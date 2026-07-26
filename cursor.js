const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing && !prefersReducedMotion) {
  const trailColors = ['#f472b6','#c084fc','#f9a8d4','#e879f9','#a78bfa'];
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, lastParticle = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
    const now = Date.now();
    if (now - lastParticle > 35) {
      lastParticle = now;
      const p = document.createElement('div');
      p.className = 'cursor-particle';
      const size = (Math.random() * 5 + 3) + 'px';
      p.style.cssText = `left:${mouseX}px;top:${mouseY}px;width:${size};height:${size};background:${trailColors[Math.floor(Math.random()*trailColors.length)]}`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 560);
    }
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();
}
