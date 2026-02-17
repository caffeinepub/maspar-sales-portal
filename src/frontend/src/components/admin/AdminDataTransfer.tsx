import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Download, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { UI_TEXT } from '../../lib/uiText';
import { exportData, downloadExportFile, parseImportFile, importData, type ImportResult } from '../../lib/dataTransfer';

export function AdminDataTransfer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const data = exportData();
      downloadExportFile(data);
    } catch (error) {
      console.error('Export failed:', error);
      setImportResult({
        success: false,
        error: 'Failed to export data. Please try again.'
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResult(null);
    }
  };

  const handleImportClick = () => {
    if (!selectedFile) return;
    setShowConfirmDialog(true);
  };

  const handleConfirmImport = async () => {
    if (!selectedFile) return;

    setShowConfirmDialog(false);
    setIsImporting(true);
    setImportResult(null);

    try {
      const data = await parseImportFile(selectedFile);
      const result = importData(data);
      setImportResult(result);
      
      if (result.success) {
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      setImportResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to import data'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleCancelImport = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Card className="glass-strong border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {UI_TEXT.admin.dataTransfer.title}
          </CardTitle>
          <CardDescription>
            {UI_TEXT.admin.dataTransfer.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Export Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">{UI_TEXT.admin.dataTransfer.exportTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {UI_TEXT.admin.dataTransfer.exportDescription}
            </p>
            <Button onClick={handleExport} className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              {UI_TEXT.admin.dataTransfer.exportButton}
            </Button>
          </div>

          <div className="border-t border-border/50 my-4" />

          {/* Import Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">{UI_TEXT.admin.dataTransfer.importTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {UI_TEXT.admin.dataTransfer.importDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                className="flex-1"
              />
              <Button
                onClick={handleImportClick}
                disabled={!selectedFile || isImporting}
                className="w-full sm:w-auto"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isImporting ? UI_TEXT.admin.dataTransfer.importing : UI_TEXT.admin.dataTransfer.importButton}
              </Button>
            </div>
          </div>

          {/* Import Result Messages */}
          {importResult && (
            <Alert variant={importResult.success ? 'default' : 'destructive'}>
              {importResult.success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {importResult.success ? (
                  <>
                    {UI_TEXT.admin.dataTransfer.importSuccess}
                    {importResult.catalogCount !== undefined && (
                      <> {importResult.catalogCount} {UI_TEXT.admin.dataTransfer.itemsImported}</>
                    )}
                    {importResult.hasBanner && <> {UI_TEXT.admin.dataTransfer.bannerImported}</>}
                  </>
                ) : (
                  importResult.error || UI_TEXT.admin.dataTransfer.importError
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{UI_TEXT.admin.dataTransfer.confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {UI_TEXT.admin.dataTransfer.confirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelImport}>
              {UI_TEXT.admin.dataTransfer.cancelButton}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmImport}>
              {UI_TEXT.admin.dataTransfer.confirmButton}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
