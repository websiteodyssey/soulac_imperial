import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { siteConfig } from "../config/siteConfig";
import { media } from "../config/media";

/** Voile d'ouverture : logo, filet doré, puis effacement. Ne s'affiche qu'une fois par visite. */
const Loader = () => {
  const { t } = useTranslation();
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const hideTimer = setTimeout(() => setHidden(true), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  const [first, ...rest] = siteConfig.name.split(" ");

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-luxury-black grain transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden={fading}
    >
      <div className="frame-inset" />
      <img
        src={media.logo}
        alt=""
        width={80}
        height={80}
        className="animate-fade-up h-16 w-16 md:h-20 md:w-20 object-contain mb-7"
      />
      <p
        className="animate-fade-up font-display text-3xl md:text-5xl tracking-luxury uppercase text-center px-6"
        style={{ animationDelay: "0.1s" }}
      >
        <span className="text-luxury-cream">{first} </span>
        <span className="text-gold-shimmer">{rest.join(" ")}</span>
      </p>
      <div className="w-40 md:w-56 h-px bg-luxury-gold/20 mt-8 overflow-hidden">
        <div className="h-full bg-luxury-gold animate-loader-bar" />
      </div>
      <p className="mt-4 text-xs tracking-luxury-wide uppercase text-luxury-gray font-body">
        {t("common.loading")}
      </p>
    </div>
  );
};

export default Loader;
