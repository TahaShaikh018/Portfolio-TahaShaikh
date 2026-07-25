import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds, offset = 180) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // If near top of page, force 'hero'
      if (scrollPosition < 100) {
        setActiveSection(sectionIds[0] || 'hero');
        return;
      }

      // Check sections from bottom to top based on viewport position
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};
