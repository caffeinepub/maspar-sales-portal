interface PdfFirstPagePreviewProps {
  src: string;
}

export function PdfFirstPagePreview({ src }: PdfFirstPagePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-8 text-center">
        <p className="text-muted-foreground mb-4">PDF Document Preview</p>
        <iframe
          src={`${src}#page=1&view=FitH`}
          className="w-full h-[60vh] rounded border border-border"
          title="PDF Preview"
        />
      </div>
    </div>
  );
}
