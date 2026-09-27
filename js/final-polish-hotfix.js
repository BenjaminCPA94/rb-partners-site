(() => {
  function setCounterFallbacks() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = Number(el.dataset.count || 0);
      const decimals = Number(el.dataset.decimals || 0);
      const lang = window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';
      el.textContent = decimals
        ? target.toFixed(decimals).replace('.', lang === 'fr' ? ',' : '.')
        : String(target);
    });
  }

  setCounterFallbacks();
  requestAnimationFrame(setCounterFallbacks);
  setTimeout(setCounterFallbacks, 1200);
  document.addEventListener('rb:langchange', () => setTimeout(setCounterFallbacks, 40));
})();
