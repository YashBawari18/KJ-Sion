'use client';

import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <div className="w-full max-w-5xl mx-auto my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-600 text-xs flex items-start space-x-3 shadow-xs">
      <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="text-slate-800">Scientific Positioning Notice:</strong> This software computes{' '}
        <strong>predicted visual attention</strong> using algorithmic computer vision heuristics (saliency maps,
        facial detection, contrast gradients, and central bias). It is{' '}
        <strong>not real physical eye-tracking data</strong>, does not measure human ocular fixations, and does not guarantee
        specific click-through rates (CTR) or conversions.
      </div>
    </div>
  );
}
