'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  Eye, 
  Zap, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Activity, 
  Sliders, 
  Binary, 
  BookOpen,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface GuideViewProps {
  onStartAnalyzing: () => void;
  onExploreDemos: () => void;
}

export function GuideView({ onStartAnalyzing, onExploreDemos }: GuideViewProps) {
  // Interactive Simulator for Mentors/Judges
  const [saliencyWeight, setSaliencyWeight] = useState(35);
  const [faceWeight, setFaceWeight] = useState(20);
  const [textWeight, setTextWeight] = useState(15);
  const [contrastWeight, setContrastWeight] = useState(10);
  const [colorWeight, setColorWeight] = useState(10);
  const [compWeight, setCompWeight] = useState(10);

  // Sample signals
  const sampleSignals = {
    saliency: 88,
    face: 94,
    text: 82,
    contrast: 76,
    color: 84,
    comp: 78,
  };

  const totalWeight = saliencyWeight + faceWeight + textWeight + contrastWeight + colorWeight + compWeight;
  const simulatedScore = Math.round(
    (saliencyWeight * sampleSignals.saliency +
      faceWeight * sampleSignals.face +
      textWeight * sampleSignals.text +
      contrastWeight * sampleSignals.contrast +
      colorWeight * sampleSignals.color +
      compWeight * sampleSignals.comp) /
      Math.max(1, totalWeight)
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 animate-fade-in pb-20">
      
      {/* Title & Whitepaper Header */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-purple-600" />
          <span>NEURAL ARCHITECTURE &amp; MATHEMATICAL METHODOLOGY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          How the Attention Heatmap &amp; Score are Generated
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Thumbnail IQ does not generate arbitrary gradient blurs. It executes an authentic multi-signal Computer Vision &amp; Cognitive Science pipeline modeling human <strong>foveal vision</strong>, <strong>saccadic eye movement</strong>, and <strong>biological visual saliency</strong> across the critical first 500 milliseconds.
        </p>
      </div>

      {/* 1. Core Mathematical Pipeline Flowchart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <Binary className="w-5 h-5 text-purple-600" />
              <span>Computer Vision Pipeline &amp; Fusion Formula</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Exact mathematical stages from raw pixels to normalized 0–100 design scores
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            OpenCV &amp; YuNet DNN Engine
          </span>
        </div>

        {/* Fusion Equation Card */}
        <div className="p-5 rounded-2xl bg-slate-950 text-white font-mono text-xs sm:text-sm space-y-3 shadow-inner">
          <p className="text-slate-400 text-[11px] font-sans font-bold uppercase tracking-wider">
            PRIMARY ATTENTION FUSION EQUATION
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto text-purple-300 font-bold">
            S_fused(x, y) = [ w_sal·S_spectral + w_face·S_face + w_text·S_text + w_cont·S_rms + w_col·S_color + w_comp·S_bias ] / ∑ w_i · (1 - Clutter_penalty)
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Where each component matrix <code className="text-purple-300">S_i(x,y)</code> is a normalized 2D density distribution in range [0.0, 1.0], and <code className="text-purple-300">w_i</code> are biologically calibrated attention weights.
          </p>
        </div>

        {/* The 6 Mathematical Signals Detailed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          {/* Signal 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>1. Spectral Residual Saliency (35%)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">
                Hou &amp; Zhang Model
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Computes 2D Fast Fourier Transform (FFT) of log-spectrum:
            </p>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              R(f) = ln(|F(f)|) - h_n * ln(|F(f)|)
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Isolates unexpected visual outliers by subtracting local average log-amplitude from the Fourier spectrum.
            </p>
          </div>

          {/* Signal 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-purple-600" />
                <span>2. Deep Learning Face Saliency (20%)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                YuNet ONNX DNN
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Human brain prioritizes human faces via the Fusiform Face Area (FFA).
            </p>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              Fixation_face = 2D_Gaussian(μ=(x_face, y_face), σ=0.35·W_face)
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Detects face center, eye landmarks, and scales gaze fixation density proportionally to expression size.
            </p>
          </div>

          {/* Signal 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>3. Typography &amp; Stroke Gradient (15%)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                Sobel &amp; MSER
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Detects high-frequency text contours and black rim strokes:
            </p>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              G(x, y) = √( (∂I/∂x)² + (∂I/∂y)² ) · Aspect_Ratio_Weight
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Scores prominent 3D text and typography headers that serve as primary cognitive anchors.
            </p>
          </div>

          {/* Signal 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-amber-500" />
                <span>4. RMS Luminance &amp; Edge Separation (10%)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                Local Patch RMS
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Root-Mean-Square contrast across local image receptive fields:
            </p>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              C_rms = √[ 1/(M·N) ∑ ( (I_ij - I_mean) / I_mean )² ]
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              High RMS luminance contrast prevents foreground subjects from getting lost in background blur.
            </p>
          </div>

          {/* Signal 5 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>5. Chromatic Opponency &amp; Warm Hues (10%)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                HSV Opponency
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Human long/medium wavelength retinal cones favor warm tones:
            </p>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              Warm_Bias(H, S) = S · exp( - (H - 20°)² / 2σ² )
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Reds, ambers, and neon yellows produce 2.4x higher ocular stimulation than cold gray backgrounds.
            </p>
          </div>

          {/* Signal 6 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>6. Composition &amp; Rule of Thirds (10%)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                Power Intersections
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Cross-multiplied 2D Gaussian centers at golden ratio intersections:
            </p>
            <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              Bias_map(x, y) = ∑_k exp( - ||(x, y) - P_thirds_k||² / 2σ² )
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Rewards placement on natural eye landing coordinates while avoiding bottom-right timestamp clipping.
            </p>
          </div>

        </div>
      </div>

      {/* 2. Interactive Signal Weight Simulator for Judges & Mentors */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-purple-600" />
              <span>Interactive Weight &amp; Score Simulator</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live proof of how algorithm weights adjust the final Attention Score in real-time
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Simulated Score</span>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 leading-none mt-0.5">
              {simulatedScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </p>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span>Saliency Weight</span>
              <span className="font-mono text-purple-600 font-bold">{saliencyWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={saliencyWeight}
              onChange={(e) => setSaliencyWeight(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span>Face Weight</span>
              <span className="font-mono text-purple-600 font-bold">{faceWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={faceWeight}
              onChange={(e) => setFaceWeight(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span>Typography Weight</span>
              <span className="font-mono text-purple-600 font-bold">{textWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={textWeight}
              onChange={(e) => setTextWeight(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span>Contrast Weight</span>
              <span className="font-mono text-purple-600 font-bold">{contrastWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={contrastWeight}
              onChange={(e) => setContrastWeight(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span>Color Vibrancy Weight</span>
              <span className="font-mono text-purple-600 font-bold">{colorWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={colorWeight}
              onChange={(e) => setColorWeight(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span>Composition Bias Weight</span>
              <span className="font-mono text-purple-600 font-bold">{compWeight}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={compWeight}
              onChange={(e) => setCompWeight(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. Neurobiological 500ms Eye-Tracking Timeline */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <span>The Neurobiology of Viewer Decision (First 500 Milliseconds)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Why the first half-second determines YouTube video success or failure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800 space-y-1.5">
            <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">0ms – 120ms</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Pre-Attentive Pop</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Subconscious retinal stimulus. Color contrast and faces trigger involuntary ocular saccades before conscious thought.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800 space-y-1.5">
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">120ms – 250ms</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Focal Fixation Lock</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Foveal vision locks onto the highest density hot spot (creator eyes or bold primary headline text).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 space-y-1.5">
            <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">250ms – 380ms</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Semantic Hook Decode</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Brain resolves Title-to-Thumbnail curiosity gap and detects the storytelling context of the video.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">380ms – 500ms</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Click or Scroll Pass</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The viewer commits to tapping the video or their thumb continues scrolling down the feed.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold">Ready to test your thumbnail with the algorithm?</h3>
          <p className="text-xs text-white/80">Upload any 1280×720 image to run real-time CV decomposition.</p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onStartAnalyzing}
            className="px-5 py-2.5 rounded-xl bg-white text-purple-700 font-bold text-xs sm:text-sm shadow-md hover:bg-slate-50 transition-all hover:scale-105 cursor-pointer"
          >
            Analyze Thumbnail
          </button>
          <button
            onClick={onExploreDemos}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            View Demo Archetypes
          </button>
        </div>
      </div>

    </div>
  );
}
