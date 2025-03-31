import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { stripeWebhookSecretPath } from "~/server/config.server";
import { CartAPI, OrderAPI, ProductAPI } from "~/server/repository";
import { stripe } from "~/server/stripe.server";

export async function action({ request }: ActionFunctionArgs) {
  const signature = request.headers.get("Stripe-Signature") as string;
  const payload = await request.text();
  const webhookEndpoint = stripeWebhookSecretPath();

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookEndpoint
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.user_id; // Get user ID from metadata
      const session_id = session.id;
      const productIds = JSON.parse(session.metadata?.product_ids || "[]");

      if (userId) {
        const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

        const orderPromises = lineItems.data.map(async (item, index) => {
          const quantity = item.quantity!;
          const total_price = item.amount_total / 100; // Convert to baht
          const productId = productIds[index]; // Get the corresponding product_id

          await OrderAPI.createOrder(userId, productId, quantity, total_price, session_id);
          await ProductAPI.orderProduct(productId, quantity);
        });

        await Promise.all(orderPromises);
        await CartAPI.clearCart(userId);

        console.log(`New order created for user ${userId}`);
      }
    }
    return { event };
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return new Response(error as string, { status: 400 });
  }
}