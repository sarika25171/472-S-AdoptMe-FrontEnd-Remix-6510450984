import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData, useNavigation, useFetcher } from "@remix-run/react";
import { CartAPI } from "~/server/repository";
import type { Cart } from "~/models/cart";
import { getSession } from "~/server/session";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const username = session.get("username");
	const userId = session.get("userId");
	
	if (!userId) {
		return json({ cart: { items: [], total: 0 } });
	}
	
	const cart = await CartAPI.getCart(userId);
	return json({ cart, username, userId });
}

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const username = session.get("username");
	const userId = session.get("userId");
	
	if (!userId) {
		return json({ error: "Please sign in to manage your cart" }, { status: 401 });
	}

	const formData = await request.formData();
	const intent = formData.get("intent");

	switch (intent) {
		case "add": {
			const productId = Number(formData.get("productId"));
			const quantity = Number(formData.get("quantity"));
			const cart = await CartAPI.addToCart(userId, productId, quantity);
			return json({ cart });
		}
		case "update": {
			const itemId = Number(formData.get("itemId"));
			const quantity = Number(formData.get("quantity"));
			const cart = await CartAPI.updateCartItem(userId, itemId, quantity);
			return json({ cart });
		}
		case "remove": {
			const itemId = Number(formData.get("itemId"));
			const cart = await CartAPI.removeFromCart(userId, itemId);
			return json({ cart });
		}
		case "clear": {
			const cart = await CartAPI.clearCart(userId);
			return json({ cart });
		}
		default:
			return json({ error: "Invalid intent" }, { status: 400 });
	}
}

export default function Cart() {
	const { cart } = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();
	const fetcher = useFetcher();

	const isSubmitting = navigation.state === "submitting";

	const handleQuantityChange = (itemId: number, newQuantity: number) => {
		if (newQuantity < 1) return;
		
		const formData = new FormData();
		formData.append("intent", "update");
		formData.append("itemId", itemId.toString());
		formData.append("quantity", newQuantity.toString());
		
		fetcher.submit(formData, { method: "post" });
	};

	const handleRemoveItem = (itemId: number) => {
		const formData = new FormData();
		formData.append("intent", "remove");
		formData.append("itemId", itemId.toString());
		
		fetcher.submit(formData, { method: "post" });
	};

	const handleClearCart = () => {
		const formData = new FormData();
		formData.append("intent", "clear");
		
		fetcher.submit(formData, { method: "post" });
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
			
			{actionData && 'error' in actionData && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{actionData.error}
				</div>
			)}
			
			{cart.items.length === 0 ? (
				<div className="text-center py-8">
					<p className="text-gray-500">Your cart is empty</p>
				</div>
			) : (
				<div className="space-y-4">
					{cart.items.map((item) => (
						<div key={item!.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
							<div className="flex items-center space-x-4">
								<img 
									src={item!.image_url} 
									alt={item!.name}
									className="w-20 h-20 object-cover rounded"
								/>
								<div>
									<h3 className="font-semibold">{item!.name}</h3>
									<p className="text-gray-600">${item!.price}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<button
										onClick={() => handleQuantityChange(item!.id, item!.quantity - 1)}
										className="px-2 py-1 border rounded"
										disabled={isSubmitting}
									>
										-
									</button>
									<span>{item!.quantity}</span>
									<button
										onClick={() => handleQuantityChange(item!.id, item!.quantity + 1)}
										className="px-2 py-1 border rounded"
										disabled={isSubmitting}
									>
										+
									</button>
								</div>
								
								<button
									onClick={() => handleRemoveItem(item!.id)}
									className="text-red-500 hover:text-red-700"
									disabled={isSubmitting}
								>
									Remove
								</button>
							</div>
						</div>
					))}
					
					<div className="flex justify-between items-center mt-6">
						<div className="text-xl font-bold">
							Total: ${cart.total.toFixed(2)}
						</div>
						<div className="space-x-4">
							<button
								onClick={handleClearCart}
								className="px-4 py-2 text-red-500 hover:text-red-700"
								disabled={isSubmitting}
							>
								Clear Cart
							</button>
							<button
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
								disabled={isSubmitting}
							>
								Checkout
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
