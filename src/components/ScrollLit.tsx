import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On mobile, lights up each pulsing card (.animate-card-pulse) as it crosses the
 * centre of the viewport while scrolling, instead of the timer-based pulse.
 * No-op on larger screens (where the timed pulse / hover takes over).
 */
const ScrollLit = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const els = document.querySelectorAll<HTMLElement>(".animate-card-pulse");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-lit", entry.isIntersecting);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default ScrollLit;
