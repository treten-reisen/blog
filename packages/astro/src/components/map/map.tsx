import type { Feature, Point } from "geojson"

import AvatarMarker from "./avatar-marker"
import { MapProvider } from "./map.context"
import PathLayer from "./path-layer"
import useLatestLocation from "./use-latest-location"

export type MapProps = {
  avatarUrl: string
  center: Feature<Point>
  hideControls?: boolean
}

const Map = ({ avatarUrl, center, hideControls = false }: MapProps) => {
  const { data: latestLocation } = useLatestLocation()

  const position = latestLocation?.geometry.coordinates

  return (
    <MapProvider center={position || center.geometry.coordinates} hideControls={hideControls}>
      {position && <AvatarMarker avatarUrl={avatarUrl} position={position} />}
      <PathLayer />
    </MapProvider>
  )
}

export default Map
