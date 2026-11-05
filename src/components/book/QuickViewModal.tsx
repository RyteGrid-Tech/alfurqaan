import React, { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { getBookById } from "@/data/books";
import { SelarIcon, AmazonIcon, WhatsAppIcon } from "@/components/icons/PlatformIcons";
import { X, ShoppingBag, ExternalLink, ArrowRight, BookOpen, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function QuickViewModal() {
  const { activeQuickViewId, closeQuickView, openExcerptReader, addItem, formatPrice } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<"print" | "ebook">("print");

  const book = activeQuickViewId ? getBookById(activeQuickViewId) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeQuickView();
      }
    };
    if (book) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [book, closeQuickView]);

  if (!book) return null;

  const currentPrice = selectedFormat === "print" ? book.pricePrint : book.priceEbook;

  const handleAdd = () => {
    addItem(book.id, selectedFormat, 1);
    closeQuickView();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07201a]/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qvModalTitle"
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#f4efe0] border border-[#0c2b22]/20 shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-3 right-3 z-20 w-11 h-11 grid place-items-center bg-[#f4efe0]/90 text-[#0c2b22] hover:bg-[#0c2b22] hover:text-[#f4efe0] transition-colors border border-[#0c2b22]/15 shadow-sm"
          aria-label="Close book details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Book Cover Column */}
        <div className="md:w-5/12 bg-[#07201a]/5 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#0c2b22]/10 shrink-0">
          <div className="w-48 sm:w-56 aspect-[3/4] shadow-xl overflow-hidden border border-[#0c2b22]/10">
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <div className="mt-4 text-center">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#7d5e1a] font-semibold block">
              {book.category}
            </span>
            <span className="text-xs text-[#5a6b58] font-serif italic mt-0.5 block">
              Al Furqaan Publishers Ltd · {book.year}
            </span>
          </div>
        </div>

        {/* Book Details Column */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col">
          {/* Tag & Title */}
          <div className="mb-4">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8f5a26] font-semibold">
              Authentic Islamic Literature
            </span>
            <h2
              id="qvModalTitle"
              className="font-serif text-2xl sm:text-3xl text-[#07201a] mt-1 font-normal leading-snug"
            >
              {book.title}
            </h2>
            <p className="font-serif italic text-sm text-[#4f6857] mt-1">By {book.author}</p>
          </div>

          {/* Book Synopsis */}
          <p className="font-serif text-[#5a6b58] text-sm sm:text-base leading-relaxed mb-6">
            {book.longDesc || book.desc}
          </p>

          {/* Key Themes Chips */}
          <div className="mb-6">
            <h4 className="text-[10px] uppercase font-sans tracking-widest text-[#7d5e1a] font-semibold mb-2">
              Core Themes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {book.keyThemes.map((theme) => (
                <span
                  key={theme}
                  className="text-[11px] px-2.5 py-1 bg-[#0c2b22]/5 text-[#0c2b22] border border-[#0c2b22]/10 font-sans"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Format Selection Buttons */}
          <div className="mb-6">
            <h4 className="text-[10px] uppercase font-sans tracking-widest text-[#7d5e1a] font-semibold mb-2">
              Select Edition
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat("print")}
                className={`min-h-[44px] p-2 text-left border transition-all flex flex-col justify-center ${
                  selectedFormat === "print"
                    ? "bg-[#0c2b22] text-[#f4efe0] border-[#0c2b22]"
                    : "bg-transparent text-[#5a6b58] border-[#0c2b22]/15 hover:border-[#c9a35c]"
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-semibold">
                  Print Edition
                </span>
                <span className="text-sm font-serif font-bold text-[#c9a35c]">
                  {formatPrice(book.pricePrint)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat("ebook")}
                className={`min-h-[44px] p-2 text-left border transition-all flex flex-col justify-center ${
                  selectedFormat === "ebook"
                    ? "bg-[#0c2b22] text-[#f4efe0] border-[#0c2b22]"
                    : "bg-transparent text-[#5a6b58] border-[#0c2b22]/15 hover:border-[#c9a35c]"
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-semibold">
                  Instant Ebook
                </span>
                <span className="text-sm font-serif font-bold text-[#c9a35c]">
                  {formatPrice(book.priceEbook)}
                </span>
              </button>
            </div>
          </div>

          {/* Direct Buy Actions */}
          <div className="mt-auto space-y-2.5 pt-4 border-t border-[#0c2b22]/10">
            {/* Direct Add to Cart Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="w-full min-h-[48px] px-6 py-3 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] transition-all font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart · {formatPrice(currentPrice)}
            </button>

            {/* Look Inside Excerpt Reader Button */}
            <button
              type="button"
              onClick={() => {
                closeQuickView();
                openExcerptReader(book.id);
              }}
              className="w-full min-h-[44px] px-4 py-2 border border-[#c9a35c] text-[#0c2b22] bg-[#c9a35c]/10 hover:bg-[#c9a35c]/20 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
            >
              <BookOpen className="w-4 h-4 text-[#7d5e1a]" />
              <span>Look Inside · Read Sample Chapter</span>
            </button>

            {/* Outbound Selar & Amazon Channels */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={book.selarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-3 py-2 border border-[#c9a35c] text-[#0c2b22] hover:bg-[#c9a35c]/10 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <SelarIcon className="w-4 h-4 text-[#c9a35c]" />
                <span>Buy via Selar</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-3 py-2 border border-[#0c2b22]/20 text-[#0c2b22] hover:bg-[#0c2b22]/5 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <AmazonIcon className="w-4 h-4 text-[#c9a35c]" />
                <span>Amazon Store</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            {/* Dedicated Detail Route Link */}
            <div className="pt-2 text-center">
              <Link
                to="/books/$bookId"
                params={{ bookId: book.slug }}
                onClick={closeQuickView}
                className="inline-flex items-center gap-1 text-xs font-sans uppercase tracking-wider text-[#7d5e1a] hover:underline font-semibold"
              >
                View Full Book Chapters & Excerpts <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
