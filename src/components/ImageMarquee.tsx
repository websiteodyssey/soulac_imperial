interface ImageMarqueeProps {
  images: string[];
  reverse?: boolean;
  durationSeconds?: number;
}

/**
 * A continuously scrolling row of images (infinite, seamless). Always visible —
 * no scroll-reveal dependency — and pauses on hover. The track holds two copies
 * of the list so a -50% translation loops with no seam.
 */
const ImageMarquee = ({ images, reverse = false, durationSeconds = 45 }: ImageMarqueeProps) => {
  const sequence = [...images, ...images];
  return (
    <div className="group overflow-hidden">
      <div
        className="flex w-max gap-4 md:gap-5 group-hover:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "wave-x-reverse" : "wave-x"} ${durationSeconds}s linear infinite`,
        }}
      >
        {sequence.map((src, i) => (
          <div
            key={i}
            className="relative h-52 md:h-72 aspect-[4/3] shrink-0 overflow-hidden bg-imperial-ink"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="img-cover transition-transform duration-[1200ms] ease-out hover:scale-110"
            />
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-imperial-gold/15" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageMarquee;
