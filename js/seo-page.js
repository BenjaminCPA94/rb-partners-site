(() => {
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

  document.addEventListener('DOMContentLoaded', () => {
    applyPageLanguage(window.rbI18n?.getLang?.() || 'fr');
  });

  document.addEventListener('rb:langchange', (event) => {
    applyPageLanguage(event.detail?.lang || 'fr');
  });
})();
