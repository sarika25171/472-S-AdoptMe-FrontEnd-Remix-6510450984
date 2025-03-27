import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Order from "~/models/order";
import Product from "~/models/product";
import { OrderAPI, ProductAPI } from "~/server/repository";

export async function loader({params} : LoaderFunctionArgs) {
  const order: Order = await OrderAPI.getById(Number(params.id));
  const product: Product = await ProductAPI.getByID(Number(order.product_id));
  return { order, product};
}

export default function Review() {
    const { order, product } = useLoaderData<typeof loader>();
    const [rating, setRating] = useState(order.rating ? parseFloat(order.rating) : 0);
    const [comment, setComment] = useState(order.comment || "");
    
    const handleSubmit = async () => {
        console.log(rating.toString());
        console.log(comment);

        try {
            await OrderAPI.updateOrder(order.id, { rating: rating.toString(), comment });
            alert("Review submitted successfully");
        } catch (error) {
            console.error("Failed to submit review", error);
            alert("Failed to submit review");
        }
    };
    
    return (
        <div className="flex justify-center items-center w-full min-h-screen p-10">
            <div className="flex w-full max-w-4xl bg-primary-cream p-6 rounded-lg shadow-lg">
                <div className="w-1/2 p-4">
                    <img src={product.imageurl} alt="image" className="w-full h-auto rounded-md h" /> 
                </div>

                <div className="w-2/3 p-4 flex flex-col space-y-4">
                    <div className="bg-white p-4 rounded-md shadow">
                        <p className="text-lg font-semibold">Order ID: {order.id}</p>
                        <p>Name: {product.name}</p>
                        <p>Status: {order.order_status}</p>
                        <p>Total Price: {order.total_price} บาท</p>
                        <p>Quantity: {order.quantity} </p>
                        <p>Order date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">⭐ให้คะแนนรีวิว</label>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-md mt-1"
                            value={rating}
                            onChange={(e) => setRating(parseFloat(e.target.value))}
                        >
                            {[...Array(11)].map((_, index) => {
                                const value = index * 0.5;
                                return (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={4}
                        placeholder="Comment Reivew"
                        value={comment}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setComment(e.target.value)}}
                    ></textarea>

                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            className="bg-primary-orange text-white py-2 px-6 rounded-md hover:bg-orange-900"
                            onClick={
                                handleSubmit}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
