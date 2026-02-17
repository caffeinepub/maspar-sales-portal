const BANNER_STORAGE_KEY = 'maspar_new_arrivals_banner';
const BANNER_CHANGE_EVENT = 'maspar-banner-change';

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
    // Broadcast banner change event for in-app synchronization
    window.dispatchEvent(new CustomEvent(BANNER_CHANGE_EVENT, { detail: banner }));
  } catch (error) {
    console.error('Failed to save banner:', error);
    throw error;
  }
}

export function clearBanner(): void {
  try {
    localStorage.removeItem(BANNER_STORAGE_KEY);
    // Broadcast banner removal event for in-app synchronization
    window.dispatchEvent(new CustomEvent(BANNER_CHANGE_EVENT, { detail: null }));
  } catch (error) {
    console.error('Failed to clear banner:', error);
  }
}

// Subscribe to banner changes (both in-app and cross-tab)
export function subscribeToBannerChanges(callback: (banner: BannerData | null) => void): () => void {
  const handleCustomEvent = (e: Event) => {
    const customEvent = e as CustomEvent<BannerData | null>;
    callback(customEvent.detail);
  };

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === BANNER_STORAGE_KEY) {
      callback(e.newValue ? JSON.parse(e.newValue) : null);
    }
  };

  window.addEventListener(BANNER_CHANGE_EVENT, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener(BANNER_CHANGE_EVENT, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
  };
}
