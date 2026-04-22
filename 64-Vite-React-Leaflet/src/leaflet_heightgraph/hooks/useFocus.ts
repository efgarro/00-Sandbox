import { useCallback } from 'react'
import { select, selectAll } from 'd3-selection'
import type { InternalState, D3Elements } from '../types'

export const useFocus = (
  state: React.MutableRefObject<InternalState>,
  elements: React.MutableRefObject<D3Elements>,
  getTranslation: (key: string) => string,
  dynamicBoxSize: (className: string) => [number, number]
) => {
  const createFocus = useCallback(() => {
    const svg = elements.current.svg
    if (!svg) return

    const boxPosition = state.current.elevationBounds.min
    const textDistance = 15

    if (elements.current.focus) {
      elements.current.focus.remove()
      elements.current.focusLineGroup?.remove()
    }

    elements.current.focus = svg.append('g').attr('class', 'focusbox')

    elements.current.focusRect = elements.current.focus
      .append('rect')
      .attr('x', 3)
      .attr('y', -state.current.y(boxPosition))
      .attr('display', 'none')

    elements.current.focusDistance = elements.current.focus
      .append('text')
      .attr('x', 7)
      .attr('y', -state.current.y(boxPosition) + textDistance)
      .attr('id', 'heightgraph.distance')
      .text(getTranslation('distance') + ':')

    elements.current.focusHeight = elements.current.focus
      .append('text')
      .attr('x', 7)
      .attr('y', -state.current.y(boxPosition) + 2 * textDistance)
      .attr('id', 'heightgraph.height')
      .text(getTranslation('elevation') + ':')

    elements.current.focusBlockDistance = elements.current.focus
      .append('text')
      .attr('x', 7)
      .attr('y', -state.current.y(boxPosition) + 3 * textDistance)
      .attr('id', 'heightgraph.blockdistance')
      .text(getTranslation('segment_length') + ':')

    elements.current.focusType = elements.current.focus
      .append('text')
      .attr('x', 7)
      .attr('y', -state.current.y(boxPosition) + 4 * textDistance)
      .attr('id', 'heightgraph.type')
      .text(getTranslation('type') + ':')

    elements.current.areaTspan = elements.current.focusBlockDistance
      .append('tspan')
      .attr('class', 'tspan')

    elements.current.typeTspan = elements.current.focusType
      .append('tspan')
      .attr('class', 'tspan')

    const height = dynamicBoxSize('.focusbox text')[0]
    selectAll('.focusbox rect')
      .attr('height', height * textDistance + textDistance / 2)
      .attr('display', 'block')

    elements.current.focusLineGroup = svg.append('g').attr('class', 'focusLine')

    elements.current.focusLine = elements.current.focusLineGroup
      .append('line')
      .attr('y1', 0)
      .attr('y2', state.current.y(state.current.elevationBounds.min))

    elements.current.distTspan = elements.current.focusDistance
      .append('tspan')
      .attr('class', 'tspan')

    elements.current.altTspan = elements.current.focusHeight
      .append('tspan')
      .attr('class', 'tspan')
  }, [state, elements, getTranslation, dynamicBoxSize])

  const updateFocus = useCallback(
    (item: any, showMapMarker: boolean = true, showMapMarkerFunc?: (ll: any, alt: number, type: string) => void) => {
      const state_ref = state.current
      const elem = elements.current
      if (!state_ref.categories.length || !state_ref.x || !state_ref.y) return

      const alt = item.altitude
      const dist = item.position
      const ll = item.latlng
      const areaIdx = item.areaIdx
      const type = item.type

      const boxWidth = dynamicBoxSize('.focusbox text')[1] + 10

      let areaLength
      if (areaIdx === 0) {
        areaLength = state_ref.categories[state_ref.selectedAttributeIdx]?.distances[areaIdx] || 0
      } else {
        areaLength =
          (state_ref.categories[state_ref.selectedAttributeIdx]?.distances[areaIdx] || 0) -
          (state_ref.categories[state_ref.selectedAttributeIdx]?.distances[areaIdx - 1] || 0)
      }

      if (elem.distTspan) elem.distTspan.text(' ' + dist.toFixed(1) + ' km')
      if (elem.altTspan) elem.altTspan.text(' ' + alt + ' m')
      if (elem.areaTspan) elem.areaTspan.text(' ' + areaLength.toFixed(1) + ' km')
      if (elem.typeTspan) elem.typeTspan.text(' ' + type)

      if (elem.focusRect) elem.focusRect.attr('width', boxWidth)

      if (elem.focusLine) {
        elem.focusLine
          .style('display', 'block')
          .attr('x1', state_ref.x(dist))
          .attr('x2', state_ref.x(dist))
      }

      const xPositionBox = state_ref.x(dist) - (boxWidth + 5)
      const totalWidth = state_ref.width - state_ref.margin.left - state_ref.margin.right

      if (elem.focus) {
        if (state_ref.x(dist) + boxWidth < totalWidth) {
          elem.focus
            .style('display', 'initial')
            .attr('transform', `translate(${state_ref.x(dist)},${state_ref.y(state_ref.elevationBounds.min)})`)
        } else {
          elem.focus
            .style('display', 'initial')
            .attr(
              'transform',
              `translate(${xPositionBox},${state_ref.y(state_ref.elevationBounds.min)})`
            )
        }
      }

      if (showMapMarker && showMapMarkerFunc) {
        showMapMarkerFunc(ll, alt, type)
      }
    },
    [state, elements, dynamicBoxSize]
  )

  return { createFocus, updateFocus }
}