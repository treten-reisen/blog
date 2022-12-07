import { Overlay } from "ol"
import type { Coordinate } from "ol/coordinate"
import type { Positioning } from "ol/Overlay"
import { PropsWithChildren, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import { useMap } from "./map.context"

export type MapOverlayProps = {
  position: Coordinate
  positioning?: Positioning
  stopEvent?: boolean
}

const MapOverlay = ({
  children,
  position,
  positioning = "center-center",
  stopEvent = true,
}: PropsWithChildren<MapOverlayProps>) => {
  const map = useMap()
  const element = useRef(document.createElement("div"))
  const overlay = useRef(
    new Overlay({
      element: element.current,
      position,
      positioning,
      stopEvent,
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

  return <>{createPortal(children, element.current)}</>
}

export default MapOverlay
