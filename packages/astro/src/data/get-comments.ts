import { z } from "zod"
import type { CommentCollectionType } from "./post-comment"
import { strapiCommentSchema } from "./schema/comment.schema"

const strapiCommentsResponseSchema = z.object({
  data: z.array(strapiCommentSchema),
})

export type StrapiCommentsResponse = z.infer<
  typeof strapiCommentsResponseSchema
>

export const getComments = async (
  strapiUrl: string,
  collection: CommentCollectionType,
  id: number
) => {
  const response = await fetch(
    `${strapiUrl}/api/comments/api::${collection}:${id}/flat`
  )
  const data = await response.json()
  return await strapiCommentsResponseSchema.parseAsync(data)
}
