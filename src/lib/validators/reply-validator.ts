import { z } from 'zod';

export const ReplyDataValidator = z.object({
    title: z.string().min(1, "Title is required"), 
    description: z.string().max(3000, "Description must be at most 3000 characters long"), 
    user: z.any(), 
    workFiles: z.any(), 
    work: z.any()
});

export type TReplyDataValidator = z.infer<typeof ReplyDataValidator>;
