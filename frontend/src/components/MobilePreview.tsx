'use client';

import React from 'react';
import { Smartphone, Monitor, AlertTriangle } from 'lucide-react';

interface MobilePreviewProps {
  imageSrc: string;
}

export function MobilePreview({ imageSrc }: MobilePreviewProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Real YouTube Feed Simulator</h3>
            <p className="text-[11px] text-slate-500">Test small-screen legibility & timestamp occlusion</p>
          </div>
        </div>

        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
          168px Mobile & Desktop
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* Mobile Preview (168px width standard card) */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 mb-2">
            <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
            <span>Mobile YouTube App (168px)</span>
          </div>

          <div className="w-[168px] mx-auto bg-black rounded-lg overflow-hidden relative shadow-sm border border-slate-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="Mobile thumbnail preview"
              className="w-full aspect-video object-cover"
            />
            {/* YouTube Timestamp badge simulation */}
            <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/85 text-white text-[9px] font-bold rounded tracking-tight">
              12:45
            </div>
          </div>

          {/* Simulated Mobile Feed Title */}
          <div className="w-[168px] mx-auto mt-2 space-y-1">
            <div className="h-2.5 bg-slate-300 rounded w-full" />
            <div className="h-2 bg-slate-200 rounded w-3/4" />
            <div className="text-[9px] text-slate-400 mt-1">Creator · 1.2M views · 2 days ago</div>
          </div>
        </div>

        {/* Desktop Feed Preview */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 mb-2">
            <Monitor className="w-3.5 h-3.5 text-indigo-600" />
            <span>Desktop YouTube Home (Compact)</span>
          </div>

          <div className="w-full max-w-[260px] mx-auto bg-black rounded-lg overflow-hidden relative shadow-sm border border-slate-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="Desktop thumbnail preview"
              className="w-full aspect-video object-cover"
            />
            {/* YouTube Timestamp badge */}
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/85 text-white text-[10px] font-bold rounded tracking-tight">
              12:45
            </div>
          </div>

          <div className="w-full max-w-[260px] mx-auto mt-2 space-y-1">
            <div className="h-3 bg-slate-300 rounded w-5/6" />
            <div className="h-2 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      </div>

      {/* Timestamp safe-zone warning */}
      <div className="mt-4 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-amber-800 text-xs flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Pro-Tip:</strong> The bottom-right corner is reserved for YouTube duration badges. Keep logos, faces, and text clear of this area.
        </span>
      </div>
    </div>
  );
}
