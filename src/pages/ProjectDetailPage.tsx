import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { InteractiveChessPreview } from '../components/demos/InteractiveChessPreview';
import { InteractiveCalculatorPreview } from '../components/demos/InteractiveCalculatorPreview';
import {
  InteractiveCppVisualizer,
  InteractivePythonAnalyzer
} from '../components/demos/InteractiveCppPythonPreview';
import { ProjectDiagramArt } from '../components/demos/ProjectDiagramArt';
import { CodeBlock } from '../components/shared/InteractiveUI';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = PROJECTS_DATA.findIndex(
    p => p.slug === slug || (slug === 'calculator-web-app' && p.slug === 'socialcalculator-site')
  );
  const project = projectIndex >= 0 ? PROJECTS_DATA[projectIndex] : PROJECTS_DATA[0];

  const prevProject =
    PROJECTS_DATA[(projectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProject = PROJECTS_DATA[(projectIndex + 1) % PROJECTS_DATA.length];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev !== null ? (prev + 1) % project.gallery.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev =>
          prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, project.gallery.length]);

  return (
    <div className="px-6 py-12 sm:py-16 max-w-6xl mx-auto space-y-16">
      {/* Top Breadcrumb & Back Link */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Selected Work</span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-mono">
          {project.liveUrl && project.liveUrl.startsWith('http') && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] font-semibold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Visit {project.liveUrl.replace('https://', '')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-[#121216] hover:bg-[#1A1A22] text-[#FAFAFA] border border-white/10 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View GitHub Repo</span>
          </a>
        </div>
      </div>

      {/* Project Title & Metadata Header */}
      <header className="space-y-6 pb-10 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#22D3EE]">
          <span>Case Study {project.indexNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#FAFAFA] leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08] text-xs">
          <div>
            <div className="font-mono text-[#71717A] mb-1">Context / Domain</div>
            <div className="text-[#FAFAFA] font-medium">{project.clientOrContext}</div>
          </div>
          <div>
            <div className="font-mono text-[#71717A] mb-1">Role</div>
            <div className="text-[#FAFAFA] font-medium">{project.role}</div>
          </div>
          <div>
            <div className="font-mono text-[#71717A] mb-1">Year</div>
            <div className="text-[#FAFAFA] font-mono tabular-nums">{project.year}</div>
          </div>
          <div>
            <div className="font-mono text-[#71717A] mb-1">Technologies</div>
            <div className="text-[#FAFAFA] font-medium">{project.techStack.join(' · ')}</div>
          </div>
        </div>
      </header>

      {/* Interactive Live Sandbox Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#A1A1AA]">
              Interactive Embedded Application
            </div>
            <h2 className="font-display text-2xl font-bold text-[#FAFAFA]">
              Live Interactive Experience
            </h2>
          </div>
        </div>

        {project.interactiveDemoType === 'chess' && <InteractiveChessPreview />}
        {project.interactiveDemoType === 'calculator' && <InteractiveCalculatorPreview />}
        {project.interactiveDemoType === 'cpp-visualizer' && <InteractiveCppVisualizer />}
        {project.interactiveDemoType === 'python-analyzer' && <InteractivePythonAnalyzer />}
      </section>

      {/* Quantitative Outcomes */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {project.metrics.map(metric => (
          <div
            key={metric.label}
            className="rounded-xl border border-white/10 bg-[#121216] p-6 space-y-1.5"
          >
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FAFAFA] tabular-nums">
              {metric.value}
            </div>
            <div className="text-sm font-semibold text-[#A78BFA]">{metric.label}</div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">{metric.context}</p>
          </div>
        ))}
      </section>

      {/* Narrative Case Study Breakdown: Challenge, Process, Solution, Outcome */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8 space-y-3">
          <div className="text-xs font-mono text-[#22D3EE]">01. The Challenge</div>
          <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
            Problem Definition &amp; Constraints
          </h3>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{project.challenge}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8 space-y-3">
          <div className="text-xs font-mono text-[#A78BFA]">02. Engineering Process</div>
          <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
            Architecture &amp; Data Structures
          </h3>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{project.process}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8 space-y-3">
          <div className="text-xs font-mono text-[#ff71ce]">03. Technical Solution</div>
          <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
            Implementation &amp; Polish
          </h3>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{project.solution}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8 space-y-3">
          <div className="text-xs font-mono text-[#22C55E]">04. Verified Outcome</div>
          <h3 className="font-display text-xl font-bold text-[#FAFAFA]">
            Results &amp; Impact
          </h3>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{project.outcome}</p>
        </div>
      </section>

      {/* Code Implementation Excerpt */}
      <section className="space-y-4">
        <div>
          <div className="text-xs font-mono text-[#A1A1AA]">Core Logic Snippet</div>
          <h2 className="font-display text-2xl font-bold text-[#FAFAFA]">
            Under the Hood ({project.codePreview.language})
          </h2>
        </div>
        <CodeBlock
          filename={project.codePreview.filename}
          language={project.codePreview.language}
          code={project.codePreview.code}
        />
      </section>

      {/* Architectural Diagrams Gallery with Fullscreen Lightbox */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-mono text-[#A1A1AA]">
            Click any diagram to inspect in fullscreen Lightbox (Keyboard ESC / Arrow keys supported)
          </div>
          <h2 className="font-display text-2xl font-bold text-[#FAFAFA]">
            Visual Architecture Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.gallery.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="text-left rounded-2xl border border-white/10 bg-[#121216] overflow-hidden group hover-card-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
            >
              <div className="relative border-b border-white/[0.08]">
                <ProjectDiagramArt type={item.diagramType} className="h-56" />
                <span className="absolute top-3 right-3 p-2 rounded-lg bg-[#09090B]/80 text-[#FAFAFA] border border-white/15 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
              <div className="p-4">
                <div className="font-display font-semibold text-[#FAFAFA]">{item.title}</div>
                <div className="text-xs text-[#A1A1AA] mt-1">{item.caption}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Next / Previous Project Navigation */}
      <nav
        aria-label="Project Pagination"
        className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <Link
          to={`/work/${prevProject.slug}`}
          className="rounded-xl border border-white/10 bg-[#121216] p-5 hover:border-[#8B5CF6]/50 transition-colors flex flex-col justify-between"
        >
          <span className="text-xs font-mono text-[#A1A1AA] inline-flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Project</span>
          </span>
          <span className="font-display text-lg font-bold text-[#FAFAFA] mt-2">
            {prevProject.title}
          </span>
        </Link>

        <Link
          to={`/work/${nextProject.slug}`}
          className="rounded-xl border border-white/10 bg-[#121216] p-5 hover:border-[#8B5CF6]/50 transition-colors flex flex-col justify-between text-right items-end"
        >
          <span className="text-xs font-mono text-[#A1A1AA] inline-flex items-center gap-1.5">
            <span>Next Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="font-display text-lg font-bold text-[#FAFAFA] mt-2">
            {nextProject.title}
          </span>
        </Link>
      </nav>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && project.gallery[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project gallery lightbox"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div className="max-w-4xl w-full rounded-2xl border border-white/15 bg-[#121216] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
              <div>
                <div className="font-display font-bold text-[#FAFAFA]">
                  {project.gallery[lightboxIndex].title}
                </div>
                <div className="text-xs text-[#A1A1AA]">
                  {project.gallery[lightboxIndex].caption}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {project.gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex(
                          (lightboxIndex - 1 + project.gallery.length) % project.gallery.length
                        )
                      }
                      className="p-2 rounded-lg bg-[#1A1A22] text-[#FAFAFA] hover:bg-[#242430]"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxIndex((lightboxIndex + 1) % project.gallery.length)
                      }
                      className="p-2 rounded-lg bg-[#1A1A22] text-[#FAFAFA] hover:bg-[#242430]"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-lg bg-[#1A1A22] text-[#FAFAFA] hover:bg-[#EF4444]/30"
                  aria-label="Close lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ProjectDiagramArt
              type={project.gallery[lightboxIndex].diagramType}
              className="h-[360px] sm:h-[440px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
