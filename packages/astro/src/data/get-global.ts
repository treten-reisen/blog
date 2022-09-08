import type { z } from "zod"

import { strapiGlobalSchema } from "./schema/global.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiGlobalResponseSchema = strapiSingleSchema(strapiGlobalSchema)

export type StrapiGlobalResponse = z.infer<typeof strapiGlobalResponseSchema>

export const getGlobal = async () => {
  const response = await fetch(
    `${
      import.meta.env.STRAPI_API_URL
    }/api/global?populate[favicon]=%2A&populate[defaultSeo][populate]=%2A&populate[socialMedia][populate]=%2A&populate[avatar]=%2A`,
    {
      headers: { Authorization: `bearer ${import.meta.env.STRAPI_TOKEN}` },
    }
  )
  const data = await response.json()
  return strapiGlobalResponseSchema.parseAsync(data)
}
