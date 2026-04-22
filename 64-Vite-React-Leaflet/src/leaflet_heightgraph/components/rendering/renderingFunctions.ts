import { select, selectAll } from 'd3-selection'
import { drag } from 'd3-drag'
import { curveBasis, curveLinear, line, area as d3Area, symbol, symbolTriangle } from 'd3-shape'
import { axisBottom, axisLeft } from 'd3-axis'
import { format } from 'd3-format'
import type { InternalState, D3Elements } from '../../types'

/**
 * Appends grid lines and axes to the chart
 */
export const appendGrid = (state: InternalState, elements: D3Elements): void => {
  const svg = elements.svg
  if (!svg) return

  svg
    .append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${state.svgHeight})`)
    .call(
      axisBottom(state.x)
        .tickSize(-state.svgHeight, 0, 0)
        .ticks(Math.round(state.svgWidth / 75))
        .tickFormat('')
    )

  svg
    .append('g')
    .attr('class', 'grid')
    .call(
      axisLeft(state.y)
        .tickSize(-state.svgWidth, 0, 0)
        .ticks(Math.round(state.svgHeight / 30))
        .tickFormat('')
    )

  svg
    .append('g')
    .attr('transform', `translate(0,${state.svgHeight})`)
    .attr('class', 'x axis')
    .call(state.xAxis)

  svg
    .append('g')
    .attr('transform', 'translate(-2,0)')
    .attr('class', 'y axis')
    .call(state.yAxis)
}

/**
 * Appends area paths to the chart
 */
export const appendAreas = (
  state: InternalState,
  elements: D3Elements,
  block: any,
  idx: number,
  eleIdx: number,
  graphStyle: Record<string, any>
): void => {
  const svg = elements.svg
  if (!svg) return

  const color = state.categories[idx].attributes[eleIdx].color
  const area = d3Area()
    .x((d: any) => state.x(d.position))
    .y0(state.svgHeight)
    .y1((d: any) => state.y(d.altitude))
    .curve(curveLinear)

  svg
    .append('path')
    .attr('class', 'area')
    .datum(block)
    .attr('d', area)
    .attr('stroke', color)
    .styles(graphStyle)
    .style('fill', color)
    .style('pointer-events', 'none')
}

/**
 * Creates border top line (elevation profile outline)
 */
export const createBorderTopLine = (state: InternalState, elements: D3Elements): void => {
  const svg = elements.svg
  if (!svg || !state.areasFlattened.length) return

  const borderTopLine = line()
    .x((d: any) => state.x(d.position))
    .y((d: any) => state.y(d.altitude))
    .curve(curveBasis)

  svg
    .append('svg:path')
    .attr('d', borderTopLine(state.areasFlattened))
    .attr('class', 'border-top')
}

/**
 * Creates draggable horizontal line for elevation filtering
 */
export const createHorizontalLine = (
  state: InternalState,
  elements: D3Elements,
  findCoordsForY: (y: number) => any[],
  removeMarkedSegmentsOnMap: () => void,
  markSegmentsOnMap: (coords: any[]) => void
): void => {
  const svg = elements.svg
  if (!svg) return

  elements.horizontalLine = svg
    .append('line')
    .attr('class', 'horizontalLine')
    .attr('x1', 0)
    .attr('x2', state.width - state.margin.left - state.margin.right)
    .attr('y1', state.y(state.elevationBounds.min))
    .attr('y2', state.y(state.elevationBounds.min))
    .style('stroke', 'black')

  elements.elevationValueText = svg
    .append('text')
    .attr('class', 'horizontalLineText')
    .attr('x', state.width - state.margin.left - state.margin.right - 20)
    .attr('y', state.y(state.elevationBounds.min) - 10)
    .attr('fill', 'black')

  const jsonTriangle = [
    {
      x: state.width - state.margin.left - state.margin.right + 7,
      y: state.y(state.elevationBounds.min),
      color: 'black',
      type: symbolTriangle,
      angle: -90,
      size: 100
    }
  ]

  const dragstart = () => {
    select(elements.horizontalLine).raise().classed('active', true)
  }

  const dragged = (e: any) => {
    const maxY = state.svgHeight
    const event = e.sourceEvent
    const container = document.querySelector('.heightgraph-container')
    if (!container) return

    const rect = container.getBoundingClientRect()
    let eventY = event.clientY - rect.top - state.margin.top

    select(e.currentTarget)
      .attr('transform', (d: any) => {
        const clampedY = eventY < 0 ? 0 : eventY > maxY ? maxY : eventY
        return `translate(${d.x},${clampedY}) rotate(${d.angle})`
      })

    select(elements.horizontalLine)
      .attr('y1', eventY < 0 ? 0 : eventY > maxY ? maxY : eventY)
      .attr('y2', eventY < 0 ? 0 : eventY > maxY ? maxY : eventY)

    if (eventY >= maxY) {
      state.highlightedCoords = []
    } else {
      state.highlightedCoords = findCoordsForY(eventY)
    }

    select(elements.elevationValueText)
      .attr('y', eventY <= 10 ? 0 : eventY > maxY ? maxY - 10 : eventY - 10)
      .text(
        format('.0f')(state.y.invert(eventY < 0 ? 0 : eventY > maxY ? maxY : eventY)) + ' m'
      )

    removeMarkedSegmentsOnMap()
    markSegmentsOnMap(state.highlightedCoords)
  }

  const dragend = () => {
    select(elements.horizontalLine).classed('active', false)
    removeMarkedSegmentsOnMap()
    markSegmentsOnMap(state.highlightedCoords)
  }

  svg
    .selectAll('.horizontal-symbol')
    .data(jsonTriangle)
    .enter()
    .append('path')
    .attr('class', 'lineSelection')
    .attr('d', (d: any) => symbol().type(d.type).size(d.size)())
    .attr('transform', (d: any) => `translate(${d.x},${d.y}) rotate(${d.angle})`)
    .style('fill', (d: any) => d.color)
    .call(
      drag()
        .on('start', dragstart)
        .on('drag', dragged)
        .on('end', dragend)
    )
}

/**
 * Appends interactive background for mouse events
 */
export const appendBackground = (
  state: InternalState,
  elements: D3Elements,
  mousemoveHandler: (event: any) => void,
  mouseoutHandler: () => void,
  dragStartHandler: (event: any) => void,
  dragHandler: (event: any) => void,
  dragEndHandler: () => void
): void => {
  const svg = elements.svg
  if (!svg) return

  elements.background = svg
    .append('rect')
    .attr('width', state.svgWidth)
    .attr('height', state.svgHeight)
    .style('fill', 'none')
    .style('stroke', 'none')
    .style('pointer-events', 'all')
    .on('mousemove', mousemoveHandler)
    .on('mouseout', mouseoutHandler)
    .on('mousedown', dragStartHandler)
    .on('mousemove', dragHandler)

  if (typeof window !== 'undefined') {
    window.addEventListener('mouseup', dragEndHandler)
  }
}

/**
 * Creates selection box for switching between categories
 */
export const createSelectionBox = (
  state: InternalState,
  elements: D3Elements,
  selectedIdx: number,
  onArrowRight: () => void,
  onArrowLeft: () => void,
  onChooseSelection: (idx: number) => void
): void => {
  const svg = elements.svg
  if (!svg) return

  const width = state.width - state.margin.right
  const height = state.height - state.margin.bottom
  const verticalItemPosition = height + state.margin.bottom / 2 + 6

  const jsonTriangles = [
    {
      x: width - 25,
      y: verticalItemPosition + 3,
      color: '#000',
      type: symbolTriangle,
      id: 'leftArrowSelection',
      angle: 0
    },
    {
      x: width - 10,
      y: verticalItemPosition,
      color: '#000',
      type: symbolTriangle,
      id: 'rightArrowSelection',
      angle: 180
    }
  ]

  let selectionSign = svg.selectAll('.select-symbol').data(jsonTriangles)
  selectionSign.remove()
  selectionSign = svg.selectAll('.select-symbol').data(jsonTriangles)

  if (state.categories.length > 1) {
    selectionSign
      .enter()
      .append('path')
      .merge(selectionSign)
      .attr('class', 'select-symbol')
      .attr('d', (d: any) => symbol().type(d.type).size(d.size)())
      .attr('transform', (d: any) => `translate(${d.x},${d.y}) rotate(${d.angle})`)
      .attr('id', (d: any) => d.id)
      .style('fill', (d: any) => d.color)
      .on('mousedown', (event: any, d: any) => {
        if (d.id === 'rightArrowSelection') onArrowRight()
        if (d.id === 'leftArrowSelection') onArrowLeft()
      })
  }

  onChooseSelection(selectedIdx)
}

/**
 * Creates legend showing attribute types and colors
 */
export const createLegend = (
  state: InternalState,
  elements: D3Elements,
  selectedIdx: number,
  getTranslation: (key: string) => string
): void => {
  const svg = elements.svg
  if (!svg || !state.categories.length) return

  const legendData = []
  for (let item in state.categories[selectedIdx].legend) {
    legendData.push(state.categories[selectedIdx].legend[item])
  }

  const height = state.height - state.margin.bottom
  const verticalItemPosition = height + state.margin.bottom / 2
  const leg = [{ text: getTranslation('legend') }]
  const legendRectSize = 7
  const legendSpacing = 7

  const legend = svg
    .selectAll('.hlegend-hover')
    .data(legendData)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .style('display', 'none')
    .attr('transform', (d: any, i: number) => {
      const h = legendRectSize + legendSpacing
      const offset = h * 2
      const horizontal = legendRectSize - 15
      const vertical = i * h - offset
      return `translate(${horizontal},${vertical})`
    })

  const legendRect = legend
    .append('rect')
    .attr('class', 'legend-rect')
    .attr('x', 15)
    .attr('y', 6 * 6)
    .attr('width', 6)
    .attr('height', 6)

  legendRect
    .style('stroke', 'black')
    .style('fill', (d: any) => d.color)

  legend
    .append('text')
    .attr('class', 'legend-text')
    .attr('x', 30)
    .attr('y', 6 * 7)
    .text((d: any) => d.text)

  const legendHover = svg
    .selectAll('.legend-hover')
    .data(leg)
    .enter()
    .append('g')
    .attr('class', 'legend-hover')

  legendHover
    .append('text')
    .attr('x', 15)
    .attr('y', verticalItemPosition)
    .attr('text-anchor', 'start')
    .text((d: any) => d.text)
    .on('mouseover', () => {
      selectAll('.legend').style('display', 'block')
    })
    .on('mouseleave', () => {
      if (!state.showLegend) {
        selectAll('.legend').style('display', 'none')
      }
    })
    .on('click', () => {
      state.showLegend = !state.showLegend
    })
}

/**
 * Removes all chart elements
 */
export const removeChart = (elements: D3Elements): void => {
  const svg = elements.svg
  if (!svg) return

  svg.selectAll('path.area').remove()
  svg.selectAll('path.border-top').remove()
  svg.selectAll('.legend').remove()
  svg.selectAll('.lineSelection').remove()
  svg.selectAll('.horizontalLine').remove()
  svg.selectAll('.horizontalLineText').remove()
}