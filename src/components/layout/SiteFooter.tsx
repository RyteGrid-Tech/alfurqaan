import React from "react";
import {
  BismillahSeal,
  SelarIcon,
  AmazonIcon,
  WhatsAppIcon,
} from "@/components/icons/PlatformIcons";
import { WHATSAPP_PHONE, SELAR_STORE_URL } from "@/data/books";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Salam Al Furqaan Publishers! I would like to inquire about bulk bookstore distribution and books.",
  )}`;

  return (
    <footer className="bg-[#f4efe0] border-t border-[#0c2b22]/10 pt-16 pb-24 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
          {/* Brand Info Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 p-0.5 bg-[#07201a] text-[#e2c380] border border-[#c9a35c]/30 flex items-center justify-center overflow-hidden shrink-0">
                <BismillahSeal className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <strong className="font-serif text-lg text-[#0c2b22] font-medium leading-none">
                  Al Furqaan Publishers Ltd
                </strong>
                <span className="font-serif text-xs italic text-[#4f6857] mt-1">
                  Est. 1987 · Saki &amp; Ibadan, Oyo State, Nigeria
                </span>
              </div>
            </div>

            <p className="font-serif text-sm text-[#5a6b58] leading-relaxed max-w-sm mb-4">
              Authentic Islamic guidance, comparative theology, and legal scholarship by{" "}
              <strong>Barrister (Dr.) Abdur-Raheem Adebayo Shittu</strong>. Dedicated to pure
              Monotheism, authenticated Sunnah, and intellectual clarity.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider font-semibold text-[#0c2b22] hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> Direct Publisher WhatsApp
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#7d5e1a] font-semibold mb-4">
              The Bookstore
            </h4>
            <ul className="space-y-2.5 text-sm font-serif text-[#5a6b58]">
              <li>
                <a href="#catalogue" className="hover:text-[#0c2b22] transition-colors">
                  The Full Fihrist
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#0c2b22] transition-colors">
                  Instant Ebooks
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#0c2b22] transition-colors">
                  Hand-finished Print Editions
                </a>
              </li>
              <li>
                <a
                  href={SELAR_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0c2b22] transition-colors inline-flex items-center gap-1"
                >
                  <SelarIcon className="w-3 h-3 text-[#c9a35c]" /> Selar Official Storefront
                </a>
              </li>
              <li>
                <a
                  href="https://amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0c2b22] transition-colors inline-flex items-center gap-1"
                >
                  <AmazonIcon className="w-3 h-3 text-[#c9a35c]" /> Amazon Books International
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#7d5e1a] font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-serif text-[#5a6b58]">
              <li>
                <a href="#why" className="hover:text-[#0c2b22] transition-colors">
                  About the Author
                </a>
              </li>
              <li>
                <a href="#reading" className="hover:text-[#0c2b22] transition-colors">
                  The Reading Room
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0c2b22] transition-colors">
                  The Reader's Letter
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0c2b22] transition-colors"
                >
                  Institutional / Wholesale Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Care & Delivery Column */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#7d5e1a] font-semibold mb-4">
              Fulfillment
            </h4>
            <ul className="space-y-2.5 text-sm font-serif text-[#5a6b58]">
              <li>
                <span className="text-[#0c2b22]">Domestic Delivery:</span> Saki, Ibadan, Lagos &amp;
                nationwide across Nigeria
              </li>
              <li>
                <span className="text-[#0c2b22]">Digital Delivery:</span> Automated instant PDF/ePub
                via Selar
              </li>
              <li>
                <span className="text-[#0c2b22]">International:</span> Amazon Worldwide
                Print-on-Demand &amp; Kindle
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tagline & Copyright */}
        <div className="pt-8 border-t border-[#0c2b22]/10 text-center text-xs font-serif text-[#5a6b58] space-y-1">
          <p>
            &copy; {currentYear} Al Furqaan Publishers Ltd. All rights reserved · Works by Barrister
            (Dr.) Abdur-Raheem Adebayo Shittu.
          </p>
          <p className="italic text-[#7d5e1a]">Knowledge is light ۝</p>
        </div>
      </div>
    </footer>
  );
}
