import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiGlobalSchema } from "./schema/global.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiGlobalResponseSchema = strapiSingleSchema(strapiGlobalSchema)

export type StrapiGlobalResponse = z.infer<typeof strapiGlobalResponseSchema>

export const getGlobal = async () => {
  const response = await fetch(
    `${
      import.meta.env.PUBLIC_STRAPI_API_URL
    }/api/global?populate[favicon]=%2A&populate[defaultSeo][populate]=%2A&populate[socialMedia][populate]=%2A&populate[avatar]=%2A`,
    setAuthHeaders()
  )

  return parseResponse(response, strapiGlobalResponseSchema)
}
