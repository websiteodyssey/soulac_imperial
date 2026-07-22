# Soulac Impérial — site vitrine

Restaurant chinois & japonais, 1 rue el Burgo de Osma, 33780 Soulac-sur-Mer.
React 19 + TypeScript + Vite + Tailwind v4, bilingue FR/EN, déployé sur GitHub Pages.

Site **vitrine uniquement** : pas de panier, pas de commande en ligne, aucun
formulaire. La seule action est le bouton « Réserver ».

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
npm run lint
```

## Ce qu'il faut modifier, et où

| À changer | Fichier |
| --- | --- |
| **Lien de réservation**, adresse, horaires, e-mail, téléphone, réseaux, mentions légales | `src/config/siteConfig.ts` |
| **La carte** : plats, descriptions, prix, catégories (FR + EN) | `src/data/menu.ts` |
| Photos et leur répartition par page | `src/config/media.ts` |
| Libellés du bandeau « Nos spécialités » | `src/data/specialites.ts` |
| Tous les textes du site | `src/i18n/locales/fr.json` et `en.json` |

### Le bouton « Réserver »

`siteConfig.reservationUrl` est **vide** pour l'instant : tant qu'il l'est, tous
les boutons « Réserver » du site renvoient vers la page Contact (aucun lien
mort). Il suffit d'y coller l'URL du module de réservation — TheFork, Odyssey,
Google… — pour que les boutons l'ouvrent dans un nouvel onglet, partout, sans
autre modification.

Toute information laissée vide dans `siteConfig` (téléphone, réseau social,
ligne des mentions légales) est automatiquement masquée à l'écran.

## Pages

`/` accueil · `/la-maison` · `/la-carte` · `/galerie` · `/contact` ·
`/mentions-legales` · `/confidentialite`

Le routeur travaille en mode *hash* (`/#/la-carte`) : GitHub Pages ne sait pas
réécrire les URL, un rechargement direct renverrait sinon une 404.

## Photographies

- `public/images/salle/` — la maison, photographiée sur place (14 vues)
- `public/images/table/` — les plats, banque d'images libre de droits (12 vues)
- `public/images/univers/` — 19 photographies d'ambiance (Unsplash, licence
  libre, usage commercial sans attribution) : nigiri, sashimi, makis, dim sum,
  vapeur de bambou, wok, grillades, brochettes, soupe, dessert dressé, canards
  laqués, mains du chef, saké, ramen, braise, flamme, lanternes…
- `public/images/facade.webp` — la façade au crépuscule
- `photos-sources/` — originaux non compressés, hors build

Chaque photo existe en **deux tailles** : la grande (≤ 1500 px) et une vignette
`-sm.webp` (640 px). Le composant `src/components/Photo.tsx` sert la bonne via
`srcset` et réserve la place exacte (`width`/`height`) — pas de saut de mise en
page, et une vignette de 260 px ne télécharge jamais le fichier de 150 ko.
Les fonds en parallaxe, toujours très atténués, utilisent la vignette.

Pour ajouter une photo : la poser dans `public/images/…`, générer sa vignette,
puis la déclarer dans `src/config/media.ts` (chemin + dimensions réelles).

Deux règles tenues par `src/config/media.ts` :

1. **Une photo n'apparaît jamais deux fois sur une même page** (listes disjointes).
2. **Les photos de la salle ne servent que sur l'accueil, La Maison et la
   galerie.** Les autres pages s'appuient sur `images/univers`, pour ne pas
   revoir la même enfilade de tables de page en page.

## Mobile

- La carte se lit en **accordéon** sous 1024 px : une catégorie dépliée à la
  fois, les puces de la barre collante ouvrent la bonne (4 écrans au lieu de 11).
- Les grilles passent à deux colonnes dès le mobile (signatures, familles,
  mosaïque, valeurs, pied de page) et les textes secondaires sont réservés au
  grand écran.
- Le plan Google est masqué sur l'accueil en mobile — il reste sur Contact.

## Optimisations en place

- **Chargement différé des pages** (`React.lazy`) : seul l'accueil est livré au
  premier chargement, les autres vues arrivent à la demande.
- **Images responsives** (`srcset` + `sizes`) et vignettes 640 px.
- **Polices** limitées aux graisses réellement utilisées.
- Le bandeau défilant des spécialités **s'arrête quand il sort de l'écran**
  (`IntersectionObserver`) : aucune animation ne tourne dans le vide.
- Toutes les photos sont en WebP, recompressées (≤ 1500 px, qualité 72).

## Déploiement

Push sur `main` → GitHub Actions (`.github/workflows/deploy.yml`) construit et
publie sur GitHub Pages. `vite.config.ts` utilise `base: "./"` (chemins relatifs),
le site fonctionne donc aussi dans un sous-répertoire.
