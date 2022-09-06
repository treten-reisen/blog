import { useRef, useEffect, PropsWithChildren } from "react"
import "ol/ol.css"
import { MapProvider, useMap } from "./map.context"
import { useMapLayer } from "./use-map-layer"
import { usePathLayer } from "./use-path-layer"

export type MapProps = {
  backendUrl: string
  apiKey: string
}

const OlMap = ({ backendUrl, apiKey }: MapProps) => {
  const map = useMap()
  const mapRef = useRef<HTMLDivElement>(null)

  useMapLayer(apiKey)
  usePathLayer(backendUrl)

  useEffect(() => {
    if (map && mapRef.current) {
      map.setTarget(mapRef.current)
    }
  }, [map, mapRef])

  return <div className="w-full h-full" ref={mapRef}></div>
}

export default (props: PropsWithChildren<MapProps>) => (
  <MapProvider>
    <OlMap {...props} />
  </MapProvider>
)
