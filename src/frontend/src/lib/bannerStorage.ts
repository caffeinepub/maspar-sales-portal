const BANNER_STORAGE_KEY = 'maspar_new_arrivals_banner';

export interface BannerData {
  imageData: string;
  width: number;
  height: number;
  uploadedAt: number;
}

export function loadBanner(): BannerData | null {
  try {
    const stored = localStorage.getItem(BANNER_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as BannerData;
  } catch (error) {
    console.error('Failed to load banner:', error);
    return null;
  }
}

export function saveBanner(banner: BannerData): void {
  try {
    localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(banner));
  } catch (error) {
    console.error('Failed to save banner:', error);
    throw error;
  }
}

export function clearBanner(): void {
  try {
    localStorage.removeItem(BANNER_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear banner:', error);
  }
}
