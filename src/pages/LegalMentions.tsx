import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import LegalSection from "../components/LegalSection";
import SectionFX from "../components/SectionFX";
import { siteConfig } from "../config/siteConfig";

const LegalMentions = () => {
  const { t } = useTranslation();
  const L = siteConfig.legal;

  // Seules les lignes renseignées sont affichées : pas de champ « à compléter »
  // laissé en ligne tant que le Kbis n'a pas été fourni.
  const rows: [string, string][] = (
    [
      [t("legal.fields.company"), L.company],
      [t("legal.fields.brand"), L.brandName],
      [t("legal.fields.legalForm"), L.legalForm],
      [t("legal.fields.capital"), L.capital],
      [t("legal.fields.headOffice"), L.headOffice],
      [t("legal.fields.rcs"), L.rcs],
      [t("legal.fields.siren"), L.siren],
      [t("legal.fields.naf"), L.naf],
      [t("legal.fields.manager"), L.manager],
      [t("legal.fields.activity"), L.activity],
      [t("legal.fields.email"), siteConfig.email],
      [t("legal.fields.phone"), siteConfig.phone],
    ] as [string, string][]
  ).filter(([, value]) => value.trim().length > 0);

  return (
    <div className="bg-luxury-black">
      <PageHero
        title={t("legal.heroTitle")}
        subtitle={t("legal.heroSubtitle")}
        image="ramenNoir"
      />

      <section className="emerald-wash relative overflow-hidden bg-luxury-ink py-12 grain md:py-16">
        <SectionFX />
        <div className="section-padding relative z-10 mx-auto max-w-3xl">
          <div className="luxury-card-dark deco-corners p-7 md:p-10">
          <LegalSection title={t("legal.editorTitle")}>
            <p>
              {t("legal.editorText", {
                name: siteConfig.name,
                address: `${siteConfig.address.street}, ${siteConfig.address.city}`,
              })}
            </p>
            <dl className="mt-6 divide-y divide-luxury-gold/12 border-y border-luxury-gold/12">
              {rows.map(([key, value]) => (
                <div key={key} className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-1 py-3">
                  <dt className="font-accent uppercase text-xs tracking-luxury text-luxury-gold">
                    {key}
                  </dt>
                  <dd className="text-luxury-champagne/85 break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </LegalSection>

          <LegalSection title={t("legal.hostingTitle")}>
            <p>{t("legal.hostingText")}</p>
          </LegalSection>

          <LegalSection title={t("legal.propertyTitle")}>
            <p>{t("legal.propertyText")}</p>
          </LegalSection>

          <LegalSection title={t("legal.photosTitle")}>
            <p>{t("legal.photosText")}</p>
          </LegalSection>

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors font-accent uppercase text-sm tracking-luxury rounded-full px-8 py-3.5"
            >
              {t("legal.backHome")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalMentions;
