// Meyvin — editorial design (see css/editorial.css).
// Adds the gold italic accent at the end of the main
// titles, and the Meyvin medallion with tilted tags in the page heroes
// (mission pages get an animated scene instead, see js/scenes.js).
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
  const accents = () => {
    document.querySelectorAll('main :is(.seo-hero, .mission-hero, .hero, .expertise-banner, .article-banner) h1, main .expertise-cta h2').forEach(accent);
  };

  // ---------- medallion + tags in the heroes ----------
  const GENERIC = {
    fr: ['Comptabilité', 'Fiscalité', 'Paie & RH'],
    en: ['Accounting', 'Tax', 'Payroll'],
  };
  const tagsFor = () => {
    const picked = [...document.querySelectorAll('main section:not(.seo-hero):not(.mission-hero) h3')]
      .map((h) => h.textContent.trim())
      .filter((t) => t.length > 2 && t.length <= 20)
      .slice(0, 3);
    return picked.length === 3 ? picked : GENERIC[lang()] || GENERIC.fr;
  };
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const medallion = () => {
    document.querySelectorAll('main > .seo-hero:not(.international-hero), main#top > .hero').forEach((hero) => {
      hero.querySelector('.ed-coin')?.remove();
      if (!hero.matches('.hero')) hero.classList.add('ed-has-coin');
      const tags = tagsFor();
      const coin = document.createElement('div');
      coin.className = 'ed-coin';
      coin.setAttribute('aria-hidden', 'true');
      coin.innerHTML = `<div class="ed-coin__in"><div class="ed-coin__face"><b>M</b><small>MEYVIN · FRANCE</small></div></div>
        <span class="ed-coin__chip" style="left:-120px;top:-6px;--r:-6deg;--bob:0s"><i>01</i>${esc(tags[0])}</span>
        <span class="ed-coin__chip" style="left:calc(100% - 40px);top:44%;--r:5deg;--bob:-2s"><i>02</i>${esc(tags[1])}</span>
        <span class="ed-coin__chip" style="left:-90px;bottom:-14px;--r:4deg;--bob:-4s"><i>03</i>${esc(tags[2])}</span>`;
      hero.appendChild(coin);
      if (!fine || reduced || hero.dataset.edTilt) return;
      hero.dataset.edTilt = '1';
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        const inner = hero.querySelector('.ed-coin__in');
        inner?.style.setProperty('--ry', `${(-18 + x * 40).toFixed(1)}deg`);
        inner?.style.setProperty('--rx', `${(8 - y * 24).toFixed(1)}deg`);
      });
      hero.addEventListener('pointerleave', () => {
        const inner = hero.querySelector('.ed-coin__in');
        inner?.style.removeProperty('--ry');
        inner?.style.removeProperty('--rx');
      });
    });
  };

  const run = () => {
    accents();
    medallion();
  };

  run();
  // Titles are split into words by the immersive layer and re-rendered when
  // the language changes: re-apply once those passes are done.
  setTimeout(accents, 400);
  document.addEventListener('rb:content-upgraded', () => requestAnimationFrame(run));
  document.addEventListener('rb:langchange', () => setTimeout(run, 120));
})();
