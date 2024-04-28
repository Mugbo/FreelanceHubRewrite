
import { z } from 'zod';

export const PostDataValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().max(3000, "Description must be at most 3000 characters long"),
//   workFiles: z.array(z.string()).min(1, "At least one work file is required"),
workFiles: z.any(),
});

export type TPostDataValidator = z.infer<typeof PostDataValidator>;
