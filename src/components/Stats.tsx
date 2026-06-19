import { useEffect, useRef, useState } from "react";

interface Stat {
  number: number;
  suffix: string;
  label: string;
}

const CountUp = ({ target, suffix, start }: { target: number; suffix: string; start: boolean }) => {
  const numRef = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!start || done.current) return;
    const el = numRef.current;
    if (!el) return;
    done.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = String(target);
      return;
    }

    const duration = 2200;
    const startTime = performance.now();
    // smooth ease-in-out so the count glides in and settles gently
    const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration);
      el.textContent = String(Math.round(target * ease(p)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return (
    <span>
      <span ref={numRef}>0</span>
      <span className="text-imperial-gold">{suffix}</span>
    </span>
  );
};

const Stats = ({ items }: { items: Stat[] }) => {
  const ref = useRef<HTMLElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setStart(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStart(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-imperial-ink text-imperial-cream py-16 md:py-20 border-y border-imperial-gold/15"
    >
      <div className="section-padding grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {items.map((s, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ease-out ${start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <p className="font-display text-5xl md:text-6xl neon-gold mb-2">
              <CountUp target={s.number} suffix={s.suffix} start={start} />
            </p>
            <div className="hairline w-8 mx-auto mb-3" />
            <p className="eyebrow text-imperial-cream/55">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
