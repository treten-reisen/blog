import { z } from "zod"

export const likesSchema = z.object({
  likes: z.number(),
})

export type Likes = z.infer<typeof likesSchema>
