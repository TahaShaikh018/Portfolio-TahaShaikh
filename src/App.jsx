import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { PageLoader } from './components/PageLoader';
import { CustomCursor } from './components/CustomCursor';
import { CtOSGlobalBackground } from './components/CtOSGlobalBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationResearchSection } from './components/EducationResearchSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { cyberAudio } from './utils/cyberAudio';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Disable automatic browser scroll restoration on refresh/load so page always starts at top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Global listener for mechanical audio feedback on clicks
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, input, [role="button"], label, select');
      if (target) {
        cyberAudio.playClickSound();
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      {/* Intro Splash Loader - 100% Fullscreen Coverage */}
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="page-loader" onComplete={handleComplete} />}
      </AnimatePresence>

      {/* Custom Spring Cursor */}
      <CustomCursor />

      {/* Render Main App Content ONLY after loading completes */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative min-h-screen bg-transparent text-slate-100 font-mono transition-colors duration-300"
        >
          {/* Dynamic Watch Dogs ctOS Global Animated Canvas Background */}
          <CtOSGlobalBackground />

          <Navbar />

          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <EducationResearchSection />
            <SkillsSection />
            <ProjectsSection />
            <CertificationsSection />
            <ResumeSection />
            <ContactSection />
          </main>

          <Footer />
        </motion.div>
      )}
    </ThemeProvider>
  );
}

export default App;
