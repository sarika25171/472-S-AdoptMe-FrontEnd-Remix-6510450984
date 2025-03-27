import Product from "~/models/product";
import product from "~/models/product";
import ProductCategory from "~/models/productCategory";
import { domainPath } from "../config.server";

const Domain = domainPath();
const apiPath = `${Domain}/product-category`;

export default class ProductCategoryAPI {
  static async getAll(): Promise<ProductCategory[]> {
    try {
      const res = await fetch(`${apiPath}/getAll`, { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          `Failed to fetch product category: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error fetching product category:", error);
      throw error;
    }
  }

  static async getByID(id: number): Promise<ProductCategory> {
    try {
      const res = await fetch(`${apiPath}/getById/${id}`, { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          `Failed to fetch product category: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error fetching product category:", error);
      throw error;
    }
  }

  static async getByName(name: string): Promise<Product[]> {
    try {
      const res = await fetch(`${apiPath}/getByName/${name}`, {
        method: "GET",
      });

      if (!res.ok) {
        console.error(
          `Failed to fetch product category by name: ${res.status} ${res.statusText}`
        );
        return [];
      }

      const data = await res.json();
      const products = data[0]?.product ?? [];
      return products;
    } catch (error) {
      console.error("Error fetching product category:", error);
      throw error;
    }
  }

  static async createProductCategory(name: string, description: string) {
    try {
      const res = await fetch(`${apiPath}/createProductCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to fetch product category: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error creating product category:", error);
      throw error;
    }
  }

  static async updateProductCategory(
    id: number,
    name?: string,
    description?: string
  ) {
    try {
      const res = await fetch(`${apiPath}/updateProductCategory`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name,
          description: description,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to fetch product category: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error updating product category:", error);
      throw error;
    }
  }

  static async deleteProductCategory(id: number) {
    try {
      const res = await fetch(`${apiPath}/deleteProductCategory`, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `Failed to fetch product category: ${res.status} ${res.statusText}`
        );
      }
      return data;
    } catch (error) {
      console.error("Error deleting product category:", error);
      throw error;
    }
  }
}
