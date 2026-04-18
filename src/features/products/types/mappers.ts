import type { IProduct, IProductImage, IProductVariant } from "./product";
import type { ProductApi } from "./Products.api";

/**
 * Mappers: Transforman los datos de la API al formato de la Interfaz (IProduct)
 */
export const mapVariantToI = (v: any): IProductVariant => ({
  id: v.id,
  size: v.talle, // API 'talle' -> UI 'size'
  color: v.color,
  stock: v.stock_current, // API 'stock_current' -> UI 'stock'
  sku: v.sku,
});

export const mapImageToI = (img: any): IProductImage => ({
  id: img.id,
  url: img.url,
  isPrimary: img.is_main, // API 'is_main' -> UI 'isPrimary'
});

export const mapProductToI = (p: ProductApi): IProduct => {
  const variants = p.variants?.map(mapVariantToI) || [];
  const images = p.images?.map(mapImageToI) || [];
  
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    rating: 0, // Valor por defecto si la API no lo provee
    imageUrl: images.find(img => img.isPrimary)?.url || images[0]?.url || "",
    allImages: images,
    variants: variants,
    categoryId: p.category_id,
    skuBase: p.sku_base,
    totalStock: variants.reduce((acc, curr) => acc + curr.stock, 0),
  };
};