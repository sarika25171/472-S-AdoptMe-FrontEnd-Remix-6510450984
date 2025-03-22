import Order from "~/models/order";

const Domain = process.env.DOMAIN!

const apiPath = `${Domain}/order`;

export default class OrderAPI {
    static async getAll(): Promise<Order[]> {
        const res = await fetch(`${apiPath}/getAll`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async getById(id: number): Promise<Order> {
        const res = await fetch(`${apiPath}/getById/${id}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch order: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async createOrder(
        user_id: string,
        product_id: number,
        quantity: number,
        total_price: number
    ) {
        const res = await fetch(`${apiPath}/createOrder`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id,
                product_id,
                quantity,
                total_price
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to create order: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async updateOrder(
        id: number,
        order: Partial<Order>
    ) {
        const res = await fetch(`${apiPath}/updateOrder`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                order
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to update order: ${res.status} ${res.statusText}`);
        }
        return data;
    }
}

