import type { Position } from "geojson"
import { AttributionControl, Map, NavigationControl } from "maplibre-gl"
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react"

export type MapContext = {
  map?: Map
}

const mapContext = createContext<MapContext>({
  map: undefined,
})

export type MapContextProps = {
  apiKey: string
  center?: Position
  hideControls?: boolean
}
export const MapProvider = ({ children, center, apiKey, hideControls = false }: PropsWithChildren<MapContextProps>) => {
  const elementRef = useRef<HTMLDivElement>(null)

  const [map, setMap] = useState<Map>()

  const navigationControlRef = useRef<NavigationControl>(new NavigationControl({}))

  useEffect(() => {
    if (map || !elementRef.current) return
    const createdMap = new Map({
      container: elementRef.current,
      center: center ? [center[0], center[1]] : [0, 0],
      zoom: 10,
      style: `https://api.maptiler.com/maps/topo/style.json?key=${apiKey}`,
      attributionControl: false,
    })
    createdMap.on("load", () => setMap(createdMap))
    createdMap.addControl(new AttributionControl(), "bottom-left")
  })

  useEffect(() => {
    if (!center || !map) return
    map.setCenter([center[0], center[1]])
  }, [center, map])

  useEffect(() => {
    if (!map) return
    if (hideControls) {
      map.hasControl(navigationControlRef.current) && map.removeControl(navigationControlRef.current)
    } else {
      map.hasControl(navigationControlRef.current) || map.addControl(navigationControlRef.current)
    }
  }, [hideControls, map])

  return (
    <>
      <div className="w-full h-full" ref={elementRef} />
      <mapContext.Provider
        value={{
          map,
        }}
      >
        {map && children}
      </mapContext.Provider>
    </>
  )
}

export const useMap = () => {
  const { map } = useContext(mapContext)
  if (!map) throw Error("Map not yet initialized. Maybe you forgot to wrap with MapProvider?")
  return map
}
