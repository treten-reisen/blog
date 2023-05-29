import type { Feature, FeatureCollection, Point } from "geojson"

import type { StrapiArticleListItem } from "../../data/get-article-list"

import ArticleMarkers from "./article-markers"
import AvatarMarker from "./avatar-marker"
import { MapProvider } from "./map.context"
import PathLayer from "./path-layer"
import useLatestLocation from "./use-latest-location"

export type MapProps = {
  avatarUrl: string
  center: Feature<Point>
  hideControls?: boolean
  articles?: FeatureCollection<
    Point,
    {
      article: StrapiArticleListItem
      thumbnailUrl: string
      blurhash: {
        width: number
        height: number
        blurhash: string
      }
    }
  >
}

const Map = ({ avatarUrl, center, hideControls = false, articles }: MapProps) => {
  const { data: latestLocation } = useLatestLocation()

  const position = latestLocation?.geometry.coordinates

  return (
    <MapProvider center={position || center.geometry.coordinates} hideControls={hideControls}>
      <PathLayer />
      {articles && <ArticleMarkers articles={articles} />}
      {position && <AvatarMarker avatarUrl={avatarUrl} position={position} />}
    </MapProvider>
  )
}

export default Map
