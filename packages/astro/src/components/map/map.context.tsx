import { Map, View } from "ol"
import { defaults } from "ol/control"
import { createContext, PropsWithChildren, useContext } from "react"

const map = new Map({
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  controls: defaults({ attribution: true }),
})

export type MapContext = {
  map: Map
}

const mapContext = createContext({
  map: map,
})

export type MapContextProps = {}
export const MapProvider = ({
  children,
}: PropsWithChildren<MapContextProps>) => {
  return <mapContext.Provider value={{ map }}>{children}</mapContext.Provider>
}

export const useMap = () => useContext(mapContext).map
