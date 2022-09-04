import * as d3 from "d3"
import { Fragment, useRef } from "react"
import { feature } from "topojson-client"
// eslint-disable-next-line import/no-unresolved
import type { Topology } from "topojson-specification"
import worldjson from "world-atlas/countries-110m.json"
import useLocationHistory from "../../hooks/use-location-history"

import "./map.css"

import { useSize } from "../../hooks/use-size"

const worldtopo: Topology = worldjson as any

export type MapProps = {
  backendUrl: string
}

const Map = ({ backendUrl }: MapProps) => {
  const svgRef = useRef<HTMLDivElement>(null)
  const size = useSize(svgRef)

  const { data } = useLocationHistory(backendUrl)

  const start: GeoJSON.GeoJSON = {
    type: "Point",
    coordinates: [8.0471788, 52.2799112],
  }

  const end: GeoJSON.GeoJSON = {
    type: "Point",
    coordinates: [73.21289063, 17.7700123],
  }

  const test: GeoJSON.FeatureCollection | undefined = data && {
    type: "FeatureCollection",
    features: [data],
  }

  const projection =
    data &&
    d3.geoMercator().fitExtent(
      [
        [20, 20],
        [size[0] - 40, size[1] - 40],
      ],
      data
    )

  const geoGenerator = projection && d3.geoPath().projection(projection)

  const geojson = feature(
    worldtopo,
    worldtopo.objects.countries
  ) as GeoJSON.FeatureCollection<GeoJSON.GeometryObject, any>

  const features = geojson.features.map(function (f) {
    const p = f.properties

    return geoGenerator && <path d={geoGenerator(f) || ""} key={p?.name} />
  })

  return (
    <div className="w-full h-full" ref={svgRef}>
      <svg className="w-full h-full">
        <g className="map">{features}</g>
        <g className="route">
          {test &&
            geoGenerator &&
            test.features.map((f, i) => {
              const center = geoGenerator.centroid(f.geometry)
              return (
                <Fragment key={i}>
                  {f.properties?.label ? (
                    <text
                      style={{
                        transform: `translate(${center[0]}px, ${center[1]}px)`,
                      }}
                      x="10px"
                      dominantBaseline="middle"
                    >
                      {f.properties.label}
                    </text>
                  ) : null}
                  <path d={geoGenerator(f) || ""} key={i} />
                </Fragment>
              )
            })}
        </g>
      </svg>
    </div>
  )
}

export default Map
