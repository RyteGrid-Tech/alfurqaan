import { useEffect, useState } from "react";
import { BookOpen, Check, Copy, Download, Share2, X } from "lucide-react";
import { AUTHOR_NAME, formatPrice, type Book } from "@/data/books";
import { getBookOgImagePath, toAbsoluteUrl } from "@/lib/seo-meta";
import { WhatsAppIcon } from "@/components/icons/PlatformIcons";
import { toast } from "sonner";

interface SharePreviewModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SharePreviewModal({ book, isOpen, onClose }: SharePreviewModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      return undefined;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const origin =
    typeof window !== "undefined" && window.location?.origin ? window.location.origin : undefined;
  const pageUrl = toAbsoluteUrl(origin, `/books/${book.slug}`);
  const ogImagePath = getBookOgImagePath(book.id);
  const shareText = `Discover "${book.title}" by ${AUTHOR_NAME} (${book.category}) — ${book.tagline}\n\nOrder Print (${formatPrice(book.pricePrint)}) or instant Selar Ebook (${formatPrice(book.priceEbook)}): ${pageUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const supportsNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      toast.success("Book link copied cleanly.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Unable to copy link automatically.");
    }
  };

  const handleNativeShare = async () => {
    if (!supportsNativeShare) return;
    try {
      await navigator.share({
        title: `${book.title} — Al-Furqaan Publishers Ltd.`,
        text: `${book.tagline} By ${book.author}.`,
        url: pageUrl,
      });
    } catch {
      // User dismissed native share sheet
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-[#07201a]/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[92dvh] bg-[#f4efe0] text-[#0c2b22] border border-[#c9a35c]/45 shadow-2xl overflow-hidden flex flex-col">
        {/* Top Accent Rule */}
        <div className="h-1 bg-gradient-to-r from-[#0c2b22] via-[#c9a35c] to-[#0c2b22] shrink-0" />

        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#0c2b22]/10 flex items-center justify-between gap-3 bg-[#ebe3cc] shrink-0">
          <div className="min-w-0">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#7d5e1a] font-semibold block">
              Social Link &amp; Card Preview
            </span>
            <h2
              id="share-modal-title"
              className="font-serif text-lg sm:text-xl text-[#07201a] truncate"
            >
              Share {book.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close share preview modal"
            className="w-11 h-11 flex items-center justify-center border border-[#0c2b22]/15 bg-[#f4efe0] text-[#0c2b22] hover:bg-[#c9a35c] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-5">
          {/* Simulated Rich Social Link Preview Card */}
          <div className="bg-white border border-[#0c2b22]/15 shadow-sm overflow-hidden">
            <div className="aspect-[1200/630] w-full bg-[#07201a] overflow-hidden border-b border-[#c9a35c]/30">
              <img
                src={ogImagePath}
                alt={`${book.title} Open Graph social preview card`}
                width={1200}
                height={630}
                className="w-full h-full object-cover block"
              />
            </div>
            <div className="p-3.5 sm:p-4 bg-[#faf7ed] space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#546553] block truncate">
                {pageUrl.replace(/^https?:\/\//, "")}
              </span>
              <p className="font-serif text-base sm:text-lg font-medium text-[#07201a] leading-snug">
                {book.title} — Al-Furqaan Publishers
              </p>
              <p className="font-serif text-xs sm:text-sm text-[#4f6857] line-clamp-2">
                {book.tagline} Fine Print {formatPrice(book.pricePrint)} · Instant Selar Ebook{" "}
                {formatPrice(book.priceEbook)}.
              </p>
            </div>
          </div>

          {/* Action Buttons Grid (All >= 44px touch targets) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2.5 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[44px] px-4 py-2.5 bg-white text-[#0c2b22] border border-[#0c2b22]/25 hover:border-[#0c2b22] text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-700" />
              ) : (
                <Copy className="w-4 h-4 text-[#c9a35c]" />
              )}
              <span>{copied ? "Link Copied" : "Copy Book Link"}</span>
            </button>

            <a
              href={ogImagePath}
              download={`${book.slug}-alfurqaan-card.jpg`}
              className="min-h-[44px] px-4 py-2.5 bg-[#e2c380] text-[#07201a] hover:bg-[#c9a35c] text-xs font-sans uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Save 1200×630 Card</span>
            </a>

            {supportsNativeShare ? (
              <button
                type="button"
                onClick={handleNativeShare}
                className="min-h-[44px] px-4 py-2.5 border border-[#0c2b22]/25 text-[#0c2b22] hover:bg-[#0c2b22]/5 text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#c9a35c]" />
                <span>Share via Device</span>
              </button>
            ) : (
              <a
                href={book.selarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-4 py-2.5 border border-[#0c2b22]/25 text-[#0c2b22] hover:bg-[#0c2b22]/5 text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#c9a35c]" />
                <span>View on Selar</span>
              </a>
            )}
          </div>
        </div>

        {/* Safe-area Footer Note */}
        <div className="px-4 sm:px-6 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#ebe3cc] border-t border-[#0c2b22]/10 text-[11px] font-sans text-[#546553] flex items-center justify-between gap-2 shrink-0">
          <span>Rich link preview ready for WhatsApp, X &amp; LinkedIn</span>
          <span className="font-mono text-[#7d5e1a] whitespace-nowrap shrink-0">1200×630 JPG</span>
        </div>
      </div>
    </div>
  );
}
