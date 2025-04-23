import rehypeParse from "rehype-parse"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import { unified } from "unified"
import { z } from "zod"

import { transformStrapiImage } from "../image"

import { strapiBlockSchema } from "./blocks.schema"
import { dateStringSchema } from "./date.schema"
import { strapiSeoSchema } from "./seo.schema"
import { strapiEntitySchema, strapiImageDataSchema } from "./strapi.schema"

export const strapiArticleSchema = strapiEntitySchema(
  z.object({
    title: z.string().transform(async title => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(title)
      return file.toString()
    }),
    slug: z.string(),
    summary: z.string(),
    image: strapiImageDataSchema.transform(async image =>
      Promise.all([
        transformStrapiImage(image, { width: 1200 }),
        transformStrapiImage(image, { width: 2400 }),
      ]).then(([lg, xl]) => ({ lg, xl }))
    ),
    publishedAt: z.nullable(dateStringSchema),
    blocks: z.array(strapiBlockSchema),
    seo: strapiSeoSchema,
    listed: z.boolean(),
  })
)

export type StrapiArticle = z.infer<typeof strapiArticleSchema>
