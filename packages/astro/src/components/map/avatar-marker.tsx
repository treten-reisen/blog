import type { Position } from "geojson"

import Marker from "./marker"

export type AvatarMarkerProps = {
  avatarUrl: string
  position: Position
}

const AvatarMarker = ({ avatarUrl, position }: AvatarMarkerProps) => {
  return (
    <Marker position={position}>
      <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-lime-500 shadow-xl">
        <img className="h-full w-full" src={avatarUrl} alt="Mein Profilbild" />
      </div>
    </Marker>
  )
}

export default AvatarMarker
