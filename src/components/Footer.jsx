import React from 'react';
import { ChevronUp, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-cyan-500/30 bg-[#04070d] py-10 font-mono">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Copyright & Name */}
        <div className="text-center md:text-left space-y-1">
          <p className="font-bold text-sm text-cyan-400 flex items-center justify-center md:justify-start gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            TAHA SHAIKH
          </p>
          <p className="text-[11px] text-slate-400">
            © {currentYear} {portfolioData.personal.name}. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4 text-slate-400">
          <a
            href={portfolioData.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-cyan-400 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-cyan-400 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${portfolioData.socialLinks.email}`}
            aria-label="Email Me"
            className="hover:text-cyan-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Scroll to top button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-cyan-500/40 text-xs text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all group"
        >
          <span>// RETURN_TO_TOP</span>
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
