export interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    name: string;
    image_url: string;
}

export interface Cart {
    items: CartItem[];
    total: number;
} 