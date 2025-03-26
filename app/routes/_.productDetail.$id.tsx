import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { request } from "node_modules/axios/index.cjs";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import AnimatedComponent from "~/components/animations/animatedComponent";
import ProductAPI from "~/server/repositories/productRepository";
import { getSession } from "~/server/session";
import { Link } from "@remix-run/react";
import Product from "~/models/product";


export type ProductStatus = 'AVAILABLE' | 'OUT_OF_STOCK';

export async function loader({ request,params }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("isAdmin");
  const id = Number(params.id);
  const product = await ProductAPI.getByID(id);
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return { product,isAdmin };
}

export async function action({ request,params }: LoaderFunctionArgs) {
  const id = Number(params.id);
  const products: Product= await ProductAPI.deleteProduct(id);
  return { products };
}

interface props {
  productId: number;
  isAdmin: boolean;
  status: ProductStatus;
}

export function ProductButton({productId,isAdmin, status}:props){
  let text = "";
  let color = "";
  let link = "";
  let action = null;;
  const fetcher = useFetcher();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      fetcher.submit(null, { method: "DELETE", action: `/products/${productId}` });
    }
  };

  if (isAdmin) {
    text = "Delete Product";
    color = "bg-primary-red";
    action = handleDelete;
  } else if (status === "OUT_OF_STOCK") {
    text = "Out of Stock";
    color = "bg-primary-gray";
    link = "";
  } else {
    text = "Order Here";
    color = "bg-primary-green";
    // need to add to ter path
    link = "/test";
  }

  return link ? (
    <Link to={link}>
      <button
        className={`${color} flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2`}
      >
        {text}
      </button>
    </Link>
  ) : (
    <button
      className={`${color} flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2`}
    >
      {text}
    </button>
  );
}



export default  function ProductDetailPage() {

  const { isAdmin,product } = useLoaderData<typeof loader>();

  let category
  if (product.product_category_id === 1) {
    category = "Dog";
  } else if (product.product_category_id === 2) {
    category = "Cat";
  } else if (product.product_category_id === 3) {
    category = "Rabbit";
  } else if (product.product_category_id === 4) {
    category = "Other";
  }
  return (
    <div className="w-svw min-h-screen flex justify-center items-center">
      <div className="grid grid-flow-col grid-cols-1">
        <div
          className="row-start-1 col-start-1 flex flex-row bg-primary-white-tone rounded-3xl w-[1500px] h-[900px] drop-shadow-lg p-2 justify-evenly items-center space-x-4 animate-fade-in"
        >
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
              <h1 className="text-black font-bold text-2xl">Product Details</h1>
              <hr />
              <div className="flex flex-row space-x-2">
                <h1 className="text-black font-bold text-xl">Product Name:</h1>
                <h1 className="text-gray-400 text-xl">{product.name}</h1>
              </div>
              <div className="flex flex-row space-x-2">
                <h1 className="text-black font-bold text-xl">Category:</h1>
                <h1 className="text-gray-400 text-xl">{category}</h1>
              </div>
              <div className="flex flex-row space-x-2">
                <h1 className="text-black font-bold text-xl">Description:</h1>
                <h1 className="text-gray-400 text-xl">{product.description}</h1>
              </div>
              <div className="flex flex-row space-x-2">
                <h1 className="text-black font-bold text-xl">Price:</h1>
                <h1 className="text-gray-400 text-xl">{product.price} ฿</h1>
              </div>
              <div className="flex flex-row space-x-2">
                <h1 className="text-black font-bold text-xl">Stock:</h1>
                <h1 className="text-gray-400 text-xl">{product.stock}</h1>
              </div>
              <ProductButton productId={product.id} isAdmin={!!isAdmin} status={product.status} />
            </div>
          </AnimatedComponent>
        </div>
      </div>
    </div>
  );
}
