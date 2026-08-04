import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/** Adresse publique du site — sert de base aux URL canoniques. */
const SITE_URL = "https://soulac-imperial.pages.dev/";

/** À chaque route correspond la clé de traduction de son titre et de son résumé. */
const CLES: Record<string, string> = {
  "/": "home",
  "/la-maison": "about",
  "/la-carte": "menu",
  "/galerie": "gallery",
  "/contact": "contact",
  "/mentions-legales": "legal",
  "/confidentialite": "privacy",
};

/** Pose (ou met à jour) une balise <meta> identifiée par `name` ou `property`. */
const meta = (cle: "name" | "property", valeur: string, contenu: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${cle}="${valeur}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(cle, valeur);
    document.head.appendChild(el);
  }
  el.setAttribute("content", contenu);
};

/**
 * Donne à chaque page son propre titre et son propre résumé.
 *
 * Sans cela, les sept vues du site partagent le titre écrit dans `index.html` :
 * les moteurs de recherche, les onglets du navigateur et les aperçus partagés
 * affichent tous la même chose. Le composant met aussi `<html lang>` en accord
 * avec la langue choisie — un lecteur d'écran prononcerait sinon l'anglais avec
 * l'accent français.
 */
export default function DocumentHead() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const langue = i18n.language.startsWith("en") ? "en" : "fr";
    document.documentElement.lang = langue;

    const cle = CLES[pathname] ?? "home";
    const titre = t(`seo.${cle}.title`);
    const resume = t(`seo.${cle}.description`);
    // Le fragment fait partie de l'adresse réelle de la page : on le conserve.
    const url = pathname === "/" ? SITE_URL : `${SITE_URL}#${pathname}`;

    document.title = titre;
    meta("name", "description", resume);
    meta("property", "og:title", titre);
    meta("property", "og:description", resume);
    meta("property", "og:url", url);
    meta("property", "og:locale", langue === "en" ? "en_GB" : "fr_FR");
    meta("name", "twitter:title", titre);
    meta("name", "twitter:description", resume);

    let canonique = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonique) {
      canonique = document.createElement("link");
      canonique.rel = "canonical";
      document.head.appendChild(canonique);
    }
    canonique.href = url;
  }, [pathname, i18n.language, t]);

  return null;
}
