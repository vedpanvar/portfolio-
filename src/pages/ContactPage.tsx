import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Send,
  Check,
  Copy,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { CREATOR_PROFILE } from '../data/portfolioData';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Web Development / Internship Inquiry');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please write a short message (at least 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(CREATOR_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="px-6 py-12 sm:py-16 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <div className="text-xs font-mono text-[#A1A1AA]">
          Direct Contact · LinkedIn · GitHub
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAFAFA]">
          Let’s build something together
        </h1>
        <p className="text-base text-[#A1A1AA] leading-relaxed">
          Whether you want to connect on <strong className="text-[#FAFAFA]">LinkedIn</strong>, collaborate on{' '}
          <strong className="text-[#FAFAFA]">GitHub</strong>, share feedback on{' '}
          <strong className="text-[#22D3EE]">playchessx.online</strong> or{' '}
          <strong className="text-[#A78BFA]">socialcalculator.site</strong>, or discuss Python, C++, HTML, CSS, and JavaScript projects—reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Channels (LinkedIn, GitHub, Email, Location) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Direct Email Box */}
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-4">
            <div className="text-xs font-mono text-[#A1A1AA]">Direct Email Address</div>
            <a
              href={`mailto:${CREATOR_PROFILE.email}`}
              className="block font-mono text-base sm:text-lg font-semibold text-[#FAFAFA] hover:text-[#A78BFA] break-all transition-colors"
            >
              {CREATOR_PROFILE.email}
            </a>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3.5 py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-xs font-medium text-[#FAFAFA] border border-white/10 inline-flex items-center gap-1.5 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${CREATOR_PROFILE.email}`}
                className="px-3.5 py-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-xs font-medium text-[#FAFAFA] border border-[#8B5CF6]/40 inline-flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Mail App</span>
              </a>
            </div>
          </div>

          {/* LinkedIn & GitHub Direct Profile Links */}
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-4">
            <div className="text-xs font-mono text-[#A1A1AA]">
              Professional &amp; Code Profiles
            </div>

            <div className="space-y-3">
              <a
                href={CREATOR_PROFILE.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#09090B] hover:bg-[#1A1A22] border border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-[#A78BFA]" />
                  <div>
                    <div className="text-sm font-semibold text-[#FAFAFA]">LinkedIn</div>
                    <div className="text-xs font-mono text-[#A1A1AA]">
                      {CREATOR_PROFILE.socials.linkedin.handle}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#FAFAFA]" />
              </a>

              <a
                href={CREATOR_PROFILE.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#09090B] hover:bg-[#1A1A22] border border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-[#22D3EE]" />
                  <div>
                    <div className="text-sm font-semibold text-[#FAFAFA]">GitHub</div>
                    <div className="text-xs font-mono text-[#A1A1AA]">
                      {CREATOR_PROFILE.socials.github.handle}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#FAFAFA]" />
              </a>
            </div>
          </div>

          {/* Location & Status */}
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-2 text-xs text-[#A1A1AA]">
            <div className="inline-flex items-center gap-2 text-[#FAFAFA] font-medium">
              <MapPin className="w-4 h-4 text-[#22D3EE]" />
              <span>{CREATOR_PROFILE.location}</span>
            </div>
            <p className="leading-relaxed">{CREATOR_PROFILE.availability}</p>
          </div>
        </div>

        {/* Right Column: Client-Side Validated Contact Form */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/40 text-[#22C55E] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#FAFAFA]">
                Message Received, {name}!
              </h2>
              <p className="text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out regarding <strong className="text-[#FAFAFA]">{topic}</strong>. I will reply to{' '}
                <span className="font-mono text-[#22D3EE]">{email}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                  setErrors({});
                }}
                className="px-4 py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] text-xs font-semibold text-[#FAFAFA] border border-white/10 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h2 className="font-display text-2xl font-bold text-[#FAFAFA]">
                Send a Direct Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#FAFAFA]">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Rohan Verma"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-white/15 text-sm text-[#FAFAFA] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6]"
                  />
                  {errors.name && (
                    <p className="text-xs text-[#EF4444] flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#FAFAFA]">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-white/15 text-sm text-[#FAFAFA] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6]"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#EF4444] flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-topic" className="block text-xs font-medium text-[#FAFAFA]">
                  Subject / Topic
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-white/15 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#8B5CF6]"
                >
                  <option value="Web Development / Internship Inquiry">
                    Web Development / Internship Inquiry
                  </option>
                  <option value="Feedback on playchessx.online">
                    Feedback on playchessx.online
                  </option>
                  <option value="Feedback on socialcalculator.site">
                    Feedback on socialcalculator.site
                  </option>
                  <option value="Python / C++ CSSS Collaboration">
                    Python / C++ CSSS Collaboration
                  </option>
                  <option value="AI & Vibe Coding Collaboration">
                    AI &amp; Vibe Coding Collaboration
                  </option>
                  <option value="Firebase / Supabase Cloud Development">
                    Firebase / Supabase Cloud Development
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#FAFAFA]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={e => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Tell me about your project, internship opportunity, or thoughts on playchessx.online..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-white/15 text-sm text-[#FAFAFA] placeholder-[#52525B] focus:outline-none focus:border-[#8B5CF6]"
                />
                {errors.message && (
                  <p className="text-xs text-[#EF4444] flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#A78BFA] text-[#FAFAFA] text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
