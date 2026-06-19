import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "../components/PageHero";
import ImageReveal from "../components/ImageReveal";
import { siteConfig } from "../config/siteConfig";
import { media } from "../config/media";
import { getAvailableSlotsForDate, getMinPickupDate, isClosedDate } from "../utils/schedule";

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

const Reservation = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<ReservationForm>({
    name: "",
    email: "",
    phone: "",
    date: getMinPickupDate(),
    time: "",
    guests: 2,
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<ReservationForm | null>(null);

  const availableSlots = getAvailableSlotsForDate(form.date);
  const closed = isClosedDate(new Date(`${form.date}T00:00:00`));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = t("reservation.errors.required");
    if (!form.email.trim() && !form.phone.trim()) newErrors.contact = t("reservation.errors.contact");
    if (closed) newErrors.date = t("reservation.errors.closed");
    if (!form.time) newErrors.time = t("reservation.errors.time");

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setConfirmed(form);
  };

  const buildMailto = (data: ReservationForm): string => {
    const lines = [
      `${t("reservation.email.date")}: ${data.date}`,
      `${t("reservation.email.time")}: ${data.time}`,
      `${t("reservation.email.guests")}: ${data.guests}`,
      "",
      `${t("reservation.email.name")}: ${data.name}`,
      ...(data.phone ? [`${t("reservation.email.phone")}: ${data.phone}`] : []),
      ...(data.email ? [`${t("reservation.email.emailLabel")}: ${data.email}`] : []),
      ...(data.notes ? [`${t("reservation.email.notes")}: ${data.notes}`] : []),
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(t("reservation.email.subject"));
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  if (confirmed) {
    return (
      <div>
        <PageHero title={t("reservation.pageTitle")} subtitle={t("reservation.pageSubtitle")} />
        <section className="py-16 md:py-24 bg-imperial-ink">
          <div className="section-padding max-w-xl mx-auto text-center flex flex-col items-center gap-4">
            <CheckCircle2 size={48} className="text-imperial-jade" />
            <h2 className="font-display text-2xl text-imperial-cream">{t("reservation.confirmHeading")}</h2>
            <p className="font-body text-imperial-cream/70">
              {confirmed.date} — {confirmed.time} · {confirmed.guests} {t("reservation.guestsLabel")}
            </p>
            <p className="font-body text-imperial-cream/70 leading-relaxed">
              {t("reservation.confirmInstructions")}
            </p>
            <a
              href={buildMailto(confirmed)}
              className="inline-flex items-center gap-2 border border-imperial-gold text-imperial-cream px-6 py-3 uppercase text-sm tracking-imperial hover:bg-imperial-gold/10"
            >
              <Mail size={16} /> {t("reservation.sendEmail")}
            </a>
            <button
              type="button"
              onClick={() => {
                setConfirmed(null);
                setForm({ name: "", email: "", phone: "", date: getMinPickupDate(), time: "", guests: 2, notes: "" });
              }}
              className="font-body text-sm text-imperial-cream underline hover:text-imperial-gold"
            >
              {t("reservation.newReservation")}
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero title={t("reservation.pageTitle")} subtitle={t("reservation.pageSubtitle")} />

      <section className="py-16 md:py-24 bg-imperial-ink">
        <div className="section-padding grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="order-2 lg:order-1 lg:col-span-1 space-y-6">
            <ImageReveal src={media.reservation} className="hidden lg:block aspect-[4/5]" panel="gold">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-imperial-ink/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                <p className="eyebrow text-imperial-gold mb-1">{siteConfig.shortName}</p>
                <p className="font-display italic text-2xl text-imperial-cream leading-tight">
                  {t("reservation.pageSubtitle")}
                </p>
              </div>
            </ImageReveal>

            <div className="space-y-3 font-body text-imperial-cream/70">
              <div className="flex items-start gap-3">
                <MapPin size={17} className="text-imperial-gold mt-1 shrink-0" strokeWidth={1.5} />
                <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-imperial-gold transition-colors">
                  {siteConfig.address.street}, {siteConfig.address.city}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={17} className="text-imperial-gold mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p>{t("footer.lunch")} {siteConfig.hours.lunch} · {t("footer.dinner")} {siteConfig.hours.dinner}</p>
                  <p className="text-imperial-cream/50 text-sm">{t("footer.closed")} {t(`days.${siteConfig.hours.closedDay.toLowerCase()}`)}</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-imperial-gold pl-4 py-1">
              <p className="font-display text-imperial-cream text-lg leading-tight">{t("reservation.policyTitle")}</p>
              <p className="font-body text-sm text-imperial-cream/70 leading-relaxed mt-1">{t("reservation.policyShort")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="order-1 lg:order-2 lg:col-span-2 imperial-card p-6 sm:p-8 space-y-5">
            <div className="mb-2">
              <p className="eyebrow text-imperial-gold mb-2">{t("reservation.pageSubtitle")}</p>
              <h2 className="font-display text-3xl text-imperial-cream leading-tight">{t("reservation.pageTitle")}</h2>
              <div className="hairline neon-rule w-16 mt-3" />
            </div>
            <div>
              <label className="block eyebrow text-imperial-gold mb-2">{t("reservation.form.name")} *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="field"
              />
              {errors.name && <p className="text-imperial-red text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block eyebrow text-imperial-gold mb-2">{t("reservation.form.phone")}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="field"
                />
              </div>
              <div>
                <label className="block eyebrow text-imperial-gold mb-2">{t("reservation.form.email")}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="field"
                />
              </div>
            </div>
            {errors.contact && <p className="text-imperial-red text-xs">{errors.contact}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block eyebrow text-imperial-gold mb-2">{t("reservation.form.date")} *</label>
                <input
                  type="date"
                  value={form.date}
                  min={getMinPickupDate()}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value, time: "" }))}
                  className="field"
                />
                {errors.date && <p className="text-imperial-red text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block eyebrow text-imperial-gold mb-2">{t("reservation.form.time")} *</label>
                <select
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  className="field"
                >
                  <option value="">—</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-imperial-red text-xs mt-1">{errors.time}</p>}
              </div>
              <div>
                <label className="block eyebrow text-imperial-gold mb-2">{t("reservation.form.guests")} *</label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm((f) => ({ ...f, guests: Number(e.target.value) }))}
                  className="field"
                >
                  {GUEST_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g} {t("reservation.guestsLabel")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {closed && <p className="text-imperial-red text-xs">{t("reservation.errors.closed")}</p>}

            <div>
              <label className="block eyebrow text-imperial-gold mb-2">{t("reservation.form.notes")}</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                className="field resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-imperial-gold text-imperial-ink py-3 uppercase text-sm tracking-imperial font-body hover:bg-imperial-gold-light transition-colors"
            >
              {t("reservation.submit")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Reservation;
