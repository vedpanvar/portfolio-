import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Github,
  Linkedin,
  ExternalLink,
  GraduationCap,
  Code2,
  Globe,
  Check,
  Sparkles,
  Database
} from 'lucide-react';
import { CREATOR_PROFILE, SKILLS_DATA } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  const [resumeDownloaded, setResumeDownloaded] = useState(false);

  const handleDownloadResume = () => {
    const resumeContent = `VED PANWAR
First-Year B.Tech in Computer Science and Social Sciences (CSSS)
Email: ${CREATOR_PROFILE.email}
LinkedIn: ${CREATOR_PROFILE.socials.linkedin.url}
GitHub: ${CREATOR_PROFILE.socials.github.url}

============================================================
SUMMARY
============================================================
First-Year CSSS undergraduate specializing in Python, C++, HTML, CSS, and JavaScript.
Very well known with AI and vibe coding workflows for rapid prototyping; familiar with Firebase and Supabase for cloud backend & persistence.
Creator of two complete web applications:
1. playchessx.online — Interactive browser chess platform with legal move generation and algebraic notation.
2. socialcalculator.site — Free social media analytics & creator growth calculator suite.

============================================================
TECHNICAL SKILLS
============================================================
• Programming Languages: Python, C++, JavaScript (ES6+)
• Web Technologies: HTML5, CSS3, Responsive CSS Grid & Flexbox, Dark UI Systems
• AI & Vibe Coding: Advanced prompt engineering, LLM-driven velocity, rapid full-stack scaffolding
• Cloud BaaS & Databases: Firebase (Firestore, Auth), Supabase (PostgreSQL, Realtime, RLS)
• Core CS Coursework: Data Structures & Algorithms, Object-Oriented Programming, Discrete Mathematics

============================================================
CREATED WEBSITES & PROJECTS
============================================================
01. playchessx.online — Online Chess Platform (HTML, CSS, JavaScript)
    Live: https://playchessx.online
    - Engineered an 8x8 interactive chessboard with legal move validation, captured piece differential, and bot responder.

02. socialcalculator.site — Social Media & Creator Growth Calculator (HTML, CSS, JavaScript)
    Live: https://socialcalculator.site
    - Built a free, privacy-first analytics suite with TikTok/Instagram engagement rate formulas, creator payout models, and precision tools.

03. C++17 Graph & Pathfinding Visualizer (C++, STL)
    - Implemented Dijkstra and A* Manhattan heuristic shortest-path algorithms using std::priority_queue.

04. PyMetrics Source Code Analyzer (Python)
    - Built a lexical complexity and line-count inspector supporting Python, C++, and JavaScript files.
`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ved_Panwar_CSSS_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setResumeDownloaded(true);
    setTimeout(() => setResumeDownloaded(false), 2500);
  };

  return (
    <div className="px-6 py-12 sm:py-16 max-w-6xl mx-auto space-y-20">
      {/* Top Biography & Portrait Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Developer Identity & Portrait Card */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#121216] overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-[#161329] via-[#121218] to-[#0C1922] border-b border-white/10 flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-2xl bg-[#09090B] border border-[#8B5CF6]/50 flex items-center justify-center font-display text-4xl font-bold chrome-headline shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              VP
            </div>
            <h1 className="font-display text-2xl font-bold text-[#FAFAFA] mt-4">
              Ved Panwar
            </h1>
            <p className="text-xs font-mono text-[#22D3EE] mt-1">
              First-Year B.Tech CSSS Student
            </p>
            <div className="text-xs text-[#A1A1AA] mt-2 font-mono">
              Python · C++ · HTML · CSS · JS · AI &amp; Vibe · Firebase &amp; Supabase
            </div>
          </div>

          <div className="p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
              <span className="text-[#71717A] font-mono">Academic Standing</span>
              <span className="text-[#FAFAFA] font-medium">1st Year B.Tech CSSS</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
              <span className="text-[#71717A] font-mono">Created Websites</span>
              <span className="text-[#22D3EE] font-medium">playchessx.online · socialcalculator.site</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
              <span className="text-[#71717A] font-mono">Modern Tech</span>
              <span className="text-[#A78BFA] font-medium">AI &amp; Vibe Coding · Firebase &amp; Supabase</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
              <span className="text-[#71717A] font-mono">Direct Email</span>
              <a href={`mailto:${CREATOR_PROFILE.email}`} className="text-[#FAFAFA] hover:text-[#A78BFA]">
                {CREATOR_PROFILE.email}
              </a>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <a
                href={CREATOR_PROFILE.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-lg bg-[#1A1A22] hover:bg-[#242430] border border-white/10 text-[#FAFAFA] font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#A78BFA]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={CREATOR_PROFILE.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-lg bg-[#1A1A22] hover:bg-[#242430] border border-white/10 text-[#FAFAFA] font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4 text-[#22D3EE]" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            <button
              type="button"
              onClick={handleDownloadResume}
              className="w-full py-2.5 px-4 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              {resumeDownloaded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Resume Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Resume (TXT)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Narrative Biography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#A1A1AA]">
              About the Developer · Academic &amp; Engineering Journey
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
              Combining First-Year CSSS Fundamentals with Real Web Products
            </h2>
          </div>

          <div className="space-y-4 text-base text-[#A1A1AA] leading-relaxed">
            {CREATOR_PROFILE.extendedBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Highlighted 2 Websites Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="rounded-xl border border-white/10 bg-[#121216] p-5 space-y-2">
              <div className="text-xs font-mono text-[#22D3EE]">Website 01 · Live Platform</div>
              <h3 className="font-display text-lg font-bold text-[#FAFAFA]">
                playchessx.online
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Interactive online chess website built with HTML, CSS, and JavaScript featuring legal move generation, algebraic move log, and tactical bot replies.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                <a
                  href="https://playchessx.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#22D3EE] hover:underline inline-flex items-center gap-1"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <Link to="/work/playchessx-online" className="text-[#A78BFA] hover:underline">
                  Case Study →
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#121216] p-5 space-y-2">
              <div className="text-xs font-mono text-[#A78BFA]">Website 02 · Live Platform</div>
              <h3 className="font-display text-lg font-bold text-[#FAFAFA]">
                socialcalculator.site
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Free social media analytics and growth calculator web platform built with HTML, CSS, and JavaScript featuring TikTok/Instagram engagement rate formulas, creator payout models, and privacy-first in-browser execution.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono">
                <a
                  href="https://socialcalculator.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A78BFA] hover:underline inline-flex items-center gap-1"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <Link to="/work/socialcalculator-site" className="text-[#22D3EE] hover:underline">
                  Case Study →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorized Skills Breakdown */}
      <section className="space-y-8 pt-8 border-t border-white/10">
        <div className="space-y-2">
          <div className="text-xs font-mono text-[#A1A1AA]">
            Skills, Modern AI &amp; Cloud Stack
          </div>
          <h2 className="font-display text-3xl font-bold text-[#FAFAFA]">
            Python, C++, Web Architecture, AI &amp; Vibe Coding, Firebase &amp; Supabase
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22D3EE]">
              <Code2 className="w-4 h-4" />
              <span>Core Programming</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
              Python &amp; C++
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Algorithmic problem solving, STL containers (`std::vector`, `std::priority_queue`, `std::map`), pointers, object-oriented programming, and Python automation scripts.
            </p>
            <div className="pt-3 border-t border-white/[0.08] text-xs font-mono text-[#FAFAFA] space-y-2 tabular-nums">
              <div className="flex justify-between">
                <span>Python</span>
                <span className="text-[#22D3EE]">88%</span>
              </div>
              <div className="flex justify-between">
                <span>C++ (C++17 / STL)</span>
                <span className="text-[#A78BFA]">86%</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A78BFA]">
              <Globe className="w-4 h-4" />
              <span>Frontend Web Architecture</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
              HTML, CSS &amp; JavaScript
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Semantic HTML5, responsive CSS Grid &amp; Flexbox, custom dark UI elevation systems, and modular JavaScript state engines powering <span className="text-[#FAFAFA]">playchessx.online</span> and the <span className="text-[#FAFAFA]">Calculator Website</span>.
            </p>
            <div className="pt-3 border-t border-white/[0.08] text-xs font-mono text-[#FAFAFA] space-y-2 tabular-nums">
              <div className="flex justify-between">
                <span>HTML5 &amp; CSS3</span>
                <span className="text-[#22D3EE]">94%</span>
              </div>
              <div className="flex justify-between">
                <span>JavaScript (ES6+)</span>
                <span className="text-[#A78BFA]">90%</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#22D3EE]/30 bg-[#121216] p-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22D3EE]">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Workflow</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
              AI &amp; Vibe Coding
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Very well-versed in modern generative AI and vibe coding workflows. Leverages prompt engineering, LLM-assisted scaffolding, and iterative feedback loops to deliver production software at exceptional velocity.
            </p>
            <div className="pt-3 border-t border-white/[0.08] text-xs font-mono text-[#FAFAFA] space-y-2 tabular-nums">
              <div className="flex justify-between">
                <span>Vibe Coding Velocity</span>
                <span className="text-[#22D3EE]">96%</span>
              </div>
              <div className="flex justify-between">
                <span>Prompt Architecture</span>
                <span className="text-[#A78BFA]">94%</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#A78BFA]/30 bg-[#121216] p-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A78BFA]">
              <Database className="w-4 h-4" />
              <span>Cloud BaaS &amp; Databases</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
              Firebase &amp; Supabase
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Familiar with Backend-as-a-Service integration: Firebase Firestore document models, Firebase Authentication, Supabase relational PostgreSQL schemas, Row-Level Security, and Realtime event listeners.
            </p>
            <div className="pt-3 border-t border-white/[0.08] text-xs font-mono text-[#FAFAFA] space-y-2 tabular-nums">
              <div className="flex justify-between">
                <span>Firebase (Firestore/Auth)</span>
                <span className="text-[#A78BFA]">86%</span>
              </div>
              <div className="flex justify-between">
                <span>Supabase (Postgres/RLS)</span>
                <span className="text-[#22D3EE]">84%</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-4 md:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff71ce]">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundation</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
              First-Year B.Tech CSSS
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Pursuing Bachelor of Technology in Computer Science and Social Sciences (CSSS) with focus on Data Structures, Discrete Structures, Web Engineering, and Version Control with Git &amp; GitHub.
            </p>
            <div className="pt-3 border-t border-white/[0.08] text-xs font-mono text-[#FAFAFA] space-y-2">
              <div className="flex justify-between">
                <span>Version Control</span>
                <span className="text-[#22D3EE]">Git &amp; GitHub</span>
              </div>
              <div className="flex justify-between">
                <span>Professional Network</span>
                <span className="text-[#A78BFA]">LinkedIn Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
