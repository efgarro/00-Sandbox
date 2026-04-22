import { useCallback } from 'react'
import {
  calculateFullExtent as calculateFullExtentUtil,
  findItemForX as findItemForXUtil,
  findCoordsForY as findCoordsForYUtil,
  dynamicBoxSize as dynamicBoxSizeUtil
} from '../utils/geometryUtils'
import { fitSection as fitSectionUtil } from '../utils/mapManager'
import type { InternalState } from '../types'

export const useGeometry = (state: React.MutableRefObject<InternalState>, map: any) => {
  const calculateFullExtent = useCallback((items: any[]) => {
    return calculateFullExtentUtil(items)
  }, [])

  const findItemForX = useCallback(
    (x: number) => {
      return findItemForXUtil(state.current, x)
    },
    [state]
  )

  const findCoordsForY = useCallback(
    (y: number) => {
      return findCoordsForYUtil(state.current, y)
    },
    [state]
  )

  const dynamicBoxSize = useCallback((className: string) => {
    return dynamicBoxSizeUtil(className)
  }, [])

  const fitSection = useCallback(
    (index1: number, index2: number) => {
      fitSectionUtil(state.current, map, index1, index2)
    },
    [state, map]
  )

  return { calculateFullExtent, findItemForX, findCoordsForY, dynamicBoxSize, fitSection }
}