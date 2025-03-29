import { Cart } from "~/models/cart";
import { domainPath } from "../config.server";

const Domain = domainPath();

const apiPath = `${Domain}/cart`;

export default class CartAPI {
  static async getCart(userId: string): Promise<Cart[]> {
    try {
      const res = await fetch(`${apiPath}/getCart/${userId}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to fetch cart: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }

  static async addToCart(
    userId: string,
    productId: number,
    quantity: number
  ): Promise<Cart> {
    try {
      const res = await fetch(`${apiPath}/addToCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity: quantity,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to add to cart: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }

  static async updateCartItem(
    userId: string,
    productId: number,
    quantity: number
  ): Promise<Cart> {
    try {
      const res = await fetch(`${apiPath}/updateCartItem`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity: quantity,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to update cart: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  }

  static async removeFromCart(
    userId: string,
    productId: number
  ): Promise<Cart> {
    try {
      const res = await fetch(`${apiPath}/removeFromCart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to remove from cart: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  }

  static async clearCart(userId: string): Promise<Number> {
    try {
      const res = await fetch(`${apiPath}/clearCart/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to clear cart: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  }
}
