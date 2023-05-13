import { decode } from "blurhash"
import React, { useCallback, useEffect, useRef, useState } from "react"

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  blurhashConfig: {
    width: number
    height: number
    blurhash: string
  }
  aspectRatio?: number
}

const LazyImage = ({ blurhashConfig, aspectRatio, onLoad, ...imageProps }: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleLoaded: React.ReactEventHandler<HTMLImageElement> = useCallback(
    ev => {
      if (imgRef.current && imgRef.current.complete) {
        setImageLoaded(true)
      }
      onLoad?.(ev)
    },
    [onLoad]
  )

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImageLoaded(true)
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-full w-full"
        style={{ display: imageLoaded ? "none" : "block" }}
      >
        <BlurhashCanvas blurhashConfig={blurhashConfig} aspectRatio={aspectRatio} />
      </div>
      <Image
        className={`h-full w-full object-cover`}
        style={{ aspectRatio: aspectRatio && `auto ${aspectRatio}` }}
        {...imageProps}
        onLoad={handleLoaded}
        ref={imgRef}
      />
    </div>
  )
}

const Image = React.memo(
  React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(function Image(props, ref) {
    return <img {...props} ref={ref} />
  })
)

type BlurhashCanvasProps = {
  blurhashConfig: {
    width: number
    height: number
    blurhash: string
  }
  aspectRatio?: number
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

  return <canvas className="h-full w-full object-cover" ref={canvasRef} />
}

export default LazyImage
