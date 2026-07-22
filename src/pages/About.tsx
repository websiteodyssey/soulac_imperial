import { useTranslation } from "react-i18next";
import { Fish, Soup, Hand, Waves } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Ornament from "../components/Ornament";
import SectionHeading from "../components/SectionHeading";
import ParallaxBg from "../components/ParallaxBg";
import SectionFX from "../components/SectionFX";
import Photo from "../components/Photo";

const About = () => {
  const { t } = useTranslation();

  const values = [
    { Icon: Fish, label: t("about.value1") },
    { Icon: Soup, label: t("about.value2") },
    { Icon: Hand, label: t("about.value3") },
    { Icon: Waves, label: t("about.value4") },
  ];

  const commitments = [
    { title: t("about.commitment1Title"), text: t("about.commitment1Text") },
    { title: t("about.commitment2Title"), text: t("about.commitment2Text") },
    { title: t("about.commitment3Title"), text: t("about.commitment3Text") },
  ];

  return (
    <div className="bg-luxury-black">
      <PageHero
        title={t("about.heroTitle")}
        subtitle={t("about.heroSubtitle")}
        image="fresques"
        lead={t("about.historyIntro")}
      />

      {/* Histoire — image + texte */}
      <section className="relative overflow-hidden py-10 grain md:py-20">
        <div className="section-padding relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-lg border border-luxury-gold/20">
              <Photo
                name="banquette"
                alt={t("gallery.roomAlt")}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="h-56 w-full object-cover md:h-[26rem]"
              />
            </div>
            <span
              className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-luxury-gold/50"
              aria-hidden="true"
            />
          </Reveal>

          <Reveal delay={140} className="text-center lg:text-left">
            <p className="font-accent text-xs uppercase tracking-luxury-wide text-luxury-gold">
              {t("about.heroSubtitle")}
            </p>
            <h2 className="mt-4 pb-1 font-display text-display-md text-gold-foil">
              {t("about.historyTitle")}
            </h2>
            <Ornament align="center" className="mt-5 lg:hidden" />
            <p className="mt-6 font-body text-lg leading-relaxed text-luxury-champagne/80">
              {t("about.historyIntro")}
            </p>
            <p className="mt-4 hidden font-body leading-relaxed text-luxury-champagne/65 sm:block">
              {t("about.historyText2")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Citation */}
      <section className="emerald-wash relative overflow-hidden border-y border-luxury-gold/15 bg-luxury-ink py-12 grain md:py-20">
        <ParallaxBg name="braise" className="opacity-[0.16]" />
        <SectionFX />
        <Reveal className="section-padding relative z-10 mx-auto max-w-3xl text-center">
          <span className="font-display text-6xl leading-none text-luxury-gold/40" aria-hidden="true">
            “
          </span>
          <p className="-mt-4 font-display text-2xl italic text-luxury-cream md:text-4xl">
            {t("about.quote")}
          </p>
          <Ornament className="mt-8" />
        </Reveal>
      </section>

      {/* Philosophie — texte + image */}
      <section className="relative overflow-hidden py-10 grain md:py-20">
        <div className="section-padding relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 text-center lg:order-1 lg:text-left">
            <p className="font-accent text-xs uppercase tracking-luxury-wide text-luxury-gold">
              {t("about.motto")}
            </p>
            <h2 className="mt-4 pb-1 font-display text-display-md text-gold-foil">
              {t("about.philosophyTitle")}
            </h2>
            <Ornament align="center" className="mt-5 lg:hidden" />
            <p className="mt-6 font-body text-lg leading-relaxed text-luxury-champagne/80">
              {t("about.philosophyText1")}
            </p>
            <p className="mt-4 hidden font-body leading-relaxed text-luxury-champagne/65 sm:block">
              {t("about.philosophyText2")}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8">
              {values.map(({ Icon, label }, i) => (
                <Reveal
                  key={label}
                  delay={(i % 2) * 80}
                  className="luxury-card-dark flex items-center gap-3 p-4 text-left"
                >
                  <Icon className="shrink-0 text-luxury-gold" size={24} strokeWidth={1.4} />
                  <span className="font-body text-sm text-luxury-champagne/85">{label}</span>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140} className="relative order-1 lg:order-2">
            <div className="overflow-hidden rounded-lg border border-luxury-gold/20">
              <Photo
                name="nappage"
                alt={t("gallery.roomAlt")}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="h-56 w-full object-cover md:h-[26rem]"
              />
            </div>
            <span
              className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 border-l border-t border-luxury-gold/50"
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </section>

      {/* Équipe & engagements */}
      <section className="emerald-wash relative overflow-hidden bg-luxury-ink py-10 grain md:py-20">
        <SectionFX />
        <div className="section-padding relative z-10 mx-auto max-w-5xl text-center">
          <Reveal className="mx-auto max-w-2xl">
            <SectionHeading
              tone="dark"
              eyebrow={t("about.commitments")}
              title={t("about.teamTitle")}
              subtitle={t("about.teamText1")}
            />
            <p className="mt-4 font-body text-luxury-champagne/60">{t("about.teamText2")}</p>
          </Reveal>

          <div className="cards-stagger mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {commitments.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 110}
                className="luxury-card-dark animate-card-pulse deco-corners flex flex-col items-center p-7 text-center"
              >
                <span className="font-display text-3xl text-luxury-gold/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 mt-3 font-display text-xl text-luxury-cream">{c.title}</h3>
                <p className="font-body text-luxury-champagne/65">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
