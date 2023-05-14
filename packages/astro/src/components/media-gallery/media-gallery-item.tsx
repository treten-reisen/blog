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
    <div role="tab" aria-selected={selected} aria-label={label} className="media-gallery__item">
      <a className="cursor-zoom-in" aria-label="Bild öffnen" href={file.attributes.url || undefined}>
        <figure className="flex h-full flex-col items-center overflow-hidden">
          {objectFit === "contain" && (
            <img
              src={file.htmlImage.src || undefined}
              alt={file.htmlImage.alt || undefined}
              className="left-0 top-0 -m-4 h-full w-full object-cover blur-lg"
              aria-hidden="true"
              loading="lazy"
            />
          )}
          <img
            src={file.htmlImage.src || undefined}
            alt={file.htmlImage.alt || undefined}
            className={classnames("absolute left-0 top-0 h-full w-full object-contain", {
              "object-cover": objectFit === "cover",
              "object-contain": objectFit === "contain",
            })}
            loading="lazy"
          />
          <figcaption className="absolute bottom-0 left-0 w-full bg-gray-700 bg-opacity-50 p-2 text-center font-sans italic text-gray-50">
            {file.attributes.caption}
          </figcaption>
        </figure>
      </a>
    </div>
  )
}

export default MediaGalleryItem
