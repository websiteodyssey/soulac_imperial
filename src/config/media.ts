/**
 * Source unique des photographies du site.
 *
 * Chaque photo existe en deux tailles : la grande (jusqu'à 1500 px) et une
 * vignette `-sm` (640 px) générée à la compression. Le composant `<Photo>` sert
 * la bonne au navigateur via `srcset`, ce qui évite de télécharger 150 ko pour
 * une case de 260 px.
 *
 * Deux règles tenues ici, et nulle part ailleurs :
 *  1. Une image n'apparaît **jamais deux fois sur une même page**.
 *  2. Les photos de la vraie salle ne servent que sur **l'accueil et la
 *     galerie** ; les autres pages s'appuient sur les photographies d'ambiance.
 */

const BASE = import.meta.env.BASE_URL;

export interface Photo {
  /** Grande version. */
  src: string;
  /** Vignette 640 px, servie aux petites cases via srcset. */
  sm: string;
  w: number;
  h: number;
}

const p = (path: string, w: number, h: number): Photo => ({
  src: `${BASE}images/${path}.webp`,
  sm: `${BASE}images/${path}-sm.webp`,
  w,
  h,
});

export const media = {
  // Marque (PNG transparents, pas de variante)
  logo: `${BASE}images/logo-mark.png`,
  logoLockup: `${BASE}images/logo-lockup.png`,

  // Façade au crépuscule
  facade: p("facade", 1400, 560),

  // ─── La salle — photographiée sur place ───
  panoramique: p("salle/panoramique", 1086, 1448),
  ocre: p("salle/ocre", 1086, 1448),
  galerie: p("salle/galerie", 1086, 1448),
  intime: p("salle/intime", 1086, 1448),
  coinTorii: p("salle/coin-torii", 1086, 1448),
  miroir: p("salle/miroir", 1200, 900),
  salleLarge: p("salle/salle-large", 1200, 900),
  banquette: p("salle/banquette", 1086, 1448),
  bar: p("salle/bar", 1086, 1448),
  barrique: p("salle/barrique", 1086, 1448),
  alcove: p("salle/alcove", 1086, 1448),
  fresques: p("salle/fresques", 1086, 1448),
  tables: p("salle/tables", 1086, 1448),
  nappage: p("salle/nappage", 1086, 1448),

  // ─── La table ───
  sushi: p("table/sushi", 1000, 1500),
  rouleaux: p("table/rouleaux", 1200, 800),
  dimsum: p("table/dimsum", 1200, 792),
  vapeur: p("table/vapeur", 1200, 800),
  wok: p("table/wok", 1200, 681),
  canard: p("table/canard", 1000, 1500),
  planche: p("table/planche", 1200, 800),
  plateau: p("table/plateau", 1200, 960),
  ramen: p("table/ramen", 1000, 1500),
  epices: p("table/epices", 1200, 797),
  dessert: p("table/dessert", 1000, 1500),

  // ─── Ambiance — banque d'images libre de droits, usage commercial autorisé ───
  nigiri: p("univers/nigiri", 1500, 2250),
  vapeurBambou: p("univers/vapeur-bambou", 1500, 1000),
  vapeurPanier: p("univers/vapeur-panier", 1500, 1000),
  flamme: p("univers/flamme", 1500, 1000),
  sake: p("univers/sake", 1500, 2250),
  ramenNoir: p("univers/ramen-noir", 1500, 2248),
  braise: p("univers/braise", 1500, 2099),
  canards: p("univers/canards", 1500, 2250),
  mainsChef: p("univers/mains-chef", 1500, 1125),
  lanternes: p("univers/lanternes", 1500, 1000),
  sashimi: p("univers/sashimi", 1500, 2250),
  carteSushi: p("univers/carte-sushi", 1500, 1000),
  carteMaki: p("univers/carte-maki", 1500, 2258),
  carteDimsum: p("univers/carte-dimsum", 1500, 1212),
  carteWok: p("univers/carte-wok", 1500, 1000),
  carteGrill: p("univers/carte-grill", 1500, 1876),
  carteSoupe: p("univers/carte-soupe", 1500, 2250),
  dessertDresse: p("univers/dessert-dresse", 1500, 2250),

  // ── Photographies du restaurant (série fournie par la maison) ──
  // Prises en salle, elles montrent les vrais dressages. Elles ne sont
  // utilisées que là où aucun nom de plat n'est affiché : bandeaux de
  // catégorie, galerie, blocs éditoriaux.
  assortimentSushi: p("table/assortiment-sushi", 1125, 1500),
  tartareGambero: p("table/tartare-gambero", 1500, 1125),
  sashimiThon: p("table/sashimi-thon", 1500, 1125),
  tatakiThon: p("table/tataki-thon", 1500, 1125),
  plateauGlace: p("table/plateau-glace", 1125, 1500),
  cuilleresSaumon: p("table/cuilleres-saumon", 1500, 1125),
  carpaccioBoeuf: p("table/carpaccio-boeuf", 1500, 1125),
  plateauMixte: p("table/plateau-mixte", 1125, 1500),
  saumonBraise: p("table/saumon-braise", 1500, 1125),
  boeufPoele: p("table/boeuf-poele", 1500, 1251),
  plateauFumee: p("table/plateau-fumee", 1125, 1500),
  vapeurSiumai: p("table/vapeur-siumai", 1125, 1500),
  vapeurHakao: p("table/vapeur-hakao", 1125, 1500),
  tempuraCrevettes: p("table/tempura-crevettes", 1125, 1500),
} as const;

