// Meyvin — immersive layer.
// Scroll progress + back-to-top ring, ambient canvas behind dark sections,
// word-by-word hero headlines, wipe-in section titles, a marquee under the
// homepage hero, reactive cards / magnetic buttons, parallax on decorative
// visuals and a section rail-nav. The .reveal system stays in main.js.
(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
  const lang = () => (document.documentElement.lang || 'fr').slice(0, 2);
  const onContent = (fn) => {
    document.addEventListener('rb:content-upgraded', () => requestAnimationFrame(fn));
    document.addEventListener('rb:langchange', () => setTimeout(fn, 60));
  };

  // ---------------------------------------------------------------------
  // Scroll progress bar + back-to-top ring
  // ---------------------------------------------------------------------
  const bar = document.createElement('div');
  bar.className = 'immersive-progress';
  document.body.appendChild(bar);

  const topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'imm-top';
  const labelTop = () => topBtn.setAttribute('aria-label', lang() === 'en' ? 'Back to top' : 'Retour en haut');
  labelTop();
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  document.body.appendChild(topBtn);
  document.addEventListener('rb:langchange', () => setTimeout(labelTop, 60));

  let progressTick = false;
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
    bar.style.width = `${pct}%`;
    topBtn.style.setProperty('--imm-p', pct.toFixed(1));
    topBtn.classList.toggle('is-shown', window.scrollY > 700);
    progressTick = false;
  };
  const onScrollProgress = () => {
    if (!progressTick) { progressTick = true; requestAnimationFrame(updateProgress); }
  };
  updateProgress();
  window.addEventListener('scroll', onScrollProgress, { passive: true });
  window.addEventListener('resize', onScrollProgress);

  // ---------------------------------------------------------------------
  // Ambient canvas: drifting light, a gold constellation, a glow that
  // follows the pointer. One canvas per dark section, animated only while
  // that section is on screen.
  // ---------------------------------------------------------------------
  const DARK_SEL = 'main .hero, main .seo-hero, main .mission-hero, main > .section--navy, main > .expertise-cta, main > .mission-lanes';
  const fields = [];
  let looping = false;

  const sizeField = (f) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = f.el.offsetWidth;
    const h = f.el.offsetHeight;
    if (!w || !h) return;
    f.w = w; f.h = h;
    f.c.width = Math.round(w * dpr);
    f.c.height = Math.round(h * dpr);
    f.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const small = w < 700;
    const count = Math.max(small ? 8 : 14, Math.min(small ? 26 : 64, Math.round((w * h) / 26000)));
    while (f.pts.length < count) {
      f.pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 0.8 + Math.random() * 1.6,
      });
    }
    f.pts.length = count;
    if (reduced) drawField(f, 0, true);
  };

  const blob = (ctx, x, y, radius, rgb, alpha) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, `rgba(${rgb},${alpha})`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  function drawField(f, now, still) {
    const { ctx, w, h, pts } = f;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    const t = now / 1000 + f.seed;
    const big = Math.max(w, h);
    blob(ctx, w * (0.24 + 0.18 * Math.sin(t * 0.11)), h * (0.36 + 0.26 * Math.cos(t * 0.09)), big * 0.4, '64,116,214', 0.16);
    blob(ctx, w * (0.78 + 0.14 * Math.cos(t * 0.08)), h * (0.62 + 0.26 * Math.sin(t * 0.12)), big * 0.34, '198,161,91', 0.11);

    const hasPointer = f.mx > -999;
    if (hasPointer) {
      f.gx += (f.mx - f.gx) * 0.08;
      f.gy += (f.my - f.gy) * 0.08;
      blob(ctx, f.gx, f.gy, 260, '216,184,118', 0.14);
    }

    const linkDist = 132;
    for (let i = 0; i < pts.length; i += 1) {
      const p = pts[i];
      if (!still) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
      }
      for (let j = i + 1; j < pts.length; j += 1) {
        const q = pts[j];
        const dx = p.x - q.x; const dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < linkDist * linkDist) {
          const a = (1 - Math.sqrt(d2) / linkDist) * 0.2;
          ctx.strokeStyle = `rgba(216,184,118,${a.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      if (hasPointer) {
        const dx = p.x - f.gx; const dy = p.y - f.gy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 190) {
          ctx.strokeStyle = `rgba(241,228,200,${((1 - d / 190) * 0.38).toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(f.gx, f.gy); ctx.stroke();
        }
      }
      ctx.fillStyle = 'rgba(216,184,118,0.62)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  const loop = (now) => {
    let any = false;
    for (const f of fields) {
      if (f.active && f.c.isConnected) { any = true; drawField(f, now, false); }
    }
    looping = any;
    if (any) requestAnimationFrame(loop);
  };
  const kick = () => { if (!looping && !reduced) { looping = true; requestAnimationFrame(loop); } };

  const fieldIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const f = fields.find((x) => x.el === entry.target);
      if (f) f.active = entry.isIntersecting;
    });
    kick();
  }, { rootMargin: '80px 0px' });
  const fieldRO = typeof ResizeObserver === 'function'
    ? new ResizeObserver((entries) => entries.forEach((entry) => {
      const f = fields.find((x) => x.el === entry.target);
      if (f && (f.w !== f.el.offsetWidth || f.h !== f.el.offsetHeight)) sizeField(f);
    }))
    : null;

  const scanFields = () => {
    document.querySelectorAll(DARK_SEL).forEach((el) => {
      if (el.offsetHeight < 120) return;
      let f = fields.find((x) => x.el === el);
      if (f && f.c.isConnected) return;
      const c = document.createElement('canvas');
      c.className = 'imm-canvas';
      c.setAttribute('aria-hidden', 'true');
      el.classList.add('imm-has-canvas');
      // Homepage hero paints its gradient on a positioned .hero__bg layer:
      // slot the canvas right above it, still under the copy.
      const bg = el.querySelector(':scope > .hero__bg');
      if (bg) { c.classList.add('imm-canvas--over'); bg.after(c); } else el.appendChild(c);
      if (f) {
        f.c = c; f.ctx = c.getContext('2d');
      } else {
        f = { el, c, ctx: c.getContext('2d'), pts: [], w: 0, h: 0, mx: -9999, my: -9999, gx: 0, gy: 0, active: false, seed: Math.random() * 500 };
        fields.push(f);
        fieldIO.observe(el);
        fieldRO?.observe(el);
        if (finePointer && !reduced) {
          el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            const first = f.mx < -999;
            f.mx = e.clientX - r.left; f.my = e.clientY - r.top;
            if (first) { f.gx = f.mx; f.gy = f.my; }
          }, { passive: true });
          el.addEventListener('pointerleave', () => { f.mx = -9999; f.my = -9999; });
        }
      }
      sizeField(f);
    });
  };
  scanFields();
  onContent(scanFields);

  // ---------------------------------------------------------------------
  // Section rail-nav
  // ---------------------------------------------------------------------
  const buildRail = () => {
    if (document.querySelector('.immersive-rail')) return;
    const sections = [...document.querySelectorAll('main > section')].filter((s) => s.offsetHeight > 200);
    if (sections.length < 3 || sections.length > 12) return;

    const rail = document.createElement('nav');
    rail.className = 'immersive-rail';
    rail.setAttribute('aria-label', 'Section navigation');
    const dots = sections.map((section) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'immersive-rail__dot';
      const refresh = () => {
        const heading = section.querySelector('h1, h2');
        dot.dataset.label = (heading ? heading.textContent.trim() : section.id || '').slice(0, 60) || ' ';
        dot.setAttribute('aria-label', dot.dataset.label);
      };
      refresh();
      dot.addEventListener('pointerenter', refresh);
      dot.addEventListener('click', () => section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }));
      rail.appendChild(dot);
      return { section, dot };
    });
    document.body.appendChild(rail);

    const railIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const match = dots.find((d) => d.section === entry.target);
        if (!match) return;
        dots.forEach((d) => d.dot.classList.remove('is-active'));
        match.dot.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    dots.forEach((d) => railIO.observe(d.section));
  };
  buildRail();
  onContent(buildRail);

  // ---------------------------------------------------------------------
  // Marquee under the homepage hero
  // ---------------------------------------------------------------------
  const MARQUEE = {
    fr: ['Comptabilité', 'Fiscalité', 'Paie & social', 'Juridique', 'Création d’entreprise', 'Implantation en France', 'Reporting FR / EN', 'Facturation électronique', 'Conseil au dirigeant', 'DAF externalisé'],
    en: ['Accounting', 'French tax', 'Payroll & HR', 'Legal', 'Company formation', 'France market entry', 'FR / EN reporting', 'E-invoicing', 'Owner-manager advisory', 'Outsourced CFO'],
  };
  const buildMarquee = () => {
    const hero = document.querySelector('main > .hero');
    if (!hero) return;
    let band = document.querySelector('.imm-marquee');
    if (!band) {
      band = document.createElement('div');
      band.className = 'imm-marquee';
      band.setAttribute('aria-hidden', 'true');
      band.innerHTML = '<div class="imm-marquee__track"></div>';
    }
    const l = lang() === 'en' ? 'en' : 'fr';
    if (band.dataset.lang !== l) {
      band.dataset.lang = l;
      const items = MARQUEE[l].map((x) => `<span class="imm-marquee__item">${x.replace(/&/g, '&amp;')}</span>`).join('');
      band.firstElementChild.innerHTML = items + items;
    }
    if (hero.nextElementSibling !== band) hero.after(band);
  };
  buildMarquee();
  onContent(buildMarquee);

  if (reduced) return; // Everything below is movement.

  // ---------------------------------------------------------------------
  // Hero headline: word-by-word rise
  // ---------------------------------------------------------------------
  const splitHeadline = (h) => {
    if (h.querySelector('.imm-word')) return;
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          // Split on plain spaces only (a non-breaking space keeps its two
          // words glued) and after hyphens, so long compounds can still wrap.
          child.textContent.split(/([ \t\n\r]+)/).flatMap((tok) => (/^[ \t\n\r]+$/.test(tok) ? [tok] : tok.split(/(?<=[-‑])(?=\S)/))).forEach((part) => {
            if (!part) return;
            if (/^[ \t\n\r]+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const outer = document.createElement('span');
            outer.className = 'imm-word';
            const inner = document.createElement('span');
            inner.className = 'imm-word__in';
            inner.style.setProperty('--i', i);
            inner.textContent = part;
            i += 1;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(h);
    h.classList.remove('imm-split--in');
    requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add('imm-split--in')));
  };
  const scanHeadlines = () => {
    document.querySelectorAll('main .hero h1, main .seo-hero h1, main .mission-hero h1').forEach((h) => {
      splitHeadline(h);
      if (h.dataset.immWatch) return;
      h.dataset.immWatch = '1';
      new MutationObserver(() => { if (!h.querySelector('.imm-word')) splitHeadline(h); }).observe(h, { childList: true });
    });
  };
  scanHeadlines();
  onContent(scanHeadlines);

  // ---------------------------------------------------------------------
  // Section heads below the fold: eyebrow tightens, title wipes in
  // ---------------------------------------------------------------------
  document.documentElement.classList.add('imm-ready');
  const headIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('imm-in');
      headIO.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  const scanHeads = () => {
    document.querySelectorAll('.section__head, .mission-v7-head, .rb-related__head').forEach((head) => {
      if (head.dataset.immHead) return;
      head.dataset.immHead = '1';
      if (head.closest('.hero, .seo-hero, .mission-hero')) return;
      if (head.getBoundingClientRect().top < window.innerHeight) return; // already on screen: leave it alone
      head.classList.add('imm-head');
      headIO.observe(head);
    });
  };
  scanHeads();
  onContent(scanHeads);

  // ---------------------------------------------------------------------
  // Parallax on decorative visuals (never on text or controls)
  // ---------------------------------------------------------------------
  const registerParallax = () => {
    document.querySelectorAll('.v6-hero-visual, .intl-v8-visual, .v8-france-bridge').forEach((el) => {
      if (el.dataset.immersiveParallax) return;
      el.dataset.immersiveParallax = '0.1';
      const top = el.getBoundingClientRect().top + window.scrollY;
      el.dataset.immersiveAbove = top < window.innerHeight ? '1' : '';
    });
  };
  let parallaxTick = false;
  const applyParallax = () => {
    const vh = window.innerHeight;
    document.querySelectorAll('[data-immersive-parallax]').forEach((el) => {
      const factor = parseFloat(el.dataset.immersiveParallax) || 0.1;
      let shift;
      if (el.dataset.immersiveAbove) {
        shift = Math.min(window.scrollY, vh) * factor; // at rest when the page is at the top
      } else {
        const rect = el.getBoundingClientRect();
        const distance = rect.top + rect.height / 2 - vh / 2;
        shift = Math.max(-60, Math.min(60, -distance * factor));
      }
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    });
    parallaxTick = false;
  };
  const onParallax = () => {
    if (!parallaxTick) { parallaxTick = true; requestAnimationFrame(applyParallax); }
  };
  registerParallax();
  applyParallax();
  window.addEventListener('scroll', onParallax, { passive: true });
  window.addEventListener('resize', onParallax);
  onContent(() => { registerParallax(); applyParallax(); });

  // ---------------------------------------------------------------------
  // Reactive cards and magnetic primary buttons (mouse only)
  // ---------------------------------------------------------------------
  if (!finePointer) return;
  const TILT_SEL = '.card, .v2-founder, .v8-path, .seo-point, .seo-depth-card, .seo-output-card, .rb-related__card, .v5-modern-card, .v6-proof-card, .v4-process-step, .mission-lane-grid article';
  let tilted = null;
  let magnet = null;
  const releaseTilt = (card) => {
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
    setTimeout(() => { if (tilted !== card) card.classList.remove('imm-tilt'); }, 360);
  };
  const releaseMagnet = (btn) => {
    if (!btn) return;
    btn.style.transform = '';
    setTimeout(() => { if (magnet !== btn) btn.classList.remove('imm-magnet'); }, 300);
  };
  document.addEventListener('pointermove', (e) => {
    const target = e.target instanceof Element ? e.target : null;
    const card = target ? target.closest(TILT_SEL) : null;
    if (card !== tilted) {
      releaseTilt(tilted);
      tilted = card;
      if (card) card.classList.add('imm-tilt');
    }
    if (card) {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 5).toFixed(2)}deg) rotateY(${((px - 0.5) * 5).toFixed(2)}deg) translateY(-4px)`;
      card.style.boxShadow = `${((0.5 - px) * 26).toFixed(1)}px ${((0.5 - py) * 26 + 20).toFixed(1)}px 44px rgba(8,20,38,0.16)`;
    }

    const btn = target ? target.closest('.btn--primary') : null;
    if (btn !== magnet) {
      releaseMagnet(magnet);
      magnet = btn;
      if (btn) btn.classList.add('imm-magnet');
    }
    if (btn) {
      const r = btn.getBoundingClientRect();
      const dx = Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * 0.22));
      const dy = Math.max(-6, Math.min(6, (e.clientY - (r.top + r.height / 2)) * 0.3));
      btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    }
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => {
    releaseTilt(tilted); tilted = null;
    releaseMagnet(magnet); magnet = null;
  });
})();
