import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Sparkles, Leaf, Anchor, HeartHandshake } from "lucide-react";
import PageHero from "../components/PageHero";
import WaveDivider from "../components/WaveDivider";
import Reveal from "../components/Reveal";
import ReviewsCarousel from "../components/ReviewsCarousel";
import ImageReveal from "../components/ImageReveal";
import Tilt from "../components/Tilt";
import { media } from "../config/media";

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Sparkles, title: t("about.value1Title"), text: t("about.value1Text") },
    { icon: Leaf, title: t("about.value2Title"), text: t("about.value2Text") },
    { icon: Anchor, title: t("about.value3Title"), text: t("about.value3Text") },
    { icon: HeartHandshake, title: t("about.value4Title"), text: t("about.value4Text") },
  ];

  return (
    <div>
      <PageHero title={t("about.pageTitle")} subtitle={t("about.pageSubtitle")} image={media.story.b} />

      {/* Story — editorial with image */}
      <section className="py-12 md:py-20 bg-imperial-ink overflow-hidden">
        <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* WOW composition: spinning enso ring + kanji watermark + cursor-tilt photos */}
          <div className="relative [perspective:1500px]">
            {/* rotating enso ring (nods to the logo) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[118%] aspect-square rounded-full border-2 border-imperial-gold/12 border-t-imperial-gold/55 animate-enso hidden sm:block"
            />
            {/* spirit kanji watermark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none text-[13rem] lg:text-[17rem] text-imperial-gold/10 select-none"
              style={{ fontFamily: "'Noto Serif JP','Yu Mincho',serif" }}
            >
              心
            </span>
            {/* gold seal dot */}
            <span className="absolute right-2 top-0 h-2.5 w-2.5 rounded-full bg-imperial-gold animate-drift hidden sm:block" />

            <div className="relative grid grid-cols-2 gap-5 sm:gap-7 items-start">
              <Tilt max={10} className="mt-8 sm:mt-16">
                <ImageReveal
                  src={media.story.a}
                  panel="gold"
                  className="aspect-[3/4] ring-1 ring-imperial-gold/30 shadow-[0_35px_70px_-30px_rgba(12,12,14,0.6)]"
                />
              </Tilt>
              <Tilt max={10}>
                <ImageReveal
                  src={media.story.b}
                  panel="ink"
                  delay={160}
                  className="aspect-[3/4] ring-1 ring-imperial-gold/30 shadow-[0_35px_70px_-28px_rgba(12,12,14,0.6)]"
                />
              </Tilt>
            </div>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow text-imperial-gold mb-5">{t("about.pageSubtitle")}</p>
              <h2 className="text-display-md md:text-display-lg font-display text-imperial-cream mb-8 leading-tight">
                {t("about.introTitle")}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 text-lg text-imperial-cream/70 leading-relaxed font-body font-light">
                <p>{t("about.introText1")}</p>
                <p>{t("about.introText2")}</p>
                <p>{t("about.introText3")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy quote over photo */}
      <section className="relative py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={media.interior} alt="" className="img-cover kenburns" />
          <div className="absolute inset-0 overlay-ink" />
        </div>
        <div className="section-padding max-w-3xl mx-auto relative z-10">
          <Reveal>
            <p className="font-display text-6xl text-imperial-gold/40 leading-none mb-2">&ldquo;</p>
            <p className="text-display-md font-display italic text-imperial-cream leading-relaxed">
              {t("about.philosophyQuote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-imperial-ink-light">
        <div className="section-padding">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <p className="eyebrow text-imperial-gold mb-4">{t("about.valuesTitle")}</p>
            <h2 className="text-display-md font-display text-imperial-cream mb-4">{t("about.valuesSubtitle")}</h2>
            <div className="hairline w-24 mx-auto mt-5" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 90}>
                <div className="imperial-card group p-8 text-center flex flex-col items-center h-full">
                  <span className="mb-5 grid place-items-center h-14 w-14 rounded-full bg-imperial-gold/10 text-imperial-gold transition-transform duration-500 group-hover:scale-110">
                    <v.icon size={26} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-xl text-imperial-cream mb-2">{v.title}</h3>
                  <p className="font-body font-light text-imperial-cream/70 leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guest reviews */}
      <ReviewsCarousel />

      <WaveDivider color="#14323a" />

      {/* CTA */}
      <section className="relative py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={media.reservation} alt="" className="img-cover kenburns" />
          <div className="absolute inset-0 overlay-ink" />
        </div>
        <div className="section-padding max-w-2xl mx-auto relative z-10">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-display text-imperial-cream mb-6">
              {t("about.ctaTitle")}
            </h2>
            <p className="text-lg text-imperial-cream/80 leading-relaxed mb-8 font-body font-light">
              {t("about.ctaText")}
            </p>
            <Link
              to="/reservation"
              className="btn-lux inline-block bg-imperial-gold text-imperial-ink hover:text-imperial-ink eyebrow px-10 py-4"
            >
              {t("about.ctaButton")}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
