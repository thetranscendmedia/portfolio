/* ==========================================================================
   THE TRANSCENDS TECH HUB — PHASE 2: LOADING EXPERIENCE JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('loader-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Background Ambient Particle Field
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(157, 78, 221, ${this.alpha})`;
      ctx.fill();
    }
  }

  const bgParticles = Array.from({ length: 50 }, () => new Particle());

  function animateBg() {
    ctx.clearRect(0, 0, width, height);
    bgParticles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateBg);
  }
  animateBg();

  // Rotating Mottos Sequence
  const mottoStages = [
    { threshold: 0, text: "Preparing Creativity..." },
    { threshold: 15, text: "Connecting Brilliant Minds..." },
    { threshold: 30, text: "Launching Talents..." },
    { threshold: 45, text: "Engineering Possibilities..." },
    { threshold: 60, text: "Transforming Ideas into Reality..." },
    { threshold: 75, text: "Activating Creative Potential..." },
    { threshold: 90, text: "Something Extraordinary Is Loading..." }
  ];

  const mottoEl = document.getElementById('motto-text');
  const percentageEl = document.getElementById('percentage-counter');
  const progressFill = document.getElementById('progress-fill');
  const container = document.getElementById('floating-elements-container');

  function updateMotto(progress) {
    let activeMotto = mottoStages[0].text;
    for (let i = mottoStages.length - 1; i >= 0; i--) {
      if (progress >= mottoStages[i].threshold) {
        activeMotto = mottoStages[i].text;
        break;
      }
    }

    if (mottoEl && mottoEl.textContent !== activeMotto) {
      mottoEl.classList.add('motto-fade-out');
      setTimeout(() => {
        mottoEl.textContent = activeMotto;
        mottoEl.classList.remove('motto-fade-out');
        mottoEl.classList.add('motto-fade-in');
        setTimeout(() => mottoEl.classList.remove('motto-fade-in'), 300);
      }, 300);
    }
  }

  // Creative Elements
  const creativeTokens = [
    '</>', '{ }', '01', '<span/>', '#transcends', 'UI/UX', 
    'CSS3', 'JS', 'node', 'vector', 'pixel', '<div>', 'ƒ(x)'
  ];

  function spawnCreativeToken(progress) {
    if (progress >= 98 || !container || !progressFill) return;

    const token = document.createElement('div');
    token.className = 'floating-creative-item';
    token.textContent = creativeTokens[Math.floor(Math.random() * creativeTokens.length)];

    const side = Math.random();
    let startX, startY;
    
    if (side < 0.25) { startX = Math.random() * width; startY = -30; }
    else if (side < 0.5) { startX = Math.random() * width; startY = height + 30; }
    else if (side < 0.75) { startX = -50; startY = Math.random() * height; }
    else { startX = width + 50; startY = Math.random() * height; }

    token.style.left = `${startX}px`;
    token.style.top = `${startY}px`;
    container.appendChild(token);

    const barRect = progressFill.getBoundingClientRect();
    const targetX = barRect.left + (barRect.width * (progress / 100));
    const targetY = barRect.top + barRect.height / 2;

    requestAnimationFrame(() => {
      token.style.opacity = '0.8';
      token.style.transform = `translate(${targetX - startX}px, ${targetY - startY}px) scale(0.6)`;
    });

    setTimeout(() => {
      token.style.opacity = '0';
      token.style.transform += ' scale(0.1)';
      setTimeout(() => token.remove(), 800);
    }, 1200);
  }

  // Progress Animation Loop (6 seconds)
  let progress = 0;
  const duration = 6000;
  const intervalTime = 40;
  const totalSteps = duration / intervalTime;
  const incrementStep = 100 / totalSteps;

  const loadingInterval = setInterval(() => {
    progress += incrementStep * (1 + (1 - progress / 100) * 0.5);
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      onLoadingComplete();
    }

    const roundedProgress = Math.floor(progress);
    if (percentageEl) percentageEl.textContent = `${roundedProgress}%`;
    if (progressFill) progressFill.style.width = `${progress}%`;

    updateMotto(roundedProgress);

    if (Math.random() < 0.6) {
      spawnCreativeToken(roundedProgress);
    }
  }, intervalTime);

  function onLoadingComplete() {
    if (percentageEl) percentageEl.textContent = '100%';
    if (progressFill) progressFill.style.width = '100%';
    
    if (mottoEl) {
      mottoEl.classList.add('motto-fade-out');
      setTimeout(() => {
        mottoEl.textContent = "Creativity Activated. Welcome to The Transcends.";
        mottoEl.style.color = "#00f5d4";
        mottoEl.style.textShadow = "0 0 15px rgba(0, 245, 212, 0.6)";
        mottoEl.classList.remove('motto-fade-out');
        mottoEl.classList.add('motto-fade-in');
      }, 300);
    }

    setTimeout(() => {
      document.body.style.transition = 'opacity 0.8s ease';
      document.body.style.opacity = '0';
      
      setTimeout(() => {
        window.location.href = 'index.html'; 
      }, 800);
    }, 1500); 
  }
});