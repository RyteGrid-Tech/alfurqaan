import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

interface BackToTopButtonProps {
  thresholdPx?: number;
}

/**
 * Scroll-position-aware Back-to-Top control anchored on bottom-left so it never collides with the
 * bottom-right WhatsApp Concierge or mobile bottom navigation bar.
 */
export function BackToTopButton({ thresholdPx = 420 }: BackToTopButtonProps) {
  const sentinelRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsVisible(window.scrollY > thresholdPx);

    const sentinel = sentinelRef.current;
    if (sentinel && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            setIsVisible(!entry.isIntersecting);
          }
        },
        { threshold: 0 },
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > thresholdPx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [thresholdPx]);

  const handleScrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <span
        ref={sentinelRef}
        aria-hidden="true"
        style={{ height: `${thresholdPx}px` }}
        className="pointer-events-none absolute top-0 left-0 w-px"
      />
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Back to top"
        title="Back to top"
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
        className={`scroll-top-fab fixed bottom-20 md:bottom-6 left-3 sm:left-6 z-40 min-w-[44px] min-h-[44px] w-11 h-11 md:w-12 md:h-12 bg-[#0c2b22]/95 hover:bg-[#c9a35c] text-[#c9a35c] hover:text-[#07201a] border border-[#c9a35c]/45 shadow-xl backdrop-blur-sm grid place-items-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35c] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-4 h-4" aria-hidden="true" />
      </button>
    </>
  );
}
