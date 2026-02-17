import { useState, useEffect } from 'react';
import { loadBanner, saveBanner, clearBanner, subscribeToBannerChanges, type BannerData } from '../../lib/bannerStorage';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const REQUIRED_WIDTH = 1280;
const REQUIRED_HEIGHT = 720;

// TODO: User request contained incomplete fragment "and remove the" - 
// Unable to determine what specific UI element or text should be removed.
// If clarification is needed, please specify what should be removed and from which component.

export function AdminBannerManager() {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setBanner(loadBanner());
  }, []);

  // Subscribe to banner changes for real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToBannerChanges((newBanner) => {
      setBanner(newBanner);
    });

    return unsubscribe;
  }, []);

  const validateAndUploadImage = (file: File) => {
    setError('');
    setSuccess('');
    setIsUploading(true);

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      img.src = result;

      img.onload = () => {
        if (img.width !== REQUIRED_WIDTH || img.height !== REQUIRED_HEIGHT) {
          setError(`Image must be exactly ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT} pixels. Your image is ${img.width}x${img.height} pixels.`);
          setIsUploading(false);
          return;
        }

        const newBanner: BannerData = {
          imageData: result,
          width: img.width,
          height: img.height,
          uploadedAt: Date.now()
        };

        try {
          saveBanner(newBanner);
          setSuccess('Banner uploaded successfully!');
          setIsUploading(false);
        } catch (err) {
          setError('Failed to save banner. Please try again.');
          setIsUploading(false);
        }
      };

      img.onerror = () => {
        setError('Failed to load image. Please try a different file.');
        setIsUploading(false);
      };
    };

    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    validateAndUploadImage(file);
  };

  const handleRemoveBanner = () => {
    clearBanner();
    setSuccess('Banner removed successfully.');
    setError('');
  };

  return (
    <div className="glass rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">New Arrivals Banner</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="banner-upload" className="text-sm font-medium">
            Upload Banner Image ({REQUIRED_WIDTH}x{REQUIRED_HEIGHT} px)
          </Label>
          <p className="text-xs text-muted-foreground mt-1 mb-2">
            Image must be exactly {REQUIRED_WIDTH}x{REQUIRED_HEIGHT} pixels
          </p>
          <Input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="cursor-pointer"
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-500 text-green-700 dark:text-green-400">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {banner && (
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img
                src={banner.imageData}
                alt="New Arrivals Banner Preview"
                className="w-full h-auto"
              />
              <div className="absolute top-2 right-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveBanner}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Uploaded: {new Date(banner.uploadedAt).toLocaleString()} • {banner.width}x{banner.height} px
            </p>
          </div>
        )}

        {!banner && !isUploading && (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No banner uploaded yet. Upload a {REQUIRED_WIDTH}x{REQUIRED_HEIGHT} px image to display on the home page.
            </p>
          </div>
        )}

        {isUploading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Validating and uploading banner...</p>
          </div>
        )}
      </div>
    </div>
  );
}
