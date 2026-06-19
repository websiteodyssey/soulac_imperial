import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import Reveal from "./Reveal";

interface Review {
  stars: number;
  text: string;
  author: string;
  location: string;
}

const Stars = ({ count }: { count: number }) => (
  <div className="flex items-center gap-1 mb-5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={15}
        className={i < count ? "text-imperial-gold" : "text-imperial-gold/25"}
        fill={i < count ? "currentColor" : "none"}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const ReviewsCarousel = () => {
  const { t } = useTranslation();
  const items = t("reviews.items", { returnObjects: true }) as unknown as Review[];
  const sequence = [...items, ...items];

  return (
    <section className="py-20 md:py-28 bg-imperial-ink text-imperial-cream overflow-hidden">
      <div className="section-padding">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-imperial-gold/50" />
            <span className="eyebrow text-imperial-gold">{t("reviews.eyebrow")}</span>
            <span className="h-px w-10 bg-imperial-gold/50" />
          </div>
          <h2 className="text-display-md md:text-display-lg font-display text-imperial-cream">
            {t("reviews.title")}
          </h2>
        </Reveal>
      </div>

      <div className="group overflow-hidden mt-14">
        <div
          className="flex w-max gap-5 md:gap-6 group-hover:[animation-play-state:paused]"
          style={{ animation: "wave-x 64s linear infinite" }}
        >
          {sequence.map((r, i) => (
            <article
              key={i}
              className="w-[290px] md:w-[360px] shrink-0 border border-imperial-gold/20 bg-imperial-ink-light/50 p-7 flex flex-col"
            >
              <Stars count={r.stars} />
              <p className="font-display italic text-lg md:text-xl text-imperial-cream/90 leading-relaxed flex-1">
                {r.text}
              </p>
              <div className="mt-6 pt-5 border-t border-imperial-gold/15">
                <p className="eyebrow text-imperial-gold">{r.author}</p>
                <p className="font-body font-light text-sm text-imperial-cream/50 mt-1">{r.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
