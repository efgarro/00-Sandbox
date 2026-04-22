import React from 'react'

interface HeightgraphNavigationProps {
  categoryLabel: string
  onArrowLeft: () => void
  onArrowRight: () => void
}

export const HeightgraphNavigation: React.FC<HeightgraphNavigationProps> = ({
  categoryLabel,
  onArrowLeft,
  onArrowRight
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      borderTop: '1px solid #ccc',
      backgroundColor: '#f9f9f9'
    }}
  >
    <button
      onClick={onArrowLeft}
      style={{
        padding: '4px 8px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '3px',
        cursor: 'pointer',
        fontSize: '12px'
      }}
      aria-label="Previous"
    >
      ◀
    </button>
    <span
      style={{
        fontSize: '11px',
        flex: 1,
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {categoryLabel}
    </span>
    <button
      onClick={onArrowRight}
      style={{
        padding: '4px 8px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '3px',
        cursor: 'pointer',
        fontSize: '12px'
      }}
      aria-label="Next"
    >
      ▶
    </button>
  </div>
)