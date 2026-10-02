'use client';

import React, { useState } from 'react';
import { 
  Trophy, 
  Swords, 
  Flame, 
  Eye, 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface FeedBattleViewProps {
  userThumbnailUrl?: string;
  userScore?: number;
  onAnalyzeNew?: () => void;
}

type NicheType = 'tech' | 'gaming' | 'finance' | 'lifestyle';

interface CompetitorVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  timeAgo: string;
  thumbnail: string;
  attentionShare: number; // percentage
  gazeOrder: number;
}

export function FeedBattleView({
  userThumbnailUrl = '/samples/sample_face.jpg',
  userScore = 82,
  onAnalyzeNew,
}: FeedBattleViewProps) {
  const [selectedNiche, setSelectedNiche] = useState<NicheType>('tech');
  const [showFeedHeatmap, setShowFeedHeatmap] = useState(false);

  // Competitor data by niche
  const nicheData: Record<NicheType, { name: string; competitors: CompetitorVideo[] }> = {
    tech: {
      name: 'Tech & AI / Gadgets',
      competitors: [
        {
          id: 'c1',
          title: 'I Tested The Most Powerful AI Laptop Ever Made!',
          channel: 'Marques Brownlee',
          views: '1.8M views',
          timeAgo: '1 day ago',
          thumbnail: '/samples/sample_product.jpg',
          attentionShare: 22,
          gazeOrder: 2,
        },
        {
          id: 'c2',
          title: 'DO NOT BUY ANY TECH IN 2025 BEFORE WATCHING THIS',
          channel: 'Dave2D',
          views: '940K views',
          timeAgo: '3 days ago',
          thumbnail: '/samples/sample_text.jpg',
          attentionShare: 19,
          gazeOrder: 3,
        },
        {
          id: 'c3',
          title: 'We Built An All-Glass Quantum Computer',
          channel: 'Linus Tech Tips',
          views: '2.4M views',
          timeAgo: '4 days ago',
          thumbnail: '/samples/sample_face.jpg',
          attentionShare: 14,
          gazeOrder: 4,
        },
        {
          id: 'c4',
          title: 'The End of Coding as We Know It?',
          channel: 'Fireship',
          views: '3.1M views',
          timeAgo: '1 week ago',
          thumbnail: '/samples/sample_product.jpg',
          attentionShare: 9,
          gazeOrder: 5,
        },
        {
          id: 'c5',
          title: 'Apple M4 Ultra Chip Architecture Deep Dive',
          channel: 'Geekerwan',
          views: '620K views',
          timeAgo: '2 weeks ago',
          thumbnail: '/samples/sample_text.jpg',
          attentionShare: 6,
          gazeOrder: 6,
        },
      ],
    },
    gaming: {
      name: 'Gaming & Esports',
      competitors: [
        {
          id: 'g1',
          title: '100 Players Survived 100 Days in The Nether!',
          channel: 'MrBeast Gaming',
          views: '8.4M views',
          timeAgo: '2 days ago',
          thumbnail: '/samples/sample_face.jpg',
          attentionShare: 24,
          gazeOrder: 2,
        },
        {
          id: 'g2',
          title: 'GTA 6 Gameplay Leak Exposed Everything',
          channel: 'IGN',
          views: '4.2M views',
          timeAgo: '5 days ago',
          thumbnail: '/samples/sample_text.jpg',
          attentionShare: 18,
          gazeOrder: 3,
        },
        {
          id: 'g3',
          title: 'I Spent $50,000 on Counter-Strike 2 Cases',
          channel: 'Shroud',
          views: '1.2M views',
          timeAgo: '1 week ago',
          thumbnail: '/samples/sample_product.jpg',
          attentionShare: 13,
          gazeOrder: 4,
        },
        {
          id: 'g4',
          title: 'The Hardest Boss Fight in Elden Ring DLC',
          channel: 'VaatiVidya',
          views: '980K views',
          timeAgo: '3 weeks ago',
          thumbnail: '/samples/sample_face.jpg',
          attentionShare: 10,
          gazeOrder: 5,
        },
        {
          id: 'g5',
          title: 'Fortnite Chapter 6 Just Changed Forever',
          channel: 'Ninja',
          views: '740K views',
          timeAgo: '1 month ago',
          thumbnail: '/samples/sample_text.jpg',
          attentionShare: 7,
          gazeOrder: 6,
        },
      ],
    },
    finance: {
      name: 'Finance & Investing',
      competitors: [
        {
          id: 'f1',
          title: 'The 2025 Market Crash Will Be Different',
          channel: 'Graham Stephan',
          views: '1.1M views',
          timeAgo: '3 days ago',
          thumbnail: '/samples/sample_text.jpg',
          attentionShare: 21,
          gazeOrder: 2,
        },
        {
          id: 'f2',
          title: 'How I Make $38,000/Month Passive Income',
          channel: 'Ali Abdaal',
          views: '1.6M views',
          timeAgo: '6 days ago',
          thumbnail: '/samples/sample_face.jpg',
          attentionShare: 20,
          gazeOrder: 3,
        },
        {
          id: 'f3',
          title: 'Warren Buffett Just Sold 50% of Apple Stock',
          channel: 'Meet Kevin',
          views: '850K views',
          timeAgo: '1 week ago',
          thumbnail: '/samples/sample_product.jpg',
          attentionShare: 14,
          gazeOrder: 4,
        },
        {
          id: 'f4',
          title: 'The Global Real Estate Bubble is Popping',
          channel: 'Economics Explained',
          views: '1.3M views',
          timeAgo: '2 weeks ago',
          thumbnail: '/samples/sample_text.jpg',
          attentionShare: 10,
          gazeOrder: 5,
        },
        {
          id: 'f5',
          title: 'Top 5 Index Funds for Beginners (Set & Forget)',
          channel: 'Humphrey Yang',
          views: '520K views',
          timeAgo: '1 month ago',
          thumbnail: '/samples/sample_face.jpg',
          attentionShare: 7,
          gazeOrder: 6,
        },
      ],
    },
    lifestyle: {
      name: 'Lifestyle & Documentaries',
      competitors: [
        {
          id: 'l1',
          title: 'I Spent 7 Days Living in an Abandoned Bunker',
          channel: 'Yes Theory',
          views: '3.4M views',
          timeAgo: '4 days ago',
          thumbnail: '/samples/sample_face.jpg',
          attentionShare: 23,
          gazeOrder: 2,
        },
        {
          id: 'l2',
          title: 'Why Tokyo is the Cleanest Megacity on Earth',
          channel: 'Johnny Harris',
          views: '2.1M views',
          timeAgo: '1 week ago',
          thumbnail: '/samples/sample_product.jpg',
          attentionShare: 18,
          gazeOrder: 3,
        },
        {
          id: 'l3',
          title: 'Inside a $150,000,000 Private Superyacht',
          channel: 'Enes Yilmazer',
          views: '4.8M views',
          timeAgo: '2 weeks ago',
          thumbnail: '/samples/sample_text.jpg',
          attentionShare: 15,
          gazeOrder: 4,
        },
        {
          id: 'l4',
          title: 'My Minimalist Morning Routine at 5:00 AM',
          channel: 'Matt D\'Avella',
          views: '920K views',
          timeAgo: '3 weeks ago',
          thumbnail: '/samples/sample_face.jpg',
          attentionShare: 9,
          gazeOrder: 5,
        },
        {
          id: 'l5',
          title: 'The Real Cost of Van Life in 2025',
          channel: 'Lexie Alford',
          views: '610K views',
          timeAgo: '1 month ago',
          thumbnail: '/samples/sample_product.jpg',
          attentionShare: 7,
          gazeOrder: 6,
        },
      ],
    },
  };

  const currentNicheData = nicheData[selectedNiche];
  const userAttentionShare = 30; // user captures 30% of total impressions
  const baselineShare = Math.round(100 / 6); // ~17%

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pt-2">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">
            <Swords className="w-3.5 h-3.5 text-purple-600" />
            <span>ALGORITHMIC FEED SIMULATOR &amp; COMPETITOR BENCHMARK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            YouTube Feed Battle Arena
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Viewers never see your thumbnail in isolation. Test your thumbnail inside a live simulated YouTube home feed alongside trending videos in your category to calculate your true <strong>Attention Steal Rate</strong>.
          </p>
        </div>

        {/* Niche Selector Pills & Heatmap Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Niche Tabs */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            {(['tech', 'gaming', 'finance', 'lifestyle'] as const).map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                  selectedNiche === niche
                    ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {niche}
              </button>
            ))}
          </div>

          {/* Toggle Feed Heatmap Button */}
          <button
            onClick={() => setShowFeedHeatmap(!showFeedHeatmap)}
            className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border ${
              showFeedHeatmap
                ? 'bg-rose-500 text-white border-rose-600 shadow-rose-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{showFeedHeatmap ? 'Hide Feed Heatmap' : 'Simulate Feed Heatmap'}</span>
          </button>
        </div>
      </div>

      {/* Attention Steal Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">YOUR ATTENTION STEAL RATE</p>
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">{userAttentionShare}%</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              +13.3% vs avg
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Fair share baseline: {baselineShare}% per video</p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">FIRST-PASS GAZE RANK</p>
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">#1 in Feed</span>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">First eye fixation occurs at ~120ms</p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CLUTTER-RESISTANCE SCORE</p>
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">88 / 100</span>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">High contrast cuts through feed noise</p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PREDICTED CTR ADVANTAGE</p>
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-500">+22.4%</span>
            <TrendingUp className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Based on rapid cognitive lock-in</p>
        </div>
      </div>

      {/* Simulated Live YouTube Home Feed (6-Card Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          <span>SIMULATED YOUTUBE RECOMMENDATION FEED ({currentNicheData.name})</span>
          <span>AUTONOMOUS ATTENTION SIMULATION</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white shadow-xl relative overflow-hidden">
          
          {/* CARD 1: Competitor 1 */}
          <div className="space-y-3 group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentNicheData.competitors[0].thumbnail} alt="Comp 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">14:22</div>
              {showFeedHeatmap && (
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-amber-400/20 to-transparent pointer-events-none" />
              )}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-purple-300">
                Fixation #{currentNicheData.competitors[0].gazeOrder} ({currentNicheData.competitors[0].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">{currentNicheData.competitors[0].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[0].channel} • {currentNicheData.competitors[0].views} • {currentNicheData.competitors[0].timeAgo}</p>
            </div>
          </div>

          {/* CARD 2: YOUR THUMBNAIL (THE HERO CHALLENGER!) */}
          <div className="space-y-3 relative group cursor-pointer p-2.5 -m-2.5 rounded-2xl bg-purple-950/40 border-2 border-purple-500/80 shadow-lg shadow-purple-500/20">
            <div className="flex items-center justify-between text-[11px] font-bold text-purple-300 mb-1">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>YOUR VIDEO (POSITION #2)</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-black">
                ★ ATTENTION LEADER (30%)
              </span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-purple-400/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={userThumbnailUrl} alt="Your Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">12:45</div>
              
              {/* Simulated Saliency Thermal Center */}
              <div className="absolute top-[28%] right-[24%] w-24 h-24 rounded-full pointer-events-none" style={{
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(249, 115, 22, 0.6) 40%, transparent 80%)',
                filter: 'blur(10px)',
              }} />

              {/* Fixation Pin #1 */}
              <div className="absolute top-[28%] right-[24%] -translate-x-1/2 -translate-y-1/2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-lg ring-4 ring-red-500/40 animate-pulse">
                  1
                </span>
              </div>

              {showFeedHeatmap && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/40 via-yellow-400/30 to-blue-500/20 pointer-events-none" />
              )}
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug text-white">
                Understand Attention: How to 10x Your YouTube Thumbnail CTR
              </h4>
              <p className="text-[11px] text-purple-300">Your Channel • Predicted Top 5% Performance</p>
            </div>
          </div>

          {/* CARD 3: Competitor 2 */}
          <div className="space-y-3 group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentNicheData.competitors[1].thumbnail} alt="Comp 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">08:15</div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
                Fixation #{currentNicheData.competitors[1].gazeOrder} ({currentNicheData.competitors[1].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">{currentNicheData.competitors[1].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[1].channel} • {currentNicheData.competitors[1].views} • {currentNicheData.competitors[1].timeAgo}</p>
            </div>
          </div>

          {/* CARD 4: Competitor 3 */}
          <div className="space-y-3 group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentNicheData.competitors[2].thumbnail} alt="Comp 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">19:30</div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
                Fixation #{currentNicheData.competitors[2].gazeOrder} ({currentNicheData.competitors[2].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">{currentNicheData.competitors[2].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[2].channel} • {currentNicheData.competitors[2].views} • {currentNicheData.competitors[2].timeAgo}</p>
            </div>
          </div>

          {/* CARD 5: Competitor 4 */}
          <div className="space-y-3 group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentNicheData.competitors[3].thumbnail} alt="Comp 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">11:04</div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
                Fixation #{currentNicheData.competitors[3].gazeOrder} ({currentNicheData.competitors[3].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">{currentNicheData.competitors[3].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[3].channel} • {currentNicheData.competitors[3].views} • {currentNicheData.competitors[3].timeAgo}</p>
            </div>
          </div>

          {/* CARD 6: Competitor 5 */}
          <div className="space-y-3 group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentNicheData.competitors[4].thumbnail} alt="Comp 5" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">25:12</div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
                Fixation #{currentNicheData.competitors[4].gazeOrder} ({currentNicheData.competitors[4].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">{currentNicheData.competitors[4].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[4].channel} • {currentNicheData.competitors[4].views} • {currentNicheData.competitors[4].timeAgo}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Strategic Feed Takeaways */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Algorithmic Battle Diagnostics</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Face Contrast Superiority</span>
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Your high-contrast rim lighting captures eye fixations 40ms faster than Dave2D and Linus Tech Tips.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Title-Thumbnail Curiosity Gap</span>
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Your thumbnail text doesn’t repeat the video title word-for-word, giving viewers two distinct cognitive hooks.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
              <span>Mobile Feed Legibility</span>
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              At 168px mobile card scale, your primary headline remains 100% readable without timestamp occlusion.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
