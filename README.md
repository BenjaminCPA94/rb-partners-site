# Site RB Partners

Site vitrine du cabinet d'expertise comptable RB Partners (Rachel Illouz & Benjamin Haziza).

## Aperçu en local

Aucune installation requise : ouvrez `index.html` dans un navigateur, ou lancez un petit serveur local :

```bash
python3 -m http.server 8000
```

Puis rendez-vous sur `http://localhost:8000`.

## Structure

```
├── index.html          # Contenu et structure de la page
├── css/styles.css      # Styles (palette bleu marine & or)
├── js/main.js          # Menu mobile, animations au scroll, formulaire de contact
└── assets/favicon.svg  # Favicon / monogramme RB
```

## À personnaliser avant mise en ligne

- **Coordonnées** : les numéros de téléphone affichés (`01 00 00 00 00`, `06 00 00 00 01/02`) sont encore des valeurs factices — à remplacer dans tous les fichiers HTML (topbar + menu « Nous appeler ») avant toute diffusion du site.
- **Nom de domaine / email** : `contact@rb-partners.fr` est utilisé partout sur le site (liens `mailto:`, formulaire de contact). S'il n'est pas encore actif, pensez à le configurer.
- **Formulaire de contact** : branché sur [FormSubmit.co](https://formsubmit.co) (`js/main.js`), qui envoie les messages par email sans backend à héberger. **Étape obligatoire** : à la toute première soumission réelle du formulaire, FormSubmit envoie un email de confirmation à `contact@rb-partners.fr` — il faut cliquer sur le lien de validation qu'il contient pour activer la réception des messages suivants.
- **Mentions légales** : `mentions-legales.html` et `politique-confidentialite.html` contiennent des champs `[À COMPLÉTER]` (SIREN, RCS, forme juridique, adresse, numéro d'inscription à l'Ordre des experts-comptables...) à renseigner avant mise en ligne.
- **Photos de l'équipe** : les avatars sont actuellement des initiales (RI / BH). Vous pouvez les remplacer par de vraies photos dans `.team-card__avatar`.
- **Nom de domaine dédié** : le site est actuellement servi sur un sous-chemin `github.io`. Pour passer sur `rb-partners.fr`, ajoutez un fichier `CNAME` à la racine et configurez les DNS du domaine.

## Déploiement

Le site est 100% statique (HTML/CSS/JS, sans dépendance ni build). Il est déployé automatiquement sur GitHub Pages à chaque push sur `main` via `.github/workflows/deploy-pages.yml`.
