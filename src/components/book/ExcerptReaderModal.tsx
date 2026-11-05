import React, { useState, useEffect } from "react";
import { getExcerptForBook } from "@/data/excerpts";
import { getBookById, formatPrice } from "@/data/books";
import { useCart } from "@/lib/cart-context";
import { SelarIcon, AmazonIcon } from "@/components/icons/PlatformIcons";
import { X, BookOpen, ExternalLink, ShoppingBag, Type, Sun, Moon, Palette } from "lucide-react";

interface ExcerptReaderModalProps {
  bookId?: string | null;
  onClose?: () => void;
}

export function ExcerptReaderModal({
  bookId: propBookId,
  onClose: propOnClose,
}: ExcerptReaderModalProps = {}) {
  const { activeExcerptBookId, closeExcerptReader, addItem, formatPrice } = useCart();
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [theme, setTheme] = useState<"parchment" | "white" | "night">("parchment");

  const effectiveBookId = propBookId !== undefined ? propBookId : activeExcerptBookId;
  const handleClose = propOnClose || closeExcerptReader;

  const book = effectiveBookId ? getBookById(effectiveBookId) : null;
  const excerpt = effectiveBookId ? getExcerptForBook(effectiveBookId) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && effectiveBookId) {
        handleClose();
      }
    };
    if (effectiveBookId) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [effectiveBookId, handleClose]);

  if (!book || !excerpt) return null;

  const fontClasses = {
    sm: "text-sm sm:text-base leading-relaxed",
    base: "text-base sm:text-lg leading-relaxed",
    lg: "text-lg sm:text-xl leading-relaxed",
    xl: "text-xl sm:text-2xl leading-relaxed",
  };

  const themeClasses = {
    parchment: "bg-[#f4efe0] text-[#0c2b22] border-[#0c2b22]/20",
    white: "bg-white text-zinc-900 border-zinc-200",
    night: "bg-[#07201a] text-[#ece5d2] border-[#c9a35c]/30",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#07201a]/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="readerModalTitle"
    >
      <div
        className={`relative w-full max-w-3xl max-h-[94vh] flex flex-col border shadow-2xl transition-colors duration-200 ${themeClasses[theme]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navigation & Customization Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-current/10 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#c9a35c]" />
            <span className="text-xs uppercase font-sans tracking-widest font-semibold">
              Look Inside · Free Preview
            </span>
          </div>

          {/* Reader Preferences (Font Size & Theme) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Font Size Selector */}
            <div
              className="flex items-center border border-current/20 p-0.5"
              title="Adjust font size"
            >
              <button
                type="button"
                onClick={() => setFontSize("sm")}
                className={`px-2 py-0.5 text-xs font-sans font-bold ${fontSize === "sm" ? "bg-[#c9a35c] text-[#07201a]" : ""}`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize("base")}
                className={`px-2 py-0.5 text-xs font-sans font-bold ${fontSize === "base" ? "bg-[#c9a35c] text-[#07201a]" : ""}`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize("lg")}
                className={`px-2 py-0.5 text-xs font-sans font-bold ${fontSize === "lg" ? "bg-[#c9a35c] text-[#07201a]" : ""}`}
              >
                A+
              </button>
            </div>

            {/* Theme Toggle */}
            <div
              className="flex items-center border border-current/20 p-0.5"
              title="Switch reading theme"
            >
              <button
                type="button"
                onClick={() => setTheme("parchment")}
                className={`p-1.5 ${theme === "parchment" ? "bg-[#c9a35c] text-[#07201a]" : ""}`}
                aria-label="Warm parchment theme"
              >
                <Palette className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme("white")}
                className={`p-1.5 ${theme === "white" ? "bg-[#c9a35c] text-[#07201a]" : ""}`}
                aria-label="Clean white theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme("night")}
                className={`p-1.5 ${theme === "night" ? "bg-[#c9a35c] text-[#07201a]" : ""}`}
                aria-label="Night emerald theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="w-10 h-10 grid place-items-center border border-current/20 hover:bg-current/10 transition-colors"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-serif">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8 pb-6 border-b border-current/10">
            <span className="font-serif text-3xl text-[#c9a35c] block mb-2 select-none">﷽</span>
            <span className="text-xs uppercase font-sans tracking-widest text-[#7d5e1a] font-semibold block mb-1">
              {book.title} · Excerpt
            </span>
            <h2
              id="readerModalTitle"
              className="font-serif text-2xl sm:text-3xl font-normal leading-snug"
            >
              {excerpt.chapterTitle}
            </h2>
            <p className="font-serif italic text-sm opacity-80 mt-1">By {book.author}</p>
          </div>

          {/* Arabic Calligraphic Snippet (if available) */}
          {excerpt.arabicSnippet && (
            <div className="my-6 p-4 sm:p-6 bg-current/5 border-l-2 border-[#c9a35c] text-center">
              <p className="font-serif text-xl sm:text-2xl text-[#c9a35c] mb-2 leading-loose dir-rtl">
                {excerpt.arabicSnippet}
              </p>
              {excerpt.transliteration && (
                <p className="font-serif italic text-xs sm:text-sm opacity-85 mb-1">
                  {excerpt.transliteration}
                </p>
              )}
              {excerpt.versesOrHadith && (
                <p className="text-xs font-sans uppercase tracking-wider opacity-75">
                  — {excerpt.versesOrHadith}
                </p>
              )}
            </div>
          )}

          {/* Excerpt Paragraphs */}
          <div className={`space-y-5 max-w-2xl mx-auto ${fontClasses[fontSize]}`}>
            {excerpt.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-[#c9a35c]"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Key Takeaway Card */}
          <div className="max-w-2xl mx-auto my-10 p-5 bg-current/5 border border-current/15">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#7d5e1a] font-bold block mb-1">
              Key Scholarly Takeaway
            </span>
            <p className="font-serif italic text-base sm:text-lg leading-relaxed">
              &ldquo;{excerpt.keyTakeaway}&rdquo;
            </p>
          </div>
        </div>

        {/* Reader Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-current/10 bg-current/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-center sm:text-left">
            <span className="text-xs font-sans uppercase tracking-wider font-semibold block">
              Enjoyed this chapter?
            </span>
            <span className="text-xs font-serif opacity-80">
              Own the full book in print or instant ebook.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <a
              href={book.selarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none min-h-[44px] px-4 py-2 bg-[#c9a35c] text-[#07201a] font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <SelarIcon className="w-3.5 h-3.5" />
              <span>Buy Ebook on Selar</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none min-h-[44px] px-4 py-2 border border-current/30 text-current hover:bg-current/10 font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5"
            >
              <AmazonIcon className="w-3.5 h-3.5 text-[#c9a35c]" />
              <span>Amazon</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              type="button"
              onClick={() => {
                addItem(book.id, "print", 1);
                handleClose();
              }}
              className="w-full sm:w-auto min-h-[44px] px-4 py-2 bg-[#0c2b22] text-[#f4efe0] font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Print ({formatPrice(book.pricePrint)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
