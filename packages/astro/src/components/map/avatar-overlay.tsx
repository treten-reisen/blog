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
    <Marker position={position}>
      <div className="z-10 h-10 w-10 rounded-full">
        <img className="w-f h-full" src={avatarUrl} />
      </div>
    </Marker>
  )
}

export default AvatarOverlay
