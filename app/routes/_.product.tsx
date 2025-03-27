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
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "@mui/material";
import { getSession } from "~/server/session";
import prefetchImage from "~/server/services/imagePrefetcher";

export function CreatePorudct() {
  return (
    <Link to="/createproduct">
      <Button className="flex flex-row hover:scale-110 duration-200 space-x-2 text-black font-bold shadow-lg  bg-green-400 rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2">
        Add Product
      </Button>
    </Link>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("isAdmin");
  let products: Product[] = await ProductAPI.getAll();
  for (let product of  products) {
    product.imageurl = await prefetchImage(product.imageurl);
  }
  return { products, isAdmin };
}

export default function ProductPage() {
  const { products, isAdmin } = useLoaderData<typeof loader>();
  const [select, setSelect] = useState("");

  return (
    <div className="flex flex-col justify-start items-center w-svw min-h-screen space-y-4 px-10 py-10" style={{ transitionDuration: "1s" }}>
      <div className="flex space-x-4">
        <FilterButton text="All" value="" select={select} setSelect={setSelect} children={undefined} />
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
        {isAdmin && <CreatePorudct/>}
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
