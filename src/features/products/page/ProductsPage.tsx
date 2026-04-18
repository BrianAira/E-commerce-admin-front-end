import  { useState } from "react";
import { Button, useDisclosure } from "@heroui/react";
import { FiPlus } from "react-icons/fi";
import { ProductsTable } from "../components/ProductsTable";
import { ProductDetailModal } from "../components/ProductDetailModal";
import { type IProduct } from "../types/product";
import { CreateProductModal } from "../components/CreateProductModal";

export const ProductsPage = () => {
  // Estado para el modal y el producto seleccionado
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header de la página */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Productos</h1>
          <p className="text-default-400 text-small">Administra el inventario y variantes de Educart</p>
        </div>
        <Button 
          color="primary" 
          startContent={<FiPlus />} 
          onPress={() => onCreateOpen()} // Aquí abrirías un modal de "Crear"
        >
          Nuevo Producto
        </Button>
      </div>

      {/* Tabla de Productos */}
      <ProductsTable onEdit={handleEdit} />

      {/* Modal de Detalle (Solo se renderiza si hay un producto o si es creación) */}
      {selectedProduct && (
        <ProductDetailModal 
          isOpen={isOpen} 
          onClose={handleClose} 
          product={selectedProduct} 
        />
      )}

      <CreateProductModal isOpen={isCreateOpen} onClose={onCreateClose}></CreateProductModal>
    </div>
  );
};