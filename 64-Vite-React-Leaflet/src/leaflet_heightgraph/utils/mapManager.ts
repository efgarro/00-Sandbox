import { select } from 'd3-selection'
import type { InternalState } from '../types'

export const markSegmentsOnMap = (
  state: InternalState,
  coords: any[],
  map: any,
  highlightStyle: Record<string, any>
): void => {
  if (!coords || !map) return

  removeMarkedSegmentsOnMap(state, map)

  if (coords.length > 1) {
    state.markedSegments = (window as any).L.featureGroup()
    for (let linePart of coords) {
      (window as any).L.polyline(linePart, {
        ...highlightStyle,
        interactive: false
      }).addTo(state.markedSegments)
    }
    state.markedSegments.addTo(map).bringToFront()
  } else {
    state.markedSegments = (window as any).L.polyline(coords, highlightStyle).addTo(map)
  }
}

export const removeMarkedSegmentsOnMap = (state: InternalState, map: any): void => {
  if (state.markedSegments && map) {
    map.removeLayer(state.markedSegments)
    state.markedSegments = null
  }
}

export const fitSection = (state: InternalState, map: any, index1: number, index2: number): void => {
  if (!map || !state.areasFlattened.length) return

  const start = Math.min(index1, index2)
  const end = Math.max(index1, index2)
  let ext

  if (start !== end) {
    ext = calculateFullExtent(state.areasFlattened.slice(start, end + 1))
  } else if (state.areasFlattened.length > 0) {
    ext = [state.areasFlattened[start].latlng, state.areasFlattened[end].latlng]
  }

  if (ext) map.fitBounds(ext)
}

export const showMapMarker = (
  elements: any,
  map: any,
  ll: any,
  height: number,
  type: string,
  dynamicBoxSize: (className: string) => [number, number]
): void => {
  if (!map) return

  const layerPoint = map.latLngToLayerPoint(ll)
  const normalizedY = layerPoint.y - 75

  if (!elements.mouseHeightFocus) {
    const svg = select('.leaflet-overlay-pane svg')
    const heightG = svg.append('g')

    elements.mouseHeightFocus = heightG
      .append('svg:line')
      .attr('class', 'height-focus line')
      .attr('x2', '0')
      .attr('y2', '0')
      .attr('x1', '0')
      .attr('y1', '0')

    elements.mouseHeightFocusLabel = heightG
      .append('g')
      .attr('class', 'height-focus label')

    elements.mouseHeightFocusLabelRect = elements.mouseHeightFocusLabel
      .append('rect')
      .attr('class', 'bBox')

    elements.mouseHeightFocusLabelTextElev = elements.mouseHeightFocusLabel
      .append('text')
      .attr('class', 'tspan')

    elements.mouseHeightFocusLabelTextType = elements.mouseHeightFocusLabel
      .append('text')
      .attr('class', 'tspan')

    elements.pointG = heightG.append('g').attr('class', 'height-focus circle')
    elements.pointG
      .append('svg:circle')
      .attr('r', 5)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('class', 'height-focus circle-lower')
  }

  elements.mouseHeightFocusLabel.style('display', 'block')
  elements.mouseHeightFocus
    .attr('x1', layerPoint.x)
    .attr('x2', layerPoint.x)
    .attr('y1', layerPoint.y)
    .attr('y2', normalizedY)
    .style('display', 'block')

  elements.pointG.attr('transform', `translate(${layerPoint.x},${layerPoint.y})`).style('display', 'block')

  elements.mouseHeightFocusLabelRect
    .attr('x', layerPoint.x + 3)
    .attr('y', normalizedY)
    .attr('class', 'bBox')

  elements.mouseHeightFocusLabelTextElev
    .attr('x', layerPoint.x + 5)
    .attr('y', normalizedY + 12)
    .text(height + ' m')
    .attr('class', 'tspan mouse-height-box-text')

  elements.mouseHeightFocusLabelTextType
    .attr('x', layerPoint.x + 5)
    .attr('y', normalizedY + 24)
    .text(type)
    .attr('class', 'tspan mouse-height-box-text')

  const [_, maxWidth] = dynamicBoxSize('text.tspan')
  const maxHeight = type === '' ? 12 + 6 : 2 * 12 + 6
  ;(window as any).d3.selectAll('.bBox')
    .attr('width', maxWidth + 10)
    .attr('height', maxHeight)
}