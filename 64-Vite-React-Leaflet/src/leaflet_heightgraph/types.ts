export interface HeightgraphOptions {
  position?: string
  width?: number
  height?: number
  margins?: { top: number; right: number; bottom: number; left: number }
  mappings?: Record<string, any>
  expand?: boolean
  expandControls?: boolean
  translation?: Record<string, string>
  expandCallback?: (state: boolean) => void
  chooseSelectionCallback?: (idx: number, type: any) => void
  selectedAttributeIdx?: number
  xTicks?: number
  yTicks?: number
  highlightStyle?: Record<string, any>
  graphStyle?: Record<string, any>
}

export interface HeightgraphProps extends HeightgraphOptions {
  data: any[]
  map: any
}

export interface InternalState {
  margin: { top: number; right: number; bottom: number; left: number }
  width: number
  height: number
  svgWidth: number
  svgHeight: number
  elevationBounds: { min: number; max: number }
  categories: any[]
  coordinates: any[]
  elevations: number[]
  cumulatedDistances: number[]
  totalDistance: number
  areasFlattened: any[]
  dragCache: { start: any; end: any }
  dragStartCoords: any
  gotDragged: boolean
  dragCurrentCoords: any
  dragRectangle: any
  dragRectangleG: any
  markedSegments: any
  highlightedCoords: any[]
  showLegend: boolean
  x: any
  y: any
  xAxis: any
  yAxis: any
  mouseoutDelay: NodeJS.Timeout | null
}

export interface D3Elements {
  svg: any
  background: any
  focus: any
  focusRect: any
  focusLine: any
  focusLineGroup: any
  focusDistance: any
  focusHeight: any
  focusBlockDistance: any
  focusType: any
  areaTspan: any
  typeTspan: any
  distTspan: any
  altTspan: any
  dragRectangle: any
  dragRectangleG: any
  horizontalLine: any
  elevationValueText: any
  selectionText: any
  markedSegments: any
  mouseHeightFocus: any
  mouseHeightFocusLabel: any
  mouseHeightFocusLabelRect: any
  mouseHeightFocusLabelTextElev: any
  mouseHeightFocusLabelTextType: any
  pointG: any
}