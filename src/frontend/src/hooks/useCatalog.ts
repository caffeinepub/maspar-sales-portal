import { useState, useEffect } from 'react';
import type { CatalogItem } from '../lib/catalogTypes';
import { loadCatalog, saveCatalog, addItem as addItemToStorage, removeItem as removeItemFromStorage } from '../lib/catalogStorage';
import { SEED_CATALOG } from '../lib/seedCatalog';

export function useCatalog() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const catalog = loadCatalog();
    
    // Seed catalog if empty
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
