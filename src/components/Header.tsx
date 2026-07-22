import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ReserveButton from "./ReserveButton";
import { siteConfig } from "../config/siteConfig";
import { media } from "../config/media";

const Header = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Le tiroir mobile bloque le défilement de la page derrière lui.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { to: "/", label: t("common.nav.home") },
    { to: "/la-maison", label: t("common.nav.about") },
    { to: "/la-carte", label: t("common.nav.menu") },
    { to: "/galerie", label: t("common.nav.gallery") },
    { to: "/contact", label: t("common.nav.contact") },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-underline font-accent uppercase text-sm tracking-luxury transition-colors ${
      isActive ? "text-luxury-gold is-active" : "text-luxury-cream hover:text-luxury-gold"
    }`;

  const close = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "h-16 md:h-20 bg-luxury-black/95 backdrop-blur border-b border-luxury-gold/20"
          : "h-18 md:h-24 bg-gradient-to-b from-black/70 to-transparent border-b border-transparent"
      }`}
    >
      <div className="section-padding relative z-50 h-full flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3 shrink-0" onClick={close}>
          <img
            src={media.logo}
            alt=""
            width={48}
            height={48}
            className="h-9 w-9 md:h-12 md:w-12 object-contain shrink-0"
          />
          <span className="font-display text-lg md:text-2xl text-luxury-cream tracking-wide whitespace-nowrap">
            {siteConfig.name}
          </span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher />
          <ReserveButton className="btn-shine border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors font-accent uppercase text-sm tracking-luxury rounded-full px-6 py-2.5" />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          {/* Hamburger ↔ croix */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative h-10 w-10 flex items-center justify-center text-luxury-cream hover:text-luxury-gold transition-colors"
          >
            <span
              className={`absolute h-px w-6 bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-current transition-all duration-200 ease-out ${
                menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-px w-6 bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "-rotate-45" : "translate-y-[6px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Voile de fermeture */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-30 bg-luxury-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Tiroir latéral */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-40 h-[100svh] w-[82%] max-w-xs bg-luxury-black/98 backdrop-blur border-l border-luxury-gold/25 shadow-2xl shadow-black/60 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full pt-24 px-8 pb-8">
          <span
            className={`h-px bg-gradient-to-r from-luxury-gold to-transparent mb-5 origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              menuOpen ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transitionDelay: menuOpen ? "120ms" : "0ms" }}
            aria-hidden="true"
          />
          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={close}
              style={{ transitionDelay: menuOpen ? `${180 + i * 60}ms` : "0ms" }}
              className={({ isActive }) =>
                `group flex items-center gap-4 py-3.5 border-b border-luxury-gold/10 font-accent uppercase text-base tracking-luxury transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? "opacity-100 translate-x-0 blur-0" : "opacity-0 -translate-x-6 blur-[2px]"
                } ${isActive ? "text-luxury-gold" : "text-luxury-cream"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`block h-1.5 w-1.5 rotate-45 shrink-0 bg-luxury-gold transition-all duration-300 ${
                      isActive ? "opacity-100 scale-125" : "opacity-40 group-hover:opacity-100"
                    }`}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
          <ReserveButton
            onClick={close}
            className={`btn-shine mt-7 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black font-accent uppercase text-sm tracking-luxury rounded-full px-6 py-3.5 text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
