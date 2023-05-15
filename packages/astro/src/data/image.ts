import { getImage } from "@astrojs/image"

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

  console.log({
    image: image.attributes.url,
    width: width || (height && aspectRatio && height * aspectRatio),
    height: height || (width && aspectRatio && width / aspectRatio),
    attributes: { width: image.attributes.width, height: image.attributes.height },
  })

  const htmlImage = await getImage({
    src: image.attributes.url,
    alt: image.attributes.alternativeText,
    format: "webp",
    width: width || (height && aspectRatio && height * aspectRatio),
    height: height || (width && aspectRatio && width / aspectRatio),
  })

  return {
    ...image,
    htmlImage,
  }
}

export type TransformedStrapiImage = Awaited<ReturnType<typeof transformStrapiImage>>
