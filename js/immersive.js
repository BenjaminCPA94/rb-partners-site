// Meyvin — immersive scroll-storytelling layer (test branch).
// Adds: a top scroll-progress bar, subtle scroll-linked parallax on the
// decorative hero/network visuals, and a right-edge section rail-nav on
// pages with several landmark sections. The existing .reveal/.is-visible
// system in main.js is left untouched — css/immersive.css only restyles it.
(() => {
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // --- Scroll progress bar ---------------------------------------------
  const bar = document.createElement('div');
  bar.className = 'immersive-progress';
  document.body.appendChild(bar);

  let ticking = false;
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
  };
  updateProgress();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  if (prefersReducedMotion) return; // Progress bar is informational, not motion — keep it. Skip parallax + rail below is unnecessary; rail is navigation, also kept. Only parallax is motion.

  // --- Parallax on decorative hero/network visuals ----------------------
  const PARALLAX_SELECTORS = ['.v6-hero-visual', '.intl-v8-visual'];
  const registerParallax = () => {
    PARALLAX_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.dataset.immersiveParallax) return;
        el.dataset.immersiveParallax = '0.12';
      });
    });
  };
  registerParallax();
  document.addEventListener('rb:content-upgraded', registerParallax);

  let parallaxTicking = false;
  const applyParallax = () => {
    document.querySelectorAll('[data-immersive-parallax]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distance = rect.top + rect.height / 2 - viewportCenter;
      const factor = parseFloat(el.dataset.immersiveParallax) || 0.12;
      el.style.transform = `translateY(${(-distance * factor).toFixed(1)}px)`;
    });
    parallaxTicking = false;
  };
  const onParallaxScroll = () => {
    if (!parallaxTicking) {
      parallaxTicking = true;
      requestAnimationFrame(applyParallax);
    }
  };
  window.addEventListener('scroll', onParallaxScroll, { passive: true });
  window.addEventListener('resize', onParallaxScroll);
  document.addEventListener('rb:content-upgraded', () => requestAnimationFrame(applyParallax));

  // --- Section rail-nav ---------------------------------------------------
  const buildRail = () => {
    if (document.querySelector('.immersive-rail')) return; // already built
    const sections = [...document.querySelectorAll('main > section')]
      .filter((s) => s.offsetHeight > 200);
    if (sections.length < 3 || sections.length > 12) return; // only worth it mid-length pages

    const rail = document.createElement('nav');
    rail.className = 'immersive-rail';
    rail.setAttribute('aria-label', 'Section navigation');

    const dots = sections.map((section) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'immersive-rail__dot';
      const heading = section.querySelector('h1, h2');
      dot.dataset.label = (heading ? heading.textContent.trim() : section.id || '').slice(0, 60) || ' ';
      dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      rail.appendChild(dot);
      return { section, dot };
    });

    document.body.appendChild(rail);

    const railObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const match = dots.find((d) => d.section === entry.target);
        if (!match) return;
        if (entry.isIntersecting) {
          dots.forEach((d) => d.dot.classList.remove('is-active'));
          match.dot.classList.add('is-active');
        }
      });
    }, { threshold: 0.5 });

    dots.forEach((d) => railObserver.observe(d.section));
  };

  buildRail();
  document.addEventListener('rb:content-upgraded', () => requestAnimationFrame(buildRail));
})();
