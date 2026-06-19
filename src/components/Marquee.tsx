interface MarqueeProps {
  items: string[];
  durationSeconds?: number;
  className?: string;
}

const SUITS = ["♠", "♦", "♣", "♥"];

/** Infinite horizontal marquee with glowing casino card-suit dividers. */
const Marquee = ({ items, durationSeconds = 32, className = "" }: MarqueeProps) => {
  const sequence = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee-left items-center"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-display italic text-2xl md:text-3xl neon-gold">{item}</span>
            <span className="neon-gold text-base md:text-lg px-7 select-none">{SUITS[i % SUITS.length]}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
