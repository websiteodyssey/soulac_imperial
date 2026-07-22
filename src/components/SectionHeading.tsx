import Ornament from "./Ornament";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** "light" for cream backgrounds, "dark" for ink/black backgrounds. */
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}

/**
 * The single, shared section header used across every page so the whole site
 * shares one rhythm: gold eyebrow → display title → optional subtitle → ornament.
 */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className = "",
}: SectionHeadingProps) => {
  const titleColor = tone === "dark" ? "text-gold-foil pb-1" : "text-luxury-black";
  const subtitleColor = tone === "dark" ? "text-luxury-champagne/70" : "text-luxury-gray";

  return (
    <div className={`${align === "center" ? "text-center mx-auto" : "text-left"} ${className}`}>
      {eyebrow && (
        <p className="text-luxury-gold text-xs tracking-luxury-wide uppercase font-accent mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className={`text-display-md md:text-display-lg font-display ${titleColor}`}>{title}</h2>
      {subtitle && (
        <p className={`text-lg font-body mt-5 ${subtitleColor}`}>{subtitle}</p>
      )}
      <Ornament align={align} className="mt-7" />
    </div>
  );
};

export default SectionHeading;
