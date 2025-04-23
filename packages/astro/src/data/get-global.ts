import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiGlobalSchema } from "./schema/global.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiGlobalResponseSchema = strapiSingleSchema(strapiGlobalSchema)

export type StrapiGlobalResponse = z.infer<typeof strapiGlobalResponseSchema>

export const getGlobal = async () => {
  const params = new URLSearchParams({
    "populate[favicon][populate]": "*",
    "populate[defaultSeo][populate]": "*",
    "populate[socialMedia][populate]": "*",
    "populate[avatar][populate]": "*",
    "populate[logo][populate]": "*",
  })

  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/global?${params}`, setAuthHeaders())

  return parseResponse(response, strapiGlobalResponseSchema)
}
