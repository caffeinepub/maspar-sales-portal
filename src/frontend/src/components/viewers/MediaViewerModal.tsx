import { useRef, useEffect } from 'react';
import type { CatalogItem } from '../../lib/catalogTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { applyContentProtection } from '../../lib/contentProtection';
import { ImageZoomViewer } from './ImageZoomViewer';
import { VideoViewer } from './VideoViewer';
import { PdfFirstPagePreview } from './PdfFirstPagePreview';

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto glass-strong">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>
        <div ref={contentRef} className="no-select">
          {item.mediaType === 'image' && (
            <ImageZoomViewer src={item.mediaSource} alt={item.title} />
          )}
          {item.mediaType === 'video' && (
            <VideoViewer src={item.mediaSource} />
          )}
          {item.mediaType === 'pdf' && (
            <PdfFirstPagePreview src={item.mediaSource} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
