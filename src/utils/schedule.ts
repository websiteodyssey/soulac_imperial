import { siteConfig } from "../config/siteConfig";

const DAY_KEYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

const parseHoursToMinutes = (range: string): [number, number] => {
  const [startStr, endStr] = range.split("-").map((s) => s.trim());
  const parse = (s: string) => {
    const m = s.match(/(\d{1,2})h(\d{2})/);
    if (!m) return 0;
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  };
  return [parse(startStr), parse(endStr)];
};

const minutesToLabel = (total: number): string => {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const getPickupSlots = (step = 30): string[] => {
  const ranges = [siteConfig.hours.lunch, siteConfig.hours.dinner];
  const slots: string[] = [];
  for (const range of ranges) {
    const [start, end] = parseHoursToMinutes(range);
    for (let t = start; t <= end; t += step) {
      slots.push(minutesToLabel(t));
    }
  }
  return slots;
};

export const isClosedDate = (date: Date): boolean => {
  return DAY_KEYS[date.getDay()] === siteConfig.hours.closedDay.toLowerCase();
};

export const getMinPickupDate = (): string => {
  return new Date().toISOString().slice(0, 10);
};

export const getAvailableSlotsForDate = (dateStr: string, leadMinutes = 30): string[] => {
  const slots = getPickupSlots();
  const now = new Date();
  const selected = new Date(`${dateStr}T00:00:00`);

  if (isClosedDate(selected)) return [];

  const isToday = dateStr === getMinPickupDate();
  if (!isToday) return slots;

  const earliestMinutes = now.getHours() * 60 + now.getMinutes() + leadMinutes;
  return slots.filter((slot) => {
    const [h, m] = slot.split(":").map(Number);
    return h * 60 + m >= earliestMinutes;
  });
};
