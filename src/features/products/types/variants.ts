// --- VARIANTES ---

// Lo que enviamos al backend (POST /products/{id}/variant)
export interface VariantCreateApi {
  color: string;
  talle: string;
  sku: string;
  stock_current: number;
  stock_min: number;
  product_id: number;
}

// Lo que recibimos del backend
export interface VariantResponseApi extends VariantCreateApi {
  id: number;
  stock_status: "in_stock" | "low_stock" | "out_of_stock" | string;
}
export interface StockUpdateResponse {
  id: number;
  product_id: number;
  sku: string;
  color: string;
  talle: string;
  price: number;
  stock_current: number;
  stock_min: number;
}
// --- IMÁGENES ---

// El backend pide un array de strings (URLs)
export type ImageUploadRequest = string[];

// El backend devuelve un string (confirmación o URL procesada)
export type ImageUploadResponse = string;