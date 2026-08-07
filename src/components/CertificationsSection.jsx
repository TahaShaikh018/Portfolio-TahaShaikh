import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Sparkles, 
  TrendingUp, 
  PieChart, 
  Workflow, 
  Database, 
  FileCode2, 
  MessageSquare, 
  Zap, 
  BarChart3, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  X, 
  Eye, 
  LayoutGrid, 
  Layers,
  Terminal
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const CertificationsSection = () => {
  const { certifications } = portfolioData;

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const ITEMS_PER_PAGE = 3;

  const iconMap = {
    Award,
    TrendingUp,
    PieChart,
    Workflow,
    Database,
    FileCode2,
    Sparkles,
    MessageSquare,
    Zap,
    BarChart3
  };

  // Unique categories for filtering
  const categories = useMemo(() => {
    const set = new Set(certifications.map((c) => c.category));
    return ['ALL', ...Array.from(set)];
  }, [certifications]);

  // Filtered certifications based on category & search query
  const filteredCertifications = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory =
        activeCategory === 'ALL' || cert.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.category.toLowerCase().includes(q) ||
        (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(q))) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [certifications, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredCertifications.length / ITEMS_PER_PAGE) || 1;

  // Ensure current page is valid when filters change
  const validCurrentPage = Math.min(currentPage, totalPages - 1);
  if (validCurrentPage !== currentPage && validCurrentPage >= 0) {
    setCurrentPage(validCurrentPage);
  }

  // Current page items for carousel view
  const currentItems = useMemo(() => {
    if (viewMode === 'grid') return filteredCertifications;
    const start = validCurrentPage * ITEMS_PER_PAGE;
    return filteredCertifications.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCertifications, validCurrentPage, viewMode]);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certifications" className="py-24 relative z-10 max-w-7xl mx-auto px-6 sm:px-8 font-mono">
      {/* Section Header */}
      <div className="text-center mb-10">
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
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider mb-2"
        >
          AUTHENTICATED <span className="gradient-text">CREDENTIALS</span>
        </motion.h2>

        <p className="text-slate-400 text-xs font-mono max-w-xl mx-auto flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SYSTEM_STATUS: [ {certifications.length} / {certifications.length} VERIFIED CREDENTIALS ONLINE ]</span>
        </p>
      </div>

      {/* Control Bar: Filters, Search & View Switcher */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-950/80 border border-cyan-500/30 p-4">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(0);
                }}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                    : 'bg-slate-900 text-slate-400 border border-cyan-500/30 hover:text-cyan-400 hover:border-cyan-400'
                }`}
              >
                // {cat}
              </button>
            ))}
          </div>

          {/* Search Box & View Mode Toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            {/* Real-time Search Input */}
            <div className="relative flex-1 lg:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                placeholder="SEARCH_CREDENTIALS..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(0);
                }}
                className="w-full bg-slate-900 border border-cyan-500/30 pl-9 pr-8 py-1.5 text-xs text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-cyan-500/30 p-0.5 shrink-0">
              <button
                onClick={() => setViewMode('carousel')}
                title="Carousel Slider View"
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono transition-colors ${
                  viewMode === 'carousel'
                    ? 'bg-cyan-400 text-black font-bold'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CAROUSEL</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Full Matrix Grid View"
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-cyan-400 text-black font-bold'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GRID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Pagination & Indicator Controls (only visible in Carousel mode) */}
        {viewMode === 'carousel' && filteredCertifications.length > 0 && (
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-bold">
              SHOWING {validCurrentPage * ITEMS_PER_PAGE + 1} - {Math.min((validCurrentPage + 1) * ITEMS_PER_PAGE, filteredCertifications.length)} OF {filteredCertifications.length} CREDENTIALS
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

              <span className="text-white font-bold bg-slate-950 px-2 py-1 border border-cyan-500/30">
                {String(validCurrentPage + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
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

      {/* No Results Fallback */}
      {filteredCertifications.length === 0 && (
        <div className="text-center py-16 bg-slate-950/60 border border-cyan-500/20 p-8 space-y-3">
          <Terminal className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
          <p className="text-cyan-400 font-bold text-sm">// NO MATCHING CREDENTIALS FOUND</p>
          <p className="text-slate-400 text-xs">Try clearing your search query or selecting a different category filter.</p>
          <button
            onClick={() => {
              setActiveCategory('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
          >
            RESET_FILTERS
          </button>
        </div>
      )}

      {/* Credentials Cards Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${activeCategory}-${validCurrentPage}-${searchQuery}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentItems.map((cert, index) => {
            const IconComp = iconMap[cert.icon] || Award;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-5 glass-panel rounded-none glow-card border border-cyan-500/40 space-y-4 flex flex-col justify-between group hover:border-cyan-400 transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Card Top Banner */}
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                    <div className="p-2 bg-slate-900 border border-cyan-400/40 text-cyan-400 group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 bg-slate-900 text-emerald-400 text-[10px] border border-emerald-500/30 truncate max-w-[170px]">
                      // {cert.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Title & Issuer Info */}
                  <div>
                    <h3 
                      onClick={() => setSelectedCert(cert)}
                      className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-2"
                    >
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5 text-xs">
                      <span className="text-cyan-400 font-semibold">
                        {cert.issuer}
                      </span>
                      {cert.issueDate && (
                        <span className="text-slate-400 text-[11px]">
                          {cert.issueDate}
                        </span>
                      )}
                    </div>

                    {/* Credential ID Box with Copy Action */}
                    {cert.credentialId && (
                      <div className="mt-2.5 text-[10px] font-mono text-slate-300 bg-slate-950 px-2.5 py-1 border border-cyan-500/20 flex items-center justify-between gap-2">
                        <span className="truncate">ID: {cert.credentialId}</span>
                        <button
                          onClick={(e) => handleCopyId(e, cert.credentialId)}
                          title="Copy Credential ID"
                          className="text-slate-400 hover:text-cyan-300 shrink-0 transition-colors"
                        >
                          {copiedId === cert.credentialId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Skills Chips */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 bg-slate-950 text-slate-300 text-[10px] border border-slate-800 hover:border-cyan-500/40 transition-colors"
                        >
                          #{skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="px-1.5 py-0.5 bg-slate-900 text-cyan-400 text-[10px]">
                          +{cert.skills.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-cyan-500/20 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold hover:text-cyan-300 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>[VERIFIED]</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      title="Inspect Credential Details"
                      className="px-2.5 py-1 bg-slate-900 text-cyan-400 border border-cyan-500/40 text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>INSPECT</span>
                    </button>

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
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Step Indicators / Dots Bar (Carousel Mode) */}
      {viewMode === 'carousel' && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => setCurrentPage(pageIdx)}
              className={`h-2 transition-all duration-300 ${
                pageIdx === validCurrentPage
                  ? 'w-8 bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                  : 'w-2 bg-slate-800 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      )}

      {/* Detailed ctOS Credential Inspection Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-mono">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border-2 border-cyan-400 w-full max-w-lg p-6 space-y-5 shadow-[0_0_30px_rgba(0,240,255,0.3)] relative"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
                <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase font-bold tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>// CREDENTIAL_INSPECTION_TERMINAL</span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 text-slate-400 hover:text-cyan-400 border border-slate-700 hover:border-cyan-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-2">
                <span className="px-2 py-0.5 bg-slate-950 text-emerald-400 text-[10px] border border-emerald-500/40 font-bold inline-block">
                  {selectedCert.category.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {selectedCert.title}
                </h3>
                <div className="flex flex-wrap items-center justify-between text-xs text-cyan-300 pt-1">
                  <span>ISSUER: <strong className="text-white">{selectedCert.issuer}</strong></span>
                  {selectedCert.issueDate && <span>DATE: {selectedCert.issueDate}</span>}
                </div>
              </div>

              {/* Barcode Aesthetic Block */}
              <div className="bg-slate-950 p-3 border border-cyan-500/20 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>SECURITY_HASH_VERIFIED</span>
                  <span className="text-emerald-400 font-bold">[STATUS: AUTHENTIC]</span>
                </div>
                {selectedCert.credentialId && (
                  <div className="flex items-center justify-between bg-slate-900 px-3 py-1.5 border border-cyan-500/30">
                    <span className="text-xs text-slate-200 truncate">ID: {selectedCert.credentialId}</span>
                    <button
                      onClick={(e) => handleCopyId(e, selectedCert.credentialId)}
                      className="flex items-center gap-1 text-xs text-cyan-400 hover:text-emerald-400 font-bold transition-colors ml-2 shrink-0"
                    >
                      {copiedId === selectedCert.credentialId ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
                {/* Simulated Barcode lines */}
                <div className="h-6 w-full opacity-60 flex items-center justify-between overflow-hidden gap-0.5 pt-1">
                  {Array.from({ length: 42 }).map((_, bIdx) => (
                    <div
                      key={bIdx}
                      className={`h-full ${bIdx % 3 === 0 ? 'w-1 bg-cyan-400' : bIdx % 2 === 0 ? 'w-0.5 bg-slate-600' : 'w-1.5 bg-cyan-500/60'}`}
                    />
                  ))}
                </div>
              </div>

              {/* All Skills Tag Breakdown */}
              {selectedCert.skills && selectedCert.skills.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">// ACQUIRED_SKILLS:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-1 bg-slate-950 text-cyan-300 text-xs border border-cyan-500/30"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-3 border-t border-cyan-500/30 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 bg-slate-950 border border-cyan-500/40 text-slate-300 hover:text-white text-xs font-bold uppercase transition-colors"
                >
                  CLOSE_TERMINAL
                </button>

                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                  >
                    <span>VERIFY_ON_ISSUER</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
