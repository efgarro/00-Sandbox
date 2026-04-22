import { DEFAULT_TRANSLATION } from './heightgraph.constants';

export const getTranslation = (
  key: string,
  userTranslation: Record<string, string> = {}
): string => {
  return (
    userTranslation[key] ||
    DEFAULT_TRANSLATION[key as keyof typeof DEFAULT_TRANSLATION] ||
    'No translation found'
  );
};