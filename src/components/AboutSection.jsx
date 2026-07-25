import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const AboutSection = () => {
  const { personal, quickStats, aboutFacts } = portfolioData;

  return (
    <section id="about" className="py-24 relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-400/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3"
        >
          <User className="w-3.5 h-3.5" />
          <span>// PROFILE_DOSSIER</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider"
        >
          OPERATIVE <span className="gradient-text">PROFILE</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Watch Dogs PERSONAL ID Panel (Matching Reference Image) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* PERSONAL ID Window Box */}
          <div className="glass-panel rounded-none p-4 space-y-4 glow-card border-cyan-400/40">
            {/* Window Header Dots Bar */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                PERSONAL ID // ctOS_DATA
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Operative Hacker Photo Frame */}
            <div className="relative border border-cyan-500/40 bg-slate-950 p-2 overflow-hidden scanlines">
              <img
                src={personal.avatarUrl}
                alt={personal.name}
                className="w-full h-80 object-cover opacity-90 filter contrast-125"
              />
              <div className="absolute top-4 right-4 bg-slate-900/90 border border-cyan-400/60 px-2 py-0.5 text-[10px] font-mono text-cyan-400">
                ROLE: INFILTRATOR
              </div>
            </div>

            {/* Operative Specs */}
            <div className="space-y-1.5 font-mono text-xs pt-2">
              <p className="font-bold text-sm text-white tracking-wider uppercase">
                OPERATIVE_TAHA_SHAIKH
              </p>
              <p className="text-cyan-400">
                ROLE: DATA_SCIENTIST / LLM_SPECIALIST
              </p>
              <p className="text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                STATUS: ACTIVE
              </p>
              <p className="text-slate-400 text-[11px]">
                LOCATION: {personal.location.toUpperCase()}
              </p>
            </div>
          </div>

          {/* SYSTEM STATUS: SECURE Bar */}
          <div className="glass-panel-green p-3 flex items-center justify-between font-mono text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              SYSTEM STATUS: SECURE
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>
        </motion.div>

        {/* Right Details Column: Bio & Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Bio Text Paragraphs in ctOS Terminal Card */}
          <div className="glass-panel p-6 space-y-4 text-slate-300 text-sm leading-relaxed font-mono">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2">
              <span className="text-xs font-bold text-cyan-400">// BIOGRAPHICAL_OVERVIEW</span>
              <span className="text-[10px] text-slate-500">ID_REF #801026</span>
            </div>
            {personal.aboutBio.map((paragraph, index) => (
              <p key={index} className="text-justify">{paragraph}</p>
            ))}
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutFacts.map((fact, index) => (
              <div
                key={index}
                className="p-4 glass-panel border border-cyan-500/30 hover:border-cyan-400 transition-colors font-mono"
              >
                <p className="text-[11px] text-cyan-400 mb-1">// {fact.title.toUpperCase()}</p>
                <p className="text-sm font-semibold text-white">{fact.detail}</p>
              </div>
            ))}
          </div>

          {/* Key Counter Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-3 glass-panel border border-cyan-500/30"
              >
                <div className="font-mono font-bold text-2xl text-cyan-400 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
