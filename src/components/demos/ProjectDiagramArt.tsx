import React from 'react';

interface DiagramProps {
  type: 'chess-board' | 'chess-engine' | 'calc-interface' | 'calc-parser' | 'cpp-graph' | 'python-ast';
  className?: string;
}

export const ProjectDiagramArt: React.FC<DiagramProps> = ({ type, className = '' }) => {
  if (type === 'chess-board' || type === 'chess-engine') {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#0F0F17] via-[#151324] to-[#0B1724] flex items-center justify-center p-6 ${className}`}
      >
        <div className="absolute inset-0 perspective-grid-floor opacity-30 pointer-events-none" />
        <svg viewBox="0 0 600 340" className="w-full h-full max-h-[300px]" aria-label="playchessx.online architecture diagram">
          <defs>
            <linearGradient id="chessGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          {/* Window Frame */}
          <rect x="20" y="16" width="560" height="308" rx="12" fill="#09090B" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
          <rect x="20" y="16" width="560" height="34" rx="12" fill="#161622" />
          <circle cx="42" cy="33" r="5" fill="#ff71ce" />
          <circle cx="58" cy="33" r="5" fill="#ff9770" />
          <circle cx="74" cy="33" r="5" fill="#01cdfe" />
          <text x="98" y="37" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono, monospace">
            https://playchessx.online — Interactive Board Engine
          </text>

          {/* Mini 8x8 Chessboard Vector */}
          <g transform="translate(46, 68)">
            <rect x="0" y="0" width="224" height="224" rx="6" fill="#181824" stroke="url(#chessGrad)" strokeWidth="1.5" />
            {Array.from({ length: 8 }).map((_, r) =>
              Array.from({ length: 8 }).map((__, c) => {
                const isDark = (r + c) % 2 === 1;
                const isHighlight = (r === 4 && c === 4) || (r === 3 && c === 2);
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c * 28}
                    y={r * 28}
                    width="28"
                    height="28"
                    fill={
                      isHighlight
                        ? 'rgba(139, 92, 246, 0.45)'
                        : isDark
                        ? '#1C1C2B'
                        : '#2A2A3D'
                    }
                  />
                );
              })
            )}
            <text x="122" y="133" fill="#FAFAFA" fontSize="20" textAnchor="middle">♙</text>
            <text x="66" y="105" fill="#22D3EE" fontSize="20" textAnchor="middle">♟</text>
            <text x="178" y="161" fill="#FAFAFA" fontSize="20" textAnchor="middle">♘</text>
            <text x="122" y="217" fill="#FAFAFA" fontSize="20" textAnchor="middle">♔</text>
            <text x="122" y="21" fill="#A78BFA" fontSize="20" textAnchor="middle">♚</text>
          </g>

          {/* Telemetry & Notation Sidebar */}
          <g transform="translate(296, 68)">
            <rect x="0" y="0" width="258" height="104" rx="8" fill="#12121A" stroke="rgba(255,255,255,0.08)" />
            <text x="16" y="26" fill="#22D3EE" fontSize="11" fontFamily="JetBrains Mono, monospace">
              ALGEBRAIC NOTATION STREAM
            </text>
            <text x="16" y="50" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono, monospace">
              01. e4      c5   (Sicilian)
            </text>
            <text x="16" y="70" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono, monospace">
              02. Nf3     d6   (Najdorf)
            </text>
            <text x="16" y="90" fill="#A78BFA" fontSize="12" fontFamily="JetBrains Mono, monospace">
              03. d4      cxd4 (+0.4 White)
            </text>

            <rect x="0" y="118" width="258" height="106" rx="8" fill="#12121A" stroke="rgba(255,255,255,0.08)" />
            <text x="16" y="144" fill="#ff71ce" fontSize="11" fontFamily="JetBrains Mono, monospace">
              STACK & ARCHITECTURE
            </text>
            <text x="16" y="168" fill="#A1A1AA" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              • HTML5 Grid + Keyboard Accessible
            </text>
            <text x="16" y="188" fill="#A1A1AA" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              • Pure JS Legal Move Validation
            </text>
            <text x="16" y="208" fill="#A1A1AA" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              • Sub-2ms State Matrix Evaluation
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === 'calc-interface' || type === 'calc-parser') {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#120E1E] via-[#101827] to-[#0A131C] flex items-center justify-center p-6 ${className}`}
      >
        <div className="absolute inset-0 perspective-grid-floor opacity-30 pointer-events-none" />
        <svg viewBox="0 0 600 340" className="w-full h-full max-h-[300px]" aria-label="socialcalculator.site web utility diagram">
          <rect x="20" y="16" width="560" height="308" rx="12" fill="#09090B" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
          <rect x="20" y="16" width="560" height="34" rx="12" fill="#161622" />
          <circle cx="42" cy="33" r="5" fill="#ff71ce" />
          <circle cx="58" cy="33" r="5" fill="#ff9770" />
          <circle cx="74" cy="33" r="5" fill="#01cdfe" />
          <text x="98" y="37" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono, monospace">
            https://socialcalculator.site — Creator Growth &amp; Engagement Platform
          </text>

          {/* Left Social Engagement Card */}
          <g transform="translate(44, 66)">
            <rect x="0" y="0" width="230" height="74" rx="8" fill="#14141D" stroke="rgba(139,92,246,0.4)" />
            <text x="18" y="24" fill="#A1A1AA" fontSize="11" fontFamily="JetBrains Mono, monospace">
              INSTAGRAM / TIKTOK ER%
            </text>
            <text x="18" y="52" fill="#FAFAFA" fontSize="22" fontWeight="bold" fontFamily="JetBrains Mono, monospace">
              4.57% <tspan fill="#22C55E" fontSize="12">High Reach</tspan>
            </text>

            <g transform="translate(0, 86)">
              <rect x="0" y="0" width="230" height="118" rx="8" fill="#12121A" stroke="rgba(255,255,255,0.08)" />
              <text x="16" y="26" fill="#22D3EE" fontSize="11" fontFamily="JetBrains Mono, monospace">
                CREATOR PAYOUT ESTIMATE
              </text>
              <text x="16" y="52" fill="#FAFAFA" fontSize="18" fontWeight="bold" fontFamily="JetBrains Mono, monospace">
                $650 – $1,150
              </text>
              <text x="16" y="74" fill="#71717A" fontSize="11" fontFamily="JetBrains Mono, monospace">
                Tier: 45K Engaged Followers
              </text>
              <text x="16" y="98" fill="#A78BFA" fontSize="11" fontFamily="JetBrains Mono, monospace">
                Client-Side Engine: &lt;1ms latency
              </text>
            </g>
          </g>

          {/* Right Pipeline Specs */}
          <g transform="translate(300, 66)">
            <rect x="0" y="0" width="254" height="206" rx="8" fill="#12121A" stroke="rgba(255,255,255,0.08)" />
            <text x="18" y="28" fill="#22D3EE" fontSize="11" fontFamily="JetBrains Mono, monospace">
              ANALYTICS &amp; PRIVACY SUITE
            </text>
            <text x="18" y="56" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono, monospace">
              URL: socialcalculator.site
            </text>
            <text x="18" y="80" fill="#22C55E" fontSize="11" fontFamily="JetBrains Mono, monospace">
              Privacy: 100% In-Browser Execution
            </text>
            <text x="18" y="104" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono, monospace">
              Auth Required: None / Zero Login
            </text>
            <line x1="18" y1="120" x2="236" y2="120" stroke="rgba(255,255,255,0.08)" />
            <text x="18" y="144" fill="#A1A1AA" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              • Instagram &amp; TikTok Engagement Rates
            </text>
            <text x="18" y="168" fill="#A1A1AA" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              • Creator Fund &amp; Sponsorship Value
            </text>
            <text x="18" y="192" fill="#A1A1AA" fontSize="12" fontFamily="Plus Jakarta Sans, sans-serif">
              • Built with Vanilla JS, HTML &amp; CSS
            </text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#0D131A] via-[#131322] to-[#170F24] flex items-center justify-center p-6 ${className}`}
    >
      <svg viewBox="0 0 600 340" className="w-full h-full max-h-[300px]" aria-label="C++ and Python algorithmic visualization">
        <rect x="20" y="16" width="560" height="308" rx="12" fill="#09090B" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
        <rect x="20" y="16" width="560" height="34" rx="12" fill="#161622" />
        <circle cx="42" cy="33" r="5" fill="#ff71ce" />
        <circle cx="58" cy="33" r="5" fill="#ff9770" />
        <circle cx="74" cy="33" r="5" fill="#01cdfe" />
        <text x="98" y="37" fill="#FAFAFA" fontSize="12" fontFamily="JetBrains Mono, monospace">
          {type === 'cpp-graph' ? 'C++17 STL Pathfinding & Graph Engine' : 'Python Static AST & Complexity Inspector'}
        </text>

        <g transform="translate(48, 74)">
          <rect x="0" y="0" width="504" height="214" rx="8" fill="#12121A" stroke="rgba(255,255,255,0.08)" />
          <text x="24" y="36" fill="#A78BFA" fontSize="13" fontFamily="JetBrains Mono, monospace">
            {type === 'cpp-graph'
              ? 'std::priority_queue<Node, std::vector<Node>, std::greater<Node>> openSet;'
              : 'def compute_cyclomatic_complexity(source_ast: str) -> dict[str, int]:'}
          </text>
          <text x="24" y="70" fill="#22D3EE" fontSize="12" fontFamily="JetBrains Mono, monospace">
            {type === 'cpp-graph'
              ? 'Heuristic: |r1 - r2| + |c1 - c2|  ·  Complexity: O(E log V)'
              : 'Supported: Python · C++ · HTML · CSS · JavaScript'}
          </text>
          <g transform="translate(24, 96)">
            {[0, 1, 2, 3, 4].map(i => (
              <rect
                key={i}
                x={i * 92}
                y="0"
                width="78"
                height="86"
                rx="6"
                fill="rgba(139, 92, 246, 0.12)"
                stroke="rgba(6, 182, 212, 0.35)"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};
