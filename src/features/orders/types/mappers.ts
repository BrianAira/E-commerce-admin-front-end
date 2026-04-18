import type { IOrder, IOrderItem, OrderApi, OrderItemApi } from "./order";

/**
 * Mappers: Transformación de API a Interfaz de UI
 */
// orders/types/mappers.ts

export const mapOrderItemToI = (item: any): IOrderItem => ({
  productId: item.variant_id, // Usamos variant_id como ID de referencia
  quantity: item.quantity,
  price: parseFloat(item.unit_price), // Convertimos el string "358188.00" a número
  product: {
    id: item.variant_id,
    name: item.product?.name || `Producto #${item.variant_id}`, // Salvaguarda
    imageUrl: item.product?.image_url || "" 
  },
});

export const mapOrderToI = (order: any): IOrder => ({
  id: order.id,
  userId: order.user_id,
  orderDate: order.order_date,
  status: order.status,
  trackingNumber: order.tracking_number,
  shippingAddress: order.shipping_address_snapshot,
  total: parseFloat(order.total_amount), // Convertimos el string a número
  items: Array.isArray(order.items) ? order.items.map(mapOrderItemToI) : [],
});