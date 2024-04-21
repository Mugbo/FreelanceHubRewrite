import { ReplyDataValidator } from "../lib/validators/reply-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { z } from "zod";
import { ReplyQueryValidator } from "../lib/validators/replies-query-validator";

export const replyRouter = router({
  createWorkreply: publicProcedure
    .input(ReplyDataValidator)
    .mutation(async ({ input }) => {
      const { title, description, user, workFiles, work } = input;

      const payload = await getPayloadClient();

      const newReply = await payload.create({
        collection: "replies",
        data: {
          title,
          description,
          user: user,
          workFiles,
          work,
        },
      });

      return newReply;
    }),


    getAllRepliesOnWork: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: ReplyQueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor} = input;
      const {  workId, ...queryOpts } = query;

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
        collection: "replies",
        where: {
          work:{
            equals: workId
          }
        },
        sort: "desc",
        depth: 1,
        limit: 100,
        page,
      });
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});
