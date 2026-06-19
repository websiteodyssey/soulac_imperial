import { useRef, type ReactNode } from "react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** maximum rotation in degrees */
  max?: number;
}

/**
 * Subtle 3D tilt that follows the cursor across the element. Fine-pointer only;
 * resets smoothly on leave.
 */
const Tilt = ({ children, className = "", max = 7 }: TiltProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
  };

  const reset = () => {
    const node = ref.current;
    if (node) node.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`transition-transform duration-500 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export default Tilt;
