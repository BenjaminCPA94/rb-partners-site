#!/usr/bin/env python3
"""Builds the two home pages (French index.html, English french-accountant-paris.html) from
tools/da/home.css + tools/da/home.body.tpl (the French source).

The SEO head (title, description, canonical, hreflang, Open Graph) of each page is kept as it is in the
repository; the structured data blocks are kept too, except the FAQ block (there is no FAQ on the page any more).
The English page is the French body with its texts replaced through the table below: every text node must be
in the table (or in SAME), otherwise the build stops and lists what is missing.

Run from the repository root:  python3 tools/build_home.py
"""
import re, subprocess

def git_show(path):
    try:
        return subprocess.check_output(['git', 'show', f'HEAD:{path}']).decode('utf-8')
    except subprocess.CalledProcessError:
        return open(path, encoding='utf-8').read()

css = open('tools/da/home.css', encoding='utf-8').read()
body_fr = open('tools/da/home.body.tpl', encoding='utf-8').read()

def head_of(src):
    i = src.index('<script>/* Rideau')            # everything before the opening curtain: meta, SEO, language redirect
    head = src[:i]
    head = re.sub(r'<html lang="(\w+)"[^>]*>', r'<html lang="\1">', head, count=1)
    ld = ''.join(m.group(0) + '\n' for m in re.finditer(r'<script type="application/ld\+json" id="rb-schema-(?:main|entity)">.*?</script>', src, re.S))
    return head, ld

SRC = {'fr': git_show('index.html'), 'en': git_show('french-accountant-paris.html')}

