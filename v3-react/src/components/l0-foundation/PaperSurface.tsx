import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PaperSurfaceProps {
  variant?: 'paper' | 'deckle' | 'washi' | 'night';
  children: React.ReactNode;
  className?: string;
  depth?: number;
  interactive?: boolean;
}

export const PaperSurface = forwardRef<HTMLDivElement, PaperSurfaceProps>(
  ({ variant = 'paper', children, className, depth = 0, interactive = false }, ref) => {
    const depthShadow = depth > 0 ? { boxShadow: `0 ${4 + depth * 4}px ${12 + depth * 12}px rgba(58,42,27,${0.06 + depth * 0.04})` } : {};
    const variants = { paper: 'bg-kozo-shironeri', deckle: 'bg-kozo-cream', washi: 'bg-kozo-fog', night: 'bg-kozo-night text-kozo-shironeri' };
    return (
      <div ref={ref} className={cn('relative rounded-paper overflow-hidden', variants[variant], interactive && 'transition-shadow duration-300 ease-paper', className)} style={depthShadow}>
        {children}
      </div>
    );
  }
);
PaperSurface.displayName = 'PaperSurface';
