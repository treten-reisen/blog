import * as dateFns from "date-fns"
import type { Feature, FeatureCollection, Point } from "geojson"
import { useState } from "react"

import type { StrapiArticleListItem } from "../../data/get-article-list"
import LazyImage from "../lazy-image"

import MapPopup from "./map-popup"
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
            className="h-12 w-12 overflow-hidden rounded-full border-2 border-gray-50 shadow-lg"
            style={{ backgroundImage: `url(${articleFeature.properties.thumbnailUrl})` }}
            aria-label={articleFeature.properties.article.attributes.title}
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
            href={`/articles/${clickedArticle.properties.article.attributes.slug}`}
            className="flex flex-col space-y-2"
          >
            <header className="flex flex-col space-y-2">
              <div className="h-32">
                <LazyImage
                  blurhashConfig={clickedArticle.properties.blurhash}
                  src={clickedArticle.properties.article.attributes.image.htmlImage.src || undefined}
                  alt={clickedArticle.properties.article.attributes.image.htmlImage.alt || undefined}
                  loading="lazy"
                />
              </div>

              <h2 className="font-sans text-base font-bold tracking-tight text-gray-700">
                {clickedArticle.properties.article.attributes.title}
              </h2>
            </header>
            <section className="font-sans tracking-tight text-gray-600">
              {clickedArticle.properties.article.attributes.summary}
            </section>
            <footer className="self-end font-sans tracking-tight text-gray-500">
              {dateFns.intlFormat(
                clickedArticle.properties.article.attributes.createdAt,
                { year: "numeric", month: "long", day: "numeric" },
                { locale: "de" }
              )}
            </footer>
          </a>
        </MapPopup>
      )}
    </>
  )
}

export default ArticleMarkers
