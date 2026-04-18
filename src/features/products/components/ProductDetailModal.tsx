import  { useEffect, useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Tabs, Tab, Input, Textarea, Divider,
  
} from "@heroui/react";
import { FiInfo, FiBox, FiSave, FiPlus, FiImage } from "react-icons/fi";
import { type IProduct } from "../types/product";
import { useAddVariantStock, useProducts, useUpdateProduct } from "../hooks/useProducts"; // El hook que creamos
import { useToast } from "../../../components/ui/ToastProvider";
import { AddVariantForm } from "./AddVariantForm";
import { AddImageSection } from "./AddImageSection";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct;
}

export const ProductDetailModal = ({ isOpen, onClose, product:initialProduct }: Props) => {
  const {addToast}=useToast()
  const [selectedTab, setSelectedTab] = useState("general");
  const { mutate: addStock, isPending: isUpdatingStock } = useAddVariantStock();
  const {mutate:updateProduct, isPending:isSaving}=useUpdateProduct();
  const [formData, setFormData] = useState({ name: "", price: 0, description: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  // 1. Obtenemos todos los productos de la caché actual
  const { data: allProducts } = useProducts(); 

  // 2. Buscamos la versión más fresca de ESTE producto
  const product = allProducts?.find(p => p.id === initialProduct.id) || initialProduct;
  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
      });
      setShowAddForm(false)
    }
  }, [product, isOpen]);

  const handleSaveGeneral = () => {
    updateProduct(
      { id: product.id, ...formData }, // Enviamos el ID y los datos del estado
      {
        onSuccess: () => {
          addToast("Producto actualizado con éxito", "success");
        },
        onError: () => {
          addToast("Error al guardar los cambios", "error");
        }
      }
    );
  };
  const handleAddStock = (variantId: number, color: string, size: string) => {
    addStock(
      { variantId, amount: 5 }, 
      { 
        onSuccess: (data) => {
          // Lanzamos el toast cuando la API responde
          addToast(
            `Stock actualizado: ${color} (${size}) ahora tiene ${data.stock_current} unidades`, 
            "success"
          );
        },
        onError: () => {
          addToast("Error al actualizar el stock", "error");
        }
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">Gestionar Producto</h3>
              <p className="text-tiny text-default-400">SKU Base: {product.skuBase}</p>
            </ModalHeader>
            <ModalBody>
              <Tabs 
                selectedKey={selectedTab} 
                onSelectionChange={(key) => setSelectedTab(key as string)}
                color="primary" 
                variant="underlined"
              >
                {/* TAB 1: INFORMACIÓN GENERAL */}
                <Tab key="general" title={<div className="flex items-center gap-2"><FiInfo/> General</div>}>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Input 
                    label="Nombre" 
                    value={formData.name}
                    onValueChange={(val)=>setFormData({...formData, name:val})}
                    // defaultValue={product.name} 
                    variant="bordered" 
                    className="col-span-2" 
                    />
                    <Input 
                    label="Precio" 
                    value={formData.price.toString()}
                    onValueChange={(val)=>setFormData({...formData, price:Number(val)})}
                    // defaultValue={product.price.toString()} 
                    startContent="$" 
                    variant="bordered" />
                    <Input 
                    label="Categoría ID"
                    value={product.categoryId.toString()}
                    // defaultValue={product.categoryId.toString()} 
                    variant="bordered" 
                    isReadOnly />
                    <Textarea 
                    label="Descripción" 
                    value={formData.description}
                    onValueChange={(val)=>setFormData({...formData, description:val})}
                    // defaultValue={product.description} 
                    variant="bordered" 
                    className="col-span-2" />
                  </div>
                </Tab>
                {/* TAB 2: MULTIMEDIA (NUEVA) */}
                <Tab key="media" title={<div className="flex items-center gap-2"><FiImage/> Multimedia</div>}>
                  <AddImageSection 
                    productId={product.id} 
                    currentImages={product.allImages ||[]} 
                  />
                </Tab>

                {/* TAB 2: VARIANTES E INVENTARIO */}
                <Tab key="inventory" title={<div className="flex items-center gap-2"><FiBox/> Inventario</div>}>
                  <div className="flex flex-col gap-4 pt-4">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-small font-bold text-default-600">Variantes Registradas</span>
                      
                      {/* Solo mostramos el botón si el formulario está oculto */}
                      {!showAddForm && (
                        <Button 
                          size="sm" 
                          color="primary" 
                          variant="flat" 
                          startContent={<FiPlus />}
                          onPress={() => setShowAddForm(true)}
                        >
                          Nueva Variante
                        </Button>
                      )}
                    </div>
                    <Divider />
                    {showAddForm && (
                      <div className="animate-in fade-in zoom-in duration-200">
                         <AddVariantForm 
                            productId={product.id} 
                            skuBase={product.skuBase} 
                         />
                         <Button 
                           size="lg" 
                           variant="light" 
                           color="danger" 
                           className="mt-[-10px] ml-auto h-7"
                           onPress={() => setShowAddForm(false)}
                         >
                           Cancelar
                         </Button>
                      </div>
                    )}
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="flex justify-between items-center p-3 border border-divider rounded-xl hover:bg-default-50 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">{variant.color} - Talle {variant.size}</span>
                          <span className="text-tiny text-default-400">SKU: {variant.sku}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-lg font-bold text-primary">{variant.stock}</span>
                            <span className="text-tiny text-default-400 ml-1">unidades</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="flat" 
                            isIconOnly
                            isLoading={isUpdatingStock}
                            onPress={() => handleAddStock(variant.id, variant.color, variant.size)}
                          >
                            <FiPlus />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button 
              variant="light" 
              onPress={onClose}
              
              >Cerrar</Button>
              <Button 
              color="primary" 
              startContent={<FiSave />}
              onPress={handleSaveGeneral}
              isLoading={isSaving}
              >Guardar Cambios</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};