#!/usr/bin/env python3
"""One-off migration of the inner pages to the "DA Figma" design (see css/da-site.css).

For every page except the two home pages (they have their own template, tools/build_home.py):
  - the decorative layers editorial.css, immersive.css and homepage-polish.css are no longer linked;
    css/da-site.css is linked in their place;
  - the opening curtain (script + inline style) and the `ed` class on <html> are removed;
  - the header and footer logo become the lower-case wordmark "meyvin" with its dot.
"""
import re, glob

SKIP = {'index.html', 'french-accountant-paris.html', 'logos.html', 'proposition-interactive.html'}
n = 0
for f in sorted(glob.glob('*.html') + glob.glob('*/*.html')):
    if f in SKIP: continue
    t = open(f, encoding='utf-8').read(); o = t
    pre = '../' if '/' in f else ''
    for sheet in ('immersive', 'homepage-polish'):
        t = re.sub(r'<link rel="stylesheet" href="(?:\.\./)?css/%s\.css">\n?' % sheet, '', t)
    if 'css/da-site.css' not in t:
        t = re.sub(r'<link rel="stylesheet" href="((?:\.\./)?)css/editorial\.css">', r'<link rel="stylesheet" href="\1css/da-site.css">', t)
    t = re.sub(r'<script>/\* Rideau d\'ouverture.*?</script>\n?', '', t, flags=re.S)
    t = re.sub(r'<style>html\.ed::before\{.*?</style>\n?', '', t, flags=re.S)
    t = re.sub(r'(<html lang="\w+") class="ed"', r'\1', t)
    # header logo
    t = re.sub(r'<a href="([^"]*)" class="logo"><span class="logo__mark">M</span><span class="logo__text">Meyvin</span></a>',
               r'<a href="\1" class="logo" aria-label="Meyvin">meyvin<b></b></a>', t)
    # footer logo (static copy)
    en = '<html lang="en"' in t
    home = pre + ('french-accountant-paris.html' if en else 'index.html')
    t = t.replace('<div class="footer__brand"><span class="logo__mark logo__mark--footer">M</span><span>Meyvin</span></div>',
                  f'<a class="logo logo--footer" href="{home}" aria-label="Meyvin">meyvin<b></b></a>')
    if t != o: open(f, 'w', encoding='utf-8').write(t); n += 1
print('pages migrées:', n)
