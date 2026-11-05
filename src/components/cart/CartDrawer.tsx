import React, { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { getBookById, formatPrice } from "@/data/books";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    totalCount,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQty,
    removeItem,
    clearCart,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#07201a]/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Your Shopping Cart"
    >
      {/* Slide-over panel */}
      <div
        className="fixed inset-y-0 right-0 flex max-w-full pl-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsCartOpen(false);
        }}
      >
        <div className="w-screen max-w-md bg-[#f4efe0] border-l border-[#0c2b22]/15 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#0c2b22]/10 flex items-center justify-between bg-[#f4efe0]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c9a35c]" />
              <h3 className="font-serif text-xl font-medium text-[#0c2b22]">Your Reading Bag</h3>
              <span className="text-xs font-sans uppercase tracking-wider text-[#5a6b58] font-semibold ml-1">
                ({totalCount} {totalCount === 1 ? "item" : "items"})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-11 h-11 grid place-items-center rounded-none text-[#5a6b58] hover:text-[#0c2b22] hover:bg-[#0c2b22]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35c]"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#0c2b22]/10">
            {items.length > 0 ? (
              items.map((item) => {
                const book = getBookById(item.bookId);
                if (!book) return null;
                const lineTotal = item.price * item.qty;

                return (
                  <div
                    key={`${item.bookId}-${item.format}`}
                    className="py-4 first:pt-0 last:pb-0 flex gap-3.5"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-22 aspect-[3/4] bg-[#07201a]/5 border border-[#0c2b22]/10 overflow-hidden shrink-0">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info & Quantity */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-medium text-[#0c2b22] line-clamp-1">
                          {book.title}
                        </h4>
                        <span className="text-[11px] font-sans uppercase tracking-wider text-[#7d5e1a] font-semibold">
                          {item.format === "print" ? "Print Edition" : "Instant Ebook"}
                        </span>
                        <div className="text-xs text-[#5a6b58] font-serif">
                          {formatPrice(item.price)} each
                        </div>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-center border border-[#0c2b22]/15 bg-white/50">
                          <button
                            type="button"
                            onClick={() => updateQty(item.bookId, item.format, item.qty - 1)}
                            className="w-8 h-8 grid place-items-center text-[#5a6b58] hover:text-[#0c2b22] hover:bg-[#0c2b22]/5 transition-colors"
                            aria-label={`Decrease quantity of ${book.title}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-sans font-bold text-[#0c2b22]">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.bookId, item.format, item.qty + 1)}
                            className="w-8 h-8 grid place-items-center text-[#5a6b58] hover:text-[#0c2b22] hover:bg-[#0c2b22]/5 transition-colors"
                            aria-label={`Increase quantity of ${book.title}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-serif text-sm font-bold text-[#0c2b22]">
                            {formatPrice(lineTotal)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.bookId, item.format)}
                            className="w-8 h-8 grid place-items-center text-[#4f6857] hover:text-red-700 transition-colors"
                            aria-label={`Remove ${book.title} from cart`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <ShoppingBag className="w-12 h-12 text-[#c9a35c]/50 mb-3" />
                <h4 className="font-serif text-xl text-[#0c2b22] mb-1">Your cart is empty</h4>
                <p className="font-serif italic text-sm text-[#5a6b58] max-w-xs mb-6">
                  Select classical and contemporary Islamic literature from The Fihrist to begin.
                </p>
                <a
                  href="#catalogue"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#0c2b22] text-[#f4efe0] text-xs uppercase font-sans font-semibold tracking-widest hover:bg-[#c9a35c] hover:text-[#07201a] transition-colors"
                >
                  Browse The Fihrist
                </a>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#0c2b22]/10 bg-[#f4efe0] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-xs uppercase tracking-wider text-[#546553] font-medium">
                  Subtotal
                </span>
                <span className="font-serif text-2xl font-bold text-[#7d5e1a]">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full min-h-[48px] px-6 py-3 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] transition-all font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#5a6b58] pt-1">
                <span>Direct delivery & digital downloads</span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="hover:text-red-700 hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
