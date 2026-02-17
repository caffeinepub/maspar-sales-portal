import type { CatalogItem } from '../../lib/catalogTypes';
import { AdminUploadForm } from './AdminUploadForm';
import { AdminCatalogManager } from './AdminCatalogManager';

interface AdminAreaProps {
  items: CatalogItem[];
  onAdd: (item: Omit<CatalogItem, 'id' | 'createdAt'>) => void;
  onRemove: (id: string) => void;
}

export function AdminArea({ items, onAdd, onRemove }: AdminAreaProps) {
  return (
    <div className="space-y-6">
      <AdminUploadForm onAdd={onAdd} />
      <AdminCatalogManager items={items} onRemove={onRemove} />
    </div>
  );
}
