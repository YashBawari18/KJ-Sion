'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Download, Plus, Trash2, Type, Image as ImageIcon, Sparkles,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic,
  ChevronDown, Palette, LayoutTemplate, Eye, RefreshCw,
  Move, ZoomIn, ZoomOut, Wand2, Loader2, ArrowRight,
  Flame, Gamepad2, Laptop, DollarSign, Mic, Film, Check, Copy
} from 'lucide-react';

/* ─────────────────────────── Types ─────────────────────────── */
interface TextLayer {
  id: string;
  text: string;
  x: number; // 0-1 relative
  y: number; // 0-1 relative
  fontSize: number;
  color: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  align: 'left' | 'center' | 'right';
  fontFamily: string;
  shadowColor: string;
  shadowBlur: number;
  strokeColor: string;
  strokeWidth: number;
}

interface BgConfig {
  type: 'gradient' | 'solid' | 'image';
  gradient?: string[];
  solid?: string;
  imageUrl?: string;
}

interface GeneratedThumbnail {
  id: string;
  prompt: string;
  style: string;
  imageUrl: string;
  createdAt: string;
}

interface ThumbnailCreatorProps {
  onAnalyzeThumbnail?: (file: File) => void;
}

/* ─────────────────────────── Constants ─────────────────────── */
const CANVAS_W = 1280;
const CANVAS_H = 720;

const FONTS = [
  'Impact', 'Arial', 'Georgia', 'Oswald', 'Bebas Neue',
  'Montserrat', 'Roboto', 'Open Sans', 'Playfair Display', 'Pacifico',
];

