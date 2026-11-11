import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getBookById, getRelatedBooks, type Book } from "@/data/books";
import { useCart } from "@/lib/cart-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { QuickViewModal } from "@/components/book/QuickViewModal";
import { ExcerptReaderModal } from "@/components/book/ExcerptReaderModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/cart/CheckoutModal";
import { OrderSuccessModal } from "@/components/cart/OrderSuccessModal";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SearchCommandModal } from "@/components/search/SearchCommandModal";
import { WhatsAppConcierge } from "@/components/layout/WhatsAppConcierge";
import {
  SelarIcon,
  AmazonIcon,
  WhatsAppIcon,
  BismillahSeal,
} from "@/components/icons/PlatformIcons";
import {
  ArrowLeft,
  ShoppingBag,
  ExternalLink,
  BookOpen,
  Calendar,
  Layers,
  FileText,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/books/$bookId")({
  loader: ({ params }) => {
    const book = getBookById(params.bookId);
    if (!book) {
      throw notFound();
    }
    return { book };
  },
  head: ({ loaderData }) => {
    const book = loaderData?.book;
    if (!book) {
      return { meta: [{ title: "Book Not Found — Al Furqaan Publishers" }] };
    }
    return {
      meta: [
        { title: `${book.title} by Dr. Adebayo Shittu — Al Furqaan Publishers` },
        { name: "description", content: book.desc },
        { property: "og:title", content: `${book.title} — Al Furqaan Publishers` },
        { property: "og:description", content: book.desc },
        { property: "og:image", content: book.cover },
        { property: "og:type", content: "book" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: book.title },
        { name: "twitter:description", content: book.desc },
        { name: "twitter:image", content: book.cover },
      ],
    };
  },
  component: BookDetailPage,
});

