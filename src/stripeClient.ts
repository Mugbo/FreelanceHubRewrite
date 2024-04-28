import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export default stripe;
