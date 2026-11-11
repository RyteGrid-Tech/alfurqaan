import { describe, it, expect } from "bun:test";
import { BOOKS } from "./books";
import { EXCERPTS, getExcerptForBook } from "./excerpts";

describe("Excerpts & Look Inside Data Model", () => {
  it("should have excerpts for all 8 catalog books", () => {
    expect(EXCERPTS.length).toBe(8);

    BOOKS.forEach((book) => {
      const excerpt = getExcerptForBook(book.id);
      expect(excerpt).toBeDefined();
      expect(excerpt?.bookId).toBe(book.id);
      expect(excerpt?.chapterTitle.length).toBeGreaterThan(0);
      expect(excerpt?.paragraphs.length).toBeGreaterThan(0);
      expect(excerpt?.keyTakeaway.length).toBeGreaterThan(0);
    });
  });

  it("should resolve excerpts by book slug or id interchangeably", () => {
    const book = BOOKS[0];
    const excerptById = getExcerptForBook(book.id);
    const excerptBySlug = getExcerptForBook(book.slug);

    expect(excerptById).toBeDefined();
    expect(excerptBySlug).toBeDefined();
    expect(excerptById?.bookId).toBe(excerptBySlug?.bookId);
  });

  it("should contain authentic Arabic calligraphic snippets and transliterations where available", () => {
    const excerptsWithArabic = EXCERPTS.filter((ex) => Boolean(ex.arabicSnippet));
    expect(excerptsWithArabic.length).toBeGreaterThanOrEqual(4);

    excerptsWithArabic.forEach((ex) => {
      expect(typeof ex.arabicSnippet).toBe("string");
      expect(ex.arabicSnippet!.length).toBeGreaterThan(0);
    });
  });

  it("should return null for non-existent book ids", () => {
    const invalid = getExcerptForBook("non-existent-book-id");
    expect(invalid).toBeNull();
  });
});
