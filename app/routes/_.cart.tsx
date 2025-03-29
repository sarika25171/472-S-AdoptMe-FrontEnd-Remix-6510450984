import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { stripe } from "~/server/stripe.server";
import { CartAPI } from "~/server/repository";
import { getSession } from "~/server/session";
import { Cart } from "~/models/cart";
import { frontendUrlPath } from "~/server/config.server";

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
		case "checkout" : {
			// userId, product_id, quantity, total_price, session_id
			const cartsJson = formData.get("carts");
			const carts = JSON.parse(cartsJson as string) as Cart[];
			const lineItems = carts.map((cart) => ({
				price_data: {
					currency: "thb",
					product_data: {
						name: cart.product.name,
					},
					unit_amount: cart.product.price * 100, // Convert Baht to Satang
				  },
				  quantity: cart.quantity,
			}))
			const productIds = carts.map((cart) => cart.product.id);


			const checkoutSession = await stripe.checkout.sessions.create({
				payment_method_types: ["promptpay"],
				line_items: lineItems,
				mode: "payment",
				success_url: `${frontendUrlPath()}/payment/success`,
				cancel_url: `${frontendUrlPath()}/payment/cancelled`,
				metadata: {
					user_id: userId, // Send user_id in metadata
					product_ids: JSON.stringify(productIds),
				},
			});
			const checkoutUrl = checkoutSession.url as string;
			return redirect(checkoutUrl);
		}
		default:
			return json({ error: "Invalid intent" }, { status: 400 });
	}
}
