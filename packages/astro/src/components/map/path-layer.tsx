import type { Feature, GeoJsonProperties, LineString } from "geojson"
import type { Map } from "maplibre-gl"
import { useEffect } from "react"

import useLocationHistory from "../../hooks/use-location-history"

import { useMap } from "./map.context"

export type PathLayerProps = {
  backendUrl: string
}

const addRoute = (map: Map, routeData: Feature<LineString, GeoJsonProperties>) => {
  map.addSource("route", {
    type: "geojson",
    data: routeData,
  })
  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#84cc16",
      "line-width": 3,
    },
  })
}

const PathLayer = ({ backendUrl }: PathLayerProps) => {
  const map = useMap()
  const { data: locationHistory } = useLocationHistory(backendUrl)

  useEffect(() => {
    if (locationHistory) {
      addRoute(map, locationHistory)
    }
  }, [map, locationHistory])

  return <></>
}

export default PathLayer
