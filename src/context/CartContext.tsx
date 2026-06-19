import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  computeDiscount,
  findActivePromo,
  type PromoCode,
} from "../utils/promo";

export interface CartItem {
  id: string;
  nameKey: string;
  price: number;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  promo: PromoCode | null;
  discount: number;
  total: number;
  applyPromoCode: (code: string) => "ok" | "invalid";
  removePromo: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const ITEMS_KEY = "soulac_imperial_cart";
const PROMO_KEY = "soulac_imperial_active_promo";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(ITEMS_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [promo, setPromo] = useState<PromoCode | null>(() => {
    try {
      const raw = localStorage.getItem(PROMO_KEY);
      return raw ? (JSON.parse(raw) as PromoCode) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (promo) {
      localStorage.setItem(PROMO_KEY, JSON.stringify(promo));
    } else {
      localStorage.removeItem(PROMO_KEY);
    }
  }, [promo]);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clear = () => {
    setItems([]);
    setPromo(null);
  };

  const subtotal = useMemo(
    () => Math.round(items.reduce((sum, i) => sum + i.price * i.qty, 0) * 100) / 100,
    [items]
  );

  const discount = useMemo(
    () => (promo ? computeDiscount(promo, subtotal) : 0),
    [promo, subtotal]
  );

  const total = useMemo(() => Math.round((subtotal - discount) * 100) / 100, [subtotal, discount]);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const applyPromoCode = (code: string): "ok" | "invalid" => {
    const found = findActivePromo(code);
    if (!found) return "invalid";
    setPromo(found);
    return "ok";
  };

  const removePromo = () => setPromo(null);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        itemCount,
        subtotal,
        promo,
        discount,
        total,
        applyPromoCode,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
