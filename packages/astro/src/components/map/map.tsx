import "ol/ol.css"
import { MapProvider } from "./map.context"
import PathLayer from "./path-layer"
import AvatarOverlay from "./avatar-overlay"
import MapLayer from "./map-layer"
import useLatestLocation from "../../hooks/use-latest-location"
import { fromLonLat } from "ol/proj"

export type MapProps = {
  backendUrl: string
  apiKey: string
  avatarUrl: string
}

const Map = ({ backendUrl, apiKey, avatarUrl }: MapProps) => {
  const { data: latestLocation } = useLatestLocation(backendUrl)

  const position =
    latestLocation && fromLonLat(latestLocation.geometry.coordinates)

  return (
    <MapProvider center={position}>
      {position && <AvatarOverlay avatarUrl={avatarUrl} position={position} />}
      <MapLayer apiKey={apiKey} />
      <PathLayer backendUrl={backendUrl} />
    </MapProvider>
  )
}

export default Map
