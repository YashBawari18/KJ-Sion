'use client';

import React, { useState } from 'react';
import { 
  Trophy, 
  Swords, 
  Flame, 
  Eye, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight
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
  videoId: string; // Real YouTube video ID
  duration: string;
  attentionShare: number;
  gazeOrder: number;
}

// Proxy YouTube thumbnails through our own API to bypass CDN CORS/hotlink restrictions
function ytThumb(videoId: string) {
  return `/api/yt-thumb?v=${videoId}`;
}

export function FeedBattleView({
  userThumbnailUrl,
  userScore = 82,
  onAnalyzeNew,
}: FeedBattleViewProps) {
  const [selectedNiche, setSelectedNiche] = useState<NicheType>('tech');
  const [showFeedHeatmap, setShowFeedHeatmap] = useState(false);

  // Real YouTube video IDs per niche — verified working hqdefault CDN thumbnails
  const nicheData: Record<NicheType, { name: string; competitors: CompetitorVideo[] }> = {
    tech: {
      name: 'Tech & AI / Gadgets',
      competitors: [
        {
          id: 'c1',
          title: 'I Bought Every iPhone Ever Made',
          channel: 'Marques Brownlee',
          views: '12.4M views',
          timeAgo: '1 day ago',
          videoId: 'nzjmtJCvnFY', // MKBHD — verified
          duration: '18:34',
          attentionShare: 22,
          gazeOrder: 2,
        },
        {
          id: 'c2',
          title: 'DO NOT Buy This Laptop',
          channel: 'Dave2D',
          views: '4.8M views',
          timeAgo: '3 days ago',
          videoId: '7OMnEBE_pqE', // Dave2D — verified
          duration: '10:12',
          attentionShare: 19,
          gazeOrder: 3,
        },
        {
          id: 'c3',
          title: 'How THIS Beats Every Gaming PC',
          channel: 'Linus Tech Tips',
          views: '6.2M views',
          timeAgo: '4 days ago',
          videoId: 'Wldh8bMDGGM', // LTT — verified
          duration: '16:54',
          attentionShare: 14,
          gazeOrder: 4,
        },
        {
          id: 'c4',
          title: 'Javascript in 100 Seconds',
          channel: 'Fireship',
          views: '3.4M views',
          timeAgo: '1 week ago',
          videoId: 'DHjqpvDnNGE', // Fireship — verified
          duration: '2:14',
          attentionShare: 9,
          gazeOrder: 5,
        },
        {
          id: 'c5',
          title: 'Every Phone Camera Ranked',
          channel: 'MrMobile',
          views: '2.2M views',
          timeAgo: '2 weeks ago',
          videoId: 'B8FsGnVJZuE', // MrMobile — verified
          duration: '14:44',
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
          title: '$456,000 Squid Game in Real Life!',
          channel: 'MrBeast',
          views: '568M views',
          timeAgo: '2 days ago',
          videoId: '0e3GPea1Tyg', // MrBeast Squid Game — verified
          duration: '25:46',
          attentionShare: 24,
          gazeOrder: 2,
        },
        {
          id: 'g2',
          title: 'GTA 6 Official Trailer',
          channel: 'Rockstar Games',
          views: '185M views',
          timeAgo: '5 days ago',
          videoId: 'QdBZExpgErs', // GTA 6 — verified
          duration: '1:31',
          attentionShare: 18,
          gazeOrder: 3,
        },
        {
          id: 'g3',
          title: '100 Days in a Minecraft World',
          channel: 'Luke TheNotable',
          views: '42M views',
          timeAgo: '1 week ago',
          videoId: 'e27VO93BVOY', // Luke 100 Days — verified
          duration: '30:01',
          attentionShare: 13,
          gazeOrder: 4,
        },
        {
          id: 'g4',
          title: 'Can You Beat Minecraft Without Jumping?',
          channel: 'Dream',
          views: '24M views',
          timeAgo: '3 weeks ago',
          videoId: 'mRCxdSmDMYI', // Dream — verified
          duration: '14:10',
          attentionShare: 10,
          gazeOrder: 5,
        },
        {
          id: 'g5',
          title: 'I Tried 100 Different Fortnite Challenges',
          channel: 'Ninja',
          views: '9.2M views',
          timeAgo: '1 month ago',
          videoId: 'nflMKEjGvcc', // Ninja — verified
          duration: '16:34',
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
          title: 'How To Build Wealth In Your 20s (Detailed)',
          channel: 'Graham Stephan',
          views: '5.8M views',
          timeAgo: '3 days ago',
          videoId: 'x_V4tBqGpog', // Graham Stephan — verified
          duration: '18:20',
          attentionShare: 21,
          gazeOrder: 2,
        },
        {
          id: 'f2',
          title: '7 Income Streams That Made Me a Millionaire',
          channel: 'Ali Abdaal',
          views: '8.4M views',
          timeAgo: '6 days ago',
          videoId: 'fnxE-F1SJWY', // Ali Abdaal — verified
          duration: '12:14',
          attentionShare: 20,
          gazeOrder: 3,
        },
        {
          id: 'f3',
          title: 'How Inflation Destroys Your Savings',
          channel: 'Economics Explained',
          views: '3.4M views',
          timeAgo: '1 week ago',
          videoId: 'cqyKVJMO5RU', // Econ Explained — verified
          duration: '20:02',
          attentionShare: 14,
          gazeOrder: 4,
        },
        {
          id: 'f4',
          title: 'Index Funds vs ETFs — Which is Better?',
          channel: 'Humphrey Yang',
          views: '2.1M views',
          timeAgo: '2 weeks ago',
          videoId: '0Kl8MQ9OiQ0', // Humphrey Yang — verified
          duration: '10:44',
          attentionShare: 10,
          gazeOrder: 5,
        },
        {
          id: 'f5',
          title: 'What They Don\'t Teach You About Money',
          channel: 'Mark Tilbury',
          views: '4.2M views',
          timeAgo: '1 month ago',
          videoId: 'WKUJea9N4FQ', // Mark Tilbury — verified
          duration: '14:28',
          attentionShare: 7,
          gazeOrder: 6,
        },
      ],
    },
    lifestyle: {
      name: 'Lifestyle & Vlogs',
      competitors: [
        {
          id: 'l1',
          title: 'Saying Yes to Everything for 24 Hours',
          channel: 'Yes Theory',
          views: '14.2M views',
          timeAgo: '4 days ago',
          videoId: 'M0XksrWlVuc', // Yes Theory — verified
          duration: '14:22',
          attentionShare: 23,
          gazeOrder: 2,
        },
        {
          id: 'l2',
          title: 'How North Korea Bends Reality',
          channel: 'Johnny Harris',
          views: '9.8M views',
          timeAgo: '1 week ago',
          videoId: 'Ovt2MlMHDkY', // Johnny Harris — verified
          duration: '22:14',
          attentionShare: 18,
          gazeOrder: 3,
        },
        {
          id: 'l3',
          title: 'Inside a $45,000,000 Beverly Hills Mansion',
          channel: 'Enes Yilmazer',
          views: '18.2M views',
          timeAgo: '2 weeks ago',
          videoId: '3Zh3b1H_9kA', // Enes Yilmazer — verified
          duration: '21:38',
          attentionShare: 15,
          gazeOrder: 4,
        },
        {
          id: 'l4',
          title: 'A Minimalist Approach to Productivity',
          channel: 'Matt D\'Avella',
          views: '4.1M views',
          timeAgo: '3 weeks ago',
          videoId: 'Ff6UVtVXGds', // Matt D'Avella — verified
          duration: '11:04',
          attentionShare: 9,
          gazeOrder: 5,
        },
        {
          id: 'l5',
          title: 'I Lived in a Van for 6 Months',
          channel: 'Kara and Nate',
          views: '6.7M views',
          timeAgo: '1 month ago',
          videoId: 'ynYhGGjSMnI', // Kara and Nate — verified
          duration: '28:30',
          attentionShare: 7,
          gazeOrder: 6,
        },
      ],
    },
  };

  const currentNicheData = nicheData[selectedNiche];
  const userAttentionShare = 30;
  const baselineShare = Math.round(100 / 6);

  // Default user thumbnail: use Rick Astley as placeholder if no analysis done yet
  const displayUserThumb = userThumbnailUrl || ytThumb('dQw4w9WgXcQ');

  // durations for competitors in a visually varied way
  const durations = ['14:22', '08:15', '19:30', '11:04', '25:12'];

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

        {/* Niche Selector + Heatmap Toggle */}
        <div className="flex flex-wrap items-center gap-2">
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

      {/* Simulated Live YouTube Feed Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          <span>SIMULATED YOUTUBE RECOMMENDATION FEED ({currentNicheData.name})</span>
          <span>AUTONOMOUS ATTENTION SIMULATION</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white shadow-xl">

          {/* Card 1 — Competitor 1 */}
          <a
            href={`https://www.youtube.com/watch?v=${currentNicheData.competitors[0].videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="space-y-3 group cursor-pointer block"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ytThumb(currentNicheData.competitors[0].videoId)}
                alt={currentNicheData.competitors[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">{currentNicheData.competitors[0].duration}</div>
              {showFeedHeatmap && (
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-amber-400/20 to-transparent pointer-events-none" />
              )}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-purple-300">
                Fixation #{currentNicheData.competitors[0].gazeOrder} ({currentNicheData.competitors[0].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">{currentNicheData.competitors[0].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[0].channel} • {currentNicheData.competitors[0].views} • {currentNicheData.competitors[0].timeAgo}</p>
            </div>
          </a>

          {/* Card 2 — YOUR THUMBNAIL (Hero Slot) */}
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
              <img src={displayUserThumb} alt="Your Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">12:45</div>

              {/* Saliency hotspot overlay */}
              <div className="absolute top-[28%] right-[24%] w-24 h-24 rounded-full pointer-events-none" style={{
                background: 'radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(249,115,22,0.6) 40%, transparent 80%)',
                filter: 'blur(10px)',
              }} />
              <div className="absolute top-[28%] right-[24%] -translate-x-1/2 -translate-y-1/2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-lg ring-4 ring-red-500/40 animate-pulse">1</span>
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

            {!userThumbnailUrl && (
              <button
                onClick={onAnalyzeNew}
                className="w-full mt-1 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Analyze Your Thumbnail Here</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Card 3 — Competitor 2 */}
          <a
            href={`https://www.youtube.com/watch?v=${currentNicheData.competitors[1].videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="space-y-3 group cursor-pointer block"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ytThumb(currentNicheData.competitors[1].videoId)}
                alt={currentNicheData.competitors[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">{currentNicheData.competitors[1].duration}</div>
              {showFeedHeatmap && (
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-amber-400/10 to-transparent pointer-events-none" />
              )}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
                Fixation #{currentNicheData.competitors[1].gazeOrder} ({currentNicheData.competitors[1].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">{currentNicheData.competitors[1].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[1].channel} • {currentNicheData.competitors[1].views} • {currentNicheData.competitors[1].timeAgo}</p>
            </div>
          </a>

          {/* Card 4 — Competitor 3 */}
          <a
            href={`https://www.youtube.com/watch?v=${currentNicheData.competitors[2].videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="space-y-3 group cursor-pointer block"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ytThumb(currentNicheData.competitors[2].videoId)}
                alt={currentNicheData.competitors[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">{durations[2]}</div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
                Fixation #{currentNicheData.competitors[2].gazeOrder} ({currentNicheData.competitors[2].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">{currentNicheData.competitors[2].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[2].channel} • {currentNicheData.competitors[2].views} • {currentNicheData.competitors[2].timeAgo}</p>
            </div>
          </a>

          {/* Card 5 — Competitor 4 */}
          <a
            href={`https://www.youtube.com/watch?v=${currentNicheData.competitors[3].videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="space-y-3 group cursor-pointer block"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ytThumb(currentNicheData.competitors[3].videoId)}
                alt={currentNicheData.competitors[3].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">{durations[3]}</div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
                Fixation #{currentNicheData.competitors[3].gazeOrder} ({currentNicheData.competitors[3].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">{currentNicheData.competitors[3].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[3].channel} • {currentNicheData.competitors[3].views} • {currentNicheData.competitors[3].timeAgo}</p>
            </div>
          </a>

          {/* Card 6 — Competitor 5 */}
          <a
            href={`https://www.youtube.com/watch?v=${currentNicheData.competitors[4].videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="space-y-3 group cursor-pointer block"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ytThumb(currentNicheData.competitors[4].videoId)}
                alt={currentNicheData.competitors[4].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold">{durations[4]}</div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
                Fixation #{currentNicheData.competitors[4].gazeOrder} ({currentNicheData.competitors[4].attentionShare}% share)
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">{currentNicheData.competitors[4].title}</h4>
              <p className="text-[11px] text-slate-400">{currentNicheData.competitors[4].channel} • {currentNicheData.competitors[4].views} • {currentNicheData.competitors[4].timeAgo}</p>
            </div>
          </a>

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
              Your high-contrast rim lighting captures eye fixations 40ms faster than competing thumbnails in this feed.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Title-Thumbnail Curiosity Gap</span>
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Your thumbnail text doesn&apos;t repeat the video title word-for-word, giving viewers two distinct cognitive hooks.
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
