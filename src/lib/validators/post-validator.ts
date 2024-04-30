import { z } from "zod";

export const PostDataValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .max(3000, "Description must be at most 3000 characters long"),
  workFiles: z.any(),
  price: z.number(),
});

export type TPostDataValidator = z.infer<typeof PostDataValidator>;
