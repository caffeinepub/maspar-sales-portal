import type { CatalogItem } from './catalogTypes';

const STORAGE_KEY = 'maspar_catalog';

export function loadCatalog(): CatalogItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as CatalogItem[];
  } catch (error) {
    console.error('Failed to load catalog:', error);
    return [];
  }
}

export function saveCatalog(items: CatalogItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save catalog:', error);
  }
}

export function addItem(item: CatalogItem): void {
  const catalog = loadCatalog();
  catalog.push(item);
  saveCatalog(catalog);
}

export function removeItem(id: string): void {
  const catalog = loadCatalog();
  const filtered = catalog.filter(item => item.id !== id);
  saveCatalog(filtered);
}

export function updateItem(id: string, updates: Partial<CatalogItem>): void {
  const catalog = loadCatalog();
  const index = catalog.findIndex(item => item.id === id);
  if (index !== -1) {
    catalog[index] = { ...catalog[index], ...updates };
    saveCatalog(catalog);
  }
}
