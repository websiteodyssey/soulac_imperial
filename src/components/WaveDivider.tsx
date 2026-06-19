interface WaveDividerProps {
  flip?: boolean;
  /** fill colour of the section the waves belong to (usually the one below) */
  color?: string;
  className?: string;
}

// One seamless wave tile is 1440 wide; the path repeats twice (→ 2880) so a
// -50% horizontal translation loops without a visible seam.
const WAVE_A =
  "M0,60 C240,20 480,20 720,60 C960,100 1200,100 1440,60 C1680,20 1920,20 2160,60 C2400,100 2640,100 2880,60 L2880,140 L0,140 Z";
const WAVE_B =
  "M0,70 C240,110 480,110 720,70 C960,30 1200,30 1440,70 C1680,110 1920,110 2160,70 C2400,30 2640,30 2880,70 L2880,140 L0,140 Z";

const WaveDivider = ({ flip = false, color = "#0f3a44", className = "" }: WaveDividerProps) => (
  <div
    className={`relative w-full overflow-hidden leading-[0] h-14 md:h-24 ${flip ? "rotate-180" : ""} ${className}`}
    aria-hidden="true"
  >
    {/* back swell — slow */}
    <svg
      viewBox="0 0 2880 140"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full"
      style={{ width: "200%", animation: "wave-x 13s linear infinite", opacity: 0.45 }}
    >
      <path d={WAVE_B} fill={color} />
    </svg>
    {/* mid swell — reverse */}
    <svg
      viewBox="0 0 2880 140"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full"
      style={{ width: "200%", animation: "wave-x-reverse 9s linear infinite", opacity: 0.7 }}
    >
      <path d={WAVE_A} fill={color} />
    </svg>
    {/* front crest — fast, gentle bob */}
    <svg
      viewBox="0 0 2880 140"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full animate-[wave-bob_6s_ease-in-out_infinite]"
      style={{ width: "200%", animation: "wave-x 7s linear infinite", bottom: 0 }}
    >
      <path d={WAVE_A} fill={color} />
    </svg>
  </div>
);

export default WaveDivider;
