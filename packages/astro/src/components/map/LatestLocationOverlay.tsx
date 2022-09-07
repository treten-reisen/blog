import { fromLonLat } from "ol/proj"
import useLatestLocation from "../../hooks/use-latest-location"
import MapOverlay from "./MapOverlay"

export type LatestLocationOverlayProps = {
  backendUrl: string
  avatarUrl: string
}

const LatestLocationOverlay = ({
  backendUrl,
  avatarUrl,
}: LatestLocationOverlayProps) => {
  const { data: latestLocation } = useLatestLocation(backendUrl)

  const position =
    latestLocation && fromLonLat(latestLocation.geometry.coordinates)

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

export default LatestLocationOverlay
