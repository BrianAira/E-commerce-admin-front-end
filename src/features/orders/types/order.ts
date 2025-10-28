

export interface Order{
    status:string;
    total_amount:number;
    shipping_address:string;
    client_id:number;
    created_at:Date;
    items:string[]   
}