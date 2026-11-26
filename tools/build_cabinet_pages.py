#!/usr/bin/env python3
"""Builds the four "Le cabinet" pages from content that already exists on the site.

  les-associes.html / the-partners.html   partner profiles (bios, tags, contact) taken from the home page
  notre-approche.html / our-approach.html the four steps with their animated scenes (taken from the previous
                                          home page, commit 13d24e4) and the way a collaboration starts

Nothing is invented: every sentence below comes from a page of the site (home, tariff page, contact block).
Run from the repository root:  python3 tools/build_cabinet_pages.py
"""
import os, re, subprocess, html

BASE = 'https://benjamincpa94.github.io/rb-partners-site/'
BOOK = 'https://bookings.cloud.microsoft/book/MEYVIN1@meyvin-experts.com/?ismsaljsauthenabled'
OLD_HOME = '13d24e4'  # last commit whose home page still carried the pinned four-step story

def rd(p): return open(p, encoding='utf-8').read()
def git_show(rev, path): return subprocess.check_output(['git', 'show', f'{rev}:{path}']).decode('utf-8')

PARTNERS_REV = '8b71cd8'  # last commit whose home page still carried the full partner cards (bios, tags)
home = {'fr': git_show(PARTNERS_REV, 'index.html'), 'en': git_show(PARTNERS_REV, 'french-accountant-paris.html')}
old = {'fr': git_show(OLD_HOME, 'index.html'), 'en': git_show(OLD_HOME, 'french-accountant-paris.html')}
tpl = {'fr': rd('tarif-expert-comptable.html'), 'en': rd('accountant-fees-france.html')}

PAGES = {
    'fr': {'partners': 'les-associes.html', 'approach': 'notre-approche.html', 'home': 'index.html'},
    'en': {'partners': 'the-partners.html', 'approach': 'our-approach.html', 'home': 'french-accountant-paris.html'},
}

# ---------- partner data, read from the home pages ----------
def person(lang, key):
    d = _person(lang, key)
    d['tel'] = 'tel:+' + re.search(r'wa\.me/(\d+)', d['wa']).group(1)
    return d

def _person(lang, key):
    m = re.search(r'<article class="person[^"]*"[^>]*data-person="%s".*?</article>' % key, home[lang], re.S)
    a = m.group(0)
    g = lambda p: re.search(p, a, re.S).group(1).strip()
    return dict(
        name=g(r'<h3>(.*?)</h3>'), role=g(r'<b>(.*?)</b>'), focus=g(r'class="person__focus">(.*?)</span>'),
        bio=g(r'<p>(.*?)</p>'), tags=re.findall(r'<li>(.*?)</li>', g(r'<ul class="person__tags">(.*?)</ul>')),
        img=g(r'<img src="([^"]+)"'), alt=g(r'<img [^>]*alt="([^"]*)"'), linkedin=g(r'href="(https://www\.linkedin\.com[^"]*)"'),
        tel=None, wa=g(r'href="(https://wa\.me[^"]*)"'))

WA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'

