// Meyvin — blog and resource pages: summary and FAQ in the reader's language,
// table of contents that follows the reading, related articles, topic filters.
(() => {
  const LIST = {"fr": [{"href": "prix-transfert-reporting.html", "title": "Reporting international et prix de transfert : ce que les filiales françaises doivent anticiper", "cat": "International"}, {"href": "cotisations-sociales-paie.html", "title": "Cotisations sociales et paie : comment organiser votre veille réglementaire", "cat": "Social"}, {"href": "loi-de-finances-entreprises.html", "title": "Loi de finances : comment anticiper chaque année les changements fiscaux de votre entreprise", "cat": "Fiscalité"}, {"href": "facturation-electronique.html", "title": "Facturation électronique obligatoire : ce qui change pour votre entreprise", "cat": "Fiscalité"}, {"href": "creer-entreprise-france.html", "title": "Créer son entreprise en France : les 5 étapes clés", "cat": "Création d'entreprise"}, {"href": "implantation-structure-etrangere.html", "title": "Filiale, succursale ou bureau de liaison : comment choisir sa structure d'implantation en France", "cat": "International"}], "en": [{"href": "transfer-pricing-france.html", "title": "International reporting and transfer pricing: what French subsidiaries need to anticipate", "cat": "International"}, {"href": "payroll-social-contributions-watch.html", "title": "Payroll and social contributions: how to organise your regulatory watch", "cat": "Social &amp; HR"}, {"href": "finance-law-changes-france.html", "title": "Finance Law: how to anticipate yearly tax changes for your business", "cat": "Tax"}, {"href": "e-invoicing-reform-france.html", "title": "Mandatory e-invoicing : what's changing for your business", "cat": "Tax"}, {"href": "starting-a-company-in-france.html", "title": "Starting a business in France : the 5 key steps", "cat": "Company Formation"}, {"href": "setting-up-foreign-structure-france.html", "title": "Subsidiary, branch or liaison office : how to choose your setup structure in France", "cat": "International"}]};
  const lang = () => ((window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr') === 'en' ? 'en' : 'fr');
  const file = location.pathname.split('/').pop() || 'index.html';
  const inner = document.querySelector('.article-body__inner');
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let tocIO = null;

  // blocks written in both languages on the French pages
  const applyLang = () => document.querySelectorAll('[data-lang]').forEach((el) => { el.hidden = el.dataset.lang !== lang(); });

  const buildToc = () => {
    tocIO?.disconnect();
    document.querySelector('.post-toc')?.remove();
    if (!inner) return;
    const heads = [...inner.querySelectorAll('h2')].filter((h) => !h.closest('[hidden]'));
    if (heads.length < 3) return;
    heads.forEach((h, i) => { h.id = `partie-${i + 1}`; });
    const nav = document.createElement('nav');
    nav.className = 'post-toc';
    nav.setAttribute('aria-label', lang() === 'en' ? 'Contents' : 'Sommaire');
    nav.innerHTML = `<strong>${lang() === 'en' ? 'Contents' : 'Sommaire'}</strong><ol>${heads.map((h) => `<li><a href="#${h.id}">${esc(h.textContent.trim().replace(/^\d+\.\s*/, ''))}</a></li>`).join('')}</ol>`;
    inner.parentElement.prepend(nav);
    const links = [...nav.querySelectorAll('a')];
    tocIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('is-on', a.getAttribute('href') === `#${e.target.id}`));
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    heads.forEach((h) => tocIO.observe(h));
  };

  const buildRelated = () => {
    document.querySelector('.post-related')?.remove();
    if (!inner) return;
    const l = lang();
    let idx = LIST.fr.findIndex((a) => a.href === file);
    if (idx < 0) idx = LIST.en.findIndex((a) => a.href === file);
    if (idx < 0) return;
    const cat = LIST[l][idx].cat;
    const others = LIST[l].map((a, i) => ({ ...a, i })).filter((a) => a.i !== idx).sort((a, b) => (b.cat === cat) - (a.cat === cat)).slice(0, 3);
    const box = document.createElement('section');
    box.className = 'post-related';
    box.innerHTML = `<h2>${l === 'en' ? 'Read next' : 'À lire aussi'}</h2><div class="post-related__grid">${others.map((a) => `<a class="post-related__card" href="${a.href}"><span>${esc(a.cat)}</span><strong>${esc(a.title)}</strong><em>${l === 'en' ? 'Read the article' : 'Lire l’article'} →</em></a>`).join('')}</div>`;
    const nav = inner.parentElement.querySelector('.article-nav');
    if (nav) nav.before(box); else inner.after(box);
  };

  // index pages (blog, calculators): filter the cards by topic
  const buildFilters = () => {
    const first = document.querySelector('main .grid .blog-card__category');
    const grid = first?.closest('.grid');
    if (!grid) return;
    grid.parentElement.querySelector('.ed-filters')?.remove();
    const cards = [...grid.children].filter((c) => c.querySelector('.blog-card__category'));
    const cats = [...new Set(cards.map((c) => c.querySelector('.blog-card__category').textContent.trim()))];
    if (cats.length < 2) return;
    const bar = document.createElement('div');
    bar.className = 'ed-filters';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', lang() === 'en' ? 'Filter by topic' : 'Filtrer par thème');
    bar.innerHTML = [lang() === 'en' ? 'All' : 'Tous', ...cats].map((c, i) => `<button type="button" aria-pressed="${i === 0}" data-cat="${i === 0 ? '' : esc(c)}">${esc(c)}</button>`).join('');
    grid.before(bar);
    cards.forEach((c) => { c.hidden = false; });
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      bar.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      cards.forEach((c) => {
        const show = !btn.dataset.cat || c.querySelector('.blog-card__category').textContent.trim() === btn.dataset.cat;
        c.hidden = !show;
        if (show) { c.classList.remove('ed-pop'); void c.offsetWidth; c.classList.add('ed-pop'); }
      });
    });
  };

  const run = () => { applyLang(); buildToc(); buildRelated(); buildFilters(); };
  run();
  document.addEventListener('rb:langchange', () => setTimeout(run, 80));
})();
