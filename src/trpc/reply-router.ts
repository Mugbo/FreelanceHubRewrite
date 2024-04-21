import { ReplyDataValidator } from "../lib/validators/reply-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { z } from "zod";
import { ReplyQueryValidator } from "../lib/validators/replies-query-validator";
import { Replies } from "@/collections/Replies";

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
      const { query, cursor } = input;
      const { workId, ...queryOpts } = query;

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
          work: {
            equals: workId,
          },
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

  addUpvotesOnReplies: publicProcedure
    .input(z.object({ replyId: z.string() }))
    .mutation(async ({ input }) => {
      const { replyId } = input;
      const payload = await getPayloadClient();

      const { docs: reply } = await payload.find({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        depth: 0,
        limit: 1,
      });

      const [thisReply] = reply;

      if (!reply) throw new Error("Reply not found");

      const newvote = (thisReply.upvotes as number) + 1;

      return await payload.update({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        data: {
          upvotes: newvote,
        },
      });
    }),

  removeUpvotesOnReplies: publicProcedure
    .input(z.object({ replyId: z.string() }))
    .mutation(async ({ input }) => {
      const { replyId } = input;
      const payload = await getPayloadClient();

      const { docs: reply } = await payload.find({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        depth: 0,
        limit: 1,
      });

      const [thisReply] = reply;

      if (!reply) throw new Error("Reply not found");
      if (thisReply.upvotes == 0)
        throw new Error("Votes cannot be less than 0");

      const newvote = (thisReply.upvotes as number) - 1;

      return await payload.update({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        data: {
          upvotes: newvote,
        },
      });
    }),

  getUpvotesOnReplies: publicProcedure
    .input(z.object({ replyId: z.string() }))
    .query(async ({ input }) => {
      const { replyId } = input;
      const payload = await getPayloadClient();

      const { docs: reply } = await payload.find({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        depth: 0,
        limit: 1,
      });

      if (!reply) {
        throw new Error("Reply not found");
      }

      const [thisReply] = reply;
      const upvotes = thisReply.upvotes;
      return upvotes;
    }),

  addDownvotesOnReplies: publicProcedure
    .input(z.object({ replyId: z.string() }))
    .mutation(async ({ input }) => {
      const { replyId } = input;
      const payload = await getPayloadClient();

      const { docs: reply } = await payload.find({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        depth: 0,
        limit: 1,
      });

      const [thisReply] = reply;

      if (!reply) throw new Error("Reply not found");

      const newvote = (thisReply.downvotes as number) + 1;

      return await payload.update({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        data: {
          downvotes: newvote,
        },
      });
    }),

  removeDownvotesOnReplies: publicProcedure
    .input(z.object({ replyId: z.string() }))
    .mutation(async ({ input }) => {
      const { replyId } = input;
      const payload = await getPayloadClient();

      const { docs: reply } = await payload.find({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        depth: 0,
        limit: 1,
      });

      const [thisReply] = reply;

      if (!reply) throw new Error("Reply not found");
      if (thisReply.downvotes == 0)
        throw new Error("Votes cannot be less than 0");

      const newvote = (thisReply.downvotes as number) - 1;

      return await payload.update({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        data: {
          downvotes: newvote,
        },
      });
    }),

  getDownvotesOnReplies: publicProcedure
    .input(z.object({ replyId: z.string() }))
    .query(async ({ input }) => {
      const { replyId } = input;
      const payload = await getPayloadClient();

      const { docs: reply } = await payload.find({
        collection: "replies",
        where: {
          id: {
            equals: replyId,
          },
        },
        depth: 0,
        limit: 1,
      });

      if (!reply) {
        throw new Error("Reply not found");
      }

      const [thisReply] = reply;
      const downvotes = thisReply.downvotes;
      return downvotes;
    }),
});
