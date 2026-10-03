(() => {
  const isHome = Boolean(document.querySelector('main#top .hero'));
  if (!isHome) return;

  function lang(){ return window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr'; }

  function renderHero(){
    const box=document.querySelector('.v6-hero-visual');
    if(!box) return;
    const en=lang()==='en';
    box.innerHTML=`
      <div class="rb-hero-bridge" aria-hidden="true">
        <div class="rb-hero-side rb-hero-side--fr">
          <small>FRANCE</small>
          <strong>${en?'French businesses':'Entreprises françaises'}</strong>
          <span>${en?'SMEs · start-ups · founders':'PME · start-up · dirigeants'}</span>
        </div>
        <div class="rb-hero-flow rb-hero-flow--left"><i></i><i></i></div>
        <div class="rb-hero-center"><b>RB</b><small>PARTNERS · FRANCE</small></div>
        <div class="rb-hero-flow rb-hero-flow--right"><i></i><i></i></div>
        <div class="rb-hero-side rb-hero-side--intl">
          <small>INTERNATIONAL</small>
          <strong>${en?'International groups':'Groupes internationaux'}</strong>
          <span>${en?'HQ · subsidiaries · market entry':'Sièges · filiales · implantation'}</span>
        </div>
        <span class="rb-hero-service rb-hero-service--1">${en?'Accounting':'Comptabilité'}</span>
        <span class="rb-hero-service rb-hero-service--2">${en?'Tax & VAT':'Fiscalité & TVA'}</span>
        <span class="rb-hero-service rb-hero-service--3">${en?'Payroll':'Paie'}</span>
        <span class="rb-hero-service rb-hero-service--4">Reporting FR / EN</span>
        <span class="rb-hero-caption">${en?'French expertise · international reflexes':'Expertise française · réflexes internationaux'}</span>
      </div>`;
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

  function refresh(){
    renderHero();
    bindFirmButton();
    requestAnimationFrame(setupReveals);
  }

  refresh();
  document.addEventListener('rb:content-upgraded',()=>setTimeout(refresh,30));
  document.addEventListener('rb:langchange',()=>setTimeout(refresh,30));
})();