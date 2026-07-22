import type { MediaKey } from "../config/media";

/**
 * Le bandeau « Nos spécialités » de l'accueil : une photo = une spécialité.
 * Les douze photos de plats sont utilisées **une seule fois chacune**.
 */
export interface Specialite {
  photo: MediaKey;
  label: { fr: string; en: string };
}

export const SPECIALITES_LIST: Specialite[] = [
  { photo: "sushi", label: { fr: "Sushi & Sashimi", en: "Sushi & Sashimi" } },
  { photo: "rouleaux", label: { fr: "Makis & Rolls", en: "Maki & Rolls" } },
  { photo: "dimsum", label: { fr: "Dim Sum", en: "Dim Sum" } },
  { photo: "vapeur", label: { fr: "Bouchées vapeur", en: "Steamed Parcels" } },
  { photo: "wok", label: { fr: "Woks au feu vif", en: "Fierce-Flame Wok" } },
  { photo: "canard", label: { fr: "Canard laqué", en: "Glazed Duck" } },
  { photo: "yakitori", label: { fr: "Yakitori", en: "Yakitori" } },
  { photo: "planche", label: { fr: "Planche à partager", en: "Sharing Board" } },
  { photo: "plateau", label: { fr: "Plateau Impérial", en: "Imperial Platter" } },
  { photo: "ramen", label: { fr: "Ramen du chef", en: "Chef's Ramen" } },
  { photo: "epices", label: { fr: "Épices & condiments", en: "Spices & Condiments" } },
  { photo: "dessert", label: { fr: "Desserts", en: "Desserts" } },
];
