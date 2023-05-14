import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Feature, FeatureCollection, GeoJsonProperties, LineString, Position } from "geojson"
import type { Map } from "maplibre-gl"
import { useEffect, useState } from "react"

import MapPopup from "./map-popup"
import { useMap } from "./map.context"
import useLocationHistory from "./use-location-history"
import useNightsLocations from "./use-nights-locations"

const addRoute = (map: Map, routeData: Feature<LineString, GeoJsonProperties>) => {
  map.addSource("route", {
    type: "geojson",
    data: routeData,
  })
  map.addLayer({
    id: "route-background",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 5,
    },
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

const addNights = (
  map: Map,
  nights: FeatureCollection,
  openNightPopup: (position: Position, timestamp: string, onClose: () => void) => void
) => {
  map.addSource("nights", {
    type: "geojson",
    data: nights,
  })

  map.addLayer({
    id: "nights",
    type: "circle",
    source: "nights",
    paint: {
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        6,
        ["boolean", ["feature-state", "open"], false],
        6,
        4,
      ],
      "circle-color": "#84cc16",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 1,
    },
    filter: ["==", "$type", "Point"],
  })

  let hoveredStateId: string | number | null = null

  map.on("mousemove", "nights", function (e) {
    if (!e.features || e.features.length <= 0) return
    if (hoveredStateId) {
      map.getCanvas().style.cursor = ""
      map.setFeatureState({ source: "nights", id: hoveredStateId }, { hover: false })
    }

    const newHoveredStateId = e.features[0].id
    hoveredStateId = typeof newHoveredStateId === "number" ? newHoveredStateId : null
    if (newHoveredStateId) {
      map.getCanvas().style.cursor = "pointer"
      map.setFeatureState({ source: "nights", id: newHoveredStateId }, { hover: true })
    }
  })

  map.on("mouseleave", "nights", function () {
    if (hoveredStateId) {
      map.getCanvas().style.cursor = ""
      map.setFeatureState({ source: "nights", id: hoveredStateId }, { hover: false })
    }
    hoveredStateId = null
  })

  map.on("click", "nights", function (e) {
    if (!e.features || e.features.length <= 0) return
    const clickedFeature = e.features[0]
    const clickedGeometry = clickedFeature.geometry
    if (clickedGeometry.type !== "Point") return
    const coordinates = clickedGeometry.coordinates
    const timestamp = clickedFeature.properties?.timestamp

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
    }

    map.setFeatureState({ source: "nights", id: clickedFeature.id }, { open: true })

    openNightPopup([coordinates[0], coordinates[1]], timestamp, () => {
      map.setFeatureState({ source: "nights", id: clickedFeature.id }, { open: false })
    })
  })
}

const PathLayer = () => {
  const map = useMap()
  const { data: locationHistory } = useLocationHistory()
  const { data: nightsLocations } = useNightsLocations()

  useEffect(() => {
    if (locationHistory && nightsLocations) {
      addRoute(map, locationHistory)

      addNights(map, nightsLocations, (position, timestamp, onClose) => {
        const date = new Date(timestamp)
        const dateString = Intl.DateTimeFormat("de-DE", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(date)
        setClickedNight({ position, dateString, onClose })
      })
    }
  }, [map, locationHistory, nightsLocations])

  const [clickedNight, setClickedNight] = useState<{ position: Position; dateString: string; onClose: () => void }>()

  return (
    <>
      {clickedNight && (
        <MapPopup closeButton={false} position={clickedNight.position} onClose={clickedNight.onClose}>
          <div className="flex items-center font-sans text-xs text-gray-700">
            <FontAwesomeIcon icon={solid("moon")} className="mr-2 text-sm" />
            <span>{clickedNight.dateString}</span>
          </div>
        </MapPopup>
      )}
    </>
  )
}

export default PathLayer
