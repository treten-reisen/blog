import type { Feature, Point, Position } from "geojson"

import Marker from "./marker"
import useNightsLocations from "./use-nights-locations"

type NightMarkerProps = {
  timestamp: string
  position: Position
}

const NightMarker = ({ timestamp, position }: NightMarkerProps) => {
  return (
    <Marker position={position}>
      <button
        className="h-3 w-3 rounded-full border-2 border-gray-50 bg-lime-500"
        onClick={() => alert("test")}
      ></button>
    </Marker>
  )
}

const NightsMarkers = () => {
  const { data: nightsLocations } = useNightsLocations()

  return (
    <>
      {nightsLocations?.features
        .filter((feature): feature is Feature<Point, any> => feature.geometry.type === "Point")
        .map(feature => (
          <NightMarker
            key={feature.properties.timestamp}
            timestamp={feature.properties.timestamp}
            position={feature.geometry.coordinates}
          ></NightMarker>
        ))}
    </>
  )
}

export default NightsMarkers
