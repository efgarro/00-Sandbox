import { useCallback } from 'react'
import {
  markSegmentsOnMap as markSegmentsOnMapUtil,
  removeMarkedSegmentsOnMap as removeMarkedSegmentsOnMapUtil,
  showMapMarker as showMapMarkerUtil
} from '../utils/mapManager'
import type { InternalState } from '../types'

export const useMapManager = (
  state: React.MutableRefObject<InternalState>,
  map: any,
  highlightStyle: Record<string, any>,
  dynamicBoxSize: (className: string) => [number, number]
) => {
  const markSegmentsOnMap = useCallback(
    (coords: any[]) => {
      markSegmentsOnMapUtil(state.current, coords, map, highlightStyle)
    },
    [state, map, highlightStyle]
  )

  const removeMarkedSegmentsOnMap = useCallback(() => {
    removeMarkedSegmentsOnMapUtil(state.current, map)
  }, [state, map])

  const showMapMarker = useCallback(
    (ll: any, height: number, type: string) => {
      showMapMarkerUtil(
        state.current,
        map,
        ll,
        height,
        type,
        dynamicBoxSize
      )
    },
    [state, map, dynamicBoxSize]
  )

  return { markSegmentsOnMap, removeMarkedSegmentsOnMap, showMapMarker }
}