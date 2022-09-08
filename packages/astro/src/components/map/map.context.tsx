import { Map, View } from "ol"
import { Control, defaults } from "ol/control"
import type { Coordinate } from "ol/coordinate"
import { createContext, PropsWithChildren, useContext, useEffect } from "react"

const map = new Map({
  view: new View({
    center: [0, 0],
    zoom: 10,
  }),
  controls: defaults({ attribution: true }),
})

export type MapContext = {
  map: Map
}

const mapContext = createContext({
  map: map,
})

export type MapContextProps = {
  center?: Coordinate
  controls?: Control[]
}
export const MapProvider = ({ children, center, controls }: PropsWithChildren<MapContextProps>) => {
  useEffect(() => {
    center && map.getView().setCenter(center)
  }, [center])

  useEffect(() => {
    if (controls) {
      map.getControls().forEach(c => map.removeControl(c))
      controls.forEach(c => map.addControl(c))
    }
  }, [center])

  return (
    <>
      <div
        className="w-full h-full"
        ref={el => {
          el && map.setTarget(el)
        }}
      />
      <mapContext.Provider value={{ map }}>{children}</mapContext.Provider>
    </>
  )
}

export const useMap = () => useContext(mapContext).map
