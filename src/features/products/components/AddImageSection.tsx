import { useState } from "react";
import { Button, Input, Image } from "@heroui/react";
import { FiPlus, FiImage, FiLink } from "react-icons/fi";
// import { useAddProductImage } from "../hooks/useProducts";
import { useToast } from "../../../components/ui/ToastProvider";
import { useUploadProductImages } from "../hooks/useProducts";
import type { IProductImage } from "../types/product";

interface AddImageProps{
    productId:number;
    currentImages:IProductImage[];
}

export const AddImageSection = ({ productId, currentImages }:AddImageProps ) => {
  const [imageUrl, setImageUrl] = useState("");
  const { mutate: addImage, isPending } = useUploadProductImages();
  const { addToast } = useToast();

  const handleAdd = () => {
    if (!imageUrl.trim()) return;
    
    addImage(
      { productId, imageUrl },
      {
        onSuccess: () => {
          addToast("Imagen añadida con éxito", "success");
          setImageUrl(""); // Limpiar input
        },
        onError: () => addToast("Error al añadir la imagen", "error")
      }
    );
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Input de Nueva Imagen */}
      <div className="flex items-end gap-2 bg-default-50 p-4 rounded-xl border border-divider">
        <Input
          label="Nueva URL de Imagen"
          placeholder="https://ejemplo.com/imagen.jpg"
          variant="bordered"
          value={imageUrl}
          onValueChange={setImageUrl}
          startContent={<FiLink className="text-default-400" />}
          className="flex-1"
        />
        <Button 
          color="primary" 
          onPress={handleAdd} 
          isLoading={isPending}
          startContent={!isPending && <FiPlus />}
        >
          Añadir
        </Button>
      </div>

      {/* Galería Actual */}
      <div className="flex flex-col gap-3">
        <span className="text-small font-bold text-default-600 px-1">Galería de Imágenes</span>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {currentImages.map((img, idx) => (
            <div key={idx} className="relative group aspect-square">
              <Image
                src={img.url}
                alt={`Producto ${idx}`}
                className="w-full h-full object-cover rounded-xl border border-divider shadow-sm"
              />
            </div>
          ))}
          {currentImages.length === 0 && (
            <div className="col-span-full py-10 border-2 border-dashed border-divider rounded-xl flex flex-col items-center justify-center text-default-400">
              <FiImage size={32} />
              <p className="text-tiny mt-2">No hay imágenes registradas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};