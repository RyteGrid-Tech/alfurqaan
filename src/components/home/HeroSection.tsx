import React from "react";
import { BOOKS } from "@/data/books";
import { ArrowDown, BookOpen } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative lg:min-h-[76dvh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 overflow-x-clip max-w-full w-full bg-[#f4efe0]">
      {/* Classical Geometric Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 overflow-hidden max-w-full">
        <svg
          className="w-[min(65vw,450px)] h-[min(65vw,450px)] max-w-full max-h-full animate-[spin_60s_linear_infinite]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="#c9a35c"
          strokeWidth="0.5"
          aria-hidden="true"
        >
          <path d="M100 10 L123 77 L190 100 L123 123 L100 190 L77 123 L10 100 L77 77 Z" />
          <path d="M100 30 L117 83 L170 100 L117 117 L100 170 L83 117 L30 100 L83 83 Z" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="88" />
        </svg>
      </div>

      <div className="relative z-10 w-full min-w-0 max-w-4xl mx-auto flex flex-col items-center">
        {/* Bismillah Header */}
        <div className="mb-4 sm:mb-6 flex flex-col items-center">
          <span className="font-serif text-2xl sm:text-4xl text-[#c9a35c] select-none mb-1">﷽</span>
          <span className="font-serif italic text-xs sm:text-base text-[#4f6857]">
            In the name of Allah, the Most Merciful, the Most Compassionate
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-[clamp(2.15rem,9vw,4.5rem)] font-normal leading-[1.08] text-[#07201a] tracking-tight mb-4 sm:mb-6 break-words">
          <span className="block">True knowledge,</span>
          <span className="block text-[#9a7420]">beautifully bound.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="font-serif text-base sm:text-xl text-[#5a6b58] leading-relaxed max-w-2xl mb-6 sm:mb-10">
          Authentic Islamic guidance by{" "}
          <strong className="text-[#0c2b22] font-semibold">
            Barrister (Dr.) Abdur-Raheem Adebayo Shittu
          </strong>{" "}
          — logical insights on Faith, Shari'ah, and the Afterlife for the modern believer.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-7 sm:mb-10">
          <a
            href="#catalogue"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] transition-all duration-300 uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2 border border-[#0c2b22] hover:border-[#c9a35c] shadow-sm"
          >
            Browse the Fihrist <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#why"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-transparent text-[#0c2b22] hover:border-[#c9a35c] hover:text-[#c9a35c] transition-all duration-300 uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2 border border-[#0c2b22]/25"
          >
            About the Author <BookOpen className="w-4 h-4" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-5 sm:gap-x-6 text-[11px] sm:text-xs uppercase tracking-wider text-[#4f6857] font-sans">
          <span className="flex items-center gap-1.5">
            <span className="text-[#c9a35c]">✦</span> Instant Ebooks & Print
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#c9a35c]">✦</span> Selar Automated Digital Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#c9a35c]">✦</span> Amazon Worldwide Dispatch
          </span>
        </div>
      </div>

      {/* Marquee Ticker Track */}
      <div
        className="w-full min-w-0 max-w-full mt-8 sm:mt-14 bg-[#07201a] py-3 overflow-x-clip overflow-y-hidden select-none"
        aria-hidden="true"
      >
        <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
          {[...BOOKS, ...BOOKS].map((b, idx) => (
            <span
              key={`${b.id}-${idx}`}
              className="inline-flex items-center font-serif text-sm italic text-[#c9a35c] mx-4"
            >
              <span className="text-xs not-italic mr-3 text-[#e2c380]">﷽</span>
              {b.title}
              <span className="mx-3 text-[#8fa893]">❖</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