function BookDetailPage() {
  const { book } = Route.useLoaderData();
  const { addItem, setIsCartOpen, openExcerptReader, formatPrice } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<"print" | "ebook">("print");
  const [headerSearch, setHeaderSearch] = useState("");

  const relatedBooks = getRelatedBooks(book.id, 3);
  const currentPrice = selectedFormat === "print" ? book.pricePrint : book.priceEbook;

  const handleAddToCart = () => {
    addItem(book.id, selectedFormat, 1);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: book.desc,
          url: window.location.href,
        });
      } catch {
        // Ignored if cancelled
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#f4efe0] text-[#0c2b22] font-serif selection:bg-[#c9a35c] selection:text-[#07201a]">
      <SiteHeader searchQuery={headerSearch} setSearchQuery={setHeaderSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-[#546553] mb-8">
          <Link to="/" className="hover:text-[#0c2b22]">
            Home
          </Link>
          <span>/</span>
          <a href="/#catalogue" className="hover:text-[#0c2b22]">
            The Fihrist
          </a>
          <span>/</span>
          <span className="text-[#0c2b22] font-medium truncate max-w-xs">{book.title}</span>
        </nav>

        {/* Book Primary Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-[#0c2b22]/10">
          {/* Cover Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md aspect-[3/4] bg-[#07201a]/5 border border-[#0c2b22]/15 shadow-2xl overflow-hidden relative group">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 bg-[#e2c380] text-[#07201a] text-xs font-bold font-sans uppercase tracking-wider px-2.5 py-1 shadow-sm">
                {book.category}
              </span>
            </div>

            {/* Quick Share Action */}
            <button
              type="button"
              onClick={handleShare}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#546553] hover:text-[#0c2b22] transition-colors py-2"
            >
              <Share2 className="w-3.5 h-3.5 text-[#c9a35c]" /> Share this Book
            </button>
          </div>

          {/* Details & Actions Column */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="mb-6">
              {book.arabicTitle && (
                <span className="font-serif text-2xl text-[#c9a35c] block mb-1">
                  {book.arabicTitle}
                </span>
              )}
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#07201a] leading-tight mb-2">
                {book.title}
              </h1>
              <p className="font-serif italic text-base sm:text-lg text-[#4f6857]">
                By <strong>{book.author}</strong>
              </p>
            </div>

            {/* Publication Specs Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-sans uppercase tracking-wider text-[#546553] pb-4 mb-6 border-b border-[#0c2b22]/10">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#c9a35c]" /> {book.year} Edition
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#c9a35c]" /> {book.pages || 250} Pages
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#c9a35c]" /> ISBN:{" "}
                {book.isbn || "978-978-AlFurqaan"}
              </span>
            </div>

            {/* Synopsis */}
            <div className="prose prose-lg text-[#5a6b58] font-serif leading-relaxed mb-8">
              <p className="text-base sm:text-lg mb-4">{book.longDesc || book.desc}</p>
            </div>

            {/* Format Selection Cards */}
            <div className="mb-8">
              <h3 className="text-xs uppercase font-sans tracking-widest text-[#7d5e1a] font-semibold mb-3">
                Choose Format
              </h3>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setSelectedFormat("print")}
                  className={`p-3.5 text-left border transition-all flex flex-col justify-between ${
                    selectedFormat === "print"
                      ? "bg-[#0c2b22] text-[#f4efe0] border-[#0c2b22] shadow-md"
                      : "bg-white/60 text-[#5a6b58] border-[#0c2b22]/15 hover:border-[#c9a35c]"
                  }`}
                >
                  <span className="text-xs font-sans uppercase font-bold tracking-wider">
                    Print Edition
                  </span>
                  <span className="font-serif text-lg font-bold text-[#c9a35c] mt-1">
                    {formatPrice(book.pricePrint)}
                  </span>
                  <span className="text-[10px] font-sans opacity-80 mt-0.5">
                    Physical copy dispatched
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat("ebook")}
                  className={`p-3.5 text-left border transition-all flex flex-col justify-between ${
                    selectedFormat === "ebook"
                      ? "bg-[#0c2b22] text-[#f4efe0] border-[#0c2b22] shadow-md"
                      : "bg-white/60 text-[#5a6b58] border-[#0c2b22]/15 hover:border-[#c9a35c]"
                  }`}
                >
                  <span className="text-xs font-sans uppercase font-bold tracking-wider">
                    Instant Ebook
                  </span>
                  <span className="font-serif text-lg font-bold text-[#c9a35c] mt-1">
                    {formatPrice(book.priceEbook)}
                  </span>
                  <span className="text-[10px] font-sans opacity-80 mt-0.5">
                    Immediate PDF / ePub delivery
                  </span>
                </button>
              </div>
            </div>

            {/* Direct & Multi-Channel Actions */}
            <div className="space-y-3 max-w-md">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full min-h-[50px] px-8 py-3 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] transition-all font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart · {formatPrice(currentPrice)}
              </button>

              {/* Look Inside Free Sample Chapter Reader Trigger */}
              <button
                type="button"
                onClick={() => openExcerptReader(book.id)}
                className="w-full min-h-[46px] px-6 py-2.5 border-2 border-[#c9a35c] text-[#0c2b22] bg-[#c9a35c]/10 hover:bg-[#c9a35c]/25 transition-all font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-[#7d5e1a]" />
                <span>Read Free Sample Chapter (Look Inside)</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={book.selarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3 py-2 border border-[#c9a35c] text-[#0c2b22] hover:bg-[#c9a35c]/10 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
                >
                  <SelarIcon className="w-4 h-4 text-[#c9a35c]" />
                  <span>Buy on Selar</span>
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
            </div>
          </div>
        </div>

        {/* Chapters & Contents Breakdown */}
        {book.chapters.length > 0 && (
          <div className="py-12 border-b border-[#0c2b22]/10 max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#07201a] mb-6">
              Table of Contents &amp; Key Discourses
            </h2>
            <div className="space-y-3">
              {book.chapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/70 border border-[#0c2b22]/10 flex items-start gap-3"
                >
                  <span className="font-serif text-[#c9a35c] font-bold text-lg leading-none shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-base text-[#0c2b22] leading-snug">{ch}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Titles */}
        {relatedBooks.length > 0 && (
          <div className="py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#07201a]">
                More Works by Dr. Adebayo Shittu
              </h2>
              <Link
                to="/"
                className="text-xs font-sans uppercase tracking-wider text-[#7d5e1a] hover:underline font-semibold"
              >
                View Full Fihrist →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBooks.map((rel) => (
                <div
                  key={rel.id}
                  className="border border-[#0c2b22]/10 p-3 bg-white/60 hover:border-[#c9a35c] transition-colors flex flex-col"
                >
                  <Link
                    to="/books/$bookId"
                    params={{ bookId: rel.slug }}
                    className="aspect-[3/4] bg-[#07201a]/5 overflow-hidden mb-3 block"
                  >
                    <img
                      src={rel.cover}
                      alt={rel.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </Link>
                  <h4 className="font-serif text-base font-semibold text-[#0c2b22] line-clamp-1 mb-1">
                    <Link to="/books/$bookId" params={{ bookId: rel.slug }}>
                      {rel.title}
                    </Link>
                  </h4>
                  <span className="text-xs font-serif italic text-[#4f6857] mb-2">
                    {rel.category}
                  </span>
                  <div className="mt-auto pt-2 border-t border-[#0c2b22]/10 flex justify-between items-center text-xs">
                    <span className="font-serif font-bold text-[#7d5e1a]">
                      {formatPrice(rel.pricePrint)}
                    </span>
                    <Link
                      to="/books/$bookId"
                      params={{ bookId: rel.slug }}
                      className="text-[#0c2b22] hover:text-[#c9a35c] font-semibold"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />

      {/* Global Interactive Modals */}
      <QuickViewModal />
      <ExcerptReaderModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <SearchCommandModal />

      {/* Floating Islamic WhatsApp Concierge */}
      <WhatsAppConcierge />

      {/* Sticky Mobile Bottom Buy Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#f4efe0] border-t border-[#0c2b22]/15 p-3 flex items-center justify-between gap-3 shadow-xl">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-sans text-[#7d5e1a] font-semibold">
            {selectedFormat === "print" ? "Print" : "Ebook"}
          </span>
          <span className="font-serif text-lg font-bold text-[#0c2b22]">
            {formatPrice(currentPrice)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 min-h-[44px] bg-[#0c2b22] text-[#f4efe0] text-xs uppercase font-sans font-semibold tracking-wider flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
