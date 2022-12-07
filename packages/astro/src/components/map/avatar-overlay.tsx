import type { Coordinate } from "ol/coordinate"

import MapOverlay from "./map-overlay"

export type LatestLocationOverlayProps = {
  avatarUrl: string
  position: Coordinate
}

const AvatarOverlay = ({ avatarUrl, position }: LatestLocationOverlayProps) => {
  return (
    <>
      {position && (
        <MapOverlay position={position} stopEvent={false}>
          <div
            className="w-12 h-12 rounded-full shadow-md border-2 border-lime-500 bg-cover"
            style={{ backgroundImage: `url(${avatarUrl})` }}
          ></div>
        </MapOverlay>
      )}
    </>
  )
}

export default AvatarOverlay
