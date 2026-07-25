import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ExternalLink, Terminal, Award, Sparkles, TrendingUp, PieChart, Workflow, Database, FileCode2, MessageSquare, Zap, BarChart3 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const CertificationsSection = () => {
  const { certifications } = portfolioData;

  const iconMap = {
    Award: Award,
    TrendingUp: TrendingUp,
    PieChart: PieChart,
    Workflow: Workflow,
    Database: Database,
    FileCode2: FileCode2,
    Sparkles: Sparkles,
    MessageSquare: MessageSquare,
    Zap: Zap,
    BarChart3: BarChart3
  };

  return (
    <section id="certifications" className="py-24 relative z-10 max-w-7xl mx-auto px-6 sm:px-8 font-mono">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-400/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>// VERIFIED_CREDENTIALS // AUTH_DATABASE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider"
        >
          AUTHENTICATED <span className="gradient-text">CREDENTIALS</span>
        </motion.h2>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => {
          const IconComp = iconMap[cert.icon] || Award;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-5 glass-panel rounded-none glow-card border border-cyan-500/40 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                  <div className="p-2 bg-slate-900 border border-cyan-400/40 text-cyan-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 bg-slate-900 text-emerald-400 text-[10px] border border-emerald-500/30 truncate max-w-[170px]">
                    // {cert.category.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-1 text-xs">
                    <span className="text-cyan-400 font-semibold">
                      {cert.issuer}
                    </span>
                    {cert.issueDate && (
                      <span className="text-slate-400 text-[11px]">
                        {cert.issueDate}
                      </span>
                    )}
                  </div>

                  {cert.credentialId && (
                    <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 border border-cyan-500/20 truncate">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>

                {/* Skills Chips */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {cert.skills.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-1.5 py-0.5 bg-slate-950 text-slate-300 text-[10px] border border-slate-800"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> [VERIFIED]
                </span>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                  >
                    <span>VERIFY</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
