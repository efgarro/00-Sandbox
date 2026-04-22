'use client'

import React, { forwardRef, Ref } from 'react'
import type { HeightgraphProps } from './types'
import { HeightgraphContainer } from './components/HeightgraphContainer'
import { HeightgraphControls } from './components/HeightgraphControls'
import { HeightgraphCanvas } from './components/HeightgraphCanvas'
import { useHeightgraphState } from './hooks/useHeightgraphState'

const Heightgraph = forwardRef<HTMLDivElement, HeightgraphProps>(
  (props, ref: Ref<HTMLDivElement>) => {
    const {
      containerRef,
      svgRef,
      isExpanded,
      selectedIdx,
      state,
      d3Elements,
      handlers: {
        handleExpand,
        handleArrowRight,
        handleArrowLeft
      }
    } = useHeightgraphState(props, ref)

    return (
      <HeightgraphContainer
        ref={containerRef}
        isExpanded={isExpanded}
      >
        <HeightgraphControls
          isExpanded={isExpanded}
          expandControls={props.expandControls}
          selectedIdx={selectedIdx}
          categoriesLength={state.current.categories.length}
          onExpand={handleExpand}
          onArrowRight={handleArrowRight}
          onArrowLeft={handleArrowLeft}
          categoryLabel={
            selectedIdx < state.current.categories.length
              ? state.current.categories[selectedIdx]?.info?.text || 'Height Graph'
              : 'Height Graph'
          }
        />

        <HeightgraphCanvas
          svgRef={svgRef}
          isExpanded={isExpanded}
          width={props.width || 800}
          height={props.height || 280}
        />
      </HeightgraphContainer>
    )
  }
)

Heightgraph.displayName = 'Heightgraph'

export default Heightgraph