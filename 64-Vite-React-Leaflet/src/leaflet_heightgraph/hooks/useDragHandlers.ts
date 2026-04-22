import { useCallback } from 'react'
import type { InternalState } from '../types'

export const useDragHandlers = (
  state: React.MutableRefObject<InternalState>,
  containerRef: React.RefObject<HTMLDivElement>,
  svgRef: React.RefObject<SVGSVGElement>,
  findItemForX: (x: number) => number,
  fitSection: (idx1: number, idx2: number) => void
) => {
  const resetDrag = useCallback(
    (skipMapFitBounds: boolean = false, calculateFullExtent?: (items: any[]) => any, map?: any) => {
      const state_ref = state.current
      if (state_ref.dragRectangleG) {
        state_ref.dragRectangleG.remove()
        state_ref.dragRectangleG = null
        state_ref.dragRectangle = null

        if (!skipMapFitBounds && calculateFullExtent && map) {
          const fullExtent = calculateFullExtent(state_ref.areasFlattened)
          if (fullExtent) map.fitBounds(fullExtent)
        }
      }
    },
    [state]
  )

  const dragStartHandler = useCallback(
    (event: any) => {
      const state_ref = state.current
      event.preventDefault?.()
      event.stopPropagation?.()
      state_ref.gotDragged = false

      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      state_ref.dragStartCoords = state_ref.dragCache.start = [
        event.clientX - rect.left - state_ref.margin.left,
        event.clientY - rect.top - state_ref.margin.top
      ]
    },
    [state, containerRef]
  )

  const dragHandler = useCallback(
    (event: any) => {
      const state_ref = state.current
      event.preventDefault?.()
      event.stopPropagation?.()
      state_ref.gotDragged = true

      if (!state_ref.dragStartCoords) return
      const svg = (window as any).d3.select(svgRef.current)
      const backgroundNode = svg.select('rect').node()
      if (!backgroundNode) return

      const coords = (window as any).d3.mouse(backgroundNode)
      state_ref.dragCurrentCoords = state_ref.dragCache.end = coords

      const x1 = Math.min(state_ref.dragStartCoords[0], coords[0])
      const x2 = Math.max(state_ref.dragStartCoords[0], coords[0])

      if (!state_ref.dragRectangle && !state_ref.dragRectangleG) {
        const g = svg
        state_ref.dragRectangleG = g.append('g')
        state_ref.dragRectangle = state_ref.dragRectangleG
          .append('rect')
          .attr('width', x2 - x1)
          .attr('height', state_ref.svgHeight)
          .attr('x', x1)
          .attr('class', 'mouse-drag')
          .style('fill', 'grey')
          .style('opacity', 0.5)
          .style('pointer-events', 'none')
      } else {
        state_ref.dragRectangle
          .attr('width', x2 - x1)
          .attr('x', x1)
      }
    },
    [state, svgRef]
  )

  const dragEndHandler = useCallback(() => {
    const state_ref = state.current
    if (!state_ref.dragStartCoords || !state_ref.gotDragged) {
      state_ref.dragStartCoords = null
      state_ref.gotDragged = false
      resetDrag()
      return
    }

    const item1 = findItemForX(state_ref.dragStartCoords[0])
    const item2 = findItemForX(state_ref.dragCurrentCoords?.[0] || 0)
    fitSection(item1, item2)
    state_ref.dragStartCoords = null
    state_ref.gotDragged = false
  }, [state, findItemForX, fitSection, resetDrag])

  return { dragStartHandler, dragHandler, dragEndHandler, resetDrag }
}