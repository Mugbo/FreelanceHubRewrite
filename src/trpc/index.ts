import { publicProcedure, router } from "./trpc";
import { authRouter } from "./auth-router";
import { z } from "zod";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { PostDataValidator } from "../lib/validators/post-validator";
import payload from "payload";
import workRouter from "./work-router";
import { UserWorkQueryValidator } from "../lib/validators/user-work-query-validator";
import { replyRouter } from "./reply-router";
import { paymentsRouter } from "./stripe-router";

export const appRouter = router({
  auth: authRouter,
  work: workRouter,
  reply: replyRouter,
  pay: paymentsRouter,

  getAllWorkForMarketplace: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQerOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQerOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "work",
        where: {
          // approved: {
          //   equals: "approved",
          // },
        },
        sort,
        depth: 1,
        limit,
        page,
      });
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),

    getAllWorkFromUser: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: UserWorkQueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor} = input;
      const { sort, limit, userId, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQerOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQerOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      console.log(userId)
      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "work",
        where: {
          user:{
            equals: userId
          }
        },
        sort,
        depth: 1,
        limit,
        page,
      });
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),

  
});

export type AppRouter = typeof appRouter;
