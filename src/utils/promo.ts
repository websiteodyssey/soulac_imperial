export type PrizeType = "percent" | "fixed" | "none";

export interface WheelSegment {
  id: string;
  labelKey: string;
  type: PrizeType;
  value: number;
  color: string;
}

export interface PromoCode {
  code: string;
  prizeId: string;
  labelKey: string;
  type: PrizeType;
  value: number;
  createdAt: string;
  expiresAt: string;
  used: boolean;
}

export const WHEEL_SEGMENTS: WheelSegment[] = [
  { id: "discount10", labelKey: "roulette.prizes.discount10", type: "percent", value: 10, color: "#A4332A" },
  { id: "freeTea", labelKey: "roulette.prizes.freeTea", type: "fixed", value: 3, color: "#5E7D6B" },
  { id: "discount5", labelKey: "roulette.prizes.discount5", type: "percent", value: 5, color: "#C9A24E" },
  { id: "freeDessert", labelKey: "roulette.prizes.freeDessert", type: "fixed", value: 6, color: "#243A40" },
  { id: "jackpot15", labelKey: "roulette.prizes.discount15", type: "percent", value: 15, color: "#A4332A" },
  { id: "noWin", labelKey: "roulette.prizes.noWin", type: "none", value: 0, color: "#1F262D" },
  { id: "freeDrink", labelKey: "roulette.prizes.freeDrink", type: "fixed", value: 4, color: "#5E7D6B" },
  { id: "discount10b", labelKey: "roulette.prizes.discount10", type: "percent", value: 10, color: "#C9A24E" },
];

const SPIN_KEY = "soulac_imperial_last_spin";
const PROMO_KEY = "soulac_imperial_promos";

export const todayKey = () => new Date().toISOString().slice(0, 10);

export const canSpinToday = (): boolean => {
  return localStorage.getItem(SPIN_KEY) !== todayKey();
};

export const recordSpin = () => {
  localStorage.setItem(SPIN_KEY, todayKey());
};

const generateCode = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "IMP-";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

export const getPromos = (): PromoCode[] => {
  try {
    const raw = localStorage.getItem(PROMO_KEY);
    return raw ? (JSON.parse(raw) as PromoCode[]) : [];
  } catch {
    return [];
  }
};

const savePromos = (promos: PromoCode[]) => {
  localStorage.setItem(PROMO_KEY, JSON.stringify(promos));
};

export const createPromoFromSegment = (segment: WheelSegment): PromoCode | null => {
  if (segment.type === "none") return null;

  const now = new Date();
  const expires = new Date(now);
  expires.setDate(expires.getDate() + 7);

  const promo: PromoCode = {
    code: generateCode(),
    prizeId: segment.id,
    labelKey: segment.labelKey,
    type: segment.type,
    value: segment.value,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    used: false,
  };

  const promos = getPromos();
  promos.push(promo);
  savePromos(promos);

  return promo;
};

export const findTodayPromo = (): PromoCode | undefined => {
  const promos = getPromos();
  return promos
    .filter((p) => p.createdAt.slice(0, 10) === todayKey() && !p.used)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
};

export const findActivePromo = (code: string): PromoCode | undefined => {
  const promos = getPromos();
  const normalized = code.trim().toUpperCase();
  return promos.find(
    (p) => p.code === normalized && !p.used && new Date(p.expiresAt) > new Date()
  );
};

export const markPromoUsed = (code: string) => {
  const promos = getPromos();
  const updated = promos.map((p) =>
    p.code === code.trim().toUpperCase() ? { ...p, used: true } : p
  );
  savePromos(updated);
};

export const computeDiscount = (promo: PromoCode, subtotal: number): number => {
  if (promo.type === "percent") {
    return Math.round(subtotal * (promo.value / 100) * 100) / 100;
  }
  if (promo.type === "fixed") {
    return Math.min(promo.value, subtotal);
  }
  return 0;
};
