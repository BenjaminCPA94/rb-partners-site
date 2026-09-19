(() => {

  function flattenPageJourney() {
    // These SEO landing pages are final destinations: no extra "drawer" of related pages.
    const crosslinks = document.querySelector('.seo-crosslinks');
    crosslinks?.closest('section')?.remove();

    // Keep one primary action only. The secondary hero link was sending visitors
    // deeper into another service page and made the journey feel fragmented.
    document.querySelector('.seo-hero__actions .btn--ghost')?.remove();

    // Make the final CTA the clear exit toward a conversation with RB Partners.
    const finalCta = document.querySelector('.expertise-cta .btn');
    if (finalCta) {
      finalCta.textContent = (window.rbI18n?.getLang?.() || document.documentElement.lang) === 'en'
        ? 'Book a meeting'
        : 'Prendre rendez-vous';
    }
  }
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

  const init = () => { applyPageLanguage(window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr'); flattenPageJourney(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();

  document.addEventListener('rb:langchange', (event) => {
    applyPageLanguage(event.detail?.lang || 'fr'); flattenPageJourney();
  });
})();
