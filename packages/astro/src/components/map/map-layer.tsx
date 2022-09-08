import { applyStyle } from "ol-mapbox-style"
import MVT from "ol/format/MVT"
import VectorTileLayer from "ol/layer/VectorTile"
import VectorTileSource from "ol/source/VectorTile"
import { useEffect, useRef, useState } from "react"
import { useMap } from "./map.context"

export type MapLayerProps = {
  apiKey: string
}

const MapLayer = ({ apiKey }: MapLayerProps) => {
  const map = useMap()

  const url =
    window.devicePixelRatio > 1
      ? `https://maps.geoapify.com/v1/tile/positron/{z}/{x}/{y}@2x.png?apiKey=${apiKey}`
      : `https://maps.geoapify.com/v1/tile/positron/{z}/{x}/{y}.png?apiKey=${apiKey}`

  const tileLayer = useRef(
    new VectorTileLayer({
      declutter: true,
      source: new VectorTileSource({
        format: new MVT(),
        url,
      }),
    })
  )

  useEffect(() => {
    applyStyle(
      tileLayer.current,
      `https://maps.geoapify.com/v1/styles/positron/style.json?apiKey=${apiKey}`
    ).then(() => {
      map.addLayer(tileLayer.current)
    })
  }, [tileLayer])

  return <></>
}

export default MapLayer
