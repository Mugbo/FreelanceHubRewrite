import { publicProcedure, router } from "./trpc";
import { authRouter } from "./auth-router";
import { z } from "zod";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";

export const appRouter = router({
  auth: authRouter,

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

      const parsedQerOpts: Record<string, {equals:string }> = {}

      Object.entries(queryOpts).forEach(([key,value]) => {
         parsedQerOpts[key] = {
            equals: value,
         }
      })

      const page = cursor || 1

      const { docs:items , hasNextPage, nextPage } = await payload.find({
        collection: "work",
        where: {
          approved: {
            equals: "approved",
          },
        },
        sort,
        depth: 1,
        limit,
        page,
      });
      return {
         items,
         nextPage: hasNextPage? nextPage : null
      }
    }),
});

export type AppRouter = typeof appRouter;
