import { useState, useEffect } from 'react';
import type { CatalogItem } from '../lib/catalogTypes';
import { loadCatalog, saveCatalog, addItem as addItemToStorage, removeItem as removeItemFromStorage } from '../lib/catalogStorage';
import { SEED_CATALOG, DEPRECATED_SEED_IDS, DEPRECATED_SEED_TITLES } from '../lib/seedCatalog';

export function useCatalog() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load catalog (already sanitized by loadCatalog)
    let catalog = loadCatalog();
    
    // Clean up deprecated seed items and Blaize items from existing catalogs
    const beforeCleanupCount = catalog.length;
    catalog = catalog.filter(item => {
      // Remove if ID matches deprecated seed IDs
      if (DEPRECATED_SEED_IDS.includes(item.id)) {
        return false;
      }
      
      // Remove if collection is blaize
      if (item.collection === 'blaize') {
        return false;
      }
      
      // Additional safety: remove if title matches and ID looks like a seed ID
      if (item.id.startsWith('seed-') && DEPRECATED_SEED_TITLES.includes(item.title)) {
        return false;
      }
      
      return true;
    });
    
    // Save cleaned catalog if any items were removed
    if (catalog.length < beforeCleanupCount) {
      saveCatalog(catalog);
    }
    
    // Seed catalog if empty after cleanup
    if (catalog.length === 0) {
      saveCatalog(SEED_CATALOG);
      setItems(SEED_CATALOG);
    } else {
      setItems(catalog);
    }
    
    setIsLoading(false);
  }, []);

  const addItem = (item: CatalogItem) => {
    addItemToStorage(item);
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id: string) => {
    removeItemFromStorage(id);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const refreshCatalog = () => {
    setItems(loadCatalog());
  };

  return {
    items,
    isLoading,
    addItem,
    removeItem,
    refreshCatalog
  };
}
