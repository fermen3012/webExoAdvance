# 🤖 PROMPT MAESTRO PARA AGENTE DE INGENIERÍA: ORDERPOINT POS INTEGRATION HUB

> **Instrucciones de uso:** Copia y pega el contenido dentro del bloque delimitado por `=== INICIO DEL PROMPT ===` y pásaselo a tu agente de IA (Antigravity, Cursor, Claude 3.5 Sonnet, etc.) en el repositorio de OrderPoint / Exo Advance.

---

```markdown
=== INICIO DEL PROMPT ===

Actúa como un **Arquitecto de Software Full-Stack Senior y Especialista en FinTech POS** para el ecosistema **OrderPoint (Exo Advance LLC)**.

Tu misión es implementar los adaptadores de integración externa para **Square POS**, **Clover POS** y **Toast POS**, permitiendo que los Kioskos OrderPoint puedan:
1. **Sincronizar e importar automáticamente el menú del restaurante** (categorías, platillos, modificadores y precios).
2. **Inyectar pedidos en tiempo real** hacia el POS externo cuando un comensal ordene en el Kiosko.
3. **Manejar contingencias y fallback offline** si la API externa falla o tarda más de 3.5 segundos.

---

### 🏛️ REGLAS ARQUITECTÓNICAS Y CONTRATOS PREEXISTENTES (INQUEBRANTABLES)

Debes construir sobre los cimientos ya existentes en el repositorio sin romper nada:

1. **Tipos e Interfaces Oficiales:**
   - Ya definidos en `src/lib/integrations/types.ts`:
     - `IPOSAdapter`: Contrato obligatorio con `testConnection()`, `injectOrder()`, y `importMenu()`.
     - `POSCredentials`: Credenciales que incluyen `access_token`, `refresh_token`, `merchant_id`, `api_url`.
     - `POSOrderPayload`: Pedido estandarizado con `idempotency_key`, `items`, `dining_option`, `total`.
     - `POSMenuSyncResult`: Resultado de la sincronización de categorías y platillos.

2. **Cifrado Criptográfico de Grado Bancario:**
   - Utiliza exclusivamente las funciones en `src/lib/security/encryption.ts`:
     - `encryptCredentials(plainText: string): string` (AES-256-GCM con formato `iv:authTag:ciphertext`).
     - `decryptCredentials(encryptedString: string): string`.
   - Prohibido guardar tokens en texto plano en la base de datos.

3. **Base de Datos Supabase:**
   - Tabla predefinida: `public.merchant_integrations`:
     - `restaurant_id` (UUID referencias `restaurants.id`), `provider` ('square' | 'clover' | 'toast' | 'standalone'), `encrypted_credentials`, `merchant_account_id`, `settings` (JSONB), `status`.
   - Columnas de trazabilidad en `public.orders`:
     - `external_order_id`, `external_pos_provider`, `external_sync_status`, `external_sync_error`.

4. **Enrutador Central:**
   - Todo despacho pasa por `src/lib/integrations/pos-router.ts` (`POSBridgeRouter`), que aplica la guardia de timeout de 3.5s y fallback automático a ticket físico barcode/QR.

---

### 📋 TAREAS DE IMPLEMENTACIÓN A EJECUTAR

#### TAREA 1: Adaptador de Square POS (`src/lib/integrations/adapters/square-adapter.ts`)
Implementa la clase `SquareAdapter implements IPOSAdapter` con `provider: "square"`:
1. `testConnection(credentials)`:
   - Valida el token llamando a `GET https://connect.squareup.com/v2/merchants/current` o `/locations`.
2. `importMenu(credentials)`:
   - Llama a `POST https://connect.squareup.com/v2/catalog/search` filtrando por tipos `ITEM`, `CATEGORY`, `MODIFIER_LIST`.
   - Transforma los objetos de Square al contrato unificado `POSMenuItem[]` y `POSMenuCategory[]`.