const TEMPLATES = [
  {
    id: 'fire',
    label: '🔥 Viral Red',
    bg: { type: 'gradient' as const, gradient: ['#1a0005', '#7f1d1d', '#dc2626'] },
    accent: '#ef4444',
    layers: [
      { id: 'l1', text: 'INSANE', x: 0.5, y: 0.28, fontSize: 120, color: '#ffffff', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Impact', shadowColor: '#dc2626', shadowBlur: 30, strokeColor: '#000', strokeWidth: 4 },
      { id: 'l2', text: 'Results in 24 Hours', x: 0.5, y: 0.58, fontSize: 58, color: '#fbbf24', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Arial', shadowColor: '#000', shadowBlur: 18, strokeColor: '#000', strokeWidth: 2 },
      { id: 'l3', text: 'YOU WON\'T BELIEVE THIS', x: 0.5, y: 0.82, fontSize: 38, color: '#ffffff', fontWeight: 'normal' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Arial', shadowColor: '#000', shadowBlur: 12, strokeColor: '#000', strokeWidth: 1 },
    ],
  },
  {
    id: 'tech',
    label: '⚡ Tech Dark',
    bg: { type: 'gradient' as const, gradient: ['#020617', '#0f172a', '#1e1b4b'] },
    accent: '#818cf8',
    layers: [
      { id: 'l1', text: 'AI Changes', x: 0.5, y: 0.3, fontSize: 90, color: '#a5b4fc', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Impact', shadowColor: '#4f46e5', shadowBlur: 40, strokeColor: 'transparent', strokeWidth: 0 },
      { id: 'l2', text: 'EVERYTHING', x: 0.5, y: 0.58, fontSize: 100, color: '#ffffff', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Impact', shadowColor: '#818cf8', shadowBlur: 24, strokeColor: 'transparent', strokeWidth: 0 },
      { id: 'l3', text: 'in 2025', x: 0.5, y: 0.82, fontSize: 42, color: '#94a3b8', fontWeight: 'normal' as const, fontStyle: 'italic' as const, align: 'center' as const, fontFamily: 'Georgia', shadowColor: '#000', shadowBlur: 8, strokeColor: 'transparent', strokeWidth: 0 },
    ],
  },
  {
    id: 'minimal',
    label: '🤍 Clean Minimal',
    bg: { type: 'gradient' as const, gradient: ['#f8fafc', '#e2e8f0', '#cbd5e1'] },
    accent: '#6366f1',
    layers: [
      { id: 'l1', text: 'The Truth About', x: 0.5, y: 0.3, fontSize: 72, color: '#1e293b', fontWeight: 'normal' as const, fontStyle: 'italic' as const, align: 'center' as const, fontFamily: 'Georgia', shadowColor: 'transparent', shadowBlur: 0, strokeColor: 'transparent', strokeWidth: 0 },
      { id: 'l2', text: 'YouTube Success', x: 0.5, y: 0.58, fontSize: 96, color: '#6366f1', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Impact', shadowColor: 'rgba(99,102,241,0.3)', shadowBlur: 20, strokeColor: 'transparent', strokeWidth: 0 },
    ],
  },
  {
    id: 'money',
    label: '💰 Gold Money',
    bg: { type: 'gradient' as const, gradient: ['#0a0500', '#292200', '#5c4a00'] },
    accent: '#fbbf24',
    layers: [
      { id: 'l1', text: '$1,000,000', x: 0.5, y: 0.32, fontSize: 110, color: '#fbbf24', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Impact', shadowColor: '#f59e0b', shadowBlur: 35, strokeColor: '#78350f', strokeWidth: 3 },
      { id: 'l2', text: 'CHALLENGE', x: 0.5, y: 0.62, fontSize: 70, color: '#ffffff', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Impact', shadowColor: '#000', shadowBlur: 16, strokeColor: '#000', strokeWidth: 2 },
    ],
  },
  {
    id: 'gaming',
    label: '🎮 Gaming Neon',
    bg: { type: 'gradient' as const, gradient: ['#030712', '#064e3b', '#065f46'] },
    accent: '#10b981',
    layers: [
      { id: 'l1', text: 'WORLD RECORD', x: 0.5, y: 0.28, fontSize: 88, color: '#10b981', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Impact', shadowColor: '#059669', shadowBlur: 40, strokeColor: '#000', strokeWidth: 3 },
      { id: 'l2', text: 'BROKEN', x: 0.5, y: 0.58, fontSize: 130, color: '#ffffff', fontWeight: 'bold' as const, fontStyle: 'normal' as const, align: 'center' as const, fontFamily: 'Impact', shadowColor: '#10b981', shadowBlur: 30, strokeColor: '#000', strokeWidth: 4 },
    ],
  },
];

const BG_PRESETS: { label: string; colors: string[] }[] = [
  { label: 'Deep Red', colors: ['#1a0005', '#7f1d1d', '#dc2626'] },
  { label: 'Space Navy', colors: ['#020617', '#0f172a', '#1e1b4b'] },
  { label: 'Forest', colors: ['#030712', '#064e3b', '#065f46'] },
  { label: 'Gold Mine', colors: ['#0a0500', '#292200', '#5c4a00'] },
  { label: 'Rose Dark', colors: ['#0c0007', '#4a044e', '#9d174d'] },
  { label: 'Ocean', colors: ['#020617', '#0c4a6e', '#0369a1'] },
  { label: 'Clean White', colors: ['#f8fafc', '#e2e8f0', '#cbd5e1'] },
  { label: 'Sunset', colors: ['#1c1917', '#7c2d12', '#c2410c'] },
];

const AI_STYLES = [
  { id: 'mrbeast', label: 'MrBeast Viral', icon: Flame, color: 'from-amber-500 to-rose-500' },
  { id: 'gaming', label: 'Gaming Action', icon: Gamepad2, color: 'from-emerald-500 to-teal-500' },
  { id: 'tech', label: 'Tech & Futuristic', icon: Laptop, color: 'from-blue-500 to-indigo-500' },
  { id: 'finance', label: 'Finance & Crypto', icon: DollarSign, color: 'from-yellow-500 to-amber-600' },
  { id: 'podcast', label: 'Studio Podcast', icon: Mic, color: 'from-purple-500 to-pink-500' },
  { id: 'mystery', label: 'Cinema & Mystery', icon: Film, color: 'from-slate-700 to-indigo-950' },
];

const PROMPT_SUGGESTIONS = [
  'I survived 100 days in hardcore Minecraft with a giant ender dragon',
  'MrBeast $1,000,000 challenge trapped in an abandoned secret island',
  'How to build AI apps in 2025: full beginner guide with glowing code',
  'I tested 7 side hustles for 30 days and made $15,000',
  'The dark truth about social media addiction nobody talks about',
  'Aston Martin supercar vs Tesla Cybertruck ultimate drag race',
];

/* ─────────────────────────── Helpers ───────────────────────── */
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): void {
  const words = text.split(' ');
  let line = '';
  const lines: string[] = [];
  for (const word of words) {
    const testLine = line + word + ' ';
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      lines.push(line.trim());
      line = word + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => {
    ctx.fillText(l, x, startY + i * lineHeight);
  });
}

function drawTextLayer(ctx: CanvasRenderingContext2D, layer: TextLayer, cw: number, ch: number) {
  ctx.save();
  const px = layer.x * cw;
  const py = layer.y * ch;
  const fontStr = `${layer.fontStyle} ${layer.fontWeight} ${layer.fontSize}px "${layer.fontFamily}", sans-serif`;
  ctx.font = fontStr;
  ctx.textAlign = layer.align;
  ctx.textBaseline = 'middle';

  if (layer.shadowBlur > 0 && layer.shadowColor !== 'transparent') {
    ctx.shadowColor = layer.shadowColor;
    ctx.shadowBlur = layer.shadowBlur;
  }

  if (layer.strokeWidth > 0 && layer.strokeColor !== 'transparent') {
    ctx.strokeStyle = layer.strokeColor;
    ctx.lineWidth = layer.strokeWidth * 2;
    ctx.lineJoin = 'round';
    wrapText(ctx, layer.text, px, py, cw * 0.9, layer.fontSize * 1.2);
    ctx.strokeText(layer.text, px, py);
  }

  ctx.shadowColor = layer.shadowColor;
  ctx.shadowBlur = layer.shadowBlur;
  ctx.fillStyle = layer.color;
  ctx.fillText(layer.text, px, py);
  ctx.restore();
}

async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: 'image/jpeg' });
}

/* ─────────────────────────── Component ─────────────────────── */
export function ThumbnailCreator({ onAnalyzeThumbnail }: ThumbnailCreatorProps) {
  // Tabs: 'ai' = AI Prompt-to-Thumbnail generator, 'canvas' = Canvas layer editor
  const [activeTab, setActiveTab] = useState<'ai' | 'canvas'>('ai');

  /* ── AI Generator State ── */
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('mrbeast');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [currentAiThumbnail, setCurrentAiThumbnail] = useState<GeneratedThumbnail | null>(null);
  const [history, setHistory] = useState<GeneratedThumbnail[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /* ── Canvas State ── */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);
  const [layers, setLayers] = useState<TextLayer[]>(TEMPLATES[0].layers);
  const [bg, setBg] = useState<BgConfig>({ type: 'gradient', gradient: TEMPLATES[0].bg.gradient });
  const [selectedId, setSelectedId] = useState<string | null>(TEMPLATES[0].layers[0].id);
  const [activeTemplate, setActiveTemplate] = useState('fire');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [bgImageSrc, setBgImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ mx: number; my: number; lx: number; ly: number } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const selectedLayer = layers.find((l) => l.id === selectedId) ?? null;

  /* ── Render Canvas ─────────────────────────────────────────── */
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background
    if (bg.type === 'gradient' && bg.gradient) {
      const grd = ctx.createLinearGradient(0, 0, CANVAS_W * 0.6, CANVAS_H);
      grd.addColorStop(0, bg.gradient[0]);
      grd.addColorStop(0.5, bg.gradient[1]);
      grd.addColorStop(1, bg.gradient[2] ?? bg.gradient[1]);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    } else if (bg.type === 'solid' && bg.solid) {
      ctx.fillStyle = bg.solid;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    } else if (bg.type === 'image' && bg.imageUrl) {
      const img = new window.Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
        layers.forEach((l) => drawTextLayer(ctx, l, CANVAS_W, CANVAS_H));
      };
      img.src = bg.imageUrl;
      return;
    }

    // Draw text layers
    layers.forEach((l) => drawTextLayer(ctx, l, CANVAS_W, CANVAS_H));
  }, [bg, layers]);

  useEffect(() => {
    if (activeTab === 'canvas') {
      renderCanvas();
    }
  }, [renderCanvas, activeTab]);

  /* ── AI Generation Logic ────────────────────────────────────── */
  const handleGenerate = async (customPrompt?: string, styleOverride?: string) => {
    const textToUse = (customPrompt || prompt).trim();
    if (!textToUse) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToUse,
          style: styleOverride || selectedStyle,
          seed: Math.floor(Math.random() * 100000000),
          t: Date.now(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate thumbnail. Please try again.');
      }

      const newThumb: GeneratedThumbnail = {
        id: uid(),
        prompt: textToUse,
        style: styleOverride || selectedStyle,
        imageUrl: data.imageUrl,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setCurrentAiThumbnail(newThumb);
      setHistory((prev) => [newThumb, ...prev]);
    } catch (err: any) {
      setGenerationError(err.message || 'Generation failed. Please try a different prompt.');
    } finally {
      setIsGenerating(false);
    }
  };

  /* ── Send AI Image to Canvas Editor ────────────────────────── */
  const handleEditInCanvas = (thumb: GeneratedThumbnail) => {
    setBgImageSrc(thumb.imageUrl);
    setBg({ type: 'image', imageUrl: thumb.imageUrl });
    setActiveTab('canvas');
  };

  /* ── Send Image to Thumbnail IQ Attention Analyzer ────────── */
  const handleAnalyzeThumbnail = async (thumbUrl: string, name: string) => {
    if (!onAnalyzeThumbnail) return;
    try {
      const file = await dataUrlToFile(thumbUrl, `${name}-ai-thumb.jpg`);
      onAnalyzeThumbnail(file);
    } catch (err) {
      console.error('Failed to prepare thumbnail for analysis:', err);
    }
  };

  /* ── Download AI Thumbnail ──────────────────────────────────── */
  const handleDownloadImage = (imageUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `${filename}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* ── Canvas Layer Ops ───────────────────────────────────────── */
  const applyTemplate = (tpl: typeof TEMPLATES[number]) => {
    setLayers(tpl.layers.map((l) => ({ ...l, id: uid() })));
    setBg({ type: 'gradient', gradient: tpl.bg.gradient });
    setBgImageSrc(null);
    setSelectedId(null);
    setActiveTemplate(tpl.id);
    setShowTemplates(false);
  };

  const addLayer = () => {
    const newL: TextLayer = {
      id: uid(),
      text: 'NEW TEXT',
      x: 0.5,
      y: 0.5,
      fontSize: 72,
      color: '#ffffff',
      fontWeight: 'bold',
      fontStyle: 'normal',
      align: 'center',
      fontFamily: 'Impact',
      shadowColor: '#000000',
      shadowBlur: 16,
      strokeColor: '#000000',
      strokeWidth: 2,
    };
    setLayers((prev) => [...prev, newL]);
    setSelectedId(newL.id);
  };

  const updateLayer = (id: string, patch: Partial<TextLayer>) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const deleteLayer = (id: string) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
    setSelectedId(null);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderCanvas();
    setTimeout(() => {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'youtube-thumbnail-iq.png';
      a.click();
    }, 80);
  };

  const handleBgImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setBgImageSrc(src);
      setBg({ type: 'image', imageUrl: src });
    };
    reader.readAsDataURL(file);
  };

  const getCanvasCoords = (e: React.MouseEvent) => {
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return { rx: 0, ry: 0 };
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    return {
      rx: ((e.clientX - rect.left) * scaleX) / CANVAS_W,
      ry: ((e.clientY - rect.top) * scaleY) / CANVAS_H,
    };
  };

  const onCanvasMouseDown = (e: React.MouseEvent) => {
    const { rx, ry } = getCanvasCoords(e);
    const hit = [...layers].reverse().find((l) => {
      const dx = Math.abs(l.x - rx);
      const dy = Math.abs(l.y - ry);
      const thresh = (l.fontSize / CANVAS_W) * 5;
      return dx < thresh && dy < thresh * 0.5;
    });
    if (hit) {
      setSelectedId(hit.id);
      setDraggingId(hit.id);
      setDragStart({ mx: e.clientX, my: e.clientY, lx: hit.x, ly: hit.y });
    }
  };

  const onCanvasMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !dragStart) return;
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - dragStart.mx) / rect.width;
    const dy = (e.clientY - dragStart.my) / rect.height;
    updateLayer(draggingId, {
      x: Math.max(0.05, Math.min(0.95, dragStart.lx + dx)),
      y: Math.max(0.05, Math.min(0.95, dragStart.ly + dy)),
    });
  };

  const onCanvasMouseUp = () => {
    setDraggingId(null);
    setDragStart(null);
  };

  /* ─────────────────────────── UI RENDER ───────────────────────── */
  return (
    <div className="w-full animate-fade-in max-w-7xl mx-auto space-y-6">
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI THUMBNAIL STUDIO</span>
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-extrabold shadow-xs">
              FLUX.1 AI
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {activeTab === 'ai' ? 'Create Thumbnails with AI' : 'Canvas Designer & Overlays'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {activeTab === 'ai'
              ? 'Describe your video concept — our AI generates viral 1280×720 YouTube thumbnails in seconds.'
              : 'Add bold custom text layers, stroke outlines, gradients, and tweak layers on a 16:9 canvas.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-inner self-start md:self-auto">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>✨ AI Prompt Creator</span>
          </button>
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'canvas'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>🎨 Canvas & Text Studio</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: AI PROMPT TO THUMBNAIL CREATOR                         */}
      {/* ============================================================== */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          {/* Main Prompt Bar & Style Selector */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
            {/* Subtle decorative glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* Prompt Input Area */}
              <div>
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  <span className="flex items-center space-x-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>Enter Your Video Topic / Thumbnail Concept</span>
                  </span>
                  <span className="text-slate-400 font-normal lowercase">prompt anything you imagine</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Survived 100 days in extreme frozen tundra with wild wolves, intense shocked expression, dynamic blizzard background..."
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/70 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:bg-white dark:focus:bg-slate-950 text-sm sm:text-base leading-relaxed transition-all shadow-inner resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handleGenerate();
                      }
                    }}
                  />
                  {prompt && (
                    <button
                      onClick={() => setPrompt('')}
                      className="absolute top-3 right-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Inspiration Chips */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                  ✨ Quick Inspiration Prompts:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PROMPT_SUGGESTIONS.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPrompt(sug);
                        handleGenerate(sug);
                      }}
                      className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 hover:border-purple-400 dark:hover:border-purple-600 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-all cursor-pointer truncate max-w-[280px] sm:max-w-none shadow-2xs hover:scale-[1.01]"
                    >
                      "{sug}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Presets */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                  🎨 Thumbnail Style Presets:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                  {AI_STYLES.map((st) => {
                    const Icon = st.icon;
                    const isSelected = selectedStyle === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStyle(st.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 shadow-md shadow-purple-500/10 scale-[1.02]'
                            : 'border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-purple-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${st.color} text-white mb-2 shadow-xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold">{st.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Button & CTR Booster note */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>FLUX 16:9 widescreen model (1280×720) optimized for high CTR</span>
                </div>

                <button
                  onClick={() => handleGenerate()}
                  disabled={isGenerating || !prompt.trim()}
                  className={`inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-2xl font-black text-sm text-white shadow-xl transition-all ${
                    isGenerating || !prompt.trim()
                      ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating Thumbnail (~5s)...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      <span>Generate AI Thumbnail</span>
                    </>
                  )}
                </button>
              </div>

              {/* Error Alert */}
              {generationError && (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center justify-between">
                  <span>{generationError}</span>
                  <button onClick={() => setGenerationError(null)} className="font-bold underline ml-2">
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Generated Result Showcase */}
          {isGenerating && (
            <div className="bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/30">
                  <Wand2 className="w-9 h-9 animate-spin" />
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-purple-500/20 blur-xl animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Generating Your YouTube Thumbnail
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
                Rendering 1280×720 widescreen frame with vibrant colors, dramatic high-contrast lighting, and click-worthy composition...
              </p>
            </div>
          )}

          {currentAiThumbnail && !isGenerating && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Generated Thumbnail
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                      1280 × 720 HD
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                    "{currentAiThumbnail.prompt}"
                  </h3>
                </div>

                {/* Quick action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleDownloadImage(currentAiThumbnail.imageUrl, 'ai-youtube-thumbnail')}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm hover:opacity-90 transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    onClick={() => handleEditInCanvas(currentAiThumbnail)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all cursor-pointer"
                  >
                    <Type className="w-4 h-4" />
                    <span>Add Text Overlays</span>
                  </button>

                  {onAnalyzeThumbnail && (
                    <button
                      onClick={() => handleAnalyzeThumbnail(currentAiThumbnail.imageUrl, 'ai-generated')}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Analyze Attention Heatmap</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleGenerate(currentAiThumbnail.prompt)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                    title="Regenerate with different seed"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Image View */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-2xl bg-black aspect-video group">
                <img
                  src={currentAiThumbnail.imageUrl}
                  alt={currentAiThumbnail.prompt}
                  className="w-full h-full object-cover"
                />

                {/* Overlay actions on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                  <div className="text-white">
                    <p className="text-xs text-white/70">Prompt</p>
                    <p className="text-sm font-semibold max-w-xl">{currentAiThumbnail.prompt}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditInCanvas(currentAiThumbnail)}
                      className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 font-bold text-xs hover:bg-white transition-all cursor-pointer shadow"
                    >
                      Open in Canvas Studio →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Gallery */}
          {history.length > 1 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Generated In This Session ({history.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col"
                  >
                    <div className="aspect-video relative overflow-hidden bg-black">
                      <img src={item.imageUrl} alt={item.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
                        {item.style}
                      </span>
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                        "{item.prompt}"
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => setCurrentAiThumbnail(item)}
                          className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                        >
                          View Full
                        </button>
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => handleEditInCanvas(item)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Edit in Canvas"
                          >
                            <Type className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDownloadImage(item.imageUrl, 'thumbnail')}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            title="Download"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: CANVAS & TEXT STUDIO (Manual Layer Studio)             */}
      {/* ============================================================== */}
      {activeTab === 'canvas' && (
        <div className="space-y-4">
          {/* Top toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-xs">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Template Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowTemplates((s) => !s)}
                  className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 cursor-pointer transition-colors"
                >
                  <LayoutTemplate className="w-3.5 h-3.5 text-purple-600" />
                  <span>Templates</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
                </button>

                {showTemplates && (
                  <div className="absolute top-full left-0 mt-2 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 w-72 sm:w-96">
                    {TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => applyTemplate(tpl)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border-2 ${
                          activeTemplate === tpl.id
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                            : 'border-transparent bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300'
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Text Layer Button */}
              <button
                onClick={addLayer}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Text Layer</span>
              </button>

              {/* Switch to AI Gen button */}
              <button
                onClick={() => setActiveTab('ai')}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold text-xs transition-colors cursor-pointer hover:bg-purple-100"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Generate AI Backdrop</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 border-x border-slate-200 dark:border-slate-700">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={downloadCanvas}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export 1280×720 PNG</span>
              </button>
            </div>
          </div>

          {/* Main 2-Col Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
            {/* Canvas Preview Area */}
            <div className="flex flex-col gap-4">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-2xl bg-slate-950 select-none"
                style={{ cursor: draggingId ? 'grabbing' : 'default' }}
              >
                <div
                  ref={previewRef}
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', width: `${100 / zoom}%` }}
                  onMouseDown={onCanvasMouseDown}
                  onMouseMove={onCanvasMouseMove}
                  onMouseUp={onCanvasMouseUp}
                  onMouseLeave={onCanvasMouseUp}
                >
                  <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="w-full h-auto block" />
                  {layers.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => setSelectedId(l.id)}
                      style={{
                        position: 'absolute',
                        left: `${l.x * 100}%`,
                        top: `${l.y * 100}%`,
                        transform: 'translate(-50%, -50%)',
                        cursor: 'grab',
                        padding: '4px 8px',
                        border: selectedId === l.id ? '2px dashed rgba(139,92,246,0.85)' : '2px dashed transparent',
                        borderRadius: 6,
                        minWidth: 20,
                        minHeight: 20,
                        zIndex: 20,
                      }}
                      title={`Drag to move: "${l.text}"`}
                    >
                      {selectedId === l.id && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center space-x-1 bg-purple-600 text-white rounded-full px-2 py-0.5 text-[9px] font-bold whitespace-nowrap shadow">
                          <Move className="w-2.5 h-2.5" />
                          <span>drag</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-2 right-2 flex items-center space-x-1.5 bg-slate-950/80 backdrop-blur-xs rounded-lg px-2.5 py-1 text-[10px] font-semibold text-white/80">
                  <Eye className="w-3 h-3" />
                  <span>1280 × 720 px</span>
                </div>
              </div>

              {/* Layer list */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Text Layers ({layers.length})
                  </span>
                  <button
                    onClick={addLayer}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Text</span>
                  </button>
                </div>
                <div className="flex flex-col gap-1.5">
                  {layers.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => setSelectedId(l.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all ${
                        selectedId === l.id
                          ? 'border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/50'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Type className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                          {l.text || '(empty)'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">{l.fontSize}px</span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-2xs"
                          style={{ background: l.color }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteLayer(l.id);
                          }}
                          className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete layer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {layers.length === 0 && (
                    <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500">
                      No text layers. Click "Add Text" to begin.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Properties Panel */}
            <div className="space-y-4">
              {/* Background Panel */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Palette className="w-3.5 h-3.5 text-purple-600" />
                    <span>Background</span>
                  </span>
                  <button
                    onClick={() => setShowBgPicker((s) => !s)}
                    className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline cursor-pointer"
                  >
                    {showBgPicker ? 'Hide' : 'Presets'}
                  </button>
                </div>

                {showBgPicker && (
                  <div className="grid grid-cols-4 gap-1.5 mb-3">
                    {BG_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => setBg({ type: 'gradient', gradient: p.colors })}
                        title={p.label}
                        className="aspect-video rounded-lg border-2 border-transparent hover:border-purple-400 transition-all cursor-pointer overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]}, ${p.colors[2]})` }}
                      />
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Custom Gradient
                  </label>
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <input
                          type="color"
                          value={(bg.gradient ?? ['#1a0005', '#7f1d1d', '#dc2626'])[i] ?? '#000000'}
                          onChange={(e) => {
                            const newGrad = [...(bg.gradient ?? ['#1a0005', '#7f1d1d', '#dc2626'])];
                            newGrad[i] = e.target.value;
                            setBg({ type: 'gradient', gradient: newGrad });
                          }}
                          className="w-full h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700"
                        />
                        <span className="text-[9px] text-slate-400 font-mono">{['Start', 'Mid', 'End'][i]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => bgInputRef.current?.click()}
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{bgImageSrc ? 'Change Backdrop' : 'Upload Image'}</span>
                    </button>
                    {bgImageSrc && (
                      <button
                        onClick={() => {
                          setBgImageSrc(null);
                          setBg({ type: 'gradient', gradient: ['#1e1b4b', '#312e81', '#4338ca'] });
                        }}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input ref={bgInputRef} type="file" accept="image/*" className="hidden" onChange={handleBgImage} />
                </div>
              </div>

              {/* Text Layer Properties */}
              {selectedLayer ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <Type className="w-3.5 h-3.5 text-purple-600" />
                      <span>Text Properties</span>
                    </span>
                    <button
                      onClick={() => deleteLayer(selectedLayer.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Content</label>
                    <textarea
                      value={selectedLayer.text}
                      onChange={(e) => updateLayer(selectedLayer.id, { text: e.target.value })}
                      rows={2}
                      className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Font</label>
                    <select
                      value={selectedLayer.fontFamily}
                      onChange={(e) => updateLayer(selectedLayer.id, { fontFamily: e.target.value })}
                      className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                    >
                      {FONTS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Size</label>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{selectedLayer.fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={18}
                      max={220}
                      step={2}
                      value={selectedLayer.fontSize}
                      onChange={(e) => updateLayer(selectedLayer.id, { fontSize: Number(e.target.value) })}
                      className="w-full mt-1 accent-purple-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Style & Align</label>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          updateLayer(selectedLayer.id, {
                            fontWeight: selectedLayer.fontWeight === 'bold' ? 'normal' : 'bold',
                          })
                        }
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          selectedLayer.fontWeight === 'bold'
                            ? 'border-purple-400 bg-purple-50 dark:bg-purple-950/50 text-purple-700'
                            : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-purple-300'
                        }`}
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          updateLayer(selectedLayer.id, {
                            fontStyle: selectedLayer.fontStyle === 'italic' ? 'normal' : 'italic',
                          })
                        }
                        className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                          selectedLayer.fontStyle === 'italic'
                            ? 'border-purple-400 bg-purple-50 dark:bg-purple-950/50 text-purple-700'
                            : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-purple-300'
                        }`}
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />
                      {(['left', 'center', 'right'] as const).map((a) => {
                        const Icon = a === 'left' ? AlignLeft : a === 'center' ? AlignCenter : AlignRight;
                        return (
                          <button
                            key={a}
                            onClick={() => updateLayer(selectedLayer.id, { align: a })}
                            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                              selectedLayer.align === a
                                ? 'border-purple-400 bg-purple-50 dark:bg-purple-950/50 text-purple-700'
                                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-purple-300'
                            }`}
                            title={a}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Fill
                      </label>
                      <input
                        type="color"
                        value={selectedLayer.color}
                        onChange={(e) => updateLayer(selectedLayer.id, { color: e.target.value })}
                        className="w-full h-9 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Shadow
                      </label>
                      <input
                        type="color"
                        value={selectedLayer.shadowColor === 'transparent' ? '#000000' : selectedLayer.shadowColor}
                        onChange={(e) => updateLayer(selectedLayer.id, { shadowColor: e.target.value })}
                        className="w-full h-9 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Outline
                      </label>
                      <input
                        type="color"
                        value={selectedLayer.strokeColor === 'transparent' ? '#000000' : selectedLayer.strokeColor}
                        onChange={(e) => updateLayer(selectedLayer.id, { strokeColor: e.target.value })}
                        className="w-full h-9 rounded-xl cursor-pointer border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Shadow Glow
                      </label>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {selectedLayer.shadowBlur}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={60}
                      step={1}
                      value={selectedLayer.shadowBlur}
                      onChange={(e) => updateLayer(selectedLayer.id, { shadowBlur: Number(e.target.value) })}
                      className="w-full mt-1 accent-purple-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Outline Stroke
                      </label>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {selectedLayer.strokeWidth}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={0.5}
                      value={selectedLayer.strokeWidth}
                      onChange={(e) => updateLayer(selectedLayer.id, { strokeWidth: Number(e.target.value) })}
                      className="w-full mt-1 accent-purple-600 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-6 text-center">
                  <Type className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Click a text layer to edit styling & position
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
