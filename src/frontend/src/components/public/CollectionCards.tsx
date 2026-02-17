import { Card, CardContent } from '../ui/card';

interface Collection {
  id: string;
  name: string;
  icon: string;
}

interface CollectionCardsProps {
  collections: Collection[];
  selectedCollection: string;
  onSelectCollection: (id: string) => void;
  itemCounts: Record<string, number>;
}

export function CollectionCards({
  collections,
  selectedCollection,
  onSelectCollection,
  itemCounts
}: CollectionCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {collections.map((collection) => (
        <Card
          key={collection.id}
          className={`glass cursor-pointer transition-lift ${
            selectedCollection === collection.id
              ? 'ring-2 ring-primary shadow-glass'
              : 'hover:shadow-glass'
          }`}
          onClick={() => onSelectCollection(collection.id)}
        >
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">{collection.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{collection.name}</h3>
            <p className="text-sm text-muted-foreground">
              {itemCounts[collection.id] || 0} items
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
