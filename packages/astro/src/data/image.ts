import { getImage } from "astro:assets"

import type { StrapiImageData } from "./schema/strapi.schema"

export const transformStrapiImage = async (image: StrapiImageData, size?: { width?: number; height?: number }) => {
  const width = size?.width === undefined && size?.height === undefined
    ? undefined
    : size.width !== undefined
      ? size.width
      : !image.width || !image.height || !size?.height
        ? undefined
        : image.width / image.height * size.height;

  const height = size?.width === undefined && size?.height === undefined
    ? undefined
    : size.height !== undefined
      ? size.height
      : !image.width || !image.height || !size?.width
        ? undefined
        : image.height / image.width * size.width;

  const htmlImage = await getImage({
    src: image.url,
    format: "webp",
    width,
    height,
    inferSize: width === undefined && height === undefined,
  })

  return {
    ...image,
    htmlImage,
  }
}

export type TransformedStrapiImage = Awaited<ReturnType<typeof transformStrapiImage>>
