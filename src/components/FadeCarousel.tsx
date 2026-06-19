import { useEffect, useState } from "react";

interface FadeCarouselProps {
  images: string[];
  intervalMs?: number;
  className?: string;
}

/** Auto cross-fading image carousel with subtle ken-burns and dot controls. */
const FadeCarousel = ({ images, intervalMs = 4000, className = "" }: FadeCarouselProps) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className={`relative overflow-hidden bg-imperial-ink ${className}`}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 img-cover transition-opacity duration-[1400ms] ease-out ${
            i === active ? "opacity-100 kenburns" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-3 border border-imperial-gold/40 pointer-events-none z-10" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Image ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-7 bg-imperial-gold" : "w-1.5 bg-imperial-cream/60 hover:bg-imperial-cream"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FadeCarousel;
