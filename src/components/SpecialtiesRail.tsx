import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Photo from "./Photo";
import { SPECIALITES_LIST, type Specialite } from "../data/specialites";

/**
 * Une rangée qui défile toute seule, en boucle sans couture (la liste est
 * doublée, le raccord est donc invisible). `dir` inverse le sens pour que les
 * deux rangées glissent en opposition. Les flèches donnent un coup de pouce ;
 * le défilement reprend ensuite. Respecte `prefers-reduced-motion`.
 */
const Row = ({ items, dir }: { items: Specialite[]; dir: 1 | -1 }) => {
  const { t, i18n } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const half = useRef(0);

  const loop = [...items, ...items];
  const lang = i18n.language.startsWith("en") ? "en" : "fr";

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let visible = true;
    const speed = 0.45; // px / frame

    const remeasure = () => {
      half.current = track.scrollWidth / 2;
    };

    const wrap = (v: number) => {
      const h = half.current;
      if (h <= 0) return 0;
      if (v <= -h) v += h;
      if (v > 0) v -= h;
      return v;
    };

    const tick = () => {
      if (!reduce && visible) pos.current = wrap(pos.current - speed * dir);
      track.style.transform = `translate3d(${pos.current.toFixed(2)}px, 0, 0)`;
      if (running) raf = requestAnimationFrame(tick);
    };

    // Le bandeau ne consomme rien tant qu'il n'est pas à l'écran.
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(track);

    pos.current = dir > 0 ? 0 : -1;
    remeasure();
    pos.current = wrap(pos.current);
    window.addEventListener("resize", remeasure);
    raf = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [dir, items.length]);

  const nudge = (d: number) => {
    const track = trackRef.current;
    const card = track?.querySelector("article") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : 220;
    let v = pos.current - d * step;
    const h = half.current;
    if (h > 0) {
      if (v <= -h) v += h;
      if (v > 0) v -= h;
    }
    pos.current = v;
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          data-loop="specialites"
          className="flex w-max gap-3 px-4 py-1 will-change-transform md:gap-4 md:px-8"
        >
          {loop.map((s, i) => (
            <article
              key={`${s.photo}-${i}`}
              className="group relative aspect-[4/5] w-[38vw] shrink-0 overflow-hidden rounded-lg border border-luxury-gold/15 sm:w-[11rem] lg:w-[13.5rem]"
            >
              <Photo
                name={s.photo}
                alt={`${s.label[lang]} — ${t("home.specialtiesAlt")}`}
                sizes="(min-width: 1024px) 14rem, (min-width: 640px) 11rem, 38vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/20 to-transparent" />
              <span className="pointer-events-none absolute inset-3 border border-luxury-gold/0 transition-all duration-500 group-hover:border-luxury-gold/30" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <span className="mb-1.5 block h-px w-6 origin-left scale-x-50 bg-luxury-gold/70 transition-transform duration-500 group-hover:scale-x-100" />
                <h3 className="font-display text-sm leading-tight text-luxury-cream md:text-base">
                  {s.label[lang]}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label={t("common.previous")}
        onClick={() => nudge(-1)}
        className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-luxury-gold/50 bg-luxury-black/60 text-luxury-cream shadow-lg shadow-black/40 backdrop-blur-sm transition-colors hover:border-luxury-gold hover:bg-luxury-gold hover:text-luxury-black md:left-4 md:h-10 md:w-10"
      >
        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
      </button>
      <button
        type="button"
        aria-label={t("common.next")}
        onClick={() => nudge(1)}
        className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-luxury-gold/50 bg-luxury-black/60 text-luxury-cream shadow-lg shadow-black/40 backdrop-blur-sm transition-colors hover:border-luxury-gold hover:bg-luxury-gold hover:text-luxury-black md:right-4 md:h-10 md:w-10"
      >
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
};

/** Deux rangées compactes glissant en sens opposés. */
const SpecialtiesRail = () => {
  const mid = Math.ceil(SPECIALITES_LIST.length / 2);
  return (
    <div className="space-y-3 md:space-y-4">
      <Row items={SPECIALITES_LIST.slice(0, mid)} dir={1} />
      <Row items={SPECIALITES_LIST.slice(mid)} dir={-1} />
    </div>
  );
};

export default SpecialtiesRail;
