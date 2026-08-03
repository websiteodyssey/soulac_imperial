import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SectionFX from "../components/SectionFX";
import ContactDetails from "../components/ContactDetails";
import ReserveButton from "../components/ReserveButton";
import AmbianceVideo from "../components/AmbianceVideo";
import { siteConfig, hasReservationUrl } from "../config/siteConfig";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-luxury-black">
      <PageHero
        title={t("contact.heroTitle")}
        subtitle={t("contact.heroSubtitle")}
        image="sake"
        lead={t("contact.text")}
      />

      <section className="emerald-wash relative py-16 md:py-24 lg:py-32 bg-luxury-ink grain overflow-hidden">
        <SectionFX />
        <div className="section-padding relative z-10">
          <Reveal className="max-w-2xl mx-auto mb-14">
            <SectionHeading
              tone="dark"
              eyebrow={t("contact.heroSubtitle")}
              title={t("contact.title")}
              subtitle={t("contact.text")}
            />
          </Reveal>

          <ContactDetails
            showSocial
            actions={
              <>
                {/* Le bouton n'apparaît ici que si un lien de réservation existe :
                    sur cette page, y renvoyer vers elle-même n'aurait aucun sens. */}
                {hasReservationUrl && (
                  <Reveal delay={320}>
                    <ReserveButton className="btn-shine block text-center bg-luxury-gold text-luxury-black hover:bg-luxury-gold-bright transition-colors font-accent uppercase text-sm tracking-luxury rounded-full px-6 py-4" />
                  </Reveal>
                )}
                <Reveal delay={400}>
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine block text-center border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors font-accent uppercase text-sm tracking-luxury rounded-full px-6 py-4"
                  >
                    {t("contact.mapCta")}
                  </a>
                </Reveal>
              </>
            }
          />
        </div>
      </section>

      {/* Un dernier plan de salle, en mouvement : le service tel qu'il est,
          sans qu'aucun plat n'ait à être nommé. */}
      <section className="relative overflow-hidden bg-luxury-black py-16 md:py-24">
        <div className="section-padding relative z-10 mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-xs lg:mx-0">
            <div className="overflow-hidden rounded-xl border border-luxury-gold/25 shadow-2xl shadow-black/60">
              <AmbianceVideo
                label={t("contact.videoAlt")}
                className="block aspect-[9/16] w-full object-cover"
              />
            </div>
            <span
              className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 border-r border-t border-luxury-gold/50"
              aria-hidden="true"
            />
          </Reveal>

          <Reveal delay={140} className="text-center lg:text-left">
            <p className="font-accent text-xs uppercase tracking-luxury-wide text-luxury-gold">
              {t("contact.videoEyebrow")}
            </p>
            <h2 className="mt-4 pb-1 font-display text-display-md text-gold-foil">
              {t("contact.videoTitle")}
            </h2>
            <p className="mt-5 font-body leading-relaxed text-luxury-champagne/75">
              {t("contact.videoText")}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
