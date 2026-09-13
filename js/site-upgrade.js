(() => {
  const nav = document.getElementById('nav');
  const isHome = Boolean(document.querySelector('.hero'));
  const logoHref = document.querySelector('.logo')?.getAttribute('href') || 'index.html';
  const prefix = logoHref.startsWith('../') ? '../' : '';
  const homeAnchor = (id) => prefix ? `${prefix}index.html#${id}` : `#${id}`;

  if (nav) {
    nav.setAttribute('aria-label', 'Navigation principale');
    nav.innerHTML = `
      <a href="${homeAnchor('equipe')}">Le cabinet</a>
      <div class="nav-group"><button class="nav-group__toggle" type="button" aria-expanded="false">Expertises <span>⌄</span></button><div class="nav-dropdown">
        <a href="${prefix}expertises/comptabilite.html">Comptabilité & reporting</a><a href="${prefix}expertises/fiscalite.html">Fiscalité française & internationale</a><a href="${prefix}expertises/social-paie.html">Paie & social</a><a href="${prefix}expertises/creation-juridique.html">Juridique & création</a><a href="${prefix}expertises/conseil-gestion.html">Pilotage & conseil</a><a href="${prefix}expertises/implantation-france.html">Implantation en France</a>
      </div></div>
      <div class="nav-group"><button class="nav-group__toggle" type="button" aria-expanded="false">Entreprises <span>⌄</span></button><div class="nav-dropdown">
        <a href="${homeAnchor('accompagnement')}">Start-up, TPE & PME</a><a href="${homeAnchor('secteurs')}">Secteurs accompagnés</a><a href="${homeAnchor('international')}">International</a>
      </div></div>
      <a href="${homeAnchor('digital-ia')}">Digital & IA</a>
      <div class="nav-group"><button class="nav-group__toggle" type="button" aria-expanded="false">Ressources <span>⌄</span></button><div class="nav-dropdown nav-dropdown--right">
        <a href="${prefix}blog/index.html">Blog</a><a href="${prefix}simulateurs/index.html">Simulateurs</a><a href="${prefix}facturation-electronique.html">Facturation électronique</a>
      </div></div>
      <a href="${homeAnchor('contact')}">Contact</a>`;

    nav.querySelectorAll('.nav-group__toggle').forEach((toggle) => toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const group = toggle.closest('.nav-group');
      const open = !group.classList.contains('is-open');
      nav.querySelectorAll('.nav-group.is-open').forEach((x) => x.classList.remove('is-open'));
      group.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }));
  }

  document.addEventListener('click', () => document.querySelectorAll('.nav-group.is-open').forEach((x) => x.classList.remove('is-open')));

  if (!isHome) return;

  document.title = 'Expert-comptable Paris | Start-up, PME & International — RB Partners';
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = "RB Partners, cabinet d'expertise comptable à Paris : comptabilité, fiscalité, paie, juridique, pilotage, création d'entreprise et implantation de sociétés étrangères en France.";
  if (!document.querySelector('meta[name="robots"]')) {
    const m = document.createElement('meta'); m.name='robots'; m.content='index, follow'; document.head.appendChild(m);
  }

  const hero = document.querySelector('.hero');
  const eyebrow = hero?.querySelector('.eyebrow');
  const h1 = hero?.querySelector('h1');
  const lead = hero?.querySelector('.hero__lead');
  if (eyebrow) { eyebrow.removeAttribute('data-i18n'); eyebrow.textContent = "Cabinet d'expertise comptable à Paris · France & international"; }
  if (h1) { h1.removeAttribute('data-i18n-html'); h1.innerHTML = "L'expert-comptable des entrepreneurs,<br>start-up, PME et groupes internationaux."; }
  if (lead) { lead.removeAttribute('data-i18n'); lead.textContent = "Comptabilité, fiscalité, paie, juridique, pilotage et implantation en France : RB Partners combine expertise humaine, outils digitaux et accompagnement sur mesure."; }

  if (!document.querySelector('.trust-strip')) hero?.insertAdjacentHTML('afterend', `<section class="trust-strip"><div class="container trust-strip__grid"><div><strong>Expert-comptable dédié</strong><span>Un interlocuteur qui connaît votre dossier</span></div><div><strong>Cabinet digital</strong><span>Pennylane, reporting et échanges fluides</span></div><div><strong>FR / EN</strong><span>Accompagnement des sociétés internationales</span></div><div><strong>Conseil & pilotage</strong><span>Des chiffres utiles pour décider</span></div></div></section>`);

  const intl = document.getElementById('international');
  if (intl && !document.getElementById('secteurs')) intl.insertAdjacentHTML('beforebegin', `<section class="section section--cream" id="secteurs"><div class="container"><div class="section__head reveal"><p class="eyebrow">Vos enjeux, notre terrain de jeu</p><h2>Un expert-comptable adapté à votre activité</h2><p class="section__lead">Notre organisation s'adapte à la maturité de votre entreprise, à vos outils et à vos enjeux de croissance.</p></div><div class="audience-grid"><article class="audience-card reveal"><span>01</span><h3>Start-up & scale-up</h3><p>Prévisionnel, levée de fonds, reporting investisseurs, CIR/CII, structuration et pilotage du cash.</p></article><article class="audience-card reveal"><span>02</span><h3>TPE & PME</h3><p>Comptabilité, TVA, IS, paie, juridique annuel et tableaux de bord.</p></article><article class="audience-card reveal"><span>03</span><h3>Groupes internationaux</h3><p>Implantation en France, fiscalité internationale, paie locale et coordination internationale.</p></article><article class="audience-card reveal"><span>04</span><h3>Holdings & dirigeants</h3><p>Structuration de groupe, dividendes, participations et accompagnement du dirigeant.</p></article><article class="audience-card reveal"><span>05</span><h3>Professions libérales</h3><p>BNC, sociétés d'exercice, rémunération, fiscalité et organisation comptable.</p></article><article class="audience-card reveal"><span>06</span><h3>Tech & e-commerce</h3><p>Flux digitaux, TVA, outils connectés, marge et automatisation financière.</p></article></div></div></section>`);

  const sectors = document.getElementById('secteurs');
  if (sectors && !document.getElementById('digital-ia')) sectors.insertAdjacentHTML('afterend', `<section class="section digital" id="digital-ia"><div class="container digital__grid"><div class="digital__content reveal"><p class="eyebrow">Digital & intelligence artificielle</p><h2>Moins de saisie. Plus de pilotage.</h2><p>Nous construisons un écosystème comptable moderne autour de vos usages : collecte automatisée, facturation électronique, reporting, outils connectés et automatisations.</p><ul class="checklist"><li>Paramétrage et accompagnement Pennylane</li><li>Préparation à la facturation électronique 2026–2027</li><li>Tableaux de bord et suivi de trésorerie</li><li>Automatisation des flux et intégration d'outils</li><li>Usages IA encadrés et contrôlés</li></ul><a class="btn btn--secondary" href="facturation-electronique.html">Découvrir notre approche digitale</a></div><div class="digital__panel reveal"><div class="digital-chip">Pennylane</div><div class="digital-chip">Silae</div><div class="digital-chip">Reporting</div><div class="digital-chip">E-facturation</div><div class="digital-chip">Automatisation</div><div class="digital-chip">IA</div></div></div></section>`);

  const contact = document.getElementById('contact');
  if (contact && !document.getElementById('faq')) contact.insertAdjacentHTML('beforebegin', `<section class="section section--cream" id="faq"><div class="container faq-wrap"><div class="section__head reveal"><p class="eyebrow">Questions fréquentes</p><h2>Choisir son expert-comptable</h2></div><div class="faq-list"><details class="faq-item reveal"><summary>Pourquoi choisir un expert-comptable à Paris ?</summary><p>Pour combiner proximité, rendez-vous physiques si nécessaire et accompagnement digital partout en France.</p></details><details class="faq-item reveal"><summary>Accompagnez-vous les start-up et PME avec Pennylane ?</summary><p>Oui. Nous adaptons les outils au fonctionnement de l'entreprise et à son niveau de maturité.</p></details><details class="faq-item reveal"><summary>Pouvez-vous créer une société ou une filiale en France ?</summary><p>Oui : structure, formalités, fiscalité, comptabilité, paie et suivi courant.</p></details><details class="faq-item reveal"><summary>Travaillez-vous en français et en anglais ?</summary><p>Oui, notamment pour les groupes étrangers qui s'implantent en France.</p></details></div></div></section>`);
})();
