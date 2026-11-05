import React, { useState } from "react";
import { WhatsAppIcon } from "@/components/icons/PlatformIcons";
import { MessageSquare, X, ShieldCheck, Sparkles } from "lucide-react";
import { WHATSAPP_PHONE } from "@/data/books";

export function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  const cleanPhone = WHATSAPP_PHONE.replace(/[^0-9]/g, "");
  const defaultMessage = encodeURIComponent(
    "Salam Alaykum! I am reaching out from the Al Furqaan Publishers online bookstore. I would like assistance with book inquiries, bulk ordering, or direct payment.",
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <div
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end"
      aria-label="Al Furqaan WhatsApp Concierge"
    >
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-xs sm:w-88 bg-[#f4efe0] text-[#0c2b22] border border-[#0c2b22]/20 shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-[#0c2b22]/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0c2b22] text-[#c9a35c] grid place-items-center">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-[#0c2b22] leading-none">
                  Al Furqaan Concierge
                </h4>
                <span className="text-[10px] font-sans text-[#4f6857] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Official Publishing Desk · Live
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#5a6b58] hover:text-[#0c2b22] transition-colors"
              aria-label="Close concierge preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs font-serif leading-relaxed text-[#5a6b58]">
            <p className="mb-2">
              <strong className="text-[#0c2b22]">As-salāmu ʿalaykum.</strong> Welcome to the works
              of Barrister (Dr.) Abdur-Raheem Adebayo Shittu.
            </p>
            <p className="mb-2">
              Need expedited Nigerian courier dispatch, wholesale bookshop discounts, or direct bank
              transfer confirmation? We are ready to assist you.
            </p>
            <p className="font-sans text-[11px] text-[#0c2b22] font-semibold">
              Direct Line: 07062716154
            </p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors py-2.5 px-3"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <div className="mt-2.5 pt-2 border-t border-[#0c2b22]/10 flex items-center justify-between text-[10px] text-[#5a6b58] font-sans">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#c9a35c]" /> Verified Publisher
            </span>
            <span>Est. 1987 · Saki &amp; Ibadan</span>
          </div>
        </div>
      )}

      {/* Trigger Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group min-h-[48px] px-4 py-2.5 bg-[#0c2b22] hover:bg-[#c9a35c] text-[#f4efe0] hover:text-[#07201a] border border-[#c9a35c]/50 shadow-xl flex items-center gap-2.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35c]"
        aria-label={isOpen ? "Close WhatsApp Concierge" : "Open WhatsApp Concierge"}
        aria-expanded={isOpen}
      >
        <div className="w-7 h-7 rounded-full bg-[#25D366] text-white grid place-items-center shrink-0">
          <WhatsAppIcon className="w-4 h-4" />
        </div>
        <span className="font-sans text-xs uppercase tracking-wider font-semibold hidden sm:inline">
          {isOpen ? "Close Support" : "Book Concierge"}
        </span>
      </button>
    </div>
  );
}
