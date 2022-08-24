import * as d3 from "d3"
import { useRef } from "react"
import { feature } from "topojson-client"
// eslint-disable-next-line import/no-unresolved
import { Topology } from "topojson-specification"
import { theme } from "twin.macro"
import worldjson from "world-atlas/countries-110m.json"

import { useSize } from "../hooks/use-size"

const worldtopo: Topology = worldjson as any

const Map = () => {
  const svgRef = useRef<HTMLDivElement>(null)
  const size = useSize(svgRef)

  const link: GeoJSON.GeoJSON = {
    type: "LineString",
    coordinates: [
      [8.0471788, 52.2799112],
      [14.2681244, 40.8517746],
      [36, 39],
      [43.97827148, 42.23906313],
      [56.28295898, 27.23928647],
      [55.41503906, 25.3651206],
      [58.359375, 23.58154083],
      [73.21289063, 17.7700123],
    ],
  }

  const start: GeoJSON.GeoJSON = {
    type: "Point",
    coordinates: [8.0471788, 52.2799112],
  }

  const end: GeoJSON.GeoJSON = {
    type: "Point",
    coordinates: [73.21289063, 17.7700123],
  }

  const test: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      { type: "Feature", geometry: link, properties: {} },
      { type: "Feature", geometry: start, properties: { label: "Osnabrück" } },
      { type: "Feature", geometry: end, properties: { label: "Mumbai" } },
    ],
  }

  const projection = d3.geoMercator().fitExtent(
    [
      [20, 20],
      [size[0] - 40, size[1] - 40],
    ],
    link
  )

  const geoGenerator = d3.geoPath().projection(projection)

  const geojson = feature(
    worldtopo,
    worldtopo.objects.countries
  ) as GeoJSON.FeatureCollection<GeoJSON.GeometryObject, any>

  const features = geojson.features.map(function (f) {
    const p = f.properties

    return (
      <path
        d={geoGenerator(f) || ""}
        style={{
          fill: theme("colors.gray.300"),
          stroke: theme("colors.gray.50"),
        }}
        key={p?.name}
      />
    )
  })

  return (
    <div tw="w-full h-96" ref={svgRef}>
      <svg tw="w-full h-full">
        <g className="map">{features}</g>
        <g className="route">
          {test.features.map((f, i) => {
            const center = geoGenerator.centroid(f.geometry)
            return (
              <>
                {f.properties?.label ? (
                  <text
                    style={{
                      textTransform: "uppercase",
                      fill: theme("colors.gray.900"),
                      transform: `translate(${center[0]}px, ${center[1]}px)`,
                    }}
                    x="10px"
                    dominantBaseline="middle"
                  >
                    {f.properties.label}
                  </text>
                ) : null}
                <path
                  d={geoGenerator(f) || ""}
                  style={{
                    fill: "none",
                    stroke: theme("colors.lime.500"),
                    strokeWidth: "5",
                    strokeLinejoin: "round",
                    strokeLinecap: "round",
                  }}
                  key={i}
                />
              </>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default Map
