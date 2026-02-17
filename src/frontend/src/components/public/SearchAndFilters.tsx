import { useState, useEffect } from 'react';
import type { LabelLanguage } from '../../lib/catalogTypes';
import { getLabelLanguage, setLabelLanguage } from '../../lib/labelLanguage';
import { UI_TEXT } from '../../lib/uiText';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Search } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCollection: string;
  onCollectionChange: (collection: string) => void;
  collections: Array<{ id: string; name: string }>;
  language: LabelLanguage;
  onLanguageChange: (lang: LabelLanguage) => void;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCollection,
  onCollectionChange,
  collections,
  language,
  onLanguageChange
}: SearchAndFiltersProps) {
  const handleLanguageToggle = (checked: boolean) => {
    const newLang: LabelLanguage = checked ? 'hi' : 'en';
    onLanguageChange(newLang);
    setLabelLanguage(newLang);
  };

  return (
    <div className="glass-strong rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={UI_TEXT.public.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCollection} onValueChange={onCollectionChange}>
          <SelectTrigger>
            <SelectValue placeholder={UI_TEXT.public.filterCollection} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{UI_TEXT.public.allCollections}</SelectItem>
            {collections.map((col) => (
              <SelectItem key={col.id} value={col.id}>
                {col.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Label htmlFor="language-toggle" className="text-sm">
          {UI_TEXT.public.languageToggle}:
        </Label>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${language === 'en' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
            EN
          </span>
          <Switch
            id="language-toggle"
            checked={language === 'hi'}
            onCheckedChange={handleLanguageToggle}
          />
          <span className={`text-sm ${language === 'hi' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
            HI
          </span>
        </div>
      </div>
    </div>
  );
}
