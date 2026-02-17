export const DEFAULT_COLLECTIONS = [
  { id: 'colorart', name: 'Colorart', icon: '🎨' },
  { id: 'bedding', name: 'Bedding', icon: '🛏️' },
  { id: 'cushions', name: 'Cushions', icon: '🛋️' }
];

export function getCollections(catalogItems: { collection: string }[]): typeof DEFAULT_COLLECTIONS {
  const uniqueCollections = new Set(catalogItems.map(item => item.collection));
  const collections = DEFAULT_COLLECTIONS.filter(col => uniqueCollections.has(col.id));
  
  // Ensure all default collections exist
  const existingIds = new Set(collections.map(c => c.id));
  DEFAULT_COLLECTIONS.forEach(col => {
    if (!existingIds.has(col.id)) {
      collections.push(col);
    }
  });
  
  return collections;
}
