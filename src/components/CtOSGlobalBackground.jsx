import React, { useEffect, useRef } from 'react';

export const CtOSGlobalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Parameters
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 90);
    const particles = [];
    const mouse = { x: null, y: null, radius: 220 };

    const codeChars = ['ctOS', '0x9F', 'SYS_OK', '0101', 'DATA', 'NET_NODE', 'SECURE', '0xFA', 'ACCESS', 'LLM_OK', 'ETHARA_AI', 'JETIR'];
    const codeStreams = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1.2;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.color = Math.random() > 0.35 ? '#00f0ff' : '#00ff66';
        this.pulse = Math.random() * Math.PI;
      }

      draw() {
        this.pulse += 0.04;
        const currentSize = this.size + Math.sin(this.pulse) * 0.8;

        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.8, currentSize), 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 2.5;
            this.y -= (dy / distance) * force * 2.5;
          }
        }
      }
    }

    // Code Stream Class
    class CodeStream {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 1.2 + 0.6;
        this.text = codeChars[Math.floor(Math.random() * codeChars.length)];
        this.opacity = Math.random() * 0.25 + 0.12;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
        ctx.font = '11px "Share Tech Mono", monospace';
        ctx.fillText(this.text, this.x, this.y);
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
          this.text = codeChars[Math.floor(Math.random() * codeChars.length)];
        }
      }
    }

    // Initialize Particles & Code Streams
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    for (let i = 0; i < 35; i++) {
      codeStreams.push(new CodeStream());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Code Streams
      codeStreams.forEach((stream) => {
        stream.update();
        stream.draw();
      });

      // Draw ctOS Triangulation Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            const opacity = (1 - distance / 140) * 0.35;
            ctx.strokeStyle = particles[i].color === '#00ff66' 
              ? `rgba(0, 255, 102, ${opacity})`
              : `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Interactive Mouse Connection Rays
      if (mouse.x !== null && mouse.y !== null) {
        particles.forEach((p) => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const opacity = (1 - distance / mouse.radius) * 0.5;
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        });
      }

      // Update & Draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
};
