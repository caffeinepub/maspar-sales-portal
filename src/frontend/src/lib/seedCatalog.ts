import type { CatalogItem } from './catalogTypes';

export const SEED_CATALOG: CatalogItem[] = [];

// IDs of deprecated seed items to remove from existing catalogs
export const DEPRECATED_SEED_IDS = ['seed-1', 'seed-2', 'seed-3', 'seed-4'];

// Titles of deprecated seed items (for additional safety check)
export const DEPRECATED_SEED_TITLES = [
  'Blaize Collection Catalog',
  'Colorart Showcase',
  'Bedding Essentials',
  'Cushion Designs'
];
