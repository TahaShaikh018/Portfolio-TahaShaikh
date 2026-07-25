import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceSection = () => {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="py-24 relative z-10 max-w-6xl mx-auto px-6 sm:px-8 font-mono">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-400/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>// CHRONOLOGY // LOGGED_OPERATIONS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider"
        >
          CAREER <span className="gradient-text">OPERATIONS</span>
        </motion.h2>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative border-l-2 border-cyan-500/40 ml-4 sm:ml-32 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative pl-6 sm:pl-8 group"
          >
            {/* Glowing Node Marker */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />

            {/* Date Tag */}
            <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
              <span className="inline-block px-2 py-1 bg-slate-900 border border-cyan-500/30 text-[11px] text-cyan-400 font-bold">
                {exp.period}
              </span>
            </div>

            {/* Main Content Card */}
            <div className="p-6 glass-panel rounded-none glow-card border border-cyan-500/40 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-400">// {exp.company}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="sm:hidden flex items-center gap-1 text-cyan-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {exp.description}
              </p>

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-cyan-500/20">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 bg-slate-900 text-cyan-300 text-xs border border-cyan-500/30"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
