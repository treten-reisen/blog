import type { Feature, FeatureCollection, Point } from "geojson"

import type { StrapiArticleListItem } from "../../data/get-article-list"
import type { GetLiveLocationResponse } from "../../data/get-live-location"
import type { GetLocationHistoryResponse } from "../../data/get-location-history"
import type { GetNightsLocationsResponse } from "../../data/get-nights-locations"

import ArticleMarkers from "./article-markers"
import AvatarMarker from "./avatar-marker"
import { MapProvider } from "./map.context"
import PathLayer from "./path-layer"

import "./map.css"

export type MapProps = {
  avatarUrl: string
  center?: Feature<Point>
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
  latestLocation: GetLiveLocationResponse
  locationHistory: GetLocationHistoryResponse
  nightLocations: GetNightsLocationsResponse
}

const Map = ({
  avatarUrl,
  center,
  hideControls = false,
  articles,
  latestLocation,
  locationHistory,
  nightLocations,
}: MapProps) => {
  const position = latestLocation?.geometry.coordinates

  return (
    <MapProvider
      center={position || (center && center.geometry.coordinates) || latestLocation.geometry.coordinates}
      hideControls={hideControls}
    >
      <PathLayer nightsLocations={nightLocations} locationHistory={locationHistory} />
      {articles && <ArticleMarkers articles={articles} />}
      {position && <AvatarMarker avatarUrl={avatarUrl} position={position} />}
    </MapProvider>
  )
}

export default Map
