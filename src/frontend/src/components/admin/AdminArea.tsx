import type { CatalogItem } from '../../lib/catalogTypes';
import { AdminUploadForm } from './AdminUploadForm';
import { AdminCatalogManager } from './AdminCatalogManager';
import { AdminBannerManager } from './AdminBannerManager';
import { AdminDataTransfer } from './AdminDataTransfer';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Info } from 'lucide-react';
import { UI_TEXT } from '../../lib/uiText';

interface AdminAreaProps {
  items: CatalogItem[];
  onAdd: (item: Omit<CatalogItem, 'id' | 'createdAt'>) => void;
  onRemove: (id: string) => void;
}

export function AdminArea({ items, onAdd, onRemove }: AdminAreaProps) {
  return (
    <div className="space-y-6">
      <Alert className="glass-strong border-primary/30">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle>{UI_TEXT.admin.storageNoticeTitle}</AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          {UI_TEXT.admin.storageNoticeDescription}
        </AlertDescription>
      </Alert>
      
      <AdminDataTransfer />
      <Separator className="my-6" />
      <AdminBannerManager />
      <Separator className="my-6" />
      <AdminUploadForm onAdd={onAdd} />
      <AdminCatalogManager items={items} onRemove={onRemove} />
    </div>
  );
}