# ---------- English ----------
TXT = {
 'Aller au contenu': 'Skip to content',
 'Le cabinet': 'The firm', 'Les associés': 'The partners', 'Notre approche': 'Our approach',
 'Nos expertises': 'Our expertise', 'Conformité & comptabilité': 'Compliance & accounting', 'Pilotage & reporting': 'Management & reporting',
 'Social & RH': 'Payroll & HR', 'Juridique & création': 'Legal & company formation', 'Conseil au dirigeant': 'Owner-manager advisory',
 'Facturation électronique': 'E-invoicing', 'Ressources': 'Resources', 'Blog': 'Blog', 'Simulateurs': 'Calculators',
 'Tarifs d’un expert-comptable': 'Accountant fees', 'Changer d’expert-comptable': 'Switching accountants', 'Expert-comptable en ligne': 'Online accountant',
 'Parlons de votre projet': 'Let’s talk about your project',
 'Expertise comptable · Paris & international': 'French accounting · Paris & international',
 'L’esprit libre.': 'Free spirit.', 'Les comptes': 'Accounts', 'au carré.': 'squared away.',
 'Entrepreneurs français, entreprises étrangères : développez votre activité en France, avec deux associés à vos côtés. Comptabilité, fiscalité et conseil, en français comme en anglais.':
   'French entrepreneurs, foreign companies: grow your business in France with two partners at your side. Accounting, tax and advice, in French and in English.',
 'Faisons connaissance': 'Let’s get acquainted', 'Un associé.': 'One partner.', 'Pas un numéro de dossier.': 'Not a file number.',
 'Ancrés à Paris. Ouverts sur le monde.': 'Rooted in Paris. Open to the world.',
 'Un lien direct avec les associés': 'A direct line to the partners', 'Un accompagnement FR / EN': 'French / English support',
 'Des outils vraiment connectés': 'Genuinely connected tools', 'Une vision au-delà du bilan': 'A view beyond the balance sheet',
 '01 / Nos expertises': '01 / Our expertise', 'Sérieux sur les chiffres.': 'Serious about numbers.', 'Investis dans votre réussite.': 'Invested in your success.',
 'De la première idée aux prochaines étapes, les bonnes expertises, au bon moment.': 'From the first idea to the next steps, the right expertise at the right time.',
 'Comptabilité & fiscalité': 'Accounting & tax', 'Des comptes justes. Une vision claire.': 'Accurate accounts. A clear view.',
 'Tenue comptable, comptes annuels, déclarations fiscales et TVA. Nous sécurisons vos obligations pour vous laisser entreprendre.':
   'Bookkeeping, annual accounts, tax returns and VAT. We secure your obligations so you can get on with your business.',
 'Découvrir': 'Discover',
 'Trésorerie, tableaux de bord, prévisionnels, reporting et aide à la décision.': 'Cash, dashboards, forecasts, reporting and decision support.',
 'Social & ressources humaines': 'Payroll & human resources', 'Paie, embauches et obligations sociales récurrentes.': 'Payroll, hiring and recurring social obligations.',
 'Création de société, juridique annuel et structuration.': 'Company formation, annual legal work and structuring.',
 'Rémunération, dividendes, holding et arbitrages du dirigeant.': 'Pay, dividends, holding companies and owner-manager decisions.',
 'Préparation, organisation et accompagnement autour de la réforme française.': 'Preparation, organisation and support around the French reform.',
 '02 / Le cabinet': '02 / The firm', 'Derrière vos chiffres,': 'Behind your numbers,', 'des gens qui s’engagent.': 'people who stand by you.',
 'Rachel et Benjamin. Deux parcours complémentaires, une même conviction : la comptabilité est avant tout une relation de confiance.':
   'Rachel and Benjamin. Two complementary backgrounds, one conviction: accounting is first of all a relationship of trust.',
 'Rencontrez vos associés': 'Meet your partners', 'Associée': 'Partner', 'Associé': 'Partner',
 'International & implantation': 'International & market entry', 'Entrepreneurs & croissance': 'Entrepreneurs & growth',
 '03 / Au-delà des frontières': '03 / Beyond borders', 'Votre ambition est globale.': 'Your ambition is global.', 'Notre expertise, locale.': 'Our expertise, local.',
 'Vous vous implantez en France ou pilotez une filiale française ? Nous faisons le lien entre vos ambitions et les exigences locales. In French. And in English.':
   'Are you setting up in France or running a French subsidiary? We link your ambitions with local requirements. In French. And in English.',
 'Développer votre activité en France': 'Grow your business in France',
 '04 / Pour y voir plus clair': '04 / For a clearer view', 'Les bonnes questions.': 'The right questions.', 'Sans le jargon.': 'Without the jargon.',
 'Toutes nos ressources': 'All our resources', 'Guide pratique / 01': 'Practical guide / 01', 'Combien coûte un expert-comptable ?': 'How much does an accountant cost?',
 'Vie de l’entreprise / 02': 'Company life / 02', 'Changer de cabinet, sans repartir de zéro.': 'Switching firms, without starting over.',
 'Outils / 03': 'Tools / 03', 'Vos premiers calculs, en quelques clics.': 'Your first calculations, in a few clicks.', 'Explorer': 'Explore',
 'La suite commence par un échange.': 'What comes next starts with a conversation.', 'Et si on parlait': 'How about we talk', 'de vous ?': 'about you?',
 'Un premier échange pour faire connaissance, comprendre vos enjeux et voir comment avancer ensemble.': 'A first conversation to get to know each other, understand your needs and see how to move forward together.',
 'Réserver un premier échange': 'Book a first conversation', 'Ou écrivez à': 'Or write to', 'Rachel :': 'Rachel:', '· Benjamin :': '· Benjamin:',
 'Indépendants d’esprit. Partenaires de votre avenir.': 'Independent in spirit. Partners in your future.', 'Tout en haut ↑': 'Back to top ↑',
 'Meyvin · Expertise comptable à Paris': 'Meyvin · French accounting in Paris', 'Mentions légales': 'Legal notice', 'Confidentialité': 'Privacy',
}
SAME = {'RI', 'BH', 'meyvin', 'Rachel Illouz', 'Benjamin Haziza', 'contact@meyvin.fr', '©', '2026', '↗', '/', '.', 'FR', 'EN', 'International ↗', '48°51′ N — 2°21′ E', '01', '02', '03', '04', '05', '06', '−', '+'}
ATTR = {
 'Meyvin, accueil': 'Meyvin, home', 'Navigation principale': 'Main navigation', 'Ouvrir le menu': 'Open the menu', 'Pied de page': 'Footer',
 'Rachel Illouz sur LinkedIn': 'Rachel Illouz on LinkedIn', 'Benjamin Haziza sur LinkedIn': 'Benjamin Haziza on LinkedIn', 'Meyvin, haut de page': 'Meyvin, top of page',
 'Façade et balcons d’un immeuble haussmannien à Paris, en noir et blanc': 'Facade and balconies of a Haussmann-style building in Paris, in black and white',
}
HREF = [  # French page -> its English counterpart
 ('les-associes.html', 'the-partners.html'), ('notre-approche.html', 'our-approach.html'),
 ('expertises/comptabilite.html', 'expertises/accounting-compliance-france.html'), ('expertises/conseil-gestion.html', 'expertises/management-reporting-france.html'),
 ('expertises/social-paie.html', 'expertises/payroll-hr-france.html'), ('expertises/creation-juridique.html', 'expertises/company-formation-legal-france.html'),
 ('conseil-dirigeant.html', 'owner-manager-advisory-france.html'), ('facturation-electronique.html', 'e-invoicing-france.html'),
 ('expert-comptable-international.html', 'international-accountant-france.html'), ('tarif-expert-comptable.html', 'accountant-fees-france.html'),
 ('changer-expert-comptable.html', 'switch-accountant-france.html'), ('expert-comptable-en-ligne.html', 'online-accountant-france.html'),
 ('blog/index.html', 'blog/index-en.html'), ('simulateurs/index.html', 'simulateurs/index-en.html'),
]

