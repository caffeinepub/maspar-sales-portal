import { useState, useEffect, useMemo } from 'react';
import type { CatalogItem, LabelLanguage } from '../../lib/catalogTypes';
import { getLabelLanguage } from '../../lib/labelLanguage';
import { getCollections } from '../../lib/collections';
import { UI_TEXT } from '../../lib/uiText';
import { SearchAndFilters } from './SearchAndFilters';
import { CollectionCards } from './CollectionCards';
import { ItemGrid } from './ItemGrid';
import { MediaViewerModal } from '../viewers/MediaViewerModal';

interface PublicViewerProps {
  items: CatalogItem[];
}

export function PublicViewer({ items }: PublicViewerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [language, setLanguage] = useState<LabelLanguage>('en');
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLanguage(getLabelLanguage());
  }, []);

  const collections = useMemo(() => getCollections(items), [items]);

  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    collections.forEach(col => {
      counts[col.id] = items.filter(item => item.collection === col.id).length;
    });
    return counts;
  }, [items, collections]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCollection = selectedCollection === 'all' || item.collection === selectedCollection;
      const matchesSearch = searchQuery === '' || 
        item.label[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCollection && matchesSearch;
    });
  }, [items, selectedCollection, searchQuery, language]);

  const handleItemClick = (item: CatalogItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <div className="space-y-6">
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCollection={selectedCollection}
        onCollectionChange={setSelectedCollection}
        collections={collections}
        language={language}
        onLanguageChange={setLanguage}
      />

      <CollectionCards
        collections={collections}
        selectedCollection={selectedCollection}
        onSelectCollection={setSelectedCollection}
        itemCounts={itemCounts}
      />

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 glass rounded-lg">
          <p className="text-muted-foreground">{UI_TEXT.public.noItems}</p>
        </div>
      ) : (
        <ItemGrid
          items={filteredItems}
          language={language}
          onItemClick={handleItemClick}
        />
      )}

      <MediaViewerModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
