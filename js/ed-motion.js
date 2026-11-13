// Meyvin — motion layer of the new design (preview only): page-to-page
// curtain, trailing cursor ring, marquees that react to scroll speed.
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('ed')) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---------- curtain: lifts when the page is ready, drops before leaving ----------
  const lift = () => root.classList.remove('ed-wait', 'ed-leave');
  if (root.hasAttribute('data-ed-home')) requestAnimationFrame(() => requestAnimationFrame(lift));
  addEventListener('pageshow', (e) => { if (e.persisted) lift(); });
  if (!reduced) {
    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download') || a.hasAttribute('data-booking')) return;
      let url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
      // same page (anchor or language toggle handled in place): nothing to cover
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      root.classList.add('ed-leave');
      setTimeout(() => { location.href = url.href; }, 420);
    });
  }

  // ---------- cursor ring ----------
  if (fine && !reduced) {
    const style = document.createElement('style');
    style.textContent = `.ed-cursor{position:fixed;left:0;top:0;width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;border:1px solid rgba(198,161,91,.9);pointer-events:none;z-index:99998;opacity:0;transition:opacity .3s ease,width .3s cubic-bezier(.16,1,.3,1),height .3s cubic-bezier(.16,1,.3,1),margin .3s cubic-bezier(.16,1,.3,1),background .3s ease;will-change:transform}
.ed-cursor.is-in{opacity:1}
.ed-cursor.is-hot{width:64px;height:64px;margin:-32px 0 0 -32px;background:rgba(198,161,91,.14)}
.ed-cursor.is-down{width:26px;height:26px;margin:-13px 0 0 -13px}`;
    document.head.appendChild(style);
    const ring = document.createElement('div');
    ring.className = 'ed-cursor';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0, seen = false;
    const HOT = 'a, button, summary, [role="button"], label, select, .tag, .coin-wrap';
    const tick = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      ring.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    addEventListener('pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (!seen) { seen = true; cx = x; cy = y; ring.classList.add('is-in'); }
      ring.classList.toggle('is-hot', !!e.target.closest?.(HOT));
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    addEventListener('pointerdown', () => ring.classList.add('is-down'));
    addEventListener('pointerup', () => ring.classList.remove('is-down'));
    document.addEventListener('pointerleave', () => { ring.classList.remove('is-in'); seen = false; });
  }

  // ---------- marquees speed up and lean with the scroll ----------
  if (!reduced) {
    let last = scrollY, vel = 0, running = false;
    const tracks = () => [...document.querySelectorAll('.band__track, .imm-marquee__track')];
    const loop = () => {
      const d = scrollY - last; last = scrollY;
      vel += (d - vel) * 0.14;
      const speed = Math.min(7, Math.abs(vel) * 0.16);
      const lean = Math.max(-10, Math.min(10, vel * 0.28));
      tracks().forEach((t) => {
        const anim = t.getAnimations?.()[0];
        if (anim) anim.playbackRate = (vel < -0.6 ? -1 : 1) * (1 + speed);
        t.style.setProperty('--lean', `${lean.toFixed(2)}deg`);
      });
      if (Math.abs(vel) > 0.05) requestAnimationFrame(loop);
      else { running = false; tracks().forEach((t) => { const a = t.getAnimations?.()[0]; if (a) a.playbackRate = 1; t.style.setProperty('--lean', '0deg'); }); }
    };
    addEventListener('scroll', () => { if (!running) { running = true; last = scrollY; requestAnimationFrame(loop); } }, { passive: true });
  }
})();
