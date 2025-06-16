import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size to hero section
    const setCanvasSize = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
    
    const colors = [
      { r: 10, g: 38, b: 71 },
      { r: 20, g: 66, b: 114 },
      { r: 32, g: 82, b: 149 },
      { r: 44, g: 116, b: 179 }
    ];
    
    // Particle class
    class Particle {
      constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Store base color and lightened version
        const baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.baseColor = baseColor;
        this.lightenedColor = {
          r: Math.min(255, baseColor.r + 40),
          g: Math.min(255, baseColor.g + 40),
          b: Math.min(255, baseColor.b + 40)
        };
        
        this.colorPhase = 0; // For color transition
        this.colorSpeed = 0.005 + Math.random() * 0.005;
      }
      
      updateColor(time) {
        // Calculate transition factor (0 to 1) using sine wave
        const factor = (Math.sin(this.colorPhase) + 1) / 2;
        
        // Interpolate between base and lightened color
        this.currentColor = {
          r: Math.round(this.baseColor.r + (this.lightenedColor.r - this.baseColor.r) * factor),
          g: Math.round(this.baseColor.g + (this.lightenedColor.g - this.baseColor.g) * factor),
          b: Math.round(this.baseColor.b + (this.lightenedColor.b - this.baseColor.b) * factor)
        };
        
        // Update phase
        this.colorPhase += this.colorSpeed;
      }
      
      update(width, height) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Boundary checks
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }
      
      draw(ctx) {
        ctx.fillStyle = `rgb(${this.currentColor.r}, ${this.currentColor.g}, ${this.currentColor.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    let particles = [];
    const initParticles = (width, height) => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 80 : 150;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };
    
    // Mouse interaction
    let mouseX = null;
    let mouseY = null;
    let radius = 0;
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };
    
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation loop
    let time = 0;
    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Update time for background transition
      time += 0.005;
      const bgFactor = (Math.sin(time) + 1) / 2; // 0 to 1
      
      // Create gradient background with shifting colors
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      const startColor = {
        r: Math.round(10 + bgFactor * 30),
        g: Math.round(20 + bgFactor * 30),
        b: Math.round(40 + bgFactor * 30)
      };
      const endColor = {
        r: Math.round(5 + bgFactor * 15),
        g: Math.round(10 + bgFactor * 15),
        b: Math.round(20 + bgFactor * 15)
      };
      
      gradient.addColorStop(0, `rgb(${startColor.r}, ${startColor.g}, ${startColor.b})`);
      gradient.addColorStop(1, `rgb(${endColor.r}, ${endColor.g}, ${endColor.b})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update particle color
        particle.updateColor(time);
        
        // Mouse interaction
        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Push particles away from mouse
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.x += dx * force * 0.1;
            particle.y += dy * force * 0.1;
          }
        }
        
        particle.update(width, height);
        particle.draw(ctx);
      });
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(32, 82, 149, ${opacity * 0.7})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Create fade effect at the bottom
      const fadeHeight = height * 0.15; // 15% of height for fade
      const fadeGradient = ctx.createLinearGradient(0, height - fadeHeight, 0, height);
      fadeGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      fadeGradient.addColorStop(1, '#0a0a14');
      ctx.fillStyle = fadeGradient;
      ctx.fillRect(0, height - fadeHeight, width, fadeHeight);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize particles after canvas size is set
    setTimeout(() => {
      initParticles(canvas.width, canvas.height);
      animate();
    }, 100);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="particle-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleBackground;