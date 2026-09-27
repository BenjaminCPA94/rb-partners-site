// Load RB Partners visual and structural upgrades
(() => {
  const here = document.currentScript?.src || '';
  const base = here ? here.replace(/js\/main\.js(?:\?.*)?$/, '') : '';
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = `${base}css/site-upgrade.css`;
  document.head.appendChild(css);

  // Final polish is intentionally loaded after the main upgrade stylesheet so
  // the narrow-card typography and booking/reassurance UI win the cascade.
  const polishCss = document.createElement('link');
  polishCss.rel = 'stylesheet';
  polishCss.href = `${base}css/final-polish.css`;
  document.head.appendChild(polishCss);

  const upgrade = document.createElement('script');
  upgrade.src = `${base}js/site-upgrade.js`;
  upgrade.onload = () => {
    document.querySelectorAll('#secteurs .reveal, #digital-ia .reveal, #faq .reveal').forEach((el) => el.classList.add('is-visible'));
    const upgradedNav = document.getElementById('nav');
    upgradedNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      upgradedNav.classList.remove('is-open');
      document.getElementById('burger')?.setAttribute('aria-expanded', 'false');
    }));

    const polish = document.createElement('script');
    polish.src = `${base}js/final-polish.js`;
    document.head.appendChild(polish);
  };
  document.head.appendChild(upgrade);
})();

// Mobile navigation toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

if (nav) nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
  });
});

// Call dropdown
const callToggle = document.getElementById('call-toggle');
const callPanel = document.getElementById('call-panel');

if (callToggle && callPanel) {
  const closeCallPanel = () => {
    callPanel.classList.remove('is-open');
    callToggle.setAttribute('aria-expanded', 'false');
  };
  callToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = callPanel.classList.toggle('is-open');
    callToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', (e) => {
    if (!callPanel.contains(e.target) && e.target !== callToggle) closeCallPanel();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCallPanel(); });
}

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => observer.observe(el));

// Contact form — prepares a structured email without pretending a server submission occurred.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    const lang = window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr';
    const company = data.get('company') === 'etrangere'
      ? (lang === 'en' ? 'Foreign company / France market entry' : 'Société étrangère / implantation en France')
      : (lang === 'en' ? 'French company' : 'Société française');
    const subject = lang === 'en' ? 'Contact request — RB Partners' : 'Demande de contact — RB Partners';
    const body = lang === 'en'
      ? `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${company}\n\nMessage:\n${data.get('message')}`
      : `Nom : ${data.get('name')}\nEmail : ${data.get('email')}\nSociété : ${company}\n\nMessage :\n${data.get('message')}`;
    status.textContent = window.rbI18n ? window.rbI18n.get('form.success') : 'Votre messagerie va s’ouvrir avec votre demande préremplie.';
    window.location.href = `mailto:contact@rb-partners.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
