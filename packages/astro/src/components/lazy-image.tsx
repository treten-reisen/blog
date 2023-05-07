import { decode } from "blurhash"
import { useCallback, useEffect, useRef, useState } from "react"

export type LazyImageProps = {
  blurhashConfig: {
    width: number
    height: number
    blurhash: string
  }
} & React.ImgHTMLAttributes<HTMLImageElement>

const LazyImage = ({ blurhashConfig, onLoad, ...imageProps }: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleLoaded: React.ReactEventHandler<HTMLImageElement> = useCallback(
    ev => {
      setTimeout(() => setImageLoaded(true), 400)
      onLoad?.(ev)
    },
    [onLoad]
  )

  useEffect(() => {
    console.log(imgRef.current?.complete)
    if (imgRef.current && imgRef.current.complete) {
      setImageLoaded(true)
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img className="h-full w-full object-cover" {...imageProps} onLoad={handleLoaded} ref={imgRef} />
      <div className="h-full w-full" style={{ display: imageLoaded ? "none" : "block" }}>
        <BlurhashCanvas blurhashConfig={blurhashConfig} />
      </div>
    </div>
  )
}

type BlurhashCanvasProps = {
  blurhashConfig: {
    width: number
    height: number
    blurhash: string
  }
}

const BlurhashCanvas = ({ blurhashConfig }: BlurhashCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = blurhashConfig.width
    canvas.height = blurhashConfig.height
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Error")
    const pixels = decode(blurhashConfig.blurhash, blurhashConfig.width, blurhashConfig.height)
    const imageData = ctx.createImageData(blurhashConfig.width, blurhashConfig.height)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  }, [blurhashConfig.blurhash, blurhashConfig.height, blurhashConfig.width])

  return <canvas className="absolute left-0 top-0 h-full w-full object-cover" ref={canvasRef} />
}

export default LazyImage
