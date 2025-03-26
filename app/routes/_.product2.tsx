import { useEffect, useState } from "react";
import IconDog from "~/components/icons/iconDog";
import IconCat from "~/components/icons/iconCat";
import IconPaw from "~/components/icons/iconPaw";
import IconRabbit from "~/components/icons/iconRabbit";
import AnimatedComponent from "~/components/animations/animatedComponent";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ProductAPI } from "~/server/repository";
import { useLoaderData } from "@remix-run/react";
import Product from "~/models/product";
import ProductCard from "~/components/ProductCard";

export async function loader({ request }: LoaderFunctionArgs) {
  const products: Product[] = await ProductAPI.getAll();
  return { products };
}

export default function ProductPage() {
  const { products } = useLoaderData<typeof loader>();
  const [select, setSelect] = useState(""); // Default to show all

  useEffect(() => {
	console.log("Current selected category:", select);
  }, [select]); // Runs whenever `select` changes

  return (
    <div className="flex flex-col justify-start items-center w-svw min-h-screen space-y-4 px-10 py-10">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${select === "" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelect("")}
        >
          All
        </button>

        <button
          className={`px-4 py-2 rounded-md ${select === "1" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelect("1")}
        >
          <IconDog width="24" height="24" colorCode={select === "1" ? "#ffffff" : "#000000"} />
        </button>

        <button
          className={`px-4 py-2 rounded-md ${select === "2" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelect("2")}
        >
          <IconCat width="24" height="24" colorCode={select === "2" ? "#ffffff" : "#000000"} />
        </button>

        <button
          className={`px-4 py-2 rounded-md z-50 pointer-events-auto ${select === "3" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() =>
			console.log("Selected category: 3"
		  )
		  }
        >
          {/* <IconRabbit width="24" height="24" colorCode={select === "3" ? "#ffffff" : "#000000"} /> */}
        </button>

        <button
          className={`px-4 py-2 rounded-md ${select === "4" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setSelect("4")}
        >
          <IconPaw width="24" height="24" colorCode={select === "4" ? "#ffffff" : "#000000"} />
        </button>
		<p>Selected Category: {select || "All"}</p>
      </div>

      <div className="grid grid-flow-dense grid-cols-6 gap-16">
        {products
          .filter((product) => select === "" || product.product_category_id === Number(select))
          .map((product) => (
            <AnimatedComponent key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                imageurl={product.imageurl}
                description={product.description}
                price={product.price}
                stock={product.stock}
                status={product.status}
              />
            </AnimatedComponent>
          ))}
      </div>
    </div>
  );
}
