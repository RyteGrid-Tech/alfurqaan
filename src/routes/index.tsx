import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { CatalogueSection } from "@/components/home/CatalogueSection";
import { WhyAuthorSection } from "@/components/home/WhyAuthorSection";
import { ReadingRoomSection } from "@/components/home/ReadingRoomSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { QuickViewModal } from "@/components/book/QuickViewModal";
import { ExcerptReaderModal } from "@/components/book/ExcerptReaderModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/cart/CheckoutModal";
import { OrderSuccessModal } from "@/components/cart/OrderSuccessModal";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SearchCommandModal } from "@/components/search/SearchCommandModal";
import { WhatsAppConcierge } from "@/components/layout/WhatsAppConcierge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Furqaan Publishers — Islamic Books & Ebooks by Dr. A. A. Shittu" },
      {
        name: "description",
        content:
          "Al Furqaan Publishers Ltd — authentic Islamic books & ebooks by Barrister (Dr.) Abdur-Raheem Adebayo Shittu. Rigorous legal and theological insights on Faith, Shari'ah, Du'a, and the Afterlife for the modern believer.",
      },
      {
        property: "og:title",
        content: "Al Furqaan Publishers — Islamic Books & Ebooks by Dr. A. A. Shittu",
      },
      {
        property: "og:description",
        content:
          "Official bookstore for Barrister (Dr.) Abdur-Raheem Adebayo Shittu. Buy fine print editions, instant digital ebooks via Selar, and Amazon editions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchFocus = () => {
    const el = document.getElementById("catalogue");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4efe0] text-[#0c2b22] font-serif selection:bg-[#c9a35c] selection:text-[#07201a]">
      {/* Skip to Main Content Link for Screen Readers */}
      <a
        href="#catalogue"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0c2b22] focus:text-[#f4efe0] focus:font-sans focus:text-xs focus:uppercase focus:tracking-wider focus:outline-none focus:ring-2 focus:ring-[#c9a35c]"
      >
        Skip to The Fihrist
      </a>

      {/* Main Header */}
      <SiteHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchFocus}
      />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* The Catalogue Section */}
        <CatalogueSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* About the Author Section */}
        <WhyAuthorSection />

        {/* Reading Room Section */}
        <ReadingRoomSection />

        {/* The Reader's Letter Newsletter */}
        <NewsletterSection />
      </main>

      {/* Site Footer */}
      <SiteFooter />

      {/* Interactive Modals and Drawers */}
      <QuickViewModal />
      <ExcerptReaderModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <SearchCommandModal />

      {/* Floating Islamic WhatsApp Concierge */}
      <WhatsAppConcierge />

      {/* Sticky Mobile Bottom Navigation (Visible on phones only) */}
      <MobileBottomNav />
    </div>
  );
}
