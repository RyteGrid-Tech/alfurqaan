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
import { getRequestOrigin } from "@/lib/seo";
import { buildHomeHead } from "@/lib/seo-meta";

export const Route = createFileRoute("/")({
  loader: () => ({ origin: getRequestOrigin() }),
  head: ({ loaderData }) => buildHomeHead(loaderData?.origin),
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
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#f4efe0] text-[#0c2b22] font-serif selection:bg-[#c9a35c] selection:text-[#07201a]">
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
