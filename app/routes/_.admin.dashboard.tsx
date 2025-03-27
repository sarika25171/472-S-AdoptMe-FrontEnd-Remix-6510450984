import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { OrderAPI, ProductAPI } from "~/server/repository";

export async function loader({ request }: LoaderFunctionArgs) {
  const products = await ProductAPI.getAll();
  const orders = await OrderAPI.getAll();
  let orderedProducts = [];
  for (let order of orders) {
    let product = products.find((product) => product.id === order.product_id);
    let productName = product?.name;
    if (productName)
      orderedProducts.push({
        name: products.find((product) => product.id === order.product_id)?.name,
        quantity: order.quantity,
      });
  }
  return { products, orderedProducts };
}

export default function AdminDashboard() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <div className="flex flex-col justify-center items-center w-full py-8">
        <ProductChart />
        <OrderChart />
      </div>
    </div>
  );
}

function ProductChart() {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col justify-center items-center rounded-xl shadow-lg p-6 bg-white/80 backdrop-blur-sm w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-primary-orange">Product Chart</h1>
        <div className="w-full h-[400px]">
            <BarChart 
                width={800} 
                height={400} 
                data={products} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                className="w-full"
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                    stroke="#4b5563"
                />
                <YAxis stroke="#4b5563" />
                <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                />
                <Legend />
                <Bar dataKey="price" fill="#f97316" name="Price" />
                <Bar dataKey="stock" fill="#22c55e" name="Stock" />
            </BarChart>
        </div>
    </div>
  );
}

function OrderChart() {
  const { orderedProducts } = useLoaderData<typeof loader>();
  return(
    <div className="flex flex-col justify-center items-center rounded-xl shadow-lg p-6 bg-white/80 backdrop-blur-sm w-full max-w-4xl mt-8">
        <h1 className="text-3xl font-bold mb-4 text-primary-orange">Order Chart</h1>
        <div className="w-full h-[400px]">
            <BarChart 
                width={800} 
                height={400} 
                data={orderedProducts}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                className="w-full"
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                    stroke="#4b5563"
                />
                <YAxis stroke="#4b5563" />
                <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                />
                <Legend />
                <Bar dataKey="quantity" fill="#f97316" name="Quantity" />
            </BarChart>
        </div>
    </div>
  );
}
