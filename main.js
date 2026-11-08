(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SITE = 'https://www.valentinamorana.com/';
  var GH_USER = 'valentinamorana';
  var GH_SKIP = [];

  var es = {
    skip_link: 'Saltar al contenido',
    nav_label: 'Principal',
    nav_work: 'Experiencia', nav_projects: 'Proyectos', nav_skills: 'Skills', nav_contact: 'Contacto',
    theme_label: 'Modo oscuro',
    lang_label: 'Idioma',
    cv_btn: 'Descargar CV',
    hero_status: 'Abierta a oportunidades',
    hero_cert: 'Recién certificada: NASSCO PACP · LACP · MACP v8',
    hero_role: 'AI Model Training: Data Quality &amp; Validation',
    hero_sub: 'Estudiante de Ingeniería en Sistemas (4.º año) que ya trabaja en la industria de la IA, liderando la calidad de datos para el entrenamiento de modelos de IA en ITpipes. Bilingüe español–inglés (C2).',
    hero_cta1: 'Contactame →',
    hero_cta2: 'Ver mi experiencia',
    photo_label: 'Valentina Morana, hacé clic para una sorpresa',
    now_building: 'Construyendo ahora · en vivo desde GitHub',
    now_commit_fallback: 'El último commit se actualiza acá automáticamente',
    now_learning: 'Aprendiendo ahora',
    now_learning_title: 'Ciberseguridad, Hacking Ético y Riesgo Digital',
    now_learning_detail: 'UAI Advance · microcredencial en curso',
    about_title: 'Ingeniera en proceso. <span class="accent">Analista en acción.</span>',
    about_text: 'Conecto los pipelines de datos con las operaciones del negocio y explico ideas complejas con claridad, en español y en inglés.',
    work_title: 'Dónde trabajé',
    d_itp: 'Sep 2025 – Actualidad',
    d_itp_r1: 'Abr 2026 – Actualidad',
    d_itp_r2: 'Sep 2025 – Abr 2026',
    d_pls: 'Jun 2024 – Ago 2025',
    d_pls_r1: 'Ene 2025 – Ago 2025',
    d_pls_r2: 'Jun 2024 – Ene 2025',
    d_bis: 'Dic 2023 – Jun 2024',
    job1_meta: '2 puestos · IA y calidad de datos',
    job1_r1_desc: 'Lidero el control de calidad del equipo: defino estándares y criterios de validación de datos para entrenar modelos de IA bajo NASSCO, hago auditorías de calidad e impulso la mejora continua.',
    promoted: 'Ascendida',
    job1_r2_desc: 'Validación y clasificación de inspecciones de infraestructura contra estándares NASSCO, detección de errores en datasets y video para el entrenamiento de IA, y reportes de consistencia y desempeño.',
    job2_meta: '2 puestos · logística en EE.UU.',
    job2_r1_title: 'Coordinadora de Logística',
    job2_r1_desc: 'Coordinación con clientes, transportistas y proveedores de EE.UU.; tarifas y liderazgo de equipos.',
    job2_r2_title: 'Analista de Operaciones de Datos, Track &amp; Trace',
    job2_r2_desc: 'Monitoreo y análisis de datos de transporte en tiempo real, detección de anomalías y demoras, y soporte a la validación de facturación.',
    job3_title: 'Analista Bilingüe, Seguros Médicos EE.UU.',
    job3_desc: 'Gestión y análisis de registros de pacientes para la toma de decisiones, 100% en inglés.',
    projects_title: 'Lo que construí',
    p1_desc: 'Sistema de escritorio para una empresa de alquiler de ropa por suscripción, del alta del cliente al despacho y la devolución.',
    p1_b1: 'Arquitectura en capas con 6 patrones de diseño',
    p1_b2: 'Datos encriptados, login seguro y bitácora de auditoría',
    p1_b3: 'Instalador de un clic que configura la base de datos',
    view_github: 'Ver en GitHub ↗',
    p2_title: 'Show de luces interactivo: IoT con sensor de sonido',
    p2_desc: 'Iluminación inteligente que reacciona al sonido en tiempo real, con una app para Android.',
    p3_title: 'Data Lake: estadísticas criminales en Argentina',
    p3_desc: 'Estadísticas criminales públicas estructuradas, modeladas y analizadas.',
    more_github: '…y muchos más en GitHub',
    skills_label: 'Habilidades y certificaciones',
    toolkit_title: 'Mis herramientas',
    sk_languages: 'Lenguajes',
    sk_frameworks: 'Frameworks y librerías',
    sk_data: 'Datos y BI',
    sk_automation: 'Automatización',
    sk_tools: 'Herramientas',
    certs_title: 'Siempre aprendiendo',
    cert_new: 'Nuevo',
    cert_google: 'Análisis de Datos · Foundations of Project Management',
    contact_title: '¡Trabajemos juntos!',
    contact_sub: 'Abierta a oportunidades full-time y freelance.'
  };

  var ui = {
    en: {
      theme_to_dark: 'Switch to dark mode', theme_to_light: 'Switch to light mode',
      updated: 'updated', locale: 'en'
    },
    es: {
      theme_to_dark: 'Cambiar a modo oscuro', theme_to_light: 'Cambiar a modo claro',
      updated: 'actualizado', locale: 'es'
    }
  };

  var en = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in en)) en[k] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    var k = el.getAttribute('data-i18n-aria');
    if (!(k in en)) en[k] = el.getAttribute('aria-label');
  });
  var dict = { en: en, es: es };

  var currentLang = root.lang === 'es' ? 'es' : 'en';

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function updateCv(lang) {
    var cv = document.getElementById('cv-btn');
    if (!cv) return;
    var file = lang === 'es' ? 'CV - Valentina Morana.pdf' : 'Resume - Valentina Morana.pdf';
    cv.href = 'CV/' + file;
    cv.setAttribute('download', file);
  }

  function updateUrl(lang) {
    try {
      var url = new URL(window.location.href);
      if (lang === 'es') url.searchParams.set('lang', 'es'); else url.searchParams.delete('lang');
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) {}
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = lang === 'es' ? SITE + '?lang=es' : SITE;
  }

  function setLang(lang, persist) {
    currentLang = lang;
    var d = dict[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (d[k] !== undefined) el.innerHTML = d[k];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      if (d[k] !== undefined) el.setAttribute('aria-label', d[k]);
    });
    root.lang = lang;
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-set-lang') === lang ? 'true' : 'false');
    });
    updateCv(lang);
    updateThemeLabel();
    renderNowBuilding();
    renderNowLearning();
    if (persist) { store('lang', lang); updateUrl(lang); }
    root.classList.remove('i18n-pending');
  }

  var themeBtn = document.getElementById('theme-btn');
  function updateThemeLabel() {
    if (!themeBtn) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    themeBtn.setAttribute('aria-label', dark ? ui[currentLang].theme_to_light : ui[currentLang].theme_to_dark);
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('theme', next);
      updateThemeLabel();
    });
  }

  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      var lang = b.getAttribute('data-set-lang');
      if (lang !== currentLang) setLang(lang, true);
    });
  });

  var nowData = null;
  function timeAgo(iso) {
    var diff = (new Date(iso).getTime() - Date.now()) / 1000;
    var units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
    var rtf = new Intl.RelativeTimeFormat(ui[currentLang].locale, { numeric: 'auto', style: 'short' });
    for (var i = 0; i < units.length; i++) {
      if (Math.abs(diff) >= units[i][1]) return rtf.format(Math.round(diff / units[i][1]), units[i][0]);
    }
    return rtf.format(Math.round(diff), 'second');
  }
  function renderNowBuilding() {
    if (!nowData) return;
    var link = document.getElementById('now-building');
    var repo = document.getElementById('now-repo');
    var commit = document.getElementById('now-commit');
    if (link) link.href = nowData.url;
    if (repo) repo.textContent = nowData.repo;
    if (commit) {
      commit.removeAttribute('data-i18n');
      commit.textContent = nowData.message || ui[currentLang].updated;
      commit.title = nowData.message || '';
    }
    var ago = document.getElementById('now-ago');
    if (ago) ago.textContent = timeAgo(nowData.date);
  }
  function loadNowBuilding() {
    var cacheKey = 'now-building-v2';
    try {
      var cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.at < 600000) { nowData = cached.data; renderNowBuilding(); return; }
    } catch (e) {}
    if (!window.fetch) return;
    var gh = { headers: { Accept: 'application/vnd.github+json' } };
    fetch('https://api.github.com/users/' + GH_USER + '/repos?sort=pushed&per_page=10&type=owner', gh)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (repos) {
        var candidates = repos.filter(function (x) { return !x.fork && !x.private && !x.archived && GH_SKIP.indexOf(x.name) === -1; }).slice(0, 3);
        if (!candidates.length) throw new Error('no repo');
        return Promise.all(candidates.map(function (repo) {
          return fetch('https://api.github.com/repos/' + GH_USER + '/' + repo.name + '/commits?per_page=1', gh)
            .then(function (r) { return r.ok ? r.json() : []; })
            .catch(function () { return []; })
            .then(function (commits) {
              var c = commits && commits[0];
              return {
                repo: repo.name,
                url: c ? c.html_url : repo.html_url,
                message: c ? String(c.commit.message).split('\n')[0].slice(0, 90) : '',
                date: c ? (c.commit.committer || c.commit.author).date : repo.pushed_at
              };
            });
        }));
      })
      .then(function (list) {
        return list.sort(function (a, b) { return new Date(b.date) - new Date(a.date); })[0];
      })
      .then(function (data) {
        nowData = data;
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data: data }));
          localStorage.setItem(cacheKey, JSON.stringify(data));
        } catch (e) {}
        renderNowBuilding();
      })
      .catch(function () {
        try {
          var last = JSON.parse(localStorage.getItem(cacheKey) || 'null');
          if (last) { nowData = last; renderNowBuilding(); }
        } catch (e) {}
      });
  }

  var learning = null;
  function renderNowLearning() {
    var data = learning && (learning[currentLang] || learning.en);
    if (!data) return;
    var title = document.getElementById('now-learn-title');
    var sub = document.getElementById('now-learn-sub');
    if (title && data.title) title.textContent = data.title;
    if (sub && data.sub) sub.textContent = data.sub;
  }
  function loadNowLearning() {
    if (!window.fetch) return;
    fetch('data/now.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (json) {
        if (!json || !json.learning) return;
        learning = json.learning;
        ['title', 'sub'].forEach(function (f) {
          var el = document.getElementById(f === 'title' ? 'now-learn-title' : 'now-learn-sub');
          if (el) el.removeAttribute('data-i18n');
        });
        renderNowLearning();
      })
      .catch(function () {});
  }

  var photoBtn = document.getElementById('photo-btn');
  var photoImg = document.getElementById('hero-photo-img');
  if (photoImg) {
    photoImg.addEventListener('error', function () {
      var pic = photoImg.closest('picture');
      if (pic) pic.remove();
      var fallback = document.createElement('span');
      fallback.className = 'photo-fallback';
      fallback.setAttribute('aria-hidden', 'true');
      fallback.textContent = 'VM';
      if (photoBtn) photoBtn.appendChild(fallback);
    });
  }
  if (photoBtn && !reduceMotion) {
    photoBtn.addEventListener('click', function () {
      var heartSvg = '<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><path fill="currentColor" d="M12 21s-7.5-4.6-10-9.3C.4 8.6 2.1 4.5 6 4.1c2.2-.2 4 1 6 3.2 2-2.2 3.8-3.4 6-3.2 3.9.4 5.6 4.5 4 7.6C19.5 16.4 12 21 12 21z"/></svg>';
      var tones = ['var(--accent)', 'var(--accent)', 'var(--pink-ink)', 'var(--star-lilac)'];
      for (var i = 0; i < 28; i++) {
        setTimeout(function () {
          var h = document.createElement('span');
          var dur = Math.random() * 1.2 + 2.2;
          var size = Math.random() * 18 + 14;
          h.className = 'heart-rain';
          h.innerHTML = heartSvg;
          h.style.color = tones[Math.floor(Math.random() * tones.length)];
          h.style.width = size + 'px';
          h.style.height = size + 'px';
          h.style.left = (Math.random() * 92 + 4) + 'vw';
          h.style.animationDuration = dur + 's';
          h.addEventListener('animationend', function () { h.remove(); });
          document.body.appendChild(h);
        }, i * 55);
      }
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    root.classList.add('reveal-off');
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      var shown = entries.filter(function (e) { return e.isIntersecting; });
      shown.forEach(function (entry, i) {
        var el = entry.target;
        el.style.transitionDelay = Math.min(i * 90, 360) + 'ms';
        el.classList.add('is-visible');
        revealObs.unobserve(el);
        el.addEventListener('transitionend', function done(ev) {
          if (ev.propertyName !== 'opacity') return;
          el.classList.remove('reveal', 'is-visible');
          el.style.transitionDelay = '';
          el.removeEventListener('transitionend', done);
        });
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var spySections = spyLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  var shapes = Array.prototype.slice.call(document.querySelectorAll('.shape[data-depth]'));
  var header = document.querySelector('.site-header');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    var mid = y + window.innerHeight * 0.4;
    if (header) header.classList.toggle('is-stuck', y > 12);
    var atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 40;
    var active = null;
    spySections.forEach(function (s) { if (s.offsetTop <= mid) active = s.id; });
    if (atBottom && spySections.length) active = spySections[spySections.length - 1].id;
    spyLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + active); });
    if (!reduceMotion) {
      shapes.forEach(function (s) {
        s.style.transform = 'translate3d(0,' + (y * parseFloat(s.getAttribute('data-depth'))).toFixed(1) + 'px,0)';
      });
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.chips-lg span').forEach(function (chip) {
      chip.addEventListener('mousemove', function (e) {
        var r = chip.getBoundingClientRect();
        chip.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5) * 6 + 'px');
        chip.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5) * 4 + 'px');
      });
      chip.addEventListener('mouseleave', function () {
        chip.style.removeProperty('--mx');
        chip.style.removeProperty('--my');
      });
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  setLang(currentLang, false);
  loadNowBuilding();
  loadNowLearning();
})();
