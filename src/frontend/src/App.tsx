import { MasparLayout } from './components/layout/MasparLayout';
import { AdminGate } from './components/admin/AdminGate';
import { AdminArea } from './components/admin/AdminArea';
import { PublicViewer } from './components/public/PublicViewer';
import { useCatalog } from './hooks/useCatalog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { UI_TEXT } from './lib/uiText';
import { Eye, Shield } from 'lucide-react';

function App() {
  const { items, isLoading, addItem, removeItem } = useCatalog();

  const handleAddItem = (itemData: {
    title: string;
    collection: string;
    label: { en: string; hi: string };
    mediaType: 'pdf' | 'video' | 'image';
    mediaSource: string;
  }) => {
    const newItem = {
      ...itemData,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now()
    };
    addItem(newItem);
  };

  if (isLoading) {
    return (
      <MasparLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading catalog...</p>
          </div>
        </div>
      </MasparLayout>
    );
  }

  return (
    <MasparLayout>
      <Tabs defaultValue="public" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-strong mb-6">
          <TabsTrigger value="public" className="gap-2">
            <Eye className="w-4 h-4" />
            {UI_TEXT.navigation.publicViewer}
          </TabsTrigger>
          <TabsTrigger value="admin" className="gap-2">
            <Shield className="w-4 h-4" />
            {UI_TEXT.navigation.admin}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="public">
          <PublicViewer items={items} />
        </TabsContent>

        <TabsContent value="admin">
          <AdminGate>
            <AdminArea
              items={items}
              onAdd={handleAddItem}
              onRemove={removeItem}
            />
          </AdminGate>
        </TabsContent>
      </Tabs>
    </MasparLayout>
  );
}

export default App;
