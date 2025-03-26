import product from "~/models/product";
import { domainPath } from "../path.server";

const Domain = domainPath();
const apiPath = `${Domain}/product`;

export default class ProductAPI {

	static async getAll(): Promise<product[]> {
		const res = await fetch(`${apiPath}/getAll`, { method: "GET" });
		const data = await res.json();

		if (!res.ok) {
			throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
		}
		return data;
	}

	static async getByID(id: number): Promise<product> {
		const res = await fetch(`${apiPath}/getById/${id}`, { method: "GET" });
		const data = await res.json();

		if (!res.ok) {
			throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
		}
		return data;
	}

	static async createProduct(
		product_category_id: number,
		name: string,
		imageurl: string,
		description: string,
		price: number,
		stock: number,
	) {
		const res = await fetch(`${apiPath}/createProduct`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
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
			throw new Error(`Failed to create product category: ${res.status} ${res.statusText}`);
		}
		return data;
	}

	static async updateProduct(
		id: number,
		Product: Partial<product>,
	) {
		const res = await fetch(`${apiPath}/updateProduct`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
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
	}

	static async deleteProduct(id: number) {
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
			throw new Error(`Failed to delete product: ${res.status} ${res.statusText}`);
		}
		return data;
	}
}
