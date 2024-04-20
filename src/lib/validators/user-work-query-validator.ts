import { z } from "zod";

export const UserWorkQueryValidator = z.object({
    category: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    limit: z.number().optional(),
    userId: z.any(),
    
})

export type TUserWorkQueryValidator = z.infer<typeof UserWorkQueryValidator>