# ---------- texts ----------
TX = {
 'fr': dict(
  lang='fr', og='fr_FR',
  p_title='Les associés : Rachel Illouz et Benjamin Haziza — Meyvin',
  p_desc='Rachel Illouz (international, implantation en France) et Benjamin Haziza (start-up, entrepreneurs, indépendants) : les deux associés du cabinet Meyvin à Paris.',
  p_eyebrow='Le cabinet', p_h1='Deux associés, des expertises complémentaires.',
  p_lead='Vous échangez directement avec l’associé qui suit votre dossier, en français ou en anglais.',
  a_title='Notre approche : créer, tenir, piloter, s’implanter — Meyvin',
  a_desc='Quatre étapes, un même cabinet : créer sa société, tenir ses comptes, piloter avec des chiffres fiables et s’implanter en France. Notre façon de travailler.',
  a_eyebrow='Le cabinet', a_h1='Notre approche : créer, tenir, piloter, s’implanter.',
  a_lead='Quatre étapes, un même cabinet. Que vous démarriez une société, que vous la fassiez tenir au quotidien, que vous la pilotiez ou que vous vous implantiez en France, les mêmes associés coordonnent l’ensemble.',
  home='Accueil', firm='Le cabinet',
  call='Appeler', book='Réserver un premier échange', linkedin='LinkedIn ↗', wa='WhatsApp', wa_label='WhatsApp ',
  m_eyebrow='Quel associé ?', m_h2='Quelle est votre situation&nbsp;?',
  m_rows=[('Je crée ou développe mon entreprise','benjamin'),('Indépendant ou profession libérale','benjamin'),('Société étrangère qui s’implante en France','rachel'),('Filiale française d’un groupe','rachel')],
  m_out='Votre interlocuteur : ', m_out_f='Votre interlocutrice : ', see='Voir le profil',
  pts_eyebrow='Comment nous travaillons', pts_h2='Ce que vous pouvez attendre du cabinet',
  pts=[('Deux associés, un seul interlocuteur','Vous échangez directement avec l’associé qui suit votre dossier.'),
       ('Français et anglais','Notre accompagnement international est pensé pour faciliter les échanges avec les équipes et maisons mères étrangères.'),
       ('Des outils connectés','Comptabilité, TVA, paie et déclarations sont tenues au fil de l’eau sur des outils connectés (Pennylane, Silae).')],
  steps_link='Découvrir',
  s_eyebrow='Pour démarrer', s_h2='Comment commence une collaboration',
  s_pts=[('Un premier échange','Nous commençons par un échange avec un associé pour comprendre votre activité, vos volumes et ce que vous attendez du cabinet. Cet échange est sans engagement.'),
         ('Une proposition écrite','Vous recevez ensuite une proposition qui décrit les travaux inclus, leur fréquence et les honoraires correspondants. Une fois acceptée, elle devient la lettre de mission.'),
         ('Des comptes tenus au fil de l’eau','Comptabilité, TVA, paie et déclarations sont tenues au fil de l’eau sur des outils connectés. Vous n’attendez plus le bilan pour connaître vos chiffres.')],
  rel_eyebrow='Pour aller plus loin',
  rel_p=[('Notre approche','Quatre étapes, un même cabinet : créer, tenir, piloter, s’implanter.','approach'),
         ('Nos missions','Six missions coordonnées par les mêmes associés.','missions'),
         ('Implantation en France','Un point d’entrée local pour les groupes étrangers.','intl')],
  rel_a=[('Les associés','Rachel Illouz et Benjamin Haziza, vos interlocuteurs directs.','partners'),
         ('Tarifs d’un expert-comptable','Ce qui fait varier les honoraires et comment lire un devis.','fees'),
         ('Implantation en France','Un point d’entrée local pour les groupes étrangers.','intl')],
  rel_h2='Poursuivre la visite', rel_lead='Trois pages pour mieux connaître le cabinet.',
  cta_h2='Parlons de votre projet.', cta_p='Un premier échange de 30 minutes, sans engagement, avec l’un des deux associés.', cta_btn='Réserver un premier échange',
  aria_scene='Illustration animée : ', crumb_home='Accueil',
  w_h2='Notre cabinet vous accueille',
  w_p=['Meyvin est un cabinet d’expertise comptable installé à Paris, fondé et dirigé par deux associés : Rachel Illouz et Benjamin Haziza.',
       'Comptabilité, fiscalité, paie et conseil pour les indépendants, les PME et les sociétés étrangères qui s’implantent en France.'],
  w_list=['Deux associés, un seul interlocuteur','Français et anglais','Outils connectés : Pennylane, Silae'],
  c_h3='Nous rencontrer', c_p='Un premier échange de 30 minutes, sans engagement, avec l’un des deux associés.',
  c_city='Paris, France', c_mail='E-mail', c_phone='Téléphone',
  role_f='Associée', role_m='Associé', team_alt='Rachel Illouz et Benjamin Haziza, associés du cabinet Meyvin',
  hero_promise='Vous échangez <b>directement</b> avec l’associé qui suit votre dossier, en <b>français ou en anglais</b>.'),
 'en': dict(
  lang='en', og='en_GB',
  p_title='The partners: Rachel Illouz and Benjamin Haziza — Meyvin',
  p_desc='Rachel Illouz (international, France market entry) and Benjamin Haziza (start-ups, entrepreneurs, independents): the two partners of Meyvin, a Paris accounting firm.',
  p_eyebrow='The firm', p_h1='Two partners, complementary expertise.',
  p_lead='You deal directly with the partner who follows your file, in French or in English.',
  a_title='Our approach: launch, run, steer, land in France — Meyvin',
  a_desc='Four steps, one firm: set up your company, keep your books, steer with reliable numbers and land in France. How we work.',
  a_eyebrow='The firm', a_h1='Our approach: launch, run, steer, land in France.',
  a_lead='Four steps, one firm. Whether you are starting a company, keeping it running day to day, steering it or setting up in France, the same partners coordinate everything.',
  home='Home', firm='The firm',
  call='Call', book='Book a first conversation', linkedin='LinkedIn ↗', wa='WhatsApp', wa_label='WhatsApp ',
  m_eyebrow='Which partner?', m_h2='What is your situation?',
  m_rows=[('I am starting or growing my business','benjamin'),('Self-employed or liberal profession','benjamin'),('Foreign company setting up in France','rachel'),('French subsidiary of a group','rachel')],
  m_out='Your contact: ', m_out_f='Your contact: ', see='See profile',
  pts_eyebrow='How we work', pts_h2='What you can expect from the firm',
  pts=[('Two partners, one point of contact','You deal directly with the partner who follows your file.'),
       ('French and English','Our international support is designed to make exchanges easier with foreign teams and head offices.'),
       ('Connected tools','Accounting, VAT, payroll and filings are kept up to date throughout the year on connected tools (Pennylane, Silae).')],
  steps_link='Discover',
  s_eyebrow='Getting started', s_h2='How a collaboration begins',
  s_pts=[('A first conversation','We start with a conversation with a partner to understand your activity, volumes and what you expect from the firm. It is free of obligation.'),
         ('A written proposal','You then receive a proposal describing the work included, its frequency and the corresponding fees. Once accepted, it becomes the engagement letter.'),
         ('Books kept up to date all year','Accounting, VAT, payroll and filings are kept up to date throughout the year on connected tools. You no longer wait for the year-end accounts to know your numbers.')],
  rel_eyebrow='Going further',
  rel_p=[('Our approach','Four steps, one firm: launch, run, steer, land in France.','approach'),
         ('Our services','Six services coordinated by the same partners.','missions'),
         ('Setting up in France','A local point of entry for foreign groups.','intl')],
  rel_a=[('The partners','Rachel Illouz and Benjamin Haziza, your direct contacts.','partners'),
         ('Accountant fees in France','What makes fees vary and how to read a quote.','fees'),
         ('Setting up in France','A local point of entry for foreign groups.','intl')],
  rel_h2='Keep exploring', rel_lead='Three pages to get to know the firm.',
  cta_h2='Let’s talk about your project.', cta_p='A first 30-minute conversation, free of obligation, with one of the two partners.', cta_btn='Book a first conversation',
  aria_scene='Animated illustration: ', crumb_home='Home',
  w_h2='Our firm welcomes you',
  w_p=['Meyvin is an accounting firm based in Paris, founded and run by two partners: Rachel Illouz and Benjamin Haziza.',
       'Accounting, tax, payroll and advice for self-employed professionals, SMEs and foreign companies setting up in France.'],
  w_list=['Two partners, one point of contact','French and English','Connected tools: Pennylane, Silae'],
  c_h3='Meet us', c_p='A first 30-minute conversation, free of obligation, with one of the two partners.',
  c_city='Paris, France', c_mail='Email', c_phone='Phone',
  role_f='Partner', role_m='Partner', team_alt='Rachel Illouz and Benjamin Haziza, partners of Meyvin',
  hero_promise='You deal <b>directly</b> with the partner who follows your file, in <b>French or in English</b>.'),
}
TITLES = {'fr': ['Création de société', 'Comptabilité au fil de l’eau', 'Tableau de bord', 'Implantation en France'],
          'en': ['Company formation', 'Day-to-day bookkeeping', 'Dashboard', 'Setting up in France']}
