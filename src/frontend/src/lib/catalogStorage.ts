import type { CatalogItem } from './catalogTypes';

const STORAGE_KEY = 'maspar_catalog';

// Helper to check if an item has legacy bilingual label
function hasLegacyLabel(item: any): boolean {
  return item.label && typeof item.label === 'object' && 'en' in item.label;
}

// Migrate legacy bilingual label to English-only string
function migrateLegacyItem(item: any): CatalogItem {
  if (hasLegacyLabel(item)) {
    return {
      ...item,
      label: item.label.en || item.label.hi || 'Untitled'
    };
  }
  return item;
}

export function loadCatalog(): CatalogItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    
    // Check if migration is needed
    const needsMigration = parsed.some((item: any) => hasLegacyLabel(item));
    
    if (needsMigration) {
      const migrated = parsed.map(migrateLegacyItem);
      saveCatalog(migrated);
      return migrated;
    }
    
    return parsed as CatalogItem[];
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
