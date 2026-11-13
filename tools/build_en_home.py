# Rebuilds the English homepage (french-accountant-paris.html) from the French one (index.html).
# Run after editing index.html:  python3 tools/build_en_home.py
# It stops and lists any French text that has no translation in the table below.
import re, sys
import os
REPO=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','')
fr=open(REPO+'index.html',encoding='utf-8').read()
en_old=open(REPO+'french-accountant-paris.html',encoding='utf-8').read() if len(sys.argv)<2 else open(sys.argv[1],encoding='utf-8').read()

T = {
 "Meyvin, accueil":"Meyvin, home", "Navigation principale":"Main navigation",
 "Nos missions":"Our services", "Implantation en France":"Setting up in France", "Le cabinet":"The firm", "Ressources":"Resources",
 "Prendre rendez-vous":"Book a meeting", "Ouvrir le menu":"Open menu",
 "Expert-comptable à Paris · France &amp; international":"French accountant in Paris · France &amp; international",
 "Vous entreprenez.":"You build the business.", "Nous tenons":"We keep", "les comptes.":"the books.",
 "Comptabilité, fiscalité, paie et conseil pour les indépendants, les PME et les sociétés étrangères qui s'implantent en France. Deux associés, un seul interlocuteur.":"Accounting, tax, payroll and advisory for founders, SMEs and foreign companies setting up in France. Two partners, one point of contact.",
 "Découvrir nos missions":"Explore our services",
 "2 associés":"2 partners", "en contact direct":"direct access", "accompagnement bilingue":"bilingual support", "outils connectés":"connected tools",
 "Faire tourner la pièce Meyvin":"Spin the Meyvin coin",
 "Comptabilité":"Accounting", "Fiscalité":"Tax", "Paie &amp; RH":"Payroll &amp; HR", "Juridique":"Legal", "Implantation":"Market entry",
 "Bougez la souris ·":"Move your mouse ·", "faites tourner la pièce":"drag the coin to spin it",
 "Créer":"Launch", "Tenir":"Run", "Piloter":"Steer", "S'implanter":"Land",
 "Étape 1 · Créer":"Step 1 · Launch", "Démarrer sur de bonnes bases.":"Start on solid ground.",
 "Statut juridique, formalités, banque et outils : votre société est organisée avant même la première facture.":"Legal form, formalities, bank and tools: your company is organised before the first invoice goes out.",
 "Créer une entreprise en France":"Starting a company in France",
 "Étape 2 · Tenir":"Step 2 · Run", "Des comptes à jour, toute l'année.":"Books up to date, all year round.",
 "Comptabilité, TVA, paie et déclarations, tenues au fil de l'eau sur des outils connectés. Vous n'attendez plus le bilan pour connaître vos chiffres.":"Bookkeeping, VAT, payroll and filings, kept current on connected tools. No more waiting for year-end to know your numbers.",
 "Conformité &amp; comptabilité":"Compliance &amp; accounting",
 "Étape 3 · Piloter":"Step 3 · Steer", "Décider avec des chiffres fiables.":"Decide with numbers you can trust.",
 "Trésorerie, tableaux de bord et prévisionnels pour arbitrer une embauche, un investissement ou votre rémunération.":"Cash, dashboards and forecasts to weigh a hire, an investment or your own pay.",
 "Pilotage &amp; reporting":"Management &amp; reporting",
 "Étape 4 · S'implanter":"Step 4 · Land", "Un point d'entrée en France.":"One entry point into France.",
 "Filiale, succursale ou bureau de liaison : nous coordonnons la création, la comptabilité locale et le reporting vers votre siège, en français ou en anglais.":"Subsidiary, branch or liaison office: we coordinate the setup, local accounting and reporting to your head office, in French or in English.",
 "Création de société":"Company formation",
 "STATUTS":"ARTICLES", "ACTE CONSTITUTIF":"OF ASSOCIATION", "SOCIÉTÉ":"COMPANY", "CRÉÉE":"FORMED",
 "AVANT LA 1RE FACTURE":"BEFORE THE 1ST INVOICE", "Statut juridique":"Legal form", "Dépôt du capital":"Capital deposit", "Immatriculation":"Registration", "Banque &amp; outils":"Bank &amp; tools",
 "PRÊTE À FACTURER":"READY TO INVOICE",
 "RELEVÉ BANCAIRE":"BANK STATEMENT", "Rapproché":"Reconciled", "Facture client":"Customer invoice", "Loyer":"Rent", "Salaires":"Salaries", "Fournisseur":"Supplier",
 "TVA":"VAT", "DÉCLARATIONS À JOUR":"RETURNS UP TO DATE", "TOUTE L'ANNÉE":"ALL YEAR ROUND", "COMPTES À JOUR":"BOOKS IN ORDER",
 "TRÉSORERIE":"CASH POSITION", "Réel":"Actual", "Prévu":"Forecast", "Aujourd'hui":"Today", "MARGE, MOIS PAR MOIS":"MARGIN, MONTH BY MONTH",
 "TABLEAU DE BORD":"DASHBOARD", "PRÉVISIONNEL":"FORECAST", "VOS ARBITRAGES":"YOUR DECISIONS", "Embaucher":"Hire", "Investir":"Invest", "Se rémunérer":"Pay yourself",
 "3 STRUCTURES POSSIBLES":"3 POSSIBLE STRUCTURES", "Succursale":"Branch", "ÉTABLISSEMENT":"ESTABLISHMENT", "EN FRANCE":"IN FRANCE",
 "VOTRE RELAIS EN FRANCE":"YOUR RELAY IN FRANCE", "Création":"Set-up", "Comptabilité locale":"Local accounting", "Paie &amp; salariés":"Payroll &amp; staff", "Reporting au siège":"HQ reporting",
 "Six missions, un seul cabinet.":"Six services, one firm.",
 "Conformité, pilotage, social, juridique, conseil au dirigeant et facturation électronique, coordonnés par les mêmes associés.":"Compliance, management, people, legal, owner-manager advice and e-invoicing, coordinated by the same partners.",
 "Tenue, comptes annuels, TVA et obligations fiscales récurrentes.":"Bookkeeping, annual accounts, VAT and recurring French tax obligations.", "Bilan":"Accounts",
 "Trésorerie, tableaux de bord, prévisionnels, reporting et aide à la décision.":"Cash, dashboards, forecasts, reporting and decision support.", "Trésorerie":"Cash",
 "Social &amp; RH":"Payroll &amp; HR", "Paie, embauches et obligations sociales récurrentes.":"Payroll, hiring administration and recurring social obligations.", "Bulletins":"Payslips",
 "Juridique &amp; création":"Legal &amp; company formation", "Création de société, juridique annuel et structuration.":"Company formation, annual legal work and corporate structuring.", "Statuts":"Articles",
 "Conseil au dirigeant":"Owner-manager advisory", "Rémunération, dividendes, holding et arbitrages du dirigeant.":"Compensation, dividends, holding structures and owner-manager trade-offs.", "Dividendes":"Dividends",
 "Facturation électronique":"E-invoicing", "Préparation, organisation et accompagnement autour de la réforme française.":"Preparation, organisation and support for French e-invoicing requirements.",
 "Qui accompagnons-nous ?":"Who we support", "Trois situations. Un même point de contact en France.":"Three situations. One French point of contact.",
 "Entreprise française":"French business",
 "Dirigeants, indépendants, start-up et PME : comptabilité, fiscalité, paie, pilotage et accompagnement de la croissance.":"Accounting, tax, payroll, management reporting and growth support for founders, start-ups and SMEs.",
 "Découvrir →":"Learn more →", "FR ↔ SIÈGE":"FR ↔ HQ", "Filiale française d'un groupe international":"French subsidiary of an international group",
 "Normes comptables françaises, fiscalité locale, paie française, comptes intragroupe et reporting vers la maison mère.":"French GAAP, local tax, French payroll, intercompany accounts and reporting to headquarters.",
 "SIÈGE → FRANCE":"HQ → FRANCE", "Société étrangère qui s'implante en France":"Foreign company setting up in France",
 "Structure, création, premières obligations, premiers salariés et mise en place d'une organisation française durable.":"Entity setup, first obligations, first hires and the operating model needed for a sustainable French presence.",
 "VOTRE CAS":"YOUR CASE", "Votre situation est différente&nbsp;?":"Is your situation different?", "Décrivez-la-nous : nous vous orientons vers le bon accompagnement.":"Tell us about it: we will point you to the right support.",
 "Prendre rendez-vous →":"Book a meeting →",
 "Pôle international · France":"International desk · France", "Votre point d'entrée pour":"Your local entry point for", "opérer en France.":"operating in France.",
 "Meyvin fait le lien entre les exigences françaises et les attentes du siège : création ou reprise d'une entité, comptabilité locale, fiscalité, paie, reporting FR / EN et coordination des interlocuteurs en France.":"Meyvin connects French requirements with head-office expectations: entity setup or takeover, local accounting, tax, payroll, FR / EN reporting and coordination of French stakeholders.",
 "Conformité française":"French compliance", "Reporting groupe":"Group reporting", "Découvrir l'implantation en France":"Explore our France market-entry services",
 "MAISON MÈRE":"HEAD OFFICE", "TVA &amp; fiscalité":"VAT &amp; tax",
 "Deux associés, des expertises complémentaires.":"Two partners, complementary expertise.",
 "Vous échangez directement avec l'associé qui suit votre dossier, en français ou en anglais.":"You speak directly with the partner handling your file, in French or in English.",
 "Associée · Expert-comptable":"Partner · Chartered Accountant", "Associé · Expert-comptable":"Partner · Chartered Accountant",
 "International et implantation en France : création de filiales, obligations locales et reporting vers la maison mère.":"International and setting up in France: subsidiary formation, local obligations and reporting to head office.",
 "Start-up, entrepreneurs et indépendants : comptabilité, fiscalité, financement et structuration.":"Start-ups, entrepreneurs and independent professionals: accounting, tax, financing and structuring.",
 "Avant de choisir":"Before you choose", "Les questions qu'on nous pose avant de signer.":"The questions we hear before clients sign.",
 "Trois guides pour comparer sereinement, et des simulateurs pour faire vos premiers calculs.":"Three guides to compare with confidence, and calculators for your first estimates.",
 "Combien coûte un expert-comptable&nbsp;?":"How much does an accountant cost in France?", "Ce qui détermine les honoraires, et comment lire un devis.":"What drives the fees, and how to read a quote.",
 "Lire le guide →":"Read the guide →",
 "Comment changer d'expert-comptable&nbsp;?":"How do you switch accountants in France?", "Lettre de mission, préavis et reprise du dossier, étape par étape.":"Engagement letter, notice period and file handover, step by step.",
 "Un expert-comptable en ligne, est-ce fiable&nbsp;?":"Is an online accountant reliable?", "Ce qui se fait à distance, et ce qui reste suivi par un associé.":"What is done remotely, and what a partner still follows.",
 "Simulateurs : coût d'un salarié, IS, dividendes, brut-net":"Calculators: employee cost, corporate tax, dividends, gross-to-net", "Actualités fiscales et sociales":"Tax and payroll news",
 "Questions fréquentes.":"Frequently asked questions.", "Une autre question&nbsp;? Posez-la directement à un associé lors du premier échange.":"Another question? Ask a partner directly during the first conversation.",
 "Parlons de":"Let's talk about", "votre projet.":"your project.",
 "Un premier échange de 30 minutes, sans engagement, avec l'un des deux associés. Ou écrivez-nous : nous répondons directement.":"A first 30-minute conversation, with no obligation, with one of the two partners. Or write to us: we reply directly.",
 "Choisir un créneau":"Pick a time", "Téléphone":"Phone", "Rachel · 06 24 12 67 69":"Rachel · +33 6 24 12 67 69", "Benjamin · 07 61 53 46 70":"Benjamin · +33 7 61 53 46 70",
 "E-mail":"Email", "Adresse":"Address", "Écrivez-nous":"Write to us", "Nom complet":"Full name", "Votre société est…":"Your company is…",
 "Française":"French", "Étrangère, en projet d'implantation en France":"Foreign, planning to set up in France", "Envoyer ma demande":"Send my request",
 "Vos informations servent uniquement à traiter votre demande.":"Your details are used only to handle your request.", "En savoir plus":"Learn more",
 "Cabinet d'expertise comptable accompagnant les dirigeants et les sociétés internationales en France.":"French accounting firm supporting business owners and international companies in France.",
 "Comptabilité &amp; conformité":"Accounting &amp; compliance", "Immatriculation TVA":"VAT registration", "DAF externalisé":"Outsourced CFO",
 "Tarifs d'un expert-comptable":"Accountant fees", "Changer d'expert-comptable":"Switching accountants", "Simulateurs":"Calculators",
 "Mentions légales":"Legal notice", "Confidentialité":"Privacy",
}
SAME = {"M","Meyvin","Contact","→","FR · EN","Pennylane · Silae","MEYVIN · FRANCE","01","02","03","04","05","06","Reporting FR / EN","01 / 04","Signature","J","F","A","S","O","N","D",
 "Reporting","FR","EN","Subsidiary","FRENCH","COMPANY","Liaison","office","NON-TRADING","PRESENCE","Version française","Factur-X","01 / 03","FRANCE","FR / EN","HQ","Rachel Illouz","Benjamin Haziza","LinkedIn ↗","%","¶","FAQ","?","+","contact@meyvin.fr","Paris, France","Message",".","International","Blog","©","2026","·"}
