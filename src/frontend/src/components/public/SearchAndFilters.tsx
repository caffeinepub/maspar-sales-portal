import { UI_TEXT } from '../../lib/uiText';
import { PREDEFINED_LABELS } from '../../lib/predefinedLabels';
import { getLabelThumbnail } from '../../lib/labelThumbnails';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLabel: string;
  onLabelChange: (label: string) => void;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedLabel,
  onLabelChange
}: SearchAndFiltersProps) {
  const selectedThumbnail = selectedLabel !== 'all' ? getLabelThumbnail(selectedLabel) : undefined;

  return (
    <div className="glass-strong rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={UI_TEXT.public.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedLabel} onValueChange={onLabelChange}>
          <SelectTrigger>
            <SelectValue>
              {selectedLabel === 'all' ? (
                UI_TEXT.public.allLabels
              ) : (
                <div className="flex items-center gap-2">
                  {selectedThumbnail && (
                    <img
                      src={selectedThumbnail}
                      alt={selectedLabel}
                      className="w-6 h-6 rounded object-cover no-drag"
                      draggable={false}
                    />
                  )}
                  <span>{selectedLabel}</span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{UI_TEXT.public.allLabels}</SelectItem>
            {PREDEFINED_LABELS.map((label) => {
              const thumbnail = getLabelThumbnail(label);
              return (
                <SelectItem key={label} value={label}>
                  <div className="flex items-center gap-2">
                    {thumbnail && (
                      <img
                        src={thumbnail}
                        alt={label}
                        className="w-6 h-6 rounded object-cover no-drag"
                        draggable={false}
                      />
                    )}
                    <span>{label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
