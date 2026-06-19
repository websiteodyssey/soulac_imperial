import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingBag } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { siteConfig } from "../config/siteConfig";
import { scrollToTopSmooth } from "../lib/smoothScroll";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { to: "/", label: t("common.nav.home"), end: true },
    { to: "/a-propos", label: t("common.nav.about") },
    { to: "/carte", label: t("common.nav.menu") },
    { to: "/carte", label: t("common.nav.clickcollect") },
    { to: "/contact", label: t("common.nav.contact") },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `lux-underline font-body text-[0.72rem] uppercase tracking-[0.2em] transition-colors ${
      isActive ? "text-imperial-gold is-active" : "text-imperial-cream/80 hover:text-imperial-gold"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
          scrolled && !open
            ? "h-[58px] bg-imperial-ink/92 backdrop-blur-md border-b border-imperial-gold/20 shadow-[0_4px_30px_-10px_rgba(191,155,88,0.25)]"
            : "h-[70px] bg-gradient-to-b from-imperial-ink/60 to-transparent"
        }`}
      >
        <div className="section-padding h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => {
              if (location.pathname === "/") scrollToTopSmooth();
            }}
            className="group flex items-center gap-2.5 shrink-0"
            aria-label={siteConfig.name}
          >
            <span
              className={`relative shrink-0 rounded-full overflow-hidden ring-1 ring-imperial-gold/50 shadow-[0_0_14px_-2px_rgba(191,155,88,0.6)] transition-all duration-500 group-hover:ring-imperial-gold ${
                scrolled && !open ? "h-9 w-9" : "h-11 w-11"
              }`}
            >
              <img
                src="/images/logo.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-[1.6] object-[50%_30%]"
              />
            </span>
            <span className="hidden sm:block font-display text-sm md:text-base text-imperial-cream tracking-[0.16em] uppercase whitespace-nowrap">
              {siteConfig.name}
            </span>
          </NavLink>

          {/* Desktop inline nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, i) => (
              <NavLink
                key={`${item.to}-${i}`}
                to={item.to}
                end={item.end}
                onClick={() => {
                  if (location.pathname === item.to) scrollToTopSmooth();
                }}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <LanguageSwitcher />

            <NavLink
              to="/carte"
              aria-label={t("common.cart")}
              className="relative text-imperial-cream/85 hover:text-imperial-gold transition-colors"
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-imperial-gold text-imperial-ink text-[9px] font-medium rounded-full h-3.5 w-3.5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/reservation"
              className="hidden md:inline-block btn-lux border border-imperial-gold/60 text-imperial-cream hover:text-imperial-ink shadow-[0_0_14px_-4px_rgba(191,155,88,0.6)] eyebrow px-5 py-2.5"
            >
              {t("common.reserve")}
            </NavLink>

            {/* Mobile hamburger → overlay */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t("common.close") : t("common.menu")}
              aria-expanded={open}
              className="lg:hidden group relative block h-3.5 w-6 text-imperial-cream ml-1"
            >
              <span
                className={`absolute left-0 block h-px bg-current transition-all duration-300 ease-out ${
                  open ? "top-1.5 w-6 rotate-45" : "top-0.5 w-6"
                }`}
              />
              <span
                className={`absolute left-0 block h-px bg-current transition-all duration-300 ease-out ${
                  open ? "top-1.5 w-6 -rotate-45" : "top-2.5 w-4 group-hover:w-6"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay menu (mobile) */}
      <div className={`menu-overlay lg:hidden ${open ? "is-open" : ""}`}>
        <div className="section-padding h-full flex flex-col justify-center pt-24 pb-12">
          <nav className="flex flex-col gap-2">
            {[...navItems, { to: "/reservation", label: t("common.nav.reservation"), end: false }].map((item, i) => (
              <NavLink
                key={`${item.to}-${i}`}
                to={item.to}
                end={item.end}
                onClick={() => {
                  setOpen(false);
                  if (location.pathname === item.to) scrollToTopSmooth();
                }}
                className="menu-link group flex items-baseline gap-5"
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
              >
                <span className="eyebrow text-imperial-gold/70 w-8">{`0${i + 1}`}</span>
                <span className="font-display text-4xl sm:text-6xl text-imperial-cream/80 group-hover:text-imperial-gold transition-colors duration-300 leading-tight">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div
            className="menu-link mt-auto pt-12 border-t border-imperial-gold/15"
            style={{ transitionDelay: open ? "650ms" : "0ms" }}
          >
            <p className="eyebrow text-imperial-gold/60 mb-2">{t("footer.contactTitle")}</p>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="block font-body text-imperial-cream/80 hover:text-imperial-gold transition-colors">
              {siteConfig.address.street}, {siteConfig.address.city}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="font-body text-imperial-cream/80 hover:text-imperial-gold transition-colors">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
