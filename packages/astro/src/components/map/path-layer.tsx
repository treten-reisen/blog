import type { Feature, FeatureCollection, GeoJsonProperties, LineString } from "geojson"
import { Map, Popup } from "maplibre-gl"
import { useEffect } from "react"

import { useMap } from "./map.context"
import useLocationHistory from "./use-location-history"
import useNightsLocations from "./use-nights-locations"

const addRoute = (map: Map, routeData: Feature<LineString, GeoJsonProperties>, nights: FeatureCollection) => {
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
        8,
        ["boolean", ["feature-state", "open"], false],
        8,
        5,
      ],
      "circle-color": "#84cc16",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 2,
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
    const date = new Date(timestamp)
    const dateFormatted = Intl.DateTimeFormat("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(date)

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
    }

    map.setFeatureState({ source: "nights", id: clickedFeature.id }, { open: true })
    new Popup({ closeButton: false })
      .setLngLat([coordinates[0], coordinates[1]])
      .setText(dateFormatted)
      .on("close", () => {
        map.setFeatureState({ source: "nights", id: clickedFeature.id }, { open: false })
      })
      .addTo(map)
  })
}

const PathLayer = () => {
  const map = useMap()
  const { data: locationHistory } = useLocationHistory()
  const { data: nightsLocations } = useNightsLocations()

  useEffect(() => {
    if (locationHistory && nightsLocations) {
      addRoute(map, locationHistory, nightsLocations)
    }
  }, [map, locationHistory])

  return <></>
}

export default PathLayer
