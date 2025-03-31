import { ActionFunctionArgs } from "@remix-run/node";
import { stripeWebhookSecretPath } from "~/server/config.server";
import { CartAPI, OrderAPI, ProductAPI } from "~/server/repository";
import { stripe } from "~/server/stripe.server";

export async function action({ request }: ActionFunctionArgs) {
  const signature = request.headers.get("Stripe-Signature") as string;
  const payload = await request.text();
  const webhookSecret = stripeWebhookSecretPath(); // Ensure it's a string

  console.log("Received Signature:", signature);
  console.log("Webhook Secret:", webhookSecret);

  try {
    const event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);

    console.log("Received Event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.user_id;
      const session_id = session.id;
      const productIds = session.metadata?.product_ids ? JSON.parse(session.metadata.product_ids) : [];

      if (userId) {
        const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

        const orderPromises = lineItems.data.map(async (item, index) => {
          const quantity = item.quantity!;
          const total_price = item.amount_total / 100;
          const productId = productIds[index];

          await OrderAPI.createOrder(userId, productId, quantity, total_price, session_id);
          await ProductAPI.orderProduct(productId, quantity);
        });

        await Promise.all(orderPromises);
        await CartAPI.clearCart(userId);

        console.log(`✅ Order created successfully for user ${userId}`);
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("❌ Stripe webhook error:", error);
    return new Response(error as string || "Webhook error", { status: 400 });
  }
}
