import type { z } from "zod"

import { setAuthHeaders } from "./config"
import { parseResponse } from "./request"
import { strapiHeroSchema } from "./schema/hero.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiHeroResponseSchema = strapiSingleSchema(strapiHeroSchema)

export type StrapiHeroResponse = z.infer<typeof strapiHeroResponseSchema>

export const getHero = async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_STRAPI_API_URL}/api/hero?populate=%2A`, setAuthHeaders())

  return parseResponse(response, strapiHeroResponseSchema)
}
