/**
 * Ambient motion layer for dark sections: a slowly drifting emerald/gold aurora
 * plus a couple of floating gold diamonds. Drop inside a `relative overflow-hidden`
 * section, before the `relative z-10` content. Purely decorative.
 */
const SectionFX = () => (
  <>
    <div
      className="animate-aurora absolute inset-0 bg-gradient-to-br from-luxury-emerald-deep/40 via-transparent to-luxury-gold-deep/20 pointer-events-none"
      aria-hidden="true"
    />
    <span className="absolute top-16 left-[8%] animate-float pointer-events-none" aria-hidden="true">
      <span className="block h-2.5 w-2.5 rotate-45 bg-luxury-gold/25" />
    </span>
    <span
      className="absolute bottom-20 right-[10%] animate-float pointer-events-none"
      style={{ animationDelay: "1.3s" }}
      aria-hidden="true"
    >
      <span className="block h-2 w-2 rotate-45 bg-luxury-gold/20" />
    </span>
  </>
);

export default SectionFX;
