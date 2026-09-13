(() => {
  function applySeoLinks() {
    const logoHref = document.querySelector('.logo')?.getAttribute('href') || 'index.html';
    const prefix = logoHref.startsWith('../') ? '../' : '';
    const lang = window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';
    const groups = document.querySelectorAll('#nav .nav-group');
    const businessMenu = groups[1]?.querySelector('.nav-dropdown');

    if (businessMenu) {
      businessMenu.innerHTML = lang === 'en'
        ? `<a href="${prefix}expert-comptable-startup.html">Startups & scale-ups</a><a href="${prefix}expert-comptable-pme.html">SMEs</a><a href="${prefix}expert-comptable-international.html">International companies</a><a href="${prefix}expert-comptable-paris.html">Accountant in Paris</a>`
        : `<a href="${prefix}expert-comptable-startup.html">Start-up & scale-up</a><a href="${prefix}expert-comptable-pme.html">TPE & PME</a><a href="${prefix}expert-comptable-international.html">Sociétés internationales</a><a href="${prefix}expert-comptable-paris.html">Expert-comptable à Paris</a>`;
    }

    const cards = document.querySelectorAll('#secteurs .audience-card');
    const cardLinks = [
      ['expert-comptable-startup.html', lang === 'en' ? 'Discover our startup support' : 'Voir notre accompagnement start-up'],
      ['expert-comptable-pme.html', lang === 'en' ? 'Discover our SME support' : 'Voir notre accompagnement PME'],
      ['expert-comptable-international.html', lang === 'en' ? 'Discover international support' : 'Voir notre accompagnement international']
    ];
    cardLinks.forEach(([href, label], index) => {
      const card = cards[index];
      if (!card) return;
      card.querySelector('.audience-card__link')?.remove();
      card.insertAdjacentHTML('beforeend', `<a class="audience-card__link" href="${prefix}${href}">${label} →</a>`);
    });

    const digitalButton = document.querySelector('#digital-ia .btn');
    if (digitalButton) {
      digitalButton.href = `${prefix}expert-comptable-pennylane.html`;
      digitalButton.textContent = lang === 'en' ? 'Explore our digital accounting approach' : 'Découvrir notre approche comptable digitale';
    }
  }

  applySeoLinks();
  document.addEventListener('rb:langchange', applySeoLinks);
})();
