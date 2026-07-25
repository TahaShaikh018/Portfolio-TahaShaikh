import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only screen
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Event Delegation for links, buttons, and interactive cards
    const handleOverInteractive = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], .interactive-hover');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleOverInteractive);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleOverInteractive);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-cyan-400 rounded-full"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isClicked ? 0.6 : isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? '#ec4899' : '#06b6d4',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Trailing Soft Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 border border-cyan-400/60 rounded-full"
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isClicked ? 0.8 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? 'rgba(236, 72, 153, 0.8)' : 'rgba(6, 182, 212, 0.6)',
          backgroundColor: isHovered ? 'rgba(236, 72, 153, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.3 }}
      />
    </div>
  );
};
