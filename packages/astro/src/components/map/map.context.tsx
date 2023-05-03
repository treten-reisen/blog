import type { Position } from "geojson"
import { AttributionControl, Map, NavigationControl } from "maplibre-gl"
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react"

import "maplibre-gl/dist/maplibre-gl.css"

export type MapContext = {
  map?: Map
}

const mapContext = createContext<MapContext>({
  map: undefined,
})

export type MapContextProps = {
  center?: Position
  hideControls?: boolean
}
export const MapProvider = ({ children, center, hideControls = false }: PropsWithChildren<MapContextProps>) => {
  const elementRef = useRef<HTMLDivElement>(null)

  const [isLoaded, setIsLoaded] = useState<boolean>()

  const navigationControlRef = useRef<NavigationControl>(new NavigationControl({}))
  const attributionControlRef = useRef(new AttributionControl({ compact: hideControls ? true : undefined }))
  const mapRef = useRef<Map>()

  useEffect(() => {
    if (mapRef.current || !elementRef.current) return
    const createdMap = new Map({
      container: elementRef.current,
      center: center ? [center[0], center[1]] : [0, 0],
      zoom: 10,
      style: `https://api.maptiler.com/maps/topo/style.json?key=${import.meta.env.PUBLIC_MAPTILER_API_KEY}`,
      attributionControl: false,
    })

    createdMap.on("load", () => {
      setIsLoaded(true)
      hideControls && attributionControlRef.current._container.querySelector("summary")?.click()
    })
    createdMap.addControl(attributionControlRef.current, "bottom-left")
    mapRef.current = createdMap
  })

  useEffect(() => {
    if (!center || !mapRef.current) return
    mapRef.current.setCenter([center[0], center[1]])
  }, [center])

  useEffect(() => {
    if (!mapRef.current) return
    if (hideControls) {
      mapRef.current.hasControl(navigationControlRef.current) &&
        mapRef.current.removeControl(navigationControlRef.current)
    } else {
      mapRef.current.hasControl(navigationControlRef.current) || mapRef.current.addControl(navigationControlRef.current)
    }
  }, [hideControls, mapRef])

  return (
    <>
      <div className="h-full w-full" ref={elementRef} />
      <mapContext.Provider
        value={{
          map: mapRef.current,
        }}
      >
        {isLoaded && children}
      </mapContext.Provider>
    </>
  )
}

export const useMap = () => {
  const { map } = useContext(mapContext)
  if (!map) throw Error("Map not yet initialized. Maybe you forgot to wrap with MapProvider?")
  return map
}
