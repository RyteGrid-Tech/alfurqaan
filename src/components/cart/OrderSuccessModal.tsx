import React from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, WHATSAPP_PHONE } from "@/data/books";
import { WhatsAppIcon } from "@/components/icons/PlatformIcons";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function OrderSuccessModal() {
  const { orderSuccessData, setOrderSuccessData } = useCart();

  if (!orderSuccessData) return null;

  const firstName = orderSuccessData.customerName.split(" ")[0] || "Reader";

  const handleClose = () => {
    setOrderSuccessData(null);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Salam Al Furqaan Publishers! I just placed order ${orderSuccessData.orderId} for ${orderSuccessData.customerName}.`,
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#07201a]/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="successModalTitle"
    >
      <div
        className="relative w-full max-w-lg bg-[#f4efe0] border border-[#0c2b22]/20 shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Islamic Ornament */}
        <span className="text-4xl text-[#c9a35c] block mb-2" aria-hidden="true">
          ۝
        </span>

        <p className="text-[11px] font-sans uppercase tracking-[0.34em] text-[#8f5a26] font-semibold">
          Order Received
        </p>

        <h2
          id="successModalTitle"
          className="font-serif text-2xl sm:text-3xl text-[#07201a] font-normal mt-1 mb-2"
        >
          Wa-alaykum as-salām, {firstName}
        </h2>

        <p className="font-serif text-sm text-[#5a6b58] leading-relaxed mb-4">
          Your book request has been received by <strong>Al Furqaan Publishers Ltd</strong>. A
          confirmation dispatch notice will reach{" "}
          <strong className="text-[#0c2b22]">{orderSuccessData.customerEmail}</strong>.
        </p>

        {/* Order Details Summary Box */}
        <div className="bg-white/60 border border-[#0c2b22]/10 p-4 text-left text-xs mb-6 space-y-2">
          <div className="flex justify-between border-b border-[#0c2b22]/10 pb-2">
            <span className="text-[#546553] uppercase font-sans">Order Ref:</span>
            <span className="font-mono font-bold text-[#0c2b22]">{orderSuccessData.orderId}</span>
          </div>

          <div className="space-y-1 py-1">
            <span className="text-[#546553] uppercase font-sans text-[10px] block">Titles:</span>
            {orderSuccessData.items.map((item, idx) => (
              <div key={idx} className="flex justify-between font-serif text-sm">
                <span>
                  {item.qty} × {item.title} ({item.format})
                </span>
                <span className="font-semibold text-[#7d5e1a]">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t border-[#0c2b22]/10 pt-2 font-serif text-base">
            <span className="font-bold text-[#0c2b22]">Total:</span>
            <span className="font-bold text-[#7d5e1a]">
              {formatPrice(orderSuccessData.totalAmount)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] px-6 py-2.5 border border-[#25D366] text-[#07201a] hover:bg-[#25D366]/10 font-sans text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Notify Publisher on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleClose}
            className="w-full min-h-[48px] px-8 py-3 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            Continue Exploring The Fihrist <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
