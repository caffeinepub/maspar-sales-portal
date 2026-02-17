import type { CatalogItem } from '../../lib/catalogTypes';
import { AdminUploadForm } from './AdminUploadForm';
import { AdminCatalogManager } from './AdminCatalogManager';
import { AdminBannerManager } from './AdminBannerManager';
import { Separator } from '../ui/separator';

interface AdminAreaProps {
  items: CatalogItem[];
  onAdd: (item: Omit<CatalogItem, 'id' | 'createdAt'>) => void;
  onRemove: (id: string) => void;
}

export function AdminArea({ items, onAdd, onRemove }: AdminAreaProps) {
  return (
    <div className="space-y-6">
      <AdminBannerManager />
      <Separator className="my-6" />
      <AdminUploadForm onAdd={onAdd} />
      <AdminCatalogManager items={items} onRemove={onRemove} />
    </div>
  );
}
