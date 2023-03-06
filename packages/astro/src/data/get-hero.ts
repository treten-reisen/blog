import { z, ZodError } from "zod"

import { strapiHeroSchema } from "./schema/hero.schema"
import { strapiSingleSchema } from "./schema/strapi.schema"

const strapiHeroResponseSchema = strapiSingleSchema(strapiHeroSchema)

export type StrapiHeroResponse = z.infer<typeof strapiHeroResponseSchema>

export const getHero = async () => {
  const response = await fetch(`${import.meta.env.STRAPI_API_URL}/api/hero?populate=%2A`, {
    headers: { Authorization: `bearer ${import.meta.env.STRAPI_TOKEN}` },
  })
  const data = await response.json()
  try {
    return strapiHeroResponseSchema.parseAsync(data)
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(JSON.stringify(error.issues, undefined, 2))
    }
    throw error
  }
}
