import type { Dye, FlowStage, Screen, RegistryEntry, MotionBoundaries } from '@/types/kozo';

export const DYES: Dye[] = [
  { name: 'ai-iro', label: 'Ai-Iro', hex: '#165E83', cssVar: '--kozo-ai-iro', glowVar: '--kozo-glow-ai', temperature: 'cool' },
  { name: 'kakishibu', label: 'Kakishibu', hex: '#8B4513', cssVar: '--kozo-kakishibu', glowVar: '--kozo-glow-kaki', temperature: 'warm' },
  { name: 'sakura', label: 'Sakura', hex: '#FEDCDB', cssVar: '--kozo-sakura', glowVar: '--kozo-glow-sakura', temperature: 'warm' },
  { name: 'murasaki', label: 'Kyo-Murasaki', hex: '#77428D', cssVar: '--kozo-murasaki', glowVar: '--kozo-glow-murasaki', temperature: 'cool' },
  { name: 'sumi', label: 'Sumi', hex: '#1A1A1A', cssVar: '--kozo-sumi', glowVar: '--kozo-glow-sumi', temperature: 'neutral' },
];

export const FLOW_STAGES: FlowStage[] = [
  {
    id: 'threshold', label: 'Threshold',
    intent: 'Enter the system', action: 'Scroll past the opening',
    success: 'User has seen the hero and evidence strip',
    rationale: 'The first encounter establishes trust through restrained motion',
    screenIds: ['01-opening-page'],
  },
  {
    id: 'discover', label: 'Discover',
    intent: 'Understand what the system is', action: 'Read the orientation section',
    success: 'User has seen the four reference explanations',
    rationale: 'Context before control — users need to know the story',
    screenIds: ['02-collection'],
  },
  {
    id: 'compose', label: 'Compose',
    intent: 'Create something new', action: 'Interact with the pattern atelier',
    success: 'User has composed a pattern in studio mode',
    rationale: 'Composition is the core creative act of the system',
    screenIds: ['03-pattern-atelier'],
  },
  {
    id: 'refine', label: 'Refine',
    intent: 'Tune the design', action: 'Adjust dye, depth, and tessellation',
    success: 'User has customized their pattern with material controls',
    rationale: 'Refinement transforms a template into personal expression',
    screenIds: ['04-refine-detail'],
  },
  {
    id: 'validate', label: 'Validate',
    intent: 'Check accessibility and motion', action: 'Open the motion lab',
    success: 'User has verified component states and boundaries',
    rationale: 'Validation ensures the design works for everyone',
    screenIds: ['05-govern-motion'],
  },
  {
    id: 'govern', label: 'Govern',
    intent: 'Export and use the design', action: 'Click export or copy tokens',
    success: 'User has exported their pattern or copied a token',
    rationale: 'Governance is how patterns survive beyond the session',
    screenIds: ['06-convert-apply', '07-export-dashboard'],
  },
  {
    id: 'remember', label: 'Remember',
    intent: 'Leave with the story', action: 'Read the closing narrative',
    success: 'User has seen the manifesto and conversion section',
    rationale: 'Memory transforms a tool into a lasting impression',
    screenIds: ['08-about-manifesto', '09-scroll-story', '10-night-garden'],
  },
];

