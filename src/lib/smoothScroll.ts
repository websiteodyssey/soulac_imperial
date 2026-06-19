import Lenis from "lenis";

let lenis: Lenis | null = null;

export const initSmoothScroll = (): (() => void) | undefined => {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (lenis) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
};

export const scrollToTopInstant = () => {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
};

export const scrollToTopSmooth = () => {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.1 });
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
