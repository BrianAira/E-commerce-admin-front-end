import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "../services/orders.api";
import { useToast } from "../../../components/ui/ToastProvider";
// import { ordersService } from "../services/ordersService";
// import { useToast } from "../context/ToastContext"; // Tu Toast personalizado

// Listado global para el Admin
export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["orders", "admin"],
    queryFn: ordersService.getAllAdmin,
    staleTime: 1000 * 60 * 2, // 2 minutos de frescura
  });
};

// Detalle de una orden
export const useOrderDetail = (id: number) => {
  return useQuery({
    queryKey: ["orders", "detail", id],
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  });
};

// Mutación para cambiar el estado
export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    // Recibe un objeto con id y status
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      ordersService.updateStatus(id, status),
    onSuccess: (updatedOrder) => {
      // Refrescamos las keys para que el Dashboard y la OrdersPage vean el cambio
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["orders", "admin"] });
      qc.invalidateQueries({ queryKey: ["orders", "detail", updatedOrder.id] });
      
      addToast(`Estado actualizado a: ${updatedOrder.status}`, "success");
    },
    onError: (error) => {
      console.error("Error al actualizar:", error);
      addToast("No se pudo actualizar el estado", "error");
    }
  });
};