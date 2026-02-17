import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ImageZoomViewerProps {
  src: string;
  alt: string;
}

export function ImageZoomViewer({ src, alt }: ImageZoomViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={handleZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleRotate}>
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
      <div className="overflow-auto max-h-[60vh] flex items-center justify-center bg-muted rounded-lg p-4">
        <img
          src={src}
          alt={alt}
          className="no-drag transition-transform duration-200"
          draggable={false}
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
    </div>
  );
}
