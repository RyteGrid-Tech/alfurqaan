import { describe, expect, it } from "bun:test";
import {
  addCartItem,
  calculateCartTotals,
  getPriceForFormat,
  removeCartItem,
  updateCartItemQty,
  type CartItem,
} from "./cart-store";

describe("Cart Store Logic", () => {
  it("retrieves the correct price for print and ebook formats", () => {
    // Muslim Prayers: print = 11999, ebook = 6000
    expect(getPriceForFormat("muslim-prayers-everyday-success", "print")).toBe(11999);
    expect(getPriceForFormat("muslim-prayers-everyday-success", "ebook")).toBe(6000);

    // Path to Paradise: print = 2500, ebook = 2500
    expect(getPriceForFormat("path-to-paradise", "print")).toBe(2500);
    expect(getPriceForFormat("path-to-paradise", "ebook")).toBe(2500);
  });

  it("adds items to an empty cart correctly", () => {
    const initial: CartItem[] = [];
    const updated = addCartItem(initial, "path-to-paradise", "ebook", 2);
    expect(updated.length).toBe(1);
    expect(updated[0].bookId).toBe("path-to-paradise");
    expect(updated[0].format).toBe("ebook");
    expect(updated[0].qty).toBe(2);
    expect(updated[0].price).toBe(2500);
  });

  it("increments quantity when adding an identical book and format", () => {
    let items = addCartItem([], "path-to-paradise", "print", 1);
    items = addCartItem(items, "path-to-paradise", "print", 2);
    expect(items.length).toBe(1);
    expect(items[0].qty).toBe(3);
  });

  it("treats different formats of the same book as separate line items", () => {
    let items = addCartItem([], "muslim-prayers-everyday-success", "print", 1);
    items = addCartItem(items, "muslim-prayers-everyday-success", "ebook", 1);
    expect(items.length).toBe(2);
    expect(items[0].format).toBe("print");
    expect(items[0].price).toBe(11999);
    expect(items[1].format).toBe("ebook");
    expect(items[1].price).toBe(6000);
  });

  it("calculates totals accurately", () => {
    const items: CartItem[] = [
      { bookId: "path-to-paradise", format: "print", price: 2500, qty: 2 }, // 5000
      { bookId: "muslim-prayers-everyday-success", format: "ebook", price: 6000, qty: 1 }, // 6000
    ];
    const { totalCount, totalPrice } = calculateCartTotals(items);
    expect(totalCount).toBe(3);
    expect(totalPrice).toBe(11000);
  });

  it("updates quantity and removes item when quantity reaches zero", () => {
    let items: CartItem[] = [{ bookId: "path-to-paradise", format: "print", price: 2500, qty: 2 }];
    items = updateCartItemQty(items, "path-to-paradise", "print", 5);
    expect(items[0].qty).toBe(5);

    items = updateCartItemQty(items, "path-to-paradise", "print", 0);
    expect(items.length).toBe(0);
  });

  it("removes cart item explicitly", () => {
    let items: CartItem[] = [
      { bookId: "a", format: "print", price: 2500, qty: 1 },
      { bookId: "b", format: "ebook", price: 2500, qty: 1 },
    ];
    items = removeCartItem(items, "a", "print");
    expect(items.length).toBe(1);
    expect(items[0].bookId).toBe("b");
  });
});
