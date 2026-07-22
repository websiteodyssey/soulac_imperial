import { useEffect, useRef } from "react";
import { photo, type MediaKey } from "../config/media";

interface ParallaxBgProps {
  name: MediaKey;
  /** Classes supplémentaires, typiquement l'opacité. */
  className?: string;
  /** Amplitude du glissement, en pixels. */
  strength?: number;
}

/**
 * Fond plein cadre qui glisse doucement à contre-sens du défilement. Il déborde
 * volontairement de son parent (qui doit être `relative overflow-hidden`) pour
 * que le mouvement ne découvre jamais de bord.
 *
 * Ces fonds sont toujours très atténués : on sert donc la **vignette 640 px**,
 * invisible à l'œil sous 10 à 40 % d'opacité, mais bien plus légère.
 */
const ParallaxBg = ({ name, className = "", strength = 40 }: ParallaxBgProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const src = photo(name).sm;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.transform = `translate3d(0, ${(-progress * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute -inset-y-[14%] inset-x-0 bg-cover bg-center bg-no-repeat will-change-transform ${className}`}
      style={{ backgroundImage: `url('${src}')` }}
    />
  );
};

export default ParallaxBg;
