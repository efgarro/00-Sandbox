import { useRef, useEffect, useState, useCallback, Ref } from 'react'
import { select } from 'd3-selection'
import type { HeightgraphProps, InternalState, D3Elements } from '../types'
import { useDataProcessor } from './useDataProcessor'
import { useScales } from './useScales'
import { useGeometry } from './useGeometry'
import { useMapManager } from './useMapManager'
import { useDragHandlers } from './useDragHandlers'
import { useFocus } from './useFocus'
import { useMouseHandlers } from './useMouseHandlers'
import { useChartRendering } from './useChartRendering'
import { getTranslation } from '../utils/translation'

export const useHeightgraphState = (props: HeightgraphProps, ref: Ref<HTMLDivElement>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [isExpanded, setIsExpanded] = useState(props.expand !== false)
  const [selectedIdx, setSelectedIdx] = useState(props.selectedAttributeIdx || 0)

  const stateRef = useRef<InternalState>(initializeState(props))
  const d3ElementsRef = useRef<D3Elements>(initializeD3Elements())

  // Translation utility
  const getTranslationMemoized = useCallback(
    (key: string) => getTranslation(key, props.translation || {}),
    [props.translation]
  )

  // Core hooks
  const { prepareData, calculateElevationBounds } = useDataProcessor(stateRef)
  const { appendScales } = useScales(stateRef)
  const { calculateFullExtent, findItemForX, findCoordsForY, dynamicBoxSize, fitSection } =
    useGeometry(stateRef, props.map)
  const { markSegmentsOnMap, removeMarkedSegmentsOnMap, showMapMarker } = useMapManager(
    stateRef,
    props.map,
    props.highlightStyle || { color: 'red' },
    dynamicBoxSize
  )
  const { dragStartHandler, dragHandler, dragEndHandler, resetDrag } = useDragHandlers(
    stateRef,
    containerRef,
    svgRef,
    findItemForX,
    fitSection
  )
  const { createFocus, updateFocus } = useFocus(
    stateRef,
    d3ElementsRef,
    getTranslationMemoized,
    dynamicBoxSize
  )
  const { mousemoveHandler, mouseoutHandler } = useMouseHandlers(
    stateRef,
    d3ElementsRef,
    svgRef,
    findItemForX,
    updateFocus,
    showMapMarker
  )
  const { appendGridHandler, createChart, removeChartElements } = useChartRendering(
    stateRef,
    d3ElementsRef,
    containerRef,
    svgRef,
    props,
    appendScales,
    createFocus,
    mousemoveHandler,
    mouseoutHandler,
    dragStartHandler,
    dragHandler,
    dragEndHandler,
    findCoordsForY,
    removeMarkedSegmentsOnMap,
    markSegmentsOnMap,
    getTranslationMemoized
  )

  // Initialize chart
  const initChart = useCallback(() => {
    if (!svgRef.current) return

    const state = stateRef.current
    state.margin = props.margins || { top: 10, right: 30, bottom: 55, left: 50 }
    state.width = props.width || 800
    state.height = props.height || 280
    state.svgWidth = state.width - state.margin.left - state.margin.right
    state.svgHeight = state.height - state.margin.top - state.margin.bottom

    const svg = select(svgRef.current)
    svg.selectAll('*').remove()

    d3ElementsRef.current.svg = svg
      .attr('width', state.width)
      .attr('height', state.height)
      .append('g')
      .attr('transform', `translate(${state.margin.left},${state.margin.top})`)

    if (props.data.length === 0) return

    prepareData(props.data, props.mappings)
    calculateElevationBounds()
    appendScales(props.xTicks, props.yTicks)
    appendGridHandler()
    createChart(selectedIdx)
  }, [
    props,
    selectedIdx,
    prepareData,
    calculateElevationBounds,
    appendScales,
    appendGridHandler,
    createChart
  ])

  // Handlers
  const handleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev)
    props.expandCallback?.(!isExpanded)
  }, [isExpanded, props])

  const handleArrowRight = useCallback(() => {
    let idx = selectedIdx + 1
    const state = stateRef.current
    if (idx === state.categories.length) {
      idx = 0
    }
    setSelectedIdx(idx)
    removeChartElements()
    removeMarkedSegmentsOnMap()
    createChart(idx)
  }, [selectedIdx, removeChartElements, removeMarkedSegmentsOnMap, createChart])

  const handleArrowLeft = useCallback(() => {
    let idx = selectedIdx - 1
    const state = stateRef.current
    if (idx === -1) {
      idx = state.categories.length - 1
    }
    setSelectedIdx(idx)
    removeChartElements()
    removeMarkedSegmentsOnMap()
    createChart(idx)
  }, [selectedIdx, removeChartElements, removeMarkedSegmentsOnMap, createChart])

  // Effects
  useEffect(() => {
    if (props.data.length > 0) {
      initChart()
    }
  }, [props.data, initChart])

  useEffect(() => {
    if (svgRef.current) {
      const svg = select(svgRef.current)
      svg.style('display', isExpanded ? 'block' : 'none')
    }
  }, [isExpanded])

  useEffect(() => {
    return () => {
      removeMarkedSegmentsOnMap()
      const state = stateRef.current
      if (state.mouseoutDelay) {
        clearTimeout(state.mouseoutDelay)
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('mouseup', dragEndHandler)
      }
    }
  }, [removeMarkedSegmentsOnMap, dragEndHandler])

  useEffect(() => {
    if (typeof ref === 'function') {
      ref(containerRef.current)
    } else if (ref) {
      ref.current = containerRef.current
    }
  }, [ref])

  return {
    containerRef,
    svgRef,
    isExpanded,
    selectedIdx,
    state: stateRef,
    d3Elements: d3ElementsRef,
    handlers: {
      handleExpand,
      handleArrowRight,
      handleArrowLeft
    }
  }
}

