import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Github, Linkedin, Mail, Shield, Terminal, Activity, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = portfolioData.personal.typewriterRoles;

  // Typewriter effect loop
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Watch Dogs City Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: `url('./watch_dogs_bg.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060b13]/80 via-[#060b13]/90 to-[#060b13] pointer-events-none" />

      {/* Decorative ctOS HUD Line Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* ctOS Telemetry Status Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded bg-slate-900/90 border border-cyan-400/40 text-cyan-400 font-mono text-xs mb-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold">// OPERATIVE_IDENTIFIED</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">STATUS: ACTIVE</span>
        </motion.div>

        {/* Operative Name Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-tight mb-3 text-white uppercase"
        >
          OPERATIVE: <span className="gradient-text">{portfolioData.personal.name}</span>
        </motion.h1>

        {/* Animated Typewriter Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-12 sm:h-14 flex items-center justify-center mb-6"
        >
          <span className="font-mono text-lg sm:text-2xl md:text-3xl text-cyan-300">
            &gt; {displayText}
            <span className="inline-block w-2.5 h-6 ml-1 bg-cyan-400 animate-pulse" />
          </span>
        </motion.div>

        {/* Hero Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-mono mb-8 leading-relaxed bg-slate-950/70 p-4 rounded border border-cyan-500/20"
        >
          {portfolioData.personal.heroBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 font-mono font-bold text-xs text-black bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(0,255,102,0.5)] transition-all duration-300 uppercase tracking-widest"
          >
            <span>// INITIATE_TRANSMISSION</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('projects')}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-mono font-bold text-xs text-cyan-400 bg-slate-900/90 border border-cyan-500/50 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 uppercase tracking-widest"
          >
            <span>// ACCESS_OPERATIONS</span>
          </button>
        </motion.div>

        {/* Social Icons Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 text-slate-400"
        >
          <a
            href={portfolioData.socialLinks.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-3 rounded bg-slate-900 border border-cyan-500/30 hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-3 rounded bg-slate-900 border border-cyan-500/30 hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${portfolioData.socialLinks.email}`}
            aria-label="Send Email"
            className="p-3 rounded bg-slate-900 border border-cyan-500/30 hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-400 hover:text-emerald-400 transition-colors p-2"
        aria-label="Scroll to About Section"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};
