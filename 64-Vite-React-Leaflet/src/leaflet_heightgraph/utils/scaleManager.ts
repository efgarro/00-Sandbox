import { scaleLinear } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import { format } from 'd3-format'
import type { InternalState } from '../types'

export const appendScales = (
  state: InternalState,
  xTicks?: number,
  yTicks?: number
): void => {
  const shortDist = Boolean(state.totalDistance <= 10)

  state.x = scaleLinear().range([0, state.svgWidth])
  state.y = scaleLinear().range([state.svgHeight, 0])

  state.x.domain([0, state.totalDistance])
  state.y.domain([state.elevationBounds.min, state.elevationBounds.max])

  state.xAxis = axisBottom().scale(state.x)
  if (shortDist) {
    state.xAxis.tickFormat((d: any) => format('.2f')(d) + ' km')
  } else {
    state.xAxis.tickFormat((d: any) => format('.0f')(d) + ' km')
  }
  state.xAxis.ticks(xTicks ? Math.pow(2, xTicks) : Math.round(state.svgWidth / 75), 's')

  state.yAxis = axisLeft()
    .scale(state.y)
    .tickFormat((d: any) => d + ' m')
  state.yAxis.ticks(yTicks ? Math.pow(2, yTicks) : Math.round(state.svgHeight / 30), 's')
}