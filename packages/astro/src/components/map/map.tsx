import type { Feature, Point } from "geojson"

import useLatestLocation from "../../hooks/use-latest-location"

import AvatarOverlay from "./avatar-overlay"
import { MapProvider } from "./map.context"

import "maplibre-gl/dist/maplibre-gl.css"

export type MapProps = {
  backendUrl: string
  apiKey: string
  avatarUrl: string
  center: Feature<Point>
  hideControls?: boolean
}

const Map = ({ backendUrl, apiKey, avatarUrl, center, hideControls = false }: MapProps) => {
  const { data: latestLocation } = useLatestLocation(backendUrl)

  const position = latestLocation?.geometry.coordinates

  return (
    <MapProvider center={position || center.geometry.coordinates} apiKey={apiKey} hideControls={hideControls}>
      {position && <AvatarOverlay avatarUrl={avatarUrl} position={position} />}
      {/* <PathLayer backendUrl={backendUrl} /> */}
    </MapProvider>
  )
}

export default Map
