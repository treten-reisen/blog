import { useRef, useEffect, PropsWithChildren } from "react"
import "ol/ol.css"
import { MapProvider, useMap } from "./map.context"
import { useMapLayer } from "./use-map-layer"
import { usePathLayer } from "./use-path-layer"
import MapOverlay from "./MapOverlay"
import LatestLocationOverlay from "./LatestLocationOverlay"

export type MapProps = {
  backendUrl: string
  apiKey: string
  avatarUrl: string
}

const OlMap = ({ backendUrl, apiKey, avatarUrl }: MapProps) => {
  const map = useMap()
  const mapRef = useRef<HTMLDivElement>(null)

  useMapLayer(apiKey)
  usePathLayer(backendUrl)

  useEffect(() => {
    if (map && mapRef.current) {
      map.setTarget(mapRef.current)
    }
  }, [map, mapRef])

  return (
    <div className="w-full h-full" ref={mapRef}>
      <LatestLocationOverlay backendUrl={backendUrl} avatarUrl={avatarUrl} />
    </div>
  )
}

export default (props: PropsWithChildren<MapProps>) => (
  <MapProvider>
    <OlMap {...props} />
  </MapProvider>
)
