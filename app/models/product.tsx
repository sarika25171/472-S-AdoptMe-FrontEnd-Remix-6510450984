export type ProductStatus = 'AVAILABLE' | 'OUT_OF_STOCK';

export default interface Product {
    id: number;
    product_category_id: number;
    name: string;
    imageurl: string;
    description: string;
    price: number;
    stock: number;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
}

