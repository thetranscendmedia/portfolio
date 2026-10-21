/* ==========================================================================
   THE TRANSCENDS TECH HUB — ULTRA SCI-FI HOLOGRAPHIC MAIN HUB JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Advanced Cyber-Particle Canvas System ---
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let isHyperDrive = false;

    class CyberParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.8 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.alpha = Math.random() * 0.5 + 0.3;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHyperDrive ? `rgba(0, 245, 212, ${this.alpha + 0.3})` : `rgba(157, 78, 221, ${this.alpha})`;
        ctx.shadowBlur = isHyperDrive ? 15 : 5;
        ctx.shadowColor = isHyperDrive ? '#00f5d4' : '#9d4edd';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
      update() {
        const speedMultiplier = isHyperDrive ? 2.5 : 1;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    const particles = Array.from({ length: 75 }, () => new CyberParticle());

    // Draw connecting laser web-lines between close particles during hyper-drive
    function drawWebLines() {
      if (!isHyperDrive) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawWebLines();
      requestAnimationFrame(animate);
    }
    animate();

    // Export hyperdrive control to global scope for button trigger
    window.setParticleHyperDrive = (active) => {
      isHyperDrive = active;
    };
  }

  // --- 2. Smooth Scroll Reveal Observer ---
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  scrollElements.forEach(el => scrollObserver.observe(el));

  // --- 3. Terminal Typewriter & Cyber Scramble Effect ---
  function typeWriter(element, text, speed = 25, callback) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  function scrambleText(element, finalString, duration = 600) {
    if (!element) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>*+-_';
    let startTime = Date.now();
    
    function update() {
      let elapsed = Date.now() - startTime;
      let progress = Math.min(elapsed / duration, 1);
      
      let scrambled = '';
      for (let i = 0; i < finalString.length; i++) {
        if (progress === 1 || Math.random() < progress) {
          scrambled += finalString[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      element.textContent = scrambled;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    update();
  }

  // --- 4. Whiz-Watch Holographic Projection Controller ---
  const projectorBtn = document.getElementById('projector-btn');
  const hologramStage = document.getElementById('hologram-stage');
  const laserBeam = document.getElementById('laser-beam');
  const aiMessage = document.getElementById('ai-typewriter-text');
  const aiStatus = document.getElementById('ai-status-text');
  const hubSection = document.getElementById('capabilities');

  if (projectorBtn && hologramStage) {
    let isProjected = false;

    projectorBtn.addEventListener('click', () => {
      isProjected = !isProjected;

      if (isProjected) {
        // Activate Sci-Fi Laser & Hologram Projection
        laserBeam.classList.add('active');
        hologramStage.classList.add('projected');
        if (hubSection) hubSection.classList.add('hud-active');
        if (window.setParticleHyperDrive) window.setParticleHyperDrive(true);
        
        projectorBtn.innerHTML = '<span class="beam-icon">✖</span><span>Retract Hologram</span>';
        
        scrambleText(aiStatus, 'WHIZ-WATCH SECURE STREAM LIVE', 400);
        setTimeout(() => {
          typeWriter(aiMessage, '"Holographic matrix stable. Sub-panels projected at 60% opacity. Select your pathway protocol."', 20);
        }, 300);

      } else {
        // Retract Beam & Standby
        laserBeam.classList.remove('active');
        hologramStage.classList.remove('projected');
        if (hubSection) hubSection.classList.remove('hud-active');
        if (window.setParticleHyperDrive) window.setParticleHyperDrive(false);
        
        projectorBtn.innerHTML = '<span class="beam-icon">⚡</span><span>Project Hologram</span>';
        
        scrambleText(aiStatus, 'PROJECTOR STANDBY', 400);
        setTimeout(() => {
          typeWriter(aiMessage, '"Whiz-Watch link active. Tap to project holographic service panels."', 20);
        }, 300);
      }
    });
  }

});
