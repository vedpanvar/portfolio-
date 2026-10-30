import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="px-6 py-24 max-w-3xl mx-auto text-center space-y-6">
      <div className="font-mono text-xs text-[#22D3EE]">404 · Route Not Found</div>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAFAFA]">
        This coordinate is off the 8×8 board
      </h1>
      <p className="text-base text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
        The page you requested does not exist. Return to Ved’s portfolio home or explore the interactive websites lab.
      </p>
      <div className="pt-2 flex items-center justify-center gap-4">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] text-xs font-semibold inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/work"
          className="px-5 py-2.5 rounded-lg bg-[#121216] hover:bg-[#1A1A22] text-[#FAFAFA] border border-white/10 text-xs font-medium transition-colors"
        >
          View Selected Work
        </Link>
      </div>
    </div>
  );
};
