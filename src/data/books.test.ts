import { describe, expect, it } from "bun:test";
import {
  BOOKS,
  getAllCategories,
  getBookById,
  getRelatedBooks,
  formatPrice,
  WHATSAPP_PHONE,
  SELAR_STORE_URL,
} from "./books";

describe("Books Data Model", () => {
  it("should contain exactly 8 catalog books", () => {
    expect(BOOKS.length).toBe(8);
  });

  it("should verify official publisher contacts and Selar storefront", () => {
    expect(WHATSAPP_PHONE).toBe("+2347062716154");
    expect(SELAR_STORE_URL).toBe("https://selar.com/m/Barr-Adebayo-Shittu");
  });

  it("should have all required fields and valid Selar links for each book", () => {
    for (const book of BOOKS) {
      expect(book.id).toBeTruthy();
      expect(book.title).toBeTruthy();
      expect(book.author).toContain("Shittu");
      expect(book.category).toBeTruthy();
      expect(book.desc).toBeTruthy();
      expect(book.cover).toBeTruthy();
      expect(book.pricePrint).toBeGreaterThan(0);
      expect(book.priceEbook).toBeGreaterThan(0);
      expect(book.selarUrl).toContain("selar.com");
      expect(book.amazonUrl).toContain("amazon.com");
      expect(book.chapters.length).toBeGreaterThan(0);
      expect(book.keyThemes.length).toBeGreaterThan(0);
    }
  });

  it("should format prices correctly with Nigerian Naira symbol", () => {
    expect(formatPrice(2500)).toBe("₦2,500");
    expect(formatPrice(11999)).toBe("₦11,999");
    expect(formatPrice(6000)).toBe("₦6,000");
  });

  it("should retrieve book by id or slug", () => {
    const book = getBookById("path-to-paradise");
    expect(book).toBeDefined();
    expect(book?.title).toBe("Path to Paradise");

    const nonExistent = getBookById("non-existent-book");
    expect(nonExistent).toBeUndefined();
  });

  it("should return unique category list beginning with 'All'", () => {
    const categories = getAllCategories();
    expect(categories[0]).toBe("All");
    expect(categories.length).toBeGreaterThan(5);
    const duplicates = categories.filter((item, index) => categories.indexOf(item) !== index);
    expect(duplicates.length).toBe(0);
  });

  it("should find related books favoring matching category", () => {
    const related = getRelatedBooks("path-to-paradise", 2);
    expect(related.length).toBe(2);
    expect(related.some((b) => b.id === "path-to-paradise")).toBe(false);
  });
});
