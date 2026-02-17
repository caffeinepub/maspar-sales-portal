import type { LabelLanguage } from './catalogTypes';

const LANGUAGE_STORAGE_KEY = 'maspar_label_language';

export function getLabelLanguage(): LabelLanguage {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (stored === 'hi' ? 'hi' : 'en') as LabelLanguage;
  } catch (error) {
    return 'en';
  }
}

export function setLabelLanguage(lang: LabelLanguage): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.error('Failed to save language preference:', error);
  }
}
