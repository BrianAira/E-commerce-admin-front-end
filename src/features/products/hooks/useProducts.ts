import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IProduct } from "../types/product";
import { productsApi } from "../services/products.api";
import type {  StockUpdateResponse, VariantCreateApi, VariantResponseApi } from "../types/variants";
// import { useToast } from "../../../components/ui/ToastProvider";
//  const {addToast}=useToast()
/**
 * Hook para obtener la lista de productos (Admin o Cliente)
 */
export const useProducts = (filters?: any) => {
  return useQuery<IProduct[], Error>({
    queryKey: ["products", filters],
    queryFn: () => productsApi.getAll(), // Puedes pasar filters si refactorizas getAll
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener un producto único
 */
export const useProductDetail = (id: number) => {
  return useQuery<IProduct, Error>({
    queryKey: ["products", "detail", id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Crear un producto
 */
export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation<IProduct, Error, Partial<IProduct>>({
    mutationFn: (data) => productsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedData: Partial<IProduct> & { id: number }) => 
      productsApi.update(updatedData.id, updatedData),
    onSuccess: () => {
      // Importante: Invalida la lista para que la tabla y el modal vean los cambios
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

/**
 * Actualizar Stock de una Variante (El PATCH específico que definimos)
 */
export const useAddVariantStock = () => {
  const qc = useQueryClient();
  return useMutation<StockUpdateResponse, Error, { variantId: number; amount: number }>({
    mutationFn: ({ variantId, amount }) => productsApi.addStock(variantId, amount),
    onSuccess: (data) => {
      // Refrescamos el producto específico para ver el nuevo totalStock
      qc.invalidateQueries({ queryKey: ["products", "detail", data.product_id] });
      // Refrescamos la lista general por si el stock_status cambió de "out_of_stock" a "in_stock"
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

/**
 * Añadir una nueva variante a un producto
 */
export const useCreateVariant = () => {
  const qc = useQueryClient();
  return useMutation<VariantResponseApi, Error, { productId: number; data: VariantCreateApi }>({
    mutationFn: ({ productId, data }) => productsApi.addVariant(productId, data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["products", "detail", data.product_id] });
    },
  });
};

/**
 * Subir imágenes a un producto
 */
export const useUploadProductImages = () => {
  const qc = useQueryClient();
  return useMutation<string, Error, { productId: number; imageUrl: string }>({
    mutationFn: ({ productId, imageUrl: urls }) => productsApi.addImages(productId, urls),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["products", "detail", variables.productId] });
      // addToast("Imagen añadida correctamente", "success");
    },
    onError: (error) => {
      console.error("Error al subir imagen:", error);
      // addToast("Error al procesar la imagen", "error");
    }
  });
};

/**
 * Eliminar producto
 */
export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};