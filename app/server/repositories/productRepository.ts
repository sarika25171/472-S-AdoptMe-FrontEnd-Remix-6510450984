import product from "~/models/product";
import { domainPath, photoS3Path } from "../config.server";

const Domain = domainPath();
const apiPath = `${Domain}/product`;
const PHOTOS3 = photoS3Path();

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
				imageurl: PHOTOS3 + imageurl + "-photo.jpg",
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

	static async orderProduct(
		id: number,
		total: number,
	){
		const res = await fetch(`${apiPath}/orderProduct`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				total: total,
			}),
		});
		const data = await res.json();
		console.log("data order product: ",data);
		if (!res.ok) {
			throw new Error(`Failed to fetch order product: ${res.status} ${data.error}`);
		}
		return data;
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
