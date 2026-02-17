import { useRef, useEffect } from 'react';
import type { CatalogItem } from '../../lib/catalogTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { applyContentProtection } from '../../lib/contentProtection';
import { ImageZoomViewer } from './ImageZoomViewer';
import { VideoViewer } from './VideoViewer';
import { PdfFirstPagePreview } from './PdfFirstPagePreview';
import { AlertCircle } from 'lucide-react';

interface MediaViewerModalProps {
  item: CatalogItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MediaViewerModal({ item, isOpen, onClose }: MediaViewerModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      return applyContentProtection(contentRef.current);
    }
  }, [isOpen]);

  if (!item) return null;

  // Normalize mediaType for comparison
  const normalizedMediaType = item.mediaType.toLowerCase();
  
  // Validate media type and source
  const hasValidMediaType = ['image', 'video', 'pdf'].includes(normalizedMediaType);
  const hasValidSource = item.mediaSource && item.mediaSource.trim().length > 0;

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        // Only call onClose when the dialog is closing (open becomes false)
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-auto glass-strong"
        onPointerDownOutside={(e) => {
          // Prevent closing if click originated from item card
          const target = e.target as HTMLElement;
          if (target.closest('[data-item-card]')) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>
        <div ref={contentRef} className="no-select">
          {!hasValidSource ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <AlertCircle className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Media source is missing or invalid. Please verify the URL.
              </p>
            </div>
          ) : !hasValidMediaType ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <AlertCircle className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Unsupported media type: {item.mediaType}
              </p>
            </div>
          ) : (
            <>
              {normalizedMediaType === 'image' && (
                <ImageZoomViewer src={item.mediaSource} alt={item.title} />
              )}
              {normalizedMediaType === 'video' && (
                <VideoViewer src={item.mediaSource} />
              )}
              {normalizedMediaType === 'pdf' && (
                <PdfFirstPagePreview src={item.mediaSource} />
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
