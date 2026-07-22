import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import FacebookIcon from "./FacebookIcon";
import { siteConfig } from "../config/siteConfig";
import { media } from "../config/media";

const Footer = () => {
  const { t } = useTranslation();
  const { instagram, facebook } = siteConfig.social;

  const links = [
    { to: "/", label: t("common.nav.home") },
    { to: "/la-maison", label: t("common.nav.about") },
    { to: "/la-carte", label: t("common.nav.menu") },
    { to: "/galerie", label: t("common.nav.gallery") },
    { to: "/contact", label: t("common.nav.contact") },
  ];

  return (
    <footer className="bg-luxury-black text-luxury-cream border-t border-luxury-gold/15">
      <div className="section-padding grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:gap-x-8 md:py-16 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <img
              src={media.logo}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 object-contain shrink-0"
            />
            <span className="font-display text-2xl text-luxury-cream">{siteConfig.name}</span>
          </div>
          <p className="font-body text-luxury-champagne/80 leading-relaxed">{t("footer.tagline")}</p>
          {(instagram || facebook) && (
            <div className="flex items-center gap-3 mt-5">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/30 text-luxury-cream/80 hover:text-luxury-gold hover:border-luxury-gold/60 transition-colors"
                >
                  <InstagramIcon size={20} />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/30 text-luxury-cream/80 hover:text-luxury-gold hover:border-luxury-gold/60 transition-colors"
                >
                  <FacebookIcon size={19} />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-display text-lg text-luxury-gold uppercase tracking-luxury mb-4">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-3 font-body text-luxury-cream/90">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-luxury-gold transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-luxury-gold uppercase tracking-luxury mb-4">
            {t("footer.contactTitle")}
          </h3>
          <ul className="space-y-3 font-body text-luxury-cream/90">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-luxury-gold mt-1 shrink-0" />
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-luxury-gold transition-colors"
              >
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}
              </a>
            </li>
            {siteConfig.phone && (
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-luxury-gold shrink-0" />
                <a href={siteConfig.phoneHref} className="hover:text-luxury-gold transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
            )}
            {siteConfig.email && (
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-luxury-gold shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all hover:text-luxury-gold transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-luxury-gold uppercase tracking-luxury mb-4">
            {t("common.openingHours")}
          </h3>
          <ul className="space-y-3 font-body text-luxury-cream/90">
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-luxury-gold shrink-0" />
              <span>
                {t("common.lunch")} : {siteConfig.hours.lunch}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-luxury-gold shrink-0" />
              <span>
                {t("common.dinner")} : {siteConfig.hours.dinner}
              </span>
            </li>
            <li className="text-luxury-cream/60">
              {t("common.closedOn", { day: siteConfig.hours.closedDay.toLowerCase() })}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-luxury-gold/20 py-6 text-center font-body text-sm text-luxury-cream/60">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-3">
          <Link to="/mentions-legales" className="hover:text-luxury-gold transition-colors">
            {t("footer.legalMentions")}
          </Link>
          <span className="text-luxury-gold/30" aria-hidden="true">
            ·
          </span>
          <Link to="/confidentialite" className="hover:text-luxury-gold transition-colors">
            {t("footer.privacy")}
          </Link>
        </nav>
        <p>
          © {new Date().getFullYear()} {siteConfig.name} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
