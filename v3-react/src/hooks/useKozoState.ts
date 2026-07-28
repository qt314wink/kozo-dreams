import { useState, useCallback, useEffect } from 'react';
import type { AppState, ThemeMode, MotionLevel, FlowStageName, ComponentState } from '@/types/kozo';

const STORAGE_KEY = 'kozo-v3';

const defaultState: AppState = {
  theme: 'light',
  motion: 'full',
  flowStage: 'threshold',
  screenIndex: 0,
  componentState: 'idle',
  trace: [],
  traceEnabled: true,
  studioActive: false,
  studioPattern: 'seigaiha',
  studioDye: 'ai-iro',
};

function loadState(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return {
      theme: parsed.theme,
      motion: parsed.motion,
      traceEnabled: parsed.traceEnabled,
    };
  } catch {
    return {};
  }
}

function persistState(state: Pick<AppState, 'theme' | 'motion' | 'traceEnabled'>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

export function useKozoState() {
  const saved = loadState();
  const [state, setState] = useState<AppState>({
    ...defaultState,
    ...saved,
  });

  useEffect(() => {
    persistState({
      theme: state.theme,
      motion: state.motion,
      traceEnabled: state.traceEnabled,
    });
  }, [state.theme, state.motion, state.traceEnabled]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-motion', state.motion);
  }, [state.motion]);

  const setTheme = useCallback((theme: ThemeMode) => {
    setState(s => ({ ...s, theme }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState(s => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }));
  }, []);

  const setMotion = useCallback((motion: MotionLevel) => {
    setState(s => ({ ...s, motion }));
  }, []);

  const toggleMotion = useCallback(() => {
    setState(s => ({ ...s, motion: s.motion === 'full' ? 'reduced' : 'full' }));
  }, []);

  const setFlowStage = useCallback((flowStage: FlowStageName) => {
    setState(s => ({ ...s, flowStage, screenIndex: 0 }));
  }, []);

  const setScreenIndex = useCallback((screenIndex: number) => {
    setState(s => ({ ...s, screenIndex }));
  }, []);

  const setComponentState = useCallback((componentState: ComponentState) => {
    setState(s => ({ ...s, componentState }));
  }, []);

  const toggleTrace = useCallback(() => {
    setState(s => ({ ...s, traceEnabled: !s.traceEnabled }));
  }, []);

  const addTraceEvent = useCallback((event: Omit<AppState['trace'][0], 'timestamp'>) => {
    setState(s => {
      if (!s.traceEnabled) return s;
      const trace = [...s.trace, { ...event, timestamp: new Date().toISOString() }];
      if (trace.length > 40) trace.shift();
      return { ...s, trace };
    });
  }, []);

  const setStudioActive = useCallback((active: boolean) => {
    setState(s => ({ ...s, studioActive: active }));
  }, []);

  const setStudioPattern = useCallback((pattern: string) => {
    setState(s => ({ ...s, studioPattern: pattern }));
  }, []);

  const setStudioDye = useCallback((dye: AppState['studioDye']) => {
    setState(s => ({ ...s, studioDye: dye }));
  }, []);

  return {
    state,
    setTheme,
    toggleTheme,
    setMotion,
    toggleMotion,
    setFlowStage,
    setScreenIndex,
    setComponentState,
    toggleTrace,
    addTraceEvent,
    setStudioActive,
    setStudioPattern,
    setStudioDye,
  };
}
