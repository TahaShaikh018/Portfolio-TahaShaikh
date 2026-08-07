/**
 * ctOS Cyber Mechanical Audio Synthesizer (Web Audio API)
 * Zero external asset dependencies, 100% reliable across browsers.
 */

class CyberAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem('ctos_sfx_muted') === 'true';
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('ctos_sfx_muted', this.isMuted);
    if (!this.isMuted) {
      this.playClickSound();
    }
    return this.isMuted;
  }

  /**
   * Mechanical Click Sound (crisp 30ms mechanical relay tick)
   */
  playClickSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. High transient burst (mechanical switch snap)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);

      // 2. Sub-click thud (relay contact)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();

      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(180, now);
      clickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.02);

      clickGain.gain.setValueAtTime(0.15, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(now);
      clickOsc.stop(now + 0.02);
    } catch (e) {
      // AudioContext might be blocked until user gesture
    }
  }

  /**
   * System Boot Sound (Watch Dogs ctOS initialization pulse)
   */
  playBootSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Primary Cyber Sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.45);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      // Lowpass Filter for digital warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);

      // Harmony Cyber Chime
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(523.25, now + 0.15); // C5
      chimeOsc.frequency.setValueAtTime(1046.50, now + 0.28); // C6

      chimeGain.gain.setValueAtTime(0.001, now + 0.15);
      chimeGain.gain.linearRampToValueAtTime(0.15, now + 0.28);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);

      chimeOsc.start(now + 0.15);
      chimeOsc.stop(now + 0.55);
    } catch (e) {
      // Ignore audioContext auto-play policy blocks
    }
  }
}

export const cyberAudio = new CyberAudioEngine();
