import { useState } from 'react';
import type { MediaType } from '../../lib/catalogTypes';
import { PREDEFINED_LABELS } from '../../lib/predefinedLabels';
import { UI_TEXT } from '../../lib/uiText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, AlertCircle } from 'lucide-react';

interface AdminUploadFormProps {
  onAdd: (item: {
    title: string;
    collection: string;
    label: string;
    mediaType: MediaType;
    mediaSource: string;
  }) => void;
}

export function AdminUploadForm({ onAdd }: AdminUploadFormProps) {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [mediaSource, setMediaSource] = useState('');
  const [pdfEmbedError, setPdfEmbedError] = useState(false);

  const handlePredefinedLabelSelect = (value: string) => {
    setLabel(value);
  };

  // Basic URL validation
  const isValidUrl = (url: string): boolean => {
    if (!url || url.trim().length === 0) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const urlIsValid = isValidUrl(mediaSource);
  const showUrlError = mediaSource.length > 0 && !urlIsValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submission if URL is invalid
    if (!urlIsValid) {
      return;
    }

    onAdd({
      title,
      collection: 'colorart', // Apply default collection internally
      label,
      mediaType,
      mediaSource
    });

    // Reset form
    setTitle('');
    setLabel('');
    setMediaSource('');
    setPdfEmbedError(false);
  };

  return (
    <Card className="glass-strong">
      <CardHeader>
        <CardTitle>{UI_TEXT.admin.uploadTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{UI_TEXT.admin.formTitle}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="predefinedLabel">{UI_TEXT.admin.formPredefinedLabel}</Label>
            <Select value={label} onValueChange={handlePredefinedLabelSelect}>
              <SelectTrigger id="predefinedLabel">
                <SelectValue placeholder="Select a label..." />
              </SelectTrigger>
              <SelectContent>
                {PREDEFINED_LABELS.map((labelOption) => (
                  <SelectItem key={labelOption} value={labelOption}>
                    {labelOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">{UI_TEXT.admin.formLabel}</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mediaType">{UI_TEXT.admin.formMediaType}</Label>
              <Select value={mediaType} onValueChange={(v) => setMediaType(v as MediaType)}>
                <SelectTrigger id="mediaType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mediaSource">{UI_TEXT.admin.formMediaSource}</Label>
              <Input
                id="mediaSource"
                type="url"
                value={mediaSource}
                onChange={(e) => {
                  setMediaSource(e.target.value);
                  setPdfEmbedError(false);
                }}
                placeholder="https://..."
                required
              />
              {showUrlError && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span>Please enter a valid URL starting with http:// or https://</span>
                </div>
              )}
            </div>
          </div>

          {mediaSource && urlIsValid && (
            <div className="space-y-2">
              <Label>{UI_TEXT.admin.formPreview}</Label>
              <div className="glass rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                {mediaType === 'image' && (
                  <img
                    src={mediaSource}
                    alt="Preview"
                    className="max-h-[300px] rounded no-drag"
                    draggable={false}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="flex flex-col items-center space-y-2 text-muted-foreground"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>Image could not be loaded</span></div>';
                      }
                    }}
                  />
                )}
                {mediaType === 'video' && (
                  <video
                    src={mediaSource}
                    controls
                    className="max-h-[300px] rounded"
                    controlsList="nodownload"
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="flex flex-col items-center space-y-2 text-muted-foreground"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>Video could not be loaded</span></div>';
                      }
                    }}
                  />
                )}
                {mediaType === 'pdf' && !pdfEmbedError && (
                  <div className="w-full">
                    <iframe
                      src={`${mediaSource}#page=1&view=FitH`}
                      className="w-full h-[300px] rounded border border-border"
                      title="PDF Preview"
                      onError={() => setPdfEmbedError(true)}
                    />
                  </div>
                )}
                {mediaType === 'pdf' && pdfEmbedError && (
                  <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                    <AlertCircle className="w-8 h-8" />
                    <p className="text-center">
                      PDF preview cannot be displayed in this browser.
                      <br />
                      The PDF will be available in the public viewer.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full gap-2" disabled={!urlIsValid}>
            <Plus className="w-4 h-4" />
            {UI_TEXT.admin.addButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