export const SCREENS: Screen[] = [
  { id: '01-opening-page', number: 1, title: 'Opening Page', intent: 'Establish atmosphere', dye: 'murasaki', tags: ['hero', 'atmosphere'], components: ['HeroScreenFrame', 'PaperButton', 'SeigaihaBackground', 'DragonflyFloat'], src: '/screens/01-opening-page.webp', alt: 'Opening page with layered seigaiha waves, floating dragonflies, and hero typography on cream washi paper' },
  { id: '02-collection', number: 2, title: 'Pattern Collection', intent: 'Browse discovered patterns', dye: 'ai-iro', tags: ['collection', 'browse'], components: ['PatternCard', 'FilterChip', 'KirigamiCard', 'TokenBadge'], src: '/screens/02-collection.webp', alt: 'Grid of washi pattern cards showing seigaiha, asanoha, and kikkou motifs with dye-colored accents' },
  { id: '03-pattern-atelier', number: 3, title: 'Pattern Atelier', intent: 'Compose new patterns', dye: 'sakura', tags: ['studio', 'compose'], components: ['StudioCanvas', 'PatternControls', 'TessellationSelector', 'DyeSlider'], src: '/screens/03-pattern-atelier.webp', alt: 'Interactive studio canvas with live pattern preview, material controls sidebar, and tessellation options' },
  { id: '04-refine-detail', number: 4, title: 'Refine Detail', intent: 'Adjust pattern parameters', dye: 'kakishibu', tags: ['refine', 'detail'], components: ['DetailInspector', 'RangeControl', 'StateLabel', 'PaperPreview'], src: '/screens/04-refine-detail.webp', alt: 'Split view showing pattern refinement controls on the left and live preview with paper texture on the right' },
  { id: '05-govern-motion', number: 5, title: 'Govern Motion', intent: 'Validate motion accessibility', dye: 'murasaki', tags: ['validate', 'motion'], components: ['MotionLab', 'BoundaryRuler', 'StateSelector', 'TimingGauge'], src: '/screens/05-govern-motion.webp', alt: 'Motion laboratory with component state tester, boundary ruler, and timing gauge on dark washi surface' },
  { id: '06-convert-apply', number: 6, title: 'Convert & Apply', intent: 'Apply pattern to surface', dye: 'ai-iro', tags: ['convert', 'apply'], components: ['SurfacePicker', 'ApplyButton', 'PreviewFrame', 'CodePanel'], src: '/screens/06-convert-apply.webp', alt: 'Surface selection interface showing pattern applied to different paper textures with code export panel' },
  { id: '07-export-dashboard', number: 7, title: 'Export Dashboard', intent: 'Export final pattern', dye: 'kakishibu', tags: ['export', 'dashboard'], components: ['ExportPreset', 'FormatCard', 'DownloadButton', 'ReceiptPanel'], src: '/screens/07-export-dashboard.webp', alt: 'Export dashboard with format options (CSS, SVG, PNG, JSON), download button, and provenance receipt' },
  { id: '08-about-manifesto', number: 8, title: 'About Manifesto', intent: 'Tell the system story', dye: 'sakura', tags: ['about', 'story'], components: ['ScrollTaleEngine', 'ChapterRibbon', 'EvidenceTile', 'TypeSpecimen'], src: '/screens/08-about-manifesto.webp', alt: 'Manifesto page with vertical chapter ribbons, evidence tiles, and the story of Kozo Dreams in flowing display type' },
  { id: '09-scroll-story', number: 9, title: 'Scroll Story', intent: 'Narrative scroll experience', dye: 'murasaki', tags: ['story', 'scroll'], components: ['ScrollTaleEngine', 'InkBleedTransition', 'FantasyPortalFrame', 'LivingMascot'], src: '/screens/09-scroll-story.webp', alt: 'Immersive scroll-driven narrative with ink-bleed transitions, fantasy portals, and the living mascot companion' },
  { id: '10-night-garden', number: 10, title: 'Night Garden', intent: 'Dark mode culmination', dye: 'ai-iro', tags: ['night', 'garden'], components: ['NightSurface', 'GlowBoundary', 'ThemeToggle', 'SilentClosing'], src: '/screens/10-night-garden.webp', alt: 'Dark mode night garden with glowing boundary rings, bioluminescent elements, and the silent closing statement' },
];

export const REGISTRY: RegistryEntry[] = [
  // L0 Foundation
  { name: 'PaperSurface', layer: 0, dye: 'sakura', componentStates: ['idle', 'hover', 'pressed'], description: 'Root container with paper texture, deckle edges, and surface layering' },
  { name: 'TypeRole', layer: 0, description: 'Typography system: display, body, mono, ornamental' },
  { name: 'MotionBoundary', layer: 0, description: 'Enforces max translation, scale, duration limits via CSS custom properties' },
  { name: 'FocusRing', layer: 0, description: 'Visible focus treatment with glow and offset' },
  { name: 'Grid', layer: 0, description: '12-column responsive grid with 32px gap' },

  // L1 Primitives
  { name: 'PaperButton', layer: 1, dye: 'murasaki', componentStates: ['idle', 'hover', 'focus', 'pressed', 'disabled'], description: 'Button with paper shadow lift, press compression, and ink-feel' },
  { name: 'DyeChip', layer: 1, dye: 'ai-iro', componentStates: ['idle', 'selected', 'hover'], description: 'Small color swatch with label for palette selection' },
  { name: 'Glyph', layer: 1, description: 'Decorative symbol with orbit, float, or static placement' },
  { name: 'Divider', layer: 1, description: 'Horizontal or vertical rule with paper-feel' },
  { name: 'RangeControl', layer: 1, componentStates: ['idle', 'focus'], description: 'Slider with paper track and dye-colored fill' },
  { name: 'StateLabel', layer: 1, description: 'Text label showing current component state' },
  { name: 'IconButton', layer: 1, componentStates: ['idle', 'hover', 'focus', 'pressed'], description: 'Compact button with icon only' },

  // L2 Patterns
  { name: 'KirigamiCard', layer: 2, dye: 'sakura', componentStates: ['idle', 'hover', 'focus', 'pressed', 'selected'], description: 'Card with 3D peel effect revealing pattern beneath' },
  { name: 'RibbonHeading', layer: 2, dye: 'ai-iro', description: 'Heading with flowing ribbon underline' },
  { name: 'DragonflyFloat', layer: 2, dye: 'murasaki', description: 'Ambient floating decorative element' },
  { name: 'TokenBadge', layer: 2, dye: 'murasaki', componentStates: ['idle', 'hover', 'success'], description: 'Color token with swatch, label, and copy-to-clipboard' },
  { name: 'PortalFrame', layer: 2, dye: 'murasaki', componentStates: ['idle', 'hover'], description: 'Hexagonal portal container with depth illusion' },
  { name: 'ProgressTrack', layer: 2, dye: 'kakishibu', componentStates: ['idle', 'selected'], description: 'Step indicator with dot glow and connecting line' },
  { name: 'SeigaihaBackground', layer: 2, dye: 'ai-iro', description: 'Repeating wave motif background pattern' },
  { name: 'HalftoneOverlay', layer: 2, description: 'Dot-grid texture overlay for surface depth' },
  { name: 'CalligraphyStrokeReveal', layer: 2, dye: 'kakishibu', description: 'Text reveal with brush-stroke animation' },
  { name: 'PatternSwatch', layer: 2, dye: 'ai-iro', componentStates: ['idle', 'hover', 'selected'], description: 'Preview tile of a repeating pattern' },

  // L3 Composites
  { name: 'ScreenFrame', layer: 3, description: 'Device-like frame for screen previews with state indicator' },
  { name: 'FlowStage', layer: 3, dye: 'kakishibu', componentStates: ['idle', 'selected'], description: 'Tab panel with intent/action/success/rationale' },
  { name: 'TokenInspector', layer: 3, dye: 'murasaki', description: 'Floating panel showing resolved token values' },
  { name: 'MotionLab', layer: 3, description: 'Interactive state tester with parameter sliders' },
  { name: 'PatternViewer', layer: 3, description: 'Fullscreen pattern preview with zoom and pan' },
  { name: 'ComponentGallery', layer: 3, description: 'Grid of all registered components with filter' },
  { name: 'FilterChip', layer: 3, componentStates: ['idle', 'selected', 'hover'], description: 'Toggle chip for filtering by category or dye' },
  { name: 'WashiSidebar', layer: 3, description: 'Collapsible sidebar with navigation and controls' },
  { name: 'StudioCanvas', layer: 3, description: 'Interactive canvas for pattern composition' },

  // L4 Flows
  { name: 'ConversionCTA', layer: 4, dye: 'murasaki', componentStates: ['idle', 'hover', 'pressed'], description: 'Call-to-action section with evidence and action' },
  { name: 'NewsletterCapture', layer: 4, componentStates: ['idle', 'focus', 'success', 'error'], description: 'Email capture with validation and success state' },
  { name: 'ExportFlow', layer: 4, dye: 'kakishibu', description: 'Multi-step export with format selection and download' },
  { name: 'OnboardingFlow', layer: 4, description: 'First-visit guided tour through the 7 stages' },
  { name: 'ShareFlow', layer: 4, description: 'Social sharing with preview card generation' },
];

