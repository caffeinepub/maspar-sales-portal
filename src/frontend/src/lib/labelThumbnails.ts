import { PREDEFINED_LABELS, type PredefinedLabel } from './predefinedLabels';

/**
 * Maps predefined labels to their thumbnail asset paths.
 * All thumbnails are stored in /assets/generated/ and are 256x256 px.
 */
const LABEL_THUMBNAIL_MAP: Record<PredefinedLabel, string> = {
  'Colorart': '/assets/generated/label-colorart-thumb.dim_256x256.png',
  'Vintage': '/assets/generated/label-vintage-thumb.dim_256x256.png',
  'Hermosa': '/assets/generated/label-hermosa-thumb.dim_256x256.png',
  'Rurban': '/assets/generated/label-rurban-thumb.dim_256x256.png',
  'Essentials': '/assets/generated/label-essentials-thumb.dim_256x256.png',
  'Eternal Treasure': '/assets/generated/label-eternal-treasure-thumb.dim_256x256.png',
  'Hues': '/assets/generated/label-hues-thumb.dim_256x256.png',
  'Inhouse': '/assets/generated/label-inhouse-thumb.dim_256x256.png',
  'Cotsmere': '/assets/generated/label-cotsmere-thumb.dim_256x256.png',
  'Little Maspar': '/assets/generated/label-little-maspar-thumb.dim_256x256.png',
  'Generic': '/assets/generated/label-generic-thumb.dim_256x256.png',
  'Maspar': '/assets/generated/label-maspar-thumb.dim_256x256.png'
};

/**
 * Get the thumbnail path for a given label.
 * Returns undefined if the label is not in PREDEFINED_LABELS.
 */
export function getLabelThumbnail(label: string): string | undefined {
  if (PREDEFINED_LABELS.includes(label as PredefinedLabel)) {
    return LABEL_THUMBNAIL_MAP[label as PredefinedLabel];
  }
  return undefined;
}

/**
 * Check if a label has a thumbnail available.
 */
export function hasLabelThumbnail(label: string): boolean {
  return PREDEFINED_LABELS.includes(label as PredefinedLabel);
}
