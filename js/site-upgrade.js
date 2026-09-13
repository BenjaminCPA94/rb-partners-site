(() => {
  const isHome = Boolean(document.querySelector('.hero'));
  const logoHref = document.querySelector('.logo')?.getAttribute('href') || 'index.html';
  const prefix = logoHref.startsWith('../') ? '../' : '';
  const homeAnchor = (id) => prefix ? `${prefix}index.html#${id}` : `#${id}`;
  const langNow = () => window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';

  const T = {
    fr: {
      cabinet:'Le cabinet', expertises:'Expertises', entreprises:'Entreprises', digital:'Digital & IA', ressources:'Ressources', contact:'Contact',
      compta:'Comptabilité & reporting', fiscal:'Fiscalité française & internationale', social:'Paie & social', juridique:'Juridique & création', pilotage:'Pilotage & conseil', implantation:'Implantation en France',
      startup:'Start-up, TPE & PME', secteurs:'Secteurs accompagnés', international:'International', blog:'Blog', simul:'Simulateurs', einvoice:'Facturation électronique',
      heroEyebrow:"Cabinet d'expertise comptable à Paris · France & international",
      heroTitle:"L'expert-comptable des entrepreneurs,<br>start-up, PME et groupes internationaux.",
      heroLead:"Comptabilité, fiscalité, paie, juridique, pilotage et implantation en France : RB Partners combine expertise humaine, outils digitaux et accompagnement sur mesure.",
      trust1:'Expert-comptable dédié', trust1s:'Un interlocuteur qui connaît votre dossier', trust2:'Cabinet digital', trust2s:'Pennylane, reporting et échanges fluides', trust3:'FR / EN', trust3s:'Accompagnement des sociétés internationales', trust4:'Conseil & pilotage', trust4s:'Des chiffres utiles pour décider',
      sectorsEye:'Vos enjeux, notre terrain de jeu', sectorsTitle:'Un expert-comptable adapté à votre activité', sectorsLead:"Notre organisation s'adapte à la maturité de votre entreprise, à vos outils et à vos enjeux de croissance.",
      a1:'Start-up & scale-up', a1p:'Prévisionnel, levée de fonds, reporting investisseurs, CIR/CII, structuration et pilotage du cash.',
      a2:'TPE & PME', a2p:'Comptabilité, TVA, IS, paie, juridique annuel et tableaux de bord.',
      a3:'Groupes internationaux', a3p:'Implantation en France, fiscalité internationale, paie locale et coordination internationale.',
      a4:'Holdings & dirigeants', a4p:'Structuration de groupe, dividendes, participations et accompagnement du dirigeant.',
      a5:'Professions libérales', a5p:'BNC, sociétés d’exercice, rémunération, fiscalité et organisation comptable.',
      a6:'Tech & e-commerce', a6p:'Flux digitaux, TVA, outils connectés, marge et automatisation financière.',
      digiEye:'Digital & intelligence artificielle', digiTitle:'Moins de saisie. Plus de pilotage.', digiP:"Nous construisons un écosystème comptable moderne autour de vos usages : collecte automatisée, facturation électronique, reporting, outils connectés et automatisations.", digiBtn:'Découvrir notre approche digitale',
      faqEye:'Questions fréquentes', faqTitle:'Choisir son expert-comptable', q1:'Pourquoi choisir un expert-comptable à Paris ?', q1a:'Pour combiner proximité, rendez-vous physiques si nécessaire et accompagnement digital partout en France.', q2:'Accompagnez-vous les start-up et PME avec Pennylane ?', q2a:"Oui. Nous adaptons les outils au fonctionnement de l'entreprise et à son niveau de maturité.", q3:'Pouvez-vous créer une société ou une filiale en France ?', q3a:'Oui : structure, formalités, fiscalité, comptabilité, paie et suivi courant.', q4:'Travaillez-vous en français et en anglais ?', q4a:'Oui, notamment pour les groupes étrangers qui s’implantent en France.',
      talk:'Échangez directement avec un associé', talkP:'Un besoin, une question ou un projet ? Contactez directement Rachel ou Benjamin.', call:'Appeler', email:'Écrire',
      missionContact:'Parlons de votre besoin', missionContactP:'Après avoir identifié vos enjeux, nous vous proposons un accompagnement adapté et un interlocuteur dédié.'
    },
    en: {
      cabinet:'The firm', expertises:'Services', entreprises:'Businesses', digital:'Digital & AI', ressources:'Resources', contact:'Contact',
      compta:'Accounting & reporting', fiscal:'French & international tax', social:'Payroll & HR', juridique:'Legal & company formation', pilotage:'Management & advisory', implantation:'Setting up in France',
      startup:'Start-ups, SMEs', secteurs:'Who we support', international:'International', blog:'Blog', simul:'Calculators', einvoice:'E-invoicing',
      heroEyebrow:'French accounting firm in Paris · France & international',
      heroTitle:'The accounting partner for entrepreneurs,<br>start-ups, SMEs and international groups.',
      heroLead:'Accounting, tax, payroll, legal, management reporting and setting up in France: RB Partners combines hands-on expertise, digital tools and tailored support.',
      trust1:'Dedicated accountant', trust1s:'One contact who knows your business', trust2:'Digital-first firm', trust2s:'Pennylane, reporting and smooth exchanges', trust3:'FR / EN', trust3s:'Support for international companies', trust4:'Advisory & management', trust4s:'Useful figures to make better decisions',
      sectorsEye:'Your challenges, our expertise', sectorsTitle:'Accounting support tailored to your business', sectorsLead:'Our approach adapts to your company’s maturity, tools and growth challenges.',
      a1:'Start-ups & scale-ups', a1p:'Forecasting, fundraising, investor reporting, R&D tax credits, structuring and cash management.',
      a2:'SMEs', a2p:'Accounting, VAT, corporate tax, payroll, annual legal work and dashboards.',
      a3:'International groups', a3p:'Setting up in France, international tax, local payroll and cross-border coordination.',
      a4:'Holdings & founders', a4p:'Group structuring, dividends, shareholdings and owner-manager support.',
      a5:'Professionals', a5p:'Professional income, entities, compensation, tax and accounting organisation.',
      a6:'Tech & e-commerce', a6p:'Digital flows, VAT, connected tools, margins and finance automation.',
      digiEye:'Digital & artificial intelligence', digiTitle:'Less data entry. More insight.', digiP:'We build a modern accounting ecosystem around your workflows: automated collection, e-invoicing, reporting, connected tools and automation.', digiBtn:'Discover our digital approach',
      faqEye:'Frequently asked questions', faqTitle:'Choosing your accountant', q1:'Why choose an accountant in Paris?', q1a:'To combine local availability, in-person meetings when useful and digital support throughout France.', q2:'Do you support start-ups and SMEs using Pennylane?', q2a:'Yes. We adapt the tools to your organisation and maturity level.', q3:'Can you create a company or subsidiary in France?', q3a:'Yes: structure, registrations, tax, accounting, payroll and ongoing support.', q4:'Do you work in French and English?', q4a:'Yes, especially for foreign groups establishing operations in France.',
      talk:'Speak directly with a partner', talkP:'Have a question or a project? Contact Rachel or Benjamin directly.', call:'Call', email:'Email',
      missionContact:'Let’s discuss your needs', missionContactP:'Once we understand your challenges, we propose tailored support and a dedicated point of contact.'
    }
  };

  function navHtml(t){
    return `
      <a href="${homeAnchor('equipe')}">${t.cabinet}</a>
      <div class="nav-group"><button class="nav-group__toggle" type="button" aria-expanded="false">${t.expertises}</button><div class="nav-dropdown">
        <a href="${prefix}expertises/comptabilite.html">${t.compta}</a><a href="${prefix}expertises/fiscalite.html">${t.fiscal}</a><a href="${prefix}expertises/social-paie.html">${t.social}</a><a href="${prefix}expertises/creation-juridique.html">${t.juridique}</a><a href="${prefix}expertises/conseil-gestion.html">${t.pilotage}</a><a href="${prefix}expertises/implantation-france.html">${t.implantation}</a>
      </div></div>
      <div class="nav-group"><button class="nav-group__toggle" type="button" aria-expanded="false">${t.entreprises}</button><div class="nav-dropdown">
        <a href="${homeAnchor('accompagnement')}">${t.startup}</a><a href="${homeAnchor('secteurs')}">${t.secteurs}</a><a href="${homeAnchor('international')}">${t.international}</a>
      </div></div>
      <a href="${homeAnchor('digital-ia')}">${t.digital}</a>
      <div class="nav-group"><button class="nav-group__toggle" type="button" aria-expanded="false">${t.ressources}</button><div class="nav-dropdown nav-dropdown--right">
        <a href="${prefix}blog/index.html">${t.blog}</a><a href="${prefix}simulateurs/index.html">${t.simul}</a><a href="${prefix}facturation-electronique.html">${t.einvoice}</a>
      </div></div>
      <a href="${homeAnchor('contact')}">${t.contact}</a>`;
  }

  function partnerBlock(t){
    return `<div class="partner-contact"><div class="partner-contact__head"><p class="eyebrow">${t.talk}</p><h2>${t.missionContact}</h2><p>${t.talkP}</p></div><div class="partner-contact__grid">
      <article class="partner-contact__card"><div class="partner-contact__initials">RI</div><div><h3>Rachel Illouz</h3><p>Associée · Expert-comptable</p><div class="partner-contact__actions"><a href="tel:+33600000001">${t.call} · 06 00 00 00 01</a><a href="mailto:contact@rb-partners.fr">${t.email}</a></div></div></article>
      <article class="partner-contact__card"><div class="partner-contact__initials">BH</div><div><h3>Benjamin Haziza</h3><p>Associé · Expert-comptable</p><div class="partner-contact__actions"><a href="tel:+33600000002">${t.call} · 06 00 00 00 02</a><a href="mailto:contact@rb-partners.fr">${t.email}</a></div></div></article>
    </div></div>`;
  }

  function bindNav(){
    const nav = document.getElementById('nav');
    nav?.querySelectorAll('.nav-group__toggle').forEach((toggle) => toggle.addEventListener('click', (e) => {
      e.stopPropagation(); const group = toggle.closest('.nav-group'); const open = !group.classList.contains('is-open');
      nav.querySelectorAll('.nav-group.is-open').forEach((x) => x.classList.remove('is-open')); group.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open));
    }));
    nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('is-open'); document.getElementById('burger')?.setAttribute('aria-expanded','false'); }));
  }

  function ensureStructure(){
    if (isHome) {
      const hero = document.querySelector('.hero');
      if (!document.querySelector('.trust-strip')) hero?.insertAdjacentHTML('afterend','<section class="trust-strip"><div class="container trust-strip__grid" id="trust-upgrade"></div></section>');
      const intl = document.getElementById('international');
      if (intl && !document.getElementById('secteurs')) intl.insertAdjacentHTML('beforebegin','<section class="section section--cream" id="secteurs"><div class="container"><div id="secteurs-upgrade"></div></div></section>');
      const sectors = document.getElementById('secteurs');
      if (sectors && !document.getElementById('digital-ia')) sectors.insertAdjacentHTML('afterend','<section class="section digital" id="digital-ia"><div class="container" id="digital-upgrade"></div></section>');
      const contact = document.getElementById('contact');
      if (contact && !document.getElementById('faq')) contact.insertAdjacentHTML('beforebegin','<section class="section section--cream" id="faq"><div class="container faq-wrap" id="faq-upgrade"></div></section>');
      if (contact && !document.getElementById('partner-home')) contact.insertAdjacentHTML('afterbegin','<div class="container" id="partner-home"></div>');
    } else {
      const cta = document.querySelector('.expertise-cta');
      if (cta && !document.getElementById('partner-expertise')) cta.insertAdjacentHTML('beforebegin','<section class="section partner-section"><div class="container" id="partner-expertise"></div></section>');
    }
  }

  function render(lang){
    const t = T[lang] || T.fr;
    document.documentElement.lang = lang;
    const nav = document.getElementById('nav'); if(nav){ nav.setAttribute('aria-label', lang==='en'?'Main navigation':'Navigation principale'); nav.innerHTML = navHtml(t); bindNav(); }

    if (isHome) {
      document.title = lang==='en' ? 'French Accountant Paris | Start-ups, SMEs & International — RB Partners' : 'Expert-comptable Paris | Start-up, PME & International — RB Partners';
      const desc = document.querySelector('meta[name="description"]'); if(desc) desc.content = lang==='en' ? 'RB Partners, French accounting firm in Paris: accounting, tax, payroll, legal, management reporting and support for foreign companies setting up in France.' : "RB Partners, cabinet d'expertise comptable à Paris : comptabilité, fiscalité, paie, juridique, pilotage, création d'entreprise et implantation de sociétés étrangères en France.";
      const hero = document.querySelector('.hero'); const eyebrow=hero?.querySelector('.eyebrow'); const h1=hero?.querySelector('h1'); const lead=hero?.querySelector('.hero__lead');
      if(eyebrow){eyebrow.removeAttribute('data-i18n');eyebrow.textContent=t.heroEyebrow} if(h1){h1.removeAttribute('data-i18n-html');h1.innerHTML=t.heroTitle} if(lead){lead.removeAttribute('data-i18n');lead.textContent=t.heroLead}
      const trust=document.getElementById('trust-upgrade'); if(trust) trust.innerHTML=`<div><strong>${t.trust1}</strong><span>${t.trust1s}</span></div><div><strong>${t.trust2}</strong><span>${t.trust2s}</span></div><div><strong>${t.trust3}</strong><span>${t.trust3s}</span></div><div><strong>${t.trust4}</strong><span>${t.trust4s}</span></div>`;
      const sec=document.getElementById('secteurs-upgrade'); if(sec) sec.innerHTML=`<div class="section__head reveal is-visible"><p class="eyebrow">${t.sectorsEye}</p><h2>${t.sectorsTitle}</h2><p class="section__lead">${t.sectorsLead}</p></div><div class="audience-grid">${[[t.a1,t.a1p],[t.a2,t.a2p],[t.a3,t.a3p],[t.a4,t.a4p],[t.a5,t.a5p],[t.a6,t.a6p]].map((x,i)=>`<article class="audience-card"><span>0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}</div>`;
      const digi=document.getElementById('digital-upgrade'); if(digi) digi.innerHTML=`<div class="digital__grid"><div class="digital__content"><p class="eyebrow">${t.digiEye}</p><h2>${t.digiTitle}</h2><p>${t.digiP}</p><ul class="digital__bullets"><li>Pennylane</li><li>${lang==='en'?'E-invoicing readiness':'Préparation à la facturation électronique'}</li><li>${lang==='en'?'Dashboards & cash monitoring':'Tableaux de bord & suivi de trésorerie'}</li><li>${lang==='en'?'Workflow automation':'Automatisation des flux'}</li><li>${lang==='en'?'Controlled AI use':'Usages IA encadrés'}</li></ul><a class="btn btn--secondary" href="${prefix}facturation-electronique.html">${t.digiBtn}</a></div><div class="digital__panel"><div class="digital-chip">Pennylane</div><div class="digital-chip">Silae</div><div class="digital-chip">Reporting</div><div class="digital-chip">E-invoicing</div><div class="digital-chip">Automation</div><div class="digital-chip">AI</div></div></div>`;
      const faq=document.getElementById('faq-upgrade'); if(faq) faq.innerHTML=`<div class="section__head"><p class="eyebrow">${t.faqEye}</p><h2>${t.faqTitle}</h2></div><div class="faq-list"><details class="faq-item"><summary>${t.q1}</summary><p>${t.q1a}</p></details><details class="faq-item"><summary>${t.q2}</summary><p>${t.q2a}</p></details><details class="faq-item"><summary>${t.q3}</summary><p>${t.q3a}</p></details><details class="faq-item"><summary>${t.q4}</summary><p>${t.q4a}</p></details></div>`;
      const ph=document.getElementById('partner-home'); if(ph) ph.innerHTML=partnerBlock(t);
    } else {
      const pe=document.getElementById('partner-expertise'); if(pe) pe.innerHTML=partnerBlock(t);
    }
  }

  ensureStructure();
  render(langNow());
  document.addEventListener('rb:langchange', (e) => render(e.detail?.lang || 'fr'));
  document.addEventListener('click', () => document.querySelectorAll('.nav-group.is-open').forEach((x) => x.classList.remove('is-open')));

  if (!document.querySelector('meta[name="robots"]')) { const m=document.createElement('meta'); m.name='robots'; m.content='index, follow'; document.head.appendChild(m); }
})();
