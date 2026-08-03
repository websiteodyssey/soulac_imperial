import { useEffect, useRef, type ReactNode } from "react";

interface ScrollGlideProps {
  /** Bord par lequel l'élément arrive, et par lequel il repart. */
  from: "left" | "right";
  /** Course du repli, en pourcentage de la largeur de l'élément. */
  amplitude?: number;
  /** Élément purement décoratif : il est alors retiré aux lecteurs d'écran. */
  decoratif?: boolean;
  /**
   * Largeur d'écran à partir de laquelle le glissement s'anime, en pixels.
   * En dessous, l'élément est simplement posé à sa place définitive : sur un
   * téléphone, une composition en colonne unique n'a pas la largeur nécessaire
   * pour qu'un glissement latéral veuille dire quelque chose.
   */
  aPartirDe?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Constante de temps de la poursuite, en millisecondes. Plus elle est grande,
 * plus l'élément traîne derrière le défilement — c'est ce retard qui donne le
 * glissé. Au-delà d'environ 400 ms, le mouvement devient mou.
 */
const TRAINE = 260;

/** Accélération et freinage progressifs, sans arête. */
const adoucir = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/**
 * Fait entrer un élément par un bord de l'écran à mesure qu'on approche de sa
 * section, le maintient en place tant qu'on la parcourt, puis le laisse repartir
 * par où il est venu.
 *
 * La progression est calculée sur la `<section>` qui contient l'élément, jamais
 * sur son parent direct : deux glissements posés dans la même section partagent
 * ainsi exactement la même horloge. C'est ce qui permet de les faire converger
 * — l'un par la gauche, l'autre par la droite — sans qu'ils se désynchronisent.
 *
 * Le mouvement n'est pas rivé au défilement : l'élément poursuit sa position
 * cible avec un temps de retard, recalculé à chaque image d'après le temps
 * réellement écoulé. Il glisse donc au lieu de coller à la molette, et le rendu
 * reste identique quelle que soit la fréquence de l'écran.
 *
 * La section doit être `relative overflow-hidden` : c'est elle qui masque ce
 * qui déborde.
 */
const ScrollGlide = ({
  from,
  amplitude = 100,
  decoratif = false,
  aPartirDe = 0,
  className = "",
  children,
}: ScrollGlideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const refuse = window.matchMedia("(prefers-reduced-motion: reduce)");
    const assezLarge = window.matchMedia(`(min-width: ${aPartirDe}px)`);
    let arreter = () => {};

    /** (Re)met en place le glissement, ou l'annule selon les conditions. */
    const installer = () => {
      arreter();
      arreter = () => {};

      // Mouvement refusé, ou écran trop étroit pour qu'il ait du sens :
      // l'élément est simplement posé à sa place définitive.
      if (refuse.matches || !assezLarge.matches) {
        el.style.transform = "translate3d(0, 0, 0)";
        return;
      }
      arreter = animer(el);
    };

    const repos = from === "left" ? -amplitude : amplitude;

    /** Position visée par le défilement, en pourcentage de la largeur. */
    const cible = () => {
      const section = el.closest("section");
      if (!section) return repos;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Écart du centre de la section au centre de l'écran, ramené entre 0 et 1.
      const ecart =
        (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const distance = Math.min(1, Math.abs(ecart));

      // Un palier au milieu : rien ne bouge pendant qu'on lit le bloc, et le
      // repli n'intervient qu'une fois celui-ci nettement dépassé.
      const PALIER = 0.22;
      const COURSE = 0.62;
      const brut =
        distance <= PALIER ? 1 : Math.max(0, 1 - (distance - PALIER) / COURSE);

      return repos * (1 - adoucir(brut));
    };

    /**
     * Lance la poursuite ; renvoie de quoi la démonter. L'élément est passé en
     * paramètre plutôt que capturé : la fonction pouvant être rappelée bien plus
     * tard, TypeScript ne peut plus y garantir qu'il existe encore.
     */
    function animer(noeud: HTMLDivElement) {
      let position = cible();
      let dernier = 0;
      let raf = 0;
      let anime = false;

      const image = (temps: number) => {
        const dt = dernier ? Math.min(temps - dernier, 64) : 16;
        dernier = temps;

        const vise = cible();
        // Poursuite exponentielle : indépendante de la fréquence d'affichage.
        position += (vise - position) * (1 - Math.exp(-dt / TRAINE));
        noeud.style.transform = `translate3d(${position.toFixed(2)}%, 0, 0)`;

        if (Math.abs(vise - position) > 0.05) {
          raf = requestAnimationFrame(image);
        } else {
          // Arrivée : on se cale exactement et on rend la main au navigateur.
          position = vise;
          noeud.style.transform = `translate3d(${position.toFixed(2)}%, 0, 0)`;
          anime = false;
          dernier = 0;
        }
      };

      const relancer = () => {
        if (anime) return;
        anime = true;
        dernier = 0;
        raf = requestAnimationFrame(image);
      };

      noeud.style.transform = `translate3d(${position.toFixed(2)}%, 0, 0)`;
      window.addEventListener("scroll", relancer, { passive: true });
      window.addEventListener("resize", relancer);
      return () => {
        window.removeEventListener("scroll", relancer);
        window.removeEventListener("resize", relancer);
        cancelAnimationFrame(raf);
      };
    }

    installer();
    // Le passage d'un format à l'autre — rotation du téléphone, fenêtre
    // redimensionnée — remet le glissement en place ou l'annule.
    refuse.addEventListener("change", installer);
    assezLarge.addEventListener("change", installer);
    return () => {
      arreter();
      refuse.removeEventListener("change", installer);
      assezLarge.removeEventListener("change", installer);
    };
  }, [from, amplitude, aPartirDe]);

  return (
    <div
      ref={ref}
      aria-hidden={decoratif || undefined}
      className={`will-change-transform ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default ScrollGlide;
