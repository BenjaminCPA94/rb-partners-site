(() => {
  const cfg = window.RB_MISSION_PAGE;
  if (!cfg) return;

  const currentLang = () => window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';

  const relatedMap = {
    fr: {
      accounting: [
        ["Expert-comptable Pennylane","Une organisation comptable digitale, lisible et collaborative.","../expert-comptable-pennylane.html"],
        ["Expert-comptable pour PME","Un accompagnement complet du quotidien aux décisions de gestion.","../expert-comptable-pme.html"],
        ["Implantation en France","Le point d’entrée local des sociétés et groupes étrangers.","../expert-comptable-international.html"]
      ],
      management: [
        ["Expert-comptable start-up","Cash, budget, reporting et accompagnement de la croissance.","../expert-comptable-startup.html"],
        ["Expert-comptable pour PME","Pilotage, trésorerie et organisation financière.","../expert-comptable-pme.html"],
        ["Expert-comptable à Paris","Un cabinet de proximité pour vos sujets comptables et financiers.","../expert-comptable-paris.html"]
      ],
      payroll: [
        ["Expert-comptable pour PME","Comptabilité, fiscalité, paie et pilotage au quotidien.","../expert-comptable-pme.html"],
        ["Implantation en France","Paie française et obligations sociales pour les groupes étrangers.","../expert-comptable-international.html"],
        ["Expert-comptable start-up","Paie, recrutements et croissance des équipes.","../expert-comptable-startup.html"]
      ],
      legal: [
        ["Créer une entreprise en France","Structurer, immatriculer et démarrer dans de bonnes conditions.","../creation-entreprise-france.html"],
        ["Expert-comptable start-up","Structuration et accompagnement après la création.","../expert-comptable-startup.html"],
        ["Implantation en France","Filiale, succursale et organisation locale.","../expert-comptable-international.html"]
      ],
      tax: [
        ["Expert-comptable international","Fiscalité française, flux transfrontaliers et coordination groupe.","../expert-comptable-international.html"],
        ["Expert-comptable pour PME","Comptabilité, fiscalité, paie et pilotage au quotidien.","../expert-comptable-pme.html"],
        ["Comptabilité & reporting","Des données fiables pour préparer déclarations, clôture et reporting.","comptabilite.html"]
      ],
      implant: [
        ["Expert-comptable international","L’accompagnement global des groupes étrangers en France.","../expert-comptable-international.html"],
        ["Créer une entreprise en France","Structurer et immatriculer une société française.","../creation-entreprise-france.html"],
        ["Social & RH","Mettre en place la paie et les premiers processus sociaux en France.","social-paie.html"]
      ]
    },
    en: {
      accounting: [
        ["Pennylane accounting firm","A digital and collaborative accounting workflow.","../expert-comptable-pennylane.html"],
        ["Accountant for SMEs","End-to-end support from compliance to management decisions.","../expert-comptable-pme.html"],
        ["Setting up in France","A local point of contact for foreign companies and groups.","../expert-comptable-international.html"]
      ],
      management: [
        ["Accountant for start-ups","Cash, budgets, reporting and growth support.","../expert-comptable-startup.html"],
        ["Accountant for SMEs","Management reporting, cash and finance organisation.","../expert-comptable-pme.html"],
        ["Accountant in Paris","A responsive local firm for accounting and finance matters.","../expert-comptable-paris.html"]
      ],
      payroll: [
        ["Accountant for SMEs","Accounting, tax, payroll and day-to-day management support.","../expert-comptable-pme.html"],
        ["Setting up in France","French payroll and social compliance for international groups.","../expert-comptable-international.html"],
        ["Accountant for start-ups","Payroll, hiring and team growth support.","../expert-comptable-startup.html"]
      ],
      legal: [
        ["Create a company in France","Structure, register and launch on solid foundations.","../creation-entreprise-france.html"],
        ["Accountant for start-ups","Structuring and support after incorporation.","../expert-comptable-startup.html"],
        ["Setting up in France","Subsidiary, branch and local operating setup.","../expert-comptable-international.html"]
      ],
      tax: [
        ["International accountant","French tax, cross-border flows and group coordination.","../expert-comptable-international.html"],
        ["Accountant for SMEs","Accounting, tax, payroll and day-to-day management support.","../expert-comptable-pme.html"],
        ["Accounting & reporting","Reliable data for filings, closings and reporting.","comptabilite.html"]
      ],
      implant: [
        ["International accountant","End-to-end support for foreign groups operating in France.","../expert-comptable-international.html"],
        ["Create a company in France","Structure and register a French company.","../creation-entreprise-france.html"],
        ["Payroll & HR","Set up French payroll and first local HR processes.","social-paie.html"]
      ]
    }
  };

  function relatedKey() {
    if (document.body.classList.contains('mission-page--accounting')) return 'accounting';
    const path = location.pathname;
    if (path.includes('conseil-gestion')) return 'management';
    if (path.includes('social-paie')) return 'payroll';
    if (path.includes('creation-juridique')) return 'legal';
    if (path.includes('fiscalite')) return 'tax';
    if (path.includes('implantation-france')) return 'implant';
    return null;
  }

  function renderRelated(lang) {
    const key = relatedKey();
    const items = relatedMap[lang]?.[key];
    if (!items?.length) return;
    document.querySelector('.rb-related')?.remove();
    const target = document.querySelector('.mission-final');
    if (!target) return;
    const section = document.createElement('section');
    section.className = 'rb-related';
    section.innerHTML = `
      <div class="container">
        <div class="rb-related__head">
          <div>
            <p class="eyebrow">${lang === 'en' ? 'Related expertise' : 'À découvrir aussi'}</p>
            <h2>${lang === 'en' ? 'Continue with the topic that fits your situation.' : 'Poursuivez selon votre situation.'}</h2>
          </div>
          <p>${lang === 'en' ? 'Useful entry points to understand how RB Partners can support your company in France.' : 'Des pages complémentaires pour comprendre rapidement l’accompagnement adapté à votre entreprise.'}</p>
        </div>
        <div class="rb-related__grid">
          ${items.map((x,i) => `<a class="rb-related__card" href="${x[2]}"><small>0${i+1}</small><h3>${x[0]}</h3><p>${x[1]}</p><span>${lang === 'en' ? 'Explore' : 'Découvrir'} →</span></a>`).join('')}
        </div>
      </div>`;
    target.before(section);
  }

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

    renderRelated(lang);

    const faq = document.querySelector('.mission-faq-list');
    if (faq) faq.innerHTML = (d.faq || []).map(x =>
      `<details class="faq-item"><summary>${x[0]}</summary><p>${x[1]}</p></details>`
    ).join('');

    document.dispatchEvent(new CustomEvent('rb:content-upgraded'));
  }

  render(currentLang());
  document.addEventListener('rb:langchange', e => render(e.detail?.lang || 'fr'));
})();