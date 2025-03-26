import { useState } from "react";
import FilterButton from "../components/filter_button";
import ProductCard from "../components/ProductCard";
import Product from "~/models/product";
import IconDog from "~/components/icons/iconDog";
import IconCat from "~/components/icons/iconCat";
import IconPaw from "~/components/icons/iconPaw";
import IconRabbit from "~/components/icons/iconRabbit";
import AnimatedComponent from "~/components/animations/animatedComponent";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ProductAPI } from "~/server/repository";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const products: Product[] = await ProductAPI.getAll();
  return { products };
}

export default function ProductPage() {
  const { products } = useLoaderData<typeof loader>();
  const [select, setSelect] = useState("");

  return (
    <div className="flex flex-col justify-start items-center w-svw min-h-screen space-y-4 px-10 py-10" style={{ transitionDuration: "1s" }}>
      <div className="flex space-x-4">
        <FilterButton text="All" value="" select={select} setSelect={setSelect} />
        <FilterButton text="Dogs" value="1" select={select} setSelect={setSelect}>
          <IconDog width="24" height="24" colorCode={select === "1" ? "#ffffff" : "#000000"} />
        </FilterButton>
        <FilterButton text="Cats" value="2" select={select} setSelect={setSelect}>
          <IconCat width="24" height="24" colorCode={select === "2" ? "#ffffff" : "#000000"} />
        </FilterButton>
        <FilterButton text="Rabbits" value="3" select={select} setSelect={setSelect}>
          <IconRabbit width="24" height="24" colorCode={select === "3" ? "#ffffff" : "#000000"} />
        </FilterButton>
        <FilterButton text="Others" value="4" select={select} setSelect={setSelect}>
          <IconPaw width="24" height="24" colorCode={select === "4" ? "#ffffff" : "#000000"} />
        </FilterButton>
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
