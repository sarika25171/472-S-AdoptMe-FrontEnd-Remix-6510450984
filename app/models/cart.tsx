import Product from "./product";

export interface Cart {
    id: number;
    user_id: string;
    product_id: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
    product: Product;
}