import { Button } from "@mui/material";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useFetcher } from "@remix-run/react";
import { useState } from "react";
import IconCat from "~/components/icons/iconCat";
import IconDog from "~/components/icons/iconDog";
import IconRabbit from "~/components/icons/iconRabbit";
import ProductCard from "~/components/ProductCard";
import Product from "~/models/product";
import { ProductAPI, ProductCategoryAPI } from "~/server/repository";

export async function action({ request }: ActionFunctionArgs) {
	console.log("Action");
	const formData = await request.formData();
	const category = formData.get("category") as string;
	let products = [];
	console.log(category);
	if (category === "All") {
		products = await ProductAPI.getAll();
	}
	else {
		products = await ProductCategoryAPI.getByName(category);
	}
	console.log(products);
	return { products };
}

export default function PetsPage() {
	const fetcher = useFetcher<typeof action>();
	const productData = useActionData<typeof action>();

	const products = productData?.products??[];
	// console.log("Fetcher data:", fetcher.data);

	// const products = fetcher.data?.products;
	// console.log("Product is " + products);

	return (
		<div className="flex flex-col justify-start items-center w-svw min-h-screen space-y-4 px-10 py-10" style={{ transitionDuration: "1s" }}>
			<div className="flex space-x-4">
				<fetcher.Form method="post">
					<button
						type="submit"
						name="category"
						value="All"
						className="px-4 py-2 rounded-md"
					>
						All
					</button>

					<Button
						type="submit"
						name="category"
						value="Dog"
						className="px-4 py-2 rounded-md"
					>
						<IconDog width="24" height="24" />
					</Button>

					<Button
						type="submit"
						name="category"
						value="Cat"
						className="px-4 py-2 rounded-md"
					>
						<IconCat width="24" height="24" />
					</Button>

					<Button
						type="submit"
						name="category"
						value="Rabbit"
						className="px-4 py-2 rounded-md"
					>
						<IconRabbit width="24" height="24" />
					</Button>
				</fetcher.Form>
			</div>
			<div className="grid grid-flow-dense grid-cols-6 gap-16">
				{products.map((product) => (
					<ProductCard
					id={product.id}
					name={product.name}
					imageurl={product.imageurl}
					description={product.description}
					price={product.price}
					stock={product.stock}
					status={product.status}
					/>
				))}
			</div>
		</div>
	);
}
