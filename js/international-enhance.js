(() => {
  if (!document.querySelector('.international-hero')) return;

  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'fr');
  const copy = {
    fr:{
      momentEye:'Quand nous intervenons',
      momentTitle:'Avant la création, au démarrage ou sur une filiale déjà active.',
      moments:[
        ['Avant l’implantation','Cadrer la présence envisagée en France, les flux, les recrutements, les besoins de reporting et les interlocuteurs à coordonner avant de lancer les formalités.'],
        ['Au démarrage de l’entité','Mettre en place la comptabilité, la TVA, la paie, la banque, la facturation, les outils et le calendrier des premières obligations françaises.'],
        ['Sur une filiale déjà en activité','Reprendre un dossier existant, fiabiliser les clôtures, organiser les intercos et aligner le reporting français avec le calendrier de la maison mère.']
      ],
      hqEye:'Livrables pour le siège',
      hqTitle:'Ce que votre maison mère doit pouvoir obtenir sans relancer la France.',
      outputs:[
        ['Calendrier local','Les échéances comptables, fiscales, sociales et juridiques françaises sont identifiées et partagées.'],
        ['Reporting FR / EN','Des situations ou packages adaptés au rythme de clôture et au format demandé par le groupe.'],
        ['Suivi intercompany','Rapprochements, comptes réciproques et points ouverts sont préparés pour limiter les écarts de clôture.'],
        ['Liste des sujets ouverts','Un suivi clair des pièces manquantes, décisions attendues et prochaines actions côté France.']
      ],
      transition:'Une organisation française qui reste compréhensible depuis l’étranger.'
    },
    en:{
      momentEye:'When we step in',
      momentTitle:'Before incorporation, during launch or for an existing French subsidiary.',
      moments:[
        ['Before entering France','Scope the intended French presence, flows, hiring plans, reporting needs and advisers before formal setup begins.'],
        ['During entity launch','Put accounting, VAT, payroll, banking, invoicing, tools and the first French compliance calendar in place.'],
        ['For an existing subsidiary','Take over the file, strengthen closings, organise intercompany accounts and align French reporting with head-office deadlines.']
      ],
      hqEye:'Deliverables for headquarters',
      hqTitle:'What head office should receive without chasing the French entity.',
      outputs:[
        ['Local compliance calendar','French accounting, tax, payroll and recurring legal deadlines are identified and shared.'],
        ['FR / EN reporting','Interim accounts or packages aligned with group closing frequency and requested formats.'],
        ['Intercompany follow-up','Reciprocal accounts, reconciliations and open items are prepared to reduce closing differences.'],
        ['Open-item tracker','A clear view of missing documents, decisions required and next actions on the French side.']
      ],
      transition:'A French operation that remains understandable from abroad.'
    }
  };

  function make(){
    document.querySelectorAll('.intl-extra').forEach(x=>x.remove());
    const t=copy[lang()];
    const intro=document.querySelector('.intl-intro');
    const hq=document.querySelector('.intl-hq');
    if(!intro || !hq) return;

    const moments=document.createElement('section');
    moments.className='section section--cream intl-extra intl-moments';
    moments.innerHTML=`<div class="container">
      <div class="section__head">
        <p class="eyebrow">${t.momentEye}</p>
        <h2>${t.momentTitle}</h2>
      </div>
      <div class="intl-moment-grid">
        ${t.moments.map((x,i)=>`<article><span>0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join('')}
      </div>
    </div>`;
    intro.after(moments);

    const outputs=document.createElement('section');
    outputs.className='section intl-extra intl-hq-outputs';
    outputs.innerHTML=`<div class="container">
      <div class="intl-output-head">
        <div>
          <p class="eyebrow">${t.hqEye}</p>
          <h2>${t.hqTitle}</h2>
        </div>
        <p>${t.transition}</p>
      </div>
      <div class="intl-output-grid">
        ${t.outputs.map((x,i)=>`<article><b>0${i+1}</b><div><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join('')}
      </div>
    </div>`;
    hq.after(outputs);
    document.dispatchEvent(new CustomEvent('rb:content-upgraded'));
  }

  make();
  document.addEventListener('rb:langchange', make);
})();