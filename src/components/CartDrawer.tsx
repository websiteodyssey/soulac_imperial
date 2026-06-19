import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Plus, Minus, Trash2, Ticket, CheckCircle2, Mail, ArrowLeft } from "lucide-react";
import { useCart, type CartItem } from "../context/CartContext";
import { siteConfig } from "../config/siteConfig";
import { getAvailableSlotsForDate, getMinPickupDate, isClosedDate } from "../utils/schedule";
import { markPromoUsed } from "../utils/promo";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber?: string | null;
}

type View = "cart" | "checkout" | "confirmation";

interface OrderSummary {
  ref: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  tableNumber?: string;
}

const generateOrderRef = (): string => {
  return `SI-${Date.now().toString(36).toUpperCase().slice(-6)}`;
};

const CartDrawer = ({ isOpen, onClose, tableNumber }: CartDrawerProps) => {
  const { t } = useTranslation();
  const cart = useCart();
  const isTableOrder = !!tableNumber;
  const [view, setView] = useState<View>("cart");
  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<"idle" | "ok" | "invalid">("idle");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: getMinPickupDate(),
    time: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setView("cart");
    setPromoInput("");
    setPromoStatus("idle");
    setFormErrors({});
  };

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = cart.applyPromoCode(promoInput);
    setPromoStatus(result === "ok" ? "ok" : "invalid");
  };

  const availableSlots = getAvailableSlotsForDate(form.date);
  const closed = isClosedDate(new Date(`${form.date}T00:00:00`));

  const handleSubmitOrder = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = t("cart.errors.required");
    if (!form.email.trim() && !form.phone.trim()) {
      errors.contact = t("cart.errors.contact");
    }
    if (!isTableOrder) {
      if (closed) errors.date = t("cart.errors.closed");
      if (!form.time) errors.time = t("cart.errors.time");
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (cart.promo) markPromoUsed(cart.promo.code);

    const summary: OrderSummary = {
      ref: generateOrderRef(),
      items: cart.items,
      subtotal: cart.subtotal,
      discount: cart.discount,
      total: cart.total,
      promoCode: cart.promo?.code,
      ...form,
      ...(isTableOrder ? { tableNumber: tableNumber ?? undefined } : {}),
    };
    setOrderSummary(summary);
    cart.clear();
    setView("confirmation");
  };

  const buildMailto = (summary: OrderSummary): string => {
    const lines = [
      `${t("cart.email.ref")}: ${summary.ref}`,
      summary.tableNumber
        ? `${t("cart.email.table")}: ${summary.tableNumber}`
        : `${t("cart.email.pickup")}: ${summary.date} ${summary.time}`,
      "",
      t("cart.email.items") + ":",
      ...summary.items.map(
        (i) => `- ${t(`menu.items.${i.id}.name`)} x${i.qty} — ${(i.price * i.qty).toFixed(2)} €`
      ),
      "",
      `${t("cart.subtotal")}: ${summary.subtotal.toFixed(2)} €`,
      ...(summary.discount > 0
        ? [`${t("cart.discount")} (${summary.promoCode}): -${summary.discount.toFixed(2)} €`]
        : []),
      `${t("cart.total")}: ${summary.total.toFixed(2)} €`,
      "",
      `${t("cart.email.customer")}: ${summary.name}`,
      ...(summary.phone ? [`${t("cart.email.phone")}: ${summary.phone}`] : []),
      ...(summary.email ? [`${t("cart.email.emailLabel")}: ${summary.email}`] : []),
      ...(summary.notes ? [`${t("cart.email.notes")}: ${summary.notes}`] : []),
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent(
      `${summary.tableNumber ? t("cart.email.subjectTable") : t("cart.email.subject")} ${summary.ref}`
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-imperial-ink/60 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-imperial-cream z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label={t("cart.title")}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-imperial-gold/20">
          <h2 className="font-display text-2xl text-imperial-ink">
            {view === "confirmation" ? t("cart.confirmTitle") : view === "checkout" ? t("cart.checkoutTitle") : t("cart.title")}
          </h2>
          <button type="button" onClick={handleClose} aria-label={t("common.close")} className="text-imperial-ink hover:text-imperial-gold">
            <X size={26} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {view === "cart" && (
            <>
              {cart.items.length === 0 ? (
                <p className="font-body text-imperial-gray text-center mt-12">{t("cart.empty")}</p>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 border-b border-imperial-gold/10 pb-4">
                      <div className="flex-1">
                        <p className="font-body text-imperial-ink font-medium">{t(`menu.items.${item.id}.name`)}</p>
                        <p className="font-body text-sm text-imperial-gray">{item.price.toFixed(2)} €</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => cart.updateQty(item.id, item.qty - 1)}
                          className="h-7 w-7 flex items-center justify-center border border-imperial-gold/40 text-imperial-ink hover:bg-imperial-gold/10"
                          aria-label={t("cart.decrease")}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-body w-6 text-center">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => cart.updateQty(item.id, item.qty + 1)}
                          className="h-7 w-7 flex items-center justify-center border border-imperial-gold/40 text-imperial-ink hover:bg-imperial-gold/10"
                          aria-label={t("cart.increase")}
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => cart.removeItem(item.id)}
                          className="text-imperial-red hover:text-imperial-red/70 ml-1"
                          aria-label={t("cart.remove")}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2">
                    <label className="font-body text-sm text-imperial-ink flex items-center gap-2 mb-2">
                      <Ticket size={16} className="text-imperial-gold" /> {t("cart.promoLabel")}
                    </label>
                    {cart.promo ? (
                      <div className="flex items-center justify-between bg-imperial-jade/10 border border-imperial-jade/40 px-3 py-2 text-sm">
                        <span className="font-body text-imperial-jade">
                          {cart.promo.code} — {t(cart.promo.labelKey)}
                        </span>
                        <button type="button" onClick={cart.removePromo} className="text-imperial-red text-xs uppercase tracking-wide">
                          {t("cart.removePromo")}
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value);
                            setPromoStatus("idle");
                          }}
                          placeholder={t("cart.promoPlaceholder")}
                          className="flex-1 border border-imperial-gold/30 bg-white px-3 py-2 text-sm font-body focus:outline-none focus:border-imperial-gold"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="border border-imperial-gold text-imperial-ink px-4 py-2 text-sm uppercase tracking-wide hover:bg-imperial-gold/10"
                        >
                          {t("cart.apply")}
                        </button>
                      </div>
                    )}
                    {promoStatus === "invalid" && (
                      <p className="text-imperial-red text-xs mt-2">{t("cart.promoInvalid")}</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {view === "checkout" && (
            <div className="space-y-4">
              <button type="button" onClick={() => setView("cart")} className="flex items-center gap-2 text-sm text-imperial-ink hover:text-imperial-gold font-body mb-2">
                <ArrowLeft size={16} /> {t("cart.backToCart")}
              </button>

              {isTableOrder && (
                <div className="inline-flex items-center gap-2 bg-imperial-gold/10 border border-imperial-gold/30 px-3 py-2 text-sm font-body text-imperial-ink uppercase tracking-imperial">
                  {t("cart.tableLabel", { number: tableNumber })}
                </div>
              )}

              <div>
                <label className="block font-body text-sm text-imperial-ink mb-1">{t("cart.form.name")} *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-imperial-gold/30 bg-white px-3 py-2 font-body focus:outline-none focus:border-imperial-gold"
                />
                {formErrors.name && <p className="text-imperial-red text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-sm text-imperial-ink mb-1">{t("cart.form.phone")}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-imperial-gold/30 bg-white px-3 py-2 font-body focus:outline-none focus:border-imperial-gold"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-imperial-ink mb-1">{t("cart.form.email")}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-imperial-gold/30 bg-white px-3 py-2 font-body focus:outline-none focus:border-imperial-gold"
                  />
                </div>
              </div>
              {formErrors.contact && <p className="text-imperial-red text-xs">{formErrors.contact}</p>}

              {!isTableOrder && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-body text-sm text-imperial-ink mb-1">{t("cart.form.date")} *</label>
                      <input
                        type="date"
                        value={form.date}
                        min={getMinPickupDate()}
                        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value, time: "" }))}
                        className="w-full border border-imperial-gold/30 bg-white px-3 py-2 font-body focus:outline-none focus:border-imperial-gold"
                      />
                      {formErrors.date && <p className="text-imperial-red text-xs mt-1">{formErrors.date}</p>}
                    </div>
                    <div>
                      <label className="block font-body text-sm text-imperial-ink mb-1">{t("cart.form.time")} *</label>
                      <select
                        value={form.time}
                        onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                        className="w-full border border-imperial-gold/30 bg-white px-3 py-2 font-body focus:outline-none focus:border-imperial-gold"
                      >
                        <option value="">—</option>
                        {availableSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {formErrors.time && <p className="text-imperial-red text-xs mt-1">{formErrors.time}</p>}
                    </div>
                  </div>
                  {closed && <p className="text-imperial-red text-xs">{t("cart.errors.closed")}</p>}
                </>
              )}

              <div>
                <label className="block font-body text-sm text-imperial-ink mb-1">{t("cart.form.notes")}</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full border border-imperial-gold/30 bg-white px-3 py-2 font-body focus:outline-none focus:border-imperial-gold resize-none"
                />
              </div>
            </div>
          )}

          {view === "confirmation" && orderSummary && (
            <div className="text-center flex flex-col items-center gap-4 mt-4">
              <CheckCircle2 size={48} className="text-imperial-jade" />
              <p className="font-display text-xl text-imperial-ink">{t("cart.confirmHeading")}</p>
              <p className="font-body text-imperial-gray-dark">
                {t("cart.confirmRef")}: <span className="font-semibold text-imperial-ink">{orderSummary.ref}</span>
              </p>
              {orderSummary.tableNumber ? (
                <p className="font-body text-imperial-gray-dark">
                  {t("cart.tableLabel", { number: orderSummary.tableNumber })}
                </p>
              ) : (
                <p className="font-body text-imperial-gray-dark">
                  {t("cart.email.pickup")}: {orderSummary.date} — {orderSummary.time}
                </p>
              )}
              <p className="font-body text-imperial-ink font-semibold">
                {t("cart.total")}: {orderSummary.total.toFixed(2)} €
              </p>
              <p className="font-body text-sm text-imperial-gray-dark leading-relaxed">
                {orderSummary.tableNumber ? t("cart.confirmTableInstructions") : t("cart.confirmInstructions")}
              </p>
              <a
                href={buildMailto(orderSummary)}
                className="inline-flex items-center gap-2 border border-imperial-gold text-imperial-ink px-6 py-3 uppercase text-sm tracking-imperial hover:bg-imperial-gold/10"
              >
                <Mail size={16} /> {t("cart.sendEmail")}
              </a>
            </div>
          )}
        </div>

        {view !== "confirmation" && (
          <div className="border-t border-imperial-gold/20 px-6 py-5 space-y-3">
            <div className="flex justify-between font-body text-imperial-gray-dark text-sm">
              <span>{t("cart.subtotal")}</span>
              <span>{cart.subtotal.toFixed(2)} €</span>
            </div>
            {cart.discount > 0 && (
              <div className="flex justify-between font-body text-imperial-jade text-sm">
                <span>{t("cart.discount")}</span>
                <span>-{cart.discount.toFixed(2)} €</span>
              </div>
            )}
            <div className="flex justify-between font-display text-lg text-imperial-ink">
              <span>{t("cart.total")}</span>
              <span>{cart.total.toFixed(2)} €</span>
            </div>

            {view === "cart" ? (
              <button
                type="button"
                disabled={cart.items.length === 0}
                onClick={() => setView("checkout")}
                className="w-full bg-imperial-gold text-imperial-ink py-3 uppercase text-sm tracking-imperial font-body disabled:opacity-40 hover:bg-imperial-gold-light transition-colors"
              >
                {t("cart.checkout")}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="w-full bg-imperial-gold text-imperial-ink py-3 uppercase text-sm tracking-imperial font-body hover:bg-imperial-gold-light transition-colors"
              >
                {t("cart.confirmOrder")}
              </button>
            )}
          </div>
        )}

        {view === "confirmation" && (
          <div className="border-t border-imperial-gold/20 px-6 py-5">
            <button
              type="button"
              onClick={handleClose}
              className="w-full border border-imperial-gold text-imperial-ink py-3 uppercase text-sm tracking-imperial font-body hover:bg-imperial-gold/10"
            >
              {t("common.close")}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
