import { bisector } from 'd3-array'
import { selectAll } from 'd3-selection'
import type { InternalState } from '../types'

export const calculateFullExtent = (items: any[]): any => {
  if (!items || items.length < 1) return null
  let fullExtent = new (window as any).L.latLngBounds(items[0].latlng, items[0].latlng)
  items.forEach((item) => {
    if (!fullExtent.contains(item.latlng)) {
      fullExtent.extend(item.latlng)
    }
  })
  return fullExtent
}

export const findItemForX = (state: InternalState, x: number): number => {
  if (!state.x || !state.areasFlattened.length) return 0
  const bisect = bisector((d: any) => d.position).left
  const xInvert = state.x.invert(x)
  return bisect(state.areasFlattened, xInvert)
}

export const findCoordsForY = (state: InternalState, y: number): any[] => {
  if (!state.y || !state.areasFlattened.length) return []
  const yInvert = state.y.invert(y)
  const list: number[] = []

  for (let i = 0; i < state.areasFlattened.length; i++) {
    if (state.areasFlattened[i].altitude >= yInvert) {
      list.push(i)
    }
  }

  const newList: number[][] = []
  let start = 0
  for (let j = 0; j < list.length - 1; j++) {
    if (list[j + 1] !== list[j] + 1) {
      newList.push(list.slice(start, j + 1))
      start = j + 1
    }
  }
  newList.push(list.slice(start, list.length))

  const coordsList: any[] = []
  for (let k = 0; k < newList.length; k++) {
    const coordsBlock = newList[k].map((idx) => state.areasFlattened[idx].latlng)
    coordsList.push(coordsBlock)
  }
  return coordsList
}

export const dynamicBoxSize = (className: string): [number, number] => {
  const elements = selectAll(className).nodes()
  const cnt = elements.length
  const widths: number[] = []
  for (let i = 0; i < cnt; i++) {
    const width = (elements[i] as any).getBoundingClientRect().width
    widths.push(width)
  }
  const maxWidth = Math.max(...widths, 0)
  return [cnt, maxWidth]
}