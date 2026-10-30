import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectDiagramArt } from '../components/demos/ProjectDiagramArt';

export const WorkPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Websites' | 'C++ & Python'>('all');

  const visibleProjects =
    filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <div className="px-6 py-12 sm:py-16 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono text-[#A1A1AA]">
            Portfolio Archive · Websites &amp; CSSS Coursework
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAFAFA]">
            Created Websites &amp; Engineering Work
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Featuring my two live production websites built with HTML, CSS, and JavaScript—
            <a
              href="https://playchessx.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22D3EE] hover:underline mx-1"
            >
              playchessx.online
            </a>
            and{' '}
            <a
              href="https://socialcalculator.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A78BFA] hover:underline mx-1"
            >
              socialcalculator.site
            </a>
            —alongside C++17 and Python engineering projects.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#121216] border border-white/10 self-start">
          {(
            [
              { id: 'all', label: 'All Work (4)' },
              { id: 'Websites', label: 'Created Websites (2)' },
              { id: 'C++ & Python', label: 'C++ & Python (2)' }
            ] as const
          ).map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                filter === item.id
                  ? 'bg-[#8B5CF6] text-[#FAFAFA]'
                  : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Project Showcase List */}
      <div className="space-y-8">
        {visibleProjects.map(project => (
          <article
            key={project.id}
            className="rounded-2xl border border-white/10 bg-[#121216] overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover-card-lift"
          >
            <Link
              to={`/work/${project.slug}`}
              className="lg:col-span-5 block border-b lg:border-b-0 lg:border-r border-white/[0.08] overflow-hidden group"
            >
              <ProjectDiagramArt
                type={project.gallery[0]?.diagramType || 'chess-board'}
                className="h-full min-h-[240px] transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A1A1AA]">
                  <span className="text-[#22D3EE]">{project.indexNumber}.</span>
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.role}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
                  <Link to={`/work/${project.slug}`} className="hover:text-[#A78BFA] transition-colors">
                    {project.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-2 text-xs font-mono text-[#71717A]">
                  Stack: <span className="text-[#FAFAFA]">{project.techStack.join(' · ')}</span>
                </div>
              </div>

              {/* Quantitative Metrics Row */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/[0.08]">
                {project.metrics.map(m => (
                  <div key={m.label}>
                    <div className="font-mono text-base sm:text-lg font-bold text-[#FAFAFA] tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-xs text-[#A1A1AA]">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                  to={`/work/${project.slug}`}
                  className="px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Open Interactive Case Study</span>
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
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors whitespace-nowrap"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
