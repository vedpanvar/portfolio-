import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

export const TypewriterRoleCycle: React.FC<{ phrases: string[] }> = ({ phrases }) => {
  const [index, setIndex] = useState(0);
  const [subText, setSubText] = useState(phrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setSubText(phrases[0]);
      return;
    }

    const currentFull = phrases[index % phrases.length];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentFull.slice(0, subText.length + 1);
          setSubText(next);
          if (next === currentFull) {
            setTimeout(() => setIsDeleting(true), 1600);
          }
        } else {
          const next = currentFull.slice(0, subText.length - 1);
          setSubText(next);
          if (next.length === 0) {
            setIsDeleting(false);
            setIndex(prev => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 28 : 55
    );

    return () => clearTimeout(timeout);
  }, [subText, isDeleting, index, phrases]);

  return (
    <span aria-label={phrases.join(', ')} className="inline-flex items-center font-mono text-[#22D3EE]">
      <span>{subText}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block w-[2px] h-4 bg-[#22D3EE]" />
    </span>
  );
};

export const ScrambleHeading: React.FC<{ text: string; className?: string }> = ({
  text,
  className = ''
}) => {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_';

  const triggerScramble = () => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, idx) => {
            if (letter === ' ') return ' ';
            if (idx < iteration) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 0.6;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 24);
  };

  return (
    <span
      aria-label={text}
      onMouseEnter={triggerScramble}
      className={`cursor-default inline-block ${className}`}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
};

export const CodeBlock: React.FC<{
  filename: string;
  language: string;
  code: string;
}> = ({ filename, language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl border border-white/10 bg-[#070709] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#121216] border-b border-white/[0.08] text-xs font-mono">
        <div className="flex items-center gap-2 text-[#FAFAFA]">
          <span>{filename}</span>
          <span aria-hidden="true" className="text-[#71717A]">·</span>
          <span className="text-[#A78BFA]">{language}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A1A22] hover:bg-[#242430] text-[#A1A1AA] hover:text-[#FAFAFA] border border-white/10 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="table-row">
            <span className="table-cell pr-4 select-none text-right text-[#52525B] tabular-nums">
              {i + 1}
            </span>
            <span className="table-cell whitespace-pre text-[#E4E4E7]">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
