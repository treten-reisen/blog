import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useRef, useState } from "react"

import "./media-gallery.css"
import type { TransformedStrapiImage } from "../../data/image"
import { useSizeListener } from "../../hooks/use-size-listener"

import MediaGalleryItem from "./media-gallery-item"

export type MediaGalleryProps = {
  files: TransformedStrapiImage[]
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

const MediaGallery = ({ files }: MediaGalleryProps) => {
  const galleryItemsContainerRef = useRef<HTMLDivElement>(null)
  const [ratioDifference, setRatioDifference] = useState<number[]>(files.map(() => 0))
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const next = useCallback(() => {
    const galleryItemsContainerEl = galleryItemsContainerRef.current
    if (!galleryItemsContainerEl) return
    const nextIndex = mod(selectedIndex + 1, files.length)
    galleryItemsContainerEl.scrollTo({
      left: nextIndex * galleryItemsContainerEl.clientWidth,
    })
  }, [files.length, selectedIndex])

  const prev = useCallback(() => {
    const galleryItemsContainerEl = galleryItemsContainerRef.current
    if (!galleryItemsContainerEl) return
    const nextIndex = mod(selectedIndex - 1, files.length)
    galleryItemsContainerEl.scrollTo({
      left: nextIndex * galleryItemsContainerEl.clientWidth,
    })
  }, [files.length, selectedIndex])

  const handleClickNext = useCallback(() => {
    next()
  }, [next])

  const handleClickPrev = useCallback(() => {
    prev()
  }, [prev])

  useSizeListener(galleryItemsContainerRef, ({ width, height }) => {
    const elementRatio = width / height
    setRatioDifference(
      files.map(file => {
        const fileRatio = (file.attributes.width || 0) / (file.attributes.height || 1)
        const diff = elementRatio - fileRatio
        return Math.abs(diff)
      })
    )
  })

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        next()
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        prev()
      }
    },
    [next, prev]
  )

  const handleScroll = useCallback(() => {
    const galleryItemsContainerEl = galleryItemsContainerRef.current
    if (!galleryItemsContainerEl) return
    const width = galleryItemsContainerEl.clientWidth
    const scrollPos = galleryItemsContainerEl.scrollLeft
    const newIndex = Math.round(scrollPos / width)
    setSelectedIndex(newIndex)
  }, [])

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0} role="tablist" aria-label="Bildergalerie" className="media-gallery">
      <button
        aria-label="Vorheriges Bild anzeigen"
        onClick={handleClickPrev}
        className="media-gallery__nav-button media-gallery__nav-button-prev"
      >
        <span className="media-gallery__nav-button-icon">
          <FontAwesomeIcon icon={solid("chevron-left")} />
        </span>
      </button>
      <button
        aria-label="Nächstes Bild anzeigen"
        onClick={handleClickNext}
        className="media-gallery__nav-button media-gallery__nav-button-next"
      >
        <span className="media-gallery__nav-button-icon">
          <FontAwesomeIcon icon={solid("chevron-right")} />
        </span>
      </button>
      <div className="media-gallery__items-container" onScroll={handleScroll} ref={galleryItemsContainerRef}>
        {files.map((file, index) => (
          <MediaGalleryItem
            key={file.id}
            file={file}
            label={"Bild " + (index + 1)}
            objectFit={ratioDifference[index] > 0.45 ? "contain" : "cover"}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  )
}

export default MediaGallery
