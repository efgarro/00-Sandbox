import React from 'react'

interface HeightgraphHeaderProps {
  isExpanded: boolean
  categoryLabel: string
  onExpand: () => void
}

export const HeightgraphHeader: React.FC<HeightgraphHeaderProps> = ({
  isExpanded,
  categoryLabel,
  onExpand
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px',
      borderBottom: isExpanded ? '1px solid #ccc' : 'none'
    }}
  >
    <button
      onClick={onExpand}
      style={{
        display: isExpanded ? 'none' : 'block',
        padding: '4px 8px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '12px'
      }}
      aria-label="Expand heightgraph"
    >
      ▲
    </button>
    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
      {categoryLabel}
    </span>
    <button
      onClick={onExpand}
      style={{
        display: isExpanded ? 'block' : 'none',
        padding: '4px 8px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '12px'
      }}
      aria-label="Collapse heightgraph"
    >
      ✕
    </button>
  </div>
)