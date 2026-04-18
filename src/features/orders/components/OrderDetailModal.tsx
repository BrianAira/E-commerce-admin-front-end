import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ScrollShadow,
  Image,
  Chip,
  Select,
  SelectItem,
} from "@heroui/react";
import { FiHash, FiCalendar, FiMapPin, FiPackage, FiShoppingBag, FiInfo } from "react-icons/fi";
import { type IOrder } from "../types/order";
import { useUpdateOrderStatus } from "../hooks/useOrders";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  order: IOrder | null;
}

// Opciones de estado que coincidan con tu backend
const STATUS_OPTIONS = [
  { label: "Pendiente", value: "pending", color: "warning" as const },
  { label: "Enviado", value: "shipped", color: "secondary" as const },
  { label: "Entregado", value: "delivered", color: "success" as const },
  { label: "Cancelado", value: "cancelled", color: "danger" as const },
];

export const OrderDetailModal = ({ isOpen, onClose, order }: Props) => {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  if (!order) return null;

  const handleStatusChange = (newStatus: string) => {
    // Aquí invocamos la mutación que ya configuramos con params: { new_status }
    updateStatus({ id: order.id, status: newStatus });
  };

  const currentStatus = STATUS_OPTIONS.find(s => s.value === order.status);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="2xl" 
      scrollBehavior="inside"
      backdrop="blur"
      classNames={{
        base: "dark:bg-zinc-950 border border-divider",
        header: "border-b border-divider",
        footer: "border-t border-divider",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center pr-6">
                <div className="flex items-center gap-2 text-primary text-xl font-bold">
                  <FiShoppingBag />
                  <span>Detalle de la Orden</span>
                </div>
                <Chip 
                  color={currentStatus?.color || "default"} 
                  variant="flat" 
                  size="sm"
                  className="capitalize"
                >
                  {currentStatus?.label || order.status}
                </Chip>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-small text-default-500 flex items-center gap-1">
                  <FiHash /> {order.id}
                </span>
                <span className="text-small text-default-500 flex items-center gap-1">
                  <FiCalendar /> {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              {/* Gestión de Estado (Para el Admin) */}
              <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                  <FiInfo /> Actualizar Estado del Pedido
                </h4>
                <Select
                  size="sm"
                  label="Estado de entrega"
                  placeholder="Seleccionar nuevo estado"
                  selectedKeys={[order.status]}
                  isLoading={isPending}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="max-w-xs"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.value} 
                    value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Sección de Envío */}
              <div className="bg-default-50 dark:bg-zinc-900/50 p-4 rounded-xl mb-6 border border-divider">
                <h4 className="text-small font-bold flex items-center gap-2 mb-2">
                  <FiMapPin className="text-primary" /> Información de Entrega
                </h4>
                <p className="text-sm text-default-600">{order.shippingAddress}</p>
              </div>

              {/* Lista de Productos */}
              <div className="flex flex-col gap-4">
                <h4 className="text-small font-bold flex items-center gap-2 text-foreground">
                  <FiPackage className="text-primary" /> Productos ({order.items.length})
                </h4>
                
                <ScrollShadow className="max-h-[300px] pr-2">
                  <div className="flex flex-col gap-3">
                    {order.items.map((item, index) => (
                      <div 
                        key={`${item.productId}-${index}`}
                        className="flex items-center gap-4 p-3 rounded-lg border border-divider hover:bg-default-50 dark:hover:bg-zinc-900 transition-all"
                      >
                        <Image
                          // IMPORTANTE: Manejo de imagen vacía para evitar error de consola
                          src={item.product.imageUrl || null}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-md bg-zinc-200 dark:bg-zinc-800"
                          fallbackSrc="https://via.placeholder.com/150?text=No+Img"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-foreground">{item.product.name}</p>
                          <p className="text-xs text-default-500">
                            Cant: <span className="text-foreground font-medium">{item.quantity}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-default-400 font-mono">
                            ${item.price.toLocaleString()} c/u
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollShadow>
              </div>
            </ModalBody>

            <ModalFooter className="bg-default-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] text-default-400 uppercase font-black tracking-tighter">Total del Pedido</span>
                <span className="text-2xl font-black text-foreground">
                  ${order.total.toLocaleString()}
                </span>
              </div>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};