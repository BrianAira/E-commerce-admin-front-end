export interface ImageAPi{
  id:number;
  url:string;
  is_main:boolean;
}

export interface VariantApi{
  id:number;
  talle:string;
  color:string;
  stock_current:number;
  sku:string;
}

export interface ProductApi{
    id:number;
    name:string;
    description:string;
    gender:string;
    price:number;
    category_id:number;
    sku_base:string;
    variants:VariantApi[];
    images:ImageAPi[];

}