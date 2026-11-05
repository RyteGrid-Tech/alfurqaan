import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addCartItem,
  calculateCartTotals,
  CART_STORAGE_KEY,
  removeCartItem,
  updateCartItemQty,
  type BookFormat,
  type CartItem,
  type OrderSuccessSummary,
} from "./cart-store";
import { toast } from "sonner";
import { getBookById } from "@/data/books";
import { type CurrencyCode, formatWithCurrency } from "./currency";

export const CURRENCY_STORAGE_KEY = "afCurrency";

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeQuickViewId: string | null;
  setActiveQuickViewId: (id: string | null) => void;
  activeExcerptBookId: string | null;
  setActiveExcerptBookId: (id: string | null) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInNaira: number) => string;
  orderSuccessData: OrderSuccessSummary | null;
  setOrderSuccessData: (data: OrderSuccessSummary | null) => void;
  addItem: (bookId: string, format: BookFormat, qty?: number) => void;
  removeItem: (bookId: string, format: BookFormat) => void;
  updateQty: (bookId: string, format: BookFormat, newQty: number) => void;
  clearCart: () => void;
  openQuickView: (bookId: string) => void;
  closeQuickView: () => void;
  openExcerptReader: (bookId: string) => void;
  closeExcerptReader: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeQuickViewId, setActiveQuickViewId] = useState<string | null>(null);
  const [activeExcerptBookId, setActiveExcerptBookId] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [currency, setCurrencyState] = useState<CurrencyCode>("NGN");
  const [orderSuccessData, setOrderSuccessData] = useState<OrderSuccessSummary | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
      const storedCurrency = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode | null;
      if (
        storedCurrency &&
        (storedCurrency === "NGN" ||
          storedCurrency === "USD" ||
          storedCurrency === "GBP" ||
          storedCurrency === "EUR" ||
          storedCurrency === "GHS")
      ) {
        setCurrencyState(storedCurrency);
      }
    } catch (e) {
      console.warn("Failed to read cart from localStorage:", e);
    }
    setHasHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to write cart to localStorage:", e);
    }
  }, [items, hasHydrated]);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    } catch (e) {
      console.warn("Failed to write currency to localStorage:", e);
    }
  };

  const formatPrice = (amountInNaira: number) => {
    return formatWithCurrency(amountInNaira, currency);
  };

  const { totalCount, totalPrice } = calculateCartTotals(items);

  const addItem = (bookId: string, format: BookFormat, qty = 1) => {
    const book = getBookById(bookId);
    setItems((prev) => addCartItem(prev, bookId, format, qty));
    const formatLabel = format === "print" ? "Print edition" : "Ebook";
    toast.success(`${book?.title || "Book"} (${formatLabel}) added to cart`, {
      description: "Click your cart to checkout or review items.",
    });
  };

  const removeItem = (bookId: string, format: BookFormat) => {
    const book = getBookById(bookId);
    setItems((prev) => removeCartItem(prev, bookId, format));
    toast.info(`Removed ${book?.title || "item"} from your cart`);
  };

  const updateQty = (bookId: string, format: BookFormat, newQty: number) => {
    setItems((prev) => updateCartItemQty(prev, bookId, format, newQty));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openQuickView = (bookId: string) => {
    setActiveQuickViewId(bookId);
  };

  const closeQuickView = () => {
    setActiveQuickViewId(null);
  };

  const openExcerptReader = (bookId: string) => {
    setActiveExcerptBookId(bookId);
  };

  const closeExcerptReader = () => {
    setActiveExcerptBookId(null);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeQuickViewId,
        setActiveQuickViewId,
        activeExcerptBookId,
        setActiveExcerptBookId,
        isSearchModalOpen,
        setIsSearchModalOpen,
        currency,
        setCurrency,
        formatPrice,
        orderSuccessData,
        setOrderSuccessData,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openQuickView,
        closeQuickView,
        openExcerptReader,
        closeExcerptReader,
        openSearchModal,
        closeSearchModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
