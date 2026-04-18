import React, { useState } from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { FiPlus, FiCheck } from "react-icons/fi";
import { useCreateVariant } from "../hooks/useProducts"; // Ajusta la ruta
import { useToast } from "../../../components/ui/ToastProvider";

interface Props {
  productId: number;
  skuBase: string;
}

export const AddVariantForm = ({ productId, skuBase }: Props) => {
  const { addToast } = useToast();
  
  // 1. Usamos tu hook específico
  const { mutate: createVariant, isPending } = useCreateVariant();
  
  const [newVariant, setNewVariant] = useState({
    color: "",
    talle: "",
    stock_current: ""
  });

  const handleAdd = () => {
    if (!newVariant.color || !newVariant.talle || !newVariant.stock_current) {
      return addToast("Faltan datos de la variante", "error");
    }

    // Preparamos el objeto 'data' incluyendo el 'product_id' que exige tu interfaz
    const variantData = {
      product_id: productId, // <--- CAMBIO: Agregado para cumplir con VariantCreateApi
      color: newVariant.color,
      talle: newVariant.talle,
      stock_current: Number(newVariant.stock_current),
      stock_min: 5, 
      sku: `${skuBase}-${newVariant.color}-${newVariant.talle}`.toUpperCase()
    };

    // 3. Llamada al mutate con la estructura que pide tu hook: { productId, data }
    createVariant(
      { 
        productId: productId, 
        data: variantData 
      },
      {
        onSuccess: () => {
          addToast("Variante inyectada con éxito", "success");
          setNewVariant({ color: "", talle: "", stock_current: "" }); // Reset
        },
        onError: (error) => {
          console.error(error);
          addToast("Error al crear variante en el servidor", "error");
        }
      }
    );
  };

  return (
    <Card shadow="none" className="border-2 border-dashed border-divider bg-default-50/50 mb-4">
      <CardBody className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
           <div className="p-1 bg-primary/10 rounded-full">
             <FiPlus className="text-primary" size={14}/>
           </div>
           <span className="text-tiny font-bold text-default-600 uppercase tracking-wider">
             Agregar Nueva Variante
           </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input 
            size="sm" 
            label="Color" 
            placeholder="Ej: Rojo"
            variant="bordered"
            value={newVariant.color}
            onValueChange={(v) => setNewVariant({...newVariant, color: v})}
          />
          <Input 
            size="sm" 
            label="Talle" 
            placeholder="Ej: XL"
            variant="bordered"
            value={newVariant.talle}
            onValueChange={(v) => setNewVariant({...newVariant, talle: v})}
          />
          <Input 
            size="sm" 
            label="Stock Inicial" 
            type="number"
            variant="bordered"
            value={newVariant.stock_current}
            onValueChange={(v) => setNewVariant({...newVariant, stock_current: v})}
          />
        </div>

        <Button 
          size="sm" 
          color="primary" 
          variant="flat"
          startContent={<FiCheck />}
          isLoading={isPending}
          onPress={handleAdd}
          className="font-bold"
        >
          Guardar Variante
        </Button>
      </CardBody>
    </Card>
  );
};