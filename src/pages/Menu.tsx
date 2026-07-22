import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Leaf, Flame, Star, AlertCircle, Clock, ChevronDown } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Ornament from "../components/Ornament";
import ParallaxBg from "../components/ParallaxBg";
import ReserveButton from "../components/ReserveButton";
import Photo from "../components/Photo";
import { CARTE_PHOTOS } from "../config/media";
import { siteConfig } from "../config/siteConfig";
import { MENU, type Tag, type MenuItem } from "../data/menu";

const TAG_ICON: Record<Tag, typeof Leaf> = {
  signature: Star,
  veggie: Leaf,
  spicy: Flame,
};

const Menu = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "fr";
  const [active, setActive] = useState(MENU[0].id);
  /** Catégorie vers laquelle défiler une fois le rendu terminé. */
  const scrollDemande = useRef<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // En dessous de 1024 px, la carte se lit en accordéon (une catégorie à la fois).
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const prix = (p: number) =>
    new Intl.NumberFormat(lang === "en" ? "en-GB" : "fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(p);

  // Surligne la catégorie en cours de lecture dans la barre collante (grand écran).
  useEffect(() => {
    if (mobile) return;
    const sections = MENU.map((c) => document.getElementById(`cat-${c.id}`)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace("cat-", ""));
      },
      { rootMargin: "-180px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [mobile]);

  /**
   * Ouvre une catégorie et l'amène sous l'en-tête.
   *
   * Le défilement ne peut pas avoir lieu dans le gestionnaire de clic : déplier
   * la catégorie déplace tout ce qui la suit, donc la position ne devient juste
   * qu'une fois le rendu terminé. On mémorise la demande, et l'effet ci-dessous
   * la traite après la mise à jour de la page.
   */
  const amener = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    const offset = window.innerWidth >= 768 ? 150 : 128;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const goTo = (id: string) => {
    // Déjà ouverte : rien ne bouge dans la page, on peut défiler tout de suite.
    if (id === active) {
      amener(id);
      return;
    }
    scrollDemande.current = id;
    setActive(id);
  };

  useEffect(() => {
    const id = scrollDemande.current;
    if (!id) return;
    scrollDemande.current = null;
    amener(id);
  }, [active]);

  // Fait suivre la puce active dans la barre horizontale (mobile).
  useEffect(() => {
    const chip = navRef.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    chip?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  const Ligne = ({ item }: { item: MenuItem }) => (
    <li className="group border-b border-luxury-gold/10 py-3 last:border-0 md:py-4">
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-base text-luxury-cream transition-colors group-hover:text-luxury-gold-bright md:text-lg">
          {item.name[lang] ?? item.name.fr}
        </h3>
        <span
          aria-hidden="true"
          className="hidden flex-1 translate-y-[-4px] border-b border-dotted border-luxury-gold/25 sm:block"
        />
        <span className="num-elegant ml-auto shrink-0 font-display text-base text-luxury-gold-bright sm:ml-0 md:text-lg">
          {prix(item.price)}
        </span>
      </div>
      <p className="mt-1 font-body text-[0.82rem] leading-snug text-luxury-champagne/60 md:mt-1.5 md:text-sm md:leading-relaxed">
        {item.desc[lang] ?? item.desc.fr}
      </p>
      {item.tags && item.tags.length > 0 && (
        <ul className="mt-1.5 flex flex-wrap gap-1.5 md:mt-2 md:gap-2">
          {item.tags.map((tag) => {
            const Icon = TAG_ICON[tag];
            return (
              <li
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-luxury-gold/30 px-2.5 py-0.5 font-accent text-[0.55rem] uppercase tracking-luxury text-luxury-gold/90"
              >
                <Icon size={11} strokeWidth={1.8} />
                {t(`menu.tags.${tag}`)}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );

  return (
    <div className="bg-luxury-black">
      <PageHero
        title={t("menu.heroTitle")}
        subtitle={t("menu.heroSubtitle")}
        image="canards"
        lead={t("menu.introText")}
      />

      {/* Barre de catégories — collante, centrée quand elle tient, glissante sinon */}
      <div className="sticky top-16 z-30 border-y border-luxury-gold/15 bg-luxury-black/92 backdrop-blur md:top-20">
        <div
          ref={navRef}
          role="navigation"
          aria-label={t("menu.navLabel")}
          className="overflow-x-auto px-4 py-3 [scrollbar-width:none] md:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {/* `w-max` + `mx-auto` : centré tant que la barre tient à l'écran,
              défilable dès qu'elle déborde — sans jamais rogner la première puce. */}
          <div className="mx-auto flex w-max gap-2">
            {MENU.map((cat) => (
              // Un bouton, pas une ancre : le routeur travaille en mode hash,
              // un href="#…" changerait l'URL de navigation.
              <button
                key={cat.id}
                type="button"
                data-chip={cat.id}
                onClick={() => goTo(cat.id)}
                className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 font-accent text-[0.7rem] uppercase tracking-luxury transition-colors ${
                  active === cat.id
                    ? "border-luxury-gold bg-luxury-gold text-luxury-black"
                    : "border-luxury-gold/30 text-luxury-champagne/80 hover:border-luxury-gold hover:text-luxury-gold"
                }`}
              >
                {cat.title[lang] ?? cat.title.fr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* La carte */}
      <section className="emerald-wash relative overflow-hidden bg-luxury-ink py-10 grain md:py-20">
        <ParallaxBg name="vapeurBambou" className="opacity-[0.07]" />

        <div className="section-padding relative z-10">
          <div className="mx-auto max-w-5xl space-y-10 md:space-y-16">
            {MENU.map((cat) => {
              const titre = cat.title[lang] ?? cat.title.fr;
              const moitie = Math.ceil(cat.items.length / 2);
              // Sur mobile, une seule catégorie est dépliée à la fois : la carte
              // tient alors en quelques écrans au lieu d'un rouleau de 48 plats.
              const ouverte = !mobile || active === cat.id;
              return (
                // `scroll-mt` compense l'en-tête + la barre collante.
                <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-40 md:scroll-mt-44">
                  {/* Bandeau photo : chaque catégorie s'ouvre sur son plat.
                      Pas de `Reveal` non plus — c'est la charpente de la page. */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        if (!mobile) return;
                        if (ouverte) setActive("");
                        else goTo(cat.id);
                      }}
                      aria-expanded={mobile ? ouverte : undefined}
                      aria-controls={`liste-${cat.id}`}
                      className="relative block h-28 w-full overflow-hidden rounded-xl border border-luxury-gold/20 md:h-44 md:cursor-default"
                    >
                      <Photo
                        name={CARTE_PHOTOS[cat.id]}
                        alt={t("menu.categoryAlt", { name: titre })}
                        sizes="(min-width: 1024px) 64rem, 100vw"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-luxury-black/60" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                        <h2 className="pb-1 font-display text-2xl text-gold-foil md:text-4xl">
                          {titre}
                        </h2>
                        <p className="mt-1 hidden font-body text-sm italic text-luxury-champagne/80 sm:block md:text-base">
                          {cat.note[lang] ?? cat.note.fr}
                        </p>
                      </div>
                      {mobile && (
                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-luxury-gold transition-transform duration-300 ${
                            ouverte ? "rotate-180" : ""
                          }`}
                        />
                      )}
                      <span className="frame-inset" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Deux colonnes sur grand écran : la carte se lit d'un coup d'œil.
                      Volontairement PAS de `Reveal` ici : une liste qu'on vient
                      de déplier doit être visible immédiatement, sans attendre
                      qu'un observateur d'intersection la révèle. */}
                  {ouverte && (
                    <div id={`liste-${cat.id}`} className="mt-4 grid gap-x-12 md:mt-6 lg:grid-cols-2">
                      <ul>
                        {cat.items.slice(0, moitie).map((item) => (
                          <Ligne key={item.id} item={item} />
                        ))}
                      </ul>
                      <ul>
                        {cat.items.slice(moitie).map((item) => (
                          <Ligne key={item.id} item={item} />
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Informations pratiques */}
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:mt-14 md:grid-cols-2">
            <Reveal className="luxury-card-dark flex items-start gap-4 p-6">
              <AlertCircle className="mt-1 shrink-0 text-luxury-gold" size={22} strokeWidth={1.5} />
              <div>
                <h3 className="mb-2 font-accent text-xs uppercase tracking-luxury text-luxury-gold">
                  {t("menu.allergensTitle")}
                </h3>
                <p className="font-body leading-relaxed text-luxury-champagne/70">
                  {t("menu.allergensText")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100} className="luxury-card-dark flex items-start gap-4 p-6">
              <Clock className="mt-1 shrink-0 text-luxury-gold" size={22} strokeWidth={1.5} />
              <div>
                <h3 className="mb-2 font-accent text-xs uppercase tracking-luxury text-luxury-gold">
                  {t("menu.serviceTitle")}
                </h3>
                <p className="font-body leading-relaxed text-luxury-champagne/70">
                  {t("menu.serviceText")}
                </p>
                <p className="mt-3 font-body text-luxury-champagne/85">
                  {t("common.lunch")} : {siteConfig.hours.lunch} · {t("common.dinner")} :{" "}
                  {siteConfig.hours.dinner}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Appel à réserver */}
      <section className="relative overflow-hidden bg-luxury-black py-12 text-center grain md:py-20">
        <ParallaxBg name="flamme" className="opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/75 to-luxury-black/85" />
        <Reveal className="section-padding relative z-10">
          <Ornament className="mb-7" />
          <ReserveButton
            label={t("menu.reserveCta")}
            className="btn-shine inline-block rounded-full bg-luxury-gold px-12 py-4 font-accent text-sm uppercase tracking-luxury text-luxury-black transition-colors hover:bg-luxury-gold-bright"
          />
        </Reveal>
      </section>
    </div>
  );
};

export default Menu;
