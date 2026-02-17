import type { CatalogItem } from './catalogTypes';

export const SEED_CATALOG: CatalogItem[] = [
  {
    id: 'seed-1',
    title: 'Blaize Collection Catalog',
    collection: 'blaize',
    label: {
      en: 'Premium Blaize Designs',
      hi: 'प्रीमियम ब्लेज़ डिज़ाइन'
    },
    mediaType: 'image',
    mediaSource: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
    createdAt: Date.now()
  },
  {
    id: 'seed-2',
    title: 'Colorart Showcase',
    collection: 'colorart',
    label: {
      en: 'Vibrant Colorart Collection',
      hi: 'जीवंत कलरआर्ट संग्रह'
    },
    mediaType: 'image',
    mediaSource: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    createdAt: Date.now()
  },
  {
    id: 'seed-3',
    title: 'Bedding Essentials',
    collection: 'bedding',
    label: {
      en: 'Luxury Bedding Collection',
      hi: 'लक्जरी बेडिंग संग्रह'
    },
    mediaType: 'image',
    mediaSource: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    createdAt: Date.now()
  },
  {
    id: 'seed-4',
    title: 'Cushion Designs',
    collection: 'cushions',
    label: {
      en: 'Designer Cushion Range',
      hi: 'डिज़ाइनर कुशन रेंज'
    },
    mediaType: 'image',
    mediaSource: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    createdAt: Date.now()
  }
];