LINK = {  # where each page of a language is, relative to the site root
 'fr': {'missions': 'index.html#missions', 'intl': 'expert-comptable-international.html', 'fees': 'tarif-expert-comptable.html'},
 'en': {'missions': 'french-accountant-paris.html#missions', 'intl': 'international-accountant-france.html', 'fees': 'accountant-fees-france.html'}}

TEAM_PHOTO = 'assets/associes.jpg'  # photo of the two partners together: shown on the partners page as soon as the file exists

def fmt_phone(tel):
    d = tel.replace('tel:+33', '0')
    return ' '.join(d[i:i + 2] for i in range(0, len(d), 2))

def e(s): return html.escape(s, quote=False)

# ---------- pieces ----------
def person_card(lang, key, t):
    d = person(lang, key)
    first = d['name'].split()[0]
    role = t['role_f'] if key == 'rachel' and lang == 'fr' else t['role_m']
    tags = ''.join(f'<li>{x}</li>' for x in d['tags'])
    book = f'<a class="btn btn--primary btn--sm" href="{BOOK}" target="_blank" rel="noopener" data-booking="general">{t["book"]}</a>'
    return f'''<article class="cab-person" id="{key}">
<span class="cab-person__ini" aria-hidden="true">{''.join(w[0] for w in d['name'].split())}</span>
<h2>{d['name']}</h2>
<p class="cab-person__role">{role}</p>
<p class="cab-person__focus">{d['focus']}</p>
<p class="cab-person__bio">{d['bio']}</p>
<ul class="cab-tags">{tags}</ul>
<div class="cab-actions">{book}<a class="cab-link" href="{d['tel']}">{t['call']} {first}</a><a class="cab-wa" href="{d['wa']}" target="_blank" rel="noopener" aria-label="WhatsApp {first}">{WA_SVG}{t['wa']}</a><a class="cab-link" href="{d['linkedin']}" target="_blank" rel="noopener">{t['linkedin']}</a></div>
</article>'''