const initializeState = (props: HeightgraphProps): InternalState => ({
  margin: props.margins || { top: 10, right: 30, bottom: 55, left: 50 },
  width: props.width || 800,
  height: props.height || 280,
  svgWidth: (props.width || 800) - (props.margins?.left || 50) - (props.margins?.right || 30),
  svgHeight:
    (props.height || 280) - (props.margins?.top || 10) - (props.margins?.bottom || 55),
  elevationBounds: { min: 0, max: 0 },
  categories: [],
  coordinates: [],
  elevations: [],
  cumulatedDistances: [0],
  totalDistance: 0,
  areasFlattened: [],
  dragCache: { start: null, end: null },
  dragStartCoords: null,
  gotDragged: false,
  dragCurrentCoords: null,
  dragRectangle: null,
  dragRectangleG: null,
  markedSegments: null,
  highlightedCoords: [],
  showLegend: false,
  x: null,
  y: null,
  xAxis: null,
  yAxis: null,
  mouseoutDelay: null,
  selectedAttributeIdx: props.selectedAttributeIdx || 0,
  data: props.data
})

const initializeD3Elements = (): D3Elements => ({
  svg: null,
  background: null,
  focus: null,
  focusRect: null,
  focusLine: null,
  focusLineGroup: null,
  focusDistance: null,
  focusHeight: null,
  focusBlockDistance: null,
  focusType: null,
  areaTspan: null,
  typeTspan: null,
  distTspan: null,
  altTspan: null,
  dragRectangle: null,
  dragRectangleG: null,
  horizontalLine: null,
  elevationValueText: null,
  selectionText: null,
  markedSegments: null,
  mouseHeightFocus: null,
  mouseHeightFocusLabel: null,
  mouseHeightFocusLabelRect: null,
  mouseHeightFocusLabelTextElev: null,
  mouseHeightFocusLabelTextType: null,
  pointG: null
})