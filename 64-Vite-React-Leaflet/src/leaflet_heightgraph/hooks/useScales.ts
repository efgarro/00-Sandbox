import { useCallback } from 'react'
import { appendScales as appendScalesUtil } from '../utils/scaleManager'
import type { InternalState } from '../types'

export const useScales = (state: React.MutableRefObject<InternalState>) => {
  const appendScales = useCallback(
    (xTicks?: number, yTicks?: number) => {
      appendScalesUtil(state.current, xTicks, yTicks)
    },
    [state]
  )

  return { appendScales }
}