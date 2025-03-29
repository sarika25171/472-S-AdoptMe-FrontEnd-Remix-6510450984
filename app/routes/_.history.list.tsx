import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import Order from "~/models/order";
import Product from "~/models/product";
import { OrderAPI, ProductAPI } from "~/server/repository";
import prefetchImage from "~/server/services/imagePrefetcher";
import { getSession } from "~/server/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) {
    return redirect("/");
  }
  let orders = await OrderAPI.getByUserId(userId);
  let orderProducts: Map<Order, Product> = new Map();
  for (let order of orders) {
    let product = await ProductAPI.getByID(order.product_id);
    product.imageurl = await prefetchImage(product.imageurl);
    orderProducts.set(order, product);
  }
  return { orderProducts: Array.from(orderProducts.entries()) };
}

export default function HistoryList() {
    const { orderProducts } = useLoaderData<typeof loader>();
    return (
      <div className="p-8">
        <h1 className="text-6xl font-bold text-center text-blue-600 mb-8">Order History</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {orderProducts.map(([order, product]) => (
            <HistoryItem
              key={order.id}
              order={JSON.parse(JSON.stringify(order))}
              product={JSON.parse(JSON.stringify(product))}
            />
          ))}
        </div>
      </div>
    );
  }
  
  function HistoryItem({ order, product }: { order: Order; product: Product }) {
    return (
      <Link
        to={`/history/detail/${order.id}`}
        state={{ order, product }}
        className="block transform transition duration-300 hover:scale-[1.02]"
      >
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-6 hover:shadow-2xl text-center">
          {/* Product Image */}
          <img
            src={product.imageurl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
  
          {/* Order Details */}
          <div className="mt-4">
            <h1 className="text-3xl font-extrabold text-gray-800">{product.name}</h1>
            <h2 className="text-2xl font-extrabold text-primary-orange"><span className="text-gray-800">Order ID: </span>{order.id}</h2>
            <p className="text-xl text-gray-700 mt-2">Price: <span className="font-bold text-blue-600">${product.price}</span></p>
            <p className="text-xl text-gray-700">Quantity: <span className="font-bold text-blue-600">{order.quantity}</span></p>
            <p className="text-xl text-gray-700">Total: <span className="font-bold text-blue-600">${order.total_price}</span></p>
            <p className="text-xl text-gray-700">Date: <span className="font-bold text-blue-600">{order.order_date.toString().slice(0, 10)}</span></p>
          </div>
        </div>
      </Link>
    );
  }
  