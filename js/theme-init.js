(function () {
  var theme = null;
  try { theme = localStorage.getItem('theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.add('js');

  var lang = null;
  try {
    var param = new URLSearchParams(window.location.search).get('lang');
    if (param === 'en' || param === 'es') lang = param;
    if (!lang) {
      var saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'es') lang = saved;
    }
  } catch (e) {}
  if (!lang) {
    var langs = navigator.languages || [navigator.language || 'en'];
    lang = String(langs[0] || 'en').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }
  if (!document.documentElement.hasAttribute('data-i18n-page')) return;
  document.documentElement.lang = lang;
  if (lang === 'es' && document.documentElement.hasAttribute('data-i18n-page')) {
    document.documentElement.classList.add('i18n-pending');
    setTimeout(function () { document.documentElement.classList.remove('i18n-pending'); }, 1500);
  }
})();
