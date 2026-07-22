interface OrnamentProps {
  className?: string;
  /** "light" on dark backgrounds, "dark" on cream backgrounds. */
  tone?: "gold";
  align?: "center" | "left";
}

/**
 * A thin gold rule punctuated by a diamond — the recurring section flourish.
 */
const Ornament = ({ className = "", align = "center" }: OrnamentProps) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-luxury-gold" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-luxury-gold animate-pulse-soft" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-luxury-gold" />
    </div>
  );
};

export default Ornament;
