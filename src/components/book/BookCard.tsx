import React, { useState } from "react";
import { type Book } from "@/data/books";
import { useCart } from "@/lib/cart-context";
import { SelarIcon, AmazonIcon } from "@/components/icons/PlatformIcons";
import { Plus, Eye, ExternalLink, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addItem, openQuickView, openExcerptReader, formatPrice } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<"print" | "ebook">("print");

  const currentPrice = selectedFormat === "print" ? book.pricePrint : book.priceEbook;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(book.id, selectedFormat, 1);
  };

  const handleOpenExcerpt = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openExcerptReader(book.id);
  };

  return (
    <article
      className="group flex flex-col bg-[#f4efe0] rounded-none border border-[#0c2b22]/10 p-3 sm:p-4 transition-all duration-300 hover:border-[#c9a35c]/50 hover:shadow-lg hover:shadow-[#07201a]/5"
      aria-label={`${book.title}, ${formatPrice(currentPrice)}`}
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#07201a]/5 mb-3.5 group/cover">
        <button
          type="button"
          onClick={() => openQuickView(book.id)}
          className="w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35c] block"
          aria-label={`View details of ${book.title}`}
        >
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/cover:scale-105"
          />
        </button>

        {/* Category Badge */}
        <span className="absolute top-2.5 right-2.5 bg-[#e2c380] text-[#07201a] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 shadow-sm select-none pointer-events-none">
          {book.category}
        </span>

        {/* Interactive Hover Actions Overlay */}
        <div className="absolute inset-0 bg-[#07201a]/60 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
          <button
            type="button"
            onClick={() => openQuickView(book.id)}
            className="w-full max-w-[160px] bg-[#f4efe0] text-[#0c2b22] hover:bg-[#c9a35c] hover:text-[#07201a] text-xs uppercase tracking-wider font-semibold px-3 py-2 flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#c9a35c]" /> Quick View
          </button>
          <button
            type="button"
            onClick={handleOpenExcerpt}
            className="w-full max-w-[160px] bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] text-xs uppercase tracking-wider font-semibold px-3 py-2 flex items-center justify-center gap-1.5 shadow-md transition-colors border border-[#c9a35c]/40"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#c9a35c]" /> Look Inside
          </button>
        </div>
      </div>

      {/* Format Toggle Pill Switcher */}
      <div
        className="flex items-center gap-1.5 mb-2.5"
        role="group"
        aria-label={`Select format for ${book.title}`}
      >
        <button
          type="button"
          onClick={() => setSelectedFormat("print")}
          className={`flex-1 min-h-[36px] py-1 px-1.5 sm:px-2 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider border transition-all truncate text-center ${
            selectedFormat === "print"
              ? "bg-[#0c2b22] text-[#f4efe0] border-[#0c2b22]"
              : "bg-transparent text-[#5a6b58] border-[#0c2b22]/15 hover:border-[#c9a35c]"
          }`}
          aria-pressed={selectedFormat === "print"}
        >
          Print {formatPrice(book.pricePrint)}
        </button>
        <button
          type="button"
          onClick={() => setSelectedFormat("ebook")}
          className={`flex-1 min-h-[36px] py-1 px-1.5 sm:px-2 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider border transition-all truncate text-center ${
            selectedFormat === "ebook"
              ? "bg-[#0c2b22] text-[#f4efe0] border-[#0c2b22]"
              : "bg-transparent text-[#5a6b58] border-[#0c2b22]/15 hover:border-[#c9a35c]"
          }`}
          aria-pressed={selectedFormat === "ebook"}
        >
          Ebook {formatPrice(book.priceEbook)}
        </button>
      </div>

      {/* Title & Author */}
      <h3 className="font-serif text-base sm:text-lg font-medium text-[#0c2b22] line-clamp-2 leading-snug mb-1">
        <Link
          to="/books/$bookId"
          params={{ bookId: book.slug }}
          className="hover:text-[#c9a35c] transition-colors"
        >
          {book.title}
        </Link>
      </h3>
      <p className="font-serif italic text-xs sm:text-sm text-[#4f6857] mb-3">{book.author}</p>

      {/* Footer Price & Add To Cart */}
      <div className="mt-auto pt-3 border-t border-[#0c2b22]/10 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-sans text-[#7d5e1a] tracking-wider">
            {selectedFormat === "print" ? "Print Edition" : "Instant Ebook"}
          </span>
          <span className="font-serif text-lg font-semibold text-[#7d5e1a]">
            {formatPrice(currentPrice)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="min-h-[44px] min-w-[44px] px-3 bg-[#0c2b22] hover:bg-[#c9a35c] text-[#f4efe0] hover:text-[#07201a] transition-all flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
          aria-label={`Add ${book.title} (${selectedFormat}) to cart`}
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Outbound Quick Channels (Selar & Amazon) */}
      <div className="mt-2.5 pt-2 border-t border-[#0c2b22]/5 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] text-[#5a6b58]">
        <a
          href={book.selarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-[#0c2b22] transition-colors py-1"
          title="Buy instant digital copy on Selar"
        >
          <SelarIcon className="w-3 h-3 text-[#c9a35c]" />
          <span>Selar Buy</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>

        <span className="text-[#0c2b22]/20 hidden xs:inline">·</span>

        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-[#0c2b22] transition-colors py-1"
          title="Order paperback or Kindle on Amazon"
        >
          <AmazonIcon className="w-3 h-3 text-[#c9a35c]" />
          <span>Amazon</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>

        <span className="text-[#0c2b22]/20 hidden xs:inline">·</span>

        <Link
          to="/books/$bookId"
          params={{ bookId: book.slug }}
          className="text-[#7d5e1a] hover:underline font-medium py-1"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}
