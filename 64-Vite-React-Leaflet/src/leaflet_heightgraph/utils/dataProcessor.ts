import { scaleOrdinal } from 'd3-scale'
import { min as d3Min, max as d3Max } from 'd3-array'
import {
  schemeAccent,
  schemeDark2,
  schemeSet2,
  schemeCategory10,
  schemeSet3,
  schemePaired
} from 'd3-scale-chromatic'
import type { InternalState } from '../types'

const D3_COLOR_CATEGORICAL = [
  schemeAccent,
  schemeDark2,
  schemeSet2,
  schemeCategory10,
  schemeSet3,
  schemePaired
]

export const randomNumber = (max: number): number => {
  return Math.round(Math.random() * max)
}

export const prepareData = (
  state: InternalState,
  data: any[],
  mappings: Record<string, any> | undefined
): void => {
  state.coordinates = []
  state.elevations = []
  state.cumulatedDistances = [0]
  state.categories = []

  let colorScale
  if (mappings === undefined) {
    const randomNum = randomNumber(D3_COLOR_CATEGORICAL.length - 1)
    colorScale = scaleOrdinal(D3_COLOR_CATEGORICAL[randomNum])
  }

  for (let y = 0; y < data.length; y++) {
    let cumDistance = 0
    state.categories[y] = {
      info: {
        id: y,
        text: data[y].properties.label || data[y].properties.summary
      },
      distances: [],
      attributes: [],
      geometries: [],
      legend: {}
    }

    let cnt = 0
    const usedColors: Record<string, string> = {}
    const isMappingFunction =
      mappings !== undefined && typeof mappings[data[y].properties.summary] === 'function'

    for (let i = 0; i < data[y].features.length; i++) {
      const geometry: any[] = []
      const coordsLength = data[y].features[i].geometry.coordinates.length
      const attributeType = data[y].features[i].properties.attributeType

      let text: string, color: string
      if (mappings === undefined) {
        if (attributeType in usedColors) {
          text = attributeType
          color = usedColors[attributeType]
        } else {
          text = attributeType
          color = colorScale(i)
          usedColors[attributeType] = color
        }
      } else {
        if (isMappingFunction) {
          const result = mappings[data[y].properties.summary](attributeType)
          text = result.text
          color = result.color
        } else {
          text = mappings[data[y].properties.summary][attributeType].text
          color = mappings[data[y].properties.summary][attributeType].color
        }
      }

      const attribute = { type: attributeType, text, color }
      state.categories[y].attributes.push(attribute)

      if (!(attributeType in state.categories[y].legend)) {
        state.categories[y].legend[attributeType] = attribute
      }

      for (let j = 0; j < coordsLength; j++) {
        const ptA = new (window as any).L.LatLng(
          data[y].features[i].geometry.coordinates[j][1],
          data[y].features[i].geometry.coordinates[j][0]
        )
        const altitude = data[y].features[i].geometry.coordinates[j][2]

        if (j < coordsLength - 1) {
          const ptB = new (window as any).L.LatLng(
            data[y].features[i].geometry.coordinates[j + 1][1],
            data[y].features[i].geometry.coordinates[j + 1][0]
          )
          const ptDistance = ptA.distanceTo(ptB) / 1000
          cumDistance += ptDistance

          if (y === 0) {
            state.elevations.push(altitude)
            state.coordinates.push(ptA)
            state.cumulatedDistances.push(cumDistance)
          }
          cnt += 1
        } else if (j === coordsLength - 1 && i === data[y].features.length - 1) {
          if (y === 0) {
            state.elevations.push(altitude)
            state.coordinates.push(ptA)
          }
          cnt += 1
        }

        let position
        if (j === coordsLength - 1 && i < data[y].features.length - 1) {
          position = state.cumulatedDistances[cnt]
        } else {
          position = state.cumulatedDistances[cnt - 1]
        }

        geometry.push({
          altitude,
          position,
          x: ptA.lng,
          y: ptA.lat,
          latlng: ptA,
          type: text,
          areaIdx: i
        })
      }

      state.categories[y].distances.push(cumDistance)
      state.categories[y].geometries.push(geometry)
    }

    if (y === data.length - 1) {
      state.totalDistance = cumDistance
    }
  }
}

export const calculateElevationBounds = (state: InternalState): void => {
  const max = d3Max(state.elevations) || 0
  const min = d3Min(state.elevations) || 0
  const range = max - min

  state.elevationBounds = {
    min: range < 10 ? min - 10 : min - 0.1 * range,
    max: range < 10 ? max + 10 : max + 0.1 * range
  }
}