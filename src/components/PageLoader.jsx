import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { cyberAudio } from '../utils/cyberAudio';

export const PageLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootText, setBootText] = useState('INITIATING_ctOS_BOOT_SEQUENCE...');

  // Guaranteed smooth loader interval (0% -> 100% in 1.8 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // Update dynamic telemetry log based on progress percentage
  useEffect(() => {
    if (progress < 25) {
      setBootText('CONNECTING_TO_ctOS_MAINNET...');
    } else if (progress < 50) {
      setBootText(`AUTHENTICATING_OPERATIVE #${portfolioData.personal.name.toUpperCase().replace(/ /g, '_')}...`);
    } else if (progress < 75) {
      setBootText('LOADING_AI_MODELS & RESEARCH_PIPELINES...');
    } else if (progress < 98) {
      setBootText('DECRYPTING_OPERATIONS & CREDENTIALS_DATABASE...');
    } else {
      setBootText('ACCESS_GRANTED // INITIALIZING_INTERFACE...');
    }

    // Trigger onComplete and play boot sound when 100% reached
    if (progress >= 100) {
      cyberAudio.playBootSound();
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5, ease: 'easeInOut' } }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999 }}
      className="w-screen h-screen flex flex-col items-center justify-center bg-[#060b13] text-white font-mono overflow-hidden"
    >
      {/* Scanline Effect Sub-Layer */}
      <div className="absolute inset-0 scanlines pointer-events-none z-[1]" />

      {/* Background ctOS HUD Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.06)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-[2]" />

      {/* Main Loader Content Box */}
      <div className="relative z-10 w-full max-w-md px-6 text-center space-y-6">
        {/* Watch Dogs ctOS Operative Emblem (TS) */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          {/* Outer Rotating Cyber Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-dashed border-cyan-400/60 rounded-full"
          />
          {/* Inner Glowing Ring */}
          <motion.div
            animate={{ scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-1 border border-emerald-400/80 rounded-full shadow-[0_0_15px_rgba(0,255,102,0.4)]"
          />
          {/* Core Symbol (TS) */}
          <div className="w-14 h-14 bg-slate-900 border border-cyan-400/80 rounded-lg flex items-center justify-center text-cyan-400 font-bold text-xl shadow-[0_0_20px_rgba(0,240,255,0.5)]">
            TS
          </div>
        </div>

        {/* Operative Name Title */}
        <div className="space-y-1">
          <h2 className="font-bold text-2xl tracking-wider text-white uppercase gradient-text">
            {portfolioData.personal.name}
          </h2>
          <p className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">
            // {portfolioData.personal.title}
          </p>
        </div>

        {/* Live Telemetry Boot Log */}
        <div className="bg-slate-950/90 border border-cyan-500/30 p-3 rounded text-left space-y-1 shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-cyan-500/20 pb-1">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Activity className="w-3 h-3 animate-pulse" /> ctOS_KERNEL_v4.8
            </span>
            <span className="text-cyan-400 font-bold">SYS_BOOT: {progress}%</span>
          </div>
          <p className="text-xs text-cyan-300 font-mono pt-1 h-5 flex items-center gap-1.5 truncate">
            <span className="text-emerald-400 font-bold">&gt;</span> {bootText}
          </p>
        </div>

        {/* ctOS Glowing Neon Progress Meter */}
        <div className="w-full h-2 bg-slate-950 rounded-none overflow-hidden p-0.5 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
