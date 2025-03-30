import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, Form } from "@remix-run/react";
import AnimatedComponent from "~/components/animations/animatedComponent";
import ProductAPI from "~/server/repositories/productRepository";
import { getSession } from "~/server/session";
import { Link } from "@remix-run/react";
import { useState } from "react";
import prefetchImage from "~/server/services/imagePrefetcher";


export type ProductStatus = 'AVAILABLE' | 'OUT_OF_STOCK';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const isAdmin = session.get("isAdmin");
  const id = Number(params.id);
  const product = await ProductAPI.getByID(id);
  product.imageurl = await prefetchImage(product.imageurl);
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return { product, isAdmin, userId };
}

export async function action({ request, params }: LoaderFunctionArgs) {
  const id = Number(params.id);
  console.log("delete", id);
  await ProductAPI.deleteProduct(id);
  return redirect("/Product");
}

export function AdminProductButton({ setStage }: { setStage: (value: boolean) => void }) {

  return (
    <button
      onClick={async () => {
        setStage(true);
      }}
      className="bg-red-500 flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
    >
      Delete Product
    </button>
  )
}

export function ComfrimPopup({ productId,setStage }: { productId:number ,setStage: (value: boolean) => void }) {
  const fetcher = useFetcher<typeof action>();

  return (
    <div className="fixed z-50 -translate-x-[100%] -translate-y-[50%]">
      <div className="flex flex-col bg-gray-100 shadow-xl shadow-black/40 rounded-3xl w-[600px] h-[300px] justify-center items-center space-y-4">
        <h1 className="text-black font-bold text-2xl">Are you sure you want to delete this product?</h1>
        <div className="flex flex-row justify-center items-center space-x-10">
          <fetcher.Form method="delete">
            <button
              type="submit"
              value={productId}
              className="rounded-md bg-red-500 text-white font-bold shadow-lg px-6 py-2"
              >
              Yes, Delete
            </button>
          </fetcher.Form>
          <button
            className="rounded-md bg-white text-black font-bold shadow-lg px-6 py-2"
            onClick={async () => {
              setStage(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export function UserProductButton({ status, productId }: { status: ProductStatus; productId: number }) {
  const { userId } = useLoaderData<typeof loader>();
  let text = "";
  let color = "";
  let disabled = false;
  const fetcher = useFetcher();

  if (status === "OUT_OF_STOCK") {
    text = "Out of Stock";
    color = "bg-primary-gray";
    disabled = true;
  } else {
    text = "Add to Cart";
    color = "bg-green-400";
    disabled = userId ? false : true;
  }

  return (
    <fetcher.Form method="post" action="/cart">
      <input type="hidden" name="intent" value="add" />
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <button
        type="submit"
        disabled={disabled}
        className={`${color} flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {text}
      </button>
    </fetcher.Form>
  );
}

export default function ProductDetailPage() {

  const { isAdmin, product } = useLoaderData<typeof loader>();
  const [Popup, setPopup] = useState<boolean>(false);

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
    <div className="w-full min-h-screen flex justify-center items-center">
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
              {isAdmin && <AdminProductButton setStage={setPopup} />}
              {!isAdmin && <UserProductButton status={product.status} productId={product.id} />}
            </div>
          </AnimatedComponent>
          <AnimatedComponent>
            {Popup && <ComfrimPopup productId={product.id} setStage={setPopup} />}
          </AnimatedComponent>
        </div>
      </div>
  );
}
