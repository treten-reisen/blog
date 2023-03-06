import type { Feature, Point, Position } from "geojson"
import type { Map } from "maplibre-gl"
import { useEffect } from "react"

import { useMap } from "./map.context"

export type LatestLocationOverlayProps = {
  avatarUrl: string
  position: Position
}

const addAvatar = (map: Map, avatarUrl: string, position: Feature<Point>) => {
  map.loadImage(avatarUrl, function (error, image) {
    if (error) throw error
    if (!image) throw new Error("Image is not defined!")
    map.addImage("avatar", image)
    map.addSource("point", {
      type: "geojson",
      data: position,
    })
    map.addLayer({
      id: "point",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "avatar",
        "icon-size": 0.5,
      },
    })
  })
}

const AvatarOverlay = ({ avatarUrl, position }: LatestLocationOverlayProps) => {
  const map = useMap()

  useEffect(() => {
    const feature: Feature<Point> = {
      type: "Feature",
      geometry: { type: "Point", coordinates: position },
      properties: {},
    }
    addAvatar(map, avatarUrl, feature)
  }, [map])
  return <></>
}

export default AvatarOverlay
