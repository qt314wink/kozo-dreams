import { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { RangeControl } from '@/components/l1-primitives/RangeControl';
import { DyePalette } from '@/components/l1-primitives/DyeChip';
import { FilterChip } from '@/components/l3-composites/FilterChip';
import type { DyeName, PatternType, TessellationType, StudioTool, CutPath, Fold } from '@/types/kozo';
import { PATTERNS, TESSELLATIONS, STUDIO_TOOLS, DYES } from '@/lib/constants';
import {
  MousePointer, Scissors, FoldVertical, Grid3x3,
  Paintbrush, Sun, Gem, RotateCcw, Download,
} from 'lucide-react';

const TOOL_ICONS: Record<string, React.ElementType> = {
  MousePointer, Scissors, FoldVertical, Grid3x3, Paintbrush, Sun, Gem,
};

export function StudioCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [activeTool, setActiveTool] = useState<StudioTool>('select');
  const [pattern, setPattern] = useState<PatternType>('seigaiha');
  const [dye, setDye] = useState<DyeName>('ai-iro');
  const [tessellation, setTessellation] = useState<TessellationType>('none');
  const [depth, setDepth] = useState(2);
  const [lightAngle, setLightAngle] = useState(45);
  const [prismEnabled, setPrismEnabled] = useState(false);
  const [inkOpacity, setInkOpacity] = useState(0.7);
  const [paperTexture, setPaperTexture] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [cutPaths, setCutPaths] = useState<CutPath[]>([]);
  const [, setFolds] = useState<Fold[]>([]);
  const [currentPath, setCurrentPath] = useState<[number, number][]>([]);

  const d = DYES.find(x => x.name === dye);

  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (activeTool === 'cut') {
      setIsDrawing(true);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCurrentPath([[x, y]]);
    }
  }, [activeTool]);

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing || activeTool !== 'cut') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCurrentPath(prev => [...prev, [x, y]]);
  }, [isDrawing, activeTool]);

  const handlePointerUp = useCallback(() => {
    if (isDrawing && currentPath.length > 1) {
      setCutPaths(prev => [...prev, { id: `cut-${Date.now()}`, points: currentPath, type: 'kirigami' }]);
      setCurrentPath([]);
    }
    setIsDrawing(false);
  }, [isDrawing, currentPath]);

  const handleExport = () => {
    const svg = canvasRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kozo-pattern-${pattern}-${dye}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCutPaths([]);
    setFolds([]);
    setCurrentPath([]);
    setTessellation('none');
    setDepth(2);
  };

  const pathToD = (points: [number, number][]) =>
    points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');

  const renderPattern = () => {
    const c = d?.hex || '#165E83';
    const op = inkOpacity;
    const defs: Record<string, React.ReactNode> = {
      seigaiha: <g opacity={op}>{Array.from({length:12},(_,r)=>Array.from({length:14},(_,col)=><path key={`${r}-${col}`} d={`M${col*12-6} ${r*10+5} Q${col*12} ${r*10-5} ${col*12+6} ${r*10+5}`} fill="none" stroke={c} strokeWidth="1.5"/>))}</g>,
      asanoha: <g opacity={op}>{Array.from({length:10},(_,r)=>Array.from({length:10},(_,col)=><g key={`${r}-${col}`}><line x1={col*12+6} y1={r*12} x2={col*12+12} y2={r*12+6} stroke={c} strokeWidth="1"/><line x1={col*12+12} y1={r*12+6} x2={col*12+6} y2={r*12+12} stroke={c} strokeWidth="1"/><line x1={col*12+6} y1={r*12+12} x2={col*12} y2={r*12+6} stroke={c} strokeWidth="1"/><line x1={col*12} y1={r*12+6} x2={col*12+6} y2={r*12} stroke={c} strokeWidth="1"/></g>))}</g>,
      kikkou: <g opacity={op}>{Array.from({length:8},(_,r)=>Array.from({length:10},(_,col)=><polygon key={`${r}-${col}`} points={`${col*12+6},${r*14+2} ${col*12+14},${r*14+7} ${col*12+14},${r*14+14} ${col*12+6},${r*14+19} ${col*12-2},${r*14+14} ${col*12-2},${r*14+7}`} fill="none" stroke={c} strokeWidth="1.2"/>))}</g>,
      shippo: <g opacity={op}>{Array.from({length:8},(_,r)=>Array.from({length:8},(_,col)=><g key={`${r}-${col}`}><circle cx={col*16+6} cy={r*16+6} r="7" fill="none" stroke={c} strokeWidth="1.2"/><circle cx={col*16+14} cy={r*16+6} r="7" fill="none" stroke={c} strokeWidth="1.2"/><circle cx={col*16+10} cy={r*16+14} r="7" fill="none" stroke={c} strokeWidth="1.2"/></g>))}</g>,
      waves: <g opacity={op}>{Array.from({length:6},(_,i)=><path key={i} d={`M0 ${30+i*15} Q25 ${10+i*15} 50 ${30+i*15} Q75 ${50+i*15} 100 ${30+i*15} Q125 ${10+i*15} 150 ${30+i*15}`} fill="none" stroke={c} strokeWidth={3-i*0.3}/>)}</g>,
      sakura: <g opacity={op}>{Array.from({length:15},(_,i)=><g key={i} transform={`translate(${10+(i*37)%90},${10+Math.floor(i*37/90)*30})`}>{[0,1,2,3,4].map(p=><ellipse key={p} cx="5" cy="2" rx="3" ry="6" fill={c} transform={`rotate(${p*72} 5 5)`} opacity="0.6"/>)}<circle cx="5" cy="5" r="1.5" fill="#B99855"/></g>)}</g>,
      kumo: <g opacity={op}>{Array.from({length:8},(_,i)=><path key={i} d={`M${5+i*12} ${20+(i%3)*15} Q${10+i*12} ${5+(i%3)*15} ${20+i*12} ${15+(i%3)*15} Q${30+i*12} ${5+(i%3)*15} ${35+i*12} ${20+(i%3)*15}`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"/>)}</g>,
    };
    return defs[pattern] || null;
  };

  const renderTessellation = () => {
    if (tessellation === 'none') return null;
    const c = d?.hex || '#165E83';
    const defs: Record<string, React.ReactNode> = {
      diamond: <g opacity={0.15}>{Array.from({length:8},(_,r)=>Array.from({length:12},(_,col)=><polygon key={`${r}-${col}`} points={`${col*10+5},${r*10} ${col*10+10},${r*10+5} ${col*10+5},${r*10+10} ${col*10},${r*10+5}`} fill="none" stroke={c} strokeWidth="0.5"/>))}</g>,
      hexagon: <g opacity={0.15}>{Array.from({length:6},(_,r)=>Array.from({length:8},(_,col)=>{const cx=col*14+(r%2)*7;const cy=r*12;return<polygon key={`${r}-${col}`} points={`${cx+7},${cy} ${cx+14},${cy+4} ${cx+14},${cy+10} ${cx+7},${cy+14} ${cx},${cy+10} ${cx},${cy+4}`} fill="none" stroke={c} strokeWidth="0.5"/>;}))}</g>,
      triangle: <g opacity={0.12}>{Array.from({length:10},(_,r)=>Array.from({length:14},(_,col)=><polygon key={`${r}-${col}`} points={`${col*8},${r*8+8} ${col*8+8},${r*8+8} ${col*8+4},${r*8}`} fill="none" stroke={c} strokeWidth="0.4"/>))}</g>,
      star: <g opacity={0.15}>{Array.from({length:5},(_,r)=>Array.from({length:6},(_,col)=><g key={`${r}-${col}`} transform={`translate(${col*18+9},${r*20+10})`}>{[0,1,2,3,4].map(p=><line key={p} x1="0" y1="0" x2="0" y2="-8" stroke={c} strokeWidth="0.5" transform={`rotate(${p*72})`}/>)}</g>))}</g>,
      cube: <g opacity={0.15}>{Array.from({length:6},(_,r)=>Array.from({length:8},(_,col)=>{const x=col*14;const y=r*14;return<g key={`${r}-${col}`}><rect x={x+3} y={y+3} width="8" height="8" fill="none" stroke={c} strokeWidth="0.5"/><line x1={x+3} y1={y+3} x2={x} y2={y} stroke={c} strokeWidth="0.3"/><line x1={x+11} y1={y+3} x2={x+14} y2={y} stroke={c} strokeWidth="0.3"/><line x1={x+11} y1={y+11} x2={x+14} y2={y+14} stroke={c} strokeWidth="0.3"/><line x1={x+3} y1={y+11} x2={x} y2={y+14} stroke={c} strokeWidth="0.3"/></g>;))}</g>,
      kusudama: <g opacity={0.15}>{Array.from({length:4},(_,r)=>Array.from({length:5},(_,col)=>{const cx=col*22+11;const cy=r*22+11;return<g key={`${r}-${col}`}>{[0,1,2,3,4].map(p=><polygon key={p} points={`${cx},${cy-8} ${cx+3},${cy-2} ${cx},${cy+2} ${cx-3},${cy-2}`} fill="none" stroke={c} strokeWidth="0.5" transform={`rotate(${p*72} ${cx} ${cy})`}/>)}<circle cx={cx} cy={cy} r="3" fill="none" stroke={c} strokeWidth="0.5"/></g>;))}</g>,
    };
    return defs[tessellation] || null;
  };

  return (
    <div className={cn('flex flex-col lg:flex-row gap-6', className)}>
      <div className="flex-1 min-w-0">
        <div className="relative rounded-panel overflow-hidden bg-kozo-shironeri shadow-paper border border-kozo-fog cursor-crosshair"
          style={{boxShadow:`inset ${Math.cos(lightAngle*Math.PI/180)*depth*3}px ${Math.sin(lightAngle*Math.PI/180)*depth*3}px ${depth*8}px rgba(0,0,0,0.08), 0 12px 35px rgba(58,42,27,0.12)`}}>
          <AnimatePresence>
            {prismEnabled && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                className="absolute inset-0 z-20 pointer-events-none"
                style={{background:'conic-gradient(from 0deg at 30% 40%, transparent 0deg, rgba(22,94,131,0.08) 60deg, transparent 120deg, rgba(119,66,141,0.06) 180deg, transparent 240deg, rgba(185,152,85,0.08) 300deg, transparent 360deg)', animation:'prism-shift 8s linear infinite'}} />
            )}
          </AnimatePresence>
          <svg ref={canvasRef} viewBox="0 0 100 80" className="w-full aspect-[5/4]"
            onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
            <defs>
              <filter id="paper-texture"><feTurbulence type="fractalNoise" baseFrequency={0.04*paperTexture} numOctaves={3} result="noise"/><feDiffuseLighting in="noise" lightingColor="#F5F0E8" surfaceScale={paperTexture}><feDistantLight azimuth={lightAngle} elevation={60}/></feDiffuseLighting></filter>
              <filter id="paper-shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx={Math.cos(lightAngle*Math.PI/180)*depth} dy={Math.sin(lightAngle*Math.PI/180)*depth} stdDeviation={depth*0.8} floodOpacity={0.15}/></filter>
              {prismEnabled && <linearGradient id="prism-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={d?.hex} stopOpacity="0.15"/><stop offset="50%" stopColor="#B99855" stopOpacity="0.1"/><stop offset="100%" stopColor={d?.hex} stopOpacity="0.05"/></linearGradient>}
            </defs>
            <rect width="100" height="80" fill="var(--kozo-shironeri)"/>
            <rect width="100" height="80" fill="#F5F0E8" filter="url(#paper-texture)" opacity={paperTexture*0.3}/>
            <g filter="url(#paper-shadow)">{renderTessellation()}</g>
            <g filter="url(#paper-shadow)">{renderPattern()}</g>
            {cutPaths.map(path=><g key={path.id}><path d={pathToD(path.points)} fill="none" stroke={d?.hex} strokeWidth="0.8" opacity="0.6"/><path d={pathToD(path.points)} fill="none" stroke="var(--kozo-shironeri)" strokeWidth="0.4" opacity="0.8"/></g>)}
            {isDrawing && currentPath.length>1 && <path d={pathToD(currentPath)} fill="none" stroke={d?.hex} strokeWidth="0.8" strokeDasharray="2 1" opacity="0.8"/>}
            {prismEnabled && <rect width="100" height="80" fill="url(#prism-grad)" opacity="0.3"/>}
          </svg>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kozo-murasaki animate-pulse"/>
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-50">{pattern.toUpperCase()} / {PATTERNS.find(p=>p.id===pattern)?.sub?.toUpperCase()}</span>
          </div>
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button onClick={handleReset} className="p-2 rounded-paper bg-kozo-cream/80 hover:bg-kozo-cream transition-colors" title="Reset"><RotateCcw className="w-4 h-4 opacity-60"/></button>
            <button onClick={handleExport} className="p-2 rounded-paper bg-kozo-cream/80 hover:bg-kozo-cream transition-colors" title="Export SVG"><Download className="w-4 h-4 opacity-60"/></button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
        <div className="p-3 bg-kozo-cream rounded-panel space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block">Tools</span>
          <div className="flex flex-wrap gap-1">
            {STUDIO_TOOLS.map(tool=>{const Icon=TOOL_ICONS[tool.icon];return(
              <button key={tool.id} onClick={()=>setActiveTool(tool.id as StudioTool)} aria-pressed={activeTool===tool.id}
                className={cn('flex items-center gap-1.5 px-3 py-2 rounded-paper text-xs transition-all focus-visible:outline-none min-h-[36px]',activeTool===tool.id?'bg-kozo-murasaki text-white':'bg-kozo-fog/50 hover:bg-kozo-fog')}>
                {Icon&&<Icon className="w-3.5 h-3.5"/>}<span className="hidden xl:inline">{tool.label}</span>
              </button>
            )})}
          </div>
        </div>
        <div className="p-3 bg-kozo-cream rounded-panel space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block">Pattern</span>
          <div className="flex flex-wrap gap-1">
            {PATTERNS.map(p=><FilterChip key={p.id} label={p.label} active={pattern===p.id} onClick={()=>setPattern(p.id as PatternType)} chipClassName=""/>)}
          </div>
        </div>
        <div className="p-3 bg-kozo-cream rounded-panel space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block">Sacred Dye</span>
          <DyePalette selected={dye} onSelect={setDye} />
        </div>
        <div className="p-3 bg-kozo-cream rounded-panel space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block">Tessellation</span>
          <div className="flex flex-wrap gap-1">
            <FilterChip label="None" active={tessellation==='none'} onClick={()=>setTessellation('none')} chipClassName=""/>
            {TESSELLATIONS.map(t=><FilterChip key={t.id} label={t.label} active={tessellation===t.id} onClick={()=>setTessellation(t.id as TessellationType)} chipClassName=""/>)}
          </div>
        </div>
        <div className="p-3 bg-kozo-cream rounded-panel space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-50 block">Material</span>
          <RangeControl label="Depth" value={depth} min={0} max={8} onChange={setDepth}/>
          <RangeControl label="Light Angle" value={lightAngle} min={0} max={360} unit="deg" onChange={setLightAngle}/>
          <RangeControl label="Ink Opacity" value={inkOpacity} min={0.1} max={1} step={0.05} onChange={setInkOpacity}/>
          <RangeControl label="Paper Texture" value={paperTexture} min={0} max={3} step={0.1} onChange={setPaperTexture}/>
          <button onClick={()=>setPrismEnabled(!prismEnabled)} aria-pressed={prismEnabled}
            className={cn('w-full flex items-center justify-center gap-2 px-4 py-2 rounded-paper text-xs transition-all focus-visible:outline-none',prismEnabled?'bg-kozo-gold/20 text-kozo-kakishibu':'bg-kozo-fog/50 hover:bg-kozo-fog')}>
            <Gem className="w-3.5 h-3.5"/>{prismEnabled?'Prism On':'Prism Off'}
          </button>
        </div>
      </div>
    </div>
  );
}
