(() => {
  const root = document.documentElement;
  const getLang = () => root.lang === 'en' ? 'en' : 'fr';
  const cleanPath = () => {
    const parts = location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    if (parts.length >= 2 && parts[parts.length - 2] === 'expertises') return `expertises/${parts.at(-1)}`;
    return parts.at(-1) || 'index.html';
  };

  const pages = {
    fr: {
      paris: ['Expert-comptable à Paris','Un accompagnement comptable, fiscal, social et de pilotage pour entreprises à Paris.','expert-comptable-paris.html'],
      startup: ['Expert-comptable pour start-up','Cash, reporting, structuration, paie et accompagnement de la croissance.','expert-comptable-startup.html'],
      pme: ['Expert-comptable pour PME','Un suivi complet du quotidien aux décisions de gestion.','expert-comptable-pme.html'],
      pennylane: ['Expert-comptable Pennylane','Une organisation comptable digitale, lisible et collaborative.','expert-comptable-pennylane.html'],
      international: ['Implantation en France','Le point d’entrée local des sociétés et groupes étrangers en France.','expert-comptable-international.html'],
      creation: ['Créer une entreprise en France','Structurer, immatriculer et démarrer votre activité dans de bonnes conditions.','creation-entreprise-france.html']
    },
    en: {
      paris: ['Accountant in Paris','Accounting, tax, payroll and management support for businesses operating in Paris.','expert-comptable-paris.html'],
      startup: ['Accountant for start-ups','Cash, reporting, structuring, payroll and growth support.','expert-comptable-startup.html'],
      pme: ['Accountant for SMEs','End-to-end support from recurring compliance to management decisions.','expert-comptable-pme.html'],
      pennylane: ['Pennylane accounting firm','A digital and collaborative accounting workflow.','expert-comptable-pennylane.html'],
      international: ['Setting up in France','A local point of contact for foreign companies and international groups.','expert-comptable-international.html'],
      creation: ['Create a company in France','Structure, register and launch your French business.','creation-entreprise-france.html']
    }
  };

  const sets = {
    'expertises/comptabilite.html':['pennylane','pme','international'],
    'expertises/conseil-gestion.html':['startup','pme','paris'],
    'expertises/social-paie.html':['pme','international','startup'],
    'expertises/creation-juridique.html':['creation','startup','international'],
    'conseil-dirigeant.html':['paris','pme','startup'],
    'facturation-electronique.html':['pennylane','pme','paris'],
    'expert-comptable-paris.html':['startup','pme','international'],
    'expert-comptable-startup.html':['pennylane','paris','creation'],
    'expert-comptable-pme.html':['paris','pennylane','startup'],
    'expert-comptable-pennylane.html':['pme','startup','paris'],
    'creation-entreprise-france.html':['international','paris','startup']
  };

  function ensureMeta(attr, key, value){
    if (!value) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el){
      el = document.createElement('meta');
      el.setAttribute(attr,key);
      document.head.appendChild(el);
    }
    el.setAttribute('content',value);
  }

  function addMeta(){
    const description = document.querySelector('meta[name="description"]')?.content || '';
    ensureMeta('name','robots','index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMeta('property','og:type','website');
    ensureMeta('property','og:site_name','RB Partners');
    ensureMeta('property','og:title',document.title);
    ensureMeta('property','og:description',description);
    ensureMeta('name','twitter:card','summary');
    ensureMeta('name','twitter:title',document.title);
    ensureMeta('name','twitter:description',description);
  }

  function replaceSchema(id, data){
    document.getElementById(id)?.remove();
    const s = document.createElement('script');
    s.type='application/ld+json';
    s.id=id;
    s.textContent=JSON.stringify(data);
    document.head.appendChild(s);
  }

  function addSchema(){
    const l=getLang();
    const description=document.querySelector('meta[name="description"]')?.content || '';
    const isHome=!!document.querySelector('main#top .hero');
    const serviceName=document.querySelector('h1')?.textContent?.trim() || document.title;
    const provider={
      '@type':'AccountingService',
      name:'RB Partners',
      email:'contact@rb-partners.fr',
      areaServed:{'@type':'Country',name:'France'},
      availableLanguage:['fr','en']
    };

    if(isHome){
      replaceSchema('rb-schema-main',{
        '@context':'https://schema.org',
        '@graph':[
          {...provider,'@id':'#accounting-service',description},
          {'@type':'WebSite','@id':'#website',name:'RB Partners',inLanguage:['fr','en']}
        ]
      });
    } else if(document.body.classList.contains('mission-page') || /expert-comptable|creation-entreprise|facturation-electronique|conseil-dirigeant/.test(location.pathname)){
      replaceSchema('rb-schema-main',{
        '@context':'https://schema.org',
        '@type':'Service',
        name:serviceName,
        description,
        areaServed:{'@type':'Country',name:'France'},
        provider
      });
    }

    const faqItems=[...document.querySelectorAll('details.faq-item')].map(d=>({
      q:d.querySelector('summary')?.textContent?.trim(),
      a:d.querySelector('p')?.textContent?.trim()
    })).filter(x=>x.q&&x.a);
    if(faqItems.length){
      replaceSchema('rb-schema-faq',{
        '@context':'https://schema.org',
        '@type':'FAQPage',
        mainEntity:faqItems.map(x=>({
          '@type':'Question',
          name:x.q,
          acceptedAnswer:{'@type':'Answer',text:x.a}
        }))
      });
    }
  }

  function buildRelated(){
    if(document.querySelector('.rb-related')) return;
    const path=cleanPath();
    const keys=sets[path];
    if(!keys) return;
    const l=getLang(), t=pages[l], prefix=location.pathname.includes('/expertises/') ? '../' : '';
    const target=document.querySelector('.mission-final, .intl-final, .expertise-cta');
    if(!target) return;

    const section=document.createElement('section');
    section.className='rb-related';
    section.innerHTML=`
      <div class="container">
        <div class="rb-related__head">
          <div>
            <p class="eyebrow">${l==='en'?'Related expertise':'À découvrir aussi'}</p>
            <h2>${l==='en'?'Continue with the topic that fits your situation.':'Poursuivez selon votre situation.'}</h2>
          </div>
          <p>${l==='en'?'Useful entry points to understand how RB Partners can support your company in France.':'Des pages complémentaires pour comprendre rapidement l’accompagnement adapté à votre entreprise.'}</p>
        </div>
        <div class="rb-related__grid">
          ${keys.map((key,i)=>{
            const [title,desc,href]=t[key];
            return `<a class="rb-related__card" href="${prefix}${href}"><small>0${i+1}</small><h3>${title}</h3><p>${desc}</p><span>${l==='en'?'Explore':'Découvrir'} →</span></a>`;
          }).join('')}
        </div>
      </div>`;
    target.before(section);
  }

  function refresh(){
    addMeta();
    addSchema();
    if(!document.querySelector('.rb-related')) buildRelated();
  }

  refresh();
  document.addEventListener('rb:content-upgraded',()=>requestAnimationFrame(refresh));
  new MutationObserver(()=>requestAnimationFrame(()=>{
    document.querySelector('.rb-related')?.remove();
    refresh();
  })).observe(root,{attributes:true,attributeFilter:['lang']});
})();