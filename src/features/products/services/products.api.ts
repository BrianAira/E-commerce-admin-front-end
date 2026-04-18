import { api } from "../../../api/axiosClient";
import type { IProduct } from "../types/product";
import type { ProductApi } from "../types/Products.api";
// import type { Product, ProductCreate, ProductListItem, ProductUpdate } from "../types/product";
import {mapProductToI} from "../types/mappers";
import type {  StockUpdateResponse, VariantCreateApi, VariantResponseApi } from "../types/variants";

export const productsApi = {
  // Obtener todos los productos (mapeados)
  getAll: async (): Promise<IProduct[]> => {
    const { data } = await api.get<ProductApi[]>("/products/");
    return data.map(mapProductToI);
  },

  // Obtener un solo producto por ID
  getById: async (id: number): Promise<IProduct> => {
    const { data } = await api.get<ProductApi>(`/products/${id}`);
    return mapProductToI(data);
  },

  // Crear producto (Transforma de IProduct a lo que espera la API si es necesario)
  create: async (productData: Partial<IProduct>): Promise<IProduct> => {
    const { data } = await api.post<ProductApi>("/products/", productData);
    return mapProductToI(data);
  },

  // Actualizar producto
  update: async (id: number, productData: Partial<IProduct>): Promise<IProduct> => {
    const { data } = await api.patch<ProductApi>(`/products/${id}`, productData);
    return mapProductToI(data);
  },

  // Eliminar producto
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Ejemplo de búsqueda/filtros
  getByCategory: async (categoryId: number): Promise<IProduct[]> => {
    const { data } = await api.get<ProductApi[]>(`/products/?category_id=${categoryId}`);
    return data.map(mapProductToI);
  },
  /**
   * Variantes
   */
  addVariant: async (productId: number, variant: VariantCreateApi): Promise<VariantResponseApi> => {
    const { data } = await api.post<VariantResponseApi>(
      `/products/${productId}/variant`, 
      variant
    );
    return data;
  },

  /**
   * Imágenes
   */
  addImages: async (productId: number, imageUrl: string) => {
    // El backend espera un array de strings y devuelve un string
    const { data } = await api.post(
      `/products/${productId}/images`, 
      [imageUrl]
    );
    return data;
  },

  /**
   * Helper para actualizar stock rápidamente
   */
  updateVariantStock: async (variantId: number, newStock: number): Promise<VariantResponseApi> => {
    const { data } = await api.patch<VariantResponseApi>(`/variants/${variantId}`, {
      stock_current: newStock
    });
    return data;
  },
  addStock: async (variantId: number, amount: number): Promise<StockUpdateResponse> => {
    // Nota: Si el backend recibe la cantidad por Body:
    // const { data } = await api.patch<StockUpdateResponse>(
    //   `/products/variants/${variantId}/add-stock`, 
    //   { amount } // O el nombre de campo que use tu Pydantic model en FastAPI
    // );
    const { data } = await api.patch(`/products/variants/${variantId}/add-stock`, null, {
    params: {
      quantity: amount // Axios lo convierte automáticamente a ?quantity=X
    }
  });
    /* Si el backend recibe la cantidad por Query Param, sería:
       const { data } = await api.patch<StockUpdateResponse>(
         `/products/variants/${variantId}/add-stock?amount=${amount}`
       );
    */
    return data;
    }
};