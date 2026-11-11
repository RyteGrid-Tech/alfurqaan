import React, { useState, useEffect, useRef } from "react";
import { BOOKS, type Book } from "@/data/books";
import { useCart } from "@/lib/cart-context";
import { Search, X, BookOpen, Eye, Plus, ArrowRight, CornerDownLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SearchCommandModal() {
  const {
    isSearchModalOpen,
    openSearchModal,
    closeSearchModal,
    openQuickView,
    openExcerptReader,
    addItem,
    formatPrice,
  } = useCart();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isSearchModalOpen) {
          closeSearchModal();
        } else {
          openSearchModal();
        }
      } else if (e.key === "Escape" && isSearchModalOpen) {
        closeSearchModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, openSearchModal, closeSearchModal]);

  // Focus input on open
  useEffect(() => {
    if (isSearchModalOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
    setQuery("");
    setSelectedCategory("All");
    return undefined;
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const categories = [
    "All",
    "Basics of Islam",
    "Du'a & Prayers",
    "Comparative Religion",
    "Afterlife",
    "Sunnah & Bid'ah",
    "Islamic Thought",
  ];

  const filteredBooks = BOOKS.filter((book) => {
    const matchesCat = selectedCategory === "All" || book.category === selectedCategory;
    if (!matchesCat) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    const matchTitle = book.title.toLowerCase().includes(q);
    const matchArabic = book.arabicTitle?.toLowerCase().includes(q);
    const matchDesc = book.desc.toLowerCase().includes(q);
    const matchCat = book.category.toLowerCase().includes(q);
    const matchThemes = book.keyThemes.some((t) => t.toLowerCase().includes(q));
    const matchChapters = book.chapters.some((c) => c.toLowerCase().includes(q));

    return matchTitle || matchArabic || matchDesc || matchCat || matchThemes || matchChapters;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 p-2.5 sm:p-6 overscroll-contain bg-[#07201a]/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="searchCommandTitle"
      onClick={closeSearchModal}
    >
      <div
        className="relative w-full max-w-3xl bg-[#f4efe0] text-[#0c2b22] border border-[#0c2b22]/20 shadow-2xl flex flex-col max-h-[90dvh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-1.5 px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-[#0c2b22]/15 bg-[#0c2b22]/5">
          <Search className="w-5 h-5 text-[#c9a35c] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, Tawheed, Du'a, Barzakh..."
            className="flex-1 min-w-0 min-h-[44px] bg-transparent font-serif text-base sm:text-lg text-[#0c2b22] placeholder:text-[#5a6b58]/70 focus:outline-none"
            aria-label="Search Al Furqaan bookstore catalog"
            id="searchCommandTitle"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="w-11 h-11 grid place-items-center text-[#5a6b58] hover:text-[#0c2b22] shrink-0"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={closeSearchModal}
            className="w-11 h-11 grid place-items-center border border-[#0c2b22]/20 text-[#0c2b22] hover:bg-[#0c2b22] hover:text-[#f4efe0] transition-colors shrink-0"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-3 sm:px-6 py-2 border-b border-[#0c2b22]/10 flex flex-wrap items-center gap-1.5 shrink-0 bg-[#f4efe0]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] px-3 py-1.5 text-xs font-sans whitespace-nowrap transition-all uppercase tracking-wider shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#0c2b22] text-[#f4efe0] font-semibold"
                  : "bg-transparent text-[#5a6b58] hover:text-[#0c2b22]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-6 divide-y divide-[#0c2b22]/10">
          {filteredBooks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif italic text-base text-[#5a6b58]">
                No publications found matching &ldquo;{query}&rdquo;.
              </p>
              <p className="text-xs font-sans text-[#5a6b58] mt-1">
                Try searching for &lsquo;prayers&rsquo;, &lsquo;sunnah&rsquo;,
                &lsquo;tawheed&rsquo;, or &lsquo;afterlife&rsquo;.
              </p>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="py-3.5 sm:py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-14 sm:w-16 aspect-[3/4] bg-[#07201a]/5 border border-[#0c2b22]/10 overflow-hidden shrink-0">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#7d5e1a]">
                        {book.category}
                      </span>
                      {book.arabicTitle && (
                        <span className="text-xs font-serif text-[#c9a35c] truncate">
                          {book.arabicTitle}
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-base font-semibold text-[#0c2b22] line-clamp-2 sm:line-clamp-1 leading-snug">
                      <Link
                        to="/books/$bookId"
                        params={{ bookId: book.slug }}
                        onClick={closeSearchModal}
                        className="inline-flex items-center min-h-[44px] py-1 hover:text-[#c9a35c] transition-colors"
                      >
                        {book.title}
                      </Link>
                    </h4>
                    <p className="font-serif italic text-xs text-[#5a6b58] line-clamp-1 mt-0.5">
                      {book.tagline || book.desc}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-sans">
                      <span className="font-bold text-[#7d5e1a]">
                        Print: {formatPrice(book.pricePrint)}
                      </span>
                      <span className="text-[#0c2b22]/20">·</span>
                      <span className="text-[#5a6b58]">Ebook: {formatPrice(book.priceEbook)}</span>
                    </div>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="flex flex-wrap items-center justify-end sm:justify-start gap-1.5 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      closeSearchModal();
                      openExcerptReader(book.id);
                    }}
                    className="min-h-[44px] px-2.5 py-1 text-xs font-sans font-semibold border border-[#c9a35c] text-[#0c2b22] hover:bg-[#c9a35c]/15 transition-colors flex items-center gap-1"
                    title="Look Inside sample chapter"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#7d5e1a] shrink-0" />
                    <span>Look Inside</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeSearchModal();
                      openQuickView(book.id);
                    }}
                    className="min-h-[44px] px-2.5 py-1 text-xs font-sans font-semibold border border-[#0c2b22]/15 text-[#0c2b22] hover:bg-[#0c2b22]/5 transition-colors flex items-center gap-1"
                    title="Quick View book details"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#5a6b58] shrink-0" />
                    <span>Quick View</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      addItem(book.id, "print", 1);
                    }}
                    className="min-h-[44px] px-3 py-1 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] text-xs font-sans font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                    title="Add print edition to cart"
                  >
                    <Plus className="w-3.5 h-3.5 shrink-0" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0c2b22]/5 border-t border-[#0c2b22]/10 flex items-center justify-between text-[11px] font-sans text-[#5a6b58]">
          <div className="flex items-center gap-3">
            <span>
              Press{" "}
              <kbd className="px-1.5 py-0.5 bg-white border border-[#0c2b22]/20 font-mono text-[10px]">
                ESC
              </kbd>{" "}
              to exit
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">
              Press{" "}
              <kbd className="px-1.5 py-0.5 bg-white border border-[#0c2b22]/20 font-mono text-[10px]">
                Cmd+K
              </kbd>{" "}
              anytime
            </span>
          </div>
          <span>{filteredBooks.length} titles available</span>
        </div>
      </div>
    </div>
  );
}
