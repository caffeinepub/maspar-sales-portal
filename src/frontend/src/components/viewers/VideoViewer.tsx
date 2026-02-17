interface VideoViewerProps {
  src: string;
}

export function VideoViewer({ src }: VideoViewerProps) {
  return (
    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
      <video
        src={src}
        controls
        controlsList="nodownload"
        className="w-full h-full"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