LINKS = {
 "expertises/comptabilite.html":"expertises/accounting-compliance-france.html", "expertises/fiscalite.html":"expertises/french-tax-advisory.html",
 "expertises/social-paie.html":"expertises/payroll-hr-france.html", "expertises/conseil-gestion.html":"expertises/management-reporting-france.html",
 "expertises/creation-juridique.html":"expertises/company-formation-legal-france.html", "expert-comptable-international.html":"international-accountant-france.html",
 "creation-entreprise-france.html":"company-formation-france.html", "conseil-dirigeant.html":"owner-manager-advisory-france.html",
 "facturation-electronique.html":"e-invoicing-france.html", "expert-comptable-pme.html":"accountant-for-smes-france.html",
 "tarif-expert-comptable.html":"accountant-fees-france.html", "changer-expert-comptable.html":"switch-accountant-france.html",
 "expert-comptable-en-ligne.html":"online-accountant-france.html", "simulateurs/index.html":"simulateurs/index-en.html", "blog/index.html":"blog/index-en.html",
 "immatriculation-tva-france.html":"vat-registration-france.html", "daf-externalise.html":"outsourced-cfo-france.html",
}

s=fr
def rep(old,new,count=1):
    global s
    assert s.count(old)>=1, old[:90]
    s=s.replace(old,new) if count==0 else s.replace(old,new,count)

