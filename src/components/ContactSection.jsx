import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Github, Linkedin, CheckCircle2, AlertCircle, Phone, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ContactSection = () => {
  const { socialLinks, contactConfig } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Direct live email submission to mdtahask63@gmail.com
      const response = await fetch("https://formsubmit.co/ajax/mdtahask63@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `[Portfolio Signal] New Contact Form Message from ${formData.name}`,
          _captcha: "false"
        })
      });

      const result = await response.json();
      if (response.ok || result.success === "true" || result.success === true) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || "Failed to transmit message.");
      }
    } catch (err) {
      // Fallback: Launch mailto directly to mdtahask63@gmail.com
      window.location.href = `mailto:mdtahask63@gmail.com?subject=${encodeURIComponent("Portfolio Contact from " + formData.name)}&body=${encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\n\nMessage:\n" + formData.message)}`;
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 max-w-7xl mx-auto px-6 sm:px-8 font-mono">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-cyan-400/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>// TRANSMIT_SIGNAL // INITIATE_CONTACT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wider"
        >
          INITIATE <span className="gradient-text">COMMUNICATION</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Info & Social Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="p-8 glass-panel rounded-none glow-card border border-cyan-500/40 space-y-6">
            <h3 className="font-bold text-xl text-white uppercase tracking-wider flex items-center gap-2 border-b border-cyan-500/20 pb-3">
              <Terminal className="w-4 h-4 text-emerald-400" />
              // OPERATIVE_CHANNELS
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Have an internship, project collaboration, or AI engineering opportunity? Transmit your signal directly to my inbox below.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${contactConfig.directEmail}`}
                className="flex items-center gap-4 p-3.5 bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 transition-all group"
              >
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">// DIRECT_EMAIL</p>
                  <p className="text-xs font-bold text-white">{contactConfig.directEmail}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 bg-slate-950 border border-cyan-500/30">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">// DIRECT_PHONE</p>
                  <p className="text-xs font-bold text-white">{contactConfig.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 bg-slate-950 border border-cyan-500/30">
                <div className="p-2.5 bg-purple-500/10 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">// LOCATION_COORDINATES</p>
                  <p className="text-xs font-bold text-white">{contactConfig.location}</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-cyan-500/20">
              <p className="text-[11px] text-cyan-400 mb-3">// SOCIAL_NODES</p>
              <div className="flex gap-3">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-slate-950 border border-cyan-500/40 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-slate-950 border border-cyan-500/40 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="p-8 glass-panel rounded-none glow-card border border-cyan-500/40 space-y-6"
          >
            <h3 className="font-bold text-xl text-white uppercase tracking-wider flex items-center gap-2 border-b border-cyan-500/20 pb-3">
              <Terminal className="w-4 h-4 text-cyan-400" />
              // TRANSMIT_SIGNAL_FORM
            </h3>

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs text-cyan-400">
                // SENDER_NAME *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Name / Organization..."
                className="w-full px-4 py-3 bg-slate-950 border border-cyan-500/30 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs text-cyan-400">
                // SENDER_EMAIL *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="email@domain.com..."
                className="w-full px-4 py-3 bg-slate-950 border border-cyan-500/30 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs text-cyan-400">
                // SIGNAL_PAYLOAD / MESSAGE *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter project details, opportunity specs, or inquiries..."
                className="w-full px-4 py-3 bg-slate-950 border border-cyan-500/30 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            {/* Feedback Notifications */}
            {status.success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>[✓] TRANSMISSION_DELIVERED: Message sent to mdtahask63@gmail.com!</span>
              </div>
            )}

            {status.error && (
              <div className="p-4 bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-4 font-bold text-xs text-black bg-cyan-400 hover:bg-emerald-400 transition-all duration-300 uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status.loading ? (
                <span>TRANSMITTING_SIGNAL...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT_SIGNAL_TO_GMAIL</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
