import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Terminal,
  Calculator,
  Gamepad2,
  Code2,
  Mail,
  Sparkles,
  Database
} from 'lucide-react';
import {
  CREATOR_PROFILE,
  PROJECTS_DATA,
  SKILLS_DATA,
  TESTIMONIALS_DATA
} from '../data/portfolioData';
import { InteractiveChessPreview } from '../components/demos/InteractiveChessPreview';
import { InteractiveCalculatorPreview } from '../components/demos/InteractiveCalculatorPreview';
import { ProjectDiagramArt } from '../components/demos/ProjectDiagramArt';
import { TypewriterRoleCycle, ScrambleHeading, CodeBlock } from '../components/shared/InteractiveUI';

export const HomePage: React.FC = () => {
  const [heroDemoTab, setHeroDemoTab] = useState<'chess' | 'calculator'>('chess');
  const [workFilter, setWorkFilter] = useState<'all' | 'Websites' | 'C++ & Python'>('all');
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number>(0);

  const filteredProjects =
    workFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => p.category === workFilter);

  const activeSkill = SKILLS_DATA[selectedSkillIndex] || SKILLS_DATA[0];

  return (
    <div className="space-y-24 pb-12">
      {/* 1. HERO SECTION — Split-Screen Portfolio Architecture */}
      <section className="relative pt-10 sm:pt-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Identity, Languages & 2 Websites Highlight */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Unboxed Kicker Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                <span>First-Year CSSS Undergraduate</span>
                <span aria-hidden="true">·</span>
                <span>Web & C++ / Python Developer</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-[#FAFAFA]">
                Hi, I’m <span className="chrome-headline">Ved</span>. Building interactive web apps &amp; algorithmic code.
              </h1>

              <div className="text-sm sm:text-base font-mono text-[#A1A1AA] min-h-[1.75rem]">
                <span className="text-[#71717A] mr-2">Focus:</span>
                <TypewriterRoleCycle
                  phrases={[
                    'Python · C++ · HTML · CSS · JavaScript',
                    'AI & Vibe Coding Specialist',
                    'Firebase & Supabase Cloud BaaS',
                    'Creator of playchessx.online',
                    'Creator of socialcalculator.site',
                    'First-Year B.Tech CSSS Student'
                  ]}
                />
              </div>

              <p className="text-base text-[#A1A1AA] leading-relaxed max-w-xl">
                I am a <strong className="text-[#FAFAFA] font-semibold">First-Year Computer Science and Social Sciences (CSSS)</strong> student specializing in{' '}
                <strong className="text-[#FAFAFA] font-semibold">Python, C++, HTML, CSS, and JavaScript</strong>. Highly adept with <strong className="text-[#22D3EE] font-semibold">AI &amp; vibe coding</strong> for rapid iterative development, and familiar with <strong className="text-[#A78BFA] font-semibold">Firebase &amp; Supabase</strong> for full-stack cloud persistence. I have created and launched two complete websites—an interactive online chess platform at{' '}
                <a
                  href="https://playchessx.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#22D3EE] underline decoration-[#22D3EE]/50 hover:decoration-[#22D3EE] underline-offset-4"
                >
                  playchessx.online
                </a>{' '}
                and a social media growth &amp; analytics suite at{' '}
                <a
                  href="https://socialcalculator.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A78BFA] underline decoration-[#A78BFA]/50 hover:decoration-[#A78BFA] underline-offset-4"
                >
                  socialcalculator.site
                </a>.
              </p>
            </div>

            {/* Primary CTAs & Direct Social Profile Links (LinkedIn & GitHub) */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/work"
                  className="px-4 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] text-xs font-semibold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="https://playchessx.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#121216] hover:bg-[#1A1A22] text-[#FAFAFA] border border-white/15 text-xs font-medium transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <span>playchessx.online</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#22D3EE]" />
                </a>

                <a
                  href="https://socialcalculator.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#121216] hover:bg-[#1A1A22] text-[#FAFAFA] border border-white/15 text-xs font-medium transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <span>socialcalculator.site</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A78BFA]" />
                </a>
              </div>

              {/* Unboxed Social & Profile Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#A1A1AA]">
                <a
                  href={CREATOR_PROFILE.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FAFAFA] hover:text-[#A78BFA] transition-colors font-medium whitespace-nowrap"
                >
                  <Linkedin className="w-4 h-4 text-[#A78BFA]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={CREATOR_PROFILE.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FAFAFA] hover:text-[#22D3EE] transition-colors font-medium whitespace-nowrap"
                >
                  <Github className="w-4 h-4 text-[#22D3EE]" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={`mailto:${CREATOR_PROFILE.email}`}
                  className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-[#ff71ce]" />
                  <span>{CREATOR_PROFILE.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Showcase of the 2 Created Websites */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="rounded-2xl border border-white/10 bg-[#121216]/90 p-3 sm:p-4 flex flex-col h-full">
              {/* Interactive Segmented Switcher for the 2 Created Websites */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
                <div className="text-xs font-mono text-[#A1A1AA]">
                  Live Interactive Website Sandbox
                </div>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#09090B] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setHeroDemoTab('chess')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      heroDemoTab === 'chess'
                        ? 'bg-[#8B5CF6] text-[#FAFAFA]'
                        : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                    }`}
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>01. playchessx.online</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroDemoTab('calculator')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      heroDemoTab === 'calculator'
                        ? 'bg-[#8B5CF6] text-[#FAFAFA]'
                        : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                    }`}
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>02. socialcalculator.site</span>
                  </button>
                </div>
              </div>

              <div className="flex-1">
                {heroDemoTab === 'chess' ? (
                  <InteractiveChessPreview compact />
                ) : (
                  <InteractiveCalculatorPreview compact />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Key Metrics Strip Below Hero Split */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-8 border-t border-white/10">
          <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.08]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FAFAFA] tabular-nums">
              2 Websites
            </div>
            <div className="text-xs text-[#A1A1AA] mt-1">
              Live: <span className="text-[#22D3EE]">playchessx.online</span> &amp; <span className="text-[#A78BFA]">socialcalculator.site</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.08]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FAFAFA] tabular-nums">
              5 Languages
            </div>
            <div className="text-xs text-[#A1A1AA] mt-1">
              Python · C++ · HTML · CSS · JavaScript
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.08]">
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#22D3EE] tabular-nums flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-[#22D3EE]" />
              <span>AI &amp; Vibe</span>
            </div>
            <div className="text-xs text-[#A1A1AA] mt-1">
              Vibe coding &amp; rapid LLM-driven velocity
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.08]">
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#A78BFA] tabular-nums flex items-center gap-1.5">
              <Database className="w-5 h-5 text-[#A78BFA]" />
              <span>Firebase/Supa</span>
            </div>
            <div className="text-xs text-[#A1A1AA] mt-1">
              Familiar with Firestore &amp; PostgreSQL BaaS
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121216] border border-white/[0.08] col-span-2 md:col-span-1">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FAFAFA] tabular-nums">
              1st Year CSSS
            </div>
            <div className="text-xs text-[#A1A1AA] mt-1">
              B.Tech Computer Science &amp; Social Sciences
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUBTLE EDITORIAL MARQUEE RIBBON */}
      <div
        aria-hidden="true"
        className="border-y border-white/[0.08] bg-[#121216]/70 py-3.5 overflow-hidden select-none"
      >
        <div className="animate-marquee flex items-center gap-8 text-xs font-mono text-[#A1A1AA]">
          {[0, 1].map(loopIdx => (
            <div key={loopIdx} className="flex items-center gap-8 shrink-0">
              <span>Ved Panwar · First-Year CSSS</span>
              <span className="text-[#8B5CF6]">·</span>
              <span className="text-[#22D3EE]">playchessx.online</span>
              <span className="text-[#8B5CF6]">·</span>
              <span className="text-[#A78BFA]">socialcalculator.site</span>
              <span className="text-[#8B5CF6]">·</span>
              <span className="text-[#22D3EE]">AI &amp; Vibe Coding</span>
              <span className="text-[#8B5CF6]">·</span>
              <span className="text-[#A78BFA]">Firebase &amp; Supabase</span>
              <span className="text-[#8B5CF6]">·</span>
              <span>Python</span>
              <span className="text-[#8B5CF6]">·</span>
              <span>C++</span>
              <span className="text-[#8B5CF6]">·</span>
              <span>HTML5 · CSS3 · JS</span>
              <span className="text-[#8B5CF6]">·</span>
              <span>LinkedIn &amp; GitHub</span>
              <span className="text-[#8B5CF6]">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SELECTED WORK & CREATED WEBSITES SHOWCASE */}
      <section className="px-6 max-w-7xl mx-auto space-y-10" id="selected-work">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#A1A1AA]">
              Selected Portfolio · Websites &amp; CSSS Engineering
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
              <ScrambleHeading text="01. Created Websites & Featured Projects" />
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#121216] border border-white/10 self-start">
            {(
              [
                { id: 'all', label: 'All Work (4)' },
                { id: 'Websites', label: 'Created Websites (2)' },
                { id: 'C++ & Python', label: 'C++ & Python (2)' }
              ] as const
            ).map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setWorkFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  workFilter === tab.id
                    ? 'bg-[#8B5CF6] text-[#FAFAFA]'
                    : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            const isWide = project.featuredWebsite && workFilter === 'all';
            return (
              <article
                key={project.id}
                style={{ animationDelay: `${index * 70}ms` }}
                className={`${
                  isWide ? 'md:col-span-6' : 'md:col-span-6'
                } rounded-2xl border border-white/10 bg-[#121216] overflow-hidden flex flex-col justify-between hover-card-lift`}
              >
                <div>
                  <Link to={`/work/${project.slug}`} className="block group overflow-hidden border-b border-white/[0.08]">
                    <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                      <ProjectDiagramArt
                        type={project.gallery[0]?.diagramType || 'chess-board'}
                        className="h-56 sm:h-64"
                      />
                    </div>
                  </Link>

                  <div className="p-6 space-y-3">
                    {/* Unboxed Clean Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                      <span className="text-[#22D3EE]">{project.indexNumber}.</span>
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.techStack.slice(0, 3).join(' / ')}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FAFAFA]">
                      <Link to={`/work/${project.slug}`} className="hover:text-[#A78BFA] transition-colors">
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      {project.shortSummary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FAFAFA] hover:text-[#A78BFA] transition-colors whitespace-nowrap"
                  >
                    <span>Read Case Study &amp; Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    {project.liveUrl && project.liveUrl.startsWith('http') && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#22D3EE] hover:underline whitespace-nowrap"
                      >
                        <span>{project.liveUrl.replace('https://', '')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors whitespace-nowrap"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. CORE LANGUAGES & TECHNICAL MATRIX (Python, C++, HTML, CSS, JavaScript) */}
      <section className="px-6 max-w-7xl mx-auto space-y-10">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono text-[#A1A1AA]">
            Technical Foundation · First-Year B.Tech CSSS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
            02. Core Languages &amp; Modern Tech Stack
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Select any technology below (<strong className="text-[#FAFAFA]">Python, C++, HTML, CSS, JavaScript, AI &amp; Vibe Coding, Firebase &amp; Supabase</strong>) to inspect applied concepts, code patterns, and live architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 7 Tech Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {SKILLS_DATA.map((skill, idx) => {
              const isSelected = idx === selectedSkillIndex;
              return (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setSelectedSkillIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#1A1A22] border-[#8B5CF6] shadow-[0_0_25px_rgba(139,92,246,0.12)]'
                      : 'bg-[#121216] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-lg font-bold text-[#FAFAFA]">
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs text-[#22D3EE] tabular-nums">
                      {skill.proficiency}% · {skill.projectsCount}
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mb-3">{skill.experienceNote}</p>
                  <div className="w-full h-1.5 rounded-full bg-[#09090B] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] transition-all duration-300"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Live Code & Topic Inspector for Selected Language */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-[#A1A1AA]">
                  {activeSkill.category} · {activeSkill.projectsCount}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#FAFAFA] mt-0.5">
                  {activeSkill.name} Engineering Overview
                </h3>
              </div>
              <div className="font-mono text-xs text-[#A78BFA] tabular-nums">
                Proficiency Index: {activeSkill.proficiency} / 100
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-[#A1A1AA]">
                Key Concepts &amp; Applied Domains
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-[#FAFAFA]">
                {activeSkill.keyTopics.map((topic, i) => (
                  <React.Fragment key={topic}>
                    <span>{topic}</span>
                    {i < activeSkill.keyTopics.length - 1 && (
                      <span aria-hidden="true" className="text-[#71717A]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <CodeBlock
              filename={`sample_${activeSkill.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`}
              language={activeSkill.name}
              code={activeSkill.sampleSnippet}
            />
          </div>
        </div>

        {/* Highlighted AI & Cloud BaaS Acceleration Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl border border-[#22D3EE]/30 bg-gradient-to-br from-[#121216] to-[#0D1F2D]/50 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#22D3EE]">
              <Sparkles className="w-4 h-4" />
              <span>AI &amp; Vibe Coding Specialist</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
              Next-Gen Vibe Coding Velocity
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Very well-versed with generative AI tooling, prompt engineering, and modern vibe coding. Able to translate ideas, specifications, and UI concepts into fully realized, tested, and accessible codebases in record time without cutting corners on architectural discipline.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#A78BFA]/30 bg-gradient-to-br from-[#121216] to-[#1E1633]/50 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A78BFA]">
              <Database className="w-4 h-4" />
              <span>Cloud BaaS &amp; Realtime Databases</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
              Familiar with Firebase &amp; Supabase
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Equipped with practical knowledge of Backend-as-a-Service workflows: Firestore document schemas, Firebase Auth, alongside Supabase PostgreSQL tables, Row Level Security (RLS) policies, and realtime WebSocket event listeners.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LINKEDIN & GITHUB PROFILE SHOWCASE */}
      <section className="px-6 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-mono text-[#A1A1AA]">
            Developer Presence &amp; Open Source
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
            03. Connect on LinkedIn &amp; GitHub
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LinkedIn Card */}
          <a
            href={CREATOR_PROFILE.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8 flex flex-col justify-between hover-card-lift group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2.5 text-sm font-mono text-[#A78BFA]">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn Network</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors" />
              </div>

              <h3 className="font-display text-2xl font-bold text-[#FAFAFA]">
                Ved Panwar — First-Year B.Tech CSSS
              </h3>

              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {CREATOR_PROFILE.socials.linkedin.headline}. Follow my academic milestones, web development launches, and CSSS coursework updates on LinkedIn.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#FAFAFA]">
              <span>{CREATOR_PROFILE.socials.linkedin.handle}</span>
              <span className="text-[#A78BFA] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span>View LinkedIn Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={CREATOR_PROFILE.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8 flex flex-col justify-between hover-card-lift group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2.5 text-sm font-mono text-[#22D3EE]">
                  <Github className="w-5 h-5" />
                  <span>GitHub Codebase</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#FAFAFA] transition-colors" />
              </div>

              <h3 className="font-display text-2xl font-bold text-[#FAFAFA]">
                Open-Source Websites, C++ DSA &amp; Python Scripts
              </h3>

              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Explore source code for <span className="text-[#FAFAFA]">playchessx.online</span>, <span className="text-[#FAFAFA]">socialcalculator.site</span>, C++17 graph algorithms, and Python utilities on GitHub.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#FAFAFA]">
              <span>{CREATOR_PROFILE.socials.github.handle}</span>
              <span className="text-[#22D3EE] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span>Explore GitHub Repos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* 6. ENDORSEMENTS / TESTIMONIALS */}
      <section className="px-6 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-mono text-[#A1A1AA]">
            Peer &amp; Faculty Endorsements
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
            04. Feedback on My Websites &amp; Code
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_DATA.map(item => (
            <blockquote
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <p className="text-base sm:text-lg text-[#FAFAFA] leading-relaxed">
                “{item.quote}”
              </p>
              <footer className="pt-4 border-t border-white/[0.08]">
                <div className="font-display font-semibold text-[#FAFAFA]">{item.author}</div>
                <div className="text-xs text-[#A1A1AA] mt-0.5">
                  <span>{item.role}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{item.organization}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
};
