(() => {
  const getLang = () => window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';
  const isHome = !!document.querySelector('.hero');

  function polishVisibleCopy() {
    const l = getLang();
    const missionLead = document.querySelector('#expertises .section__lead');
    if (missionLead) {
      missionLead.textContent = l === 'en'
        ? 'Compliance, management, people, legal, owner-manager advice and e-invoicing, brought together in one firm.'
        : 'Conformité, pilotage, social, juridique, conseil au dirigeant et facturation électronique, réunis au sein d’un même cabinet.';
    }

    const cards = [...document.querySelectorAll('.v5-modern-card')];
    const french = [
      'Comptabilité, fiscalité, paie et juridique courant, organisés autour de vos obligations françaises.',
      'Reporting FR / EN, coordination avec le siège et lecture claire des sujets français.',
      'Pennylane, Silae et des échanges digitalisés pour simplifier la collecte et le suivi.',
      'Deux associés identifiés, au plus près du dossier et des décisions.'
    ];
    const english = [
      'Accounting, tax, payroll and recurring legal work organised around French requirements.',
      'FR / EN reporting, head-office coordination and clear explanations of French matters.',
      'Pennylane, Silae and digital workflows that simplify collection and follow-up.',
      'Two identified partners who stay close to the file and key decisions.'
    ];
    cards.forEach((card, i) => {
      const p = card.querySelector('p');
      if (p && (l === 'en' ? english[i] : french[i])) p.textContent = l === 'en' ? english[i] : french[i];
    });

    /* Remove the spaced long-dash punctuation pattern that can feel overly generated. */
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION)$/.test(parent.tagName)) return;
      if (node.nodeValue && /\s[—–]\s/.test(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(/\s+[—–]\s+/g, ', ');
      }
    });
  }

  function buildTrustBand() {
    if (!isHome) return;
    const strip = document.querySelector('.trust-strip');
    const grid = document.getElementById('v2-trust');
    if (!strip || !grid) return;
    const l = getLang();

    strip.className = 'rb-trust-band';
    grid.className = 'container rb-trust-band__inner';
    grid.innerHTML = l === 'en' ? `
      <div class="rb-trust-stat">
        <div class="rb-trust-stat__value"><span data-count="5" data-decimals="1">0.0</span><small>/5</small><span class="rb-trust-stat__stars">★★★★★</span></div>
        <div class="rb-trust-stat__label">Client rating</div>
      </div>
      <div class="rb-trust-stat">
        <div class="rb-trust-stat__value"><span data-count="50">0</span><small>+</small></div>
        <div class="rb-trust-stat__label">Clients supported</div>
      </div>
      <div class="rb-trust-stat">
        <div class="rb-trust-stat__value"><span data-count="48">0</span><small>h</small></div>
        <div class="rb-trust-stat__label">Average response time</div>
      </div>` : `
      <div class="rb-trust-stat">
        <div class="rb-trust-stat__value"><span data-count="5" data-decimals="1">0,0</span><small>/5</small><span class="rb-trust-stat__stars">★★★★★</span></div>
        <div class="rb-trust-stat__label">Note clients</div>
      </div>
      <div class="rb-trust-stat">
        <div class="rb-trust-stat__value"><span data-count="50">0</span><small>+</small></div>
        <div class="rb-trust-stat__label">Clients accompagnés</div>
      </div>
      <div class="rb-trust-stat">
        <div class="rb-trust-stat__value"><span data-count="48">0</span><small>h</small></div>
        <div class="rb-trust-stat__label">Délai de réponse moyen</div>
      </div>`;

    const counters = [...grid.querySelectorAll('[data-count]')];
    const animate = () => counters.forEach(el => {
      const target = Number(el.dataset.count || 0);
      const decimals = Number(el.dataset.decimals || 0);
      const start = performance.now();
      const duration = 900;
      const step = now => {
        const k = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - k, 3);
        const value = target * eased;
        el.textContent = decimals ? value.toFixed(decimals).replace('.', l === 'fr' ? ',' : '.') : String(Math.round(value));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) { animate(); io.disconnect(); }
      }, { threshold: .45 });
      io.observe(strip);
    } else animate();
  }

  function removeReviewPlaceholder() {
    document.getElementById('v4-reviews')?.remove();
  }

  // Online booking pages, one per partner (Google Calendar appointment
  // schedule, Microsoft Bookings, Calendly...). While both are empty the
  // modal keeps showing the preview calendar below. Fill in a URL to switch
  // that partner to the real, calendar-synced booking page.
  const BOOKING_LINKS = { rachel: '', benjamin: '' };
  const PARTNER_NAMES = { rachel: 'Rachel Illouz', benjamin: 'Benjamin Haziza' };
  const MAX_MONTHS_AHEAD = 6;

  function calendarMarkup(monthOffset) {
    const l = getLang();
    const today = new Date();
    const view = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const month = new Intl.DateTimeFormat(l === 'en' ? 'en-GB' : 'fr-FR', { month: 'long', year: 'numeric' }).format(view);
    const days = l === 'en' ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : ['lun.','mar.','mer.','jeu.','ven.','sam.','dim.'];
    const offset = (view.getDay() + 6) % 7;
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let cells = days.map(d => `<span>${d}</span>`).join('');
    for (let i = 0; i < offset; i++) cells += '<span></span>';
    for (let d = 1; d <= count; d++) {
      const date = new Date(view.getFullYear(), view.getMonth(), d);
      const past = date < startOfToday;
      const weekend = date.getDay() === 0 || date.getDay() === 6;
      cells += `<button type="button" data-day="${d}" ${past || weekend ? 'disabled' : ''}>${d}</button>`;
    }
    const label = month.charAt(0).toUpperCase() + month.slice(1);
    const prevLabel = l === 'en' ? 'Previous month' : 'Mois précédent';
    const nextLabel = l === 'en' ? 'Next month' : 'Mois suivant';
    return `<div class="rb-calendar"><div class="rb-calendar__head"><button type="button" class="rb-calendar__nav" data-month-nav="-1" aria-label="${prevLabel}" ${monthOffset <= 0 ? 'disabled' : ''}>‹</button><strong aria-live="polite">${label}</strong><button type="button" class="rb-calendar__nav" data-month-nav="1" aria-label="${nextLabel}" ${monthOffset >= MAX_MONTHS_AHEAD ? 'disabled' : ''}>›</button></div><div class="rb-calendar__grid">${cells}</div></div>`;
  }

  function renderBooking(backdrop) {
    const l = getLang();
    const layout = backdrop.querySelector('.rb-booking-layout');
    const smallEl = backdrop.querySelector('.rb-booking-title small');
    const subEl = backdrop.querySelector('.rb-booking-title p');
    const sideEl = backdrop.querySelector('.rb-booking-side-note');
    const person = backdrop.dataset.person || '';
    const live = Object.values(BOOKING_LINKS).some(Boolean);

    if (!live) {
      const offset = Number(backdrop.dataset.month || 0);
      layout.innerHTML = `${calendarMarkup(offset)}<div class="rb-time-panel"><h4>${l === 'en' ? 'Available times' : 'Créneaux disponibles'}</h4><div class="rb-time-list">${['09:00','10:00','11:30','14:00','15:30','17:00'].map(t => `<button type="button" data-time="${t}">${t}</button>`).join('')}</div><div class="rb-booking-placeholder">${l === 'en' ? 'Test interface only. These sample slots do not create a booking. The real partner availability and confirmation flow will be connected before launch.' : 'Interface de test uniquement. Ces créneaux sont fictifs et ne créent aucun rendez-vous. Les disponibilités réelles et la confirmation seront connectées avant la mise en ligne.'}</div></div>`;
      return;
    }

    if (smallEl) smallEl.textContent = '';
    if (sideEl) sideEl.textContent = l === 'en'
      ? 'You book straight into the chosen partner’s calendar and receive a confirmation by email.'
      : 'Vous réservez directement dans l’agenda de l’associé choisi et recevez une confirmation par e-mail.';
    const url = BOOKING_LINKS[person];
    layout.classList.add('rb-booking-layout--live');
    if (!person) {
      if (subEl) subEl.textContent = '';
      layout.innerHTML = `<div class="rb-booking-empty">${l === 'en' ? 'Choose the partner you would like to speak with to see their availability.' : 'Choisissez l’associé avec qui vous souhaitez échanger pour voir ses disponibilités.'}</div>`;
    } else if (!url) {
      if (subEl) subEl.textContent = PARTNER_NAMES[person];
      layout.innerHTML = `<div class="rb-booking-empty">${l === 'en' ? 'Online booking is not available for this partner yet. Please choose the other partner, or write to us.' : 'La réservation en ligne n’est pas encore disponible pour cet associé. Choisissez l’autre associé, ou écrivez-nous.'}</div>`;
    } else {
      if (subEl) subEl.textContent = (l === 'en' ? 'Calendar of ' : 'Agenda de ') + PARTNER_NAMES[person];
      const safe = url.replace(/"/g, '&quot;');
      layout.innerHTML = `<div class="rb-booking-embed"><iframe src="${safe}" title="${l === 'en' ? 'Book a meeting with ' : 'Prendre rendez-vous avec '}${PARTNER_NAMES[person]}" loading="lazy"></iframe><a class="rb-booking-external" href="${safe}" target="_blank" rel="noopener">${l === 'en' ? 'Page not showing? Open the booking page in a new tab' : 'La page ne s’affiche pas ? Ouvrir la réservation dans un nouvel onglet'} ↗</a></div>`;
    }
  }

  function ensureBookingModal() {
    if (document.getElementById('rb-booking-backdrop')) return document.getElementById('rb-booking-backdrop');
    const l = getLang();
    const nested = /\/(expertises|simulateurs|blog)\//.test(location.pathname);
    const rachelSrc = document.querySelector('img[src*="rachel-rb.jpg"]')?.src || (nested ? '../assets/rachel-rb.jpg' : 'assets/rachel-rb.jpg');
    const benjaminSrc = document.querySelector('img[src*="benjamin-rb.jpg"]')?.src || (nested ? '../assets/benjamin-rb.jpg' : 'assets/benjamin-rb.jpg');
    const backdrop = document.createElement('div');
    backdrop.id = 'rb-booking-backdrop';
    backdrop.className = 'rb-booking-backdrop';
    backdrop.dataset.month = '0';
    backdrop.innerHTML = `<div class="rb-booking-modal" role="dialog" aria-modal="true" aria-label="${l === 'en' ? 'Book a meeting' : 'Prendre rendez-vous'}">
      <aside class="rb-booking-side">
        <p class="eyebrow">${l === 'en' ? 'First conversation' : 'Premier échange'}</p>
        <h2>${l === 'en' ? '30 minutes to discuss your project' : '30 minutes pour parler de votre projet'}</h2>
        <p class="rb-booking-side-note">${l === 'en' ? 'Choose the partner you would like to speak with. The real availability will be connected before launch.' : 'Choisissez l’associé avec qui vous souhaitez échanger. Les disponibilités réelles seront connectées avant la mise en ligne.'}</p>
        <div class="rb-booking-persons">
          <button type="button" class="rb-booking-person" data-person="rachel"><img src="${rachelSrc}" alt="Rachel Illouz"><span><strong>Rachel Illouz</strong><span>${l === 'en' ? 'International & France market entry' : 'International & implantation en France'}</span></span></button>
          <button type="button" class="rb-booking-person" data-person="benjamin"><img src="${benjaminSrc}" alt="Benjamin Haziza"><span><strong>Benjamin Haziza</strong><span>${l === 'en' ? 'Start-ups & entrepreneurs' : 'Start-up, entrepreneurs & indépendants'}</span></span></button>
        </div>
      </aside>
      <div class="rb-booking-main">
        <button class="rb-booking-close" type="button" aria-label="${l === 'en' ? 'Close' : 'Fermer'}">×</button>
        <div class="rb-booking-title"><small>${l === 'en' ? 'Preview' : 'Aperçu'}</small><h3>${l === 'en' ? 'Choose a date and time' : 'Sélectionnez une date et un horaire'}</h3><p>${l === 'en' ? 'Central European time' : 'Heure d’Europe centrale'}</p></div>
        <div class="rb-booking-layout"></div>
      </div>
    </div>`;
    document.body.appendChild(backdrop);

    const close = () => { backdrop.classList.remove('is-open'); document.body.classList.remove('rb-modal-open'); };
    backdrop.querySelector('.rb-booking-close')?.addEventListener('click', close);
    backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && backdrop.classList.contains('is-open')) close(); });
    backdrop.querySelectorAll('[data-person]').forEach(btn => btn.addEventListener('click', () => selectPerson(btn.dataset.person)));

    // Delegated so the layout can be re-rendered (month change, partner change).
    backdrop.querySelector('.rb-booking-layout').addEventListener('click', e => {
      const nav = e.target.closest('[data-month-nav]');
      if (nav) {
        const next = Math.min(MAX_MONTHS_AHEAD, Math.max(0, Number(backdrop.dataset.month || 0) + Number(nav.dataset.monthNav)));
        backdrop.dataset.month = String(next);
        renderBooking(backdrop);
        return;
      }
      const day = e.target.closest('[data-day]');
      if (day && !day.disabled) {
        backdrop.querySelectorAll('[data-day]').forEach(x => x.classList.remove('is-selected'));
        day.classList.add('is-selected');
        return;
      }
      const time = e.target.closest('[data-time]');
      if (time) {
        backdrop.querySelectorAll('[data-time]').forEach(x => x.classList.remove('is-selected'));
        time.classList.add('is-selected');
      }
    });
    renderBooking(backdrop);
    return backdrop;
  }

  function selectPerson(person) {
    const backdrop = document.getElementById('rb-booking-backdrop');
    if (!backdrop) return;
    backdrop.dataset.person = person || '';
    backdrop.querySelectorAll('[data-person]').forEach(btn => btn.classList.toggle('is-selected', btn.dataset.person === person));
    renderBooking(backdrop);
  }

  function bindBooking() {
    ensureBookingModal();
    document.querySelectorAll('[data-booking]').forEach(link => {
      if (link.dataset.rbBookingBound) return;
      link.dataset.rbBookingBound = '1';
      link.addEventListener('click', e => {
        e.preventDefault();
        const backdrop = ensureBookingModal();
        const person = link.dataset.booking;
        selectPerson(person === 'rachel' || person === 'benjamin' ? person : '');
        backdrop.classList.add('is-open');
        document.body.classList.add('rb-modal-open');
        backdrop.querySelector('.rb-booking-close')?.focus();
      });
    });
  }

  function init() {
    polishVisibleCopy();
    buildTrustBand();
    removeReviewPlaceholder();
    bindBooking();
    document.documentElement.dataset.finalPolish = 'ready';
  }

  init();
  document.addEventListener('rb:langchange', () => setTimeout(() => {
    document.getElementById('rb-booking-backdrop')?.remove();
    init();
  }, 0));
})();
