import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import HeroSlideshow from "../components/HeroSlideshow";
import TextMarquee from "../components/TextMarquee";
import SpinningSeal from "../components/SpinningSeal";
import SpecialtiesRail from "../components/SpecialtiesRail";
import Reveal from "../components/Reveal";
import Ornament from "../components/Ornament";
import SectionHeading from "../components/SectionHeading";
import ParallaxBg from "../components/ParallaxBg";
import ContactDetails from "../components/ContactDetails";
import ReserveButton from "../components/ReserveButton";
import InstagramIcon from "../components/InstagramIcon";
import FacebookIcon from "../components/FacebookIcon";
import Photo from "../components/Photo";
import { siteConfig } from "../config/siteConfig";
import { MOSAIQUE, MAISON_DUO, SIGNATURES_PHOTOS, FAMILLES_PHOTOS } from "../config/media";
import { SIGNATURES, findItem } from "../data/menu";

const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "fr";

  const familles = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    photo: FAMILLES_PHOTOS[i],
    title: t(`home.universe${n}Title`),
    text: t(`home.universe${n}Text`),
  }));

  const stats = [
    { value: "2", label: t("home.stat1") },
    { value: "100%", label: t("home.stat2") },
    { value: "6", label: t("home.stat3") },
    { value: "5 min", label: t("home.stat4") },
  ];

  const points = [1, 2, 3].map((n) => ({
    title: t(`home.point${n}Title`),
    text: t(`home.point${n}Text`),
  }));

  const signatures = SIGNATURES.map(findItem)
    .filter((d) => d !== undefined)
    .map((dish, i) => ({ dish, photo: SIGNATURES_PHOTOS[i] }));

  const prix = (p: number) =>
    new Intl.NumberFormat(lang === "en" ? "en-GB" : "fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(p);

  const socials = [
    { url: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { url: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  ].filter((s) => s.url);

  return (
    <div className="bg-luxury-black">
      {/* ═══════════════════════ OUVERTURE ═══════════════════════ */}
      <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-luxury-black grain py-28 md:min-h-screen">
        <HeroSlideshow />
        <div className="hero-overlay pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-luxury-black/40" />
        <div
          className="gold-halo animate-fade-up pointer-events-none absolute inset-0"
          style={{ animationDelay: "1.3s" }}
        />

        <span className="absolute left-8 top-1/2 hidden -translate-y-1/2 rotate-180 font-accent text-xs uppercase tracking-luxury-wide text-luxury-champagne/60 [writing-mode:vertical-rl] lg:block">
          {t("home.heroSide1")}
        </span>
        <span className="absolute right-8 top-1/2 hidden -translate-y-1/2 font-accent text-xs uppercase tracking-luxury-wide text-luxury-champagne/60 [writing-mode:vertical-rl] lg:block">
          {siteConfig.address.city.replace(/^\d+\s*/, "")} — France
        </span>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p
            className="animate-fade-up mb-6 font-accent text-xs uppercase tracking-luxury-wide text-luxury-gold md:text-sm"
            style={{ animationDelay: "1.2s" }}
          >
            {t("home.heroSubtitle")}
          </p>

          <h1
            className="animate-letter-in text-glow font-display font-semibold leading-[0.95]"
            style={{ animationDelay: "1.35s" }}
          >
            <span className="text-gold-shimmer text-[clamp(2.6rem,9vw,6.5rem)]">
              {t("home.heroTitle")}
            </span>
          </h1>
          <p
            className="animate-fade-up mt-4 font-display text-xl italic text-luxury-cream md:text-2xl lg:text-3xl"
            style={{ animationDelay: "1.5s" }}
          >
            {t("home.heroTagline")}
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            style={{ animationDelay: "1.6s" }}
          >
            <Link
              to="/la-carte"
              className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full border border-luxury-gold py-3.5 font-accent text-xs uppercase tracking-luxury text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black sm:w-56 sm:py-4 sm:text-sm"
            >
              {t("home.heroCtaMenu")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <ReserveButton className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full bg-luxury-gold py-3.5 font-accent text-xs uppercase tracking-luxury text-luxury-black transition-colors hover:bg-luxury-gold-bright sm:w-56 sm:py-4 sm:text-sm" />
          </div>

          {socials.length > 0 && (
            <div
              className="animate-fade-up mt-8 flex items-center justify-center gap-3"
              style={{ animationDelay: "1.8s" }}
            >
              {socials.map(({ url, label, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/40 bg-luxury-black/25 text-luxury-cream/90 backdrop-blur-sm transition-colors hover:border-luxury-gold hover:text-luxury-gold"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <span
          className="animate-fade-up absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-accent text-[0.6rem] uppercase tracking-luxury-wide text-luxury-champagne/60"
          style={{ animationDelay: "2.1s" }}
          aria-hidden="true"
        >
          {t("home.scrollCue")}
          <ArrowDown size={14} className="animate-float text-luxury-gold" />
        </span>

        <div
          className="animate-fade-up absolute bottom-8 right-8 z-10 hidden h-24 w-24 lg:block xl:h-28 xl:w-28"
          style={{ animationDelay: "2s" }}
        >
          <SpinningSeal text={t("common.sealText")} />
        </div>
      </section>

      {/* ═══════════════════════ BANDEAU CHIFFRES ═══════════════════════ */}
      <section className="border-y border-luxury-gold/20 bg-luxury-ink">
        <div className="section-padding mx-auto grid max-w-6xl grid-cols-2 divide-luxury-gold/15 py-8 sm:grid-cols-4 sm:divide-x md:py-10">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-3 text-center sm:py-0">
              <p className="font-display text-3xl leading-none text-gold-foil md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 font-accent text-[0.6rem] uppercase tracking-luxury text-luxury-champagne/70 md:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ LA MAISON (éditorial) ═══════════════════════ */}
      <section className="relative overflow-hidden py-10 grain md:py-20">
        <div className="section-padding relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Deux photos décalées : la composition remplit la colonne */}
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-lg border border-luxury-gold/20">
              <Photo
                name={MAISON_DUO[0]}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="h-52 w-full object-cover md:h-[22rem]"
              />
            </div>
            <div className="relative -mt-14 ml-auto w-2/3 overflow-hidden rounded-lg border border-luxury-gold/30 shadow-2xl shadow-black/60 md:-mt-20 md:w-3/5">
              <Photo
                name={MAISON_DUO[1]}
                sizes="(min-width: 1024px) 18rem, 60vw"
                className="h-28 w-full object-cover md:h-56"
              />
            </div>
            <span
              className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 border-l border-t border-luxury-gold/50"
              aria-hidden="true"
            />
          </Reveal>

          <Reveal delay={140} className="text-center lg:text-left">
            <p className="font-accent text-xs uppercase tracking-luxury-wide text-luxury-gold">
              {t("home.maisonEyebrow")}
            </p>
            <h2 className="mt-4 font-display text-display-md text-gold-foil pb-1">
              {t("home.maisonTitle")}
            </h2>
            <Ornament align="center" className="mt-5 lg:hidden" />
            <p className="mt-6 font-body text-lg leading-relaxed text-luxury-champagne/80">
              {t("home.maisonText1")}
            </p>
            <p className="mt-4 hidden font-body leading-relaxed text-luxury-champagne/65 sm:block">
              {t("home.maisonText2")}
            </p>

            <ul className="mt-6 space-y-3 text-left md:mt-8 md:space-y-4">
              {points.map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span className="mt-1 font-display text-lg text-luxury-gold/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-lg text-luxury-cream">{p.title}</span>
                    <span className="block font-body text-luxury-champagne/60">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/la-maison"
              className="group mt-8 inline-flex items-center gap-2 font-accent text-sm uppercase tracking-luxury text-luxury-gold transition-colors hover:text-luxury-gold-bright"
            >
              {t("home.storyCta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ SPÉCIALITÉS (bandeau) ═══════════════════════ */}
      <section className="relative overflow-hidden border-y border-luxury-gold/15 bg-luxury-ink py-10 grain md:py-16">
        <div className="section-padding relative z-10">
          <Reveal className="mx-auto mb-6 max-w-2xl md:mb-8">
            <SectionHeading
              tone="dark"
              eyebrow={t("home.specialtiesEyebrow")}
              title={t("home.specialtiesTitle")}
              subtitle={t("home.specialtiesSubtitle")}
            />
          </Reveal>
        </div>
        <Reveal>
          <SpecialtiesRail />
        </Reveal>
        <div className="mt-8 text-center">
          <TextMarquee items={familles.map((f) => f.title)} speed={40} />
        </div>
      </section>

      {/* ═══════════════════════ SIGNATURES ═══════════════════════ */}
      <section className="relative overflow-hidden py-10 grain emerald-wash md:py-20">
        <ParallaxBg name="braise" className="opacity-[0.14]" />
        <div className="section-padding relative z-10">
          <Reveal className="mx-auto mb-7 max-w-2xl md:mb-10">
            <SectionHeading
              tone="dark"
              eyebrow={t("home.signaturesEyebrow")}
              title={t("home.signaturesTitle")}
              subtitle={t("home.signaturesLead")}
            />
          </Reveal>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {signatures.map(({ dish, photo }, i) => (
              <Reveal
                key={dish.id}
                delay={(i % 4) * 90}
                className="group flex flex-col overflow-hidden rounded-xl border border-luxury-gold/20 bg-luxury-ink/60 transition-colors duration-500 hover:border-luxury-gold/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo
                    name={photo}
                    alt={dish.name[lang] ?? dish.name.fr}
                    sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 to-transparent" />
                  <span className="absolute left-4 top-4 font-display text-2xl text-luxury-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 text-center sm:p-5">
                  <h3 className="font-display text-base leading-tight text-luxury-cream sm:text-lg">
                    {dish.name[lang] ?? dish.name.fr}
                  </h3>
                  <p className="mt-2 hidden flex-1 font-body text-sm leading-relaxed text-luxury-champagne/65 sm:block">
                    {dish.desc[lang] ?? dish.desc.fr}
                  </p>
                  <span className="num-elegant mt-3 font-display text-base text-luxury-gold-bright sm:mt-4 sm:text-lg">
                    {prix(dish.price)}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SIX FAMILLES ═══════════════════════ */}
      <section className="relative overflow-hidden bg-luxury-ink py-10 grain md:py-20">
        <div className="section-padding relative z-10">
          <Reveal className="mx-auto mb-7 max-w-2xl md:mb-10">
            <SectionHeading
              tone="dark"
              eyebrow={t("home.famillesEyebrow")}
              title={t("home.famillesTitle")}
              subtitle={t("home.famillesSubtitle")}
            />
          </Reveal>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {familles.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 90}>
                <Link
                  to="/la-carte"
                  className="group relative block aspect-square overflow-hidden rounded-xl border border-luxury-gold/20 transition-colors duration-500 hover:border-luxury-gold/60 sm:aspect-[16/10]"
                >
                  <Photo
                    name={f.photo}
                    alt={f.title}
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/45 to-luxury-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                    <span className="mb-2 block h-px w-8 origin-left scale-x-50 bg-luxury-gold transition-transform duration-500 group-hover:scale-x-100" />
                    <h3 className="font-display text-base text-luxury-cream sm:text-xl">{f.title}</h3>
                    <p className="mt-1 hidden font-body text-sm text-luxury-champagne/70 sm:block">
                      {f.text}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 text-center md:mt-10">
            <Link
              to="/la-carte"
              className="btn-shine group inline-flex items-center gap-2 rounded-full bg-luxury-gold px-9 py-4 font-accent text-sm uppercase tracking-luxury text-luxury-black transition-colors hover:bg-luxury-gold-bright"
            >
              {t("home.specialtiesCta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ L'ATMOSPHÈRE ═══════════════════════ */}
      <section className="relative overflow-hidden py-10 grain emerald-wash md:py-20">
        <div className="section-padding relative z-10">
          <Reveal className="mx-auto mb-7 max-w-2xl md:mb-10">
            <SectionHeading
              tone="dark"
              eyebrow={t("home.ambianceEyebrow")}
              title={t("home.ambianceTitle")}
              subtitle={t("home.ambianceLead")}
            />
          </Reveal>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {MOSAIQUE.map((key, i) => (
              <Reveal
                key={key}
                delay={(i % 4) * 80}
                className="group relative aspect-square overflow-hidden rounded-lg border border-luxury-gold/15 md:aspect-[3/4]"
              >
                <Photo
                  name={key}
                  alt={t("gallery.roomAlt")}
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <span className="pointer-events-none absolute inset-3 border border-luxury-gold/0 transition-colors duration-500 group-hover:border-luxury-gold/30" />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 text-center md:mt-10">
            <Link
              to="/galerie"
              className="group inline-flex items-center gap-2 rounded-full border border-luxury-gold px-8 py-4 font-accent text-sm uppercase tracking-luxury text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
            >
              {t("home.ambianceCta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════ NOUS TROUVER ═══════════════════════ */}
      <section className="relative overflow-hidden bg-luxury-ink py-10 grain md:py-20">
        <div className="section-padding relative z-10">
          <Reveal className="mx-auto mb-7 max-w-2xl md:mb-10">
            <SectionHeading
              tone="dark"
              eyebrow={t("common.findUsEyebrow")}
              title={t("common.findUsTitle")}
            />
          </Reveal>
          <ContactDetails
            mapDesktopOnly
            actions={
              <Reveal delay={320}>
                <Link
                  to="/contact"
                  className="btn-shine block rounded-full bg-luxury-gold px-6 py-4 text-center font-accent text-sm uppercase tracking-luxury text-luxury-black transition-colors hover:bg-luxury-gold-bright"
                >
                  {t("common.contactUs")}
                </Link>
              </Reveal>
            }
          />
        </div>
      </section>

      {/* ═══════════════════════ APPEL FINAL ═══════════════════════ */}
      <section className="relative overflow-hidden py-14 text-center grain md:py-24">
        <ParallaxBg name="lanternes" className="opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/80 to-luxury-black/85" />
        <Reveal className="section-padding relative z-10 mx-auto max-w-2xl">
          <Ornament className="mb-7" />
          <h2 className="mb-5 pb-1 font-display text-display-md leading-tight text-gold-foil md:text-display-lg">
            <span className="block">{t("home.ctaTitleA")}</span>
            <span className="block">{t("home.ctaTitleB")}</span>
          </h2>
          <p className="mb-9 font-body text-lg leading-relaxed text-luxury-champagne/75">
            {t("home.ctaText")}
          </p>
          <ReserveButton
            label={t("home.ctaButton")}
            className="btn-shine inline-block rounded-full bg-luxury-gold px-12 py-4 font-accent text-sm uppercase tracking-luxury text-luxury-black transition-colors hover:bg-luxury-gold-bright"
          />
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
