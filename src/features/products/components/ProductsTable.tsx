import React from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  User, Chip, Tooltip, Button, Spinner
} from "@heroui/react";
import { FiEdit2, FiTrash2, 
    // FiEye, FiPlus 
} from "react-icons/fi";
import { useProducts } from "../hooks/useProducts";
import { type IProduct } from "../types/product";

interface ProductsTableProps{
  onEdit:(product:IProduct)=>void;
}

export const ProductsTable:React.FC<ProductsTableProps> = ({onEdit}) => {
  const { data: products, isLoading } = useProducts();

  // Definición de columnas
  const columns = [
    { name: "PRODUCTO", uid: "name" },
    { name: "CATEGORÍA", uid: "category" },
    { name: "PRECIO", uid: "price" },
    { name: "STOCK TOTAL", uid: "stock" },
    { name: "ESTADO", uid: "status" },
    { name: "ACCIONES", uid: "actions" },
  ];

  const renderCell = (product: IProduct, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: product.imageUrl }}
            description={product.skuBase}
            name={product.name}
          >
            {product.name}
          </User>
        );
      case "category":
        return <p className="text-bold text-sm capitalize text-default-400">{product.categoryId}</p>;
      case "price":
        return <p className="text-bold text-sm">${product.price.toLocaleString()}</p>;
      case "stock":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{product.totalStock} unidades</p>
            <p className="text-tiny text-default-400">{product.variants.length} variantes</p>
          </div>
        );
      case "status":{
        const isLowStock = product.totalStock < 10 && product.totalStock > 0;
        const isOut = product.totalStock === 0;
        return (
          <Chip
            className="capitalize"
            color={isOut ? "danger" : isLowStock ? "warning" : "success"}
            size="sm"
            variant="flat"
          >
            {isOut ? "Sin Stock" : isLowStock ? "Stock Bajo" : "Disponible"}
          </Chip>
        );
    }
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver detalles e inventario">
              <Button isIconOnly size="sm" variant="light" onPress={() => onEdit(product)}>
                <FiEdit2 className="text-default-400" />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar producto">
              <Button isIconOnly size="sm" variant="light">
                <FiTrash2 className="text-danger" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) return <div className="flex justify-center p-10"><Spinner label="Cargando catálogo..." /></div>;

  return (
    <Table 
      aria-label="Tabla de productos Educart"
      bottomContentPlacement="outside"
      selectionMode="none"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={products || []} emptyContent={"No hay productos registrados"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};