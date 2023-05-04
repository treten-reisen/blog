import { getImage } from "@astrojs/image"

import type { StrapiImageData } from "./schema/strapi.schema"

export const transformStrapiImage = async (image: StrapiImageData, size?: { width?: number; height?: number }) => ({
  ...image,
  htmlImage: await getImage({
    src: image.attributes.url,
    alt: image.attributes.alternativeText,
    format: "webp",
    width: size?.width || size?.height ? size.width : image.attributes.width,
    height: size?.width || size?.height ? size.height : image.attributes.height,
    aspectRatio:
      size?.width || size?.height
        ? size?.width && size?.height
          ? undefined
          : image.attributes.width && image.attributes.height
          ? image.attributes.width / image.attributes.height
          : undefined
        : undefined,
  }),
})

export type TransformedStrapiImage = Awaited<ReturnType<typeof transformStrapiImage>>
