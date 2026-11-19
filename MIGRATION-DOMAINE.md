# Bascule vers meyvin-experts.com

Cette branche (`test/domaine-meyvin-experts`) change **toutes les adresses de référence** du site
de `https://benjamincpa94.github.io/rb-partners-site/` vers `https://meyvin-experts.com/`, et l'adresse
de contact de `contact@meyvin.fr` vers `contact@meyvin-experts.com`.

**Ne pas fusionner cette branche dans `main` avant que le domaine serve réellement le site.**
Tant que `https://meyvin-experts.com/` ne répond pas, les balises canoniques, le plan du site et les
données structurées pointeraient vers une adresse qui ne fonctionne pas, ce qui nuit au référencement.
Rien n'a été modifié côté DNS.

## Ce qui est déjà fait dans cette branche

- Canoniques, `hreflang` (y compris `x-default`), données structurées (`@id`, `url`, `logo`, fil d'Ariane),
  `sitemap.xml`, `robots.txt`, `llms.txt`, `index.html` et la version anglaise de l'accueil.
- Adresse de contact `contact@meyvin-experts.com` : liens `mailto:`, formulaire (relais FormSubmit et repli
  par messagerie), mentions légales, politique de confidentialité, textes français et anglais.
- Les liens internes sont relatifs : ils fonctionnent identiquement sur GitHub Pages et sur le nouveau domaine.

## Ce que vous devez faire (hors dépôt)

### 1. Vérifier que le domaine est bien à vous
`meyvin-experts.com` est déjà enregistré, et vos boîtes e-mail l'utilisent. Retrouvez le registrar et le
titulaire (compte OVH ou autre) avant de toucher quoi que ce soit.

### 2. Zone DNS chez le registrar : attention à la messagerie
Le domaine porte vos e-mails Microsoft 365. **Ne supprimez ni ne modifiez** les enregistrements `MX`,
`TXT` (SPF, vérification Microsoft), `CNAME` `autodiscover`, `selector1/2._domainkey` (DKIM) ni `_dmarc`.
Seuls les enregistrements du **site web** changent :

| Type | Nom | Valeur |
|---|---|---|
| `A` (4 lignes) | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `AAAA` (facultatif) | `@` | les adresses IPv6 de GitHub Pages |
| `CNAME` | `www` | `benjamincpa94.github.io` |

À faire : supprimer les anciens `A` / `CNAME` du site (ceux qui pointent vers l'hébergement actuel) pour les
remplacer par ceux-ci. Vérifiez les valeurs exactes dans la documentation GitHub Pages le jour de la bascule,
elles peuvent évoluer.

### 3. GitHub : domaine personnalisé
*Settings → Pages → Custom domain* : saisir `meyvin-experts.com`, enregistrer, attendre la validation du DNS,
puis cocher *Enforce HTTPS* quand le certificat est émis. (Conseil : vérifier d'abord le domaine dans
*Settings → Pages → Verified domains* pour empêcher qu'un tiers le réclame.)

### 4. E-mail de contact
- [ ] La boîte `contact@meyvin-experts.com` existe (boîte partagée ou alias) et reçoit bien du courrier.
- [ ] Le formulaire utilise le relais FormSubmit : au **premier envoi réel**, FormSubmit envoie un e-mail
      d'activation à cette adresse. Il faut cliquer sur le lien, sinon les messages ne partent pas (le site
      bascule alors sur l'ouverture de la messagerie du visiteur, qui doit cliquer sur « Envoyer »).

## Ordre conseillé le jour J

1. DNS (étape 2), attendre la propagation.
2. Domaine personnalisé dans GitHub (étape 3), HTTPS actif.
3. **Seulement ensuite**, fusionner cette branche dans `main` : le site est redéployé avec les nouvelles adresses.
4. Test réel du formulaire et activation FormSubmit (étape 4).

## Après la bascule

- [ ] `https://www.meyvin-experts.com/` renvoie vers `https://meyvin-experts.com/` (GitHub le fait quand les deux
      enregistrements existent).
- [ ] Redirection de l'ancienne adresse `github.io` : GitHub Pages ne fait pas de 301 pour un site de projet.
      Les pages restent en place et leurs canoniques pointent vers le nouveau domaine.
- [ ] Déclarer le site dans Google Search Console et Bing Webmaster Tools, soumettre `sitemap.xml`.
- [ ] Mettre à jour les liens extérieurs : fiche Google, LinkedIn, signatures e-mail.
- [ ] Relancer les vérifications : canoniques, `hreflang` réciproques, liens, formulaire, boutons de rendez-vous.

## Retour arrière

Si quelque chose se passe mal après la fusion, il suffit d'annuler le commit de fusion dans `main` : les
adresses `github.io` redeviennent les adresses de référence. Les enregistrements DNS peuvent rester en place.
