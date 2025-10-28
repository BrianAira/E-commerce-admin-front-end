import { api } from "../../../services/axiosClient";
import type { Order } from "../types/order";


export const OrdersService={
    getAll: async ():Promise<Order[]>=>{
        const res=await api.get("/orders");
        return res.data
    },

    update:async (data: Partial<Order>)=>{
        const res=await api.patch("/orders", data);
        return res.data
    },

    getById: async (id:number): Promise<Order>=>{
        const res=await api.get(`/orders/${id}`);
        return res.data
    }
}