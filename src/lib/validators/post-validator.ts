import { z } from "zod";

export const PostDataValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .max(3000, "Description must be at most 3000 characters long"),
  price: z.number(),
  category: z
    .union([
      z.literal("front"),
      z.literal("back"),
      z.literal("full"),
      z.literal("unspecified"),
      z.null(),
      z.undefined(),
    ])
    .default("unspecified"),
});

export type TPostDataValidator = z.infer<typeof PostDataValidator>;
