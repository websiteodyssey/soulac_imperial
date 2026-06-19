import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import Carousel3D from "../components/Carousel3D";
import ImageReveal from "../components/ImageReveal";
import Stats from "../components/Stats";
import Magnetic from "../components/Magnetic";
import { media } from "../config/media";
import { siteConfig } from "../config/siteConfig";
import { MENU_ITEMS } from "../data/menu";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const Home = () => {
  const { t, i18n } = useTranslation();
  const [entered, setEntered] = useState(false);

  const SIGNATURE_IDS = ["s3", "w2", "m3", "y2", "y3", "s2"];
  const signatures = SIGNATURE_IDS.map((id) => MENU_ITEMS.find((m) => m.id === id)).filter(
    (m): m is (typeof MENU_ITEMS)[number] => Boolean(m)
  );
  const formatPrice = (price: number) =>
    new Intl.NumberFormat(i18n.language, { style: "currency", currency: "EUR" }).format(price);

  useEffect(() => {
    const id = window.setTimeout(() => setEntered(true), 2050);
    return () => window.clearTimeout(id);
  }, []);

  const heroWords = t("home.heroTitle").split(" ");
  const marqueeItems = t("home.marqueeItems", { returnObjects: true }) as unknown as string[];
  const testimonials = t("home.testimonials", { returnObjects: true }) as unknown as Testimonial[];
  const stats = t("home.stats", { returnObjects: true }) as unknown as {
    number: number;
    suffix: string;
    label: string;
  }[];

  const specialties = [
    { title: t("home.specialty1Title"), text: t("home.specialty1Text"), img: media.dishes.sushi },
    { title: t("home.specialty2Title"), text: t("home.specialty2Text"), img: media.dishes.table },
    { title: t("home.specialty3Title"), text: t("home.specialty3Text"), img: media.dishes.ramen },
    { title: t("home.specialty4Title"), text: t("home.specialty4Text"), img: media.dishes.rolls },
    { title: t("home.specialty5Title"), text: t("home.specialty5Text"), img: media.dishes.sashimi },
    { title: t("home.specialty6Title"), text: t("home.specialty6Text"), img: media.dishes.bowl },
  ];

  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-imperial-ink">
        <div
          className={`absolute inset-0 transition-transform duration-[2400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            entered ? "scale-100" : "scale-[1.12]"
          }`}
        >
          <img src={media.banner} alt="Soulac Impérial — façade au crépuscule" className="img-cover kenburns" />
          <div className="absolute inset-0 bg-imperial-gradient" />
        </div>

        {/* soft veil that fades away on entry */}
        <div
          className={`absolute inset-0 z-[6] bg-imperial-ink transition-opacity duration-[1400ms] ease-out ${
            entered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* vertical side texts */}
        <span
          className={`vertical-text absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block eyebrow text-imperial-cream/50 transition-opacity duration-1000 ${
            entered ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          {siteConfig.address.city}
        </span>
        <span
          className={`vertical-text absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block eyebrow text-imperial-cream/50 transition-opacity duration-1000 ${
            entered ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          {t("home.heroSubtitle")}
        </span>

        <div className={`relative z-10 text-center px-6 ${entered ? "title-reveal" : ""}`}>
          <p
            className={`eyebrow text-imperial-gold mb-6 transition-all duration-1000 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "250ms" }}
          >
            {t("home.heroSubtitle")}
          </p>
          <h1 className="font-display text-[3.4rem] leading-[0.98] sm:text-display-lg md:text-display-xl lg:text-[7.5rem] neon-gold animate-neon-flicker font-medium">
            {heroWords.map((w, i) => (
              <span key={i} className="title-word">
                <span style={{ transitionDelay: `${300 + i * 140}ms` }}>{w}</span>
                {i < heroWords.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <div
            className={`hairline neon-rule mx-auto mt-8 transition-all duration-[1100ms] ease-out ${
              entered ? "w-44 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "700ms" }}
          />
          <p
            className={`font-display italic text-2xl md:text-4xl text-imperial-gold-light mt-7 transition-all duration-1000 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "850ms" }}
          >
            {t("home.heroTagline")}
          </p>
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 transition-all duration-1000 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "1050ms" }}
          >
            <Magnetic>
              <Link
                to="/reservation"
                className="btn-lux shadow-neon animate-neon-pulse bg-imperial-gold text-imperial-ink hover:text-imperial-ink eyebrow px-10 py-4 inline-block"
              >
                {t("home.heroCta1")}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/carte"
                className="btn-lux border border-imperial-cream/50 text-imperial-cream hover:text-imperial-ink eyebrow px-10 py-4 inline-block"
              >
                {t("common.nav.clickcollect")}
              </Link>
            </Magnetic>
          </div>
        </div>

        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-imperial-gold/70 animate-drift z-10 transition-opacity duration-1000 ${
            entered ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1300ms" }}
        >
          <ArrowDown size={22} strokeWidth={1.5} />
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <div className="bg-imperial-ink text-imperial-gold py-5 border-y border-imperial-gold/15">
        <Marquee items={marqueeItems} />
      </div>

      {/* ===== Specialties (Nos univers) ===== */}
      <section className="py-14 md:py-24 bg-imperial-ink-light">
        <div className="section-padding">
          <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="eyebrow text-imperial-gold mb-5">{t("home.specialtiesTitle")}</p>
            <h2 className="text-display-md md:text-display-lg font-display text-imperial-cream mb-6">
              {t("home.specialtiesSubtitle")}
            </h2>
            <div className="hairline w-24 mx-auto" />
          </Reveal>
        </div>
        <div className="group overflow-hidden">
          <div
            className="flex gap-4 md:gap-6 w-max px-3 group-hover:[animation-play-state:paused]"
            style={{ animation: "wave-x 55s linear infinite" }}
          >
            {[...specialties, ...specialties].map((s, i) => (
              <article key={i} className="group/card shrink-0 w-[78vw] sm:w-[42vw] lg:w-[25vw]">
                <div className="relative aspect-[4/5] overflow-hidden bg-imperial-ink">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="img-cover transition-transform duration-[1200ms] ease-out group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-imperial-ink/70 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-display italic text-imperial-gold text-xl">
                    {`0${(i % specialties.length) + 1}`}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-2xl text-imperial-cream mb-1">{s.title}</h3>
                    <p className="font-body font-light text-sm text-imperial-cream/75 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <Stats items={stats} />

      {/* ===== Menu / Pricing preview ===== */}
      <section className="py-14 md:py-24 bg-imperial-ink overflow-hidden">
        <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ImageReveal
            src={media.dishes.table}
            className="aspect-[4/5] order-2 lg:order-1"
            panel="gold"
          >
            <div className="absolute inset-3 z-10 border border-imperial-cream/40 pointer-events-none" />
          </ImageReveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow text-imperial-gold mb-5">{t("home.menuPreviewEyebrow")}</p>
              <h2 className="text-display-md md:text-display-lg font-display text-imperial-cream mb-4">
                {t("home.menuPreviewTitle")}
              </h2>
              <p className="font-body font-light text-imperial-cream/70 leading-relaxed mb-10 max-w-md">
                {t("home.menuPreviewSubtitle")}
              </p>
            </Reveal>

            <ul className="space-y-6">
              {signatures.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 80}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl md:text-2xl text-imperial-cream whitespace-nowrap">
                      {t(`menu.items.${item.id}.name`)}
                    </h3>
                    <span className="flex-1 border-b border-dotted border-imperial-gold/50 translate-y-[-3px]" />
                    <span className="font-display text-xl md:text-2xl text-imperial-gold whitespace-nowrap">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="font-body font-light text-sm text-imperial-cream/70/90 leading-relaxed mt-1 max-w-md">
                    {t(`menu.items.${item.id}.desc`)}
                  </p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <Link
                to="/carte"
                className="lux-underline inline-flex items-center gap-2 mt-10 eyebrow text-imperial-cream"
              >
                {t("home.menuPreviewCta")} <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Ambiance band (full-bleed video) ===== */}
      <section className="relative h-[60vh] min-h-[380px] overflow-hidden bg-imperial-ink">
        <video
          className="absolute inset-0 img-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.interior}
        >
          <source src={media.video} type="video/mp4" />
          <source src={media.videoAlt} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-imperial-ink/45" />
        <div className="absolute inset-0 flex items-end">
          <div className="section-padding pb-12 md:pb-16 w-full">
            <Reveal>
              <p className="eyebrow text-imperial-gold mb-3">{siteConfig.shortName}</p>
              <p className="font-display italic text-2xl md:text-4xl lg:text-5xl text-imperial-cream max-w-2xl leading-snug">
                {t("home.heroTagline")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ===== Gallery (3D coverflow) ===== */}
      <section className="py-14 md:py-24 bg-imperial-ink text-imperial-cream overflow-hidden">
        <div className="section-padding">
          <Reveal className="text-center max-w-2xl mx-auto mb-6">
            <p className="eyebrow text-imperial-gold mb-5">{t("home.galleryEyebrow")}</p>
            <h2 className="text-display-md md:text-display-lg font-display text-imperial-cream mb-6">
              {t("home.galleryTitle")}
            </h2>
            <p className="font-body font-light text-imperial-cream/70 leading-relaxed">{t("home.gallerySubtitle")}</p>
          </Reveal>
        </div>
        <Carousel3D images={[...media.gallery]} />
      </section>

      {/* ===== Testimonials ===== */}
      <section className="relative py-14 md:py-24 bg-imperial-ink text-imperial-cream overflow-hidden">
        <div className="absolute inset-0 opacity-[0.13]">
          <img src={media.dishes.sashimi} alt="" className="img-cover" />
          <div className="absolute inset-0 bg-imperial-ink/60" />
        </div>
        <div className="section-padding relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <p className="eyebrow text-imperial-gold mb-5">{t("home.testimonialsEyebrow")}</p>
            <h2 className="text-display-md md:text-display-lg font-display text-imperial-cream">
              {t("home.testimonialsTitle")}
            </h2>
          </Reveal>
        </div>
        <div className="group relative overflow-hidden">
          <div
            className="flex gap-5 md:gap-6 w-max px-3 group-hover:[animation-play-state:paused]"
            style={{ animation: "wave-x 40s linear infinite" }}
          >
            {[...testimonials, ...testimonials].map((item, i) => (
              <article
                key={i}
                className="shrink-0 w-[82vw] sm:w-[48vw] lg:w-[31vw] border border-imperial-gold/20 bg-imperial-ink-light/40 p-8 flex flex-col"
              >
                <span className="font-display text-6xl text-imperial-gold/40 leading-none">&ldquo;</span>
                <p className="font-display italic text-xl lg:text-2xl text-imperial-cream/90 leading-relaxed -mt-4 mb-6 flex-1">
                  {item.quote}
                </p>
                <div className="hairline w-10 mb-4" />
                <p className="eyebrow text-imperial-gold">{item.author}</p>
                <p className="font-body font-light text-sm text-imperial-cream/50 mt-1">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Reservation CTA ===== */}
      <section className="relative py-14 md:py-24 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img src={media.reservation} alt="" className="img-cover kenburns" />
          <div className="absolute inset-0 overlay-ink" />
        </div>
        <div className="section-padding relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <p className="eyebrow text-imperial-gold mb-5">{siteConfig.name}</p>
            <h2 className="text-display-lg md:text-display-xl font-display text-imperial-cream mb-6">
              {t("home.ctaTitle")}
            </h2>
            <p className="text-lg text-imperial-cream/80 leading-relaxed mb-10 font-body font-light">
              {t("home.ctaText")}
            </p>
            <Link
              to="/reservation"
              className="btn-lux bg-imperial-gold text-imperial-ink hover:text-imperial-ink eyebrow px-12 py-4 inline-block"
            >
              {t("home.ctaButton")}
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default Home;
