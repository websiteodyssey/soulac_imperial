import { useEffect, useRef, useState, type ReactNode } from "react";

interface ImageRevealProps {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  /** kept for API compatibility (no longer affects the reveal) */
  panel?: "gold" | "ink" | "cream";
  /** ms delay before the reveal */
  delay?: number;
  /** overlays rendered above the image (e.g. a price badge) */
  children?: ReactNode;
}

/**
 * Reveals an image with a smooth fade + gentle de-zoom and soft de-blur once it
 * scrolls into view. Triggers a single time; falls back to visible if missed.
 */
const ImageReveal = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  delay = 0,
  children,
}: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    // Safety net: never leave an image hidden even if the observer misses.
    const fallback = window.setTimeout(() => setShown(true), 1800);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.clearTimeout(fallback);
            window.setTimeout(() => setShown(true), delay);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(node);
    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-imperial-ink ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`img-cover transition-[opacity,transform,filter] duration-[1700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.07] blur-[3px]"
        } ${imgClassName}`}
      />
      {children}
    </div>
  );
};

export default ImageReveal;
