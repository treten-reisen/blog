import { decode } from "blurhash"
import { useEffect, useRef } from "react"

import type { TransformedStrapiImage } from "../data/image"

export type LazyImageProps = {
  image: TransformedStrapiImage
} & Pick<React.ImgHTMLAttributes<HTMLImageElement>, "loading">

const LazyImage = ({ image, loading }: LazyImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = image.blurhash.width
    canvas.height = image.blurhash.height
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Error")
    const pixels = decode(image.blurhash.blurhash, image.blurhash.width, image.blurhash.height)
    const imageData = ctx.createImageData(image.blurhash.width, image.blurhash.height)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  }, [image.blurhash.blurhash, image.blurhash.height, image.blurhash.width])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas className="absolute left-0 top-0 -z-10 h-full w-full" ref={canvasRef} />
      <img className="h-full w-full object-cover" src={image.htmlImage.src!} loading={loading}></img>
    </div>
  )
}

export default LazyImage