export const BOUNDARIES: MotionBoundaries = {
  translationMaxPx: 12,
  imageScaleMax: 1.04,
  durationMinMs: 90,
  durationMaxMs: 900,
  cardRotationMaxDeg: 2,
  pressScaleMin: 0.97,
  pressScaleMax: 1,
  decorativeRotationMaxDeg: 5,
};

export const EASING = {
  paper: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  ink: [0.4, 0, 0.2, 1] as [number, number, number, number],
  origami: [0.68, -0.35, 0.265, 1.35] as [number, number, number, number],
  dragonfly: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
  ribbon: [0.33, 0, 0.67, 1] as [number, number, number, number],
};

export const PATTERNS = [
  { id: 'seigaiha', label: 'Seigaiha', sub: 'Waves of Peace', description: 'Concentric arcs forming wave patterns' },
  { id: 'asanoha', label: 'Asanoha', sub: 'Hemp Leaves', description: 'Six-pointed star from overlapping diamonds' },
  { id: 'kikkou', label: 'Kikkou', sub: 'Tortoise Shell', description: 'Hexagonal tessellation pattern' },
  { id: 'sayagata', label: 'Sayagata', sub: 'Key Fret', description: 'Interlocking manji patterns' },
  { id: 'shippo', label: 'Shippo', sub: 'Seven Treasures', description: 'Overlapping circles forming floral shapes' },
  { id: 'waves', label: 'Great Wave', sub: 'Ocean Surge', description: 'Hokusai-inspired layered wave crests' },
  { id: 'sakura', label: 'Sakura', sub: 'Cherry Blossom', description: 'Falling petal scatter pattern' },
  { id: 'kumo', label: 'Kumo', sub: 'Clouds', description: 'Traditional cloud scroll motifs' },
] as const;

export const TESSELLATIONS = [
  { id: 'diamond', label: 'Diamond Grid' },
  { id: 'hexagon', label: 'Hexagonal' },
  { id: 'triangle', label: 'Triangle Net' },
  { id: 'star', label: 'Star Fold' },
  { id: 'cube', label: 'Cube Tessellation' },
  { id: 'kusudama', label: 'Kusudama Ball' },
] as const;

export const STUDIO_TOOLS = [
  { id: 'select', label: 'Select', icon: 'MousePointer' },
  { id: 'cut', label: 'Kirigami Cut', icon: 'Scissors' },
  { id: 'fold', label: 'Origami Fold', icon: 'FoldVertical' },
  { id: 'tessellate', label: 'Tessellate', icon: 'Grid3x3' },
  { id: 'ink', label: 'Ink Wash', icon: 'Paintbrush' },
  { id: 'light', label: 'Light & Shadow', icon: 'Sun' },
  { id: 'prism', label: 'Prism Refraction', icon: 'Gem' },
] as const;
