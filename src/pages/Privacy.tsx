import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import LegalSection from "../components/LegalSection";
import SectionFX from "../components/SectionFX";
import { siteConfig } from "../config/siteConfig";

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-luxury-black">
      <PageHero
        title={t("privacy.heroTitle")}
        subtitle={t("privacy.heroSubtitle")}
        image="epices"
      />

      <section className="emerald-wash relative overflow-hidden bg-luxury-ink py-12 grain md:py-16">
        <SectionFX />
        <div className="section-padding relative z-10 mx-auto max-w-3xl">
          <div className="luxury-card-dark deco-corners p-7 md:p-10">
          <LegalSection title={t("privacy.introTitle")}>
            <p>{t("privacy.introText")}</p>
          </LegalSection>

          <LegalSection title={t("privacy.cookiesTitle")}>
            <p>{t("privacy.cookiesText")}</p>
          </LegalSection>

          <LegalSection title={t("privacy.thirdPartyTitle")}>
            <p>{t("privacy.thirdPartyText")}</p>
          </LegalSection>

          <LegalSection title={t("privacy.rightsTitle")}>
            <p>{t("privacy.rightsText")}</p>
            {siteConfig.email && (
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-luxury-gold hover:text-luxury-gold-bright transition-colors break-all"
                >
                  {siteConfig.email}
                </a>
              </p>
            )}
          </LegalSection>

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors font-accent uppercase text-sm tracking-luxury rounded-full px-8 py-3.5"
            >
              {t("privacy.backHome")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
