import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getSession } from "~/server/session";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { ImageAPI, ProductAPI } from "~/server/repository";


export async function action({ request }: ActionFunctionArgs) {
	console.log("action addpet");
	const formData = await request.formData();
	const action = formData.get("_action");
	if (action === "add") {
		const name = formData.get("name") as string;
		const product_category_id = Number(formData.get("category") as string);
		const price = Number(formData.get("price") as string);
		const stock = Number(formData.get("stock") as string);
		const description = formData.get("description") as string;
		const image = formData.get("image") as File | null;


		console.log("image:", image);
		console.log(typeof(price), typeof(stock));
		if (!image) {
			return json({ error: "Please upload an image." }, { status: 400 });
		}

		if (price <= 0) {
			return json({ error: "Price must be greater than 0." }, { status: 400 });
		}

		if (stock <= 0) {
			return json({ error: "Stock must be greater than 0." }, { status: 400 });
		}

		console.log("After validation");
		let imageurl = "product-" + name.trim() + "-photo.jpg";
		imageurl = imageurl.replace(/[\s/\\]/g, '_');
		console.log("Image URL:", imageurl);
		try {
			const res = await ProductAPI.createProduct(
				product_category_id,
				name,
				imageurl,
				description,
				price,
				stock
			);
			console.log("Product created:", res);
			const ress = await ImageAPI.uploadImage(image, imageurl);
			console.log("Imaged:", ress);

			return redirect("/product");
		} catch (error) {
			return json({ error: "Failed to add product.", details: error }, { status: 500 });
		}
	}

	return json({ error: "Invalid action" }, { status: 400 });
}

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const isAdmin = session.get("isAdmin");
	return { isAdmin };
}

export default function CreateProductPage() {
	// const { isAdmin } = useLoaderData<typeof loader>();

	// if (!isAdmin) {
	// 	console.log("User is not an admin",isAdmin);
	// 	return (redirect("/"));
	// }

	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const fetcher = useFetcher<typeof action>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const errorMessage = fetcher.data?.error || "";
	const tailwindIn = "w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600";

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("handleFileSelect triggered");
		const file = event.target.files?.[0] || null;
		console.log("Selected file:", file);
		if (file) {
			console.log("File type:", file.type);
			if (imagePreview) {
				console.log("Revoking previous preview URL");
				URL.revokeObjectURL(imagePreview);
			}
			const newPreviewUrl = URL.createObjectURL(file);
			console.log("Created new preview URL:", newPreviewUrl);
			setImagePreview(newPreviewUrl);
			setImage(file);
		} else {
			console.log("No file selected");
		}
	};

	useEffect(() => {
		console.log("imagePreview : ", imagePreview);
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [imagePreview]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!image) {
			alert("Please upload an image");
			return;
		}

		setIsSubmitting(true);
		const formData = new FormData(event.currentTarget);
		formData.append("_action", "add");
		formData.append("image", image);

		fetcher.submit(formData, {
			method: "post",
			encType: "multipart/form-data",
		});
	};

	useEffect(() => {
		if (fetcher.state === "idle") {
			setIsSubmitting(false);
		}
	}, [fetcher.state]);

	return (
		<div className="w-svw min-h-screen flex justify-center items-center">
			<div className="grid grid-flow-col grid-cols-1">
				<fetcher.Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

					<div
						className="row-start-1 col-start-1 flex flex-row bg-primary-white-tone rounded-3xl w-[1500px] h-[900px] drop-shadow-lg p-2 justify-evenly items-center space-x-4 animate-fade-in"
					>
						<div className="flex flex-col justify-center items-center space-y-4">
							{imagePreview ? (
								<img
									src={imagePreview}
									alt="Uploaded pet"
									className="w-[400px] h-[400px] border-2 border-black rounded-xl"
								/>
							) : (
								<div className="w-[400px] h-[400px] border-2 border-black rounded-xl flex items-center justify-center">
									<p className="text-gray-500">No image uploaded</p>
								</div>
							)}
							<label
								htmlFor="image-upload"
								className="bg-primary-orange text-white font-bold px-6 py-2 rounded-3xl hover:scale-105 duration-200 cursor-pointer"
							>
								Upload Photo
								<input
									id="image-upload"
									type="file"
									accept="image/*"
									ref={fileInputRef}
									onChange={(e) => {
										console.log("Input changed");
										handleFileSelect(e);
									}}
									name="image"
									required
									className="hidden"
								/>
							</label>
						</div>
						<div>
							<div className="flex flex-col justify-center w-full space-y-2">
								<label>
									Name:
									<input
										type="text"
										name="name"
										placeholder="Product name"
										className={`${tailwindIn}`}
										required
									/>
								</label>

								<label>
									Category:
									<select name="category" className={`${tailwindIn}`} required>
										<option value="1">Dogs</option>
										<option value="2">Cats</option>
										<option value="3">Rabbits</option>
										<option value="4">Others</option>
									</select>
								</label>

								<label>
									Price
									<input
										type="number"
										name="price"
										placeholder="ex. 100 ฿"
										className={`${tailwindIn}`}
										required
									/>
								</label>

								<label>
									Stock:
									<input
										type="number"
										name="stock"
										placeholder="ex. 10"
										className={`${tailwindIn}`}
										required
									/>
								</label>

								<label>
									Description:
									<input
										type="text"
										name="description"
										placeholder="Description"
										className={`${tailwindIn}`}
										required
									/>
								</label>
								<div className="text-red-500 font-bold py-2">
									{errorMessage && <p>{errorMessage}</p>}
								</div>
								<button
									type="submit"
									disabled={isSubmitting}
									className={`flex flex-row hover:scale-105 duration-200 space-x-2 text-white font-bold shadow-lg
          bg-green-500 rounded-3xl text-2xl justify-center items-center w-full h-fit py-2`}
									name="_action"
									value="add"
								>
									{isSubmitting ? "Adding..." : "Add Product"}
								</button>
							</div>
						</div>
					</div>
				</fetcher.Form>
			</div>
		</div>
	);
}
