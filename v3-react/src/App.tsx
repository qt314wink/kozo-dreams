import { useCallback, useEffect, useState } from 'react';
import { useKozoState } from '@/hooks/useKozoState';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/sections/HeroSection';
import { OrientationSection } from '@/sections/OrientationSection';
import { StudioSection } from '@/sections/StudioSection';
import { FlowSection } from '@/sections/FlowSection';
import { ScreensSection } from '@/sections/ScreensSection';
import { ArchitectureSection } from '@/sections/ArchitectureSection';
import { MotionSection } from '@/sections/MotionSection';
import { LedgerSection } from '@/sections/LedgerSection';
import { ConversionSection } from '@/sections/ConversionSection';
import { ClosingSection } from '@/sections/ClosingSection';
import { Footer } from '@/sections/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import './App.css';

function App() {
  const {
    state,
    toggleTheme,
    toggleMotion,
    setFlowStage,
    addTraceEvent,
    setStudioActive,
  } = useKozoState();

  const [studioModalOpen, setStudioModalOpen] = useState(false);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    addTraceEvent({ source: 'navigation', property: 'scroll', from: 'current', to: id, semanticReason: `User navigated to #${id}`, tokens: ['semantic.navigation.scroll'] });
  }, [addTraceEvent]);

  const handleOpenStudio = useCallback(() => {
    setStudioModalOpen(true);
    setStudioActive(true);
    addTraceEvent({ source: 'studio', property: 'modal', from: 'closed', to: 'open', semanticReason: 'User opened the Pattern Atelier studio', tokens: ['semantic.studio.open'] });
  }, [setStudioActive, addTraceEvent]);

  const handleCloseStudio = useCallback(() => {
    setStudioModalOpen(false);
    setStudioActive(false);
  }, [setStudioActive]);

  const handleTrace = useCallback((source: string, property: string, from: string, to: string, reason: string, tokens: string[]) => {
    addTraceEvent({ source, property, from, to, semanticReason: reason, tokens });
  }, [addTraceEvent]);

  useEffect(() => {
    console.log('%c Kozo Dreams v3 ', 'font-size:20px;font-weight:bold;color:#77428D;background:#F5F0E8;padding:4px 12px;border-radius:4px;');
    console.log('%c30 components. 5 sacred dyes. 1 studio. Full accessibility.', 'font-size:11px;color:#165E83;');
  }, []);

  return (
    <div className="paper-texture min-h-screen">
      <a href="#main" className="skip-link">Skip to main content</a>

      <Navigation
        theme={state.theme}
        motion={state.motion}
        onToggleTheme={toggleTheme}
        onToggleMotion={toggleMotion}
        onNavigate={handleNavigate}
        onOpenStudio={handleOpenStudio}
      />

      <main id="main">
        <HeroSection onNavigate={handleNavigate} onOpenStudio={handleOpenStudio} />
        <OrientationSection />
        <StudioSection />
        <FlowSection
          flowStage={state.flowStage}
          screenIndex={state.screenIndex}
          onFlowStageChange={setFlowStage}
        />
        <ScreensSection />
        <ArchitectureSection />
        <MotionSection
          motionLevel={state.motion}
          onToggleMotion={toggleMotion}
          onTrace={handleTrace}
        />
        <LedgerSection
          trace={state.trace}
          traceEnabled={state.traceEnabled}
          onToggleTrace={() => {}}
        />
        <ConversionSection />
        <ClosingSection />
      </main>

      <Footer />

      <AnimatePresence>
        {studioModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-kozo-night/60 backdrop-blur-sm"
            onClick={handleCloseStudio}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-4 md:inset-8 lg:inset-12 bg-kozo-shironeri rounded-panel shadow-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-kozo-fog/50 bg-kozo-cream/50">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-semibold">Pattern Atelier</span>
                  <span className="text-[10px] font-mono opacity-40">Studio Mode</span>
                </div>
                <button
                  onClick={handleCloseStudio}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-kozo-fog/50 hover:bg-kozo-fog transition-colors focus-visible:outline-none"
                  aria-label="Close studio"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 md:p-6">
                <StudioLazy />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { lazy, Suspense } from 'react';
const StudioCanvas = lazy(() => import('@/components/studio/StudioCanvas').then(m => ({ default: m.StudioCanvas })));

function StudioLazy() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-kozo-murasaki/30 border-t-kozo-murasaki rounded-full animate-spin mx-auto" />
          <p className="text-sm opacity-50 font-mono">Loading Studio...</p>
        </div>
      </div>
    }>
      <StudioCanvas />
    </Suspense>
  );
}

export default App;
