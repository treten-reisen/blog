import { decode, encode, isBlurhashValid } from "blurhash"
import sharp from "sharp"

export async function encodeImageToBlurhashURL(
  url: string,
  width: number,
  height: number,
  fit?: keyof sharp.FitEnum | undefined
) {
  const response = await fetch(url)
  const image = sharp(await response.arrayBuffer())

  const { data, info } = await image
    .resize({ width, height, fit })
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

  await sharp(decode(blurhash, 32, 32))

  return { blurhash, width: 32, height: 32 }
}
