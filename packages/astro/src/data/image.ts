import { getImage } from "@astrojs/image"

import { encodeImageToBlurhashURL } from "../helpers/blurhash"

import type { StrapiImageData } from "./schema/strapi.schema"

export const transformStrapiImage = async (image: StrapiImageData, size?: { width?: number; height?: number }) => {
  const width = size?.width || size?.height ? size.width : image.attributes.width
  const height = size?.width || size?.height ? size.height : image.attributes.height
  const aspectRatio =
    size?.width || size?.height
      ? size?.width && size?.height
        ? undefined
        : image.attributes.width && image.attributes.height
        ? image.attributes.width / image.attributes.height
        : undefined
      : undefined

  const htmlImage = await getImage({
    src: image.attributes.url,
    alt: image.attributes.alternativeText,
    format: "webp",
    width,
    height,
    aspectRatio,
  })

  const blurhash = await encodeImageToBlurhashURL(
    image.attributes.url,
    width || Math.round((height || 0) * (aspectRatio || 1)),
    height || Math.round((width || 0) / (aspectRatio || 1))
  )

  return {
    ...image,
    htmlImage,
    blurhash,
  }
}

export type TransformedStrapiImage = Awaited<ReturnType<typeof transformStrapiImage>>
