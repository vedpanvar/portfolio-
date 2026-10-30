import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUp, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { CREATOR_PROFILE } from '../../data/portfolioData';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/playground', label: 'Live Lab' },
  { href: '/contact', label: 'Contact' }
];

export const PortfolioLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu and scroll to top on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isRouteActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA] relative overflow-x-hidden">
      {/* Subtle Ambient Aurora Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_75%_50%_at_50%_-15%,rgba(139,92,246,0.16),rgba(6,182,212,0.06),transparent)] z-0"
      />

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#09090B]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-tight text-[#FAFAFA] hover:text-[#A78BFA] transition-colors whitespace-nowrap shrink-0"
          >
            Ved Panwar
          </Link>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-sm font-medium">
            {NAV_ITEMS.map(item => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-link-underline transition-colors whitespace-nowrap shrink-0 ${
                    active ? 'text-[#FAFAFA] active' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (plus mobile menu toggle on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-4 py-2 text-xs font-semibold text-[#FAFAFA] bg-[#8B5CF6] hover:bg-[#A78BFA] rounded-lg transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
            >
              Get in Touch
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg bg-[#121216] border border-white/10 text-[#FAFAFA] hover:bg-[#1A1A22] transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#121216] px-6 py-5 space-y-3">
            {NAV_ITEMS.map((item, idx) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{ animationDelay: `${idx * 45}ms` }}
                  className={`block py-2 text-base font-medium transition-colors ${
                    active ? 'text-[#A78BFA]' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex items-center gap-4 text-xs text-[#A1A1AA]">
              <a
                href={CREATOR_PROFILE.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAFAFA] transition-colors"
              >
                GitHub
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={CREATOR_PROFILE.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FAFAFA] transition-colors"
              >
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://playchessx.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#22D3EE] transition-colors"
              >
                playchessx.online
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://socialcalculator.site"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A78BFA] transition-colors"
              >
                socialcalculator.site
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Route View */}
      <main className="flex-1 relative z-10">{children}</main>

      {/* Minimal Dark-UI Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#121216] mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.08]">
            <div className="md:col-span-5 space-y-3">
              <div className="font-display text-lg font-bold text-[#FAFAFA]">
                Ved Panwar
              </div>
              <p className="text-sm text-[#A1A1AA] max-w-md leading-relaxed">
                First-Year B.Tech Computer Science and Social Sciences (CSSS) developer building interactive web applications with HTML, CSS, and JavaScript, specializing in AI &amp; vibe coding with familiarity in Firebase and Supabase, alongside classical algorithms in Python and C++.
              </p>
              <div className="text-xs text-[#71717A] font-mono flex flex-wrap items-center gap-y-1">
                <span>Python</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>C++</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>HTML</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>CSS</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>JavaScript</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="text-[#22D3EE]">AI &amp; Vibe Coding</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="text-[#A78BFA]">Firebase &amp; Supabase</span>
              </div>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <div className="text-xs font-semibold text-[#FAFAFA] tracking-wide">
                Navigation
              </div>
              <ul className="space-y-2 text-sm text-[#A1A1AA]">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <Link to={item.href} className="hover:text-[#FAFAFA] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5">
              <div className="text-xs font-semibold text-[#FAFAFA] tracking-wide">
                Profiles & Created Websites
              </div>
              <ul className="space-y-2 text-sm text-[#A1A1AA]">
                <li>
                  <a
                    href={CREATOR_PROFILE.socials.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#FAFAFA] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#A78BFA]" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href={CREATOR_PROFILE.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#FAFAFA] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#22D3EE]" />
                    <span>GitHub Repositories</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://playchessx.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#22D3EE] transition-colors"
                  >
                    <span>playchessx.online (Chess Platform)</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://socialcalculator.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#A78BFA] transition-colors"
                  >
                    <span>socialcalculator.site (Creator Analytics)</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CREATOR_PROFILE.email}`}
                    className="inline-flex items-center gap-2 hover:text-[#FAFAFA] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ff71ce]" />
                    <span>{CREATOR_PROFILE.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
            <div>
              © {new Date().getFullYear()} Ved Panwar. Built with React, TypeScript & Tailwind CSS. Set in Outfit, Plus Jakarta Sans & JetBrains Mono.
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-[#FAFAFA] border border-white/10 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