def points(items):
    return '<div class="seo-points">' + ''.join(f'<article class="seo-point"><span>0{i+1}</span><h3>{h}</h3><p>{p}</p></article>' for i, (h, p) in enumerate(items)) + '</div>'

def related(lang, t, items, h2, lead):
    pg = PAGES[lang]
    def href(k):
        return pg.get(k) or LINK[lang][k]
    cards = ''.join(f'<a class="rb-related__card" href="{href(k)}"><small>0{i+1}</small><h3>{h}</h3><p>{p}</p></a>' for i, (h, p, k) in enumerate(items))
    return f'<section class="rb-related"><div class="container"><div class="rb-related__head"><div><p class="eyebrow">{t["rel_eyebrow"]}</p><h2>{h2}</h2></div><p>{lead}</p></div><div class="rb-related__grid">{cards}</div></div></section>'

def cta(t):
    return f'<section class="expertise-cta"><div class="container"><h2>{t["cta_h2"]}</h2><p>{t["cta_p"]}</p><a href="{BOOK}" target="_blank" rel="noopener" class="btn btn--primary" data-booking="general">{t["cta_btn"]}</a></div></section>'

def hero(eyebrow, h1, lead):
    return f'<section class="seo-hero"><div class="container seo-hero__inner"><p class="eyebrow">{eyebrow}</p><h1>{h1}</h1><p class="seo-hero__lead">{lead}</p></div></section>'

RECOLOR = [('#0b1d3a', '#102b57'), ('#12264a', '#17376e'), ('#183262', '#1f4486'), ('#5d6573', '#535e70'), ('#8f6b2e', '#1f45b3'), ('#c6a15b', '#2856d8'), ('#e0d8c6', '#d5e2f5'), ('#e2c48a', '#9bb8f5'), ('#e7e0d0', '#d5e2f5'), ('#efe9db', '#eef3fb'), ('#f7f2e9', '#f4f7fc'), ('#fffdf8', '#ffffff'), ('rgba(198,161,91,', 'rgba(40,86,216,'), ('rgba(226,196,138,', 'rgba(155,184,245,')]
def recolor(s):
    for a, b in RECOLOR: s = re.sub(re.escape(a), b, s, flags=re.I)
    return s

def scenes(lang):
    return [recolor(x) for x in re.findall(r'<svg class="scene[^"]*" viewBox="0 0 480 340".*?</svg>', old[lang], re.S)]
def steps(lang):
    out = []
    for m in re.finditer(r'<article class="step[^"]*">\s*<span class="kicker">(.*?)</span>\s*<h2>(.*?)</h2>\s*<p>(.*?)</p>\s*<a href="([^"]*)">(.*?)</a>', old[lang], re.S):
        out.append([x.strip() for x in m.groups()])
    return out

