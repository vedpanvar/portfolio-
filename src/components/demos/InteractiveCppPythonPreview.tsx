import React, { useState } from 'react';
import { Play, RotateCcw, Code2, Cpu } from 'lucide-react';

export const InteractiveCppVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'astar' | 'dijkstra'>('astar');
  const [hasRun, setHasRun] = useState(true);

  const walls = new Set(['1-2', '2-2', '3-2', '3-4', '4-4', '1-5']);
  const pathCells = new Set(['0-0', '0-1', '0-2', '0-3', '1-3', '2-3', '2-4', '2-5', '3-5', '4-5', '4-6', '5-6', '5-7']);
  const dijkstraExtra = new Set(['1-0', '2-0', '3-0', '4-0', '1-1', '2-1', '3-1', '4-1', '0-4', '0-5', '1-4', '4-2', '5-2']);
  const astarVisited = new Set(['1-0', '1-1', '0-4', '1-4', '3-3']);

  return (
    <div className="rounded-xl border border-white/10 bg-[#121216] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-mono">
            <span>C++17 STL Benchmark</span>
            <span aria-hidden="true">·</span>
            <span>std::priority_queue Grid Simulation</span>
          </div>
          <h4 className="text-base font-semibold text-[#FAFAFA] mt-0.5">
            {algorithm === 'astar' ? 'A* Manhattan Heuristic Search' : "Dijkstra's Uniform Cost Search"}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setAlgorithm('astar');
              setHasRun(true);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              algorithm === 'astar'
                ? 'bg-[#8B5CF6] text-[#FAFAFA] border-[#8B5CF6]'
                : 'bg-[#1A1A22] text-[#A1A1AA] border-white/10 hover:text-[#FAFAFA]'
            }`}
          >
            A* Heuristic
          </button>
          <button
            type="button"
            onClick={() => {
              setAlgorithm('dijkstra');
              setHasRun(true);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              algorithm === 'dijkstra'
                ? 'bg-[#8B5CF6] text-[#FAFAFA] border-[#8B5CF6]'
                : 'bg-[#1A1A22] text-[#A1A1AA] border-white/10 hover:text-[#FAFAFA]'
            }`}
          >
            Dijkstra
          </button>
          <button
            type="button"
            onClick={() => setHasRun(r => !r)}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#1A1A22] border border-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors flex items-center gap-1"
          >
            {hasRun ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{hasRun ? 'Clear' : 'Run'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-8 gap-1.5 p-3 rounded-lg bg-[#09090B] border border-white/10">
            {Array.from({ length: 6 }).map((_, r) =>
              Array.from({ length: 8 }).map((__, c) => {
                const key = `${r}-${c}`;
                const isStart = r === 0 && c === 0;
                const isGoal = r === 5 && c === 7;
                const isWall = walls.has(key);
                const isPath = hasRun && pathCells.has(key);
                const isExplored =
                  hasRun &&
                  !isPath &&
                  (algorithm === 'astar'
                    ? astarVisited.has(key)
                    : astarVisited.has(key) || dijkstraExtra.has(key));

                let cellStyle = 'bg-[#181820] border-white/5 text-[#71717A]';
                if (isStart) cellStyle = 'bg-[#22C55E]/30 border-[#22C55E] text-[#FAFAFA] font-bold';
                else if (isGoal) cellStyle = 'bg-[#ff71ce]/30 border-[#ff71ce] text-[#FAFAFA] font-bold';
                else if (isWall) cellStyle = 'bg-[#272732] border-white/20 text-[#52525B]';
                else if (isPath) cellStyle = 'bg-[#8B5CF6]/45 border-[#A78BFA] text-[#FAFAFA]';
                else if (isExplored) cellStyle = 'bg-[#06B6D4]/20 border-[#06B6D4]/40 text-[#22D3EE]';

                return (
                  <div
                    key={key}
                    className={`aspect-square rounded border flex items-center justify-center text-[11px] font-mono transition-colors ${cellStyle}`}
                  >
                    {isStart ? 'S' : isGoal ? 'G' : isWall ? '#' : isPath ? '•' : ''}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="rounded-lg bg-[#09090B] border border-white/10 p-3.5 space-y-2">
            <div className="flex justify-between text-[#A1A1AA]">
              <span>Shortest Path Length:</span>
              <span className="text-[#FAFAFA] tabular-nums">{hasRun ? '13 nodes' : '—'}</span>
            </div>
            <div className="flex justify-between text-[#A1A1AA]">
              <span>Nodes Relaxed in PQ:</span>
              <span className="text-[#22D3EE] tabular-nums">
                {hasRun ? (algorithm === 'astar' ? '18 nodes' : '31 nodes') : '0 nodes'}
              </span>
            </div>
            <div className="flex justify-between text-[#A1A1AA]">
              <span>Frontier Efficiency:</span>
              <span className="text-[#A78BFA] tabular-nums">
                {algorithm === 'astar' ? '+42% fewer pops' : 'Baseline BFS/Dijkstra'}
              </span>
            </div>
          </div>
          <p className="text-xs font-sans text-[#A1A1AA] leading-relaxed">
            Demonstrates how adding an admissible Manhattan distance heuristic in C++ reduces priority queue pops while guaranteeing the exact same shortest path.
          </p>
        </div>
      </div>
    </div>
  );
};

export const InteractivePythonAnalyzer: React.FC = () => {
  const [snippet, setSnippet] = useState<string>(
`def evaluate_chess_position(board, depth):
    score = 0
    for row in board:
        for piece in row:
            if piece == "Q":
                score += 9
            elif piece == "R":
                score += 5
    return score`
  );

  const lines = snippet.split('\n').filter(l => l.trim().length > 0);
  const branches = (snippet.match(/\b(if|elif|else|for|while|case|&&)\b/g) || []).length;
  const functions = (snippet.match(/\b(def|function|void|int)\b/g) || []).length;
  const complexity = branches + 1;

  return (
    <div className="rounded-xl border border-white/10 bg-[#121216] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-mono">
            <span>Python Static Inspector</span>
            <span aria-hidden="true">·</span>
            <span>Live Lexical Complexity Counter</span>
          </div>
          <h4 className="text-base font-semibold text-[#FAFAFA] mt-0.5">
            Test Code Metrics on Any Python / C++ / JS Snippet
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <label htmlFor="code-analyzer-input" className="sr-only">
            Source code input
          </label>
          <textarea
            id="code-analyzer-input"
            value={snippet}
            onChange={e => setSnippet(e.target.value)}
            rows={7}
            className="w-full rounded-lg bg-[#09090B] border border-white/15 p-3.5 font-mono text-xs text-[#FAFAFA] focus:outline-none focus:border-[#8B5CF6] leading-relaxed"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="rounded-lg bg-[#09090B] border border-white/10 p-4 space-y-2.5 font-mono text-xs tabular-nums">
            <div className="flex items-center justify-between">
              <span className="text-[#A1A1AA]">Non-Empty Lines (LOC):</span>
              <span className="text-[#FAFAFA] font-semibold">{lines.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A1A1AA]">Control-Flow Branches:</span>
              <span className="text-[#22D3EE] font-semibold">{branches}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A1A1AA]">Functions Detected:</span>
              <span className="text-[#A78BFA] font-semibold">{functions}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-[#A1A1AA]">Cyclomatic Complexity:</span>
              <span className="text-[#FAFAFA] font-semibold">
                {complexity} ({complexity <= 6 ? 'Clean / Modular' : 'Refactor Recommended'})
              </span>
            </div>
          </div>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Edit the code above to watch the lexical branch counter and cyclomatic complexity update in real time.
          </p>
        </div>
      </div>
    </div>
  );
};
