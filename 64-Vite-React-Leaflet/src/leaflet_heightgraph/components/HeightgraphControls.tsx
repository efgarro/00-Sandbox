import React from 'react'
import { HeightgraphHeader } from './controls/HeightgraphHeader'
import { HeightgraphNavigation } from './controls/HeightgraphNavigation'

interface HeightgraphControlsProps {
  isExpanded: boolean
  expandControls: boolean
  selectedIdx: number
  categoriesLength: number
  categoryLabel: string
  onExpand: () => void
  onArrowRight: () => void
  onArrowLeft: () => void
}

export const HeightgraphControls: React.FC<HeightgraphControlsProps> = ({
  isExpanded,
  expandControls,
  selectedIdx,
  categoriesLength,
  categoryLabel,
  onExpand,
  onArrowRight,
  onArrowLeft
}) => (
  <>
    {expandControls && (
      <HeightgraphHeader
        isExpanded={isExpanded}
        categoryLabel={categoryLabel}
        onExpand={onExpand}
      />
    )}

    {expandControls && categoriesLength > 1 && isExpanded && (
      <HeightgraphNavigation
        categoryLabel={categoryLabel}
        onArrowLeft={onArrowLeft}
        onArrowRight={onArrowRight}
      />
    )}
  </>
)