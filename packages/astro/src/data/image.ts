import { getImage } from "@astrojs/image"

import type { StrapiImageData } from "./schema/strapi.schema"

export const transformStrapiImage = async (image: StrapiImageData, size?: { width?: number; height?: number }) => {
  const width = size?.width || size?.height ? size.width : image.width
  const height = size?.width || size?.height ? size.height : image.height
  const aspectRatio =
    size?.width || size?.height
      ? size?.width && size?.height
        ? undefined
        : image.width && image.height
        ? image.width / image.height
        : undefined
      : undefined

  const htmlImage = await getImage({
    src: image.url,
    alt: image.alternativeText,
    format: "webp",
    width,
    height,
    aspectRatio,
  })

  return {
    ...image,
    htmlImage,
  }
}

export type TransformedStrapiImage = Awaited<ReturnType<typeof transformStrapiImage>>
