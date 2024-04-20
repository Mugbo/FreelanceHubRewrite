import { publicProcedure, router } from "./trpc";
import { authRouter } from "./auth-router";
import { z } from "zod";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { PostDataValidator } from "../lib/validators/post-validator";
import payload from "payload";
import workRouter from "./work-router";

export const appRouter = router({
  auth: authRouter,
  work: workRouter,

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

  // createWorkPosting: publicProcedure
  //   .input(PostDataValidator)
  //   .mutation(async ({ input, ctx }) => {
  //    // const { user, price, title, workFiles, description} = input;
  //     const { title, description} = input;
  //     const {res} = ctx;

  //     const payload = await getPayloadClient();

  //     const approved = "unverified";
  //     const category = null;
  //     const price = 1
  //     // WorkFiles = ;

  //     const result = await payload.create({
  //       collection: "work",
  //       data: {
  //          price,
  //         title,
  //         workFiles : [],
  //         description,
  //         category,
  //         approved,
  //       },
  //       user: ctx.req.params.user, // Assuming you have access to the context.user
  //     });
  //     return { success: true, message: 'Work posted successfully.', result };
  //   }),

  //   export const createWorkPosting = publicProcedure
  // .input(PostDataValidator)
  // .mutation(async ({ input, context }) => {
  //   const { user, price, title, workFiles, description, category } = input;

  //   // Set the default approval status
  //   const approved = 'unverified';  // Default approval status for a new work posting

  //   // Create the new work posting in the 'work' collection
  //   const result = await payload.create({
  //     collection: 'work',
  //     data: {
  //       user,
  //       price,
  //       title,
  //       workFiles,
  //       description,
  //       category,
  //       approved
  //     },
  //     user: context.user, // Assuming you have access to the context.user
  //   });

  //   return { success: true, message: 'Work posted successfully.', result };
  // });
});

export type AppRouter = typeof appRouter;
