(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var sparkle = document.getElementById('cursor-sparkle');
  if (!sparkle || reduceMotion || !finePointer) return;

  var root = document.documentElement;
  root.classList.add('has-custom-cursor', 'cursor-hidden');

  var x = 0, y = 0, lastX = 0, lastY = 0, lastTrail = 0, frame = 0;
  var trailColors = ['var(--accent)', 'var(--star-lilac)', '#F3A6C8', 'var(--btn-line)'];
  var interactive = 'a, button, [role="button"], input, textarea, select, label';

  function render() {
    frame = 0;
    sparkle.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
  }

  function spawnTrail(now) {
    var dx = x - lastX, dy = y - lastY;
    if (now - lastTrail < 28 || dx * dx + dy * dy < 64) return;
    lastTrail = now; lastX = x; lastY = y;
    var s = document.createElement('span');
    var size = 6 + Math.random() * 6;
    s.className = 'sparkle-trail';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.color = trailColors[Math.floor(Math.random() * trailColors.length)];
    s.style.setProperty('--x', (x + (Math.random() * 8 - 4)) + 'px');
    s.style.setProperty('--y', (y + (Math.random() * 8 - 4)) + 'px');
    s.addEventListener('animationend', function () { s.remove(); });
    document.body.appendChild(s);
  }

  document.addEventListener('mousemove', function (e) {
    x = e.clientX; y = e.clientY;
    root.classList.remove('cursor-hidden');
    root.classList.toggle('cursor-hover', !!(e.target.closest && e.target.closest(interactive)));
    if (!frame) frame = requestAnimationFrame(render);
    spawnTrail(performance.now());
  }, { passive: true });

  document.addEventListener('mousedown', function () { root.classList.add('cursor-press'); });
  document.addEventListener('mouseup', function () { root.classList.remove('cursor-press'); });
  document.addEventListener('mouseleave', function () { root.classList.add('cursor-hidden'); });
  window.addEventListener('blur', function () { root.classList.add('cursor-hidden'); });
})();
