import { useState } from 'react';
import type { MediaType } from '../../lib/catalogTypes';
import { PREDEFINED_LABELS } from '../../lib/predefinedLabels';
import { UI_TEXT } from '../../lib/uiText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus } from 'lucide-react';

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

  const handlePredefinedLabelSelect = (value: string) => {
    setLabel(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
                onChange={(e) => setMediaSource(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>
          </div>

          {mediaSource && (
            <div className="space-y-2">
              <Label>{UI_TEXT.admin.formPreview}</Label>
              <div className="glass rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                {mediaType === 'image' && (
                  <img
                    src={mediaSource}
                    alt="Preview"
                    className="max-h-[300px] rounded no-drag"
                    draggable={false}
                  />
                )}
                {mediaType === 'video' && (
                  <video
                    src={mediaSource}
                    controls
                    className="max-h-[300px] rounded"
                    controlsList="nodownload"
                  />
                )}
                {mediaType === 'pdf' && (
                  <div className="text-center text-muted-foreground">
                    <p>PDF: {mediaSource}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full gap-2">
            <Plus className="w-4 h-4" />
            {UI_TEXT.admin.addButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
