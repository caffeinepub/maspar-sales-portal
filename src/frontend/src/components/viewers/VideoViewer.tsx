import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface VideoViewerProps {
  src: string;
}

export function VideoViewer({ src }: VideoViewerProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="aspect-video bg-muted rounded-lg overflow-hidden flex flex-col items-center justify-center space-y-3">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center px-4">
          This video could not be loaded. Please verify the URL.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
      <video
        src={src}
        controls
        controlsList="nodownload"
        className="w-full h-full"
        onError={handleError}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
