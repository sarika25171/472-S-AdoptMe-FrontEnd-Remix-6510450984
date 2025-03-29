export type OrderStatus = "PENDING" | "SUCCESSFUL" | "FAILED";


export default interface Order {
    id: number;
    user_id: string;
    product_id: number;
    session_id: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    order_status: OrderStatus;
    order_date: Date;
    total_price: number;
}
