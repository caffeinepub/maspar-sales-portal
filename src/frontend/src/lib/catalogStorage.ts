import type { CatalogItem, StoredCatalogItem } from './catalogTypes';

const STORAGE_KEY = 'maspar_catalog';

// Helper to check if an item has legacy bilingual label
function hasLegacyLabel(item: any): boolean {
  return item.label && typeof item.label === 'object' && 'en' in item.label;
}

// Normalize mediaType to lowercase supported values
function normalizeMediaType(mediaType: string): string {
  const normalized = mediaType.toLowerCase().trim();
  // Map known variants to supported types
  if (['image', 'img', 'picture', 'photo'].includes(normalized)) {
    return 'image';
  }
  if (['video', 'vid', 'movie'].includes(normalized)) {
    return 'video';
  }
  if (['pdf', 'document', 'doc'].includes(normalized)) {
    return 'pdf';
  }
  // Return as-is for unsupported types (will trigger error UI in modal)
  return normalized;
}

// Sanitize and migrate a stored item
function sanitizeItem(item: any): CatalogItem {
  // Migrate legacy bilingual label
  let label = item.label;
  if (hasLegacyLabel(item)) {
    label = item.label.en || item.label.hi || 'Untitled';
  }

  // Normalize mediaType
  const mediaType = item.mediaType 
    ? normalizeMediaType(String(item.mediaType))
    : 'image'; // Default fallback

  // Ensure mediaSource is a string
  const mediaSource = item.mediaSource 
    ? String(item.mediaSource).trim()
    : '';

  return {
    id: item.id || `item-${Date.now()}`,
    title: item.title || 'Untitled',
    collection: item.collection || '',
    label,
    mediaType: mediaType as any, // Cast to allow unsupported types
    mediaSource,
    createdAt: item.createdAt || Date.now()
  };
}

export function loadCatalog(): CatalogItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    
    // Sanitize all items
    const sanitized = parsed
      .filter((item: any) => item && typeof item === 'object') // Filter out null/invalid entries
      .map(sanitizeItem);
    
    // Check if any items were modified during sanitization
    const needsResave = JSON.stringify(parsed) !== JSON.stringify(sanitized);
    
    if (needsResave) {
      saveCatalog(sanitized);
    }
    
    return sanitized;
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
