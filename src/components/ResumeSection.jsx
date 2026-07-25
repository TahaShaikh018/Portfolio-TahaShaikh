import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle2, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ResumeSection = () => {
  const { personal } = portfolioData;

  return (
    <section id="resume" className="py-24 relative z-10 max-w-6xl mx-auto px-6 sm:px-8 font-mono">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-400/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>// DOSSIER_EXPORT // CV_ARCHIVE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider"
        >
          OPERATIVE <span className="gradient-text">DOSSIER</span>
        </motion.h2>
      </div>

      {/* Resume Overview Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-8 glass-panel rounded-none glow-card border border-cyan-500/40 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-emerald-400/40 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> // AUTHENTICATED_OPERATIVE_DOSSIER
          </div>

          <h3 className="font-bold text-2xl text-white uppercase">
            Export full printable operative summary?
          </h3>

          <p className="text-slate-300 text-xs leading-relaxed">
            Download the comprehensive resume PDF containing detailed descriptions of past AI research publications, LLM post-training internship at Ethara AI, Computer Vision projects, and 9 verified credentials.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-400">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> ATS_FORMAT_AUTHENTICATED
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> SYSTEM_UPDATED_2026
            </div>
          </div>
        </div>

        {/* Download Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-4 shrink-0 w-full sm:w-auto">
          <a
            href={personal.resumePdf}
            download="Taha_Shaikh_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold text-xs text-black bg-cyan-400 hover:bg-emerald-400 transition-all duration-300 uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT_DOSSIER.PDF</span>
          </a>

          <a
            href={personal.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>PREVIEW_IN_TERMINAL</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
