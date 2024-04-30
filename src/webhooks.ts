import express from "express";
import Stripe from "stripe";
import { WebhookRequest } from "./server";
import stripe from "./stripeClient";
import { getPayloadClient } from "./get-payload";
import { Work } from "./payload-types";

const StripeWebhook = async (req: express.Request, res: express.Response) => {
  const webhookRequest = req as any as WebhookRequest;
  const body = webhookRequest.rawBody;
  const signature = req.headers["stripe-signature"] || "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_KEY || ""
    );
  } catch (err) {
    return res
      .status(400)
      .send(
        `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`
      );
  }

  console.log("@@@@@@@@@@@@@@@@@@@")

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.orderId) {
    return res.status(400).send(`Webhook Error: No order in data`);
  }

  if (event.type === "checkout.session.completed") {
    const payload = await getPayloadClient();

    const { docs: orders } = await payload.find({
      collection: "workOrder",
      where: {
        id: { equals: session.metadata.orderId },
      },
    });

    if (!orders) {
      return res.status(400).send(`Webhook Error: No order in payload`);
    }

    const [order] = orders;

    await payload.update({
      collection: "workOrder",
      data: {
        _isPaid: true,
      },
      where: {
        id: {
          equals: order.id,
        },
      },
    });

    const workSearch = order.work as Work;

    if (!workSearch.id) {
        return res.status(400).send(`Webhook Error: work id on order`);
      }

    await payload.update({
      collection: "work",
      data:{
        approved: "approved"
      },
      where: {
        id: {
          equals: workSearch.id,
        },
      },
    });
  }

  return res.status(200).send()

};
export default StripeWebhook;
