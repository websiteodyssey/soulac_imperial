import { useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** how strongly it follows the cursor (px factor) */
  strength?: number;
}

/**
 * Makes its child gently drift toward the cursor while hovered, then springs
 * back on leave. A quiet, tactile touch on CTAs. Fine-pointer only.
 */
const Magnetic = ({ children, className = "", strength = 0.4 }: MagneticProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const node = ref.current;
    if (node) node.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  );
};

export default Magnetic;
