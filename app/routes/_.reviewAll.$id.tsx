import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Order from "~/models/order";
import { OrderAPI } from "~/server/repository";
import { useState } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const productId = Number(params.id);
  const reviews: Order[] = await OrderAPI.getByProductId(productId);
  return { reviews };
}

export default function ReviewAll() {
  const { reviews } = useLoaderData<typeof loader>();
  const [replies, setReplies] = useState<Record<number, string>>({});

  const handleReplyChange = (id: number, value: string) => {
    setReplies((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (id: number) => {
    try {
      if (!replies[id]) {
        alert("Please enter a reply before submitting.");
        return;
      }
      await OrderAPI.updateOrder(id, { reply_admin: replies[id] }); // ใช้ค่าที่เก็บใน state
      alert("Review submitted successfully");
    } catch (error) {
      console.error("Failed to submit review", error);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="w-full min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-4">Review</h1>
      {reviews && reviews.length === 0 ? (
        <p className="text-gray-500">No review for this product</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-md shadow-lg">
              <p className="text-lg">⭐ {review.rating}</p>
              <p className="text-sm mt-2">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-4">
                Date: {new Date(review.createdAt).toLocaleDateString()}
              </p>
              {review.reply_admin === null ? (
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder="Reply to this review..."
                    value={replies[review.id] || ""}
                    onChange={(e) => handleReplyChange(review.id, e.target.value)}
                  />
                  <button
                    className="bg-primary-orange text-white py-2 px-6 rounded-md hover:bg-orange-900 mt-2"
                    onClick={() => handleSubmit(review.id)}
                  >
                    Send
                  </button>
                </div>
              ) : (
                <div className="mt-4 p-2 border rounded-md bg-gray-100">
                  <p className="text-sm text-gray-700">Admin Reply:</p>
                  <p className="text-sm text-gray-900">{review.reply_admin}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
