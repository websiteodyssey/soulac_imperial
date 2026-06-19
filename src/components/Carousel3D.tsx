import { useEffect, useRef } from "react";

interface Carousel3DProps {
  images: string[];
}

// Coverflow position table by (absolute) distance from the focused item.
// Centre is largest and in front; neighbours shrink, recede and rotate away.
const STEPS = [
  { w: 320, h: 440, x: 0, z: 60, rot: 0, b: 1 },
  { w: 240, h: 330, x: 300, z: -40, rot: 38, b: 0.62 },
  { w: 185, h: 255, x: 540, z: -110, rot: 55, b: 0.42 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const sample = (mag: number) => {
  const m = Math.min(mag, STEPS.length - 1);
  const lo = Math.floor(m);
  const hi = Math.min(STEPS.length - 1, lo + 1);
  const f = m - lo;
  const A = STEPS[lo];
  const B = STEPS[hi];
  return {
    w: lerp(A.w, B.w, f),
    h: lerp(A.h, B.h, f),
    x: lerp(A.x, B.x, f),
    z: lerp(A.z, B.z, f),
    rot: lerp(A.rot, B.rot, f),
    b: lerp(A.b, B.b, f),
  };
};

/**
 * Scroll-driven 3D coverflow: as the section travels through the viewport the
 * focus glides across the images (continuous, DOM-written for smoothness).
 * Reduced-motion safe (stays on the first image, flat).
 */
const Carousel3D = ({ images }: Carousel3DProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const n = images.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let k = 1;
    const setK = () => {
      const w = window.innerWidth;
      k = w < 560 ? 0.5 : w < 1024 ? 0.74 : 1;
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / total));
      const pos = reduce ? 0 : progress * (n - 1);

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = i - pos;
        const mag = Math.abs(o);
        const s = sample(mag);
        const sign = o < 0 ? -1 : 1;
        const opacity = Math.max(0, Math.min(1, 1 - Math.max(0, mag - 2) * 1.4));
        el.style.width = `${(s.w * k).toFixed(1)}px`;
        el.style.height = `${(s.h * k).toFixed(1)}px`;
        el.style.transform = `translate(-50%,-50%) translate3d(${(sign * s.x * k).toFixed(1)}px,0,${s.z.toFixed(
          1
        )}px) rotateY(${(-sign * s.rot).toFixed(2)}deg)`;
        el.style.filter = `brightness(${s.b.toFixed(2)})`;
        el.style.zIndex = String(Math.round(100 - mag * 10));
        el.style.opacity = opacity.toFixed(2);
        el.style.pointerEvents = opacity < 0.5 ? "none" : "auto";
      });
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      setK();
      onScroll();
    };

    setK();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <div ref={sectionRef} className="relative h-[360px] sm:h-[460px] lg:h-[540px] [perspective:1300px] select-none">
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 overflow-hidden bg-imperial-ink shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)] ring-1 ring-imperial-gold/15 will-change-transform"
          >
            <img src={src} alt="" loading="lazy" className="img-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel3D;
