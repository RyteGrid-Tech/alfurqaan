import { BOOKS, getBookById } from "@/data/books";

export type BookFormat = "print" | "ebook";

export interface CartItem {
  bookId: string;
  format: BookFormat;
  price: number;
  qty: number;
}

export interface OrderDetails {
  name: string;
  email: string;
  phone?: string;
  address: string;
  notes?: string;
  paymentMethod: "selar" | "direct" | "amazon";
}

export interface OrderSuccessSummary {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  items: Array<{
    title: string;
    format: BookFormat;
    qty: number;
    price: number;
  }>;
  totalAmount: number;
  paymentMethod: string;
  timestamp: string;
}

export const CART_STORAGE_KEY = "afCart";

export function calculateCartTotals(items: CartItem[]): { totalCount: number; totalPrice: number } {
  let totalCount = 0;
  let totalPrice = 0;
  for (const item of items) {
    totalCount += item.qty;
    totalPrice += item.price * item.qty;
  }
  return { totalCount, totalPrice };
}

export function getPriceForFormat(bookId: string, format: BookFormat): number {
  const book = getBookById(bookId);
  if (!book) return 0;
  return format === "print" ? book.pricePrint : book.priceEbook;
}

export function addCartItem(
  currentItems: CartItem[],
  bookId: string,
  format: BookFormat,
  qty = 1,
): CartItem[] {
  if (qty <= 0) return currentItems;
  const price = getPriceForFormat(bookId, format);
  const existingIndex = currentItems.findIndex(
    (item) => item.bookId === bookId && item.format === format,
  );

  if (existingIndex >= 0) {
    const updated = [...currentItems];
    updated[existingIndex] = {
      ...updated[existingIndex],
      qty: updated[existingIndex].qty + qty,
    };
    return updated;
  }

  return [...currentItems, { bookId, format, price, qty }];
}

export function removeCartItem(
  currentItems: CartItem[],
  bookId: string,
  format: BookFormat,
): CartItem[] {
  return currentItems.filter((item) => !(item.bookId === bookId && item.format === format));
}

export function updateCartItemQty(
  currentItems: CartItem[],
  bookId: string,
  format: BookFormat,
  newQty: number,
): CartItem[] {
  if (newQty <= 0) {
    return removeCartItem(currentItems, bookId, format);
  }
  return currentItems.map((item) => {
    if (item.bookId === bookId && item.format === format) {
      return { ...item, qty: newQty };
    }
    return item;
  });
}
