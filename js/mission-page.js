(() => {
  const cfg = window.RB_MISSION_PAGE;
  if (!cfg) return;

  const currentLang = () => window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';
  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value !== undefined) el.textContent = value;
  };

  function render(lang) {
    const d = cfg[lang] || cfg.fr;
    if (!d) return;
    document.documentElement.lang = lang;

    if (d.metaTitle) document.title = d.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && d.metaDescription) meta.content = d.metaDescription;

    document.querySelectorAll('[data-copy]').forEach(el => {
      const key = el.getAttribute('data-copy');
      if (d[key] !== undefined) el.textContent = d[key];
    });

    const proof = document.querySelector('.mission-hero__proofs');
    if (proof) proof.innerHTML = (d.proofs || []).map(x => `<span>${x}</span>`).join('');

    const promises = document.querySelector('.mission-promise-grid');
    if (promises) promises.innerHTML = (d.promises || []).map((x,i) =>
      `<article><span>0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`
    ).join('');

    const scope = document.querySelector('.mission-scope-grid');
    if (scope) scope.innerHTML = (d.scope || []).map((x,i) =>
      `<article><span>0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p><small>${x[2] || ''}</small></article>`
    ).join('');

    const situations = document.querySelector('.mission-situation-list');
    if (situations) situations.innerHTML = (d.situations || []).map(x => `<li>${x}</li>`).join('');

    const process = document.querySelector('.mission-process-grid');
    if (process) process.innerHTML = (d.process || []).map((x,i) =>
      `<article><b>0${i+1}</b><h3>${x[0]}</h3><p>${x[1]}</p></article>`
    ).join('');

    const faq = document.querySelector('.mission-faq-list');
    if (faq) faq.innerHTML = (d.faq || []).map(x =>
      `<details class="faq-item"><summary>${x[0]}</summary><p>${x[1]}</p></details>`
    ).join('');
  }

  render(currentLang());
  document.addEventListener('rb:langchange', e => render(e.detail?.lang || 'fr'));
})();