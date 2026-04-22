import React, { forwardRef, ReactNode, Ref } from 'react'

interface HeightgraphContainerProps {
  children: ReactNode
  isExpanded: boolean
}

export const HeightgraphContainer = forwardRef<
  HTMLDivElement,
  HeightgraphContainerProps
>(({ children, isExpanded }, ref) => (
  <div
    ref={ref}
    className="heightgraph-container"
    style={{
      position: 'relative',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}
  >
    {children}
  </div>
))

HeightgraphContainer.displayName = 'HeightgraphContainer'