import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { likesSchema } from "./schema/likes.schema"

export type LikesResponse = z.infer<typeof likesSchema>

export const likeArticle = async (id: number) => {
  const response = await fetch(
    `${import.meta.env.PUBLIC_STRAPI_API_URL}/api/articles/${id}/likes`,
    setAuthHeaders({ method: "PUT" })
  )
  return parseResponse(response, likesSchema)
}