3. `injectOrder(credentials, order)`:
   - Construye el payload para `POST https://connect.squareup.com/v2/orders`.
   - Usa `order.idempotency_key` en el header `Idempotency-Key` para evitar órdenes duplicadas.
   - Retorna `external_order_id: squareOrder.id` y mapea los line items con notas y modificadores.

#### TAREA 2: Adaptador de Clover POS (`src/lib/integrations/adapters/clover-adapter.ts`)
Implementa la clase `CloverAdapter implements IPOSAdapter` con `provider: "clover"`:
1. `testConnection(credentials)`:
   - Valida llamando a `GET https://api.clover.com/v3/merchants/{mId}`.
2. `importMenu(credentials)`:
   - Llama a `GET https://api.clover.com/v3/merchants/{mId}/items?expand=categories,modifierGroups` (o `/categories`).
   - Normaliza precios (Clover usa centavos enteros: `$12.50` = `1250`) dividiendo entre 100.
   - Retorna catálogo normalizado compatible con `POSMenuSyncResult`.
3. `injectOrder(credentials, order)`:
   - Crea la orden en `POST https://api.clover.com/v3/merchants/{mId}/orders` con estado `open` y tipo de servicio (DINE_IN o TO_GO).
   - Inyecta los items llamando a `POST https://api.clover.com/v3/merchants/{mId}/orders/{orderId}/line_items`.
   - Retorna `external_order_id: cloverOrderId`.

#### TAREA 3: Adaptador de Toast POS (`src/lib/integrations/adapters/toast-adapter.ts`)
Implementa la clase `ToastAdapter implements IPOSAdapter` con `provider: "toast"`:
1. `testConnection(credentials)`:
   - Llama al endpoint de autenticación Toast Partner Connect (`/authentication/v1/authentication/login`).
2. `importMenu(credentials)`:
   - Consulta `GET https://api.toasttab.com/menus/v2/overview` para la ubicación (`restaurantGuid`).
   - Mapea grupos de menú (`MenuGroups`) y platillos (`MenuItems`) con sus modifiers a `POSMenuSyncResult`.
3. `injectOrder(credentials, order)`:
   - Llama a `POST https://api.toasttab.com/orders/v2/orders`.
   - Si la API responde con error o el restaurante está en modo "Ticket QR", retorna el resultado con `ticket_data` listo para imprimir en la ticketera térmica de 80mm de OrderPoint.

#### TAREA 4: Registro en el Enrutador y Server Action de Sincronización
1. En `src/lib/integrations/pos-router.ts`:
   - Registra las 3 instancias en `POSBridgeRouter.adapters`:
     ```typescript
     POSBridgeRouter.registerAdapter("square", new SquareAdapter());
     POSBridgeRouter.registerAdapter("clover", new CloverAdapter());
     POSBridgeRouter.registerAdapter("toast", new ToastAdapter());
     ```
2. Crea el Server Action `syncRestaurantMenu(restaurantId: string)` en `src/app/actions/integrations.ts`:
   - Obtiene las credenciales del restaurante vía `POSBridgeRouter.getMerchantIntegration(restaurantId)`.
   - Llama al método `importMenu()` del adaptador correspondiente.
   - Actualiza o inserta en Supabase las tablas `categories` y `products` vinculadas a ese `restaurant_id`.
   - Actualiza `last_synced_at` en `merchant_integrations`.

---

### 🛡️ NORMAS DE SEGURIDAD Y CALIDAD
- Cero valores `any` en TypeScript.
- Manejo estricto de errores con bloques `try/catch` informativos que nunca rompan el hilo principal.
- Preserva todos los archivos y rutas existentes.
- Al finalizar, ejecuta `node .agents/bin/verify.js` para asegurar que el QA Gate pase en `PASS` con 0 errores de tipos y 0 credenciales expuestas.

=== FIN DEL PROMPT ===
```
