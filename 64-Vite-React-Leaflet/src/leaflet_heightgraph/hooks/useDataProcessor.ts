import { useCallback } from 'react'
import {
  prepareData as prepareDataUtil,
  calculateElevationBounds as calcElevationBoundsUtil
} from '../utils/dataProcessor'
import type { InternalState } from '../types'

export const useDataProcessor = (state: React.MutableRefObject<InternalState>) => {
  const prepareData = useCallback(
    (data: any[], mappings: Record<string, any> | undefined) => {
      prepareDataUtil(state.current, data, mappings)
    },
    [state]
  )

  const calculateElevationBounds = useCallback(() => {
    calcElevationBoundsUtil(state.current)
  }, [state])

  return { prepareData, calculateElevationBounds }
}