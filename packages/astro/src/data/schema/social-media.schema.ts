import { z } from "zod"

export const strapiSocialMediaSchema = z.object({
  id: z.number(),
  username: z.string(),
  url: z.string().url(),
  platform: z.enum(["facebook", "instagram", "twitter", "youtube"]),
})

export type StrapiSocialMedia = z.infer<typeof strapiSocialMediaSchema>