# ---- structural swaps done on whole elements, before the text pass ----
rep('<html lang="fr" class="ed" data-ed-home>','<html lang="en" class="ed" data-ed-home>')
rep('<a class="top__lang" href="french-accountant-paris.html" hreflang="en" lang="en" title="English version">EN</a>','<a class="top__lang" href="index.html?lang=fr" hreflang="fr" lang="fr" title="Version française">FR</a>')
rep('<a href="french-accountant-paris.html">English version</a>','<a href="index.html?lang=fr" hreflang="fr" lang="fr">Version française</a>')
rep('>SOCIÉTÉ</text><text x="116" y="227" class="t-caps" font-size="7" fill="#e2c48a">FRANÇAISE<','>FRENCH</text><text x="116" y="227" class="t-caps" font-size="7" fill="#e2c48a">COMPANY<')
rep('>SANS ACTIVITÉ</text><text x="186" y="227" text-anchor="end" class="t-caps" font-size="7" fill="#e2c48a">COMMERCIALE<','>NON-TRADING</text><text x="186" y="227" text-anchor="end" class="t-caps" font-size="7" fill="#e2c48a">PRESENCE<')
rep('<text x="116" y="124" class="t-serif" font-size="14" fill="#fff">Filiale</text>','<text x="116" y="124" class="t-serif" font-size="12.500" fill="#fff">Subsidiary</text>')
rep('<text x="116" y="124" class="t-serif" font-size="14" fill="#fff">Bureau</text>','<text x="116" y="124" class="t-serif" font-size="14" fill="#fff">Liaison</text>')
rep('<text x="116" y="141" class="t-serif" font-size="14" fill="#fff">de liaison</text>','<text x="116" y="141" class="t-serif" font-size="14" fill="#fff">office</text>')
# language redirect only makes sense on the French home
m=re.search(r"<script>/\* Visiteur ayant choisi l'anglais.*?</script>\n",s,re.S); assert m; s=s.replace(m.group(0),'',1)

