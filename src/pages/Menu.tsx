import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ShoppingBag, Leaf, Flame, Star, Plus, UtensilsCrossed } from "lucide-react";
import PageHero from "../components/PageHero";
import CartDrawer from "../components/CartDrawer";
import Reveal from "../components/Reveal";
import ImageReveal from "../components/ImageReveal";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menu";
import { useCart } from "../context/CartContext";
import { media } from "../config/media";

const TAG_ICONS = {
  veggie: Leaf,
  spicy: Flame,
  popular: Star,
};

// Representative food photography per category (we cycle within each list).
const CATEGORY_IMAGES: Record<string, string[]> = {
  sushiSashimi: [media.dishes.sushi, media.dishes.sashimi, media.gallery[2]],
  maki: [media.dishes.rolls, media.gallery[5], media.gallery[8]],
  dimSum: [media.gallery[4], media.gallery[7], media.dishes.bowl],
  wok: [media.dishes.table, media.gallery[3], media.gallery[9]],
  yakitori: [media.gallery[6], media.gallery[10], media.gallery[11]],
  soup: [media.dishes.ramen, media.dishes.bowl, media.gallery[3]],
  dessert: [media.gallery[7], media.gallery[11], media.dishes.bowl],
  drinks: [media.gallery[1], media.gallery[9], media.gallery[5]],
};
const fallbackImages = media.gallery;

const Menu = () => {
  const { t } = useTranslation();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get("table");
  const [activeCat, setActiveCat] = useState<string>(MENU_CATEGORIES[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveCat(e.target.id.replace("cat-", ""));
        });
      },
      { rootMargin: "-22% 0px -68% 0px", threshold: 0 }
    );
    MENU_CATEGORIES.forEach((cat) => {
      const el = document.getElementById(`cat-${cat}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (cat: string) => {
    const el = document.getElementById(`cat-${cat}`);
    if (el) {
      const offset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div>
      <PageHero title={t("menu.pageTitle")} subtitle={t("menu.pageSubtitle")} />

      <section className="py-10 bg-imperial-ink border-b border-imperial-gold/20">
        <div className="section-padding text-center max-w-2xl mx-auto">
          {tableNumber ? (
            <p className="font-body text-imperial-cream leading-relaxed inline-flex items-center gap-2 justify-center">
              <UtensilsCrossed size={18} className="text-imperial-gold" />
              {t("menu.tableBanner", { number: tableNumber })}
            </p>
          ) : (
            <p className="font-body text-imperial-cream/70 leading-relaxed">{t("menu.clickCollectNote")}</p>
          )}
        </div>
      </section>

      <div className="sticky top-[52px] z-30 bg-imperial-ink/95 backdrop-blur-md border-y border-imperial-gold/25 shadow-lg shadow-black/20">
        <div className="section-padding overflow-x-auto">
          <div className="flex gap-2.5 py-3.5 min-w-max">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCat === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => scrollToCategory(cat)}
                  className={`font-body uppercase text-xs tracking-[0.18em] rounded-full px-4 py-2 border transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-imperial-gold text-imperial-ink border-imperial-gold font-medium"
                      : "text-imperial-cream/75 hover:text-imperial-gold border-imperial-gold/30 hover:border-imperial-gold"
                  }`}
                >
                  {t(`menu.categories.${cat}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu list over a softly moving background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-imperial-ink" />
        <div className="absolute inset-0 animate-pan bg-[radial-gradient(40%_50%_at_15%_10%,rgba(181,144,79,0.14),transparent_60%),radial-gradient(45%_55%_at_90%_85%,rgba(124,34,33,0.10),transparent_60%)] bg-[length:200%_200%]" />
        <div className="absolute inset-0 bg-asanoha opacity-[0.04]" />

        <div className="section-padding py-12 md:py-16 space-y-14 relative">
          {MENU_CATEGORIES.map((cat, ci) => (
            <Reveal as="section" key={cat} className="scroll-mt-28">
              <span id={`cat-${cat}`} className="block scroll-mt-28" />
              <div className="flex items-center gap-4 sm:gap-6 mb-9">
                <span className="font-display text-5xl sm:text-7xl leading-none text-imperial-gold/30">
                  {`0${ci + 1}`}
                </span>
                <div>
                  <h2 className="text-display-md sm:text-display-lg font-display text-imperial-cream leading-none">
                    {t(`menu.categories.${cat}`)}
                  </h2>
                  <div className="h-[3px] w-24 mt-3 bg-gradient-to-r from-imperial-gold to-imperial-red" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MENU_ITEMS.filter((item) => item.category === cat).map((item, idx) => {
                  const imgs = CATEGORY_IMAGES[cat] ?? fallbackImages;
                  const img = imgs[idx % imgs.length];
                  return (
                  <div key={item.id} className="imperial-card group flex flex-col overflow-hidden">
                    <ImageReveal
                      src={img}
                      alt={t(`menu.items.${item.id}.name`)}
                      className="aspect-[4/3]"
                      panel="ink"
                      imgClassName="group-hover:scale-110"
                    >
                      <span className="absolute top-3 right-3 z-10 bg-imperial-ink/80 text-imperial-gold font-display text-base px-2.5 py-1">
                        {item.price.toFixed(2)} €
                      </span>
                    </ImageReveal>
                    <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-xl text-imperial-cream mb-1">{t(`menu.items.${item.id}.name`)}</h3>
                    <p className="font-body font-light text-sm text-imperial-cream/70 leading-relaxed flex-1">
                      {t(`menu.items.${item.id}.desc`)}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        {(item.tags ?? []).map((tag) => {
                          const Icon = TAG_ICONS[tag];
                          return (
                            <span key={tag} title={t(`menu.tags.${tag}`)} className="text-imperial-jade">
                              <Icon size={16} strokeWidth={1.5} />
                            </span>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          cart.addItem({ id: item.id, nameKey: `menu.items.${item.id}.name`, price: item.price })
                        }
                        className="flex items-center gap-1.5 border border-imperial-gold/60 text-imperial-cream hover:bg-imperial-gold hover:text-imperial-ink transition-colors text-xs uppercase tracking-[0.15em] px-3.5 py-2"
                      >
                        <Plus size={14} /> {t("menu.addToCart")}
                      </button>
                    </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-imperial-ink text-imperial-cream px-5 py-4 shadow-xl hover:bg-imperial-ink-light transition-colors"
        aria-label={t("common.cart")}
      >
        <ShoppingBag size={20} />
        <span className="font-body uppercase text-sm tracking-imperial">{t("menu.viewCart")}</span>
        {cart.itemCount > 0 && (
          <span className="bg-imperial-gold text-imperial-ink text-xs font-semibold rounded-full h-6 w-6 flex items-center justify-center">
            {cart.itemCount}
          </span>
        )}
      </button>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} tableNumber={tableNumber} />
    </div>
  );
};

export default Menu;
