import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, FileText, Terminal, Shield } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import { portfolioData } from '../data/portfolioData';

const navItems = [
  { id: 'hero', label: '// 01_MAIN' },
  { id: 'about', label: '// 02_PROFILE' },
  { id: 'experience', label: '// 03_LOGS' },
  { id: 'skills', label: '// 04_SKILLS' },
  { id: 'projects', label: '// 05_GIGS' },
  { id: 'certifications', label: '// 06_CREDENTIALS' },
  { id: 'contact', label: '// 07_TRANSMIT' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const sectionIds = navItems.map(item => item.id);
  const activeSection = useActiveSection(sectionIds, 180);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3.5 shadow-2xl shadow-cyan-950/30' : 'bg-[#060b13]/95 py-4 border-b border-cyan-500/30'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">
        {/* Prominent Brand Header Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3.5 group focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 bg-slate-900 border-2 border-cyan-400/80 rounded flex items-center justify-center text-cyan-400 font-mono font-bold text-base shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="text-left space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base text-cyan-400 tracking-wider group-hover:text-emerald-400 transition-colors uppercase">
                {portfolioData.personal.name}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/40">
                <Shield className="w-3 h-3" /> ONLINE
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              STATUS: ACTIVE & SECURE
            </p>
          </div>
        </button>

        {/* High-Impact Watch Dogs ctOS Control Navbar Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-950/95 p-1.5 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.15)] rounded">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-400 text-black shadow-[0_0_16px_rgba(0,240,255,0.8)] scale-105'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/15'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Resume Quick Button */}
          <a
            href={portfolioData.personal.resumePdf}
            download
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold tracking-wider rounded bg-cyan-400/15 border border-cyan-400/60 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] uppercase"
          >
            <FileText className="w-4 h-4" />
            <span>DOSSIER.PDF</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2.5 rounded bg-slate-900 border border-cyan-500/50 text-cyan-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950 border-t border-cyan-500/40 mt-2 px-6 pt-4 pb-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2.5 font-mono text-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 font-bold tracking-wider transition-colors border-l-2 ${
                    activeSection === item.id
                      ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400'
                      : 'text-slate-300 border-transparent hover:bg-cyan-500/10 hover:text-cyan-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-around text-slate-400">
                <a href={portfolioData.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 hover:text-cyan-400">
                  <Github className="w-5 h-5" />
                </a>
                <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 hover:text-cyan-400">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${portfolioData.socialLinks.email}`} className="p-2 hover:text-cyan-400">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
