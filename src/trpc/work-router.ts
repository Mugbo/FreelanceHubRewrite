// index.ts
import { getPayloadClient } from "../get-payload";
import { router, publicProcedure } from "./trpc";
import { PostDataValidator } from "../lib/validators/post-validator";

export const workRouter = router({
  createWorkPosting: publicProcedure
    .input(PostDataValidator)
    .mutation(async ({ input }) => {
      const { title, description, workFiles, user } = input;

      const payload = await getPayloadClient();

      // Assuming there is some mechanism to validate the user and files here
      const newWork = await payload.create({
        collection: "work",
        data: {
          title,
          description,
          workFiles,
          user: user,
          approved: "unverified", // Default state
          price: 0,
        },
      });

      return newWork;
    }),
});

export default workRouter;
