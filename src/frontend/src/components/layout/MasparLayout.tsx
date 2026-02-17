import { ReactNode } from 'react';
import { Background } from './Background';
import { UI_TEXT } from '../../lib/uiText';
import { SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Heart } from 'lucide-react';

interface MasparLayoutProps {
  children: ReactNode;
}

export function MasparLayout({ children }: MasparLayoutProps) {
  const appIdentifier = encodeURIComponent(window.location.hostname || 'maspar-portal');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      
      {/* Header */}
      <header className="maspar-gradient text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
              <img 
                src="/assets/Maspar  logo.png" 
                alt="Maspar Logo" 
                className="h-12 md:h-16 w-auto object-contain flex-shrink-0 no-select no-drag"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-bold tracking-tight truncate">
                  {UI_TEXT.header.title}
                </h1>
                <p className="text-xs md:text-base text-white/90 mt-1 truncate">
                  {UI_TEXT.header.subtitle}
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <SiFacebook size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <SiInstagram size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <SiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1.5">
              {UI_TEXT.footer.builtWith}{' '}
              <Heart className="w-4 h-4 text-primary fill-primary" />{' '}
              {UI_TEXT.footer.using}{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
            <p>© {new Date().getFullYear()} Maspar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
