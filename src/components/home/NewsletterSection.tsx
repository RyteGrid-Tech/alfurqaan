import React, { useState } from "react";
import { toast } from "sonner";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribed(true);
    toast.success("JazakAllah khayr! You are on The Reader's Letter list.", {
      description: "You'll receive quarterly scholarly essays, book excerpts, and new releases.",
    });
    setEmail("");
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f4efe0] scroll-mt-20">
      <div className="scroll-reveal-card max-w-4xl mx-auto p-8 sm:p-12 border border-[#0c2b22]/15 bg-white/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Pitch */}
        <div className="max-w-md">
          <p className="text-[11px] font-sans uppercase tracking-[0.34em] text-[#8f5a26] font-semibold mb-2">
            Stay Close · Direct Letter
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#07201a] font-normal mb-2">
            The Reader&rsquo;s Letter
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#546553] leading-relaxed">
            A reflective dispatch from Al Furqaan Publishers — new scholarly releases, book study
            notes, and free sample chapters. No noise.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0"
        >
          <div className="relative">
            <Mail className="w-4 h-4 text-[#4f6857] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@example.com"
              className="w-full sm:w-64 min-h-[48px] pl-10 pr-3.5 bg-white border border-[#0c2b22]/20 font-serif text-sm text-[#0c2b22] focus:border-[#c9a35c] focus:outline-none"
              aria-label="Email address for reader's letter"
            />
          </div>
          <button
            type="submit"
            className="min-h-[48px] px-6 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] transition-all font-sans text-xs uppercase tracking-widest font-semibold shrink-0"
          >
            {isSubscribed ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
