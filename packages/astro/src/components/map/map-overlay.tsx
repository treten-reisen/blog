import { Overlay } from "ol"
import type { Coordinate } from "ol/coordinate"
import type { Positioning } from "ol/Overlay"
import { PropsWithChildren, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import { useMap } from "./map.context"

export type MapOverlayProps = {
  position: Coordinate
  positioning?: Positioning
}

const MapOverlay = ({ children, position, positioning = "center-center" }: PropsWithChildren<MapOverlayProps>) => {
  const map = useMap()
  const overlay = useRef(
    new Overlay({
      element: document.createElement("div"),
      position,
      positioning,
    })
  )

  useEffect(() => {
    if (map && overlay.current) {
      map.addOverlay(overlay.current)
    }

    return () => {
      if (map && overlay.current) {
        map.removeOverlay(overlay.current)
      }
    }
  }, [map, overlay])

  const element = overlay.current.getElement()

  return <>{element && createPortal(children, element)}</>
}

export default MapOverlay
