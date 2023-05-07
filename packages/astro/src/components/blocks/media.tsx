import type { StrapiBlockMedia } from "../../data/schema/blocks.schema"
import LazyImage from "../lazy-image"

export type StrapiMediaRendererProps = {
  data: StrapiBlockMedia
}

const StrapiMediaRenderer = ({ data }: StrapiMediaRendererProps) => {
  const rawHeight = typeof data.file.htmlImage.height === "number" ? data.file.htmlImage.height : 0
  const rawWidth = typeof data.file.htmlImage.width === "number" ? data.file.htmlImage.width : 0

  const height = rawHeight >= 384 ? 384 : rawHeight
  const width = Math.round((rawWidth / rawHeight) * height)

  return (
    <div className="my-8 flex w-full max-w-prose justify-center md:my-responsive">
      <a aria-label="Bild öffnen" className="cursor-zoom-in" href={data.file.attributes.url || undefined}>
        <figure className="flex flex-col items-center">
          <div style={{ width: `${width}px`, height: `${height}px` }}>
            <LazyImage
              blurhashConfig={data.file.blurhash}
              src={data.file.htmlImage.src || undefined}
              alt={data.file.htmlImage.alt || undefined}
              loading="lazy"
            />
          </div>
          <figcaption className="mx-2 pt-2 font-sans italic text-gray-700">{data.file.attributes.caption}</figcaption>
        </figure>
      </a>
    </div>
  )
}

export default StrapiMediaRenderer
