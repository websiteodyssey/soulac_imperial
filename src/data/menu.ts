/**
 * LA CARTE — source unique.
 *
 * Pour modifier un plat, un prix ou une catégorie : tout se passe dans ce
 * fichier, rien d'autre à toucher. Les textes sont bilingues (fr / en) ;
 * si l'anglais manque, le français est affiché.
 *
 * Contenu transmis par le restaurant (juillet 2026). Points laissés en
 * attente, volontairement non complétés pour ne rien inventer :
 *  - Formule "Menu Impérial" (25€) : aucun dessert n'a été précisé par le
 *    restaurant — la formule ne comporte donc que 2 temps (entrée + plat).
 *  - "N1. Nigiri wagyu aburi" (Créations Gastronomiques) : aucun prix n'a
 *    été communiqué — l'article n'a pas été ajouté à la carte en attendant.
 *  - Les numéros entre parenthèses ("Allergènes n° …") reprennent tels
 *    quels les codes donnés par le restaurant ; la légende (quel numéro
 *    correspond à quel allergène) n'a pas été fournie et reste à confirmer.
 *  - Les cocktails (visuels reçus : gammes "Dali", "Havana", "Spritz") n'ont
 *    pas de nom/prix associé pour l'instant — pas de carte cocktails ajoutée.
 *
 * ⚠︎ Intitulés et prix à valider avec le restaurant avant mise en ligne.
 */

export type Tag = "signature" | "veggie" | "spicy";

export interface MenuItem {
  id: string;
  name: { fr: string; en?: string };
  desc: { fr: string; en?: string };
  /** Prix en euros. */
  price: number;
  tags?: Tag[];
}

export interface MenuCategory {
  id: string;
  title: { fr: string; en?: string };
  /** Ligne d'intention affichée sous le titre de la catégorie. */
  note: { fr: string; en?: string };
  items: MenuItem[];
}

