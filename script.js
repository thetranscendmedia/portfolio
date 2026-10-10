/* ==========================================================================
   THE TRANSCENDS TECH HUB — PHASE 1: INTERACTIVE SCRIPT
   Features: Particle Background Network, Dynamic Cursor Attraction
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Mouse coordinate tracker
  const mouse = {
    x: width / 2,
    y: height / 2,
    radius: 180
  };

  // Resize Listener
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Cursor Motion Listener
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Particle Class Definition
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1.8 + 0.5;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      
      // Purple / Blue Color Spectrum Selection
      const colors = [
        'rgba(123, 44, 191, ',  // Purple
        'rgba(157, 78, 221, ',  // Light Purple
        'rgba(0, 180, 216, '    // Electric Blue
      ];
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorBase}${this.alpha})`;
      ctx.fill();
    }

    update() {
      // Natural Drift
      this.x += this.vx;
      this.y += this.vy;

      // Screen Boundary Rebound
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse Proximity Repulsion/Attraction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        
        // Gentle dynamic push
        this.x -= forceDirectionX * force * 1.5;
        this.y -= forceDirectionY * force * 1.5;
      }
    }
  }

  // Populate Particle Field
  const particleCount = Math.min(Math.floor((width * height) / 12000), 100);
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Draw Interconnecting Neural Lines
  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const opacity = (1 - distance / 130) * 0.25;
          ctx.strokeStyle = `rgba(157, 78, 221, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Main Render Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();

  // Button Click Event Handler
  const enterBtn = document.getElementById('enter-hub-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Smooth Transition Feedback
      enterBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        enterBtn.style.transform = 'scale(1)';
        alert('Welcome to Phase 1. The Transcends Tech Hub portal is ready!');
      }, 150);
    });
  }
});