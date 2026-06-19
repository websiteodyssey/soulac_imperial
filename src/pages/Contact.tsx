import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Mail, MapPin, Clock, Phone } from "lucide-react";
import PageHero from "../components/PageHero";
import { siteConfig } from "../config/siteConfig";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: ContactForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<ContactForm | null>(null);

  const buildMailto = (data: ContactForm): string => {
    const lines = [
      `${t("contact.email.name")}: ${data.name}`,
      `${t("contact.email.emailLabel")}: ${data.email}`,
      "",
      data.message,
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(data.subject || t("contact.email.subject"));
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = t("contact.errors.required");
    if (!form.email.trim()) newErrors.email = t("contact.errors.required");
    if (!form.message.trim()) newErrors.message = t("contact.errors.required");

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSent(form);
  };

  if (sent) {
    return (
      <div>
        <PageHero title={t("contact.pageTitle")} subtitle={t("contact.pageSubtitle")} />
        <section className="py-16 md:py-24 bg-imperial-ink">
          <div className="section-padding max-w-xl mx-auto text-center flex flex-col items-center gap-4">
            <CheckCircle2 size={48} className="text-imperial-jade" />
            <h2 className="font-display text-2xl text-imperial-cream">{t("contact.confirmHeading")}</h2>
            <p className="font-body text-imperial-cream/70 leading-relaxed">{t("contact.confirmInstructions")}</p>
            <a
              href={buildMailto(sent)}
              className="inline-flex items-center gap-2 border border-imperial-gold text-imperial-cream px-6 py-3 uppercase text-sm tracking-imperial hover:bg-imperial-gold/10"
            >
              <Mail size={16} /> {t("contact.sendEmail")}
            </a>
            <button
              type="button"
              onClick={() => {
                setSent(null);
                setForm(EMPTY_FORM);
              }}
              className="font-body text-sm text-imperial-cream underline hover:text-imperial-gold"
            >
              {t("contact.newMessage")}
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero title={t("contact.pageTitle")} subtitle={t("contact.pageSubtitle")} />

      <section className="py-16 md:py-24 bg-imperial-ink">
        <div className="section-padding grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
            <p className="font-body text-imperial-cream/70 leading-relaxed">{t("contact.intro")}</p>
            <div className="space-y-4 font-body text-imperial-cream/70">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-imperial-gold mt-1 shrink-0" />
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-imperial-gold transition-colors"
                >
                  {siteConfig.address.street}, {siteConfig.address.city}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-imperial-gold mt-1 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-imperial-gold transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              {siteConfig.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-imperial-gold mt-1 shrink-0" />
                  <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-imperial-gold transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-imperial-gold mt-1 shrink-0" />
                <div>
                  <p>{t("footer.lunch")}: {siteConfig.hours.lunch}</p>
                  <p>{t("footer.dinner")}: {siteConfig.hours.dinner}</p>
                  <p className="text-imperial-cream/50 text-sm mt-1">
                    {t("footer.closed")}: {t(`days.${siteConfig.hours.closedDay.toLowerCase()}`)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-2 imperial-card p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block eyebrow text-imperial-gold mb-2">{t("contact.form.name")} *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="field"
                />
                {errors.name && <p className="text-imperial-red text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block eyebrow text-imperial-gold mb-2">{t("contact.form.email")} *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="field"
                />
                {errors.email && <p className="text-imperial-red text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block eyebrow text-imperial-gold mb-2">{t("contact.form.subject")}</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                className="field"
              />
            </div>

            <div>
              <label className="block eyebrow text-imperial-gold mb-2">{t("contact.form.message")} *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={6}
                className="field resize-none"
              />
              {errors.message && <p className="text-imperial-red text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-imperial-gold text-imperial-ink py-3 uppercase text-sm tracking-imperial font-body hover:bg-imperial-gold-light transition-colors"
            >
              {t("contact.submit")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
