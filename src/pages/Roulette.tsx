import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { Gift, Copy, Check } from "lucide-react";
import PageHero from "../components/PageHero";
import {
  WHEEL_SEGMENTS,
  canSpinToday,
  recordSpin,
  createPromoFromSegment,
  findTodayPromo,
  type PromoCode,
} from "../utils/promo";

const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;
const SPIN_WEIGHTS = [10, 12, 16, 10, 4, 26, 12, 10];
const SPIN_DURATION = 4200;

const conicGradient = `conic-gradient(${WHEEL_SEGMENTS.map(
  (seg, i) => `${seg.color} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`
).join(", ")})`;

const pickWeightedIndex = (): number => {
  const total = SPIN_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < SPIN_WEIGHTS.length; i++) {
    r -= SPIN_WEIGHTS[i];
    if (r <= 0) return i;
  }
  return SPIN_WEIGHTS.length - 1;
};

const Roulette = () => {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<PromoCode | "none" | null>(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(!canSpinToday());
  const [existingPromo] = useState<PromoCode | undefined>(() => findTodayPromo());
  const [copied, setCopied] = useState(false);

  const handleSpin = () => {
    if (alreadyPlayed || spinning) return;
    setSpinning(true);
    setResult(null);

    const index = pickWeightedIndex();
    const segment = WHEEL_SEGMENTS[index];
    const segmentCenter = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const finalAngleMod = (360 - segmentCenter + 360) % 360;
    const newRotation = rotation - (rotation % 360) + 360 * 5 + finalAngleMod;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      recordSpin();
      setAlreadyPlayed(true);
      if (segment.type === "none") {
        setResult("none");
      } else {
        const promo = createPromoFromSegment(segment);
        setResult(promo);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C9A24E", "#A4332A", "#5E7D6B", "#F9F2E7"],
        });
      }
    }, SPIN_DURATION);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const displayedPromo = result && result !== "none" ? result : existingPromo;

  return (
    <div>
      <PageHero title={t("roulette.pageTitle")} subtitle={t("roulette.pageSubtitle")} />

      <section className="py-16 md:py-24 bg-imperial-ink text-imperial-cream">
        <div className="section-padding max-w-4xl mx-auto text-center">
          <p className="font-body text-imperial-cream/80 leading-relaxed max-w-2xl mx-auto mb-12">
            {t("roulette.intro")}
          </p>

          <div className="relative inline-block mx-auto">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[22px] border-l-transparent border-r-transparent border-t-imperial-gold" />
            <div
              className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-[6px] border-imperial-gold shadow-2xl"
              style={{
                background: conicGradient,
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? `transform ${SPIN_DURATION}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)` : "none",
              }}
            >
              {WHEEL_SEGMENTS.map((seg, i) => {
                const angle = i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
                return (
                  <div key={`${seg.id}-${i}`} className="absolute inset-0 flex justify-center" style={{ transform: `rotate(${angle}deg)` }}>
                    <span className="mt-5 w-20 text-center text-[10px] sm:text-xs font-body font-semibold uppercase text-imperial-cream leading-tight">
                      {t(seg.labelKey)}
                    </span>
                  </div>
                );
              })}
              <div className="absolute inset-0 m-auto h-14 w-14 rounded-full bg-imperial-ink border-2 border-imperial-gold flex items-center justify-center">
                <Gift className="text-imperial-gold" size={22} />
              </div>
            </div>
          </div>

          <div className="mt-10">
            {!alreadyPlayed && (
              <button
                type="button"
                onClick={handleSpin}
                disabled={spinning}
                className="bg-imperial-gold text-imperial-ink px-10 py-4 uppercase text-sm tracking-imperial font-body hover:bg-imperial-gold-light transition-colors disabled:opacity-50"
              >
                {spinning ? t("roulette.spinning") : t("roulette.spin")}
              </button>
            )}

            {result === "none" && (
              <p className="font-body text-imperial-cream/80 mt-6">{t("roulette.noWinMessage")}</p>
            )}

            {displayedPromo && (
              <div className="mt-8 max-w-md mx-auto border border-imperial-gold/40 bg-imperial-cream/5 p-6">
                <p className="font-display text-xl text-imperial-gold mb-2">{t("roulette.youWon")}</p>
                <p className="font-body text-imperial-cream mb-4">{t(displayedPromo.labelKey)}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-2xl tracking-widest text-imperial-cream border border-dashed border-imperial-gold px-4 py-2">
                    {displayedPromo.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(displayedPromo.code)}
                    aria-label={t("roulette.copy")}
                    className="text-imperial-gold hover:text-imperial-cream"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
                <p className="font-body text-sm text-imperial-cream/70 mt-4">{t("roulette.useInstructions")}</p>
                <Link
                  to="/carte"
                  className="inline-block mt-4 border border-imperial-gold text-imperial-gold hover:bg-imperial-gold hover:text-imperial-ink transition-colors font-body uppercase text-sm tracking-imperial px-6 py-3"
                >
                  {t("roulette.orderCta")}
                </Link>
              </div>
            )}

            {alreadyPlayed && !displayedPromo && result !== "none" && (
              <p className="font-body text-imperial-cream/80 mt-6">{t("roulette.alreadyPlayed")}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roulette;
