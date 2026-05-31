/* =============================================
   MONTHSARY STUDIO — app.js  (minimal, static)
   ============================================= */

/* ── Canvas particle system ── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeDot() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  0.5 + Math.random() * 1.5,
      // blue or pink hue
      hue: Math.random() > 0.6 ? 220 : 340,
      alpha: 0,
      targetAlpha: 0.15 + Math.random() * 0.45,
      speed: 0.002 + Math.random() * 0.008,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.08 - Math.random() * 0.12,
    };
  }

  function setup() {
    dots = Array.from({ length: 110 }, makeDot);
    dots.forEach(d => { d.alpha = d.targetAlpha; });
  }

  function draw(ts) {
    ctx.clearRect(0, 0, W, H);
    const t = ts * 0.001;

    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      d.alpha = d.targetAlpha * (0.5 + 0.5 * Math.sin(t * d.speed * 10 + d.phase));

      if (d.y < -10 || d.x < -10 || d.x > W + 10) {
        Object.assign(d, makeDot(), { y: H + 5, alpha: 0 });
      }

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${d.hue}, 85%, 75%, ${d.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  setup();
  requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
})();


/* ── Intro → Main reveal ── */
function revealMain() {
  const intro = document.getElementById('intro');
  const main  = document.getElementById('main');

  // 1. Un-hide the main page (still opacity:0 via CSS)
  main.classList.remove('hidden');

  // Small tick to allow the display change to register before transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // 2. Fade intro out + slight scale up
      intro.classList.add('leaving');

      // 3. Fade main in
      main.classList.add('visible');

      // 4. Remove intro from DOM after animation ends
      intro.addEventListener('transitionend', () => {
        intro.remove();
      }, { once: true });
    });
  });
}
