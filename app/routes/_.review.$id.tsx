import { LoaderFunctionArgs, ActionFunctionArgs, redirect, json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import Order from "~/models/order";
import Product from "~/models/product";
import { OrderAPI, ProductAPI } from "~/server/repository";
import prefetchImage from "~/server/services/imagePrefetcher";

export async function loader({params} : LoaderFunctionArgs) {
  const order: Order = await OrderAPI.getById(Number(params.id));
  let product: Product = await ProductAPI.getByID(Number(order.product_id));
  product.imageurl = await prefetchImage(product.imageurl);
  return { order, product};
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rating = formData.get("rating") as string;
  const comment = formData.get("comment") as string;

  try {
    await OrderAPI.addComment(Number(params.id), rating, comment );
    alert("Update successful")
    console.log("Update successful");
    return redirect(`/history/detail/${params.id}`);
  } catch (error) {
    console.error("Failed to submit review", error);
    throw new Error("Failed to submit review");
  }
}

export default function Review() {
    const { order, product } = useLoaderData<typeof loader>();
    const [rating, setRating] = useState<string | null>(order.rating);
    const [comment, setComment] = useState<string | null>(order.comment);
    const [commentSent, setCommentSent] = useState<boolean>(order.comment !== null);
    const [isFormFilled, setIsFormFilled] = useState<boolean>(rating !== null && commentSent !== null);

    useEffect(() => {
        if(rating !== null && commentSent === true ) {
            setIsFormFilled(true);
        } else {
            setIsFormFilled(false);
        }
    }, [rating, commentSent]);

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
                    <Form method="post">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">⭐คะแนนรีวิว</label>
                            <select 
                                name="rating"
                                className={`w-full p-3 border border-gray-300 rounded-md mt-1 ${isFormFilled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                                value={rating || ''}
                                onChange={(e) => setRating(e.target.value)}
                                disabled={isFormFilled}
                            >
                                {[...Array(11)].map((_, index) => {
                                    const value = (index * 0.5).toString();
                                    return (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <textarea 
                            name="comment"
                            className={`w-full p-3 border border-gray-300 rounded-md mt-4 ${isFormFilled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                            rows={4}
                            placeholder="Comment Review"
                            value={comment || ''}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={isFormFilled}
                        ></textarea>

                        <div className="flex justify-end mt-4">
                            {!isFormFilled && (
                                <button 
                                    type="submit"
                                    className="bg-primary-orange text-white py-2 px-6 rounded-md hover:bg-orange-900"
                                    onClick={() => setCommentSent(true)}
                                >
                                    Send
                                </button>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