export const MENU: MenuCategory[] = [
  {
    id: "formules",
    title: { fr: "Nos Formules", en: "Set Menus" },
    note: {
      fr: "Deux parcours composés, pensés pour un repas complet.",
      en: "Two composed set menus for a complete meal.",
    },
    items: [
      {
        id: "f1",
        name: { fr: "Menu Soulac" },
        desc: {
          fr: "Entrée au choix : nems au poulet et feuilles de salade, ou assortiment vapeur (1 raviolis crevettes, 1 bouchée de crevettes, 1 bouchée de bœuf, 1 gyoza au poulet et 1 brioche au porc). Plat au choix : poulet croustillant à la sauce du chef, ou crevettes à la sauce piquante — accompagné de riz nature (supplément de 3€ pour riz cantonais ou nouilles sautées). Dessert au choix : litchis au sirop, perles de coco, ou 2 boules de glace au choix.",
        },
        price: 22.0,
        tags: ["signature"],
      },
      {
        id: "f2",
        name: { fr: "Menu Impérial" },
        desc: {
          fr: "Entrée au choix : soupe miso, ou salade de choux assaisonnée. Plat composé : 6 makis de thon, 4 pièces California du chef, 2 sushis saumon, 1 sushi bar, 1 sushi thon et 4 sashimis saumon.",
        },
        price: 25.0,
        tags: ["signature"],
      },
    ],
  },
  {
    id: "entrees",
    title: { fr: "Entrées & Soupes", en: "Starters & Soups" },
    note: {
      fr: "Le premier geste du repas, léger et parfumé.",
      en: "The opening note of the meal — light and fragrant.",
    },
    items: [
      {
        id: "e1",
        name: { fr: "Assortiment Vapeur" },
        desc: {
          fr: "1 raviolis aux crevettes, 1 bouchée de crevettes, 1 bouchée de bœuf, 1 gyoza au poulet et 1 brioche au porc (xiaolongbao).",
        },
        price: 7.5,
      },
      {
        id: "e2",
        name: { fr: "Bouchées de Bœuf" },
        desc: { fr: "4 pièces." },
        price: 5.9,
      },
      {
        id: "e3",
        name: { fr: "Bouchées de Crevettes « Hasiumai »" },
        desc: { fr: "4 pièces." },
        price: 5.9,
      },
      {
        id: "e4",
        name: { fr: "Edamame" },
        desc: { fr: "Fèves de soja." },
        price: 4.5,
        tags: ["veggie"],
      },
      {
        id: "e5",
        name: { fr: "Gyoza au Poulet Grillé" },
        desc: { fr: "5 pièces." },
        price: 7.5,
      },
      {
        id: "e6",
        name: { fr: "Huître à l'Ail Vapeur" },
        desc: { fr: "3 pièces." },
        price: 12.0,
      },
      {
        id: "e7",
        name: { fr: "Nems au Poulet" },
        desc: { fr: "4 pièces." },
        price: 5.5,
      },
      {
        id: "e8",
        name: { fr: "Raviolis aux Crevettes « Hakao »" },
        desc: { fr: "4 pièces." },
        price: 5.9,
      },
      {
        id: "e9",
        name: { fr: "Salade de Calamar Japonaise" },
        desc: { fr: "Calamars cuits, assaisonnés." },
        price: 7.5,
      },
      {
        id: "e10",
        name: { fr: "Salade de Choux Assaisonnée" },
        desc: { fr: "" },
        price: 4.5,
        tags: ["veggie"],
      },
      {
        id: "e11",
        name: { fr: "Salade de Wakamé" },
        desc: { fr: "Algue." },
        price: 6.5,
        tags: ["veggie"],
      },
      {
        id: "e12",
        name: { fr: "Salade Saumon & Avocat" },
        desc: { fr: "" },
        price: 11.5,
      },
      {
        id: "e13",
        name: { fr: "Soupe Miso" },
        desc: { fr: "" },
        price: 4.5,
        tags: ["veggie"],
      },
      {
        id: "e14",
        name: { fr: "Tempura de Crevettes" },
        desc: { fr: "5 pièces." },
        price: 9.0,
      },
      {
        id: "e15",
        name: { fr: "Tentacule à l'Huile d'Olive" },
        desc: { fr: "" },
        price: 9.5,
      },
    ],
  },
  {
    id: "plats",
    title: { fr: "Plats", en: "Mains" },
    note: {
      fr: "Saisis à feu vif, servis fumants.",
      en: "Seared over a fierce flame, served steaming.",
    },
    items: [
      {
        id: "p1",
        name: { fr: "Canard Laqué" },
        desc: { fr: "Avec la sauce de soja." },
        price: 12.0,
      },
      {
        id: "p2",
        name: { fr: "Canard Sauté Thaï" },
        desc: { fr: "Sur plaque chauffante." },
        price: 15.0,
      },
      {
        id: "p3",
        name: { fr: "Bœuf au Poivre" },
        desc: { fr: "Sur plaque chauffante, épicé." },
        price: 15.0,
        tags: ["spicy", "signature"],
      },
      {
        id: "p4",
        name: { fr: "Crevettes Sauce Piquante" },
        desc: { fr: "" },
        price: 12.0,
        tags: ["spicy"],
      },
      {
        id: "p5",
        name: { fr: "Gambas au Vermicelles et à l'Ail" },
        desc: { fr: "Cuites à la vapeur." },
        price: 18.0,
      },
      {
        id: "p6",
        name: { fr: "Bar Entier Poêlé" },
        desc: { fr: "" },
        price: 22.5,
      },
      {
        id: "p7",
        name: { fr: "Poulet Croustillant à la Sauce du Chef" },
        desc: { fr: "" },
        price: 11.0,
      },
      {
        id: "p8",
        name: { fr: "Poke Bowl Avocat Saumon" },
        desc: { fr: "" },
        price: 16.5,
      },
      {
        id: "p9",
        name: { fr: "Poke Bowl Poulet Croustillant" },
        desc: { fr: "" },
        price: 15.0,
      },
      {
        id: "p10",
        name: { fr: "Poke Bowl Végétarien" },
        desc: { fr: "" },
        price: 15.0,
        tags: ["veggie"],
      },
    ],
  },
  {
    id: "nouilles-riz",
    title: { fr: "Nouilles & Riz", en: "Noodles & Rice" },
    note: {
      fr: "L'accompagnement qui complète le repas.",
      en: "The finishing touch to any meal.",
    },
    items: [
      {
        id: "nr1",
        name: { fr: "Légumes Sautés au Wok" },
        desc: { fr: "" },
        price: 7.0,
        tags: ["veggie"],
      },
      {
        id: "nr2",
        name: { fr: "Nouilles Sautées Nature" },
        desc: { fr: "" },
        price: 8.0,
      },
      {
        id: "nr3",
        name: { fr: "Riz Blanc" },
        desc: { fr: "" },
        price: 3.5,
        tags: ["veggie"],
      },
      {
        id: "nr4",
        name: { fr: "Riz Cantonais" },
        desc: { fr: "Sauté au jambon et petits pois." },
        price: 7.0,
      },
    ],
  },
  {
    id: "desserts",
    title: { fr: "Desserts", en: "Desserts" },
    note: {
      fr: "Une dernière douceur, sans excès de sucre.",
      en: "A last sweetness, never cloying.",
    },
    items: [
      {
        id: "de1",
        name: { fr: "Gâteau à la Noix de Coco" },
        desc: { fr: "" },
        price: 5.0,
        tags: ["veggie"],
      },
      {
        id: "de2",
        name: { fr: "Litchis au Sirop" },
        desc: { fr: "" },
        price: 5.0,
        tags: ["veggie"],
      },
      {
        id: "de3",
        name: { fr: "Perles de Coco" },
        desc: { fr: "Aux grains de lotus, 2 pièces." },
        price: 5.5,
        tags: ["veggie"],
      },
      {
        id: "de4",
        name: { fr: "Daifuku Mangue" },
        desc: { fr: "" },
        price: 4.5,
        tags: ["veggie"],
      },
      {
        id: "de5",
        name: { fr: "Daifuku Thé Matcha" },
        desc: { fr: "" },
        price: 4.5,
        tags: ["veggie"],
      },
      {
        id: "de6",
        name: { fr: "Mochis Glacés" },
        desc: { fr: "2 parfums au choix : vanille, mangue, sakura, thé matcha." },
        price: 7.8,
        tags: ["signature"],
      },
      {
        id: "de7",
        name: { fr: "Café Gourmand" },
        desc: { fr: "Un café, une boule de glace et un gâteau à la noix de coco." },
        price: 6.9,
        tags: ["signature"],
      },
    ],
  },
  {
    id: "glaces",
    title: { fr: "Les Glaces", en: "Ice Cream" },
    note: {
      fr: "Vanille, fraise, mangue, citron, noix de coco, chocolat.",
      en: "Vanilla, strawberry, mango, lemon, coconut, chocolate.",
    },
    items: [
      {
        id: "g1",
        name: { fr: "1 Boule au Choix" },
        desc: { fr: "" },
        price: 3.0,
        tags: ["veggie"],
      },
      {
        id: "g2",
        name: { fr: "2 Boules au Choix" },
        desc: { fr: "" },
        price: 5.0,
        tags: ["veggie"],
      },
      {
        id: "g3",
        name: { fr: "3 Boules au Choix" },
        desc: { fr: "" },
        price: 7.5,
        tags: ["veggie"],
      },
      {
        id: "g4",
        name: { fr: "Supplément Chantilly" },
        desc: { fr: "" },
        price: 1.0,
        tags: ["veggie"],
      },
    ],
  },
  {
    id: "creations",
    title: { fr: "Créations Gastronomiques", en: "Chef's Creations" },
    note: {
      fr: "Sushis, sashimis et tartares signés par le chef — allergènes indiqués par numéro, légende à confirmer.",
      en: "Sushi, sashimi and tartare signed by the chef.",
    },
    items: [
      {
        id: "cr1",
        name: { fr: "CR1 · Kaki Royal Fusion" },
        desc: {
          fr: "1 pièce. Huître, crevette rouge, wasabi râpé, tranches de truffe, sauce ponzu, œufs de lump, zeste de citron vert. (Allergènes n° 14, 2, 1, 6, 4)",
        },
        price: 5.0,
        tags: ["signature"],
      },
      {
        id: "cr2",
        name: { fr: "CR2 · Tataki Tuna Premium" },
        desc: {
          fr: "4 pièces. Thon flambé, sauce yuzu-wasabi, granulé de tempura, togarashi, wasabi râpé, sésame noir. (Allergènes n° 4, 1, 6, 8, 11)",
        },
        price: 8.0,
      },
      {
        id: "cr3",
        name: { fr: "CR3 · Chirashi Salmon Sous Vide" },
        desc: {
          fr: "Riz à sushi, eel sauce, carpaccio de saumon flambé, sauce sésame, œuf pasteurisé basse température, ciboulette, tobiko. (Allergènes n° 4, 1, 6, 3, 7)",
        },
        price: 10.0,
      },
      {
        id: "s1",
        name: { fr: "S1 · Sashimi Salmone" },
        desc: { fr: "5 pièces. Sashimi de saumon. (Allergène n° 4)" },
        price: 6.0,
      },
      {
        id: "s2",
        name: { fr: "S2 · Sashimi Misto Special" },
        desc: {
          fr: "10 pièces. Assortiment de sashimi omakase du chef. (Allergènes n° 4, 2)",
        },
        price: 14.0,
      },
      {
        id: "s3",
        name: { fr: "S3 · Sashimi Thon" },
        desc: { fr: "5 pièces. Sashimi de thon. (Allergène n° 4)" },
        price: 7.0,
      },
      {
        id: "s4",
        name: { fr: "S4 · Sashimi Bar" },
        desc: { fr: "5 pièces. Sashimi de bar." },
        price: 5.0,
      },
      {
        id: "ca1",
        name: { fr: "CA1 · Carpaccio Beef" },
        desc: {
          fr: "4 pièces. Carpaccio de filet de bœuf, roquette, fromage, sauce yuzu-wasabi, tobiko. (Allergènes n° 1, 6, 3, 7, 4)",
        },
        price: 8.0,
      },
      {
        id: "ca2",
        name: { fr: "CA2 · Hamachi Usuzukuri" },
        desc: {
          fr: "9 pièces. Carpaccio de sériole d'Amérique, tranches de truffe, œufs de truite marinés, sauce yuzu-miso, zeste de citron vert. (Allergènes n° 4, 6, 1)",
        },
        price: 14.0,
      },
      {
        id: "t1",
        name: { fr: "T1 · Tartare Yuzu-Mangue" },
        desc: {
          fr: "Saumon, burrata, mangue, sauce yuzu-miso, zeste de citron vert, mousse de citron vert. Il est recommandé de mélanger tous les ingrédients avant le service. (Allergènes n° 3, 7, 4, 10)",
        },
        price: 10.0,
      },
      {
        id: "t2",
        name: { fr: "T2 · Tartare Gambero Rosso di Mazara" },
        desc: {
          fr: "Tartare de crevette rouge de Mazara, burrata, mangue, ponzu, persil. Il est recommandé de mélanger tous les ingrédients avant le service. (Allergènes n° 2, 6, 1, 3, 7)",
        },
        price: 12.0,
      },
      {
        id: "t3",
        name: { fr: "T3 · Tartare Beef Premium" },
        desc: {
          fr: "Bœuf mariné style japonais, burrata, œufs de caille, yuzu-wasabi. Il est recommandé de mélanger tous les ingrédients avant le service. (Allergènes n° 3, 7, 1, 6)",
        },
        price: 12.0,
      },
      {
        id: "n2",
        name: { fr: "N2 · Nigiri Salmon" },
        desc: { fr: "2 pièces. (Allergène n° 4)" },
        price: 3.0,
      },
      {
        id: "n3",
        name: { fr: "N3 · Nigiri Tuna" },
        desc: { fr: "2 pièces. (Allergène n° 4)" },
        price: 4.0,
      },
      {
        id: "n4",
        name: { fr: "N4 · Nigiri Suzuki" },
        desc: { fr: "2 pièces. (Allergène n° 4)" },
        price: 3.0,
      },
      {
        id: "bi1",
        name: { fr: "BI1 · Bignè Goma Salmon" },
        desc: {
          fr: "2 pièces. Saumon, saumon épicé, flambé, sauce sésame. (Allergènes n° 4, 3, 7, 1, 6, 8, 11)",
        },
        price: 6.0,
      },
      {
        id: "bi2",
        name: { fr: "BI2 · Bignè Cheese" },
        desc: {
          fr: "2 pièces. Saumon, sauce flambée, fromage. (Allergènes n° 4, 3, 7)",
        },
        price: 5.0,
      },
      {
        id: "h1",
        name: { fr: "H1 · Hosomaki Salmon" },
        desc: { fr: "6 pièces. Saumon. (Allergène n° 4)" },
        price: 4.0,
      },
      {
        id: "h2",
        name: { fr: "H2 · Hosomaki Avocado" },
        desc: { fr: "6 pièces. Avocat." },
        price: 3.0,
        tags: ["veggie"],
      },
      {
        id: "us01",
        name: { fr: "US01 · Uramaki Saké" },
        desc: {
          fr: "4 pièces. Saumon, avocat, sésame. (Allergènes n° 4, 11)",
        },
        price: 5.0,
      },
      {
        id: "up03",
        name: { fr: "UP03 · Uramaki Philadelphia" },
        desc: {
          fr: "4 pièces. Saumon, fromage Philadelphia, sésame. (Allergènes n° 4, 3, 7, 11)",
        },
        price: 5.0,
      },
      {
        id: "uc07",
        name: { fr: "UC07 · Pink Uramaki Yasai" },
        desc: {
          fr: "4 pièces. Concombre, mangue, avocat, sauce sésame, oignons frits. (Allergènes n° 1, 6, 11)",
        },
        price: 3.0,
        tags: ["veggie"],
      },
      {
        id: "ug15",
        name: { fr: "UG15 · Uramaki Ebiten" },
        desc: {
          fr: "4 pièces. Crevette tempura, eel sauce, kataifi. (Allergènes n° 2, 3, 7, 1, 6, 11)",
        },
        price: 4.0,
      },
      {
        id: "ug16",
        name: { fr: "UG16 · Tiger Roll" },
        desc: {
          fr: "4 pièces. Crevette tempura, carpaccio de saumon, eel sauce, kataifi. (Allergènes n° 2, 3, 7, 4, 1, 6, 11)",
        },
        price: 5.5,
        tags: ["signature"],
      },
      {
        id: "gfr16",
        name: { fr: "Green Foie Gras Roll" },
        desc: {
          fr: "4 pièces. Crevette tempura, mayonnaise, saumon épicé, tranches d'avocat, foie gras, eel sauce, flambé, kataifi. (Allergènes n° 4, 2, 3, 7, 6) — code carte : « 16 ».",
        },
        price: 9.0,
        tags: ["signature"],
      },
      {
        id: "uk18",
        name: { fr: "UK18 · Uramaki California" },
        desc: {
          fr: "4 pièces. Surimi, mayonnaise, crevette cuite, tobiko. (Allergènes n° 1, 2, 3, 7, 4, 11)",
        },
        price: 4.5,
      },
    ],
  },
  {
    id: "boissons",
    title: { fr: "Boissons", en: "Drinks" },
    note: {
      fr: "Thés d'Asie, sakés et vins choisis pour la carte.",
      en: "Asian teas, sakés and wines chosen for the menu.",
    },
    items: [
      {
        id: "b1",
        name: { fr: "Thé Vert Jasmin", en: "Jasmine Green Tea" },
        desc: {
          fr: "Théière pour deux, feuilles entières.",
          en: "Pot for two, whole leaves.",
        },
        price: 4.5,
        tags: ["veggie"],
      },
      {
        id: "b2",
        name: { fr: "Saké Tiède", en: "Warm Saké" },
        desc: { fr: "Carafe de 15 cl, servie à la japonaise.", en: "15 cl carafe, served the Japanese way." },
        price: 7.5,
      },
      {
        id: "b3",
        name: { fr: "Bière Japonaise", en: "Japanese Beer" },
        desc: { fr: "33 cl, blonde légère et sèche.", en: "33 cl, light and dry lager." },
        price: 5.5,
      },
      {
        id: "b4",
        name: { fr: "Vin Blanc — Bordeaux", en: "White Wine — Bordeaux" },
        desc: { fr: "Verre 12 cl, sec et minéral, choisi pour le poisson cru.", en: "12 cl glass, dry and mineral, chosen for raw fish." },
        price: 5.5,
      },
      {
        id: "b5",
        name: { fr: "Limonade au Yuzu", en: "Yuzu Lemonade" },
        desc: { fr: "Maison, agrume japonais et menthe fraîche.", en: "House-made, Japanese citrus and fresh mint." },
        price: 5.0,
        tags: ["veggie"],
      },
    ],
  },
];

/** Plats mis en avant sur l'accueil (ids de MENU). */
export const SIGNATURES = ["cr1", "p1", "ug16", "p3"];

/** Retrouve un plat par son id, toutes catégories confondues. */
export const findItem = (id: string): MenuItem | undefined => {
  for (const cat of MENU) {
    const found = cat.items.find((i) => i.id === id);
    if (found) return found;
  }
  return undefined;
};
