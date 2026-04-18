import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
  Button,
  Select,
  SelectItem
} from "@heroui/react";
import { FiEye, FiPackage, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useAdminOrders, useUpdateOrderStatus } from '../hooks/useOrders';
import type { IOrder } from '../types/order';
// import { IOrder } from '../types/order';
interface OrderTableProps{
    onOpenDetail:(order:IOrder)=>void;
}
const OrdersTable:React.FC<OrderTableProps> = ({onOpenDetail}) => {
  const { data: orders, isLoading } = useAdminOrders();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();

  const columns = [
    { name: "ID ORDEN", uid: "id" },
    { name: "FECHA", uid: "orderDate" },
    { name: "TOTAL", uid: "total" },
    { name: "DIRECCIÓN", uid: "shippingAddress" },
    { name: "ESTADO", uid: "status" },
    { name: "ACCIONES", uid: "actions" },
  ];

  const renderCell = React.useCallback((order: IOrder, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <span className="font-bold text-default-600">#{order.id}</span>;
      
      case "orderDate":
        return (
          <span className="text-default-500 text-sm">
            {new Date(order.orderDate).toLocaleDateString('es-AR', {
              day: '2-digit', month: '2-digit', year: 'numeric'
            })}
          </span>
        );

      case "total":
        return <span className="font-semibold text-primary">${order.total.toLocaleString()}</span>;

      case "shippingAddress":
        return (
          <div className="max-w-[180px] truncate text-default-400 text-xs">
            <Tooltip content={order.shippingAddress} placement="top-start">
              <span>{order.shippingAddress}</span>
            </Tooltip>
          </div>
        );

      case "status":
        return (
          <Select
            size="sm"
            variant="flat"
            className="w-40"
            aria-label="Cambiar estado"
            selectedKeys={[order.status]}
            disallowEmptySelection
            // En HeroUI, usamos onChange y accedemos a e.target.value
            onChange={(e) => updateStatus({ id: order.id, status: e.target.value })}
            isDisabled={isUpdating}
          >
            {/* CORRECCIÓN: Quitamos 'value' y usamos solo 'key' */}
            <SelectItem key="pending" startContent={<FiPackage className="text-warning" />}>
              Pendiente
            </SelectItem>
            <SelectItem key="shipped" startContent={<FiTruck className="text-primary" />}>
              Enviado
            </SelectItem>
            <SelectItem key="delivered" startContent={<FiCheckCircle className="text-success" />}>
              Entregado
            </SelectItem>
            <SelectItem key="cancelled" startContent={<FiXCircle className="text-danger" />}>
              Cancelado
            </SelectItem>
          </Select>
        );

      case "actions":
        return (
          <Tooltip content="Ver detalles">
            <Button 
              isIconOnly 
              size="sm" 
              variant="light" 
              onPress={() => onOpenDetail(order)}
            >
              <FiEye size={18} className="text-default-400" />
            </Button>
          </Tooltip>
        );
      
      default:
        return null;
    }
  }, [updateStatus, isUpdating]);

  return (
    <Table 
      aria-label="Tabla de gestión de pedidos"
      className="min-h-[400px]"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody 
        items={orders ?? []} 
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando pedidos..." />}
        emptyContent={!isLoading && "No hay pedidos para mostrar"}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;