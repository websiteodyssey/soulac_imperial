import { photo, type MediaKey } from "../config/media";

interface PhotoProps {
  /** Clé de `config/media`. */
  name: MediaKey;
  alt?: string;
  /** Largeur d'affichage annoncée au navigateur — il choisit alors la bonne source. */
  sizes?: string;
  className?: string;
  /** Image visible d'emblée (hero) : chargée tout de suite, en priorité haute. */
  priority?: boolean;
}

/**
 * Toutes les images du site passent par ici.
 *
 * Deux sources sont proposées via `srcset` — la vignette 640 px et la grande —
 * et `width`/`height` réservent la place exacte avant l'arrivée du fichier :
 * aucun saut de mise en page, et une case de 260 px ne télécharge pas 150 ko.
 */
const Photo = ({ name, alt = "", sizes = "100vw", className = "", priority = false }: PhotoProps) => {
  const p = photo(name);
  return (
    <img
      src={p.src}
      srcSet={`${p.sm} 640w, ${p.src} ${p.w}w`}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
};

export default Photo;