/**
 * Vidéo d'ambiance (plateau servi en salle, fumée de glace). Muette et
 * décorative : 6 s, H.264 960 px, `faststart` pour démarrer sans attendre
 * la fin du téléchargement.
 */
export const VIDEO_PLATEAU = {
  mp4: `${BASE}video/plateau.mp4`,
  poster: `${BASE}video/plateau-poster.webp`,
};

export type MediaKey = {
  [K in keyof typeof media]: (typeof media)[K] extends Photo ? K : never;
}[keyof typeof media];

/** Accès typé à une photo. */
export const photo = (key: MediaKey): Photo => media[key] as Photo;

/* ────────────────────────────────────────────────────────────────────────────
   Répartition par page — chaque liste est sans doublon.
   ──────────────────────────────────────────────────────────────────────────── */

/** Accueil — ouverture : façade puis vue large de la salle. */
export const HERO_SLIDES: MediaKey[] = ["facade", "salleLarge"];

/**
 * Accueil — le trio de « la maison » (bloc éditorial) : le geste, la salle,
 * l'assiette. Les trois vignettes sont petites : elles demandent des photos
 * prises de face, avec une profondeur et un haut évidents. Une vue plongeante
 * y devient illisible — elle a mieux sa place en grand, dans la galerie.
 */
export const MAISON_DUO: MediaKey[] = ["mainsChef", "coinTorii", "plateauGlace"];

/** Accueil — bandeau défilant : les 12 photos de plats, une fois chacune. */
export const SPECIALITES: MediaKey[] = [
  "sushi",
  "rouleaux",
  "dimsum",
  "wok",
  "canard",
  "plateau",
  "ramen",
  "epices",
  "dessert",
];

/** Accueil — les quatre signatures, dans l'ordre de `SIGNATURES` (data/menu). */
export const SIGNATURES_PHOTOS: MediaKey[] = ["sashimi", "canards", "carteSushi", "carteGrill"];

/** Accueil — les six familles de la carte. */
export const FAMILLES_PHOTOS: MediaKey[] = [
  "nigiri",
  "carteMaki",
  "carteDimsum",
  "carteWok",
  // Seule photographie de la maison dans cette grille : les créations du chef
  // sont les plats dont nous avons de vraies images.
  "tartareGambero",
  "dessertDresse",
];

/** Accueil — bande « atmosphère » : 4 vues de salle, distinctes du hero. */
export const MOSAIQUE: MediaKey[] = ["panoramique", "ocre", "miroir", "intime"];

/**
 * Accueil — les deux photos qui encadrent la vidéo de service. Prises en salle
 * comme elle, elles ne portent aucune légende : le bloc montre le geste, pas
 * une carte. Aucune des deux ne paraît ailleurs sur l'accueil.
 */
export const SERVICE_PHOTOS: MediaKey[] = ["vapeurSiumai", "plateauMixte"];

/**
 * Accueil — la bande qui sort du bord gauche derrière le bloc « en salle » et
 * s'arrête avant d'atteindre le bord droit. Elle habille un fond autrement nu ;
 * un dégradé la fait disparaître sous le texte, qui reste lisible.
 *
 * Il faut ici une vue profonde, pas un gros plan : agrandie sur plus de la
 * moitié de l'écran, une assiette ne serait qu'une tache. La salle aux fresques
 * répond en outre au texte du bloc, qui parle des plateaux la traversant.
 */
export const SERVICE_BANDE: MediaKey = "fresques";

/** Galerie — toutes les vues de salle sauf celle de son propre hero (`bar`). */
export const GALERIE_SALLE: MediaKey[] = [
  "panoramique",
  "galerie",
  "fresques",
  "coinTorii",
  "alcove",
  "banquette",
  "barrique",
  "tables",
  "nappage",
  "salleLarge",
  "ocre",
  "miroir",
  "intime",
];

/**
 * Galerie — la série complète des photographies prises dans la maison, les
 * quatorze. La galerie est le catalogue : elle montre tout, y compris les
 * clichés qui servent par ailleurs de bandeau sur la carte ou de vignette sur
 * l'accueil. C'est la seule liste où la répétition est voulue.
 */
export const GALERIE_TABLE: MediaKey[] = [
  "tartareGambero",
  "sashimiThon",
  "assortimentSushi",
  "cuilleresSaumon",
  "carpaccioBoeuf",
  "plateauMixte",
  "saumonBraise",
  "vapeurSiumai",
  "vapeurHakao",
  "plateauGlace",
  "plateauFumee",
  "tempuraCrevettes",
  "boeufPoele",
  "tatakiThon",
];

/**
 * La Carte — une photo par catégorie, dans l'ordre de `MENU` (data/menu).
 * Chaque bandeau porte le nom de la CATÉGORIE, jamais celui d'un plat : on y
 * place donc les photographies de la maison sans avoir à les nommer.
 */
export const CARTE_PHOTOS: Record<string, MediaKey> = {
  formules: "plateauFumee",
  entrees: "tempuraCrevettes",
  plats: "boeufPoele",
  "nouilles-riz": "epices",
  desserts: "dessertDresse",
  glaces: "dessert",
  creations: "tatakiThon",
  boissons: "sake",
};
