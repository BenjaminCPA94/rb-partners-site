// Meyvin — contact shortcut on every page: a WhatsApp button that opens a
// small panel with both partners (WhatsApp, phone call). Numbers are the ones
// already published in the contact section of the homepage.
(() => {
  const here = document.currentScript?.src || '';
  const base = here ? here.replace(/js\/contact-fab\.js(?:\?.*)?$/, '') : '';
  const lang = () => ((window.rbI18n?.getLang?.() || document.documentElement.lang || 'fr') === 'en' ? 'en' : 'fr');

  const PEOPLE = [
    { id: 'rachel', name: 'Rachel Illouz', tel: '+33624126769', shown: '06 24 12 67 69', photo: 'assets/rachel-rb.jpg',
      role: { fr: 'International & implantation en France', en: 'International & setting up in France' },
      hello: { fr: 'Bonjour Rachel, je vous contacte depuis le site Meyvin.', en: 'Hello Rachel, I am contacting you from the Meyvin website.' } },
    { id: 'benjamin', name: 'Benjamin Haziza', tel: '+33761534670', shown: '07 61 53 46 70', photo: 'assets/benjamin-rb.jpg',
      role: { fr: 'Start-up, entrepreneurs & indépendants', en: 'Start-ups, entrepreneurs & independent professionals' },
      hello: { fr: 'Bonjour Benjamin, je vous contacte depuis le site Meyvin.', en: 'Hello Benjamin, I am contacting you from the Meyvin website.' } },
  ];
  const TXT = {
    fr: { open: 'Nous contacter sur WhatsApp', close: 'Fermer', title: 'Nous contacter', lead: 'Écrivez-nous sur WhatsApp ou appelez directement l’un des deux associés.', wa: 'WhatsApp', call: 'Appeler', note: 'Réponse en général sous un jour ouvré.' },
    en: { open: 'Contact us on WhatsApp', close: 'Close', title: 'Get in touch', lead: 'Message us on WhatsApp or call one of the two partners directly.', wa: 'WhatsApp', call: 'Call', note: 'We usually reply within one business day.' },
  };
  // WhatsApp glyph (Simple Icons, CC0)
  const WA = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  const PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

  const css = `
.mw-fab{position:fixed;left:18px;bottom:18px;z-index:9000;font-family:'Inter',-apple-system,'Segoe UI',sans-serif}
.mw-fab__btn{display:grid;place-items:center;width:56px;height:56px;border:0;border-radius:50%;background:#0f7a45;color:#fff;cursor:pointer;box-shadow:0 12px 28px rgba(8,20,38,.28),0 0 0 4px rgba(255,255,255,.9);transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .3s ease}
.mw-fab__btn:hover{transform:translateY(-3px) scale(1.05)}
.mw-fab__btn:focus-visible{outline:3px solid #0b1d3a;outline-offset:3px}
.mw-fab__btn svg{width:28px;height:28px}
.mw-fab__btn .mw-x{display:none;font-size:1.6rem;line-height:1}
.mw-fab.is-open .mw-fab__btn svg{display:none}
.mw-fab.is-open .mw-fab__btn .mw-x{display:block}
.mw-fab__panel{position:absolute;left:0;bottom:70px;width:min(368px,calc(100vw - 36px));padding:20px;border-radius:14px;background:#fffdf8;border:1px solid rgba(11,29,58,.12);box-shadow:0 30px 60px rgba(8,20,38,.25);opacity:0;visibility:hidden;transform:translateY(12px) scale(.98);transform-origin:bottom left;transition:opacity .25s ease,transform .4s cubic-bezier(.16,1,.3,1),visibility .25s}
.mw-fab.is-open .mw-fab__panel{opacity:1;visibility:visible;transform:none}
.mw-fab__panel h2{margin:0 0 6px;font:700 1.25rem/1.2 'Playfair Display',Georgia,serif;color:#0b1d3a}
.mw-fab__panel p{margin:0 0 14px;font-size:.86rem;line-height:1.5;color:#5d6573}
.mw-p{display:grid;grid-template-columns:48px 1fr;gap:12px;align-items:center;padding:12px 0;border-top:1px solid rgba(11,29,58,.1)}
.mw-p img{width:48px;height:48px;border-radius:50%;object-fit:cover;object-position:50% 18%;box-shadow:0 0 0 2px #fffdf8,0 0 0 3.5px #1f4fd6}
.mw-p strong{display:block;font-size:.95rem;color:#0b1d3a}
.mw-p small{display:block;font-size:.76rem;color:#5d6573;line-height:1.35}
.mw-p__act{grid-column:1 / -1;display:flex;gap:8px}
.mw-p__act a{flex:1 1 auto;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 12px;border-radius:999px;font-size:.82rem;font-weight:600;white-space:nowrap;text-decoration:none;transition:transform .25s ease,background .25s ease}
.mw-p__act a:hover{transform:translateY(-2px)}
.mw-p__act svg{width:17px;height:17px;flex:none}
.mw-p__wa{background:#0f7a45;color:#fff}
.mw-p__wa:hover{background:#1ebe5b}
.mw-p__tel{background:#0b1d3a;color:#fff}
.mw-p__tel:hover{background:#142c54}
.mw-fab__note{margin:10px 0 0 !important;font-size:.74rem !important;color:#8a94a3 !important}
body.rb-modal-open .mw-fab{display:none}
@media (max-width:560px){.mw-fab{left:12px;bottom:12px}.mw-fab__btn{width:52px;height:52px}}
@media (prefers-reduced-motion:reduce){.mw-fab__btn,.mw-fab__panel,.mw-p__act a{transition:none}}`;

  let root = null;
  const link = (p) => `https://wa.me/${p.tel.replace('+', '')}?text=${encodeURIComponent(p.hello[lang()])}`;

  const render = () => {
    const t = TXT[lang()];
    root.querySelector('.mw-fab__btn').setAttribute('aria-label', root.classList.contains('is-open') ? t.close : t.open);
    root.querySelector('.mw-fab__panel').innerHTML = `<h2>${t.title}</h2><p>${t.lead}</p>${PEOPLE.map((p) => `<div class="mw-p"><img src="${base}${p.photo}" alt="${p.name}" width="48" height="48" loading="lazy"><div><strong>${p.name}</strong><small>${p.role[lang()]}</small></div><div class="mw-p__act"><a class="mw-p__wa" href="${link(p)}" target="_blank" rel="noopener">${WA}${t.wa}</a><a class="mw-p__tel" href="tel:${p.tel}">${PHONE}${t.call} ${p.shown}</a></div></div>`).join('')}<p class="mw-fab__note">${t.note}</p>`;
  };

  const set = (open) => {
    root.classList.toggle('is-open', open);
    root.querySelector('.mw-fab__btn').setAttribute('aria-expanded', String(open));
    render();
  };

  const mount = () => {
    if (document.querySelector('.mw-fab')) return;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    root = document.createElement('div');
    root.className = 'mw-fab';
    root.innerHTML = `<button type="button" class="mw-fab__btn" aria-expanded="false" aria-controls="mw-panel">${WA}<span class="mw-x" aria-hidden="true">×</span></button><div class="mw-fab__panel" id="mw-panel" role="dialog"></div>`;
    document.body.appendChild(root);
    render();
    root.querySelector('.mw-fab__btn').addEventListener('click', () => set(!root.classList.contains('is-open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('is-open')) { set(false); root.querySelector('.mw-fab__btn').focus(); } });
    document.addEventListener('click', (e) => { if (root.classList.contains('is-open') && !root.contains(e.target)) set(false); });
    document.addEventListener('rb:langchange', () => setTimeout(render, 60));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
