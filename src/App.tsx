import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ScrollLit from "./components/ScrollLit";
import Home from "./pages/Home";

// L'accueil est livré avec la page ; les autres vues sont téléchargées à la
// demande, ce qui allège d'autant le premier chargement.
const About = lazy(() => import("./pages/About"));
const Menu = lazy(() => import("./pages/Menu"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const LegalMentions = lazy(() => import("./pages/LegalMentions"));
const Privacy = lazy(() => import("./pages/Privacy"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Saut immédiat au changement de page : `scroll-behavior: smooth` animerait
    // sinon une longue remontée depuis la position précédente.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

/** Écran d'attente d'une page en cours de téléchargement — noir, sans à-coup. */
const PageFallback = () => <div className="min-h-[70svh] bg-luxury-black" aria-hidden="true" />;

/**
 * Re-monté à chaque changement d'URL pour rejouer une entrée en fondu. C'est un
 * fondu *entrant* seulement (la page précédente n'est jamais effacée vers du
 * blanc) et la coquille est noire : la page émerge du noir, sans flash.
 */
const AnimatedMain = () => {
  const { pathname } = useLocation();
  return (
    <main key={pathname} className="flex-1 animate-page-in">
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/la-maison" element={<About />} />
          <Route path="/la-carte" element={<Menu />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalMentions />} />
          <Route path="/confidentialite" element={<Privacy />} />
          {/* Toute URL inconnue revient à l'accueil — jamais d'écran vide. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </main>
  );
};

const App = () => (
  // HashRouter : le site est déployé sur GitHub Pages, sans réécriture d'URL
  // côté serveur — un rechargement sur /la-carte renverrait sinon une 404.
  <HashRouter>
    <Loader />
    <CustomCursor />
    <ScrollProgress />
    <ScrollLit />
    <ScrollToTop />
    <div className="flex min-h-screen flex-col bg-luxury-black">
      <Header />
      <AnimatedMain />
      <Footer />
    </div>
  </HashRouter>
);

export default App;
