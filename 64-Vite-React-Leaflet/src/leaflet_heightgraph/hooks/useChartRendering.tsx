import { useCallback } from 'react'
import { select } from 'd3-selection'
import type { HeightgraphProps, InternalState, D3Elements } from '../types'
import {
  appendGrid,
  appendAreas,
  createBorderTopLine,
  createHorizontalLine,
  appendBackground,
  createSelectionBox,
  createLegend,
  removeChart
} from '../components/Rendering/renderingFunctions'

export const useChartRendering = (
  state: React.MutableRefObject<InternalState>,
  elements: React.MutableRefObject<D3Elements>,
  containerRef: React.RefObject<HTMLDivElement>,
  svgRef: React.RefObject<SVGSVGElement>,
  props: HeightgraphProps,
  appendScales: (xTicks?: number, yTicks?: number) => void,
  createFocus: () => void,
  mousemoveHandler: (event: any) => void,
  mouseoutHandler: () => void,
  dragStartHandler: (event: any) => void,
  dragHandler: (event: any) => void,
  dragEndHandler: () => void,
  findCoordsForY: (y: number) => any[],
  removeMarkedSegmentsOnMap: () => void,
  markSegmentsOnMap: (coords: any[]) => void,
  getTranslation: (key: string) => string
) => {
  const appendGridHandler = useCallback(() => {
    appendGrid(state.current, elements.current)
  }, [state, elements])

  const createChart = useCallback(
    (idx: number) => {
      const s = state.current
      const areas = s.categories.length === 0 ? [] : s.categories[idx].geometries
      s.areasFlattened = ([] as any[]).concat(...areas)

      for (let i = 0; i < areas.length; i++) {
        appendAreas(s, elements.current, areas[i], idx, i, props.graphStyle || {})
      }

      createFocus()
      createBorderTopLine(s, elements.current)
      createLegend(s, elements.current, idx, getTranslation)
      createHorizontalLine(
        s,
        elements.current,
        findCoordsForY,
        removeMarkedSegmentsOnMap,
        markSegmentsOnMap
      )

      createSelectionBox(
        s,
        elements.current,
        idx,
        () => {}, // onArrowRight - handled in parent
        () => {}, // onArrowLeft - handled in parent
        (selIdx) => {
          if (typeof props.chooseSelectionCallback === 'function') {
            props.chooseSelectionCallback(selIdx, s.categories[selIdx]?.info)
          }
        }
      )

      appendBackground(
        s,
        elements.current,
        mousemoveHandler,
        mouseoutHandler,
        dragStartHandler,
        dragHandler,
        dragEndHandler
      )
    },
    [
      state,
      elements,
      props,
      createFocus,
      getTranslation,
      findCoordsForY,
      removeMarkedSegmentsOnMap,
      markSegmentsOnMap,
      mousemoveHandler,
      mouseoutHandler,
      dragStartHandler,
      dragHandler,
      dragEndHandler
    ]
  )

  const removeChartElements = useCallback(() => {
    removeChart(elements.current)
  }, [elements])

  return {
    appendGridHandler,
    createChart,
    removeChartElements
  }
}