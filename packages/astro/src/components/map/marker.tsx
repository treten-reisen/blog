import type { Position } from "geojson"
import type { MarkerOptions } from "maplibre-gl"
import { Marker as MapMarker } from "maplibre-gl"
import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"

import { useMap } from "./map.context"

type MarkerProps = React.PropsWithChildren<
  Omit<MarkerOptions, "element" | "color"> & { position: Position; className?: string; zIndex?: number }
>

const Marker = ({ children, position, zIndex, ...markerOptions }: MarkerProps) => {
  const map = useMap()
  const ref = useRef(document.createElement("div"))

  useEffect(() => {
    ref.current.style.zIndex = zIndex?.toString() || ""
  }, [zIndex])

  useEffect(() => {
    const marker = new MapMarker({ ...markerOptions, element: ref.current })
    marker.setLngLat([position[0], position[1]]).addTo(map)
    return () => {
      marker.remove()
    }
  }, [map])

  return <>{createPortal(children, ref.current)}</>
}

export default Marker
