import { useEffect, useRef, useState } from "react";
import { VIDEO_PLATEAU } from "../config/media";

/**
 * Vidéo d'ambiance, muette et sans commande — un plateau servi en salle.
 *
 * Trois précautions pour ne pas peser sur la page :
 *  1. `preload="none"` + `poster` : rien n'est téléchargé tant que la vidéo
 *     n'est pas approchée du champ de vision. Le poster (40 ko) tient seul.
 *  2. Un `IntersectionObserver` monte la source à l'approche et met en pause
 *     dès que le bloc sort de l'écran : pas de décodage en arrière-plan.
 *  3. Respect de `prefers-reduced-motion` : on s'en tient alors au poster.
 */
export default function AmbianceVideo({
  label,
  className = "",
}: {
  /** Décrit la scène pour les lecteurs d'écran. */
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  /** La source a-t-elle été posée ? (une fois vrai, elle le reste) */
  const [charge, setCharge] = useState(false);
  /** Le bloc est-il à l'écran ? */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCharge(true);
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // La lecture est demandée dans un second temps, une fois la source réellement
  // posée sur l'élément : l'appeler plus tôt reviendrait à lancer une vidéo qui
  // n'existe pas encore, et le navigateur refuserait sans jamais réessayer.
  useEffect(() => {
    const el = ref.current;
    if (!el || !charge) return;

    if (visible) {
      el.play().catch(() => {
        /* lecture refusée par le navigateur : le poster reste affiché */
      });
    } else {
      el.pause();
    }
  }, [charge, visible]);

  return (
    <video
      ref={ref}
      className={className}
      poster={VIDEO_PLATEAU.poster}
      preload="none"
      autoPlay
      muted
      loop
      playsInline
      aria-label={label}
      /* La source n'est posée qu'une fois le bloc approché. */
      src={charge ? VIDEO_PLATEAU.mp4 : undefined}
    />
  );
}
