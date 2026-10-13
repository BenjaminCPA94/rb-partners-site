(() => {
  const langNow = () => window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';
  const pageId = () => {
    const n = location.pathname.split('/').pop() || '';
    if (n.includes('expert-comptable-paris')) return 'paris';
    if (n.includes('expert-comptable-startup')) return 'startup';
    if (n.includes('expert-comptable-pme')) return 'pme';
    if (n.includes('expert-comptable-pennylane')) return 'pennylane';
    if (n.includes('creation-entreprise-france')) return 'creation';
    return null;
  };

  const extra = {
    fr: {
      paris: {
        situations:[
          ['Vous changez de cabinet','Reprendre le dossier sans perdre les échéances, l’historique ni les accès aux outils.'],
          ['Votre entreprise grandit','Ajouter du reporting, du suivi de trésorerie, de la paie ou du conseil sans multiplier les interlocuteurs.'],
          ['Vous avez une dimension internationale','Coordonner les obligations françaises avec les attentes d’une maison mère ou de partenaires étrangers.']
        ],
        deliverables:[
          ['Calendrier clair','Les échéances comptables, fiscales, sociales et juridiques sont identifiées et suivies.'],
          ['Comptabilité exploitable','Des comptes tenus et révisés pour ne pas attendre le bilan annuel avant de comprendre la situation.'],
          ['Interlocuteur identifié','Un point de contact qui connaît le dossier et peut mobiliser les bonnes compétences selon le sujet.'],
          ['Outils organisés','Collecte, factures, banque, paie et reporting sont structurés pour limiter les relances et les doubles saisies.']
        ],
        faq:[
          ['Pouvez-vous reprendre un dossier en cours d’année ?','Oui. Nous organisons la reprise avec le précédent cabinet, récupérons les éléments utiles et sécurisons les prochaines échéances.'],
          ['Accompagnez-vous les sociétés en dehors de Paris ?','Oui. L’organisation est largement digitale et permet d’accompagner des entreprises partout en France.'],
          ['Pouvez-vous gérer comptabilité, paie et juridique ?','Oui, selon le périmètre retenu. L’objectif est d’éviter des circuits séparés lorsque les sujets sont liés.'],
          ['Travaillez-vous en anglais ?','Oui. Les échanges et certains reportings peuvent être organisés en français ou en anglais.']
        ]
      },
      startup: {
        situations:[
          ['Vous lancez votre activité','Mettre en place la structure, les outils et les obligations comptables sans construire une organisation provisoire.'],
          ['Vous levez ou préparez une levée','Fiabiliser la trésorerie, les prévisions, les indicateurs et les données demandées par les investisseurs.'],
          ['Vous passez à l’échelle','Structurer la paie, le reporting, les clôtures et les responsabilités lorsque l’équipe et les flux augmentent.']
        ],
        deliverables:[
          ['Cash visible','Suivi de trésorerie, prévisionnel et indicateurs adaptés à votre rythme de décision.'],
          ['Reporting lisible','Des données utilisables par les fondateurs, investisseurs, banques et partenaires.'],
          ['Comptabilité propre','Une base comptable structurée pour éviter les reprises coûteuses à mesure que la société grandit.'],
          ['Organisation évolutive','Des outils et processus capables de suivre les recrutements, les volumes et les opérations de croissance.']
        ],
        faq:[
          ['À partir de quel stade accompagnez-vous une start-up ?','Dès la création ou lors d’un changement de cabinet. Le périmètre évolue ensuite avec les besoins de l’entreprise.'],
          ['Pouvez-vous préparer des données pour une levée de fonds ?','Oui. Nous pouvons fiabiliser les données comptables, les prévisions et les éléments financiers utiles à une data room.'],
          ['Travaillez-vous avec Pennylane ?','Oui. Pennylane peut être intégré à l’organisation comptable et aux circuits de collecte et de validation.'],
          ['Pouvez-vous suivre la trésorerie et le runway ?','Oui, lorsque cette mission fait partie du périmètre. Le niveau de détail est adapté à vos besoins de pilotage.']
        ]
      },
      pme: {
        situations:[
          ['Votre comptabilité est trop “annuelle”','Mettre en place des situations et indicateurs pour décider avant la clôture.'],
          ['Votre organisation se complexifie','Coordonner comptabilité, fiscalité, paie, juridique et gestion au fur et à mesure de la croissance.'],
          ['Vous manquez de visibilité sur le cash','Structurer le suivi de trésorerie, des marges et des principaux postes de gestion.']
        ],
        deliverables:[
          ['Échéances sécurisées','Un calendrier partagé des obligations et des travaux récurrents.'],
          ['Pilotage régulier','Des situations et tableaux de bord construits autour des décisions du dirigeant.'],
          ['Coordination simplifiée','Un cabinet capable de réunir plusieurs sujets plutôt que de les traiter en silos.'],
          ['Flux digitaux','Des outils adaptés pour la collecte, la facturation, la banque et le suivi des pièces.']
        ],
        faq:[
          ['Pouvez-vous reprendre une PME déjà structurée ?','Oui. Nous pouvons reprendre un dossier existant, cartographier les échéances et remettre à plat les flux si nécessaire.'],
          ['Faites-vous des situations intermédiaires ?','Oui, mensuelles, trimestrielles ou ponctuelles selon le niveau de pilotage attendu.'],
          ['Pouvez-vous gérer la paie avec la comptabilité ?','Oui, selon le périmètre convenu, afin de coordonner les données sociales et comptables.'],
          ['Pouvez-vous accompagner une PME avec plusieurs sociétés ?','Oui. Nous pouvons organiser le suivi par entité et la lecture globale du groupe, selon sa structure.']
        ]
      },
      pennylane: {
        situations:[
          ['Vous voulez réduire la collecte manuelle','Centraliser factures, banque, justificatifs et échanges dans un circuit plus simple.'],
          ['Vous manquez de visibilité','Utiliser un dossier mieux tenu pour disposer d’informations comptables plus régulières.'],
          ['Vous changez de cabinet','Reprendre Pennylane ou mettre en place un nouvel environnement sans perdre l’historique utile.']
        ],
        deliverables:[
          ['Paramétrage cohérent','Comptes, banques, factures, accès et circuits de validation organisés autour de votre fonctionnement.'],
          ['Responsabilités claires','Vos équipes savent quoi déposer, quoi valider et où retrouver l’information.'],
          ['Comptabilité connectée','Les flux sont intégrés au processus comptable plutôt que gérés dans des outils isolés.'],
          ['Suivi plus fluide','Moins d’allers-retours sur les pièces et une meilleure visibilité sur les éléments manquants.']
        ],
        faq:[
          ['Êtes-vous un cabinet utilisant Pennylane ?','Oui. Pennylane fait partie des outils que nous pouvons utiliser selon le dossier et l’organisation du client.'],
          ['Pouvez-vous reprendre un dossier Pennylane existant ?','Oui. Nous pouvons reprendre l’environnement existant et vérifier les paramétrages, accès et workflows.'],
          ['Pennylane remplace-t-il l’expert-comptable ?','Non. L’outil facilite les flux et la collaboration ; la révision, les déclarations, la clôture et le conseil restent des travaux professionnels.'],
          ['Pouvez-vous former mon équipe au fonctionnement du dossier ?','Oui. Nous définissons les rôles et expliquons le circuit de dépôt, validation et suivi retenu.']
        ]
      },
      creation: {
        situations:[
          ['Vous créez seul','Choisir une structure cohérente avec votre activité, votre rémunération et vos perspectives.'],
          ['Vous créez à plusieurs','Anticiper la gouvernance, la répartition du capital et l’organisation financière dès le départ.'],
          ['Vous créez depuis l’étranger','Coordonner la structure française, la fiscalité, la banque, la comptabilité et les premières obligations locales.']
        ],
        deliverables:[
          ['Décisions cadrées','Un échange structuré sur la forme juridique, la fiscalité et les besoins opérationnels.'],
          ['Création coordonnée','Les formalités et les étapes de lancement sont organisées dans le bon ordre.'],
          ['Dossier comptable prêt','Outils, banque, facturation et obligations de démarrage sont anticipés.'],
          ['Suite déjà organisée','Le passage de la création au suivi comptable, fiscal et social se fait sans rupture.']
        ],
        faq:[
          ['SASU ou EURL : pouvez-vous m’aider à choisir ?','Oui. Le choix dépend notamment de votre situation, de la rémunération envisagée, des associés et du projet.'],
          ['Pouvez-vous vous occuper des formalités de création ?','Oui, selon le périmètre convenu, avec coordination des éléments nécessaires à l’immatriculation.'],
          ['Quand faut-il choisir son expert-comptable ?','Idéalement avant le démarrage, afin d’anticiper la structure, les outils, la TVA, la facturation et les premières échéances.'],
          ['Accompagnez-vous les fondateurs étrangers ?','Oui. Nous pouvons coordonner la création et le fonctionnement comptable, fiscal et social de la structure française.']
        ]
      }
    },
    en: {
      paris: {
        situations:[['Changing accounting firm','Take over the file without losing deadlines, history or access to key tools.'],['Your company is growing','Add reporting, cash monitoring, payroll or advisory without multiplying providers.'],['You operate internationally','Connect French compliance with head-office or foreign stakeholder expectations.']],
        deliverables:[['Clear calendar','Accounting, tax, payroll and recurring legal deadlines are identified and monitored.'],['Usable accounts','Accounts are maintained and reviewed so management does not have to wait for year-end to understand the business.'],['Named contact','A point of contact who knows the file and brings in the right expertise when needed.'],['Organised tools','Invoices, banking, payroll and reporting are structured to reduce chasing and duplicate work.']],
        faq:[['Can you take over during the year?','Yes. We organise the handover with the previous firm, collect the relevant data and secure upcoming deadlines.'],['Do you support companies outside Paris?','Yes. Our largely digital operating model allows us to work with companies throughout France.'],['Can you handle accounting, payroll and legal work?','Yes, depending on the agreed scope, especially where those topics need to be coordinated.'],['Can you work in English?','Yes. Communication and selected reporting can be organised in French or English.']]
      },
      startup: {
        situations:[['Launching the business','Set up the structure, tools and compliance without building a temporary finance process.'],['Preparing a funding round','Strengthen cash forecasts, KPIs and financial data requested by investors.'],['Scaling the company','Structure payroll, reporting, closings and responsibilities as teams and volumes grow.']],
        deliverables:[['Cash visibility','Cash monitoring, forecasting and indicators aligned with management needs.'],['Clear reporting','Financial information founders, investors, banks and partners can use.'],['Clean accounting base','Structured accounting that avoids expensive clean-up as the company grows.'],['Scalable organisation','Tools and processes that can follow hiring, transaction volumes and growth operations.']],
        faq:[['When can you start supporting a startup?','From incorporation or when changing accounting firm. The scope can then evolve with the company.'],['Can you prepare financial information for fundraising?','Yes. We can help make accounting data, forecasts and financial data-room materials more reliable.'],['Do you work with Pennylane?','Yes. Pennylane can be integrated into the accounting workflow and approval process.'],['Can you monitor cash and runway?','Yes, where included in the agreed scope, with a level of detail adapted to management needs.']]
      },
      pme: {
        situations:[['Your accounting is too annual','Introduce interim accounts and indicators so decisions can be made before year-end.'],['Your organisation is becoming more complex','Coordinate accounting, tax, payroll, legal and management topics as the business grows.'],['You lack cash visibility','Structure cash, margin and key management monitoring.']],
        deliverables:[['Secured deadlines','A shared calendar of recurring obligations and work.'],['Regular management information','Interim accounts and dashboards designed around management decisions.'],['Simpler coordination','One firm able to connect several related topics rather than treating them in silos.'],['Digital workflows','Tools suited to document collection, invoicing, banking and follow-up.']],
        faq:[['Can you take over an established SME?','Yes. We can take over an existing file, map the deadlines and redesign workflows where needed.'],['Do you prepare interim accounts?','Yes, monthly, quarterly or on specific dates depending on the required level of management reporting.'],['Can payroll be handled alongside accounting?','Yes, where included in scope, so payroll and accounting data can be coordinated.'],['Can you support a group with several entities?','Yes. We can organise monitoring by entity and a consolidated management view depending on the structure.']]
      },
      pennylane: {
        situations:[['You want less manual document chasing','Centralise invoices, banking, supporting documents and exchanges in a simpler workflow.'],['You lack visibility','Use a better-maintained accounting file to produce more regular financial information.'],['You are changing firm','Take over an existing Pennylane setup or create a new one without losing useful history.']],
        deliverables:[['Coherent setup','Accounts, banks, invoices, access rights and approval workflows aligned with your organisation.'],['Clear responsibilities','Your teams know what to upload, approve and where to find information.'],['Connected accounting','Financial flows are integrated into the accounting process rather than sitting in separate tools.'],['Smoother follow-up','Less back-and-forth on documents and clearer visibility on missing information.']],
        faq:[['Do you use Pennylane?','Yes. Pennylane is one of the tools we can use depending on the file and client organisation.'],['Can you take over an existing Pennylane file?','Yes. We can take over the existing environment and review settings, access rights and workflows.'],['Does Pennylane replace the accountant?','No. It helps automate and organise flows; review, filings, closing and advisory remain professional work.'],['Can you explain the workflow to our team?','Yes. We define roles and explain the selected upload, approval and follow-up process.']]
      },
      creation: {
        situations:[['You are founding alone','Choose a structure that fits the activity, compensation and future plans.'],['You are founding with partners','Anticipate governance, ownership and financial organisation from day one.'],['You are setting up from abroad','Coordinate the French entity, tax, banking, accounting and first local obligations.']],
        deliverables:[['Structured decisions','A clear discussion around legal form, tax and operating requirements.'],['Coordinated incorporation','Formalities and launch steps are organised in the right order.'],['Accounting setup ready','Tools, banking, invoicing and initial obligations are anticipated.'],['Continuity after launch','The move from incorporation to recurring accounting, tax and payroll support is seamless.']],
        faq:[['SASU or EURL: can you help me choose?','Yes. The right choice depends on your situation, compensation plans, shareholders and business project.'],['Can you manage incorporation formalities?','Yes, within the agreed scope, coordinating the information required for registration.'],['When should I appoint an accountant?','Ideally before launch so the structure, tools, VAT, invoicing and first deadlines can be anticipated.'],['Do you support foreign founders?','Yes. We can coordinate the creation and ongoing accounting, tax and payroll operation of the French entity.']]
      }
    }
  };

  function applyPageLanguage(lang) {
    const copy = window.RB_SEO_PAGE?.[lang] || window.RB_SEO_PAGE?.fr;
    if (!copy) return;
    document.documentElement.lang = lang;
    if (copy.metaTitle) document.title = copy.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && copy.metaDescription) desc.setAttribute('content', copy.metaDescription);

    document.querySelectorAll('[data-copy]').forEach((el) => {
      const value = copy[el.getAttribute('data-copy')];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll('[data-list]').forEach((el) => {
      const values = copy[el.getAttribute('data-list')];
      if (Array.isArray(values)) el.innerHTML = values.map((item) => `<li>${item}</li>`).join('');
    });
  }

  function baseJourney(lang){
    document.querySelector('.seo-hero__actions .btn--ghost')?.remove();
    const finalCta = document.querySelector('.expertise-cta .btn');
    if (finalCta) finalCta.textContent = lang === 'en' ? 'Book a meeting' : 'Prendre rendez-vous';
  }

  function section(titleEye,title,bodyClass,items,mode){
    const s=document.createElement('section');
    s.className=`section ${mode==='cream'?'section--cream':''} seo-depth`;
    s.innerHTML=`<div class="container"><div class="section__head"><p class="eyebrow">${titleEye}</p><h2>${title}</h2></div><div class="${bodyClass}">${items}</div></div>`;
    return s;
  }

  function renderDepth(lang){
    document.querySelectorAll('.seo-depth').forEach(x=>x.remove());
    const id=pageId(), d=extra[lang]?.[id];
    if(!d || document.querySelector('.international-hero')) return;

    const sections=[...document.querySelectorAll('main > section')];
    const why=sections[1], mission=sections[2], final=document.querySelector('.expertise-cta');
    if(!why || !mission || !final) return;

    const situations=section(
      lang==='en'?'Typical situations':'Situations concrètes',
      lang==='en'?'When clients usually call us.':'Quand nos clients nous sollicitent.',
      'seo-depth-grid',
      d.situations.map((x,i)=>`<article class="seo-depth-card"><span>0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join(''),
      ''
    );
    why.after(situations);

    const deliverables=section(
      lang==='en'?'What you receive':'Ce que vous obtenez',
      lang==='en'?'Concrete outputs, not a vague accounting promise.':'Des livrables concrets, pas une promesse vague.',
      'seo-output-grid',
      d.deliverables.map((x,i)=>`<article class="seo-output-card"><b>0${i+1}</b><div><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join(''),
      'cream'
    );
    mission.after(deliverables);

    const faq=section(
      'FAQ',
      lang==='en'?'Questions before choosing your accountant.':'Les questions avant de choisir votre expert-comptable.',
      'faq-list seo-depth-faq',
      d.faq.map(x=>`<details class="faq-item"><summary>${x[0]}</summary><p>${x[1]}</p></details>`).join(''),
      ''
    );
    final.before(faq);

    document.dispatchEvent(new CustomEvent('rb:content-upgraded'));
  }

  function init(){
    const l=langNow();
    applyPageLanguage(l);
    baseJourney(l);
    renderDepth(l);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();

  document.addEventListener('rb:langchange', (event) => {
    const l=event.detail?.lang || 'fr';
    applyPageLanguage(l);
    baseJourney(l);
    renderDepth(l);
  });
})();