import { asColorLike } from "ol/colorlike"
import { GeoJSON } from "ol/format"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Stroke, Style } from "ol/style"
import { useEffect, useRef } from "react"

import useLocationHistory from "../../hooks/use-location-history"

import { useMap } from "./map.context"

export type PathLayerProps = {
  backendUrl: string
}

const PathLayer = ({ backendUrl }: PathLayerProps) => {
  const map = useMap()
  const vectorLayer = useRef(
    new VectorLayer({
      style: () =>
        new Style({
          stroke: new Stroke({ color: asColorLike("#84CC16"), width: 2 }),
        }),
      zIndex: 1,
    })
  )
  const { data: locationHistory } = useLocationHistory(backendUrl)

  useEffect(() => {
    if (locationHistory) {
      const feature = new GeoJSON({
        featureProjection: "EPSG:3857",
      }).readFeature(locationHistory)

      const vectorSource = new VectorSource({
        features: [feature],
      })

      vectorLayer.current.setSource(vectorSource)
    }
  }, [locationHistory])

  useEffect(() => {
    map.addLayer(vectorLayer.current)
  }, [map, vectorLayer])

  return <></>
}

export default PathLayer
