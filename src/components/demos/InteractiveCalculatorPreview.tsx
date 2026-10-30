import React, { useState } from 'react';
import { Delete, History, Sparkles, ExternalLink, TrendingUp, DollarSign, Calculator as CalcIcon, Share2 } from 'lucide-react';

interface CalcHistoryEntry {
  expression: string;
  result: string;
}

function sanitizeFloat(val: number): string {
  if (!Number.isFinite(val)) return 'Error';
  const rounded = Number(Math.round(Number(val + 'e12')) + 'e-12');
  return String(rounded);
}

export const InteractiveCalculatorPreview: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState<'social' | 'scientific'>('social');

  // --- Social Media Calculator State (from socialcalculator.site) ---
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'youtube'>('instagram');
  const [followers, setFollowers] = useState<number>(45000);
  const [likes, setLikes] = useState<number>(1850);
  const [comments, setComments] = useState<number>(140);
  const [shares, setShares] = useState<number>(65);

  // Engagement calculation
  const totalInteractions = likes + comments + (platform === 'youtube' ? 0 : shares);
  const rawEngagementRate = followers > 0 ? (totalInteractions / followers) * 100 : 0;
  const engagementRate = Math.min(100, Math.max(0, Number(rawEngagementRate.toFixed(2))));

  // Earnings estimation based on platform CPM benchmarks
  const baseCpm = platform === 'tiktok' ? 14 : platform === 'instagram' ? 18 : 24;
  const estimatedEngagedReach = followers * (Math.max(0.01, engagementRate / 100)) * 3.8;
  const minSponsoredPost = Math.max(25, Math.round((estimatedEngagedReach / 1000) * baseCpm));
  const maxSponsoredPost = Math.round(minSponsoredPost * 1.75);

  // Engagement Benchmark
  let ratingLabel = 'Average (Good)';
  let ratingColor = 'text-[#22D3EE]';
  if (engagementRate < 1.2) {
    ratingLabel = 'Low (<1.2%)';
    ratingColor = 'text-[#71717A]';
  } else if (engagementRate > 4.5) {
    ratingLabel = 'Viral / Exceptional (>4.5%)';
    ratingColor = 'text-[#22C55E]';
  } else if (engagementRate >= 2.5) {
    ratingLabel = 'High Performing (2.5% - 4.5%)';
    ratingColor = 'text-[#A78BFA]';
  }

  // --- Scientific Calculator State ---
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [isDegree, setIsDegree] = useState<boolean>(true);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<CalcHistoryEntry[]>([
    { expression: 'ER% = (1850 + 140 + 65) / 45000', result: '4.57%' },
    { expression: 'sin(30°)', result: '0.5' },
    { expression: '0.1 + 0.2', result: '0.3' }
  ]);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' || display === 'Error' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setExpression('');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (waitingForOperand || display === 'Error') return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const computeBinary = (left: number, right: number, op: string): number => {
    switch (op) {
      case '+':
        return left + right;
      case '−':
        return left - right;
      case '×':
        return left * right;
      case '÷':
        return right === 0 ? NaN : left / right;
      case '^':
        return Math.pow(left, right);
      default:
        return right;
    }
  };

  const handleOperator = (nextOp: string) => {
    const inputValue = parseFloat(display);
    if (Number.isNaN(inputValue)) return;

    if (prevValue === null) {
      setPrevValue(inputValue);
      setExpression(`${display} ${nextOp}`);
    } else if (operator) {
      if (!waitingForOperand) {
        const result = computeBinary(prevValue, inputValue, operator);
        const formatted = sanitizeFloat(result);
        setDisplay(formatted);
        setPrevValue(formatted === 'Error' ? null : parseFloat(formatted));
        setExpression(`${formatted} ${nextOp}`);
      } else {
        setExpression(`${prevValue} ${nextOp}`);
      }
    }
    setWaitingForOperand(true);
    setOperator(nextOp);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (prevValue === null || !operator || Number.isNaN(inputValue)) return;

    const result = computeBinary(prevValue, inputValue, operator);
    const formatted = sanitizeFloat(result);
    const fullExpr = `${prevValue} ${operator} ${inputValue}`;

    setDisplay(formatted);
    setExpression(`${fullExpr} =`);
    setHistory(prev => [{ expression: fullExpr, result: formatted }, ...prev.slice(0, 7)]);
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleScientific = (fn: string) => {
    const val = parseFloat(display);
    if (Number.isNaN(val)) return;

    let res = val;
    let label = '';
    const rad = isDegree ? (val * Math.PI) / 180 : val;

    switch (fn) {
      case 'sin':
        res = Math.sin(rad);
        label = `sin(${val}${isDegree ? '°' : ' rad'})`;
        break;
      case 'cos':
        res = Math.cos(rad);
        label = `cos(${val}${isDegree ? '°' : ' rad'})`;
        break;
      case 'tan':
        res = Math.tan(rad);
        label = `tan(${val}${isDegree ? '°' : ' rad'})`;
        break;
      case 'sqrt':
        res = val < 0 ? NaN : Math.sqrt(val);
        label = `√(${val})`;
        break;
      case 'sq':
        res = val * val;
        label = `(${val})²`;
        break;
      default:
        return;
    }

    const formatted = sanitizeFloat(res);
    setDisplay(formatted);
    setExpression(`${label} =`);
    setHistory(prev => [{ expression: label, result: formatted }, ...prev.slice(0, 7)]);
    setWaitingForOperand(true);
  };

  const applyPreset = (f: number, l: number, c: number, s: number) => {
    setFollowers(f);
    setLikes(l);
    setComments(c);
    setShares(s);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#121216] p-4 sm:p-5">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-mono">
            <span>socialcalculator.site</span>
            <span aria-hidden="true">·</span>
            <span>Live Web Application Preview</span>
          </div>
          <h4 className="text-base font-semibold text-[#FAFAFA] mt-0.5">
            Social Media &amp; Creator Growth Calculator
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-[#09090B] border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('social')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'social'
                  ? 'bg-[#8B5CF6] text-[#FAFAFA]'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Engagement &amp; Earnings</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('scientific')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'scientific'
                  ? 'bg-[#8B5CF6] text-[#FAFAFA]'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              <CalcIcon className="w-3.5 h-3.5" />
              <span>Scientific Math</span>
            </button>
          </div>

          <a
            href="https://socialcalculator.site"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#1A1A22] border border-white/15 text-[#22D3EE] hover:bg-[#242430] transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0"
            title="Open socialcalculator.site in a new tab"
          >
            <span>Visit Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {activeTab === 'social' ? (
        /* --- Social Media Engagement & Earnings Calculator Tab --- */
        <div className={`grid gap-5 ${compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12 items-start'}`}>
          {/* Left Inputs */}
          <div className={`${compact ? '' : 'lg:col-span-7'} space-y-4`}>
            {/* Platform Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#A1A1AA] font-mono">Platform:</span>
              {(['instagram', 'tiktok', 'youtube'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-1 rounded-lg capitalize font-mono border transition-colors ${
                    platform === p
                      ? 'bg-[#8B5CF6]/30 border-[#8B5CF6] text-[#FAFAFA]'
                      : 'bg-[#181820] border-white/10 text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#71717A] font-mono">Presets:</span>
              <button
                type="button"
                onClick={() => applyPreset(12000, 650, 45, 20)}
                className="px-2 py-0.5 rounded bg-[#181820] text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/5"
              >
                Nano (12K)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(45000, 1850, 140, 65)}
                className="px-2 py-0.5 rounded bg-[#181820] text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/5"
              >
                Micro (45K)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(180000, 9200, 620, 310)}
                className="px-2 py-0.5 rounded bg-[#181820] text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/5"
              >
                Mid-Tier (180K)
              </button>
            </div>

            {/* Sliders / Inputs */}
            <div className="space-y-3 p-3.5 rounded-xl bg-[#09090B] border border-white/10">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A1A1AA]">Follower Count:</span>
                  <span className="font-mono text-[#FAFAFA] font-semibold tabular-nums">{followers.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={500000}
                  step={1000}
                  value={followers}
                  onChange={e => setFollowers(Number(e.target.value))}
                  className="w-full accent-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A1A1AA]">Avg Likes:</span>
                    <span className="font-mono text-[#FAFAFA] tabular-nums">{likes.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={Math.max(1000, Math.round(followers * 0.15))}
                    step={10}
                    value={likes}
                    onChange={e => setLikes(Number(e.target.value))}
                    className="w-full accent-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A1A1AA]">Avg Comments:</span>
                    <span className="font-mono text-[#FAFAFA] tabular-nums">{comments.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={Math.max(100, Math.round(likes * 0.25))}
                    step={2}
                    value={comments}
                    onChange={e => setComments(Number(e.target.value))}
                    className="w-full accent-[#8B5CF6]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Metrics Display */}
          <div className={`${compact ? '' : 'lg:col-span-5'} space-y-3`}>
            {/* Live Engagement Rate Result Card */}
            <div className="rounded-xl bg-[#09090B] border border-white/10 p-4 space-y-3">
              <div>
                <div className="text-xs font-mono text-[#71717A]">
                  Engagement Rate (ERF)
                </div>
                <div className="text-3xl font-bold font-mono text-[#FAFAFA] tabular-nums mt-0.5">
                  {engagementRate}%
                </div>
                <div className={`text-xs font-medium mt-1 ${ratingColor}`}>
                  {ratingLabel}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#A1A1AA]">
                  <span>Est. Sponsored Post:</span>
                  <span className="text-[#22D3EE] font-semibold tabular-nums">
                    ${minSponsoredPost} – ${maxSponsoredPost}
                  </span>
                </div>
                <div className="flex justify-between text-[#A1A1AA]">
                  <span>Total Interactions:</span>
                  <span className="text-[#FAFAFA] tabular-nums">
                    {totalInteractions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#A1A1AA]">
                  <span>Interactions / Follower:</span>
                  <span className="text-[#A78BFA] tabular-nums">
                    {(engagementRate / 100).toFixed(4)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-1">
              <span>Pure client-side calculation · 0 tracking</span>
              <a
                href="https://socialcalculator.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#22D3EE] hover:underline font-mono inline-flex items-center gap-1"
              >
                <span>socialcalculator.site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* --- Precision Scientific Calculator Tab --- */
        <div className={`grid gap-5 ${compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12 items-start'}`}>
          <div className={`${compact ? '' : 'lg:col-span-7'} space-y-3`}>
            <div className="rounded-xl bg-[#09090B] border border-white/10 p-4 text-right font-mono">
              <div className="flex items-center justify-between text-xs text-[#71717A] min-h-[1.25rem]">
                <span>{isDegree ? 'DEG' : 'RAD'}</span>
                <span>{expression || 'Ready'}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-[#FAFAFA] tracking-tight truncate mt-1 tabular-nums">
                {display}
              </div>
            </div>

            {/* Scientific Keypad Row */}
            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => handleScientific('sin')}
                className="py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-[#22D3EE] border border-white/10"
              >
                sin
              </button>
              <button
                type="button"
                onClick={() => handleScientific('cos')}
                className="py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-[#22D3EE] border border-white/10"
              >
                cos
              </button>
              <button
                type="button"
                onClick={() => handleScientific('sqrt')}
                className="py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-[#22D3EE] border border-white/10"
              >
                √x
              </button>
              <button
                type="button"
                onClick={() => handleScientific('sq')}
                className="py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-[#22D3EE] border border-white/10"
              >
                x²
              </button>
            </div>

            {/* Main Keypad */}
            <div className="grid grid-cols-4 gap-2 font-mono text-sm">
              <button
                type="button"
                onClick={clearAll}
                className="py-2 rounded-lg bg-[#EF4444]/20 hover:bg-[#EF4444]/30 text-[#FCA5A5] border border-[#EF4444]/35 font-semibold"
              >
                AC
              </button>
              <button
                type="button"
                onClick={backspace}
                className="py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-[#FAFAFA] border border-white/10 flex items-center justify-center"
              >
                <Delete className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleOperator('^')}
                className="py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-[#A78BFA] border border-white/10 font-semibold"
              >
                x^y
              </button>
              <button
                type="button"
                onClick={() => handleOperator('÷')}
                className="py-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/35 text-[#A78BFA] border border-[#8B5CF6]/35 font-semibold"
              >
                ÷
              </button>

              {['7', '8', '9'].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => inputDigit(n)}
                  className="py-2 rounded-lg bg-[#181820] hover:bg-[#242430] text-[#FAFAFA] border border-white/10 font-medium tabular-nums"
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleOperator('×')}
                className="py-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/35 text-[#A78BFA] border border-[#8B5CF6]/35 font-semibold"
              >
                ×
              </button>

              {['4', '5', '6'].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => inputDigit(n)}
                  className="py-2 rounded-lg bg-[#181820] hover:bg-[#242430] text-[#FAFAFA] border border-white/10 font-medium tabular-nums"
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleOperator('−')}
                className="py-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/35 text-[#A78BFA] border border-[#8B5CF6]/35 font-semibold"
              >
                −
              </button>

              {['1', '2', '3'].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => inputDigit(n)}
                  className="py-2 rounded-lg bg-[#181820] hover:bg-[#242430] text-[#FAFAFA] border border-white/10 font-medium tabular-nums"
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleOperator('+')}
                className="py-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/35 text-[#A78BFA] border border-[#8B5CF6]/35 font-semibold"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => inputDigit('0')}
                className="col-span-2 py-2 rounded-lg bg-[#181820] hover:bg-[#242430] text-[#FAFAFA] border border-white/10 font-medium tabular-nums"
              >
                0
              </button>
              <button
                type="button"
                onClick={inputDecimal}
                className="py-2 rounded-lg bg-[#181820] hover:bg-[#242430] text-[#FAFAFA] border border-white/10 font-medium"
              >
                .
              </button>
              <button
                type="button"
                onClick={handleEquals}
                className="py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] font-semibold"
              >
                =
              </button>
            </div>
          </div>

          <div className={`${compact ? '' : 'lg:col-span-5'} flex flex-col justify-between space-y-4`}>
            <div className="rounded-lg bg-[#09090B] border border-white/10 p-3.5">
              <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-2.5">
                <span className="font-mono flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>Calculation Tape</span>
                </span>
                <span className="text-[#71717A] font-mono text-xs">socialcalculator.site</span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-xs tabular-nums">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setDisplay(item.result);
                      setExpression(`${item.expression} =`);
                      setWaitingForOperand(false);
                    }}
                    className="w-full text-left rounded-md px-2.5 py-1.5 bg-[#121216] hover:bg-[#1A1A22] border border-white/5 flex items-center justify-between transition-colors"
                  >
                    <span className="text-[#A1A1AA] truncate mr-2">{item.expression}</span>
                    <span className="text-[#22D3EE] font-semibold shrink-0">= {item.result}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#A1A1AA] leading-relaxed">
              Available online at <a href="https://socialcalculator.site" target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] hover:underline">socialcalculator.site</a> alongside TikTok &amp; Instagram analytics.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
