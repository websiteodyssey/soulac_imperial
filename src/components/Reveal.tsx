import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal transition starts once in view. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  /** "fade" slides up; "img" wipes a curtain reveal (for images). */
  variant?: "fade" | "img";
}

/**
 * Fades + slides its children into view the first time they enter the viewport.
 * Uses IntersectionObserver; falls back to visible if unsupported.
 */
const Reveal = ({ children, className = "", delay = 0, as = "div", variant = "fade" }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";
  const base = variant === "img" ? "reveal-img" : "reveal";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
