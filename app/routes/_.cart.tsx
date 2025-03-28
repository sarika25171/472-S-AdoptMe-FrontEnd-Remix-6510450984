import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { CartAPI } from "~/server/repository";
import { getSession } from "~/server/session";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = session.get("userId");
	
	if (!userId) {
		return json({ cart: { items: [], total: 0 } });
	}
	
	const cart = await CartAPI.getCart(userId);
	return { cart };
}

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
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
			return { cart };
		}
		case "update": {
			const productId = Number(formData.get("productId"));
			const quantity = Number(formData.get("quantity"));
			const cart = await CartAPI.updateCartItem(userId, productId, quantity);
			return { cart };
		}
		case "remove": {
			const productId = Number(formData.get("productId"));
			const cart = await CartAPI.removeFromCart(userId, productId);
			return { cart };
		}
		case "clear": {
			const cart = await CartAPI.clearCart(userId);
			return { cart };
		}
		default:
			return json({ error: "Invalid intent" }, { status: 400 });
	}
}
