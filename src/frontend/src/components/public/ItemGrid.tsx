import { useRef, useEffect } from 'react';
import type { CatalogItem } from '../../lib/catalogTypes';
import { getLabelThumbnail } from '../../lib/labelThumbnails';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { applyContentProtection } from '../../lib/contentProtection';
import { FileText, Video, Image as ImageIcon } from 'lucide-react';

interface ItemGridProps {
  items: CatalogItem[];
  onItemClick: (item: CatalogItem) => void;
}

export function ItemGrid({ items, onItemClick }: ItemGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return applyContentProtection(gridRef.current);
  }, []);

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const labelThumbnail = getLabelThumbnail(item.label);
        
        return (
          <Card
            key={item.id}
            className="glass cursor-pointer transition-lift hover:shadow-glass no-select"
            onClick={() => onItemClick(item)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge variant="secondary" className="gap-1.5">
                  {getMediaIcon(item.mediaType)}
                  {item.mediaType.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                {labelThumbnail && (
                  <img
                    src={labelThumbnail}
                    alt={item.label}
                    className="w-8 h-8 rounded object-cover no-drag"
                    draggable={false}
                  />
                )}
                <p className="text-sm text-muted-foreground">
                  {item.label}
                </p>
              </div>
              {item.mediaType === 'image' && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={item.mediaSource}
                    alt={item.title}
                    className="w-full h-full object-cover no-drag"
                    draggable={false}
                  />
                </div>
              )}
              {item.mediaType === 'video' && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Video className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              {item.mediaType === 'pdf' && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
