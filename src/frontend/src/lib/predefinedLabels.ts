/**
 * Predefined label set for Maspar catalog items.
 * This is the single source of truth for all label options.
 */
export const PREDEFINED_LABELS = [
  'Colorart',
  'Vintage',
  'Hermosa',
  'Rurban',
  'Essentials',
  'Eternal Treasure',
  'Hues',
  'Inhouse',
  'Cotsmere',
  'Little Maspar',
  'Generic',
  'Maspar'
] as const;

export type PredefinedLabel = typeof PREDEFINED_LABELS[number];

/**
 * Check if a string is a valid predefined label
 */
export function isPredefinedLabel(value: string): value is PredefinedLabel {
  return PREDEFINED_LABELS.includes(value as PredefinedLabel);
}
