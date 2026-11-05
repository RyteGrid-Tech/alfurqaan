import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Shield, BookOpen } from "lucide-react";

export function ReadingRoomSection() {
  const journeys = [
    {
      icon: Compass,
      question: "New to Islam or seeking clarity on the fundamentals?",
      recommendation: "A Modern Introduction to Islam",
      slug: "a-modern-introduction-to-islam",
      desc: "A systematic, logical breakdown of the Articles of Faith, Shari'ah, and the moral worldview of Islam.",
    },
    {
      icon: Shield,
      question: "Need authenticated spiritual protection, peace, and daily adkhar?",
      recommendation: "Muslim Prayers for Everyday Success",
      slug: "muslim-prayers-everyday-success",
      desc: "Authentic Prophetic du'a for health, righteous sleep, marital harmony, Istikhaarah, and protection from harm.",
    },
    {
      icon: BookOpen,
      question: "Curious about theological history and the Abrahamic faiths?",
      recommendation: "Islam and Christianity: Why the Conflict?",
      slug: "islam-christianity-why-conflict",
      desc: "A forensic analysis using the Bible and early church councils to trace the shift to Trinitarian doctrine.",
    },
  ];

  return (
    <section
      id="reading"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#ece5d2] to-[#f4efe0] scroll-mt-20 overflow-hidden overflow-x-clip max-w-full w-full"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: Reading Pathways */}
        <div className="flex-1">
          <p className="text-[11px] font-sans uppercase tracking-[0.34em] text-[#8f5a26] font-semibold mb-2">
            The Reading Room · Guided Paths
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#07201a] tracking-tight mb-4">
            A Place to Begin
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#5a6b58] leading-relaxed mb-8">
            Every journey of knowledge starts with a single open page. Here are three recommended
            entry points tailored to where you stand today:
          </p>

          <div className="space-y-4 mb-8">
            {journeys.map((j) => {
              const IconComponent = j.icon;
              return (
                <div
                  key={j.slug}
                  className="p-5 bg-white/70 border border-[#0c2b22]/10 hover:border-[#c9a35c]/50 transition-colors shadow-sm"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-none bg-[#0c2b22] text-[#c9a35c] grid place-items-center shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[#0c2b22] mb-1">
                        {j.question}
                      </h4>
                      <p className="font-serif text-sm text-[#5a6b58] leading-relaxed mb-2">
                        {j.desc}
                      </p>
                      <Link
                        to="/books/$bookId"
                        params={{ bookId: j.slug }}
                        className="inline-flex items-center gap-1 text-xs font-sans uppercase tracking-wider font-semibold text-[#7d5e1a] hover:underline"
                      >
                        Explore &ldquo;{j.recommendation}&rdquo;{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="#catalogue"
            className="inline-flex items-center gap-2 min-h-[48px] px-8 py-3 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] transition-all font-sans text-xs uppercase tracking-widest font-semibold"
          >
            Find Your First Book in The Fihrist
          </a>
        </div>

        {/* Right: 3D Visual Book Stack */}
        <div className="w-full lg:w-96 flex justify-center py-6 overflow-hidden max-w-full">
          <div className="relative w-64 h-80 select-none">
            {/* Book 1 (Bottom) */}
            <div className="absolute inset-0 bg-[#1d4f3f] text-[#ece5d2] p-5 shadow-2xl border border-[#c9a35c]/30 transform rotate-6 translate-x-4 translate-y-4 transition-transform hover:rotate-3 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest font-sans text-[#c9a35c]">
                Comparative Religion
              </span>
              <h4 className="font-serif text-lg leading-snug">
                Islam and Christianity: Why the Conflict?
              </h4>
              <span className="text-xs font-serif italic text-[#8fa893]">Dr. A. A. Shittu</span>
            </div>

            {/* Book 2 (Middle) */}
            <div className="absolute inset-0 bg-[#143b2f] text-[#ece5d2] p-5 shadow-2xl border border-[#c9a35c]/30 transform -rotate-3 -translate-x-2 translate-y-2 transition-transform hover:rotate-0 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest font-sans text-[#c9a35c]">
                Du'a &amp; Adhkar
              </span>
              <h4 className="font-serif text-lg leading-snug">
                Muslim Prayers for Everyday Success
              </h4>
              <span className="text-xs font-serif italic text-[#8fa893]">Deluxe Edition</span>
            </div>

            {/* Book 3 (Top) */}
            <div className="absolute inset-0 bg-[#0c2b22] text-[#f4efe0] p-5 shadow-2xl border border-[#c9a35c]/50 transform transition-transform hover:scale-105 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest font-sans text-[#c9a35c]">
                Basics of Islam
              </span>
              <h4 className="font-serif text-xl leading-snug">A Modern Introduction to Islam</h4>
              <span className="text-xs font-serif italic text-[#c9a35c]">
                Al Furqaan Publishers Ltd
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
