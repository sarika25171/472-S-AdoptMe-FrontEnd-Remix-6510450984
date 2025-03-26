import { Link } from "@remix-run/react";

export type ProductStatus = "AVAILABLE" | "OUT_OF_STOCK";

export interface ProductCardProps {
    id: number;
    name: string;
    imageurl: string;
    description: string;
    price: number;
    stock: number;
    status: ProductStatus;
}

export default function ProductCard({
    id,
    name,
    imageurl,
    description,
    price,
    stock,
    status,
}: ProductCardProps) {
    return (
        <Link to={`/productDetail/${id}`} prefetch="intent">
            <div className="relative w-[200px] h-[320px] xl:w-full xl:h-[420px] rounded-2xl max-w-xs overflow-hidden bg-clip-border hover:shadow-2xl hover:shadow-yellow-600 group bg-black transition duration-500">
                <img src={imageurl}  className="w-full h-full transition-transform group-hover:scale-110 duration-200 object-cover"/>
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent">
                    <div className="p-4 text-white text-center text-lg">
                        <h1 className="text-2xl font-bold">{name}</h1>
                        <hr className="h-px my-2 bg-white w-full" />
                        <p className="text-sm">{description}</p>
                        <p className="text-lg font-semibold">฿{price}</p>
                        <p className="text-sm">Stock: {stock}</p>
                        <p className={`text-sm font-bold ${status === "AVAILABLE" ? "text-green-400" : "text-red-500"}`}>
                            {status}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
