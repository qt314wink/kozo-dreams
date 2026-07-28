// === KOZO DREAMS V3 — TYPE SYSTEM ===

export type DyeName = 'ai-iro' | 'kakishibu' | 'sakura' | 'murasaki' | 'sumi';

export interface Dye {
  name: DyeName;
  label: string;
  hex: string;
  cssVar: string;
  glowVar: string;
  temperature: 'cool' | 'warm' | 'neutral';
}

export type MotionLevel = 'full' | 'reduced';
export type ThemeMode = 'light' | 'dark';

export type ComponentState =
  | 'idle' | 'hover' | 'focus' | 'pressed'
  | 'selected' | 'success' | 'error' | 'loading' | 'disabled';

export type FlowStageName =
  | 'threshold' | 'discover' | 'compose'
  | 'refine' | 'validate' | 'govern' | 'remember';

export interface FlowStage {
  id: FlowStageName;
  label: string;
  intent: string;
  action: string;
  success: string;
  rationale: string;
  screenIds: string[];
}

export interface Screen {
  id: string;
  number: number;
  title: string;
  intent: string;
  dye: DyeName;
  tags: string[];
  components: string[];
  src: string;
  alt: string;
}

export interface MotionParameters {
  distance: number;
  duration: number;
  intensity: number;
  peel: number;
  imageScale: number;
  float: number;
}

export interface MotionBoundaries {
  translationMaxPx: number;
  imageScaleMax: number;
  durationMinMs: number;
  durationMaxMs: number;
  cardRotationMaxDeg: number;
  pressScaleMin: number;
  pressScaleMax: number;
  decorativeRotationMaxDeg: number;
}

export interface TraceEvent {
  timestamp: string;
  source: string;
  property: string;
  from: string;
  to: string;
  semanticReason: string;
  tokens: string[];
}

export interface AppState {
  theme: ThemeMode;
  motion: MotionLevel;
  flowStage: FlowStageName;
  screenIndex: number;
  componentState: ComponentState;
  trace: TraceEvent[];
  traceEnabled: boolean;
  studioActive: boolean;
  studioPattern: string;
  studioDye: DyeName;
}

export interface RegistryEntry {
  name: string;
  layer: 0 | 1 | 2 | 3 | 4;
  dye?: DyeName;
  componentStates?: ComponentState[];
  description: string;
}

export type PatternType =
  | 'seigaiha' | 'asanoha' | 'kikkou' | 'sayagata'
  | 'shippo' | 'waves' | 'sakura' | 'kumo'
  | 'custom' | 'none';

export type StudioTool =
  | 'select' | 'cut' | 'fold' | 'tessellate'
  | 'ink' | 'prism' | 'light' | 'erase';

export type TessellationType =
  | 'diamond' | 'hexagon' | 'triangle' | 'star'
  | 'cube' | 'kusudama' | 'none';

export interface StudioState {
  activeTool: StudioTool;
  pattern: PatternType;
  dye: DyeName;
  tessellation: TessellationType;
  depth: number;
  lightAngle: number;
  prismEnabled: boolean;
  inkOpacity: number;
  paperTexture: number;
  cutPaths: CutPath[];
  folds: Fold[];
}

export interface CutPath {
  id: string;
  points: [number, number][];
  type: 'kirigami' | 'silhouette' | 'window';
}

export interface Fold {
  id: string;
  x1: number; y1: number;
  x2: number; y2: number;
  angle: number;
  type: 'valley' | 'mountain';
}

export interface MaterialRecipe {
  fiberDirection: number;
  thickness: number;
  moisture: number;
  foldMemory: number;
  dye: DyeName;
}

export interface MotionProfile {
  duration: number;
  ease: string;
  distance: number;
  scale: number;
  rotate: number;
}
