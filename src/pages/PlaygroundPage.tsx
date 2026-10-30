import React, { useState } from 'react';
import { ExternalLink, Sparkles, RotateCcw } from 'lucide-react';
import { InteractiveChessPreview } from '../components/demos/InteractiveChessPreview';
import { InteractiveCalculatorPreview } from '../components/demos/InteractiveCalculatorPreview';
import {
  InteractiveCppVisualizer,
  InteractivePythonAnalyzer
} from '../components/demos/InteractiveCppPythonPreview';

type StaggerDirection = 'diagonal' | 'radial' | 'row' | 'column';

export const PlaygroundPage: React.FC = () => {
  const [staggerDir, setStaggerDir] = useState<StaggerDirection>('diagonal');
  const [staggerKey, setStaggerKey] = useState<number>(0);

  const computeStaggerDelay = (row: number, col: number, dir: StaggerDirection): number => {
    const baseDelay = 55;
    if (dir === 'diagonal') return (row + col) * baseDelay;
    if (dir === 'row') return row * baseDelay * 1.4;
    if (dir === 'column') return col * baseDelay * 1.4;
    // radial from center (1.5, 2.5)
    const dist = Math.hypot(row - 1, col - 2);
    return Math.round(dist * baseDelay * 1.5);
  };

  const stackTiles = [
    { title: 'Python', sub: 'Algorithms & AST' },
    { title: 'C++17', sub: 'STL & Graph DSA' },
    { title: 'HTML5', sub: 'Semantic Markup' },
    { title: 'CSS3', sub: 'Dark UI & Grid' },
    { title: 'JavaScript', sub: 'State & DOM Engine' },
    { title: 'AI & Vibe Coding', sub: 'Prompt Velocity' },
    { title: 'Firebase', sub: 'Firestore & Auth' },
    { title: 'Supabase', sub: 'Postgres & Realtime' },
    { title: 'playchessx.online', sub: 'Chess Platform' },
    { title: 'socialcalculator.site', sub: 'Creator Analytics' },
    { title: 'GitHub', sub: 'Source Control' },
    { title: 'LinkedIn', sub: 'CSSS Network' },
    { title: '1st Year CSSS', sub: 'B.Tech Foundations' }
  ];

  return (
    <div className="px-6 py-12 sm:py-16 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-3 pb-8 border-b border-white/10 max-w-3xl">
        <div className="text-xs font-mono text-[#A1A1AA]">
          Interactive Web &amp; Motion Sandbox
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAFAFA]">
          Live Website Lab &amp; Stagger Studio
        </h1>
        <p className="text-base text-[#A1A1AA] leading-relaxed">
          Test both of my created websites—<strong className="text-[#FAFAFA]">playchessx.online</strong> and{' '}
          <strong className="text-[#FAFAFA]">socialcalculator.site</strong>—alongside C++ &amp; Python algorithm tools and choreographed UI stagger patterns.
        </p>
      </div>

      {/* Created Websites Side-by-Side Live Sandbox */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#22D3EE]">
              01. Live Created Websites (HTML · CSS · JavaScript)
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
              playchessx.online &amp; socialcalculator.site
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://playchessx.online"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <span>playchessx.online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://socialcalculator.site"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] border border-white/15 text-[#22D3EE] text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <span>socialcalculator.site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <InteractiveChessPreview />
          <InteractiveCalculatorPreview />
        </div>
      </section>

      {/* C++ & Python Interactive Labs */}
      <section className="space-y-6 pt-8 border-t border-white/10">
        <div>
          <div className="text-xs font-mono text-[#A78BFA]">
            02. First-Year CSSS Algorithms (C++ &amp; Python)
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
            C++ Pathfinding &amp; Python Code Complexity Lab
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <InteractiveCppVisualizer />
          <InteractivePythonAnalyzer />
        </div>
      </section>

      {/* Interactive Stagger & Motion Choreography Lab */}
      <section className="space-y-6 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-[#ff71ce]">
              03. Choreographed Stagger System
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
              Directional Grid Stagger Inspector
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['diagonal', 'radial', 'row', 'column'] as const).map(dir => (
              <button
                key={dir}
                type="button"
                onClick={() => {
                  setStaggerDir(dir);
                  setStaggerKey(k => k + 1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize border transition-colors ${
                  staggerDir === dir
                    ? 'bg-[#8B5CF6] text-[#FAFAFA] border-[#8B5CF6]'
                    : 'bg-[#121216] text-[#A1A1AA] border-white/10 hover:text-[#FAFAFA]'
                }`}
              >
                {dir}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setStaggerKey(k => k + 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#1A1A22] text-[#22D3EE] border border-white/10 hover:bg-[#242430] inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>
          </div>
        </div>

        <div
          key={staggerKey}
          className="grid grid-cols-2 sm:grid-cols-5 gap-3.5"
          aria-label="Staggered skill and project tiles"
        >
          {stackTiles.map((tile, idx) => {
            const row = Math.floor(idx / 5);
            const col = idx % 5;
            const delayMs = computeStaggerDelay(row, col, staggerDir);

            return (
              <div
                key={tile.title}
                style={{
                  animation: `fadeInUpTile 420ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms both`
                }}
                className="rounded-xl border border-white/10 bg-[#121216] p-4 hover-card-lift"
              >
                <div className="font-mono text-[11px] text-[#71717A] tabular-nums">
                  +{delayMs}ms
                </div>
                <div className="font-display font-bold text-[#FAFAFA] mt-1">
                  {tile.title}
                </div>
                <div className="text-xs text-[#A1A1AA] mt-0.5">{tile.sub}</div>
              </div>
            );
          })}
        </div>
        <style>{`
          @keyframes fadeInUpTile {
            from {
              opacity: 0;
              transform: translateY(16px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </section>
    </div>
  );
};
