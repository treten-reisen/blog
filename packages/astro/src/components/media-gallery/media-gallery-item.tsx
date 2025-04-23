import classnames from "classnames"

import type { TransformedStrapiImage } from "../../data/image"

export type MediaGalleryItemProps = {
  file: TransformedStrapiImage
  label: string
  objectFit: "cover" | "contain"
  selected: boolean
}

const MediaGalleryItem = ({ file, label, objectFit, selected }: MediaGalleryItemProps) => {
  return (
    <div role="tab" aria-selected={selected} aria-label={label} className="relative h-full w-full flex-none snap-start">
      <a className="cursor-zoom-in" aria-label="Bild öffnen" href={file.url || undefined}>
        <figure
          className="flex h-full flex-col items-center overflow-hidden bg-cover"
          style={{
            backgroundImage: file.htmlImage.src && objectFit === "contain" ? `url("${file.htmlImage.src}")` : undefined,
          }}
        >
          <img
            src={file.htmlImage.src || undefined}
            className={classnames("absolute left-0 top-0 h-full w-full object-contain backdrop-blur", {
              "object-cover": objectFit === "cover",
              "object-contain": objectFit === "contain",
            })}
            loading="lazy"
            alt={file.alternativeText}
            {...file.htmlImage.attributes}
          />
          <figcaption className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-70 p-2 text-center font-sans italic text-gray-50">
            {file.caption}
          </figcaption>
        </figure>
      </a>
    </div>
  )
}

export default MediaGalleryItem
