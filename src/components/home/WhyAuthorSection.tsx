import React from "react";
import { Scale, Compass, BookOpenCheck, ShieldAlert } from "lucide-react";

export function WhyAuthorSection() {
  const pillars = [
    {
      num: "01",
      icon: Scale,
      title: "Scholar of Law & Faith",
      desc: "Barrister-at-Law and distinguished legal practitioner, the author writes with the forensic precision of the courtroom and the deep devotion of a strict Monotheist (Muwahhid).",
    },
    {
      num: "02",
      icon: Compass,
      title: "Logic, Not Hearsay",
      desc: "Every book tackles hard questions — Shari'ah jurisprudence, comparative religion, Bid'ah, and social justice — with evidence grounded directly in the Qur'an, authentic Sunnah, and sound reason.",
    },
    {
      num: "03",
      icon: BookOpenCheck,
      title: "Written for the Modern Believer",
      desc: "Complex classical Arabic scholarship is deconstructed into accessible language, addressing the intellectual queries of contemporary Muslims, youth, and sincere truth-seekers.",
    },
    {
      num: "04",
      icon: ShieldAlert,
      title: "Truth Without Compromise",
      desc: "From defending the pristine Prophetic tradition against cultural distortions to articulating honest public governance, every work is a fearless call to understand and embody the faith.",
    },
  ];

  return (
    <section
      id="why"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#07201a] text-[#ece5d2] relative overflow-x-clip scroll-mt-20"
    >
      {/* Background radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(800px 400px at 80% 20%, rgba(201,163,92,0.15), transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[11px] font-sans uppercase tracking-[0.34em] text-[#c9a35c] mb-2">
            About the Scholar &amp; Author
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#ece5d2] tracking-tight mb-4">
            Barrister (Dr.) Abdur-Raheem Adebayo Shittu
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#8fa893] leading-relaxed">
            Former Federal Minister of Communications of Nigeria, Second Republic legislator,
            attorney, and lifelong servant of authentic Islamic enlightenment.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.num}
                className="p-6 bg-[#0c2b22]/40 border border-[#c9a35c]/20 hover:border-[#c9a35c]/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl text-[#c9a35c] font-light opacity-80">
                      {p.num}
                    </span>
                    <IconComponent className="w-5 h-5 text-[#c9a35c]/70" />
                  </div>
                  <h3 className="font-serif text-xl text-[#ece5d2] mb-2 font-normal">{p.title}</h3>
                  <p className="font-serif text-sm text-[#8fa893] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Hadith Quote */}
        <div className="text-center max-w-2xl mx-auto pt-8 border-t border-[#c9a35c]/20">
          <span className="font-serif text-3xl text-[#c9a35c] block mb-3">﷽</span>
          <blockquote className="font-serif italic text-xl sm:text-2xl text-[#ece5d2] leading-snug mb-3">
            &ldquo;The seeking of knowledge is an obligation upon every Muslim.&rdquo;
          </blockquote>
          <cite className="text-xs uppercase tracking-widest font-sans text-[#8fa893] not-italic">
            — The Prophet Muhammad ﷺ · Collected by Ibn Mājah
          </cite>
        </div>
      </div>
    </section>
  );
}
