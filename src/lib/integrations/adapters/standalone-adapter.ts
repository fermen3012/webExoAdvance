import {
  IPOSAdapter,
  POSCredentials,
  POSOrderPayload,
  POSOrderResult,
  POSProvider,
  POSTicketBarcodeData,
} from "../types";

export class StandaloneAdapter implements IPOSAdapter {
  provider: POSProvider = "standalone";

  async testConnection(_credentials: POSCredentials): Promise<{ ok: boolean; message?: string }> {
    return { ok: true, message: "OrderPoint Native KDS Engine is active and ready." };
  }

  async injectOrder(
    _credentials: POSCredentials,
    order: POSOrderPayload
  ): Promise<POSOrderResult> {
    const startTime = Date.now();

    const ticketData: POSTicketBarcodeData = {
      order_number: order.order_number,
      barcode_value: `OP-${order.order_number}-${Date.now().toString().slice(-4)}`,
      total_formatted: `$${order.total.toFixed(2)} USD`,
      dining_option: order.dining_option,
      timestamp: new Date().toISOString(),
    };

    return {
      success: true,
      provider: "standalone",
      external_order_id: `OP-${order.order_number}`,
      ticket_data: ticketData,
      latency_ms: Date.now() - startTime,
    };
  }
}
