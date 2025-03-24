import {Cart, CartItem } from "~/models/cart";

const Domain = process.env.DOMAIN!;
const apiPath = `${Domain}/cart`;

export default class CartAPI {
    static async getCart(userId: string): Promise<Cart> {
        const res = await fetch(`${apiPath}/getCart/${userId}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch cart: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async addToCart(userId: string, productId: number, quantity: number): Promise<Cart> {
        const res = await fetch(`${apiPath}/addToCart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
                quantity: quantity
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to add to cart: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async updateCartItem(userId: string, itemId: number, quantity: number): Promise<Cart> {
        const res = await fetch(`${apiPath}/updateCartItem`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                item_id: itemId,
                quantity: quantity
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to update cart: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async removeFromCart(userId: string, itemId: number): Promise<Cart> {
        const res = await fetch(`${apiPath}/removeFromCart`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                item_id: itemId
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to remove from cart: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async clearCart(userId: string): Promise<Cart> {
        const res = await fetch(`${apiPath}/clearCart`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to clear cart: ${res.status} ${res.statusText}`);
        }
        return data;
    }
} 