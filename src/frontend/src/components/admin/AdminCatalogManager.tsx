import type { CatalogItem } from '../../lib/catalogTypes';
import { UI_TEXT } from '../../lib/uiText';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Trash2 } from 'lucide-react';

interface AdminCatalogManagerProps {
  items: CatalogItem[];
  onRemove: (id: string) => void;
}

export function AdminCatalogManager({ items, onRemove }: AdminCatalogManagerProps) {
  const handleRemove = (id: string, title: string) => {
    if (window.confirm(`${UI_TEXT.admin.confirmRemove}\n\n"${title}"`)) {
      onRemove(id);
    }
  };

  return (
    <Card className="glass-strong">
      <CardHeader>
        <CardTitle>{UI_TEXT.admin.catalogTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {UI_TEXT.public.noItems}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="uppercase text-xs">{item.mediaType}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemove(item.id, item.title)}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        {UI_TEXT.admin.removeButton}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
