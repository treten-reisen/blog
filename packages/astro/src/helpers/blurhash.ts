import { decode, encode, isBlurhashValid } from "blurhash"
import sharp from "sharp"

import type { TransformedStrapiImage } from "../data/image"

export async function encodeImageToBlurhashURL(image: TransformedStrapiImage) {
  const response = await fetch(image.attributes.url)
  const sharpimage = sharp(await response.arrayBuffer())

  const { data, info } = await sharpimage
    .resize(32, 32, {
      fit: "inside",
    })
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true,
    })

  const blurhash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4)

  if (!isBlurhashValid(blurhash)) throw new Error("Generated invalid blurhash!")

  await sharp(decode(blurhash, info.width, info.height))

  return { blurhash, width: info.width, height: info.height }
}
