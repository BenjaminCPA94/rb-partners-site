// Animated scene on the mission pages: draws itself as the block scrolls into view.
// (Moved from the home page, where the same scenes used to be driven by a pinned scroll story.)
(() => {
  const boards = [...document.querySelectorAll('.sc-board')];
  if (!boards.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  boards.forEach((board) => {
    const scene = board.querySelector('.scene');
    if (!scene) return;
    // elements that travel along a path, and clip rectangles that widen, with the scene progress
    const followers = [...board.querySelectorAll('[data-follow]')].map((el) => {
      const path = board.querySelector(el.dataset.follow);
      return { el, path, len: path.getTotalLength(), a: +el.dataset.a, b: +el.dataset.b };
    });
    const clips = [...board.querySelectorAll('[data-clip]')].map((el) => ({ el, w: +el.dataset.clip, a: +el.dataset.a, b: +el.dataset.b }));

    let q = -1, frame = 0, visible = false;
    const paint = (v) => {
      if (Math.abs(v - q) < 0.0005) return;
      q = v;
      scene.style.setProperty('--q', v.toFixed(4));
      followers.forEach((f) => {
        const t = clamp01((v - f.a) / (f.b - f.a));
        const pt = f.path.getPointAtLength(f.len * t);
        f.el.setAttribute('cx', pt.x.toFixed(1)); f.el.setAttribute('cy', pt.y.toFixed(1));
        f.el.style.opacity = t > 0.01 ? 1 : 0;
      });
      clips.forEach((c) => c.el.setAttribute('width', (c.w * clamp01((v - c.a) / (c.b - c.a))).toFixed(1)));
    };
    // progress: 0 when the top of the board reaches 90% of the screen height, 1 a little after it is centred
    const progress = () => {
      const r = board.getBoundingClientRect();
      return clamp01((innerHeight * 0.9 - r.top) / (innerHeight * 0.4 + r.height * 0.7));
    };
    if (reduced) { paint(1); return; }
    const tick = () => { frame = 0; if (visible) paint(progress()); };
    const kick = () => { if (!frame) frame = requestAnimationFrame(tick); };
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) kick(); }, { rootMargin: '10% 0px 10% 0px' }).observe(board);
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
    paint(progress());
  });
})();
