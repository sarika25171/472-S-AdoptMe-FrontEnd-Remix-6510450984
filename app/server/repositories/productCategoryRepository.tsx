import ProductCategory from "~/models/productCategory";

const Domain = process.env.DOMAIN!

const apiPath = `${Domain}/product-category`;

export default class ProductCategoryAPI {
    static async getAll(): Promise<ProductCategory[]> {
        const res = await fetch(`${apiPath}/getAll`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch product categories: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async getById(id: number): Promise<ProductCategory> {
        const res = await fetch(`${apiPath}/getById/${id}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async getDetailsByName(name: string): Promise<ProductCategory> {
        const res = await fetch(`${apiPath}/getByName/${name}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch product category: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async createProductCategory(
        name: string,
        description: string
    ) {
        const res = await fetch(`${apiPath}/createProductCategory`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                description: description
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to create product category: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async deleteProductCategory(id: number) {
        const res = await fetch(`${apiPath}/deleteProductCategory`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to delete product category: ${res.status} ${res.statusText}`);
        }
        return data;
    }
}
