import Order from "~/models/order";
import { domainPath } from "../config.server";

const Domain = domainPath();

const apiPath = `${Domain}/order`;

export default class OrderAPI {
  static async getAll(): Promise<Order[]> {
    try {
      const res = await fetch(`${apiPath}/getAll`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to fetch orders: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }

  static async getByUserId(user_id: string): Promise<Order[]> {
    try {
      const res = await fetch(`${apiPath}/getByUserId/${user_id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to fetch orders for user ${user_id}: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
      throw error;
    }
  }

  static async getById(id: number): Promise<Order> {
    try {
      const res = await fetch(`${apiPath}/getById/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to fetch order: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }

  static async createOrder(
    user_id: string,
    product_id: number,
    quantity: number,
    total_price: number,
    session_id: string
  ) {
    try {
      const res = await fetch(`${apiPath}/createOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          product_id,
          quantity,
          total_price,
          session_id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to create order: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  static async updateOrder(id: number, order: Partial<Order>) {
    try {
      const res = await fetch(`${apiPath}/updateOrder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          order,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to update order: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }
  static async getByProductId(id: number): Promise<Order[]> {
    const res = await fetch(`${apiPath}/getByProductId/${id}`, {
        method: "GET"
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(`Failed to fetch order: ${res.status} ${res.statusText}`);
    }
    return data;
}
}
