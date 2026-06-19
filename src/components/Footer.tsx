import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Mail, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";
import WaveDivider from "./WaveDivider";
import { siteConfig } from "../config/siteConfig";
import { media } from "../config/media";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-gradient-to-b from-[#0b2e38] via-imperial-ink to-imperial-ink text-imperial-cream">
      <WaveDivider color="#0b2e38" />
      <div className="section-padding pt-12 pb-10 grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-4">
          <img
            src={media.logo}
            alt={siteConfig.name}
            className="w-28 mb-4"
            style={{ mixBlendMode: "screen" }}
          />
          <p className="font-body text-sm text-imperial-cream/65 leading-relaxed max-w-xs">
            {t("footer.tagline")}
          </p>
          <div className="flex items-center gap-4 mt-5">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-imperial-cream/80 hover:text-imperial-gold transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-imperial-cream/80 hover:text-imperial-gold transition-colors">
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="md:col-span-3">
          <h3 className="eyebrow text-imperial-gold mb-5">{t("footer.quickLinks")}</h3>
          <ul className="space-y-2.5 font-body text-sm text-imperial-cream/85">
            <li><Link to="/" className="hover:text-imperial-gold transition-colors">{t("common.nav.home")}</Link></li>
            <li><Link to="/a-propos" className="hover:text-imperial-gold transition-colors">{t("common.nav.about")}</Link></li>
            <li><Link to="/carte" className="hover:text-imperial-gold transition-colors">{t("common.nav.menu")}</Link></li>
            <li><Link to="/carte" className="hover:text-imperial-gold transition-colors">{t("common.nav.clickcollect")}</Link></li>
            <li><Link to="/reservation" className="hover:text-imperial-gold transition-colors">{t("common.nav.reservation")}</Link></li>
            <li><Link to="/contact" className="hover:text-imperial-gold transition-colors">{t("common.nav.contact")}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-3">
          <h3 className="eyebrow text-imperial-gold mb-5">{t("footer.contactTitle")}</h3>
          <ul className="space-y-3 font-body text-sm text-imperial-cream/85">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-imperial-gold mt-0.5 shrink-0" />
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-imperial-gold transition-colors">
                {siteConfig.address.street}, {siteConfig.address.city}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-imperial-gold shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-imperial-gold transition-colors whitespace-nowrap">{siteConfig.email}</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="md:col-span-2">
          <h3 className="eyebrow text-imperial-gold mb-5">{t("footer.hoursTitle")}</h3>
          <ul className="font-body text-sm text-imperial-cream/85">
            <li className="flex items-start gap-2.5">
              <Clock size={16} className="text-imperial-gold mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <p>{t("footer.lunch")} · {siteConfig.hours.lunch}</p>
                <p>{t("footer.dinner")} · {siteConfig.hours.dinner}</p>
                <p className="mt-1.5 text-imperial-cream/55 text-xs">{t("footer.closed")} {t(`days.${siteConfig.hours.closedDay.toLowerCase()}`)}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-imperial-gold/15 py-5 section-padding flex flex-col sm:flex-row items-center justify-between gap-3 font-body text-xs text-imperial-cream/55">
        <p>© {new Date().getFullYear()} {siteConfig.name} — {t("footer.rights")}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <Link to="/mentions-legales" className="hover:text-imperial-gold transition-colors">{t("footer.legalLink")}</Link>
          <span className="text-imperial-gold/30">·</span>
          <Link to="/confidentialite" className="hover:text-imperial-gold transition-colors">{t("footer.privacyLink")}</Link>
          <span className="text-imperial-gold/30">·</span>
          <Link to="/qr-codes" className="hover:text-imperial-gold transition-colors">{t("footer.qrStaff")}</Link>
        </div>
        <a href="https://ody.app" target="_blank" rel="noopener noreferrer" className="tracking-[0.15em] uppercase hover:text-imperial-gold transition-colors">
          {t("footer.poweredBy")}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
