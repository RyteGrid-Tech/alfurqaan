import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { getBookById, formatPrice, SELAR_STORE_URL } from "@/data/books";
import { SelarIcon, AmazonIcon, WhatsAppIcon } from "@/components/icons/PlatformIcons";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Truck, ExternalLink } from "lucide-react";

export function CheckoutModal() {
  const { items, totalPrice, isCheckoutOpen, setIsCheckoutOpen, setOrderSuccessData, clearCart } =
    useCart();

  const [activeTab, setActiveTab] = useState<"direct" | "selar" | "amazon">("direct");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState<"transfer" | "delivery">("transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCheckoutOpen) {
        setIsCheckoutOpen(false);
      }
    };
    if (isCheckoutOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCheckoutOpen, setIsCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !address.trim()) {
      setErrorMessage("Please complete your full name, email, and delivery address.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const orderId = `AF-${Date.now().toString().slice(-6)}`;
    const lineItems = items
      .map((i) => {
        const book = getBookById(i.bookId);
        return {
          title: book?.title || "Book",
          format: i.format,
          qty: i.qty,
          price: i.price,
        };
      })
      .filter(Boolean);

    // Prepare success summary
    const summary = {
      orderId,
      customerName: name.trim(),
      customerEmail: email.trim(),
      customerAddress: address.trim(),
      items: lineItems,
      totalAmount: totalPrice,
      paymentMethod:
        paymentOption === "transfer" ? "Direct Bank Transfer" : "Pay on Delivery / In-person",
      timestamp: new Date().toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      setOrderSuccessData(summary);
      clearCart();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07201a]/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkoutModalTitle"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#f4efe0] border border-[#0c2b22]/20 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 z-20 w-11 h-11 grid place-items-center bg-[#f4efe0] text-[#0c2b22] hover:bg-[#0c2b22] hover:text-[#f4efe0] transition-colors border border-[#0c2b22]/15 shadow-sm"
          aria-label="Close checkout modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <p className="text-[11px] font-sans uppercase tracking-[0.34em] text-[#8f5a26] font-semibold">
            Complete Your Order
          </p>
          <h2
            id="checkoutModalTitle"
            className="font-serif text-2xl sm:text-3xl text-[#07201a] font-normal mt-1"
          >
            Checkout & Delivery
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-[#5a6b58] mt-1">
            Select your preferred fulfillment platform or direct publisher delivery.
          </p>
        </div>

        {/* Channel Selection Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#0c2b22]/5 border border-[#0c2b22]/10 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("direct")}
            className={`min-h-[44px] px-2 py-2 text-xs uppercase tracking-wider font-sans font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "direct"
                ? "bg-[#0c2b22] text-[#f4efe0] shadow-sm"
                : "text-[#5a6b58] hover:text-[#0c2b22]"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Direct Order</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("selar")}
            className={`min-h-[44px] px-2 py-2 text-xs uppercase tracking-wider font-sans font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "selar"
                ? "bg-[#0c2b22] text-[#f4efe0] shadow-sm"
                : "text-[#5a6b58] hover:text-[#0c2b22]"
            }`}
          >
            <SelarIcon className="w-3.5 h-3.5 text-[#c9a35c]" />
            <span>Selar E-store</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("amazon")}
            className={`min-h-[44px] px-2 py-2 text-xs uppercase tracking-wider font-sans font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "amazon"
                ? "bg-[#0c2b22] text-[#f4efe0] shadow-sm"
                : "text-[#5a6b58] hover:text-[#0c2b22]"
            }`}
          >
            <AmazonIcon className="w-3.5 h-3.5 text-[#c9a35c]" />
            <span>Amazon</span>
          </button>
        </div>

        {/* Tab 1: Direct Order Form */}
        {activeTab === "direct" && (
          <form onSubmit={handleDirectSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#546553] font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ibrahim Shittu"
                  className="w-full min-h-[44px] px-3.5 bg-white border border-[#0c2b22]/20 font-serif text-base text-[#0c2b22] focus:border-[#c9a35c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#546553] font-semibold mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@example.com"
                  className="w-full min-h-[44px] px-3.5 bg-white border border-[#0c2b22]/20 font-serif text-base text-[#0c2b22] focus:border-[#c9a35c] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#546553] font-semibold mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +234 803 123 4567"
                  className="w-full min-h-[44px] px-3.5 bg-white border border-[#0c2b22]/20 font-serif text-base text-[#0c2b22] focus:border-[#c9a35c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#546553] font-semibold mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentOption}
                  onChange={(e) => setPaymentOption(e.target.value as "transfer" | "delivery")}
                  className="w-full min-h-[44px] px-3.5 bg-white border border-[#0c2b22]/20 font-serif text-base text-[#0c2b22] focus:border-[#c9a35c] focus:outline-none"
                >
                  <option value="transfer">Direct Bank Transfer (Al Furqaan Publishers)</option>
                  <option value="delivery">Pay on Delivery (Lagos / Ibadan / Saki)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-[#546553] font-semibold mb-1">
                Delivery Address (for Print) / City *
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, City, State..."
                className="w-full p-3 bg-white border border-[#0c2b22]/20 font-serif text-base text-[#0c2b22] focus:border-[#c9a35c] focus:outline-none"
              />
            </div>

            {/* Error banner */}
            {errorMessage && (
              <p className="text-xs text-red-700 bg-red-50 p-2.5 border border-red-200">
                {errorMessage}
              </p>
            )}

            {/* Order Total & Submit */}
            <div className="pt-3 border-t border-[#0c2b22]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[11px] font-sans uppercase tracking-wider text-[#546553]">
                  Total Order Amount
                </span>
                <span className="font-serif text-2xl font-bold text-[#7d5e1a]">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Processing Order..." : "Place Order With Publisher"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Selar Automated Storefront */}
        {activeTab === "selar" && (
          <div className="space-y-4">
            <div className="p-4 bg-[#c9a35c]/10 border border-[#c9a35c]/30 rounded-none">
              <div className="flex items-center gap-2 text-[#0c2b22] font-semibold text-sm mb-1">
                <ShieldCheck className="w-4 h-4 text-[#7d5e1a]" />
                <span>Instant Automated Digital Download via Selar</span>
              </div>
              <p className="text-xs font-serif text-[#5a6b58] leading-relaxed">
                Purchasing via Selar allows you to pay instantly using Nigerian Debit Cards, Bank
                Transfers, USSD, Apple Pay, PayPal, or international currencies. Upon completion,
                your PDF/ePub files are delivered immediately to your email.
              </p>
            </div>

            <h4 className="text-xs font-sans uppercase tracking-wider text-[#546553] font-semibold pt-2">
              Items in Your Bag — Buy on Selar:
            </h4>

            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {items.map((item) => {
                const book = getBookById(item.bookId);
                if (!book) return null;

                return (
                  <div
                    key={`${item.bookId}-${item.format}`}
                    className="p-3 bg-white border border-[#0c2b22]/10 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h5 className="font-serif text-sm font-semibold text-[#0c2b22]">
                        {book.title}
                      </h5>
                      <span className="text-[11px] font-sans uppercase text-[#7d5e1a]">
                        {item.format === "print" ? "Print Edition" : "Instant Ebook"} ·{" "}
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <a
                      href={book.selarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 py-2 bg-[#0c2b22] hover:bg-[#c9a35c] text-[#f4efe0] hover:text-[#07201a] text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <SelarIcon className="w-3.5 h-3.5 text-[#c9a35c]" />
                      <span>Selar Checkout</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#0c2b22]/10 text-center">
              <a
                href={SELAR_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#7d5e1a] font-semibold hover:underline"
              >
                <span>Visit Barrister Adebayo Shittu&apos;s Full Selar Storefront</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        )}

        {/* Tab 3: Amazon Books */}
        {activeTab === "amazon" && (
          <div className="space-y-4">
            <div className="p-4 bg-[#07201a]/5 border border-[#0c2b22]/20 rounded-none">
              <div className="flex items-center gap-2 text-[#0c2b22] font-semibold text-sm mb-1">
                <AmazonIcon className="w-4 h-4 text-[#c9a35c]" />
                <span>International Delivery & Kindle Editions</span>
              </div>
              <p className="text-xs font-serif text-[#5a6b58] leading-relaxed">
                For our global readers in the United Kingdom, United States, Canada, Europe, and the
                Middle East: order paperback print-on-demand copies or Kindle ebooks directly
                through Amazon for seamless worldwide logistics.
              </p>
            </div>

            <h4 className="text-xs font-sans uppercase tracking-wider text-[#546553] font-semibold pt-2">
              Items in Your Bag — Buy on Amazon:
            </h4>

            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {items.map((item) => {
                const book = getBookById(item.bookId);
                if (!book) return null;

                return (
                  <div
                    key={`${item.bookId}-${item.format}`}
                    className="p-3 bg-white border border-[#0c2b22]/10 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h5 className="font-serif text-sm font-semibold text-[#0c2b22]">
                        {book.title}
                      </h5>
                      <span className="text-[11px] font-sans uppercase text-[#7d5e1a]">
                        International Edition
                      </span>
                    </div>

                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 py-2 border border-[#0c2b22]/20 hover:border-[#c9a35c] text-[#0c2b22] hover:bg-[#c9a35c]/10 text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <AmazonIcon className="w-3.5 h-3.5 text-[#c9a35c]" />
                      <span>Amazon Page</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
