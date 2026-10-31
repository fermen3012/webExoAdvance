/**
 * OrderPoint POS Integration Hub - Standard Types & Interfaces
 * Governs multi-tenant connectivity for Clover, Square, Toast, and Standalone modes.
 */

export type POSProvider = "clover" | "square" | "toast" | "standalone";

export type POSIntegrationStatus = "active" | "disconnected" | "error" | "pending_auth";

export interface POSIntegrationSettings {
  auto_inject: boolean;
  print_ticket: boolean;
  fallback_to_kds: boolean;
  test_mode?: boolean;
  default_dining_option?: "dine_in" | "takeout" | "kiosk";
}

export interface POSCredentials {
  access_token: string;
  refresh_token?: string;
  token_expires_at?: string;
  merchant_id?: string; // Clover merchantId or Square locationId or Toast restaurantGuid
  api_url?: string;
  client_id?: string;
  client_secret?: string;
}

export interface POSOrderModifier {
  id?: string;
  name: string;
  price: number;
}

export interface POSOrderItem {
  id?: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  modifiers?: POSOrderModifier[];
}

export interface POSOrderPayload {
  order_id: string; // Internal OrderPoint UUID
  order_number: number;
  restaurant_id: string;
  dining_option: "dine_in" | "takeout" | "kiosk";
  table_number?: string;
  items: POSOrderItem[];
  subtotal: number;
  tax: number;
  tip?: number;
  total: number;
  customer_name?: string;
  customer_phone?: string;
  idempotency_key: string;
}

export interface POSTicketBarcodeData {
  order_number: number;
  barcode_value: string; // e.g. "OP-104-9283"
  qr_code_url?: string;
  total_formatted: string;
  dining_option: string;
  timestamp: string;
}

export interface POSOrderResult {
  success: boolean;
  provider: POSProvider;
  external_order_id?: string;
  error?: string;
  is_fallback?: boolean;
  ticket_data?: POSTicketBarcodeData;
  latency_ms?: number;
}

export interface POSMenuItem {
  external_id: string;
  name: string;
  description?: string;
  price: number;
  category_name?: string;
  image_url?: string;
  is_available: boolean;
}

export interface POSMenuCategory {
  external_id: string;
  name: string;
  items: POSMenuItem[];
}

export interface POSMenuSyncResult {
  success: boolean;
  provider: POSProvider;
  categories_count: number;
  items_count: number;
  items: POSMenuItem[];
  error?: string;
}

/**
 * Universal POS Adapter Interface
 * Every external integration must implement this contract.
 */
export interface IPOSAdapter {
  provider: POSProvider;

  /**
   * Verifies API connectivity and credentials validity
   */
  testConnection(credentials: POSCredentials): Promise<{ ok: boolean; message?: string }>;

  /**
   * Injects an order placed on the OrderPoint Kiosk into the external POS
   */
  injectOrder(credentials: POSCredentials, order: POSOrderPayload): Promise<POSOrderResult>;

  /**
   * Imports the live menu catalog from the external POS into OrderPoint
   */
  importMenu?(credentials: POSCredentials): Promise<POSMenuSyncResult>;
}