def scene_section(lang, t, i, sc, st):
    k, h, p, href, label = st
    sc = re.sub(r'<svg class="scene[^"]*"', '<svg class="scene is-on' + (' scene--dark' if i == 3 else '') + '"', sc, count=1)
    dark = ' sc-section--dark' if i == 3 else ''
    return f'''<section class="sc-section{dark}" aria-label="{t['aria_scene']}{TITLES[lang][i]}">
<div class="container sc-grid">
<div class="sc-copy"><span class="sc-kicker">{k}</span><h2>{h}</h2><p>{p}</p><a class="sc-link" href="{href}">{label} →</a></div>
<div class="sc-board" aria-hidden="true"><div class="board"><div class="board__in"><div class="board__bar"><i></i><i></i><i></i><span>{TITLES[lang][i]}</span></div><div class="board__stage">
{sc}
</div></div></div></div>
</div></section>'''

def main_partners(lang, t):
    rows = ''
    for label, key in t['m_rows']:
        nm = 'Benjamin Haziza' if key == 'benjamin' else 'Rachel Illouz'
        out = (t['m_out_f'] if (key == 'rachel' and lang == 'fr') else t['m_out']) + nm
        rows += f'<li><b>{label}</b><span>{out}</span><a href="#{key}">{t["see"]}</a></li>'
    r, bz = person(lang, 'rachel'), person(lang, 'benjamin')
    phones = ''.join(f'<li><a href="{d["tel"]}">{d["name"].split()[0]} · {fmt_phone(d["tel"])}</a><a class="cab-wa" href="{d["wa"]}" target="_blank" rel="noopener" aria-label="WhatsApp {d["name"].split()[0]}">{WA_SVG}{t["wa"]}</a></li>' for d in (r, bz))
    team = ''
    if os.path.exists(TEAM_PHOTO):
        team = f'<figure class="cab-team"><img src="{TEAM_PHOTO}" alt="{t["team_alt"]}" loading="eager"></figure>'
    checks = ''.join(f'<li>{x}</li>' for x in t['w_list'])
    welcome = f'''<section class="section cab-welcome"><div class="container cab-welcome__grid">
<div class="cab-welcome__text"><h2>{t['w_h2']}</h2><p>{t['w_p'][0]}</p><p>{t['w_p'][1]}</p><ul class="cab-check">{checks}</ul></div>
<aside class="cab-contact"><h3>{t['c_h3']}</h3><p>{t['c_p']}</p><p class="cab-contact__city">{t['c_city']}</p><ul class="cab-contact__list">{phones}<li><span>{t['c_mail']}</span> <a href="mailto:contact@meyvin.fr">contact@meyvin.fr</a></li></ul><a class="btn btn--primary" href="{BOOK}" target="_blank" rel="noopener" data-booking="general">{t['book']}</a></aside>
</div></section>'''
    return '\n'.join([
        f'<section class="cab-hero"><div class="container"><p class="eyebrow">{t["p_eyebrow"]}</p><h1>{t["p_h1"]}</h1><p class="cab-hero__lead">{t["hero_promise"]}</p></div></section>',
        f'<div class="container">{team}</div>' if team else '',
        welcome,
        f'<section class="section cab-duo-section"><div class="container"><div class="cab-duo">{person_card(lang, "rachel", t)}{person_card(lang, "benjamin", t)}</div></div></section>',
        f'<section class="section section--cream"><div class="container"><div class="section__head"><p class="eyebrow">{t["m_eyebrow"]}</p><h2>{t["m_h2"]}</h2></div><ul class="cab-match">{rows}</ul></div></section>',
        related(lang, t, t['rel_p'], t['rel_h2'], t['rel_lead']),
        cta(t)])

def main_approach(lang, t):
    sc, st = scenes(lang), steps(lang)
    assert len(sc) == 4 and len(st) == 4, (lang, len(sc), len(st))
    parts = [hero(t['a_eyebrow'], t['a_h1'], t['a_lead'])]
    parts += [scene_section(lang, t, i, sc[i], st[i]) for i in range(4)]
    parts += [f'<section class="section section--cream"><div class="container"><div class="section__head"><p class="eyebrow">{t["s_eyebrow"]}</p><h2>{t["s_h2"]}</h2></div>{points(t["s_pts"])}</div></section>',
              related(lang, t, t['rel_a'], t['rel_h2'], t['rel_lead']), cta(t)]
    return '\n'.join(parts)

