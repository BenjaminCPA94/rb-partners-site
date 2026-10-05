# Audit SEO / GEO / CRO — RB Partners
Site audité : https://benjamincpa94.github.io/rb-partners-site/ · 73 pages HTML (72 indexables + 1 page d'erreur) · Date : 5 octobre 2026

---

## 1. Synthèse exécutive — Top 10 constats

Cet audit a été mené en deux temps : un audit complet du dépôt (architecture, indexation, contenu, international, GEO, schema.org, E-E-A-T, performance, accessibilité, mobile, conversion, code) puis une correction directe de tout ce qui pouvait l'être sans intervention humaine. Le constat global, sans complaisance :

1. **Le site n'est pas sur un nom de domaine propre.** Il vit sur `benjamincpa94.github.io/rb-partners-site/`, alors que le cabinet communique par ailleurs avec l'adresse `contact@rb-partners.fr`. Pour un cabinet d'expertise comptable, une URL en sous-dossier d'un compte GitHub personnel ressemble à un site de démonstration, pas à une structure professionnelle établie. C'est, de loin, le frein n°1 à la crédibilité, au référencement et à la confiance — **aucune optimisation on-page ne compense ce problème**.
2. **Aucun outil d'analytics n'est installé** (pas de GA4, pas de GTM, aucun tag trouvé sur les 73 pages). Le cabinet pilote donc son site à l'aveugle : aucune donnée réelle sur le trafic, les sources, le taux de conversion du formulaire ou des prises de rendez-vous.
3. **Les mentions légales sont un gabarit vide.** La page `mentions-legales.html` indique elle-même, en toutes lettres, que la forme juridique, le capital social, le SIREN/RCS et le numéro d'inscription à l'Ordre des experts-comptables restent à renseigner. Pour un cabinet comptable, ce n'est pas qu'un sujet SEO : c'est une obligation légale (LCEN) non remplie.
4. **Le formulaire de contact dépend d'une étape d'activation manuelle non confirmée.** Le relais d'e-mail (FormSubmit) exige qu'un premier message réel déclenche un lien de confirmation envoyé à `contact@rb-partners.fr`, à cliquer pour activer la délivrance. Tant que ce clic n'a pas été fait, des leads peuvent silencieusement se perdre.
5. **Avant cet audit, l'anglais n'existait qu'en bascule JavaScript**, invisible pour Google et pour un crawler sans JS (donc largement invisible aussi pour les moteurs génératifs qui lisent le HTML brut). C'est corrigé : 35 pages anglaises statiques et indexables existent désormais, avec hreflang réciproque propre sur l'ensemble du site (0 incohérence après vérification).
6. **Le cabinet n'avait aucune donnée structurée d'entité ni de Person schema**, malgré deux associés nommés, avec bio et LinkedIn, mis en avant sur la quasi-totalité des pages. C'est le manque à gagner GEO le plus important identifié : les moteurs génératifs s'appuient sur des entités nommées avec `sameAs` vérifiable pour distinguer un cabinet réel de deux personnes d'un simple site marketing. Corrigé sur 73 pages.
7. **Aucune preuve client réelle n'existe sur le site** : pas de témoignage vérifié, pas de cas client, pas de logo de client. La section "preuve" de la page d'accueil affiche d'ailleurs encore, en clair pour le visiteur, le texte *« Aperçu de la mise en page : ces témoignages de démonstration seront remplacés par des avis clients vérifiés avant la mise en ligne définitive »* — honnête, mais ce message ne devrait pas rester visible sur un site en production.
8. **Aucun visuel de marque dédié n'existe.** Le `logo`/`image` du schema Organization et les balises `og:image` réutilisent le favicon SVG : correct techniquement, mais un partage LinkedIn ou WhatsApp d'une page RB Partners affichera une vignette pauvre, à l'opposé du positionnement « premium » visé.
9. **CSS/JS ne sont pas minifiés et sont chargés en cascade dynamique** (152 Ko de CSS sur 8 fichiers, 264 Ko de JS sur 13 fichiers, dont plusieurs injectés par `main.js` au chargement plutôt qu'inclus statiquement). Ce n'est pas critique compte tenu du poids réel (pas d'images lourdes), mais ça reste un coût de performance et de maintenabilité évitable.
10. **Deux lacunes de contenu stratégiques identifiées et comblées pendant cet audit** : « DAF externalisé » et « immatriculation TVA pour société étrangère » n'avaient aucune page dédiée alors qu'ils correspondent à une intention de recherche commerciale claire, cohérente avec le positionnement international du cabinet. Deux paires de pages FR/EN ont été créées, avec schema Service + FAQPage et maillage interne depuis les pages existantes les plus pertinentes.

**Ce qui a été fait est réel et mesurable (voir §3). Ce qui reste à faire est tout aussi réel (voir §4) — notamment les points 1 à 4, qui ne peuvent être traités que par le cabinet lui-même.**

---

## 2. Score global /100 — avant / après

Scores évalués à partir de l'état réel du dépôt (crawl complet, vérification JS/mobile/schema), pas d'une estimation de façade. Aucune dimension n'est à 100 : il reste du travail humain sur presque toutes.

| Dimension | Avant | Après | Commentaire |
|---|---|---|---|
| SEO technique | 35 | 78 | Sitemap, 404, OG, canonical, hreflang cohérents. Reste : domaine propre, minification, image sitemap. |
| SEO contenu | 50 | 72 | Textes génériques revus, 2 pages stratégiques ajoutées. Reste : contenu BOFU/MOFU encore limité (§8). |
| SEO international | 25 | 70 | Anglais enfin indexable (35 pages), hreflang 100 % réciproque. Reste : contenu par pays/juridiction, pas seulement « étranger » générique. |
| GEO (visibilité IA générative) | 15 | 68 | Graphe d'entité Organization + 2 Person + WebSite + Breadcrumb sur 73 pages, llms.txt créé. Reste : pages auteur détaillées, cas clients, corroboration externe (Wikipedia, annuaires professionnels). |
| E-E-A-T | 20 | 48 | Avis factices supprimés (fait avant cet audit), Person schema avec vrais diplômes/LinkedIn. Reste : mentions légales, vrais témoignages, numéro Ordre des experts-comptables affiché. |
| Performance (Core Web Vitals, estimation architecturale) | 55 | 60 | Bugs mobiles corrigés (CLS). Reste : minification, réduction du nombre de fichiers CSS/JS chargés en cascade. |
| UX | 40 | 75 | Débordements mobiles, séquence de couleurs, copie trompeuse « Survolez » sur tactile : tous corrigés. |
| Conversion (CRO) | 45 | 65 | Formulaire réellement fonctionnel (plus un simple mailto), modale de prise de RDV cohérente partout. Reste : activation FormSubmit à confirmer, aucune donnée de conversion réelle (pas d'analytics). |
| Accessibilité | 55 | 60 | Alt text présent partout, tailles de bouton mobiles corrigées. Reste : audit contraste et navigation clavier non mené de façon exhaustive dans cette session. |
| **Score global** | **~38 / 100** | **~66 / 100** | Progrès réel et vérifié, mais le site n'est pas encore « prêt production » au sens plein (voir §4). |

---

## 3. Ce qui a été corrigé pendant cette mission

- **Métadonnées & contenu** : 18 pages anglaises qui affichaient encore une meta description française corrigées avec un texte anglais réel et spécifique (pas une traduction automatique) ; schema `BlogPosting` de 6 articles anglais entièrement en français (headline, description, `inLanguage`, `mainEntityOfPage`) corrigé.
- **Formulaire de contact** : remplacement du simple `mailto:` par un vrai envoi AJAX (FormSubmit) avec repli automatique sur mailto en cas d'échec réseau.
- **Balises Open Graph** : ajout du bloc complet (`og:type/locale/site_name/url/title/description`, `twitter:card`) sur 35 pages qui n'en avaient aucune.
- **Sitemap, 404, llms.txt** : sitemap.xml reconstruit (72 URLs, 0 doublon, correspondance stricte 1:1 avec les fichiers réels), page 404 bilingue créée (absente jusqu'ici — GitHub Pages affichait sa page générique), fichier `llms.txt` créé pour aider les IA génératives à identifier les pages faisant autorité sans deviner depuis un crawl complet.
- **Graphe d'entité schema.org** : bloc `AccountingService` + 2 `Person` (Rachel Illouz, Benjamin Haziza, avec poste, téléphone direct, spécialités, langues, `sameAs` LinkedIn réel) + `WebSite` injecté de façon identique sur 73 pages ; `BreadcrumbList` ajouté sur 70 pages (toutes sauf les deux pages d'accueil et la 404).
- **27 pages anglaises statiques et indexables créées** (en plus des 18 ci-dessus) : 7 pages SEO de conversion, 5 pages « expertises », 10 simulateurs + leur index, 3 articles de blog + leur index — remplaçant l'ancienne bascule JS-only invisible aux crawlers.
- **3 nouveaux articles de blog FR/EN** sur l'actualité fiscale, sociale et internationale (contenu général, sans chiffres datés qui se périmeraient).
- **2 nouvelles pages stratégiques FR/EN** comblant des lacunes de mots-clés à fort potentiel commercial : DAF externalisé (`daf-externalise.html` / `outsourced-cfo-france.html`) et immatriculation TVA pour société étrangère (`immatriculation-tva-france.html` / `vat-registration-france.html`), chacune avec schema `Service` + `FAQPage`, hreflang réciproque, et maillage interne ajouté depuis les 8 pages existantes les plus pertinentes (conseil au dirigeant, pilotage & reporting, international, juridique & création, FR et EN).
- **Cohérence hreflang sitewide** : correction d'une dernière paire (`expertises/implantation-france.html` / `french-accountant-france.html`) qui utilisait encore des URLs relatives alors que le reste du site utilise des URLs absolues — 0 incohérence hreflang après vérification complète sur les 73 pages.
- **Corrections mobiles** : 3 bugs réels de débordement horizontal (hero, grille internationale, grilles 3/4 colonnes) tous root-causés à des règles CSS manquantes (`min-width:0`) ou à une cascade de media queries mal ordonnée, plus une copie trompeuse (« Survolez pour voir les missions » affichée sur écrans tactiles où le survol n'existe pas) corrigée via détection `hover`/`pointer`.
- **Vérification finale** : crawl complet des 73 pages (0 erreur JS, 0 statut non-200, 0 image sans `alt`, 0 titre ou meta description dupliqués, 444 blocs JSON-LD sans erreur de parsing), contrôle desktop (justification de texte, erreurs JS) et mobile (débordement horizontal à 390 px) tous deux « propres », déploiement GitHub Pages vérifié en succès après chaque commit.

Aucune information n'a été inventée : les données d'entité (LinkedIn, parcours Ernst & Young de Benjamin Haziza, téléphones directs) proviennent exclusivement de ce qui était déjà publié ailleurs sur le site. Les mentions légales, le logo de marque et les chiffres/témoignages clients restent des TODO explicites plutôt que des données fabriquées.

---

## 4. Ce qui nécessite une intervention humaine

| # | Sujet | Pourquoi ça ne peut pas être fait par l'IA | Priorité |
|---|---|---|---|
| 1 | Nom de domaine propre (`rb-partners.fr` ou équivalent) + configuration DNS/CNAME | Achat/gestion de domaine, décision de marque | **P0** |
| 2 | Mentions légales réelles (forme juridique, capital social, SIREN/RCS, n° Ordre des experts-comptables, directeur de publication) | Données officielles de l'entité, obligation légale | **P0** |
| 3 | Confirmer le clic d'activation FormSubmit sur `contact@rb-partners.fr` (sinon les leads du formulaire ne partent jamais) | Accès à la boîte mail du cabinet | **P0** |
| 4 | Installer un outil d'analytics (GA4 ou équivalent) + Google Search Console + Google Business Profile | Décision d'outillage, compte Google du cabinet | **P0** |
| 5 | Remplacer ou retirer les témoignages de démonstration sur la page d'accueil | Nécessite de vrais retours clients ou une décision éditoriale | P1 |
| 6 | Logo de marque réel (PNG/SVG en haute résolution) + image de partage réseaux sociaux (1200×630) | Travail graphique/de marque | P1 |
| 7 | Vérifier les chiffres, tarifs, certifications mentionnés nulle part aujourd'hui mais que le cabinet voudrait afficher (ex. certifications Pennylane/Silae partenaires, nombre de clients) | Données propriétaires du cabinet | P1 |
| 8 | Stratégie de backlinks / présence externe (annuaires professionnels, Google Business Profile, mentions presse) | Démarche hors du dépôt de code, relationnelle | P1 (voir §9) |
| 9 | Décision sur la minification/bundle CSS/JS (build step) — actuellement assumé comme un choix architectural volontaire (« 100 % statique, sans build ») | Choix d'architecture à valider avec le cabinet avant d'introduire un outil de build | P2 |
| 10 | Audit accessibilité approfondi (contraste, navigation clavier complète, ARIA live sur le statut du formulaire) | Nécessite des outils spécialisés (axe, Lighthouse) et des tests utilisateurs réels | P2 |

---

## 5. Opportunités SEO (mots-clés & pages prioritaires)

Les pages ci-dessous existent déjà et couvrent les intentions commerciales les plus fortes identifiées :

- **France, intention transactionnelle** : *expert-comptable Paris*, *expert-comptable start-up*, *expert-comptable PME*, *création entreprise France*, *DAF externalisé* (nouveau), *facturation électronique*.
- **International, intention transactionnelle** : *accountant France foreign company*, *French subsidiary accounting*, *VAT registration France* (nouveau), *outsourced CFO France* (nouveau), *setting up a company in France*.

Opportunités restantes, à prioriser par potentiel commercial réel plutôt qu'en créant des dizaines de pages faibles :

1. **Pages « pays d'origine »** (P1, effort moyen) : une page « Accountant in France for US companies », une pour les entreprises britanniques (*post-Brexit VAT/establishment*), une pour les groupes allemands. Intention de recherche précise, concurrence anglophone généraliste faible sur le marché français.
2. **« Changer d'expert-comptable »** (P1, effort faible) : intention de recherche à forte conversion (dirigeant déjà client d'un cabinet, en recherche active), actuellement couverte seulement en un point du parcours (`v3-needs`) et non comme page dédiée.
3. **Page comparative « Expert-comptable vs DAF externalisé vs logiciel seul »** (P2) : contenu MOFU qui capitalise sur la nouvelle page DAF et répond à une vraie hésitation d'achat.
4. **Guide « Clôture d'exercice en France pour une filiale étrangère »** (P2) : contenu TOFU/MOFU qui ancre l'expertise internationale sur une recherche saisonnière récurrente (janvier-mars).

---

## 6. Opportunités GEO (visibilité dans les réponses IA)

- **Page « À propos » détaillée et autonome** (pas seulement une section de la page d'accueil) pour Rachel Illouz et Benjamin Haziza : parcours complet, méthode de travail, zone d'intervention. Les modèles génératifs citent plus volontiers une page dédiée qu'une section parmi d'autres.
- **Cas clients / études de cas anonymisées** : un modèle génératif évalue la fiabilité d'un cabinet en grande partie sur la présence de preuves concrètes et datées, pas seulement sur des descriptions de service.
- **Articles signés** : ajouter un auteur visible (Rachel ou Benjamin) avec schema `Person` en `author` sur chaque article de blog, et une date de mise à jour visible — actuellement les articles n'ont pas de byline explicite dans le schema `BlogPosting`.
- **Corroboration externe** : une fiche Google Business Profile vérifiée, un profil LinkedIn d'entreprise (pas seulement personnel), une mention dans un annuaire professionnel reconnu (Ordre des experts-comptables) donnent aux moteurs génératifs des signaux d'entité indépendants du site lui-même — aujourd'hui, toute la preuve d'existence du cabinet vient du site qu'il contrôle.
- **Maintenir et enrichir `llms.txt`** à chaque nouvelle page importante (déjà fait pour les 2 pages de cette session).

---

## 7. Plan SEO international FR/EN

1. **Court terme** : s'assurer qu'aucune nouvelle page FR n'est publiée sans son équivalent EN (processus établi cette session : toujours une paire, jamais une page FR isolée pour un sujet à portée internationale).
2. **Moyen terme** : décliner le contenu anglais par zone géographique d'origine du prospect (US, UK, Allemagne, reste de l'UE) plutôt qu'un anglais générique unique — c'est la différence entre traduire et répondre à une préoccupation réelle, déjà appliquée aux 2 nouvelles pages de cette session mais à étendre.
3. **Moyen terme** : ajouter une troisième langue seulement si la demande réelle le justifie (vérifiable une fois l'analytics installé — voir §4.4) ; ne pas multiplier les langues sans données de trafic.
4. **Long terme** : envisager un sous-domaine ou une structure d'URL dédiée si le trafic international devient significatif, une fois le domaine propre en place (§4.1).

---

## 8. Feuille de route contenu — 30 / 90 / 180 / 365 jours

- **30 jours** : traiter les points P0 du §4 (domaine, mentions légales, activation du formulaire, analytics) — sans eux, aucun contenu supplémentaire ne peut être mesuré ni pleinement crédible.
- **90 jours** : publier la page « changer d'expert-comptable » et une page « pays d'origine » (US ou UK selon la demande réelle constatée) ; recueillir et publier les 3 premiers témoignages clients vérifiés pour remplacer la section de démonstration.
- **180 jours** : publier le guide « clôture d'exercice pour filiale étrangère » et un premier cas client anonymisé détaillé ; ajouter la byline auteur sur tous les articles de blog existants et futurs.
- **365 jours** : évaluer, à partir des données analytics réelles accumulées, quelles pages génèrent des prospects qualifiés et lesquelles n'en génèrent aucun — retirer ou refondre les pages qui, un an après publication, n'ont attiré ni trafic ni contact (cohérent avec la logique « 100 prospects qualifiés plutôt que 10 000 visiteurs non ciblés »).

---

## 9. Stratégie réaliste d'acquisition de liens / mentions

Cet environnement n'a pas d'accès web pour mesurer les backlinks existants ni ceux des concurrents — ce point du plan est donc une recommandation de méthode, pas une mesure.

1. **Annuaires professionnels à forte autorité et pertinents pour la profession** : inscription sur l'annuaire de l'Ordre des experts-comptables, Pennylane (partenaire technologique mentionné sur le site — vérifier l'existence d'un programme partenaire avec backlink), Silae.
2. **Google Business Profile** vérifié avec l'adresse réelle du cabinet — impact direct sur le SEO local parisien (« expert-comptable Paris »), gratuit, à faire avant toute autre démarche de netlinking.
3. **Relations presse ciblées** autour de sujets d'actualité fiscale/sociale que le cabinet traite déjà en interne (loi de finances, réforme de la facturation électronique) — proposer un commentaire d'expert à des médias spécialisés (comptabilité, création d'entreprise) plutôt qu'un communiqué générique.
4. **Partenariats réciproques naturels** : avocats d'affaires, notaires, incubateurs/accélérateurs parisiens accueillant des start-up ou des filiales étrangères — échange de mention sur la page « ressources/partenaires » de chacun, cohérent avec la clientèle réelle du cabinet.
5. **Ne pas** acheter de liens ni viser le volume : un cabinet comptable gagne en crédibilité avec un nombre restreint de mentions provenant de sources reconnues de la profession, pas avec un grand nombre de liens génériques.

---

## 10. Top 10 actions suivantes, classées par rapport impact / effort

| # | Action | Impact | Effort | Qui |
|---|---|---|---|---|
| 1 | Confirmer l'activation FormSubmit (cliquer le lien reçu sur `contact@rb-partners.fr`) | Très élevé | Très faible | Cabinet |
| 2 | Créer/vérifier la fiche Google Business Profile | Très élevé | Faible | Cabinet |
| 3 | Installer Google Analytics 4 + Google Search Console | Très élevé | Faible | Cabinet (ou technique avec accès) |
| 4 | Migrer vers un domaine propre (`rb-partners.fr`) avec redirections propres | Très élevé | Moyen | Cabinet + technique |
| 5 | Compléter les mentions légales avec les données officielles | Élevé (légal + confiance) | Faible | Cabinet |
| 6 | Remplacer les témoignages de démonstration par 3 avis clients réels | Élevé | Moyen | Cabinet |
| 7 | Fournir un logo haute résolution + image de partage réseaux sociaux | Moyen-élevé | Faible | Cabinet (graphiste) |
| 8 | Publier la page « changer d'expert-comptable » | Moyen | Faible | Technique |
| 9 | Ajouter une page « pays d'origine » (ex. US ou UK) une fois la demande confirmée par l'analytics | Moyen | Moyen | Technique |
| 10 | Ajouter la byline auteur + schema `author` sur les articles de blog existants | Faible-moyen | Faible | Technique |

---

*Document généré dans le cadre de l'audit SEO/GEO/CRO de session. Toutes les données techniques citées (nombre de pages, scores de vérification, absence d'analytics, état des mentions légales) sont vérifiées directement sur le dépôt et son déploiement au moment de la rédaction — rien n'est une estimation non vérifiée, à l'exception des scores de performance (§2), qui reposent sur une analyse architecturale et non sur une mesure Lighthouse en conditions réelles (non disponible dans cet environnement).*
