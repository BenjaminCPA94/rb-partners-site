(() => {
  function applySeoLinks() {
    const logoHref = document.querySelector('.logo')?.getAttribute('href') || 'index.html';
    const prefix = logoHref.startsWith('../') ? '../' : '';
    const lang = window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';
    // Navigation is now fully managed by site-upgrade.js. Do not override mission labels here.

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
