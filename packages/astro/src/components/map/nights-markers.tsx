import type { FeatureCollection } from "geojson"
import type { Map } from "maplibre-gl"
import { useEffect } from "react"

import { useMap } from "./map.context"
import useNightsLocations from "./use-nights-locations"

export type NightsMarkersProps = {
  onAdded?: () => void
}

const addLocations = (map: Map, nights: FeatureCollection, cb?: () => void) => {
  map.addSource("nights", {
    type: "geojson",
    data: nights,
  })

  map.addLayer(
    {
      id: "nights",
      type: "circle",
      source: "nights",
      paint: {
        "circle-radius": 5,
        "circle-color": "#84cc16",
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 2,
      },
      filter: ["==", "$type", "Point"],
    },
    "avatar"
  )

  cb?.()
}

const NightsMarkers = ({ onAdded }: NightsMarkersProps) => {
  const map = useMap()
  const { data: nightsLocations } = useNightsLocations()

  useEffect(() => {
    if (nightsLocations) {
      console.log(nightsLocations)
      addLocations(map, nightsLocations, onAdded)
    }
  }, [map, nightsLocations])
  return <></>
}

export default NightsMarkers
