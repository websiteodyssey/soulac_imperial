import { useEffect, useRef } from "react";

interface Gallery3DProps {
  images: string[];
}

/**
 * Auto-advancing 3D "coverflow" gallery: the track scrolls continuously while the
 * centred image faces the viewer and neighbours rotate away in perspective. Pauses
 * on hover; still draggable by hand. Reduced-motion safe (stays flat & still).
 */
const Gallery3D = ({ images }: Gallery3DProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sequence = [...images, ...images];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let paused = reduce;

    const apply3d = () => {
      const rect = track.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      Array.from(track.children).forEach((child) => {
        const c = child as HTMLElement;
        const r = c.getBoundingClientRect();
        const cc = r.left + r.width / 2;
        const dist = (cc - center) / rect.width;
        const clamped = Math.max(-1, Math.min(1, dist * 2.2));
        const rotY = clamped * -26;
        const scale = 1 - Math.min(0.22, Math.abs(dist) * 0.5);
        c.style.transform = `rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        c.style.zIndex = String(100 - Math.round(Math.abs(dist) * 100));
        c.style.opacity = String(1 - Math.min(0.55, Math.abs(dist) * 0.8));
      });
    };

    const loop = () => {
      if (!paused) {
        track.scrollLeft += 0.55;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft -= track.scrollWidth / 2;
        }
      }
      apply3d();
      raf = requestAnimationFrame(loop);
    };

    const pause = () => (paused = true);
    const resume = () => {
      if (!reduce) paused = false;
    };

    apply3d();
    raf = requestAnimationFrame(loop);
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, [images.length]);

  return (
    <div
      ref={trackRef}
      className="flex gap-5 md:gap-8 overflow-x-auto py-8 px-[38vw] sm:px-[34vw] lg:px-[37vw] [perspective:1500px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {sequence.map((src, i) => (
        <div
          key={i}
          className="shrink-0 w-[64vw] sm:w-[40vw] lg:w-[26vw] aspect-[3/4] overflow-hidden bg-imperial-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] [transform-style:preserve-3d] [backface-visibility:hidden]"
        >
          <img src={src} alt="" loading="lazy" className="img-cover" />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-imperial-gold/20" />
        </div>
      ))}
    </div>
  );
};

export default Gallery3D;
