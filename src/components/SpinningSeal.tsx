interface SpinningSealProps {
  /** Texte qui tourne autour du sceau. */
  text?: string;
  /** Caractère au centre. */
  mark?: string;
  className?: string;
}

/**
 * Sceau doré : un anneau de texte qui tourne lentement autour d'un caractère
 * fixe. Purement décoratif.
 */
const SpinningSeal = ({
  text = "· SOULAC IMPÉRIAL · CHINE & JAPON ",
  mark = "帝",
  className = "",
}: SpinningSealProps) => (
  <div className={`relative ${className}`} aria-hidden="true">
    <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full">
      <defs>
        <path
          id="seal-text-path"
          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
          fill="none"
        />
      </defs>
      <text
        fill="var(--color-luxury-gold)"
        style={{
          fontSize: "13px",
          letterSpacing: "2px",
          fontFamily: "var(--font-accent)",
          textTransform: "uppercase",
        }}
      >
        <textPath href="#seal-text-path" startOffset="0">
          {text}
        </textPath>
      </text>
    </svg>
    <span className="absolute inset-0 flex items-center justify-center font-display text-luxury-gold text-3xl">
      {mark}
    </span>
  </div>
);

export default SpinningSeal;
