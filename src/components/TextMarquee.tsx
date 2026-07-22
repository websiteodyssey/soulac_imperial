interface TextMarqueeProps {
  items: string[];
  direction?: "left" | "right";
  /** Seconds for one full loop. */
  speed?: number;
}

/**
 * An infinite horizontal ribbon of words separated by a gold dot — used to
 * showcase the menu universes in a single elegant scrolling line.
 */
const TextMarquee = ({ items, direction = "left", speed = 34 }: TextMarqueeProps) => {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex w-max items-center ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center shrink-0">
            <span className="font-accent uppercase tracking-luxury-wide text-sm md:text-base text-luxury-champagne/85 px-6 md:px-9">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-luxury-gold shrink-0" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextMarquee;
