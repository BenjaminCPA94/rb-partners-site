// Meyvin — editorial design (see css/editorial.css).
// Sets the accent (cobalt) on the last words of the main titles.
// Mission pages get an animated scene in their hero, see js/scenes.js.
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('ed')) return;
  root.classList.remove('ed-wait');

  const lang = () => window.rbI18n?.getLang?.() || root.lang || 'fr';
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ---------- gold italic accent on the last words of key titles ----------
  const accent = (h) => {
    if (!h || h.querySelector('.ed-em')) return;
    const words = [...h.querySelectorAll('.imm-word')];
    if (words.length) {
      const n = words.length >= 5 ? 2 : 1;
      words.slice(-n).forEach((w) => w.classList.add('ed-em'));
      return;
    }
    const text = h.textContent.trim();
    if (!text || h.children.length) return;
    const parts = text.split(/\s+/);
    const n = parts.length >= 5 ? 2 : parts.length >= 2 ? 1 : 0;
    if (!n) return;
    const head = parts.slice(0, -n).join(' ');
    const tail = parts.slice(-n).join(' ');
    h.textContent = `${head} `;
    const em = document.createElement('span');
    em.className = 'ed-em';
    em.textContent = tail;
    h.appendChild(em);
  };
  // The accent changes how the title wraps, so it has to be in place before
  // the title is painted: it is re-applied in the same frame whenever another
  // script rewrites the title (language switch, word-by-word split).
  const watched = new WeakSet();
  const accents = () => {
    document.querySelectorAll('main :is(.seo-hero, .mission-hero, .hero, .expertise-banner, .article-banner) h1, main .expertise-cta h2').forEach((h) => {
      accent(h);
      if (watched.has(h)) return;
      watched.add(h);
      new MutationObserver(() => accent(h)).observe(h, { childList: true });
    });
  };

  const run = () => {
    accents();
  };

  run();
  // Titles are split into words by the immersive layer and re-rendered when
  // the language changes: re-apply once those passes are done.
  setTimeout(accents, 400);
  document.addEventListener('rb:content-upgraded', () => requestAnimationFrame(run));
  document.addEventListener('rb:langchange', () => setTimeout(run, 120));
})();
