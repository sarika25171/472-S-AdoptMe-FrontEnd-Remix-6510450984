import Product from "~/models/product";
import product from "~/models/product";
import  ProductCategory  from "~/models/productCategory";

const Domain = process.env.DOMAIN!
const apiPath = `${Domain}/product-category`;

export default class ProductCategoryAPI {

	static async getAll(): Promise<ProductCategory[]> {
		const res = await fetch(`${apiPath}/getAll`, { method: "GET" });
		const data = await res.json();

		if (!res.ok) {
            throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
        }
		return data;
	}

	static async getByID(id: number): Promise<ProductCategory> {
		const res = await fetch(`${apiPath}/getById/${id}`, { method: "GET" });
		const data = await res.json();

		if (!res.ok) {
            throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
        }
		return data;
	}

	static async getByName(name: string): Promise<Product[]> {
		const res = await fetch(`http://localhost:3000/api/product-category/getByName/${name}`, { method: "GET" });

		if (!res.ok) {
			console.error(`Failed to fetch product category by name: ${res.status} ${res.statusText}`);
			return [];
		}

		const data = await res.json();
		const products = data[0]?.product ?? [];
		return products;
	}

	static async createProductCategory(
		name: string,
		description: string,
	) {
		const res = await fetch(`${apiPath}/createProductCategory`, {
			method: "POST",
			body: JSON.stringify({
				name: name,
				description: description,
			}),
		});

		const data = await res.json();
		if (!res.ok) {
            throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
        }
		return data;
	}

	static async updateProductCategory(
		id: number,
		name?: string,
		description?: string,
	) {
		const res = await fetch(`${apiPath}/updateProductCategory`, {
			method: "PATCH",
			body: JSON.stringify({
				id: id,
				name: name,
				description: description,
			}),
		});

		const data = await res.json();
		if (!res.ok) {
			throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
		}
		return data;
	}

	static async deleteProductCategory(id: number) {
		const res = await fetch(`${apiPath}/deleteProductCategory`, {
			method: "DELETE",
			body: JSON.stringify({
				id: id,
			}),
		});

		const data = await res.json();
		if (!res.ok) {
			throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
		}
		return data;
	}
}
