import { getPayloadClient } from "../get-payload";
import { router, publicProcedure, privateProcedure } from "./trpc";
import { PostDataValidator } from "../lib/validators/post-validator";

export const workRouter = router({
  createWorkPosting: privateProcedure
    .input(PostDataValidator)
    .mutation(async ({ input, ctx }) => {
      const { title, description, workFiles } = input;
      const { user } = ctx;

      const payload = await getPayloadClient();

      const newWork = await payload.create({
        collection: "work",
        data: {
          title,
          description,
          workFiles,
          user: user.id,
          approved: "unverified",
          price: 0,
        },
      });

      return newWork;
    }),
});

export default workRouter;
