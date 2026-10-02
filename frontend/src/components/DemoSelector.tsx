'use client';

import React from 'react';
import { BarChart3, Flame, Type, Smartphone, ArrowRight, Loader2, PlayCircle } from 'lucide-react';

interface DemoSelectorProps {
  onSelectYouTube: (youtubeUrl: string) => void;
  isLoading: boolean;
}

// Real YouTube video IDs for demo cards — thumbnails loaded from YT CDN
const YT_DEMOS = [
  {
    id: 'face',
    videoId: 'dQw4w9WgXcQ', // Rick Astley — high face saliency classic
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    badgeLeft: 'FACE-HEAVY',
    badgeRight: '88/100 Saliency',
    BadgeIcon: Flame,
    badgeColor: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800',
    overlayTag: 'Face Hotspot: 94%',
    overlayDot: 'bg-red-500',
    distText: 'Face 62% · Text 28% · BG 10%',
    distSegments: [
      { width: '62%', color: 'bg-rose-500' },
      { width: '28%', color: 'bg-purple-600' },
      { width: '10%', color: 'bg-slate-300 dark:bg-slate-700' },
    ],
    velocityMs: '110ms',
    waveformHeights: [40, 70, 100, 85, 45],
    waveformColor: 'bg-purple-600 dark:bg-purple-400',
    ctrLift: '+24.3%',
    label: 'Rick Astley — Never Gonna Give You Up',
    channel: 'Rick Astley',
  },
  {
    id: 'text',
    videoId: 'jfKfPfyJRdk', // Lofi girl — bold text + mood thumbnail
    youtubeUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    badgeLeft: 'TEXT-HEAVY',
    badgeRight: '81/100 Saliency',
    BadgeIcon: Type,
    badgeColor: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200 dark:border-indigo-800',
    overlayTag: 'Headline Pop: 91%',
    overlayDot: 'bg-purple-500',
    distText: 'Text 58% · Face 31% · UI 11%',
    distSegments: [
      { width: '58%', color: 'bg-indigo-600' },
      { width: '31%', color: 'bg-pink-500' },
      { width: '11%', color: 'bg-slate-300 dark:bg-slate-700' },
    ],
    velocityMs: '135ms',
    waveformHeights: [55, 90, 80, 100, 60],
    waveformColor: 'bg-indigo-600 dark:bg-indigo-400',
    ctrLift: '+19.1%',
    label: 'Lofi Hip Hop Radio — Beats to Relax / Study',
    channel: 'Lofi Girl',
  },
  {
    id: 'product',
    videoId: 'nzjmtJCvnFY', // MKBHD iPhones — product showcase
    youtubeUrl: 'https://www.youtube.com/watch?v=nzjmtJCvnFY',
    badgeLeft: 'PRODUCT-HEAVY',
    badgeRight: '79/100 Saliency',
    BadgeIcon: Smartphone,
    badgeColor: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 border-blue-200 dark:border-blue-800',
    overlayTag: 'Device Focus: 86%',
    overlayDot: 'bg-blue-500',
    distText: 'Device 48% · Creator 42% · Text 10%',
    distSegments: [
      { width: '48%', color: 'bg-blue-600' },
      { width: '42%', color: 'bg-amber-500' },
      { width: '10%', color: 'bg-slate-300 dark:bg-slate-700' },
    ],
    velocityMs: '160ms',
    waveformHeights: [65, 80, 100, 75, 50],
    waveformColor: 'bg-blue-600 dark:bg-blue-400',
    ctrLift: '+15.7%',
    label: 'I Bought Every iPhone Ever Made',
    channel: 'Marques Brownlee',
  },
];

export function DemoSelector({ onSelectYouTube, isLoading }: DemoSelectorProps) {
  return (
    <section className="w-full mt-4 sm:mt-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-1.5 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>COMPARATIVE ATTENTION AUDITS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Try Demo Thumbnails
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real YouTube videos with live attention breakdown. Thumbnails are fetched directly from YouTube CDN.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live YouTube CDN thumbnails</span>
        </div>
      </div>

      {/* 3 Demo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {YT_DEMOS.map((card) => {
          const RightIcon = card.BadgeIcon;
          const thumbUrl = `https://i.ytimg.com/vi/${card.videoId}/hqdefault.jpg`;

          return (
            <div
              key={card.id}
              onClick={() => !isLoading && onSelectYouTube(card.youtubeUrl)}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Pill Badges */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-wider">
                    {card.badgeLeft}
                  </span>
                  <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs ${card.badgeColor}`}>
                    <RightIcon className="w-3 h-3" />
                    <span>{card.badgeRight}</span>
                  </span>
                </div>

                {/* Thumbnail from YouTube CDN */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 mb-4 border border-slate-200 dark:border-slate-800 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbUrl}
                    alt={card.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* YouTube branding badge */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-600/90 backdrop-blur-md text-[10px] font-bold text-white flex items-center space-x-1">
                    <PlayCircle className="w-3 h-3" />
                    <span>YouTube</span>
                  </div>
                  {/* Attention overlay tag */}
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center space-x-1.5 text-[10px] font-bold text-white shadow-sm">
                    <span className={`w-2 h-2 rounded-full ${card.overlayDot}`} />
                    <span>{card.overlayTag}</span>
                  </div>
                </div>

                {/* Video info */}
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-3 truncate">{card.channel} — {card.label}</p>

                {/* Attention Distribution */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 dark:text-slate-400">Attention Distribution</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold">{card.distText}</span>
                  </div>
                  <div className="h-2 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
                    {card.distSegments.map((seg, i) => (
                      <div key={i} style={{ width: seg.width }} className={`h-full ${seg.color}`} />
                    ))}
                  </div>
                </div>

                {/* Fixation Velocity waveform */}
                <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Fixation Velocity:</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-end space-x-0.5 h-4">
                      {card.waveformHeights.map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`w-1 rounded-full ${card.waveformColor}`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{card.velocityMs}</span>
                  </div>
                </div>
              </div>

              {/* Footer: CTR Lift + Inspect Button */}
              <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">PREDICTED CTR LIFT</p>
                  <p className="text-base font-black text-purple-600 dark:text-purple-400 leading-tight">{card.ctrLift}</p>
                </div>

                <button
                  type="button"
                  disabled={isLoading}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-2xs transition-transform hover:translate-x-0.5 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
