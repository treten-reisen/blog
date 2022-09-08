import type { Control } from "ol/control"
import "ol/ol.css"
import { fromLonLat } from "ol/proj"

import useLatestLocation from "../../hooks/use-latest-location"

import AvatarOverlay from "./avatar-overlay"
import MapLayer from "./map-layer"
import { MapProvider } from "./map.context"
import PathLayer from "./path-layer"

export type MapProps = {
  backendUrl: string
  apiKey: string
  avatarUrl: string
  controls?: Control[]
}

const Map = ({ backendUrl, apiKey, avatarUrl, controls }: MapProps) => {
  const { data: latestLocation } = useLatestLocation(backendUrl)

  const position = latestLocation && fromLonLat(latestLocation.geometry.coordinates)

  return (
    <MapProvider center={position} controls={controls}>
      {position && <AvatarOverlay avatarUrl={avatarUrl} position={position} />}
      <MapLayer apiKey={apiKey} />
      <PathLayer backendUrl={backendUrl} />
    </MapProvider>
  )
}

export default Map
