import type { Feature, Point } from "geojson"
import { useState } from "react"

import AvatarOverlay from "./avatar-overlay"
import { MapProvider } from "./map.context"
import NightsMarkers from "./nights-markers"
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
      <NightsMarkers />
      <PathLayer />
      {position && <AvatarOverlay avatarUrl={avatarUrl} position={position} />}
    </MapProvider>
  )
}

export default Map
