import {
  IPOSAdapter,
  POSCredentials,
  POSOrderPayload,
  POSOrderResult,
  POSProvider,
} from "./types";
import { StandaloneAdapter } from "./adapters/standalone-adapter";
import { decryptCredentials } from "../security/encryption";
import { createServerClientInstance } from "../supabase/server";

export class POSBridgeRouter {
  private static adapters: Map<POSProvider, IPOSAdapter> = new Map([
    ["standalone", new StandaloneAdapter()],
  ]);

  /**
   * Registers or overrides an adapter for a given provider
   */
  public static registerAdapter(provider: POSProvider, adapter: IPOSAdapter): void {
    this.adapters.set(provider, adapter);
  }

  /**
   * Retrieves active integration credentials for a given restaurant
   */
  public static async getMerchantIntegration(
    restaurantId: string
  ): Promise<{ provider: POSProvider; credentials: POSCredentials; settings: Record<string, unknown> } | null> {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase
        .from("merchant_integrations" as never)
        .select("provider, encrypted_credentials, settings, status" as never)
        .eq("restaurant_id" as never, restaurantId as never)
        .eq("status" as never, "active" as never)
        .maybeSingle();

      if (error || !data) {
        return null;
      }

      const raw = data as {
        provider: string;
        encrypted_credentials: string;
        settings: Record<string, unknown>;
      };

      const decrypted = decryptCredentials(raw.encrypted_credentials);
      const credentials: POSCredentials = JSON.parse(decrypted);

      return {
        provider: raw.provider as POSProvider,
        credentials,
        settings: raw.settings || {},
      };
    } catch (err) {
      console.error("[POSBridgeRouter] Failed to fetch or decrypt merchant credentials:", err);
      return null;
    }
  }

  /**
   * Injects an order into the active POS provider with strict 3.5s timeout & resilience fallback
   */
  public static async dispatchOrder(
    order: POSOrderPayload
  ): Promise<POSOrderResult> {
    const startTime = Date.now();
    const integration = await this.getMerchantIntegration(order.restaurant_id);

    const provider: POSProvider = integration?.provider || "standalone";
    const credentials: POSCredentials = integration?.credentials || { access_token: "" };
    const adapter = this.adapters.get(provider) || this.adapters.get("standalone")!;

    try {
      // 3.5s Timeout Guard for External POS APIs
      const timeoutPromise = new Promise<POSOrderResult>((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout: ${provider} API did not respond within 3500ms`)), 3500)
      );

      const orderPromise = adapter.injectOrder(credentials, order);
      const result = await Promise.race([orderPromise, timeoutPromise]);

      return {
        ...result,
        latency_ms: Date.now() - startTime,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown POS dispatch error";
      console.warn(`[POSBridgeRouter] Primary dispatch to ${provider} failed. Triggering resilient fallback:`, errorMessage);

      // Fallback: Generate local standalone ticket barcode so restaurant never loses the sale
      const fallbackAdapter = this.adapters.get("standalone")!;
      const fallbackResult = await fallbackAdapter.injectOrder(credentials, order);

      return {
        ...fallbackResult,
        success: true, // Still marked true so the kiosk prints the barcode ticket
        is_fallback: true,
        error: `External ${provider} dispatch failed: ${errorMessage}. Order queued locally.`,
        latency_ms: Date.now() - startTime,
      };
    }
  }
}
