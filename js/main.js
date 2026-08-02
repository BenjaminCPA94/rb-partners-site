// Mobile navigation toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCallPanel();
  });
}

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// Contact form (client-side only — connect to a backend or form service to send real emails)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    status.textContent = window.rbI18n ? window.rbI18n.get('form.success') : 'Merci, votre message a bien été enregistré. Nous revenons vers vous rapidement.';
    form.reset();
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
