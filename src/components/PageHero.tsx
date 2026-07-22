import Ornament from "./Ornament";
import SpinningSeal from "./SpinningSeal";
import Photo from "./Photo";
import type { MediaKey } from "../config/media";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: MediaKey;
  /** Ligne courte sous le titre — évite un hero vide en haut de page. */
  lead?: string;
}

/** En-tête de page : photo plein cadre, filet doré, titre, sceau tournant. */
const PageHero = ({ title, subtitle, image, lead }: PageHeroProps) => (
  <section className="relative flex min-h-[46svh] items-center justify-center overflow-hidden bg-luxury-black grain pt-24 pb-14 md:min-h-[56svh] md:pt-28 md:pb-16">
    <Photo
      name={image}
      sizes="100vw"
      priority
      className="animate-ken-burns absolute inset-0 h-full w-full object-cover"
    />
    <div className="hero-overlay absolute inset-0 pointer-events-none" />
    <div className="frame-inset" />

    <div className="absolute bottom-5 right-5 z-10 h-16 w-16 animate-fade-up md:bottom-8 md:right-8 md:h-24 md:w-24">
      <SpinningSeal />
    </div>

    <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <p
        className="animate-fade-up font-accent text-xs uppercase tracking-luxury-wide text-luxury-champagne md:text-sm"
        style={{ animationDelay: "0.05s" }}
      >
        {subtitle}
      </p>
      <h1
        className="animate-fade-up mt-4 font-display text-display-lg font-medium leading-[0.98] md:text-display-xl"
        style={{ animationDelay: "0.15s" }}
      >
        <span className="text-gold-foil">{title}</span>
      </h1>
      {lead && (
        <p
          className="animate-fade-up mx-auto mt-5 max-w-xl font-body text-lg text-luxury-champagne/80"
          style={{ animationDelay: "0.25s" }}
        >
          {lead}
        </p>
      )}
      <div className="animate-fade-up" style={{ animationDelay: "0.35s" }}>
        <Ornament className="mt-6" />
      </div>
    </div>
  </section>
);

export default PageHero;
