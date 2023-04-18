import type { Position } from "geojson"
import { useEffect, useRef, useState } from "react"

import Popup from "../popup"

import Marker from "./marker"
import useNightsLocations from "./use-nights-locations"

import "./nights-markers.css"

type NightMarkerProps = {
  timestamp: string
  position: Position
}

const determineScreenPosition = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return [rect.left + rect.width / 2, rect.top + rect.height / 2] as const
}

const NightMarker = ({ timestamp, position }: NightMarkerProps) => {
  const markerRef = useRef<HTMLDivElement>(null)

  const [screenPosition, setScreenPosition] = useState<readonly [number, number] | undefined>()

  const handleMouseEnter = () => {
    if (!markerRef.current) return
    setScreenPosition(determineScreenPosition(markerRef.current))
  }

  const handleMouseLeave = () => {
    setScreenPosition(undefined)
  }

  const listenerRef = useRef(() => {
    setScreenPosition(curr => {
      if (!markerRef.current) return
      const screenPos = determineScreenPosition(markerRef.current)
      if (!curr) return undefined
      return screenPos
    })
  })

  useEffect(() => {
    if (screenPosition) {
      document.body.addEventListener("mousemove", listenerRef.current)
    } else {
      document.body.removeEventListener("mousemove", listenerRef.current)
    }
    return () => {
      document.body.removeEventListener("mousemove", listenerRef.current)
    }
  })

  return (
    <>
      <Marker position={position}>
        <div
          ref={markerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="h-3 w-3 rounded-full border-2 border-gray-50 bg-lime-500 hover:h-5 hover:w-5"
        ></div>
      </Marker>
      {screenPosition && (
        <Popup x={screenPosition[0]} y={screenPosition[1]}>
          <div className="relative">
            <div className="absolute bottom-0 left-0 mb-3 -translate-x-1/2 whitespace-nowrap rounded-sm border border-lime-600 bg-gray-50 p-2 shadow">
              {new Intl.DateTimeFormat("de-DE", { year: "numeric", month: "long", day: "numeric" }).format(
                new Date(timestamp)
              )}
            </div>
          </div>
        </Popup>
      )}
    </>
  )
}

const NightsMarkers = () => {
  const { data: nightsLocations } = useNightsLocations()

  return (
    <>
      {nightsLocations?.features.map(feature => (
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
