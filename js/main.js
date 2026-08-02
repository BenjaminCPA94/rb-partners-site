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

// Contact form — sent via FormSubmit.co (no backend required).
// First submission to a new address triggers a one-time confirmation email from FormSubmit
// that must be approved before messages start arriving.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const CONTACT_FORM_ENDPOINT = 'https://formsubmit.co/ajax/contact@rb-partners.fr';

function t(key, fallback) {
  const val = window.rbI18n ? window.rbI18n.get(key) : null;
  return val !== null && val !== undefined ? val : fallback;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.classList.remove('form__status--error');
    status.textContent = t('form.sending', 'Envoi en cours…');

    fetch(CONTACT_FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        status.textContent = t('form.success', 'Merci, votre message a bien été enregistré. Nous revenons vers vous rapidement.');
        form.reset();
      })
      .catch(() => {
        status.classList.add('form__status--error');
        status.textContent = t('form.error', "Une erreur est survenue. Vous pouvez nous écrire directement à contact@rb-partners.fr.");
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
