# Yurday

Site de Yurday : des journées entièrement sur mesure, pensées pour la personne qui compte.
Reconstruit sous **Next.js 16** (App Router, TypeScript, React 19) à partir du site statique
d'origine, conservé pour référence dans `legacy/`.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Construction de production (54 pages pré-générées) |
| `npm start` | Sert la construction de production |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run typecheck` | TypeScript en mode strict |

Copiez `.env.example` vers `.env.local` si l'URL du site diffère de `https://yurday.fr`
(préproduction, domaine de test) : elle sert aux URL canoniques, au sitemap et aux
données structurées.

## Structure

```
src/
  app/
    [locale]/               en-tête, pied de page, langue et direction du texte
      page.tsx              accueil
      [occasion]/           les 5 pages occasion (slug traduit par langue)
      mentions-legales/ cgv/ politique-de-confidentialite/   (français uniquement)
    sitemap.ts robots.ts    générés à la construction
  components/
    layout/                 en-tête, bandeau promo, pied de page, WhatsApp, pop-up
    home/                   sections de l'accueil, une par fichier + son CSS
    occasion/               contenu des pages occasion
    legal/  ui/             coquille des pages légales, briques réutilisables
  data/reviews.ts           39 avis (métadonnées ; le texte vit dans les traductions)
  hooks/                    apparition au défilement, animations réduites
  i18n/
    config.ts               langues, direction, drapeau, préfixe d'URL
    messages/<lang>.json    tous les textes du site, structurés
  lib/
    site.ts                 coordonnées, chiffres, formulaire
    occasions.ts            clés, slugs traduits, photos
    seo.ts                  titres, canoniques, hreflang, Open Graph
    structured-data.ts      schema.org
    routes.ts               pages légales, équivalents entre langues
  proxy.ts                  routage des langues (voir ci-dessous)
  styles/                   variables de couleur, base, pages légales
```

Chaque composant importe sa propre feuille de style (`Hero.css` à côté de `Hero.tsx`).
Les classes restent globales et identiques à celles du site d'origine, ce qui a permis
de reprendre le design au pixel près ; les règles qui pouvaient entrer en conflit avec
`base.css` sont volontairement plus spécifiques pour ne pas dépendre de l'ordre de
chargement.

## Langues et URL

Neuf langues : français (référence), anglais, espagnol, portugais, chinois, allemand,
italien, japonais, arabe (avec passage en écriture droite-à-gauche).

Le français n'est pas préfixé, les autres langues le sont, et chaque page n'a qu'une
seule URL indexable :

| Demande | Résultat |
| --- | --- |
| `/` | accueil français |
| `/anniversaire` | page occasion française |
| `/en/birthday` | même page en anglais (slug traduit) |
| `/fr/anniversaire` | redirection permanente vers `/anniversaire` |
| `/anniversaire.html` | redirection permanente depuis l'ancien site |

Les slugs traduits sont déclarés dans `src/lib/occasions.ts`. Les langues à écriture non
latine reprennent le slug anglais pour garder des adresses partageables.

## Ce qui a été fait pour le référencement

- Rendu côté serveur : tout le texte est dans le HTML, dans les neuf langues.
- Un titre et une méta-description rédigés par page **et par langue**.
- URL canonique + `hreflang` complet (`x-default` compris) sur chaque page, en-tête et sitemap.
- Sitemap et `robots.txt` générés (54 URL), avec les alternatives de langue.
- Données structurées schema.org : `ProfessionalService`, `WebSite`, `FAQPage`,
  `Service` et `BreadcrumbList` sur les pages occasion.
  Les avis ne sont volontairement **pas** balisés : Google interdit `AggregateRating`
  pour les avis qu'une entreprise collecte sur son propre site.
- Images de partage 1200 × 630 par page (`public/og/`), favicon et icône Apple.
- Polices auto-hébergées via `next/font` (plus aucun appel à Google Fonts) et images
  servies en WebP dimensionné par `next/image`.
- Redirections permanentes depuis les anciennes adresses `.html`.
- Accessibilité : lien d'évitement, `aria-expanded` sur la FAQ et le sélecteur de langue,
  duplicatas du bandeau d'avis masqués aux lecteurs d'écran, contenu affiché même sans
  JavaScript (`<noscript>`).

## Formulaire de contact

Le visiteur choisit son canal après avoir rempli le formulaire :

- **WhatsApp** : ouverture de `wa.me` avec un message pré-rempli et traduit ;
- **Email** : envoi vers `public/__forms.html`, page technique que Netlify Forms détecte
  à la construction. Pour un autre hébergeur, remplacez `site.form.endpoint`
  (`src/lib/site.ts`) par votre propre route.

## À finir avant mise en ligne

- **Pages légales** : `mentions-legales`, `cgv` et `politique-de-confidentialite`
  contiennent des champs surlignés « à compléter » (forme juridique, SIRET, hébergeur,
  médiateur, durées de conservation). Elles sont en `noindex` tant que ce n'est pas fait :
  retirez `robots: { index: false }` dans `src/lib/legal-metadata.ts` une fois validées.
- **Chiffres affichés** (4,8 sur 100+ avis, 150 journées) : centralisés dans
  `src/lib/site.ts`, à tenir à jour.
- **Réseaux sociaux** : `site.social` est vide ; les y ajouter alimente `sameAs`
  dans les données structurées.
- Les textes des pages légales n'existent qu'en français ; le sélecteur de langue y
  renvoie vers l'accueil de la langue choisie.

## Assets générés

`scripts/generate-assets.py` reconstruit le favicon, l'icône Apple et les six images de
partage à partir du logo et des photos de `public/images` (nécessite Pillow) :

```bash
python3 scripts/generate-assets.py
```
