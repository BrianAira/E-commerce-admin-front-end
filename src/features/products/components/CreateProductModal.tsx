import  { useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, Textarea, Divider, ScrollShadow, Chip
} from "@heroui/react";
import { FiPlus, FiSave, FiTrash2, FiShoppingBag, FiTag } from "react-icons/fi";
import { useCreateProduct } from "../hooks/useProducts";
import { useToast } from "../../../components/ui/ToastProvider";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProductModal = ({ isOpen, onClose }: Props) => {
  const { addToast } = useToast();
  const { mutate: createProduct, isPending } = useCreateProduct();

  // Estado del producto base
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    sku_base: "",
    gender: "Unisex",
    imageUrl: "" // Usamos este campo para la imagen principal inicialmente
  });

  // Estado para la variante actual
  const [currentVariant, setCurrentVariant] = useState({ color: "", size: "", stock: "" });
  // Lista de variantes
  const [variants, setVariants] = useState<any[]>([]);

  const handleAddVariant = () => {
    if (!currentVariant.color || !currentVariant.size || !currentVariant.stock) {
      return addToast("Completa los datos de la variante", "error");
    }
    // Guardamos con los nombres internos del estado, mapearemos al enviar
    setVariants([...variants, { ...currentVariant, stock: Number(currentVariant.stock) }]);
    setCurrentVariant({ color: "", size: "", stock: "" });
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Validamos solo lo estrictamente necesario para el producto base
    if (!formData.name || !formData.price || !formData.category_id) {
      return addToast("Nombre, Precio y Categoría son obligatorios", "error");
    }

    // CONSTRUCCIÓN DEL PAYLOAD FINAL
    const payload = {
      name: formData.name,
      description: formData.description,
      gender: formData.gender,
      price: Number(formData.price),
      category_id: Number(formData.category_id),
      sku_base: formData.sku_base,
      
      // MAPEO DE VARIANTES: 
      // Si el arreglo está vacío, se envía [], cumpliendo con el backend.
      // Si tiene datos, se mapean a los campos que el backend exige (talle, stock_current, etc.)
      variants: variants.map(v => ({
        color: v.color,
        talle: v.size, // Cambio de 'size' a 'talle' según tu esquema de API
        sku: `${formData.sku_base}-${v.color}-${v.size}`.toUpperCase(),
        stock_current: v.stock,
        stock_min: 5, // Valor por defecto común
      })),

      // MAPEO DE IMÁGENES:
      // Si hay una URL en el input, creamos el arreglo de un objeto.
      // Si está vacío, enviamos [].
      images: formData.imageUrl 
        ? [{ url: formData.imageUrl, is_main: true }] 
        : []
    };

    createProduct(payload, {
      onSuccess: () => {
        addToast("¡Producto creado exitosamente!", "success");
        onClose();
        // Limpieza de estados
        setVariants([]);
        setFormData({ 
          name: "", description: "", price: "", 
          category_id: "", sku_base: "", imageUrl: "", gender: "Unisex" 
        });
      },
      onError: (error: any) => {
        console.error("Payload enviado:", payload);
        addToast("Error al crear el producto. Revisa los datos.", "error");
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside" backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex gap-2 items-center text-2xl">
          <FiShoppingBag className="text-primary" /> Nuevo Producto
        </ModalHeader>
        <ModalBody className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-default-600 flex items-center gap-2">
              <FiTag /> Información General
            </h4>
            <Input 
              label="Nombre" 
              placeholder="Ej: Medias soquetes..."
              variant="bordered"
              value={formData.name}
              onValueChange={(v) => setFormData({...formData, name: v})}
            />
            <Input 
              label="Género" 
              placeholder="niño, hombre, mujer..."
              variant="bordered"
              value={formData.gender}
              onValueChange={(v) => setFormData({...formData, gender: v})}
            />
            <div className="flex gap-2">
              <Input 
                label="Precio" 
                type="number" 
                variant="bordered"
                startContent="$"
                value={formData.price}
                onValueChange={(v) => setFormData({...formData, price: v})}
              />
              <Input 
                label="Categoría ID" 
                type="number" 
                variant="bordered"
                value={formData.category_id}
                onValueChange={(v) => setFormData({...formData, category_id: v})}
              />
            </div>
            <Input 
              label="SKU Base" 
              placeholder="MDA-SOQT"
              variant="bordered"
              value={formData.sku_base}
              onValueChange={(v) => setFormData({...formData, sku_base: v})}
            />
            <Input 
              label="URL Imagen Principal" 
              placeholder="https://..." 
              variant="bordered"
              value={formData.imageUrl}
              onValueChange={(v) => setFormData({...formData, imageUrl: v})}
            />
            <Textarea 
              label="Descripción" 
              variant="bordered"
              value={formData.description}
              onValueChange={(v) => setFormData({...formData, description: v})}
            />
          </div>

          <div className="flex flex-col gap-4 bg-default-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-divider">
            <h4 className="font-bold text-default-600">Configurar Variantes</h4>
            
            <div className="grid grid-cols-3 gap-2">
              <Input size="sm" label="Color" value={currentVariant.color} onValueChange={(v) => setCurrentVariant({...currentVariant, color: v})} />
              <Input size="sm" label="Talle" value={currentVariant.size} onValueChange={(v) => setCurrentVariant({...currentVariant, size: v})} />
              <Input size="sm" label="Stock" type="number" value={currentVariant.stock} onValueChange={(v) => setCurrentVariant({...currentVariant, stock: v})} />
            </div>
            <Button size="sm" color="primary" variant="flat" startContent={<FiPlus />} onPress={handleAddVariant}>
              Agregar Variante
            </Button>

            <Divider />

            <ScrollShadow className="h-[200px]">
              {variants.length === 0 ? (
                <p className="text-tiny text-default-400 text-center mt-4">Sin variantes (se creará solo el base)</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {variants.map((v, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-content1 rounded-lg border border-divider">
                      <div className="flex gap-2">
                        <Chip size="sm" variant="flat" color="primary">{v.color}</Chip>
                        <Chip size="sm" variant="flat">{v.size}</Chip>
                        <span className="text-small font-bold">x{v.stock}</span>
                      </div>
                      <Button isIconOnly size="sm" color="danger" variant="light" onPress={() => removeVariant(i)}>
                        <FiTrash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollShadow>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>Cancelar</Button>
          <Button color="primary" startContent={<FiSave />} isLoading={isPending} onPress={handleSave}>
            Crear Producto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};