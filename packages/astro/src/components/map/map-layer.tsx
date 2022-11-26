import { apply } from "ol-mapbox-style"
import { useEffect } from "react"

import { useMap } from "./map.context"

export type MapLayerProps = {
  apiKey: string
}

const MapLayer = ({ apiKey }: MapLayerProps) => {
  const map = useMap()

  useEffect(() => {
    apply(map, `https://api.maptiler.com/maps/topo/style.json?key=${apiKey}`)
  }, [apiKey, map])

  return <></>
}

export default MapLayer
