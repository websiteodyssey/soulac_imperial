import type { MediaKey } from "../config/media";

/**
 * Le bandeau « Nos spécialités » de l'accueil : une photo = une spécialité.
 * Chaque photo n'y paraît qu'une fois, et aucune ne se retrouve dans la grille
 * des six familles plus bas — sans quoi la même image ouvrirait deux fois la
 * même page.
 */
export interface Specialite {
  photo: MediaKey;
  label: { fr: string; en: string };
}

export const SPECIALITES_LIST: Specialite[] = [
  { photo: "sushi", label: { fr: "Sushi & Sashimi", en: "Sushi & Sashimi" } },
  { photo: "rouleaux", label: { fr: "Makis & Rolls", en: "Maki & Rolls" } },
  { photo: "dimsum", label: { fr: "Vapeur", en: "Steamed" } },
  { photo: "wok", label: { fr: "Woks au feu vif", en: "Fierce-Flame Wok" } },
  { photo: "canard", label: { fr: "Canard laqué", en: "Glazed Duck" } },
  { photo: "plateau", label: { fr: "Plateau Impérial", en: "Imperial Platter" } },
  { photo: "ramen", label: { fr: "Nouilles sautées du chef", en: "Chef's Stir-Fried Noodles" } },
  { photo: "epices", label: { fr: "Épices & condiments", en: "Spices & Condiments" } },
  { photo: "dessert", label: { fr: "Desserts", en: "Desserts" } },
];
