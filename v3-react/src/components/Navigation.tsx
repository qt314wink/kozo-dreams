import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import type { ThemeMode, MotionLevel } from '@/types/kozo';
import { Moon, Sun, Wind, Menu, X } from 'lucide-react';

interface NavigationProps {
  theme: ThemeMode;
  motion: MotionLevel;
  onToggleTheme: () => void;
  onToggleMotion: () => void;
  onNavigate: (id: string) => void;
  onOpenStudio: () => void;
}

const NAV_LINKS: { label: string; href?: string; action?: string }[] = [
  { label: 'Flow', href: '#flow' },
  { label: 'Screens', href: '#screens' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Studio', action: 'studio' },
  { label: 'Motion', href: '#motion' },
  { label: 'Ledger', href: '#ledger' },
];

export function Navigation({ theme, motion: motionLevel, onToggleTheme, onToggleMotion, onNavigate, onOpenStudio }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={cn('fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-8 transition-all duration-300 ease-paper',
          scrolled ? 'bg-kozo-shironeri/95 backdrop-blur-xl shadow-sm border-b border-kozo-fog/50' : 'bg-transparent')}
        role="navigation" aria-label="Main navigation">
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('hero'); }} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-kozo-murasaki flex items-center justify-center text-white font-display text-sm shadow-[0_0_12px_rgba(119,66,141,0.35)] group-hover:scale-110 transition-transform">K</div>
          <div className="hidden sm:flex items-baseline gap-2">
            <span className="font-display font-semibold text-sm tracking-wider">Kozo Dreams</span>
            <span className="text-[10px] font-mono opacity-40">v3.0.1</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button key={link.label} onClick={() => { if (link.action === 'studio') onOpenStudio(); else if (link.href) onNavigate(link.href.slice(1)); }}
              className={cn('px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest rounded-paper transition-all duration-200 ease-paper opacity-60 hover:opacity-100 hover:bg-kozo-cream focus-visible:outline-none min-h-[32px]', link.action === 'studio' && 'text-kozo-murasaki opacity-100')}>
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onToggleMotion} aria-label={motionLevel === 'full' ? 'Reduce motion' : 'Enable full motion'} aria-pressed={motionLevel === 'reduced'}
            className={cn('w-9 h-9 rounded-full flex items-center justify-center transition-all bg-kozo-fog/50 hover:bg-kozo-cream focus-visible:outline-none', motionLevel === 'reduced' && 'text-kozo-kakishibu')}>
            <Wind className="w-4 h-4" />
          </button>
          <button onClick={onToggleTheme} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all bg-kozo-fog/50 hover:bg-kozo-cream focus-visible:outline-none">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-kozo-fog/50 hover:bg-kozo-cream focus-visible:outline-none">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-16 z-40 bg-kozo-shironeri/98 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col p-6 gap-2">
              {NAV_LINKS.map(link => (
                <button key={link.label} onClick={() => { setMobileOpen(false); if (link.action === 'studio') onOpenStudio(); else if (link.href) onNavigate(link.href.slice(1)); }}
                  className="text-left px-4 py-3 font-display text-lg rounded-paper hover:bg-kozo-cream transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
