import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import AnimatedComponent from "~/components/animations/animatedComponent";
import { OrderAPI, ProductAPI } from "~/server/repository";
import prefetchImage from "~/server/services/imagePrefetcher";

export async function loader({ params }: LoaderFunctionArgs) {
  const orderId = Number(params.id);
  const order = await OrderAPI.getById(orderId);
  let product = await ProductAPI.getByID(order.product_id);
  product.imageurl = await prefetchImage(product.imageurl);
  return { order, product };
}

export default function HistoryDetail() {
  const { order, product } = useLoaderData<typeof loader>();

  return (
    <div className="w-full min-h-screen flex justify-center items-center -translate-y-36">
      <div className="row-start-1 col-start-1 flex flex-row bg-primary-white-tone rounded-3xl w-[1500px] h-[900px] drop-shadow-lg p-2 justify-evenly items-center space-x-4 animate-fade-in">
        <AnimatedComponent>
          <div className="flex flex-col justify-center items-center">
            <img
              src={product.imageurl}
              alt={product.name}
              className="rounded-3xl w-[500px] h-[500px] object-cover"
            />
          </div>
        </AnimatedComponent>
        <AnimatedComponent>
          <div className="flex flex-col justify-start items-start space-y-4">
            <h1 className="text-black font-bold text-4xl">
              Order {order.id} - Details
            </h1>
            <hr />
            <Detail topic={"Order ID"} value={order.id.toString()} />
            <Detail topic={"Product ID"} value={product.id.toString()} />
            <Detail topic={"Product Name"} value={product.name} />
            <Detail topic={"Quantity"} value={order.quantity.toString()} />
            <Detail
              topic={"Order Date"}
              value={order.order_date.slice(0, 10)}
            />
            <Detail topic={"Order Status"} value={order.order_status} />
            <Link
              to="/history/list"
              className="mb-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              ← Back to History
            </Link>
            <Link
                to={`/review/${order.id}`}
                className="mb-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Review
            </Link>
          </div>
        </AnimatedComponent>
      </div>
    </div>
  );
}

function Detail({ topic, value }: { topic: string; value: string }) {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <h1 className="text-black font-bold text-3xl">{topic}:</h1>
      <h1
        className={`text-2xl ${
          topic === "Order Status" ? "text-green-500" : "text-blue-600"
        }`}
      >
        {value}
      </h1>
    </div>
  );
}
