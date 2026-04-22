const DEFAULT_TRANSLATION = {
  distance: 'Distance',
  elevation: 'Elevation',
  segment_length: 'Segment length',
  type: 'Type',
  legend: 'Legend'
}

export const getTranslation = (key: string, customTranslation: Record<string, string>): string => {
  if (customTranslation[key]) return customTranslation[key]
  return DEFAULT_TRANSLATION[key as keyof typeof DEFAULT_TRANSLATION] || 'No translation found'
}