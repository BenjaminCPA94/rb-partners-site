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

  function polishDirectCard() {
    const lang = window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';
    const card = document.querySelectorAll('.v5-modern-card')[3];
    const p = card?.querySelector('p');
    if (p) p.textContent = lang === 'en'
      ? 'Direct contact with people who know the file and the decisions that matter.'
      : 'Un contact direct avec des interlocuteurs qui connaissent le dossier et les décisions à prendre.';
  }

  function applyHotfixes() {
    setCounterFallbacks();
    polishDirectCard();
  }

  applyHotfixes();
  requestAnimationFrame(applyHotfixes);
  setTimeout(applyHotfixes, 1200);
  document.addEventListener('rb:langchange', () => setTimeout(applyHotfixes, 40));
})();
