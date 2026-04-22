import { useCallback } from 'react'
import type { InternalState, D3Elements } from '../types'

export const useMouseHandlers = (
  state: React.MutableRefObject<InternalState>,
  elements: React.MutableRefObject<D3Elements>,
  svgRef: React.RefObject<SVGSVGElement>,
  findItemForX: (x: number) => number,
  updateFocus: (item: any, show: boolean, showMapMarker?: (ll: any, alt: number, type: string) => void) => void,
  showMapMarker: (ll: any, height: number, type: string) => void
) => {
  const mousemoveHandler = useCallback(
    (event: any) => {
      const s = state.current
      if (!s.areasFlattened.length || !s.x) return

      const backgroundNode = elements.current.background?.node()
      if (!backgroundNode) return

      const rect = svgRef.current?.getBoundingClientRect()
      if (!rect) return

      const mouseX = event.clientX - rect.left - s.margin.left
      const item = s.areasFlattened[findItemForX(mouseX)]

      if (item) {
        updateFocus(item, true, showMapMarker)
      }
    },
    [state, elements, svgRef, findItemForX, updateFocus, showMapMarker]
  )

  const mouseoutHandler = useCallback(() => {
    const keys = [
      'focusLine',
      'focus',
      'pointG',
      'mouseHeightFocus',
      'mouseHeightFocusLabel'
    ] as const
    for (let key of keys) {
      const elem = elements.current[key]
      if (elem) {
        elem.style('display', 'none')
      }
    }
  }, [elements])

  return { mousemoveHandler, mouseoutHandler }
}