# ---- head: keep the English page's own SEO tags and structured data ----
eh=en_old[en_old.index('<head>'):en_old.index('</head>')]
def grab(p):
    m=re.search(p,eh,re.S); assert m,p; return m.group(0)
seo=[grab(r'<title[^>]*>.*?</title>'),grab(r'<meta name="description"[^>]*>'),grab(r'<link rel="canonical"[^>]*>')]+re.findall(r'<link rel="alternate"[^>]*>',eh)+[grab(r'<meta name="robots"[^>]*>')]+re.findall(r'<meta property="og:[^>]*>',eh)+[grab(r'<meta name="twitter:card"[^>]*>')]
schemas=re.findall(r'<script type="application/ld\+json"[^>]*>.*?</script>',eh,re.S); assert len(schemas)==3
a=s.index('<title'); b=s.index('<link rel="icon"'); s=s[:a]+'\n'.join(seo)+'\n'+s[b:]
ha=s.index('<head>'); hb=s.index('</head>'); head=s[ha:hb]
head=re.sub(r'<script type="application/ld\+json"[^>]*>.*?</script>\n?','',head,flags=re.S)
s=s[:ha]+head+'\n'.join(schemas)+'\n'+s[hb:]

# ---- FAQ: exact wording of the English structured data ----
import json
faq=json.loads(re.search(r'id="rb-schema-faq">\s*(\{.*?\})\s*</script>',eh,re.S).group(1))['mainEntity']
FRQ=["Accompagnez-vous les indépendants&nbsp;?","Accompagnez-vous les start-up&nbsp;?","Une société étrangère peut-elle vous confier toute sa gestion française&nbsp;?","Travaillez-vous en anglais&nbsp;?"]
FRA=["Oui. Meyvin accompagne les indépendants et dirigeants de la création au suivi comptable, fiscal et social.","Oui, avec une approche adaptée à la croissance : reporting, trésorerie, fiscalité, paie et outils digitaux.","Oui. Nous pouvons coordonner la création ou l'implantation puis la comptabilité, la fiscalité, la TVA, la paie et le reporting en France.","Oui. Notre accompagnement international est pensé pour faciliter les échanges avec les équipes et maisons mères étrangères."]
for q,fq,fa in zip(faq,FRQ,FRA):
    T[fq]=q['name']; T[fa]=q['acceptedAnswer']['text']