# ---------- page assembly from an existing page used as the template ----------
def build(lang, kind):
    t = TX[lang]; pg = PAGES[lang]
    other = 'en' if lang == 'fr' else 'fr'
    me = pg[kind]; twin = PAGES[other][kind]
    title = t['p_title'] if kind == 'partners' else t['a_title']
    desc = t['p_desc'] if kind == 'partners' else t['a_desc']
    name = t['p_h1'] if kind == 'partners' else t['a_h1']
    s = tpl[lang]
    url = BASE + me
    def sub(pat, rep, flags=re.S):
        nonlocal s
        s, n = re.subn(pat, lambda m: rep, s, count=1, flags=flags); assert n == 1, pat
    sub(r'<title>.*?</title>', f'<title>{e(title)}</title>')
    sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{html.escape(desc)}">')
    sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url}">')
    fr_url = BASE + PAGES['fr'][kind]; en_url = BASE + PAGES['en'][kind]
    sub(r'<link rel="alternate" hreflang="fr" href="[^"]*">', f'<link rel="alternate" hreflang="fr" href="{fr_url}">')
    sub(r'<link rel="alternate" hreflang="en" href="[^"]*">', f'<link rel="alternate" hreflang="en" href="{en_url}">')
    sub(r'<link rel="alternate" hreflang="x-default" href="[^"]*">', f'<link rel="alternate" hreflang="x-default" href="{fr_url}">')
    sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{url}">')
    sub(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{html.escape(title)}">')
    sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{html.escape(desc)}">')
    # structured data: page-specific blocks replaced, the organisation block kept
    def ld(obj): return '<script type="application/ld+json" id="%s">%s</script>'
    import json
    org = BASE + '#organization'
    if kind == 'partners':
        main_ld = {"@context": "https://schema.org", "@type": "AboutPage", "name": title, "description": desc, "url": url, "inLanguage": lang,
                   "about": {"@id": org},
                   "mainEntity": [{"@type": "Person", "name": person(lang, k)['name'], "jobTitle": ('Associée' if k == 'rachel' and lang == 'fr' else 'Associé' if lang == 'fr' else 'Partner'),
                                   "image": BASE + person(lang, k)['img'], "sameAs": [person(lang, k)['linkedin']], "worksFor": {"@id": org}} for k in ('rachel', 'benjamin')]}
    else:
        main_ld = {"@context": "https://schema.org", "@type": "WebPage", "name": title, "description": desc, "url": url, "inLanguage": lang, "about": {"@id": org}}
    crumb = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": t['crumb_home'], "item": BASE + (pg['home'] if lang == 'en' else '')},
        {"@type": "ListItem", "position": 2, "name": name, "item": url}]}
    dump = lambda o: json.dumps(o, ensure_ascii=False, separators=(',', ':'))
    sub(r'<script type="application/ld\+json" id="rb-schema-main">.*?</script>', '<script type="application/ld+json" id="rb-schema-main">' + dump(main_ld) + '</script>')
    sub(r'<script type="application/ld\+json" id="rb-schema-faq">.*?</script>\n?', '')
    sub(r'<script type="application/ld\+json" id="rb-schema-breadcrumb">.*?</script>', '<script type="application/ld+json" id="rb-schema-breadcrumb">' + dump(crumb) + '</script>')
    # language switch goes to the twin page
    sub(r'window\.location\.href=&quot;[^&]*&quot;', f'window.location.href=&quot;{twin}&quot;')
    # stylesheets (the animated scenes need story-scene.css, loaded before the page skin)
    extra = '<link rel="stylesheet" href="css/cabinet.css">'
    if kind == 'approach': extra = '<link rel="stylesheet" href="css/story-scene.css">\n' + extra
    anchor = '<link rel="stylesheet" href="css/da-site.css">'
    assert anchor in s; s = s.replace(anchor, anchor + '\n' + extra, 1)
    body = main_partners(lang, t) if kind == 'partners' else main_approach(lang, t)
    sub(r'<main>.*?</main>', '<main>\n' + body + '\n</main>')
    if kind == 'approach':
        a2 = '<script src="js/seo-page.js"></script>'
        assert a2 in s; s = s.replace(a2, a2 + '\n<script defer src="js/story-scene.js"></script>', 1)
    open(me, 'w', encoding='utf-8').write(s)
    print('written', me, len(s))

for lang in ('fr', 'en'):
    for kind in ('partners', 'approach'):
        build(lang, kind)
