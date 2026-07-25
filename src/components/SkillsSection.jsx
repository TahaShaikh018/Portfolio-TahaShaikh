import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SkillsSection = () => {
  const { skillCategories } = portfolioData;

  const DynamicIcon = ({ name, color, className = "w-4 h-4" }) => {
    const IconComponent = Icons[name] || Icons.Code;
    return <IconComponent className={className} style={{ color }} />;
  };

  return (
    <section id="skills" className="py-24 relative z-10 max-w-7xl mx-auto px-6 sm:px-8 font-mono">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-400/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3"
        >
          <Icons.Cpu className="w-3.5 h-3.5" />
          <span>// SKILLS_TREE // NODE_MAP</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider"
        >
          TECHNICAL <span className="gradient-text">SKILLS MATRIX</span>
        </motion.h2>
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((categoryObj, cIdx) => (
          <motion.div
            key={cIdx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: cIdx * 0.15 }}
            className="p-6 glass-panel rounded-none glow-card border border-cyan-500/40 space-y-6 flex flex-col justify-between font-mono"
          >
            <div>
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Icons.Network className="w-4 h-4 text-emerald-400" />
                  // {categoryObj.category.replace(/ & /g, '_').replace(/ /g, '_').toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-500">[NODE_BRANCH]</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-6">
                {categoryObj.description}
              </p>

              {/* Skill Node Progress Meters */}
              <div className="space-y-5">
                {categoryObj.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                        <DynamicIcon name={skill.icon} color={skill.color} />
                        {skill.name}
                      </span>
                      <span className="font-mono text-cyan-400 text-[11px]">
                        [{skill.level}%]
                      </span>
                    </div>

                    {/* ctOS Terminal Progress Bar */}
                    <div className="w-full h-2 bg-slate-950 rounded-none overflow-hidden p-0.5 border border-cyan-500/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + sIdx * 0.1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/20 text-[10px] text-emerald-400 flex items-center justify-between">
              <span>STATUS: SYNCHRONIZED</span>
              <span>NODE_ID #00{cIdx+1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