# ---- text pass on the body (text nodes and aria-label / alt), exact matches only ----
ba=s.index('<body>'); bb=s.index('<script>\n(() => {')
body=s[ba:bb]; parts=re.split(r'(<[^>]+>)',body); missing=[]
def tr(t):
    if t in T: return T[t]
    if t in SAME or not re.search(r'[A-Za-zÀ-ÿ]',t): return t
    missing.append(t); return t
out=[]
for p in parts:
    if p.startswith('<'):
        p=re.sub(r'(aria-label|alt)="([^"]+)"',lambda m:'%s="%s"'%(m.group(1),tr(m.group(2))),p)
        p=re.sub(r'href="([^"#?]+)((?:#[^"]*)?)"',lambda m:'href="%s%s"'%(LINKS.get(m.group(1),m.group(1)),m.group(2)),p)
        out.append(p)
    else:
        t=p.strip()
        out.append(p.replace(t,tr(t)) if t else p)
s=s[:ba]+''.join(out)+s[bb:]
assert not missing, missing

# ---- strings held in the page script ----
rep("const words = ['Comptabilité', 'Fiscalité', 'Paie & social', 'Juridique', 'Création d’entreprise', 'Implantation en France', 'Reporting FR / EN', 'Conseil au dirigeant'];","const words = ['Accounting', 'French tax', 'Payroll & HR', 'Legal', 'Company formation', 'France market entry', 'FR / EN reporting', 'Owner-manager advisory'];")
rep("const TITLES = ['Création de société', 'Comptabilité au fil de l’eau', 'Tableau de bord', 'Implantation en France'];","const TITLES = ['Company formation', 'Day-to-day bookkeeping', 'Dashboard', 'Setting up in France'];")
open(REPO+'french-accountant-paris.html','w',encoding='utf-8').write(s)
# leftovers: French-looking words still in the visible body
vis=re.sub(r'<[^>]+>',' ',''.join(out))
print('accented leftovers:',sorted(set(re.findall(r"[A-Za-z'’-]*[àâçéèêëîïôûùÀÂÇÉÈÊ][A-Za-zÀ-ÿ'’-]*",vis))))
