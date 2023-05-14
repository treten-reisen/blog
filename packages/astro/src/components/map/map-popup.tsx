import type { Position } from "geojson"
import { type PopupOptions, Popup } from "maplibre-gl"
import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"

import { useMap } from "./map.context"

type MapPopupProps = React.PropsWithChildren<PopupOptions & { position: Position; onClose?: () => void }>

const MapPopup = ({ children, position, onClose, ...popupOptions }: MapPopupProps) => {
  const map = useMap()
  const ref = useRef(document.createElement("div"))

  useEffect(() => {
    const popup = new Popup(popupOptions)
    popup
      .setLngLat([position[0], position[1]])
      .on("close", () => {
        onClose?.()
      })
      .setDOMContent(ref.current)
      .addTo(map)
    return () => {
      popup.remove()
    }
  }, [map, onClose, popupOptions, position])

  return <>{createPortal(children, ref.current)}</>
}

export default MapPopup
