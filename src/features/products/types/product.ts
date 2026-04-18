// import type { ProductImage } from "./productImages";
// import type { ProductVariant } from "./productVariants";

export interface ICategory {
  id: number;
  name: string;
}

export interface IProductImage{
  id:number;
  url:string;
  isPrimary:boolean;
}

export interface IProductVariant{
  id:number;
  size:string;
  color:string;
  stock:number;
  sku:string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl?: string;
  allImages:IProductImage[]
  variants:IProductVariant[]
  categoryId: number;
  totalStock: number;
  // stock_min: number;
  skuBase: string;
}

export interface FilterState {
  categories: string[];
  price_min?: number;
  price_max?: number;
  sort?: string;
}