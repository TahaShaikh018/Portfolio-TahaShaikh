import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookMarked, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const EducationResearchSection = () => {
  const { education, researchAndPublications } = portfolioData;

  return (
    <section id="education" className="py-24 relative z-10 max-w-7xl mx-auto px-6 sm:px-8 font-mono">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-400/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>// ACADEMIA // RESEARCH_ARCHIVE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider"
        >
          ACADEMIA & <span className="gradient-text">RESEARCH</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Education Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-slate-900 border border-cyan-400/40 text-cyan-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-white uppercase tracking-wider">
              // ACADEMIC_RECORD
            </h3>
          </div>

          <div className="space-y-6">
            {education.map((item) => (
              <div
                key={item.id}
                className="p-6 glass-panel rounded-none glow-card space-y-3 border border-cyan-500/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-2">
                  <h4 className="font-bold text-base text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    {item.degree}
                  </h4>
                  <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/30">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs font-semibold text-emerald-400">
                  // {item.institution}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Research & Publications Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-slate-900 border border-emerald-400/40 text-emerald-400">
              <BookMarked className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-white uppercase tracking-wider">
              // RESEARCH_PUBLICATIONS
            </h3>
          </div>

          <div className="space-y-6">
            {researchAndPublications.map((pub) => (
              <div
                key={pub.id}
                className="p-6 glass-panel rounded-none glow-card space-y-4 border border-cyan-500/40 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-2">
                    <h4 className="font-bold text-base text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      {pub.title}
                    </h4>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/30">
                      {pub.type}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400">
                    // {pub.publisher}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pub.description}
                  </p>
                </div>

                {pub.paperUrl && (
                  <div className="pt-3 border-t border-cyan-500/20 flex justify-end">
                    <a
                      href={pub.paperUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_10px_rgba(0,255,102,0.4)]"
                    >
                      <span>ACCESS_PUBLICATION</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
