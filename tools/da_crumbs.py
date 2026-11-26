#!/usr/bin/env python3
"""Inserts a breadcrumb at the top of the hero of every inner page that has a standard hero
(.mission-hero, .seo-hero, .cab-hero) and no breadcrumb yet. Idempotent: run from the repository root."""
import re, glob, os

CABINET = {'les-associes.html': ('Le cabinet', 'Les associés'), 'notre-approche.html': ('Le cabinet', 'Notre approche'),
           'the-partners.html': ('The firm', 'The partners'), 'our-approach.html': ('The firm', 'Our approach')}
EXPERTISE_ROOT = {'conseil-dirigeant.html', 'facturation-electronique.html', 'owner-manager-advisory-france.html', 'e-invoicing-france.html'}
RESOURCE = {'tarif-expert-comptable.html', 'accountant-fees-france.html', 'changer-expert-comptable.html', 'switch-accountant-france.html',
            'expert-comptable-en-ligne.html', 'online-accountant-france.html'}
SKIP = {'index.html', 'french-accountant-paris.html', '404.html', 'logos.html', 'proposition-interactive.html'}
HERO = re.compile(r'(<section class="(?:mission-hero|seo-hero|cab-hero)[^"]*"[^>]*>\s*<div class="container[^"]*">)')

def esc(s): return s.replace('&', '&amp;') if '&amp;' not in s else s

done = skipped = 0
for f in sorted(glob.glob('*.html') + glob.glob('expertises/*.html')):
    if f in SKIP: continue
    s = open(f, encoding='utf-8').read()
    if 'da-crumb' in s or 'class="breadcrumb' in s: continue
    m = HERO.search(s)
    if not m: skipped += 1; continue
    en = '<html lang="en"' in s
    up = '../' if '/' in f else ''
    home = up + ('french-accountant-paris.html' if en else 'index.html')
    name = os.path.basename(f)
    eb = re.search(r'class="eyebrow[^"]*"[^>]*>(.*?)</p>', s[m.end():m.end() + 600], re.S)
    label = re.sub(r'<[^>]+>', '', eb.group(1)).strip() if eb else ''
    parents = []
    if name in CABINET:
        parents.append((CABINET[name][0], up + ('the-partners.html' if en else 'les-associes.html')))
        label = CABINET[name][1]
    elif '/' in f or name in EXPERTISE_ROOT:
        parents.append(('Our expertise' if en else 'Nos expertises', home + '#expertises'))
    elif name in RESOURCE:
        parents.append(('Resources' if en else 'Ressources', home + '#ressources'))
    if not label: skipped += 1; continue
    items = [('Home' if en else 'Accueil', home)] + parents
    trail = ' <span aria-hidden="true">/</span> '.join(f'<a href="{h}">{t}</a>' for t, h in items)
    nav = (f'<nav class="breadcrumb da-crumb" aria-label="{"Breadcrumb" if en else "Fil d’Ariane"}">{trail} '
           f'<span aria-hidden="true">/</span> <span aria-current="page">{label}</span></nav>')
    s = s[:m.end()] + nav + s[m.end():]
    open(f, 'w', encoding='utf-8').write(s); done += 1
print('breadcrumbs added:', done, '| skipped:', skipped)
