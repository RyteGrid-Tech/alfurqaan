import React, { useState } from "react";
import { BOOKS, getAllCategories, type Book } from "@/data/books";
import { BookCard } from "@/components/book/BookCard";
import { SlidersHorizontal, BookOpen, Layers } from "lucide-react";

interface CatalogueSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CatalogueSection({ searchQuery, setSearchQuery }: CatalogueSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [formatFilter, setFormatFilter] = useState<"all" | "print" | "ebook">("all");

  const categories = getAllCategories();

  // Filter books by category, format, and search query
  const filteredBooks = BOOKS.filter((book: Book) => {
    // Category check
    if (activeCategory !== "All" && book.category !== activeCategory) {
      return false;
    }

    // Format filter check
    if (formatFilter === "print" && !book.printAvailable) {
      return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchAuthor = book.author.toLowerCase().includes(q);
      const matchCategory = book.category.toLowerCase().includes(q);
      const matchDesc = book.desc.toLowerCase().includes(q);
      const matchThemes = book.keyThemes.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchAuthor && !matchCategory && !matchDesc && !matchThemes) {
        return false;
      }
    }

    return true;
  });

  return (
    <section id="catalogue" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-[11px] font-sans uppercase tracking-[0.34em] text-[#8f5a26] mb-2">
          The Catalogue · Fihrist
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#07201a] tracking-tight mb-4">
          The Catalogue of Titles
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#546553] leading-relaxed">
          Every title is available as an instant ebook delivered to your device in minutes — with
          authentic scholarship by Barrister (Dr.) Abdur-Raheem Adebayo Shittu.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#0c2b22]/10">
        {/* Category Filter Chips with Horizontal Scroll on Mobile */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto touch-pan-x"
          role="tablist"
          aria-label="Filter books by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-[44px] px-4 text-xs uppercase tracking-wider whitespace-nowrap transition-all border font-sans font-medium flex items-center shrink-0 ${
                activeCategory === cat
                  ? "bg-[#0c2b22] text-[#f4efe0] border-[#0c2b22]"
                  : "bg-transparent text-[#5a6b58] border-[#0c2b22]/15 hover:border-[#c9a35c]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <span className="text-xs uppercase tracking-wider text-[#546553] font-medium hidden sm:inline flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#c9a35c]" /> Format:
          </span>
          <div className="inline-flex border border-[#0c2b22]/15 p-0.5 bg-[#0c2b22]/5">
            <button
              type="button"
              onClick={() => setFormatFilter("all")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all font-sans font-medium ${
                formatFilter === "all" ? "bg-[#0c2b22] text-[#f4efe0]" : "text-[#5a6b58]"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFormatFilter("ebook")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all font-sans font-medium ${
                formatFilter === "ebook" ? "bg-[#0c2b22] text-[#f4efe0]" : "text-[#5a6b58]"
              }`}
            >
              Ebooks
            </button>
            <button
              type="button"
              onClick={() => setFormatFilter("print")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all font-sans font-medium ${
                formatFilter === "print" ? "bg-[#0c2b22] text-[#f4efe0]" : "text-[#5a6b58]"
              }`}
            >
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {(searchQuery || activeCategory !== "All" || formatFilter !== "all") && (
        <div className="flex items-center justify-between bg-[#0c2b22]/5 px-4 py-2 mb-6 text-xs text-[#5a6b58]">
          <span>
            Showing <strong>{filteredBooks.length}</strong>{" "}
            {filteredBooks.length === 1 ? "title" : "titles"}
            {searchQuery && (
              <span>
                {" "}
                matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
              </span>
            )}
            {activeCategory !== "All" && <span> in {activeCategory}</span>}
          </span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
              setFormatFilter("all");
            }}
            className="text-[#7d5e1a] hover:underline font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Catalogue Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 border border-dashed border-[#0c2b22]/20">
          <BookOpen className="w-12 h-12 text-[#c9a35c] mx-auto mb-4 opacity-70" />
          <h3 className="font-serif text-2xl text-[#0c2b22] mb-2">No Titles Found</h3>
          <p className="font-serif italic text-[#546553] max-w-md mx-auto mb-6">
            We couldn't find any books matching your criteria. Try searching for
            &ldquo;parables&rdquo;, &ldquo;sunnah&rdquo;, or &ldquo;prayers&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
              setFormatFilter("all");
            }}
            className="px-6 py-2.5 bg-[#0c2b22] text-[#f4efe0] text-xs font-semibold uppercase tracking-widest hover:bg-[#c9a35c] hover:text-[#07201a] transition-colors"
          >
            View All Titles
          </button>
        </div>
      )}
    </section>
  );
}
