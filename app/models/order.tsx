export type OrderStatus = "PENDING" | "DELIVERED" | "CANCELLED";

export default interface Order {
    id: number;
    user_id: string;
    product_id: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    order_status: OrderStatus;
    order_date: Date;
    total_price: number;
    rating: String;
    comment: String;
    reply_admin: String;
}
