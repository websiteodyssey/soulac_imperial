/**
 * Toutes les informations éditables du site sont réunies ici.
 * Une valeur laissée vide ("") est automatiquement masquée à l'écran —
 * aucun bloc vide, aucun lien mort.
 */
export const siteConfig = {
  name: "Soulac Impérial",
  shortName: "Impérial",

  // ⬇︎ COLLER ICI LE LIEN DE RÉSERVATION (TheFork, Odyssey, Google…).
  //    Tant qu'il est vide, le bouton « Réserver » renvoie vers la page Contact.
  reservationUrl: "",

  email: "contact@soulacimperial.fr",
  phone: "",
  phoneHref: "",

  address: {
    street: "1 Rue el Burgo de Osma",
    city: "33780 Soulac-sur-Mer",
    country: "France",
  },

  hours: {
    lunch: "12h00 - 14h30",
    dinner: "19h00 - 22h00",
    closedDay: "Mardi",
  },

  // Laisser vide pour masquer l'icône.
  social: {
    instagram: "https://instagram.com/soulacimperial",
    facebook: "https://facebook.com/soulacimperial",
  },

  mapsUrl:
    "https://maps.google.com/?q=1+Rue+el+Burgo+de+Osma,+33780+Soulac-sur-Mer,+France",

  // Mentions légales — à compléter avec l'extrait Kbis du restaurant.
  legal: {
    company: "",
    brandName: "Soulac Impérial",
    legalForm: "",
    capital: "",
    headOffice: "1 Rue el Burgo de Osma, 33780 Soulac-sur-Mer",
    rcs: "",
    siren: "",
    naf: "5610A",
    manager: "",
    activity: "Restauration traditionnelle — cuisine chinoise et japonaise",
  },
};

/** Le lien de réservation est-il configuré ? */
export const hasReservationUrl = siteConfig.reservationUrl.trim().length > 0;
