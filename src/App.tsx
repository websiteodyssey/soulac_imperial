import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import { initSmoothScroll, scrollToTopInstant } from "./lib/smoothScroll";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Roulette from "./pages/Roulette";
import Contact from "./pages/Contact";
import QrCodes from "./pages/QrCodes";
import LegalPage from "./pages/LegalPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTopInstant();
  }, [pathname]);
  return null;
};

const SmoothScroll = () => {
  useEffect(() => initSmoothScroll(), []);
  return null;
};

function App() {
  return (
    <CartProvider>
      <Loader />
      <CustomCursor />
      <SmoothScroll />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-imperial-ink">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/carte" element={<Menu />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/roulette" element={<Roulette />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/qr-codes" element={<QrCodes />} />
              <Route path="/mentions-legales" element={<LegalPage kind="legal" />} />
              <Route path="/confidentialite" element={<LegalPage kind="privacy" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
