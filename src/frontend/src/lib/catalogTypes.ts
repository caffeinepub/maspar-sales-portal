export type MediaType = 'pdf' | 'video' | 'image';

export interface CatalogItem {
  id: string;
  title: string;
  collection: string;
  label: string;
  mediaType: MediaType;
  mediaSource: string;
  createdAt: number;
}

// Runtime type for items that may have legacy/malformed mediaType
export interface StoredCatalogItem extends Omit<CatalogItem, 'mediaType'> {
  mediaType: string; // Allow any string at runtime for migration
}
