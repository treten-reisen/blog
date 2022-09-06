import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { GeoJSON } from "ol/format"
import { Stroke, Style } from "ol/style"
import useLocationHistory from "../../hooks/use-location-history"
import { useEffect, useRef } from "react"
import { useMap } from "./map.context"
import { asColorLike } from "ol/colorlike"

export const usePathLayer = (backendUrl: string) => {
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
  const { data } = useLocationHistory(backendUrl)

  useEffect(() => {
    if (data) {
      const feature = new GeoJSON({
        featureProjection: "EPSG:3857",
      }).readFeature(data)

      const vectorSource = new VectorSource({
        features: [feature],
      })

      vectorLayer.current.setSource(vectorSource)
      map.getView().fit(vectorSource.getExtent())
    }
  }, [data])

  useEffect(() => {
    map.addLayer(vectorLayer.current)
  }, [map, vectorLayer])
}
