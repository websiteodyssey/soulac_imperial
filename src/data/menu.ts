export interface MenuItem {
  id: string;
  category: string;
  price: number;
  tags?: ("veggie" | "spicy" | "popular")[];
}

export const MENU_CATEGORIES = [
  "sushiSashimi",
  "maki",
  "dimSum",
  "wok",
  "yakitori",
  "soup",
  "dessert",
  "drinks",
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // Sushi & Sashimi
  { id: "s1", category: "sushiSashimi", price: 9.5 },
  { id: "s2", category: "sushiSashimi", price: 11.0, tags: ["popular"] },
  { id: "s3", category: "sushiSashimi", price: 19.5, tags: ["popular"] },

  // Maki & Rolls
  { id: "m1", category: "maki", price: 7.5 },
  { id: "m2", category: "maki", price: 8.0, tags: ["spicy"] },
  { id: "m3", category: "maki", price: 10.5, tags: ["popular"] },

  // Dim Sum
  { id: "d1", category: "dimSum", price: 6.5 },
  { id: "d2", category: "dimSum", price: 6.0 },
  { id: "d3", category: "dimSum", price: 5.5 },

  // Wok & Plats
  { id: "w1", category: "wok", price: 14.5, tags: ["spicy"] },
  { id: "w2", category: "wok", price: 16.0, tags: ["popular"] },
  { id: "w3", category: "wok", price: 11.0, tags: ["veggie"] },

  // Yakitori & Grillades
  { id: "y1", category: "yakitori", price: 8.5 },
  { id: "y2", category: "yakitori", price: 9.5, tags: ["popular"] },
  { id: "y3", category: "yakitori", price: 9.0 },

  // Soupes & Salades
  { id: "so1", category: "soup", price: 4.5, tags: ["veggie"] },
  { id: "so2", category: "soup", price: 6.5 },
  { id: "so3", category: "soup", price: 5.0, tags: ["veggie"] },

  // Desserts
  { id: "de1", category: "dessert", price: 6.5, tags: ["popular"] },
  { id: "de2", category: "dessert", price: 5.5, tags: ["veggie"] },
  { id: "de3", category: "dessert", price: 6.0, tags: ["veggie"] },

  // Boissons
  { id: "dr1", category: "drinks", price: 3.5, tags: ["veggie"] },
  { id: "dr2", category: "drinks", price: 4.5, tags: ["veggie"] },
  { id: "dr3", category: "drinks", price: 7.0 },
];
