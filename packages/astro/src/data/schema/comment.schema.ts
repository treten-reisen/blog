import { z } from "zod"
import { dateStringSchema } from "./date.schema"

export const strapiCommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  blocked: z.nullable(z.boolean()),
  blockedThread: z.boolean(),
  blockReason: z.any(),
  authorUser: z.any(),
  removed: z.nullable(z.boolean()),
  approvalStatus: z.nullable(z.literal("APPROVED")),
  author: z.object({
    id: z.nullable(z.string()),
    name: z.string(),
    email: z.string().email(),
    avatar: z.nullable(z.string()),
  }),
  createdAt: dateStringSchema,
  updatedAt: dateStringSchema,
  related: z.any(),
  reports: z.optional(z.array(z.string())),
})

export type Comment = z.infer<typeof strapiCommentSchema>
