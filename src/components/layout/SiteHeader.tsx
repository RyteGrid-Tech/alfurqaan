import React, { useEffect, useState, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import { BismillahSeal } from "@/components/icons/PlatformIcons";
import { Search, ShoppingBag, Menu, X, Globe, Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { type CurrencyCode, CURRENCIES } from "@/lib/currency";

interface SiteHeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSearchSubmit?: () => void;
}

export function SiteHeader({
  searchQuery = "",
  setSearchQuery,
  onSearchSubmit,
}: SiteHeaderProps = {}) {
  const { totalCount, setIsCartOpen, openSearchModal, currency, setCurrency } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md bg-[#f4efe0]/90 border-b border-[#0c2b22]/10 ${
        isScrolled ? "shadow-md shadow-[#07201a]/5" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35c] rounded-sm shrink-0"
            aria-label="Al Furqaan Publishers — Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-[#07201a] text-[#e2c380] border border-[#c9a35c]/30 flex items-center justify-center text-lg sm:text-xl shadow-inner group-hover:border-[#c9a35c] transition-colors shrink-0">
              <BismillahSeal />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg tracking-wide text-[#0c2b22] font-medium leading-none">
                Al Furqaan <span className="hidden xs:inline">Publishers</span>
              </span>
              <span className="font-serif text-[11px] sm:text-xs italic text-[#4f6857] mt-1 hidden sm:block">
                Ltd · Est. 1987 · Works of Dr. A. A. Shittu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            <a
              href="/#catalogue"
              className="text-xs uppercase tracking-widest font-medium text-[#5a6b58] hover:text-[#0c2b22] relative py-1 transition-colors group"
            >
              The Fihrist
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c9a35c] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="/#why"
              className="text-xs uppercase tracking-widest font-medium text-[#5a6b58] hover:text-[#0c2b22] relative py-1 transition-colors group"
            >
              The Author
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c9a35c] transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="/#reading"
              className="text-xs uppercase tracking-widest font-medium text-[#5a6b58] hover:text-[#0c2b22] relative py-1 transition-colors group"
            >
              Reading Room
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c9a35c] transition-all duration-300 group-hover:w-full" />
            </a>
            <Link
              to="/admin"
              className="text-xs uppercase tracking-widest font-medium text-[#5a6b58] hover:text-[#0c2b22] relative py-1 transition-colors group flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-[#c9a35c]" />
              Admin
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c9a35c] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Currency Selector */}
            <div className="relative flex items-center" title="Select display currency">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                aria-label="Select store currency"
                className="h-10 sm:h-11 px-1.5 sm:px-2.5 bg-transparent border border-[#0c2b22]/15 text-[#0c2b22] font-sans text-xs font-semibold tracking-wider hover:border-[#c9a35c] transition-colors focus:outline-none focus:ring-1 focus:ring-[#c9a35c] cursor-pointer"
              >
                <option value="NGN">₦ NGN</option>
                <option value="USD">$ USD</option>
                <option value="GBP">£ GBP</option>
                <option value="EUR">€ EUR</option>
                <option value="GHS">GH₵ GHS</option>
              </select>
            </div>

            {/* Global Search Command Trigger */}
            <button
              type="button"
              onClick={openSearchModal}
              className="h-10 sm:h-11 px-2.5 sm:px-3 flex items-center gap-1.5 sm:gap-2 rounded-none border border-[#0c2b22]/15 text-[#5a6b58] hover:text-[#0c2b22] hover:border-[#c9a35c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35c]"
              aria-label="Search bookstore catalog (Cmd+K)"
              title="Search catalog (Cmd+K)"
            >
              <Search className="w-4 h-4 text-[#c9a35c]" />
              <span className="hidden lg:inline text-xs font-sans text-[#5a6b58]">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] font-mono bg-[#0c2b22]/5 text-[#5a6b58] border border-[#0c2b22]/10">
                ⌘K
              </kbd>
            </button>

            {/* Shopping Bag Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="w-10 h-10 sm:w-11 sm:h-11 grid place-items-center rounded-none border border-[#0c2b22]/15 text-[#5a6b58] hover:text-[#0c2b22] hover:border-[#c9a35c] transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35c]"
              aria-label={`Open shopping cart, ${totalCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#c9a35c] text-[#07201a] text-[10px] font-bold rounded-full grid place-items-center shadow-sm">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-10 h-10 sm:w-11 sm:h-11 grid place-items-center rounded-none border border-[#0c2b22]/15 text-[#5a6b58] hover:text-[#0c2b22] hover:border-[#c9a35c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a35c]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {isMobileMenuOpen && (
          <nav
            className="md:hidden py-4 border-t border-[#0c2b22]/10 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200"
            aria-label="Mobile navigation"
          >
            <a
              href="/#catalogue"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center min-h-[44px] px-3 text-sm font-medium uppercase tracking-wider text-[#0c2b22] hover:bg-[#0c2b22]/5 rounded-sm"
            >
              The Fihrist (Catalogue)
            </a>
            <a
              href="/#why"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center min-h-[44px] px-3 text-sm font-medium uppercase tracking-wider text-[#0c2b22] hover:bg-[#0c2b22]/5 rounded-sm"
            >
              About the Author
            </a>
            <a
              href="/#reading"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center min-h-[44px] px-3 text-sm font-medium uppercase tracking-wider text-[#0c2b22] hover:bg-[#0c2b22]/5 rounded-sm"
            >
              The Reading Room
            </a>
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center min-h-[44px] px-3 text-sm font-medium uppercase tracking-wider text-[#0c2b22] hover:bg-[#0c2b22]/5 rounded-sm gap-2"
            >
              <Shield className="w-4 h-4 text-[#c9a35c]" />
              Publisher Management Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
