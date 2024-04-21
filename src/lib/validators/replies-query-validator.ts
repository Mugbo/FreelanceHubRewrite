import { z } from "zod";

export const ReplyQueryValidator = z.object({
    category: z.string().optional(),
    workId: z.any(),
})

export type TReplyQueryValidator = z.infer<typeof ReplyQueryValidator>