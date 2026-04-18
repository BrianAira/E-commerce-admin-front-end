import { api } from "../../../api/axiosClient";
import { mapOrderToI } from "../types/mappers";
import type { IOrder, OrderApi } from "../types/order";

export const ordersService = {
  
  // Obtener todas las órdenes (Panel Admin)
  // GET /orders/admin/all
  getAllAdmin: async (): Promise<IOrder[]> => {
    const { data } = await api.get<OrderApi[]>("/orders/admin/all");
    return data.map(mapOrderToI);
  },

  // Obtener detalle de una orden específica
  // GET /orders/{id}
  getById: async (id: number): Promise<IOrder> => {
    const { data } = await api.get<OrderApi>(`/orders/${id}`);
    return mapOrderToI(data);
  },

  // Cambiar el estado de una orden
  // PATCH o PUT /orders/{id}/status (según tu backend)
  updateStatus: async (id: number, newStatus: string): Promise<IOrder> => {
  const { data } = await api.patch<OrderApi>(
    `/orders/${id}/status`, 
    null, // No enviamos nada en el Body
    { 
      params: { 
        new_status: newStatus // Axios lo transforma en ?new_status=...
      } 
    }
  );
  return mapOrderToI(data);
},
};