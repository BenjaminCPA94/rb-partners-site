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

    let questionsSection = document.querySelector('.mission-client-questions');
    if (!questionsSection) {
      document.querySelector('.mission-scope')?.insertAdjacentHTML('afterend', '<section class="section mission-client-questions"><div class="container"><div class="mission-v7-head"><p class="eyebrow" data-v7="questionsEye"></p><h2 data-v7="questionsTitle"></h2><p data-v7="questionsLead"></p></div><div class="mission-question-grid"></div></div></section>');
      questionsSection = document.querySelector('.mission-client-questions');
    }
    if (questionsSection) {
      questionsSection.querySelector('[data-v7="questionsEye"]').textContent = d.questionsEye || '';
      questionsSection.querySelector('[data-v7="questionsTitle"]').textContent = d.questionsTitle || '';
      questionsSection.querySelector('[data-v7="questionsLead"]').textContent = d.questionsLead || '';
      questionsSection.querySelector('.mission-question-grid').innerHTML = (d.questions || []).map((x,i) => `<article class="mission-question-card"><span>0${i+1}</span><p>${x}</p></article>`).join('');
    }

    let deliverablesSection = document.querySelector('.mission-deliverables');
    if (!deliverablesSection) {
      document.querySelector('.mission-promise')?.insertAdjacentHTML('afterend', '<section class="section mission-deliverables"><div class="container mission-deliverables__grid"><div class="mission-deliverables__intro"><p class="eyebrow" data-v7="deliverablesEye"></p><h2 data-v7="deliverablesTitle"></h2></div><div class="mission-deliverable-list"></div></div></section>');
      deliverablesSection = document.querySelector('.mission-deliverables');
    }
    if (deliverablesSection) {
      deliverablesSection.querySelector('[data-v7="deliverablesEye"]').textContent = d.deliverablesEye || '';
      deliverablesSection.querySelector('[data-v7="deliverablesTitle"]').textContent = d.deliverablesTitle || '';
      deliverablesSection.querySelector('.mission-deliverable-list').innerHTML = (d.deliverables || []).map((x,i) => `<article><b>0${i+1}</b><div><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join('');
    }

    let lanesSection = document.querySelector('.mission-lanes');
    if (!lanesSection) {
      document.querySelector('.mission-process')?.insertAdjacentHTML('afterend', '<section class="section mission-lanes"><div class="container"><div class="mission-v7-head mission-v7-head--light"><p class="eyebrow" data-v7="lanesEye"></p><h2 data-v7="lanesTitle"></h2></div><div class="mission-lane-grid"></div></div></section>');
      lanesSection = document.querySelector('.mission-lanes');
    }
    if (lanesSection) {
      lanesSection.querySelector('[data-v7="lanesEye"]').textContent = d.lanesEye || '';
      lanesSection.querySelector('[data-v7="lanesTitle"]').textContent = d.lanesTitle || '';
      lanesSection.querySelector('.mission-lane-grid').innerHTML = (d.lanes || []).map((x,i) => `<article><span>${i===0?'FR':'INTL'}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('');
    }

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