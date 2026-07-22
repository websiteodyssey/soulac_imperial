import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-none");

    let x = -100;
    let y = -100;
    let hovering = false;
    let raf = 0;

    // Only touch the DOM inside a single rAF, never on every mouse event.
    const render = () => {
      raf = 0;
      const size = hovering ? 48 : 32;
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      ring.style.opacity = hovering ? "0.7" : "0.4";
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const handleMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      schedule();
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const next = !!target.closest("a, button, input, textarea, select");
      if (next !== hovering) {
        hovering = next;
        ring.classList.toggle("cursor-ring--hover", hovering);
        schedule();
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[200] h-1.5 w-1.5 rounded-full bg-luxury-gold"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[200] h-8 w-8 rounded-full border border-luxury-gold opacity-40 transition-[width,height,opacity] duration-300 ease-out"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
};

export default CustomCursor;
