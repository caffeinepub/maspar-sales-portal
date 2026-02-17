import type { CatalogItem } from './catalogTypes';
import type { BannerData } from './bannerStorage';
import { saveCatalog, loadCatalog } from './catalogStorage';
import { saveBanner, clearBanner, loadBanner } from './bannerStorage';

export interface ExportData {
  version: string;
  exportedAt: number;
  catalog: CatalogItem[];
  banner: BannerData | null;
}

// Helper to check if an item has legacy bilingual label
function hasLegacyLabel(item: any): boolean {
  return item.label && typeof item.label === 'object' && 'en' in item.label;
}

// Normalize mediaType to lowercase supported values
function normalizeMediaType(mediaType: string): string {
  const normalized = mediaType.toLowerCase().trim();
  // Map known variants to supported types
  if (['image', 'img', 'picture', 'photo'].includes(normalized)) {
    return 'image';
  }
  if (['video', 'vid', 'movie'].includes(normalized)) {
    return 'video';
  }
  if (['pdf', 'document', 'doc'].includes(normalized)) {
    return 'pdf';
  }
  // Return as-is for unsupported types (will trigger error UI in modal)
  return normalized;
}

// Sanitize and migrate a stored item (reused from catalogStorage)
export function sanitizeCatalogItem(item: any): CatalogItem {
  // Migrate legacy bilingual label
  let label = item.label;
  if (hasLegacyLabel(item)) {
    label = item.label.en || item.label.hi || 'Untitled';
  }

  // Normalize mediaType
  const mediaType = item.mediaType 
    ? normalizeMediaType(String(item.mediaType))
    : 'image'; // Default fallback

  // Ensure mediaSource is a string
  const mediaSource = item.mediaSource 
    ? String(item.mediaSource).trim()
    : '';

  return {
    id: item.id || `item-${Date.now()}`,
    title: item.title || 'Untitled',
    collection: item.collection || '',
    label,
    mediaType: mediaType as any, // Cast to allow unsupported types
    mediaSource,
    createdAt: item.createdAt || Date.now()
  };
}

export function exportData(): ExportData {
  const catalog = loadCatalog();
  const banner = loadBanner();

  return {
    version: '1.0',
    exportedAt: Date.now(),
    catalog: catalog || [],
    banner: banner || null
  };
}

export function downloadExportFile(data: ExportData): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `maspar-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ImportResult {
  success: boolean;
  error?: string;
  catalogCount?: number;
  hasBanner?: boolean;
}

export function validateImportData(data: any): ImportResult {
  try {
    // Check if data is an object
    if (!data || typeof data !== 'object') {
      return { success: false, error: 'Invalid file format: not a valid JSON object' };
    }

    // Check for required fields
    if (!('catalog' in data)) {
      return { success: false, error: 'Invalid file format: missing catalog data' };
    }

    // Validate catalog is an array
    if (!Array.isArray(data.catalog)) {
      return { success: false, error: 'Invalid file format: catalog must be an array' };
    }

    // Validate banner if present
    if (data.banner !== null && data.banner !== undefined) {
      if (typeof data.banner !== 'object') {
        return { success: false, error: 'Invalid file format: banner must be an object or null' };
      }
      if (data.banner && !data.banner.imageData) {
        return { success: false, error: 'Invalid file format: banner missing imageData' };
      }
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to validate import data' };
  }
}

export function importData(data: ExportData): ImportResult {
  try {
    // Validate first
    const validation = validateImportData(data);
    if (!validation.success) {
      return validation;
    }

    // Sanitize catalog items
    const sanitizedCatalog = data.catalog
      .filter((item: any) => item && typeof item === 'object')
      .map(sanitizeCatalogItem);

    // Save catalog (this will broadcast change events)
    saveCatalog(sanitizedCatalog);

    // Handle banner
    if (data.banner && data.banner.imageData) {
      saveBanner(data.banner);
    } else {
      clearBanner();
    }

    return {
      success: true,
      catalogCount: sanitizedCatalog.length,
      hasBanner: !!data.banner
    };
  } catch (error) {
    console.error('Import failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during import'
    };
  }
}

export function parseImportFile(file: File): Promise<ExportData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text);
        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse JSON file. Please ensure the file is a valid Maspar export.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
}
