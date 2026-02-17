export type MediaType = 'pdf' | 'video' | 'image';

export interface BilingualLabel {
  en: string;
  hi: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  collection: string;
  label: BilingualLabel;
  mediaType: MediaType;
  mediaSource: string;
  createdAt: number;
}

export type LabelLanguage = 'en' | 'hi';
