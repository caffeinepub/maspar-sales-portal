import { useState, useEffect, useMemo } from 'react';
import type { CatalogItem } from '../../lib/catalogTypes';
import { loadBanner, subscribeToBannerChanges, type BannerData } from '../../lib/bannerStorage';
import { UI_TEXT } from '../../lib/uiText';
import { SearchAndFilters } from './SearchAndFilters';
import { ItemGrid } from './ItemGrid';
import { MediaViewerModal } from '../viewers/MediaViewerModal';

interface PublicViewerProps {
  items: CatalogItem[];
  refreshTrigger?: number;
}

export function PublicViewer({ items, refreshTrigger }: PublicViewerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('all');
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banner, setBanner] = useState<BannerData | null>(null);

  // Load banner on mount and when refreshTrigger changes
  useEffect(() => {
    setBanner(loadBanner());
  }, [refreshTrigger]);

  // Subscribe to banner changes (both in-app and cross-tab)
  useEffect(() => {
    const unsubscribe = subscribeToBannerChanges((newBanner) => {
      setBanner(newBanner);
    });

    return unsubscribe;
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesLabel = selectedLabel === 'all' || item.label === selectedLabel;
      const matchesSearch = searchQuery === '' || 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLabel && matchesSearch;
    });
  }, [items, selectedLabel, searchQuery]);

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
      {banner && (
        <div className="rounded-lg overflow-hidden shadow-lg border border-border/50 no-select no-drag">
          <img
            src={banner.imageData}
            alt="New Arrivals"
            className="w-full h-auto"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}

      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLabel={selectedLabel}
        onLabelChange={setSelectedLabel}
      />

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 glass rounded-lg">
          <p className="text-muted-foreground">{UI_TEXT.public.noItems}</p>
        </div>
      ) : (
        <ItemGrid
          items={filteredItems}
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
