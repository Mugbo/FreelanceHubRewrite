import stripe from "./../stripeClient";
import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import type Stripe from "stripe";

export const paymentsRouter = router({
  initiateSession: privateProcedure
    .input(z.object({ workId: z.string() }))
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

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/ordercomplete?orderId=${workOrder.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/workpayment/${workId}`,
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

  createStripeAccount: privateProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx;
    const userId = user.id;

    try {
      const account = await stripe.accounts.create({
        type: "express",
        country: "IE",
        email: user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      const payloadClient = await getPayloadClient();

      await payloadClient.update({
        collection: "users",
        id: userId,
        data: {
          stripePayoutId: account.id,
        },
      });

      return { accountId: account.id };
    } catch (error) {
      console.error("Failed to create Stripe account:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create Stripe account",
      });
    }
  }),
  generateStripeLoginLink: privateProcedure
    .input(z.object({ accountId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // const  accountId  = ctx.user.stripePayoutId as string;
      const { accountId } = input;
      try {
        const loginLink = await stripe.accounts.createLoginLink(accountId);
        console.log("***");
        console.log(loginLink);
        console.log("***");
        return { url: loginLink.url };
      } catch (error) {
        console.error("Failed to generate Stripe login link:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate Stripe login link",
        });
      }
     }),
     generateStripeOnboardingLink: privateProcedure
    .input(z.object({ accountId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { accountId } = input;

      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${ctx.user.id}`,
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${ctx.user.id}`,
        type: 'account_onboarding',
      });

      const payloadClient = await getPayloadClient();


      await payloadClient.update({
        collection: "users",
        id: ctx.user.id,
        data: {
          onboardedStripe: "verified",
        },
      });
      return{link: accountLink}
     }),



});
