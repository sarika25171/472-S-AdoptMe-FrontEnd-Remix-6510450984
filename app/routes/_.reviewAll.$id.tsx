import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import Order from "~/models/order";
import { OrderAPI } from "~/server/repository";
import { useState } from "react";
import { getSession } from "~/server/session";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("isAdmin");
  const productId = Number(params.id);
  const reviews: Order[] = await OrderAPI.getByProductId(productId);
  return { reviews, isAdmin };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId");
  const reply = formData.get("reply");

  if (!reviewId || !reply) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await OrderAPI.addReplyAdmin(Number(reviewId), reply as string );
    alert("Update successful")
    return json({ success: true });
  } catch (error) {
    console.error("Failed to submit review", error);
    return json({ error: "Failed to submit review" }, { status: 500 });
  }
}

export default function ReviewAll() {
  const { reviews, isAdmin } = useLoaderData<typeof loader>();
  const [replies, setReplies] = useState<Record<number, string>>({});

  const handleReplyChange = (id: number, value: string) => {
    setReplies((prev) => ({
      ...prev,
      [id]: value,
    }));
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
              {review.reply_admin === null && isAdmin ? (
                <Form method="post" className="mt-4">
                  <input type="hidden" name="reviewId" value={review.id} />
                  <textarea
                    className="w-full p-2 border rounded-md"
                    name="reply"
                    placeholder="Reply to this review..."
                    value={replies[review.id] || ""}
                    onChange={(e) => handleReplyChange(review.id, e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-primary-orange text-white py-2 px-6 rounded-md hover:bg-orange-900 mt-2"
                  >
                    Send
                  </button>
                </Form>
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
