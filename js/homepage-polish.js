(() => {
  const isHome = Boolean(document.querySelector('main#top .hero'));
  if (!isHome) return;

  function lang(){ return window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr'; }

  function renderHero(){
    const box=document.querySelector('.v6-hero-visual');
    if(!box) return;
    const en=lang()==='en';
    box.innerHTML=`
      <div class="rb-hero-bridge">
        <button class="rb-hero-side rb-hero-side--fr" type="button" aria-expanded="false">
          <small>FRANCE</small>
          <strong>${en?'French businesses':'Entreprises françaises'}</strong>
          <span>${en?'SMEs · start-ups · founders':'PME · start-up · dirigeants'}</span>
          <em class="rb-hero-side__hint">${en?'Hover to see services':'Survolez pour voir les missions'}</em>
          <span class="rb-hero-side__missions">
            <span class="rb-hero-mission">${en?'Accounting & VAT':'Comptabilité & TVA'}</span>
            <span class="rb-hero-mission">${en?'Payroll & HR':'Paie & social'}</span>
            <span class="rb-hero-mission">${en?'Management & reporting':'Pilotage & reporting'}</span>
            <span class="rb-hero-mission">${en?'Legal & formation':'Juridique & création'}</span>
          </span>
        </button>
        <div class="rb-hero-flow rb-hero-flow--left"><i></i><i></i></div>
        <div class="rb-hero-center"><b>RB</b><small>PARTNERS · FRANCE</small></div>
        <div class="rb-hero-flow rb-hero-flow--right"><i></i><i></i></div>
        <button class="rb-hero-side rb-hero-side--intl" type="button" aria-expanded="false">
          <small>INTERNATIONAL</small>
          <strong>${en?'International groups':'Groupes internationaux'}</strong>
          <span>${en?'HQ · subsidiaries · market entry':'Sièges · filiales · implantation'}</span>
          <em class="rb-hero-side__hint">${en?'Hover to see services':'Survolez pour voir les missions'}</em>
          <span class="rb-hero-side__missions">
            <span class="rb-hero-mission">${en?'France market entry':'Implantation en France'}</span>
            <span class="rb-hero-mission">${en?'French GAAP & VAT':'French GAAP & TVA'}</span>
            <span class="rb-hero-mission">${en?'French payroll':'Paie française'}</span>
            <span class="rb-hero-mission">Reporting FR / EN</span>
          </span>
        </button>
        <span class="rb-hero-service rb-hero-service--1">${en?'Accounting':'Comptabilité'}</span>
        <span class="rb-hero-service rb-hero-service--2">${en?'Tax & VAT':'Fiscalité & TVA'}</span>
        <span class="rb-hero-service rb-hero-service--3">${en?'Payroll':'Paie'}</span>
        <span class="rb-hero-service rb-hero-service--4">Reporting FR / EN</span>
        <span class="rb-hero-caption">${en?'French expertise · international reflexes':'Expertise française · réflexes internationaux'}</span>
      </div>`;

    box.querySelectorAll('.rb-hero-side').forEach(side=>{
      side.addEventListener('click',()=>{
        const open=!side.classList.contains('is-open');
        box.querySelectorAll('.rb-hero-side').forEach(other=>{
          other.classList.remove('is-open');
          other.setAttribute('aria-expanded','false');
        });
        if(open){
          side.classList.add('is-open');
          side.setAttribute('aria-expanded','true');
        }
      });
    });
  }
  let revealObserver;
  function setupReveals(){
    document.querySelectorAll('.rb-home-reveal').forEach(el=>{
      el.classList.remove('rb-home-reveal','rb-home-visible');
      el.style.removeProperty('--rb-home-delay');
    });

    const selectors=[
      '.trust-strip .v3-stat',
      '#expertises .section__head',
      '#expertises .card',
      '#v4-why .v5-modern-intro',
      '#v4-why .v5-modern-card',
      '#v2-founders .section__head',
      '#v2-founders .v2-founder',
      '#v2-international .v8-int-copy',
      '#v2-international .v8-france-bridge',
      '#v2-steps .section__head',
      '#v2-steps .v4-process-step',
      '#v4-reviews .section__head',
      '#v4-reviews .v6-proof-card',
      '#v2-faq .section__head',
      '#v2-faq .faq-item',
      '#contact .partner-contact__head',
      '#contact .partner-contact__card'
    ];
    const nodes=[...document.querySelectorAll(selectors.join(','))];
    nodes.forEach((el,i)=>{
      el.classList.add('rb-home-reveal');
      el.style.setProperty('--rb-home-delay', Math.min((i%4)*70,210)+'ms');
    });

    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){
      nodes.forEach(el=>el.classList.add('rb-home-visible'));
      return;
    }

    revealObserver?.disconnect();
    revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('rb-home-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -8% 0px'});
    nodes.forEach(el=>revealObserver.observe(el));
  }

  function bindFirmButton(){
    const buttons=[...document.querySelectorAll('.nav-group__toggle')];
    const btn=buttons.find(b=>/^(Le cabinet|The firm)$/.test(b.textContent.trim()));
    if(!btn || btn.dataset.rbFirmBound==='1') return;
    btn.dataset.rbFirmBound='1';
    btn.addEventListener('click',e=>{
      const target=document.getElementById('v2-founders');
      if(!target) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      target.style.scrollMarginTop='105px';
      target.scrollIntoView({behavior:'smooth',block:'start'});
      history.replaceState?.(null,'','#v2-founders');
      document.querySelectorAll('.nav-group.is-open').forEach(x=>x.classList.remove('is-open'));
    },true);
  }

  function refineContact(){
    const partnerHead=document.querySelector('#partner-home .partner-contact__head');
    const contactText=document.querySelector('#contact .split__text');
    if(!partnerHead || !contactText) return;
    const en=lang()==='en';

    partnerHead.innerHTML=`
      <p class="eyebrow">${en?'Ready to move forward?':'Prêt à avancer ?'}</p>
      <h2>${en?'A first conversation can change everything.':'Un premier échange peut tout changer.'}</h2>
      <p>${en
        ? 'Tell us what you need. Rachel or Benjamin will speak with you directly and point you toward the right support.'
        : 'Parlez-nous de votre besoin. Rachel ou Benjamin échange directement avec vous et vous oriente vers le bon accompagnement.'}</p>`;

    const eyebrow=contactText.querySelector('.eyebrow');
    const title=contactText.querySelector('h2');
    const lead=contactText.querySelector('p.text--light-muted');
    if(eyebrow) eyebrow.remove();
    if(title) title.textContent=en?'Prefer to send us a message?':'Vous préférez nous écrire ?';
    if(lead) lead.textContent=en
      ? 'Use the form or contact us directly by phone or email. We will come back to you as soon as possible.'
      : 'Utilisez le formulaire ou contactez-nous directement par téléphone ou par e-mail. Nous vous répondrons rapidement.';

    const split=contactText.closest('.split');
    if(split) split.style.alignItems='start';
    contactText.style.alignSelf='start';
    contactText.style.paddingTop='0';

    document.querySelectorAll('#partner-home .partner-contact__card a, #partner-home .partner-contact__card button').forEach(action=>{
      const label=(action.textContent||'').trim().replace(/\s+/g,' ');
      if(/^(Écrire|Ecrire|Write)\s+(Rachel|Benjamin)$/i.test(label)) action.remove();
    });
  }

  function refresh(){
    renderHero();
    bindFirmButton();
    refineContact();
    requestAnimationFrame(setupReveals);
  }

  refresh();
  document.addEventListener('rb:content-upgraded',()=>setTimeout(refresh,30));
  document.addEventListener('rb:langchange',()=>setTimeout(refresh,30));
})();