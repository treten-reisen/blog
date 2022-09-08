import type { Coordinate } from "ol/coordinate"
import type { Positioning } from "ol/Overlay"
import { fromLonLat } from "ol/proj"
import useLatestLocation from "../../hooks/use-latest-location"
import MapOverlay from "./map-overlay"

export type LatestLocationOverlayProps = {
  avatarUrl: string
  position: Coordinate
}

const AvatarOverlay = ({ avatarUrl, position }: LatestLocationOverlayProps) => {
  return (
    <>
      {position && (
        <MapOverlay position={position}>
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
