import { useEffect, useState } from "react";
import Photo from "./Photo";
import { HERO_SLIDES } from "../config/media";

interface HeroSlideshowProps {
  /** Durée d'affichage de chaque vue, en millisecondes. */
  intervalMs?: number;
}

/**
 * Diaporama plein cadre derrière le titre d'accueil : deux cadrages qui se
 * fondent l'un dans l'autre sous un très lent zoom. Purement décoratif — le
 * `<h1>` porte le sens.
 */
const HeroSlideshow = ({ intervalMs = 6000 }: HeroSlideshowProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-luxury-black" aria-hidden="true">
      {HERO_SLIDES.map((key, i) => (
        <Photo
          key={key}
          name={key}
          sizes="100vw"
          priority={i === 0}
          className={`animate-hero-zoom absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default HeroSlideshow;