def to_english(b):
    missing = []
    def text(m):
        raw = m.group(1)
        t = raw.strip()
        k = t.replace('&amp;', '&')
        if not t or k in SAME or not re.search(r'[A-Za-zÀ-ÿ]', t): return m.group(0)
        if k in TXT: return '>' + raw.replace(t, TXT[k].replace('&', '&amp;')) + '<'
        missing.append(t); return m.group(0)
    # only the page markup: scripts are left untouched
    parts = re.split(r'(<script.*?</script>)', b, flags=re.S)
    out = []
    for p in parts:
        if p.startswith('<script'): out.append(p); continue
        p = re.sub(r'>([^<>]+)<', text, p)
        for k, v in ATTR.items():
            p = p.replace(f'"{k}"', f'"{v}"')
        for fr, en in HREF:
            p = p.replace(f'href="{fr}"', f'href="{en}"')
        out.append(p)
    assert not missing, sorted(set(missing))
    s = ''.join(out)
    s = s.replace('<span class="lang"><b>FR</b> / <a href="french-accountant-paris.html" hreflang="en" lang="en">EN</a></span>',
                  '<span class="lang"><a href="index.html?lang=fr" hreflang="fr" lang="fr">FR</a> / <b>EN</b></span>')
    s = s.replace('<html lang="fr">', '<html lang="en">')
    return s

def page(lang, body):
    head, ld = head_of(SRC[lang])
    return (head + '<link rel="preload" href="assets/fonts/dm-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>\n'
            '<link rel="stylesheet" href="css/fonts.css">\n<style>\n' + css + '</style>\n' + ld + '</head>\n<body>\n' + body + '</body>\n</html>\n')

fr = page('fr', body_fr)
en = page('en', to_english(body_fr))
open('index.html', 'w', encoding='utf-8').write(fr)
open('french-accountant-paris.html', 'w', encoding='utf-8').write(en)
print('index.html', len(fr), '| french-accountant-paris.html', len(en))
