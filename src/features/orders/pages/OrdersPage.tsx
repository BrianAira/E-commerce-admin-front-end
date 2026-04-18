import  { useState } from "react";
import { useDisclosure, Card, CardBody } from "@heroui/react";
import { FiShoppingBag, FiClock, FiTruck, FiCheckCircle } from "react-icons/fi";
import OrdersTable from "../components/OrdersTable";
import { OrderDetailModal } from "../components/OrderDetailModal";
import { type IOrder } from "../types/order";
import { useAdminOrders } from "../hooks/useOrders";

const OrdersPage = () => {
  const { data: orders } = useAdminOrders();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  // Función para abrir el modal con la orden seleccionada
  const handleViewOrder = (order: IOrder) => {
    setSelectedOrder(order);
    onOpen();
  };

  // Cálculos rápidos para las "Stats"
  const stats = [
    {
      title: "Total Órdenes",
      value: orders?.length || 0,
      icon: <FiShoppingBag className="text-primary" />,
      color: "border-primary"
    },
    {
      title: "Pendientes",
      value: orders?.filter(o => o.status === 'pending').length || 0,
      icon: <FiClock className="text-warning" />,
      color: "border-warning"
    },
    {
      title: "En Camino",
      value: orders?.filter(o => o.status === 'shipped').length || 0,
      icon: <FiTruck className="text-secondary" />,
      color: "border-secondary"
    },
    {
      title: "Entregadas",
      value: orders?.filter(o => o.status === 'delivered').length || 0,
      icon: <FiCheckCircle className="text-success" />,
      color: "border-success"
    }
  ];

  return (
    <div className="p-6 flex flex-col gap-8 max-w-[1400px] mx-auto">
      {/* Header y Stats */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Gestión de Ventas</h1>
          <p className="text-default-500">Monitorea y actualiza el estado de los pedidos de tus clientes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`border-l-4 shadow-sm ${stat.color} dark:bg-zinc-900`}>
              <CardBody className="flex flex-row items-center gap-4 py-4">
                <div className="p-3 rounded-xl bg-default-100 dark:bg-zinc-800 text-xl">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-tiny uppercase font-bold text-default-400">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Tabla Principal */}
      <Card className="dark:bg-zinc-950 border border-divider shadow-none">
        <CardBody className="p-0">
          <OrdersTable onOpenDetail={handleViewOrder} />
        </CardBody>
      </Card>

      {/* Modal de Detalle */}
      <OrderDetailModal 
        isOpen={isOpen} 
        onClose={onClose} 
        order={selectedOrder} 
      />
    </div>
  );
};

export default OrdersPage;