import Product from "~/models/product";

const Domain = process.env.DOMAIN!

const apiPath = `${Domain}/product`;

export default class ProductAPI {
    static async getAll(): Promise<Product[]> {
        const res = await fetch(`${apiPath}/getAll`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async getById(id: number): Promise<Product> {
        const res = await fetch(`${apiPath}/getById/${id}`, {
            method: "GET"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async createProduct(
        name: string,
        price: number,
        stock: number,
        description: string,
        productCategoryId: number,
        imageUrl: string
    ) {
        const res = await fetch(`${apiPath}/createProduct`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                price: price,
                stock: stock,
                description: description,
                product_category_id: productCategoryId,
                imageurl: imageUrl
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to create product: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async updateProduct(
        id: number,
        name?: string,
        price?: number, 
        stock?: number,
        description?: string,
        productCategoryId?: number,
        imageUrl?: string
    ) {
        const res = await fetch(`${apiPath}/updateProduct`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                name: name,
                price: price,
                stock: stock,
                description: description,
                product_category_id: productCategoryId,
                imageurl: imageUrl
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to update product: ${res.status} ${res.statusText}`);
        }
        return data;
    }

    static async deleteProduct(id: number) {
        const res = await fetch(`${apiPath}/deleteProduct`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id
            })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Failed to delete product: ${res.status} ${res.statusText}`);
        }
        return data;
    }
}
