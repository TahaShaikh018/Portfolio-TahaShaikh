import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Github, CheckCircle2, Terminal, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { cyberAudio } from '../utils/cyberAudio';

export const ProjectsSection = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 2;

  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects]);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;

  // Ensure current page is valid when filter changes
  const validCurrentPage = Math.min(currentPage, totalPages - 1);
  if (validCurrentPage !== currentPage && validCurrentPage >= 0) {
    setCurrentPage(validCurrentPage);
  }

  const currentItems = useMemo(() => {
    const start = validCurrentPage * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, validCurrentPage]);

  const handleNextPage = () => {
    cyberAudio.playClickSound();
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    cyberAudio.playClickSound();
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleCategoryChange = (cat) => {
    cyberAudio.playClickSound();
    setActiveFilter(cat);
    setCurrentPage(0);
  };

  return (
    <section id="projects" className="py-24 relative z-10 max-w-7xl mx-auto px-6 sm:px-8 font-mono">
      {/* Section Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-400/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3"
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>// OPERATIONAL_GIGS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider mb-6"
        >
          ACTIVE <span className="gradient-text">OPERATIONS</span>
        </motion.h2>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 font-mono mb-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                  : 'bg-slate-900/80 text-slate-400 border border-cyan-500/30 hover:text-cyan-400 hover:border-cyan-400'
              }`}
            >
              // {cat}
            </button>
          ))}
        </motion.div>

        {/* Carousel Pagination Status & Navigation Bar */}
        {filteredProjects.length > 0 && (
          <div className="flex items-center justify-between max-w-4xl mx-auto px-2 text-xs font-mono text-slate-400 border-b border-cyan-500/20 pb-3">
            <span className="text-cyan-400 font-bold">
              SHOWING {validCurrentPage * ITEMS_PER_PAGE + 1} - {Math.min((validCurrentPage + 1) * ITEMS_PER_PAGE, filteredProjects.length)} OF {filteredProjects.length} OPERATIONS
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevPage}
                disabled={totalPages <= 1}
                className="flex items-center gap-1 px-3 py-1 bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold text-xs disabled:opacity-30 disabled:pointer-events-none transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV</span>
              </button>

              <span className="text-white font-bold bg-slate-950 px-2.5 py-1 border border-cyan-500/30">
                PAGE {String(validCurrentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
              </span>

              <button
                onClick={handleNextPage}
                disabled={totalPages <= 1}
                className="flex items-center gap-1 px-3 py-1 bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold text-xs disabled:opacity-30 disabled:pointer-events-none transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2-Card Symmetric Grid Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeFilter}-${validCurrentPage}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[420px]"
        >
          {currentItems.map((project, idx) => {
            const absoluteIdx = validCurrentPage * ITEMS_PER_PAGE + idx;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="group glass-panel glow-card rounded-none border border-cyan-500/40 p-4 space-y-3 flex flex-col justify-between hover:border-cyan-400 transition-all duration-300"
              >
                <div>
                  {/* ctOS Operation Header with Green Checkmark */}
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2 font-mono">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 truncate">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      Op: {project.title.split(' – ')[0].replace(/ /g, '_')}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> [✓]
                    </span>
                  </div>

                  {/* ctOS Surveillance Feed Thumbnail Frame */}
                  <div className="relative aspect-[16/9] overflow-hidden border border-cyan-500/40 bg-slate-950 scanlines">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/90 border border-cyan-400/50 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                      CAM_FEED #00{absoluteIdx + 1}
                    </div>

                    {/* Hover Source Overlay */}
                    <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => cyberAudio.playClickSound()}
                          className="px-4 py-2 bg-cyan-400 text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                        >
                          <Github className="w-4 h-4" />
                          <span>VIEW_SOURCE</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="pt-3 space-y-1.5 font-mono">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                      // CATEGORY: {project.category}
                    </span>

                    <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="pt-2 border-t border-cyan-500/20 flex flex-wrap gap-1.5 font-mono">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-slate-900 text-cyan-300 text-[10px] border border-cyan-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Step Indicator Dots Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => {
                cyberAudio.playClickSound();
                setCurrentPage(pageIdx);
              }}
              className={`h-2 transition-all duration-300 ${
                pageIdx === validCurrentPage
                  ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                  : 'w-2 bg-slate-800 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
