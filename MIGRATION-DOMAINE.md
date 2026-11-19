# Migration vers meyvin.fr : ce qui change, et ce qui ne change pas

État au moment de la rédaction : le site est servi par GitHub Pages à l'adresse
`https://benjamincpa94.github.io/rb-partners-site/`. Le domaine `meyvin.fr` n'est pas
configuré dans ce dépôt (pas de fichier `CNAME`) et n'a pas été confirmé comme étant la
propriété du cabinet. **Rien n'a été modifié côté DNS.** Tant que le domaine n'est pas
confirmé, la version GitHub Pages reste la référence et fonctionne telle quelle : tous les
liens internes du site sont relatifs et les canoniques sont absolus vers github.io.

## 1. Avant de toucher à quoi que ce soit

- [ ] Confirmer que `meyvin.fr` appartient bien au cabinet (registrar, titulaire).
- [ ] Décider si l'adresse définitive est `https://meyvin.fr/` ou `https://www.meyvin.fr/`
      (une seule des deux, l'autre redirige vers elle).
- [ ] Vérifier que les boîtes `contact@meyvin.fr` existent. Aujourd'hui le formulaire et les
      liens `mailto:` utilisent `contact@meyvin.fr`, mais les boîtes créées sont en
      `@meyvin-experts.com`. Le relais FormSubmit doit aussi être activé pour cette adresse
      (clic sur le lien de confirmation reçu au premier envoi).

## 2. Configuration (hors dépôt, par le titulaire du domaine)

1. Dans GitHub : *Settings → Pages → Custom domain*, saisir le domaine, puis cocher
   *Enforce HTTPS* une fois le certificat émis. Cela crée un fichier `CNAME` dans le dépôt.
2. Chez le registrar : enregistrements DNS indiqués par la documentation GitHub Pages
   (enregistrements `A` / `AAAA` vers GitHub pour le domaine nu, `CNAME` vers
   `benjamincpa94.github.io` pour `www`).
3. Attendre la propagation et l'émission du certificat avant l'étape suivante.

## 3. Changements dans le dépôt, à faire le jour de la bascule

Remplacer `https://benjamincpa94.github.io/rb-partners-site/` par l'adresse définitive,
et **uniquement ces occurrences absolues** (les liens relatifs restent inchangés) :

| Où | Quoi |
|---|---|
| Toutes les pages `.html` (≈ 80) | `<link rel="canonical">`, `<link rel="alternate" hreflang=…>` (y compris `x-default`), URL des données structurées (`@id`, `url`, `logo`, `image`, `item` des fils d'Ariane). Il n'y a pas de balise `og:url` ni `og:image` aujourd'hui : voir la liste des données à fournir (image de partage) |
| `sitemap.xml` (78 URL) | toutes les balises `<loc>` |
| `robots.txt` | ligne `Sitemap:` |
| `llms.txt` | tous les liens (25) |
| `index.html` et `french-accountant-paris.html` | données structurées `rb-schema-*` |
| `SEO-GEO-AUDIT.md` | liens de référence (documentation) |

Commande à adapter puis à relire avant de valider (exemple, ne pas lancer sans relecture) :

```
grep -rl "benjamincpa94.github.io/rb-partners-site" . --include=*.html --include=*.xml \
  --include=*.txt --include=*.md | xargs sed -i 's|https://benjamincpa94.github.io/rb-partners-site/|https://meyvin.fr/|g'
```

Points d'attention :
- la racine du site passe de `/rb-partners-site/` à `/` : les chemins **relatifs** du dépôt
  fonctionnent dans les deux cas ; vérifier qu'aucun lien n'est écrit en `/…` absolu
  (une recherche dans les pages, les feuilles de style et les scripts n'en a trouvé aucun).
- Les liens `https://benjamincpa94.github.io/…` dans `llms.txt` doivent être mis à jour, sinon
  les assistants IA continueront d'être renvoyés vers l'ancienne adresse.

## 4. Après la bascule

- [ ] Redirection de l'ancienne adresse : GitHub Pages ne sait pas faire de redirection 301
      depuis `github.io` vers un domaine personnalisé pour un site de projet. Prévoir de laisser
      les pages en place (les canoniques pointeront vers le nouveau domaine) ou de déposer un
      petit fichier de redirection (`<meta http-equiv="refresh">` + canonique) sur l'ancien
      chemin si le dépôt est conservé.
- [ ] Déclarer le nouveau site dans Google Search Console et Bing Webmaster Tools, soumettre
      `sitemap.xml`.
- [ ] Mettre à jour les liens extérieurs : fiche Google, LinkedIn, signatures e-mail, page de
      réservation Microsoft Bookings (liens de retour éventuels).
- [ ] Relancer les vérifications : canoniques, hreflang réciproques, liens, formulaire,
      boutons de rendez-vous.
