import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiHomeSchema } from "./schema/home.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiHomeResponseSchema = strapiSingleSchema(strapiHomeSchema)

export type StrapiHeroResponse = z.infer<typeof strapiHomeResponseSchema>

export const getHome = async () => {
  const params = new URLSearchParams({
    "populate[heroimage][populate]": "*",
    "populate[blocks][populate]": "*",
  })

  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/home?${params}`, setAuthHeaders())

  return parseResponse(response, strapiHomeResponseSchema)
}
