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
  /* La maison a deux lignes : le fixe et un mobile. Les deux sont affichés
     partout où le téléphone apparaît (bloc « nous trouver » et pied de page),
     chacun cliquable. Pour en retirer un, il suffit de le sortir de la liste. */
  phones: [
    { label: "09 53 57 88 88", href: "tel:+33953578888" },
    { label: "07 50 05 12 48", href: "tel:+33750051248" },
  ],

  address: {
    street: "1 Rue el Burgo de Osma",
    city: "33780 Soulac-sur-Mer",
    country: "France",
  },

  hours: {
    lunch: "12h00 - 15h00",
    dinner: "19h00 - 23h00",
    // Vide = ouvert 7j/7 (affiche "Ouvert 7 jours sur 7" au lieu d'un jour de fermeture).
    closedDay: "",
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
