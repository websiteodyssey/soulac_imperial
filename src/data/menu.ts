/**
 * LA CARTE — source unique.
 *
 * Pour modifier un plat, un prix ou une catégorie : tout se passe dans ce
 * fichier, rien d'autre à toucher. Les textes sont bilingues (fr / en) ;
 * si l'anglais manque, le français est affiché.
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
    id: "entrees",
    title: { fr: "Entrées & Soupes", en: "Starters & Soups" },
    note: {
      fr: "Le premier geste du repas, léger et parfumé.",
      en: "The opening note of the meal — light and fragrant.",
    },
    items: [
      {
        id: "e1",
        name: { fr: "Soupe Miso", en: "Miso Soup" },
        desc: {
          fr: "Bouillon dashi, pâte de miso blanc, tofu soyeux et wakamé.",
          en: "Dashi broth, white miso, silken tofu and wakame.",
        },
        price: 4.5,
        tags: ["veggie"],
      },
      {
        id: "e2",
        name: { fr: "Soupe Pékinoise", en: "Hot & Sour Soup" },
        desc: {
          fr: "Bouillon aigre-piquant, champignons noirs, pousses de bambou et œuf filé.",
          en: "Hot and sour broth, black mushrooms, bamboo shoots and egg ribbons.",
        },
        price: 5.5,
        tags: ["spicy"],
      },
      {
        id: "e3",
        name: { fr: "Salade de Chou Croquante", en: "Crisp Cabbage Salad" },
        desc: {
          fr: "Chou blanc, carotte et sésame, vinaigrette au riz et huile de sésame.",
          en: "White cabbage, carrot and sesame, rice-vinegar dressing.",
        },
        price: 5.0,
        tags: ["veggie"],
      },
      {
        id: "e4",
        name: { fr: "Salade d'Algues Wakamé", en: "Wakame Seaweed Salad" },
        desc: {
          fr: "Algues marinées au sésame grillé, éclats de graines dorées.",
          en: "Seaweed marinated in toasted sesame, golden seeds.",
        },
        price: 5.5,
        tags: ["veggie"],
      },
      {
        id: "e5",
        name: { fr: "Edamame au Sel de Mer", en: "Sea-Salted Edamame" },
        desc: {
          fr: "Fèves de soja tièdes, fleur de sel de l'Atlantique.",
          en: "Warm soy beans, Atlantic sea salt.",
        },
        price: 5.0,
        tags: ["veggie"],
      },
      {
        id: "e6",
        name: { fr: "Ramen du Chef", en: "Chef's Ramen" },
        desc: {
          fr: "Bouillon longuement mijoté, nouilles fraîches, œuf mollet et ciboule.",
          en: "Long-simmered broth, fresh noodles, soft egg and spring onion.",
        },
        price: 14.5,
        tags: ["signature"],
      },
    ],
  },
  {
    id: "dimsum",
    title: { fr: "Dim Sum & Vapeur", en: "Dim Sum & Steamed" },
    note: {
      fr: "Les bouchées du sud de la Chine, pliées à la main chaque matin.",
      en: "Southern-Chinese bites, folded by hand each morning.",
    },
    items: [
      {
        id: "d1",
        name: { fr: "Har Gow", en: "Har Gow" },
        desc: {
          fr: "Raviolis vapeur aux crevettes, pâte translucide (4 pièces).",
          en: "Steamed prawn dumplings, translucent wrapper (4 pieces).",
        },
        price: 6.5,
        tags: ["signature"],
      },
      {
        id: "d2",
        name: { fr: "Siu Mai", en: "Siu Mai" },
        desc: {
          fr: "Bouchées ouvertes au porc et crevette, pointe de gingembre (4 pièces).",
          en: "Open pork-and-prawn parcels with a hint of ginger (4 pieces).",
        },
        price: 6.5,
      },
      {
        id: "d3",
        name: { fr: "Gyoza", en: "Gyoza" },
        desc: {
          fr: "Raviolis grillés au porc et chou, sauce ponzu (5 pièces).",
          en: "Pan-fried pork and cabbage dumplings, ponzu sauce (5 pieces).",
        },
        price: 6.0,
      },
      {
        id: "d4",
        name: { fr: "Raviolis Vapeur aux Légumes", en: "Steamed Vegetable Dumplings" },
        desc: {
          fr: "Champignons, chou chinois et vermicelles (5 pièces).",
          en: "Mushrooms, Chinese cabbage and glass noodles (5 pieces).",
        },
        price: 5.5,
        tags: ["veggie"],
      },
      {
        id: "d5",
        name: { fr: "Nems au Poulet", en: "Chicken Spring Rolls" },
        desc: {
          fr: "Nems croustillants, vermicelles et champignons, sauce aigre-douce (4 pièces).",
          en: "Crisp rolls with noodles and mushrooms, sweet-and-sour sauce (4 pieces).",
        },
        price: 6.0,
      },
      {
        id: "d6",
        name: { fr: "Bao au Porc Laqué", en: "Glazed Pork Bao" },
        desc: {
          fr: "Pains vapeur moelleux, porc caramélisé et concombre (2 pièces).",
          en: "Pillowy steamed buns, caramelised pork and cucumber (2 pieces).",
        },
        price: 7.5,
        tags: ["signature"],
      },
    ],
  },
  {
    id: "sushi",
    title: { fr: "Sushi & Sashimi", en: "Sushi & Sashimi" },
    note: {
      fr: "Poisson taillé à la commande, riz vinaigré tiède.",
      en: "Fish cut to order, warm vinegared rice.",
    },
    items: [
      {
        id: "s1",
        name: { fr: "Sashimi de Saumon", en: "Salmon Sashimi" },
        desc: {
          fr: "6 tranches épaisses, wasabi frais et gingembre mariné.",
          en: "6 thick slices, fresh wasabi and pickled ginger.",
        },
        price: 11.5,
      },
      {
        id: "s2",
        name: { fr: "Sashimi de Thon", en: "Tuna Sashimi" },
        desc: {
          fr: "6 tranches de thon rouge, taillées au couteau yanagiba.",
          en: "6 slices of red tuna, cut with a yanagiba knife.",
        },
        price: 13.5,
      },
      {
        id: "s3",
        name: { fr: "Nigiri Mixte", en: "Mixed Nigiri" },
        desc: {
          fr: "6 pièces : saumon, thon, daurade et crevette.",
          en: "6 pieces: salmon, tuna, sea bream and prawn.",
        },
        price: 12.5,
      },
      {
        id: "s4",
        name: { fr: "Chirashi Saumon", en: "Salmon Chirashi" },
        desc: {
          fr: "Bol de riz vinaigré, saumon en pétales, avocat et sésame.",
          en: "Bowl of vinegared rice, salmon petals, avocado and sesame.",
        },
        price: 16.5,
      },
      {
        id: "s5",
        name: { fr: "Tataki de Thon", en: "Tuna Tataki" },
        desc: {
          fr: "Thon juste saisi, sauce ponzu, oignons nouveaux et sésame noir.",
          en: "Lightly seared tuna, ponzu, spring onion and black sesame.",
        },
        price: 15.0,
      },
      {
        id: "s6",
        name: { fr: "Plateau Impérial", en: "Imperial Platter" },
        desc: {
          fr: "18 pièces : la sélection du chef, sashimi, nigiri et makis signature.",
          en: "18 pieces: the chef's selection of sashimi, nigiri and signature maki.",
        },
        price: 32.0,
        tags: ["signature"],
      },
    ],
  },
  {
    id: "maki",
    title: { fr: "Makis & Rolls", en: "Maki & Rolls" },
    note: {
      fr: "Roulés serrés, tranchés au dernier moment.",
      en: "Tightly rolled, sliced at the last moment.",
    },
    items: [
      {
        id: "m1",
        name: { fr: "California Saumon-Avocat", en: "Salmon-Avocado California" },
        desc: {
          fr: "6 pièces : saumon, avocat, concombre et sésame doré.",
          en: "6 pieces: salmon, avocado, cucumber and golden sesame.",
        },
        price: 7.5,
      },
      {
        id: "m2",
        name: { fr: "Spicy Tuna Roll", en: "Spicy Tuna Roll" },
        desc: {
          fr: "6 pièces : thon relevé à la sauce piquante maison, ciboule.",
          en: "6 pieces: tuna in house chilli sauce, spring onion.",
        },
        price: 8.5,
        tags: ["spicy"],
      },
      {
        id: "m3",
        name: { fr: "Dragon Roll", en: "Dragon Roll" },
        desc: {
          fr: "8 pièces : anguille grillée, avocat, concombre et sauce unagi.",
          en: "8 pieces: grilled eel, avocado, cucumber and unagi glaze.",
        },
        price: 12.5,
        tags: ["signature"],
      },
      {
        id: "m4",
        name: { fr: "Crunchy Roll", en: "Crunchy Roll" },
        desc: {
          fr: "8 pièces : crevette tempura, avocat, éclats croustillants.",
          en: "8 pieces: tempura prawn, avocado, crisp shards.",
        },
        price: 11.0,
      },
      {
        id: "m5",
        name: { fr: "Maki Végétal", en: "Garden Maki" },
        desc: {
          fr: "6 pièces : avocat, concombre, radis mariné et menthe.",
          en: "6 pieces: avocado, cucumber, pickled radish and mint.",
        },
        price: 6.5,
        tags: ["veggie"],
      },
      {
        id: "m6",
        name: { fr: "Temaki Saumon", en: "Salmon Temaki" },
        desc: {
          fr: "Cornet de nori garni de saumon, avocat et riz vinaigré.",
          en: "Nori cone filled with salmon, avocado and vinegared rice.",
        },
        price: 6.0,
      },
    ],
  },
  {
    id: "grillades",
    title: { fr: "Yakitori & Grillades", en: "Yakitori & Grill" },
    note: {
      fr: "Passés à la braise, laqués à la sauce du comptoir.",
      en: "Charcoal-grilled, glazed at the counter.",
    },
    items: [
      {
        id: "y1",
        name: { fr: "Yakitori Poulet", en: "Chicken Yakitori" },
        desc: {
          fr: "3 brochettes, glaçage soja-mirin et sésame.",
          en: "3 skewers, soy-mirin glaze and sesame.",
        },
        price: 8.5,
      },
      {
        id: "y2",
        name: { fr: "Brochettes de Bœuf Teriyaki", en: "Teriyaki Beef Skewers" },
        desc: {
          fr: "3 brochettes de bœuf mariné, laquées à la braise.",
          en: "3 marinated beef skewers, glazed over charcoal.",
        },
        price: 10.5,
        tags: ["signature"],
      },
      {
        id: "y3",
        name: { fr: "Brochettes de Crevettes", en: "Prawn Skewers" },
        desc: {
          fr: "3 brochettes, beurre d'ail et citron vert.",
          en: "3 skewers, garlic butter and lime.",
        },
        price: 10.0,
      },
      {
        id: "y4",
        name: { fr: "Poulet Karaage", en: "Karaage Chicken" },
        desc: {
          fr: "Beignets de poulet marinés au gingembre, mayonnaise yuzu.",
          en: "Ginger-marinated chicken fritters, yuzu mayonnaise.",
        },
        price: 9.5,
      },
      {
        id: "y5",
        name: { fr: "Aubergine Miso", en: "Miso Aubergine" },
        desc: {
          fr: "Aubergine grillée, laque de miso rouge et sésame.",
          en: "Grilled aubergine, red miso lacquer and sesame.",
        },
        price: 8.0,
        tags: ["veggie"],
      },
      {
        id: "y6",
        name: { fr: "Planche Impériale", en: "Imperial Board" },
        desc: {
          fr: "Assortiment de brochettes et grillades à partager, 2 personnes.",
          en: "Sharing board of skewers and grilled bites, for two.",
        },
        price: 24.0,
        tags: ["signature"],
      },
    ],
  },
  {
    id: "wok",
    title: { fr: "Woks & Plats", en: "Wok & Mains" },
    note: {
      fr: "Saisis à feu vif, servis fumants.",
      en: "Seared over a fierce flame, served steaming.",
    },
    items: [
      {
        id: "w1",
        name: { fr: "Bœuf au Gingembre", en: "Ginger Beef" },
        desc: {
          fr: "Émincé de bœuf, gingembre frais, poivrons et oignons nouveaux.",
          en: "Sliced beef, fresh ginger, peppers and spring onion.",
        },
        price: 15.5,
      },
      {
        id: "w2",
        name: { fr: "Canard Laqué Impérial", en: "Imperial Glazed Duck" },
        desc: {
          fr: "Magret laqué au miel et soja, légumes croquants, riz parfumé.",
          en: "Honey-soy glazed duck breast, crisp vegetables, fragrant rice.",
        },
        price: 19.5,
        tags: ["signature"],
      },
      {
        id: "w3",
        name: { fr: "Poulet Sauté aux Noix de Cajou", en: "Cashew Chicken" },
        desc: {
          fr: "Poulet, noix de cajou grillées, céleri et sauce brune.",
          en: "Chicken, toasted cashews, celery and brown sauce.",
        },
        price: 14.5,
      },
      {
        id: "w4",
        name: { fr: "Crevettes Sel & Poivre", en: "Salt & Pepper Prawns" },
        desc: {
          fr: "Crevettes croustillantes, ail, piment et poivre du Sichuan.",
          en: "Crisp prawns, garlic, chilli and Sichuan pepper.",
        },
        price: 17.5,
        tags: ["spicy"],
      },
      {
        id: "w5",
        name: { fr: "Nouilles Sautées au Wok", en: "Wok-Fried Noodles" },
        desc: {
          fr: "Nouilles fraîches, légumes de saison, sauce soja légère.",
          en: "Fresh noodles, seasonal vegetables, light soy.",
        },
        price: 12.5,
        tags: ["veggie"],
      },
      {
        id: "w6",
        name: { fr: "Riz Cantonais", en: "Cantonese Rice" },
        desc: {
          fr: "Riz sauté, œuf, petits pois, jambon et crevettes.",
          en: "Fried rice, egg, peas, ham and prawns.",
        },
        price: 11.0,
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
        name: { fr: "Mochis Glacés", en: "Ice-Cream Mochi" },
        desc: {
          fr: "3 pièces au choix : coco, thé matcha, mangue.",
          en: "3 pieces of your choice: coconut, matcha, mango.",
        },
        price: 6.5,
        tags: ["signature"],
      },
      {
        id: "de2",
        name: { fr: "Perles de Coco", en: "Coconut Pearls" },
        desc: {
          fr: "Boules de riz gluant à la noix de coco râpée (4 pièces).",
          en: "Glutinous rice balls rolled in coconut (4 pieces).",
        },
        price: 5.5,
        tags: ["veggie"],
      },
      {
        id: "de3",
        name: { fr: "Nougat Glacé au Sésame", en: "Sesame Iced Nougat" },
        desc: {
          fr: "Parfait glacé, sésame noir torréfié, caramel léger.",
          en: "Frozen parfait, toasted black sesame, light caramel.",
        },
        price: 6.5,
        tags: ["veggie"],
      },
      {
        id: "de4",
        name: { fr: "Ananas Rôti au Gingembre", en: "Ginger-Roasted Pineapple" },
        desc: {
          fr: "Tranches rôties, sirop de gingembre et citron vert.",
          en: "Roasted slices, ginger syrup and lime.",
        },
        price: 6.0,
        tags: ["veggie"],
      },
      {
        id: "de5",
        name: { fr: "Crème Brûlée au Matcha", en: "Matcha Crème Brûlée" },
        desc: {
          fr: "Crème au thé vert, sucre caramélisé au chalumeau.",
          en: "Green-tea custard under a torched sugar crust.",
        },
        price: 7.0,
        tags: ["veggie"],
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
export const SIGNATURES = ["s6", "w2", "m3", "y6"];

/** Retrouve un plat par son id, toutes catégories confondues. */
export const findItem = (id: string): MenuItem | undefined => {
  for (const cat of MENU) {
    const found = cat.items.find((i) => i.id === id);
    if (found) return found;
  }
  return undefined;
};
