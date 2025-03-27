import product from "~/models/product";
import { domainPath } from "../config.server";

const Domain = domainPath();
const apiPath = `${Domain}/product`;

export default class ProductAPI {

	static async getAll(): Promise<product[]> {
		try {
			const res = await fetch(`${apiPath}/getAll`, { method: "GET" });
			const data = await res.json();

		if (!res.ok) {
				throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
			}
			return data;
		} catch (error) {
			console.error('Error fetching products:', error);
			throw error;
		}
	}

	static async getByID(id: number): Promise<product> {
		try {
			const res = await fetch(`${apiPath}/getById/${id}`, { method: "GET" });
			const data = await res.json();

		if (!res.ok) {
				throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
			}
			return data;
		} catch (error) {
			console.error('Error fetching product by ID:', error);
			throw error;
		}
	}

	static async createProduct(
		product_category_id: number,
		name: string,
		imageurl: string,
		description: string,
		price: number,
		stock: number,
	) {
		try {
			const res = await fetch(`${apiPath}/createProduct`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
				product_category_id: product_category_id,
				name: name,
				imageurl: imageurl,
				description: description,
				price: price,
				stock: stock,
			}),
		});

		const data = await res.json();
		if (!res.ok) {
				throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
			}
			return data;
		} catch (error) {
			console.error('Error creating product:', error);
			throw error;
		}
	}

	static async updateProduct(
		id: number,
		Product: Partial<product>,
	) {
		try {
			const res = await fetch(`${apiPath}/updateProduct`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
				id: id,
				Product: Product,
			}),
		});

		const data = await res.json();
		if (!res.ok) {
			throw new Error(`Failed to update product category: ${res.status} ${res.statusText}`);
		}
		return data;
		} catch (error) {
			console.error('Error updating product:', error);
			throw error;
		}
	}

	static async deleteProduct(id: number) {
		try {
			const res = await fetch(`${apiPath}/deleteProduct`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: id,
			}),
		});

		console.log(res);
		const data = await res.json();
		console.log(data);
		if (!res.ok) {
				throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
			}
			return data;
		} catch (error) {
			console.error('Error deleting product:', error);
			throw error;
		}
	}
}
