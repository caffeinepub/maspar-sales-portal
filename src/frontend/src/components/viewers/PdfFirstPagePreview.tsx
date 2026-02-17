import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface PdfFirstPagePreviewProps {
  src: string;
}

export function PdfFirstPagePreview({ src }: PdfFirstPagePreviewProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="space-y-4">
        <div className="bg-muted rounded-lg p-8 flex flex-col items-center justify-center min-h-[60vh] space-y-3">
          <AlertCircle className="w-12 h-12 text-muted-foreground" />
          <p className="text-muted-foreground text-center">
            This PDF could not be displayed. Please verify the URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-8 text-center">
        <p className="text-muted-foreground mb-4">PDF Document Preview</p>
        <iframe
          src={`${src}#page=1&view=FitH`}
          className="w-full h-[60vh] rounded border border-border"
          title="PDF Preview"
          onError={handleError}
        />
      </div>
    </div>
  );
}
