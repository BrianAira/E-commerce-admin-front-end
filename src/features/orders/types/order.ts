export interface IOrderItem {
    productId: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        imageUrl: string;
    };
}

export interface IOrder {
    id: number;
    userId: number;
    orderDate: string;
    status: string;
    trackingNumber?:string;
    shippingAddress: string;
    // locality: string;
    total: number;
    items: IOrderItem[];
}


export interface OrderItemApi {
    product_id: number;
    quantity: number;
    unit_price: number;
    product: {
        id: number;
        name: string;
        image_url: string;
    };
}

export interface OrderApi {
    id: number;
    user_id: number;
    order_date: string;
    status: string;
    tracking_number?:string;
    shipping_address_snapshot: string;
    // locality: string;
    total_amount: number;
    items: OrderItemApi[];
}

export interface CreateOrderPayload {
    shipping_address: string;
    locality: string;
}

export interface CheckoutPayload{
    cart_id:number;
    shipping_address_id:number;
}

export interface CheckoutResponse{
    order_id:number;
    total_amount:number;
    status:string;
    payment_url:string;
}