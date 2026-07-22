import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SectionFX from "../components/SectionFX";
import Photo from "../components/Photo";
import { photo, GALERIE_SALLE, GALERIE_TABLE, type MediaKey } from "../config/media";

type Kind = "room" | "plate";

/**
 * Salle et table alternées — jamais deux photos de même nature à la suite, pour
 * que la mosaïque respire. Chaque photo n'apparaît qu'une fois.
 */
const interleave = (): { key: MediaKey; kind: Kind }[] => {
  const out: { key: MediaKey; kind: Kind }[] = [];
  const max = Math.max(GALERIE_SALLE.length, GALERIE_TABLE.length);
  for (let i = 0; i < max; i++) {
    if (GALERIE_SALLE[i]) out.push({ key: GALERIE_SALLE[i], kind: "room" });
    if (GALERIE_TABLE[i]) out.push({ key: GALERIE_TABLE[i], kind: "plate" });
  }
  return out;
};

const PHOTOS = interleave();

const Gallery = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<number | null>(null);

  const count = PHOTOS.length;
  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) => setActive((a) => (a === null ? a : (a + dir + count) % count)),
    [count]
  );

  const alt = (kind: Kind) => (kind === "room" ? t("gallery.roomAlt") : t("gallery.plateAlt"));
  const label = (kind: Kind) =>
    kind === "room" ? t("gallery.labelRoom") : t("gallery.labelPlate");

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, step]);

  return (
    <div className="bg-luxury-black">
      <PageHero
        title={t("gallery.heroTitle")}
        subtitle={t("gallery.heroSubtitle")}
        image="bar"
        lead={t("gallery.subtitle")}
      />

      <section className="emerald-wash relative overflow-hidden py-16 md:py-24 lg:py-32 bg-luxury-ink grain">
        <SectionFX />

        <div className="section-padding relative z-10">
          <Reveal className="max-w-2xl mx-auto mb-12 md:mb-16">
            <SectionHeading
              tone="dark"
              eyebrow={t("gallery.heroSubtitle")}
              title={t("gallery.title")}
              subtitle={t("gallery.subtitle")}
            />
          </Reveal>

          {/* Mosaïque en colonnes : chaque photo garde ses proportions réelles,
              aucun recadrage, aucun saut de mise en page au chargement. */}
          <div className="mx-auto max-w-6xl columns-2 gap-3 sm:columns-3 sm:gap-4 xl:columns-4">
            {PHOTOS.map((item, i) => {
              return (
                <Reveal
                  key={item.key}
                  delay={(i % 3) * 90}
                  className="mb-3 break-inside-avoid sm:mb-4"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={alt(item.kind)}
                    className="group gold-glow relative block w-full overflow-hidden rounded-lg border border-luxury-gold/12 hover:border-luxury-gold/40 transition-colors duration-500 cursor-pointer"
                  >
                    <Photo
                      name={item.key}
                      alt={alt(item.kind)}
                      sizes="(min-width: 1280px) 22vw, (min-width: 640px) 30vw, 46vw"
                      className="block h-auto w-full object-cover transition-[transform,filter] duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:brightness-[1.04]"
                    />

                    {/* Balayage doré diagonal au survol */}
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-[130%] group-hover:translate-x-[130%] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 34%, rgba(242,220,162,0.28) 50%, rgba(255,246,223,0.14) 54%, transparent 68%)",
                      }}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black/75 via-luxury-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <span className="pointer-events-none absolute inset-[0.6rem] rounded border border-luxury-gold/0 group-hover:border-luxury-gold/40 transition-colors duration-700" />

                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-luxury-gold-bright/70 bg-luxury-black/35 backdrop-blur-sm text-luxury-gold-bright opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                        <Plus size={18} strokeWidth={1.5} />
                      </span>
                    </span>

                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 p-3.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="h-px w-5 bg-luxury-gold" />
                      <span className="font-accent uppercase text-[0.6rem] tracking-luxury text-luxury-gold-bright">
                        {label(item.kind)}
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ VISIONNEUSE ═══════════ */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-luxury-black/92 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={alt(PHOTOS[active].kind)}
        >
          <span className="frame-inset" aria-hidden="true" />

          <button
            type="button"
            onClick={close}
            aria-label={t("gallery.close")}
            className="absolute top-5 right-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-luxury-gold/40 text-luxury-champagne hover:text-luxury-gold-bright hover:border-luxury-gold hover:rotate-90 transition-all duration-500"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={t("gallery.prev")}
            className="absolute left-3 md:left-6 z-10 grid h-12 w-12 place-items-center rounded-full border border-luxury-gold/30 text-luxury-champagne hover:text-luxury-gold-bright hover:border-luxury-gold transition-all duration-[400ms]"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>

          <figure
            key={active}
            onClick={(e) => e.stopPropagation()}
            className="animate-fade-up relative flex max-h-[86vh] max-w-[92vw] flex-col items-center"
          >
            <img
              src={photo(PHOTOS[active].key).src}
              alt={alt(PHOTOS[active].kind)}
              className="max-h-[74vh] max-w-[86vw] rounded-md border border-luxury-gold/25 object-contain shadow-[0_40px_130px_-24px_rgba(0,0,0,0.9)]"
            />
            <figcaption className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-6 bg-luxury-gold/60" aria-hidden="true" />
              <span className="font-accent uppercase text-[0.65rem] tracking-luxury text-luxury-gold-bright">
                {label(PHOTOS[active].kind)}
              </span>
              <span className="font-accent text-xs text-luxury-champagne/50 num-elegant">
                {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <span className="h-px w-6 bg-luxury-gold/60" aria-hidden="true" />
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={t("gallery.next")}
            className="absolute right-3 md:right-6 z-10 grid h-12 w-12 place-items-center rounded-full border border-luxury-gold/30 text-luxury-champagne hover:text-luxury-gold-bright hover:border-luxury-gold transition-all duration-[400ms]"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
