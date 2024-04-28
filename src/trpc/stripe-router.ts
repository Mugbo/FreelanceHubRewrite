import stripe from "./../stripeClient";
import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import type Stripe from "stripe";

export const paymentsRouter = router({
  initiateSession: privateProcedure
    .input(z.object({ workId: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { workId } = input;

      if (!workId.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No work IDs provided.",
        });
      }

      const payloadClient = await getPayloadClient();

      const { docs: work } = await payloadClient.find({
        collection: "work",
        where: {
          id: { equals: workId },
        },
      });

      if (work.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Work not found" });
      }

      const workItem = work[0];

      const workOrder = await payloadClient.create({
        collection: "workOrder",
        data: {
          _isPaid: false,
          work: workItem.id,
          user: user.id,
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      if (workItem) {
        line_items.push({
          price: workItem.priceId!,
          quantity: 1,
        });
      }

      line_items.push({
        price: "price_1OCeBwA19umTXGu8s4p2G3aX", // Assuming this is the priceId for the work
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      });

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${workOrder.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card"],
          mode: "payment",
          metadata: {
            userId: user.id,
            orderId: workOrder.id,
          },
          line_items,
        });
        return { url: stripeSession.url };
      } catch (error) {
        console.error("Failed to create Stripe session:", error);
        return { url: null };
      }
    }),

  checkOrderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input;

      const payloadClient = await getPayloadClient();

      const { docs: workOrder } = await payloadClient.find({
        collection: "workOrder",
        where: { id: { equals: orderId } },
      });

      if (workOrder.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

      const [orderDetails] = workOrder;
      return { isPaid: orderDetails._isPaid };
    }),
});
