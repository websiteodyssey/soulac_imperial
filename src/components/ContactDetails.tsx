import type { ReactNode } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import GoldFrame from "./GoldFrame";
import InstagramIcon from "./InstagramIcon";
import FacebookIcon from "./FacebookIcon";
import { siteConfig } from "../config/siteConfig";

interface ContactDetailsProps {
  /** Boutons rendus sous les cartes d'information (colonne de gauche). */
  actions?: ReactNode;
  /** Affiche le bloc réseaux sociaux. */
  showSocial?: boolean;
  /** Masque le plan sur mobile (l'accueil le réserve à la page Contact). */
  mapDesktopOnly?: boolean;
}

/**
 * Bloc « nous trouver » : adresse, téléphone, e-mail, horaires et plan.
 * Partagé par l'accueil et la page Contact. Toute information absente de
 * `siteConfig` est simplement masquée — jamais de carte vide.
 */
const ContactDetails = ({ actions, showSocial = false, mapDesktopOnly = false }: ContactDetailsProps) => {
  const { t } = useTranslation();
  const { instagram, facebook } = siteConfig.social;

  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.city}`
  )}&output=embed`;

  const badge =
    "shrink-0 grid place-items-center h-12 w-12 rounded-full border border-luxury-gold/40 text-luxury-gold";
  const label = "font-accent uppercase tracking-luxury text-xs text-luxury-gold mb-1.5";

  // Décalage d'apparition : les cartes absentes ne laissent pas de trou dans la
  // cascade. On calcule les délais une fois, à partir des cartes réellement rendues.
  const cards = ["address", "phone", "email", "hours", "social"].filter((c) => {
    if (c === "phone") return Boolean(siteConfig.phone);
    if (c === "email") return Boolean(siteConfig.email);
    if (c === "social") return showSocial && Boolean(instagram || facebook);
    return true;
  });
  const delayOf = (card: string) => Math.max(0, cards.indexOf(card)) * 80;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col gap-3 font-body md:gap-5">
        <Reveal className="luxury-card-dark flex items-center gap-4 p-4 md:gap-5 md:p-6">
          <span className={badge}>
            <MapPin size={22} strokeWidth={1.6} />
          </span>
          <div>
            <h3 className={label}>{t("contact.addressTitle")}</h3>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-luxury-champagne/85 text-lg leading-snug hover:text-luxury-gold transition-colors"
            >
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}
            </a>
          </div>
        </Reveal>

        {siteConfig.phone && (
          <Reveal delay={delayOf("phone")} className="luxury-card-dark flex items-center gap-4 p-4 md:gap-5 md:p-6">
            <span className={badge}>
              <Phone size={22} strokeWidth={1.6} />
            </span>
            <div>
              <h3 className={label}>{t("contact.phoneTitle")}</h3>
              <a
                href={siteConfig.phoneHref}
                className="text-luxury-champagne/85 text-lg hover:text-luxury-gold transition-colors"
              >
                {siteConfig.phone}
              </a>
            </div>
          </Reveal>
        )}

        {siteConfig.email && (
          <Reveal delay={delayOf("email")} className="luxury-card-dark flex items-center gap-4 p-4 md:gap-5 md:p-6">
            <span className={badge}>
              <Mail size={22} strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <h3 className={label}>{t("contact.emailTitle")}</h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block break-all text-luxury-champagne/85 text-lg hover:text-luxury-gold transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
          </Reveal>
        )}

        <Reveal delay={delayOf("hours")} className="luxury-card-dark flex items-start gap-4 p-4 md:gap-5 md:p-6">
          <span className={badge}>
            <Clock size={22} strokeWidth={1.6} />
          </span>
          <div>
            <h3 className={label}>{t("contact.hoursTitle")}</h3>
            <p className="text-luxury-champagne/85 text-lg">
              {t("contact.hoursLunch", { hours: siteConfig.hours.lunch })}
            </p>
            <p className="text-luxury-champagne/85 text-lg">
              {t("contact.hoursDinner", { hours: siteConfig.hours.dinner })}
            </p>
            <p className="text-luxury-champagne/55 mt-1">
              {t("contact.hoursDays", { day: siteConfig.hours.closedDay.toLowerCase() })}
            </p>
          </div>
        </Reveal>

        {showSocial && (instagram || facebook) && (
          <Reveal delay={delayOf("social")} className="luxury-card-dark p-4 md:p-6">
            <h3 className={label}>{t("contact.followTitle")}</h3>
            <div className="flex items-center gap-3 mt-2">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={`${badge} hover:bg-luxury-gold/10 transition-colors`}
                >
                  <InstagramIcon size={22} />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={`${badge} hover:bg-luxury-gold/10 transition-colors`}
                >
                  <FacebookIcon size={21} />
                </a>
              )}
            </div>
          </Reveal>
        )}

        {actions}
      </div>

      <Reveal delay={150} className={`h-full ${mapDesktopOnly ? "hidden lg:block" : ""}`}>
        <GoldFrame className="h-full">
          <div className="relative h-full min-h-[240px] overflow-hidden rounded-lg border border-luxury-gold/20 md:min-h-[380px]">
            <iframe
              title={t("contact.addressTitle")}
              src={mapEmbedSrc}
              className="h-full min-h-[240px] w-full border-0 md:min-h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </GoldFrame>
      </Reveal>
    </div>
  );
};

export default ContactDetails;
