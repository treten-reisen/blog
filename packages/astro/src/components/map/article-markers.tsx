import * as dateFns from "date-fns"
import type { Feature, FeatureCollection, Point } from "geojson"
import type { LngLatLike } from "maplibre-gl"
import { useState } from "react"

import type { StrapiArticleListItem } from "../../data/get-article-list"
import LazyImage from "../lazy-image"

import MapPopup from "./map-popup"
import { useMap } from "./map.context"
import Marker from "./marker"

export type ArticleMarkersProps = {
  articles: FeatureCollection<
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

const ArticleMarkers = ({ articles }: ArticleMarkersProps) => {
  const map = useMap()
  const [clickedArticle, setClickedArticle] = useState<
    Feature<
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
  >()
  return (
    <>
      {articles.features.map(articleFeature => (
        <Marker key={articleFeature.properties.article.id} position={articleFeature.geometry.coordinates}>
          <button
            className="h-12 w-12 overflow-hidden rounded-full border-2 border-gray-50 bg-center shadow-lg"
            style={{ backgroundImage: `url(${articleFeature.properties.thumbnailUrl})` }}
            aria-label={articleFeature.properties.article.title}
            onFocus={() => {
              const coords = [
                articleFeature.geometry.coordinates[0],
                articleFeature.geometry.coordinates[1],
              ] as LngLatLike
              if (!map.getBounds().contains(coords)) {
                map.panTo(coords)
              }
            }}
            onClickCapture={ev => {
              ev.stopPropagation()
              ev.preventDefault()
              setClickedArticle(article =>
                article?.properties.article.id === articleFeature.properties.article.id ? undefined : articleFeature
              )
            }}
          />
        </Marker>
      ))}
      {clickedArticle && (
        <MapPopup
          closeButton={true}
          position={clickedArticle.geometry.coordinates}
          closeOnClick={false}
          closeOnMove={false}
          onClose={() => {
            const closedId = clickedArticle.properties.article.id
            setClickedArticle(article => (article?.properties.article.id === closedId ? undefined : article))
          }}
        >
          <a
            href={`/articles/${clickedArticle.properties.article.slug}`}
            aria-label={`Gehe zu Artikel: "${clickedArticle.properties.article.title}"`}
            className="flex flex-col space-y-2"
            autoFocus
            onKeyDown={ev => {
              if (ev.key === "Escape") {
                setClickedArticle(undefined)
              }
            }}
          >
            <header className="flex flex-col space-y-2">
              <div className="h-32">
                <LazyImage
                  blurhashConfig={clickedArticle.properties.blurhash}
                  src={clickedArticle.properties.article.image.lg.htmlImage.src || undefined}
                  loading="lazy"
                  {...clickedArticle.properties.article.image.lg.htmlImage.attributes}
                />
              </div>

              <h2 className="font-sans text-base font-bold tracking-tight text-gray-700">
                {clickedArticle.properties.article.title}
              </h2>
            </header>
            <section className="font-sans tracking-tight text-gray-600">
              {clickedArticle.properties.article.summary}
            </section>
            <footer className="self-end font-sans tracking-tight text-gray-500">
              <time dateTime={dateFns.format(clickedArticle.properties.article.createdAt, "yyyy-MM-dd")}>
                {dateFns.intlFormat(
                  clickedArticle.properties.article.createdAt,
                  { year: "numeric", month: "long", day: "numeric" },
                  { locale: "de" }
                )}
              </time>
            </footer>
          </a>
        </MapPopup>
      )}
    </>
  )
}

export default ArticleMarkers
