import type { Position } from "geojson"

import Marker from "./marker"

export type LatestLocationOverlayProps = {
  avatarUrl: string
  position: Position
  onAdded?: () => void
}

const AvatarOverlay = ({ avatarUrl, position, onAdded }: LatestLocationOverlayProps) => {
  onAdded?.()
  return (
    <Marker position={position} zIndex={20}>
      <div className="z-10 h-12 w-12 overflow-hidden rounded-full border-2 border-lime-500">
        <img className="h-full w-full" src={avatarUrl} />
      </div>
    </Marker>
  )
}

export default AvatarOverlay
