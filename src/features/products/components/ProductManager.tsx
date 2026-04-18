import { Tabs, Tab, Card, Button } from "@heroui/react";
import { 
    // FiPackage,
     FiLayers, FiEdit3 } from "react-icons/fi";
import type { IProduct } from "../types/product";

export const ProductManager = ({ product }: { product: IProduct }) => {
  return (
    <Tabs aria-label="Opciones de producto" color="primary" variant="underlined">
      <Tab
        key="info"
        title={
          <div className="flex items-center gap-2">
            <FiEdit3 /> <span>Información</span>
          </div>
        }
      >
        <Card className="p-4">
          {/* Aquí iría el formulario de edición de nombre, precio, etc. */}
          <p className="text-sm text-default-500">Editar datos básicos de {product.name}</p>
        </Card>
      </Tab>
      
      <Tab
        key="variants"
        title={
          <div className="flex items-center gap-2">
            <FiLayers /> <span>Variantes e Inventario</span>
          </div>
        }
      >
        <Card className="p-4 gap-4">
          {/* Aquí mapeamos las variantes y usamos el hook useAddVariantStock */}
          {product.variants.map(variant => (
            <div key={variant.id} className="flex justify-between items-center border-b pb-2">
              <span>{variant.color} - Talle {variant.size}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">{variant.stock} u.</span>
                <Button size="sm" variant="flat" onPress={() => {/* Abrir modal stock */}}>
                  +
                </Button>
              </div>
            </div>
          ))}
          <Button color="primary" variant="ghost" size="sm">
            Añadir Nueva Variante
          </Button>
        </Card>
      </Tab>
    </Tabs>
  );
};