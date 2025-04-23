import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { likesSchema } from "./schema/likes.schema"

export type LikesResponse = z.infer<typeof likesSchema>

export const likeArticle = async (documentId: string) => {
  const response = await fetch(
    `${import.meta.env.PUBLIC_STRAPI_API_URL}/api/articles/${documentId}/likes`,
    setAuthHeaders({ method: "PUT" })
  )
  return parseResponse(response, likesSchema)
}
