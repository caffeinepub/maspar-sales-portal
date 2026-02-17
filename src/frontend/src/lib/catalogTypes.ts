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
