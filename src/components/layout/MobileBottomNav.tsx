import React from "react";
import { useCart } from "@/lib/cart-context";
import { BookOpen, Search, ShoppingBag, UserCheck } from "lucide-react";

interface MobileBottomNavProps {
  onSearchClick?: () => void;
}

export function MobileBottomNav({ onSearchClick }: MobileBottomNavProps = {}) {
  const { totalCount, isCartOpen, setIsCartOpen, openSearchModal } = useCart();

  const handleSearch = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      openSearchModal();
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#f4efe0]/95 backdrop-blur-md border-t border-[#0c2b22]/15 px-3 pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] shadow-lg"
      aria-label="Mobile quick navigation"
    >
      <div className="grid grid-cols-4 items-center">
        {/* The Fihrist */}
        <a
          href="/#catalogue"
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-[#5a6b58] hover:text-[#0c2b22] active:text-[#c9a35c]"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] uppercase font-sans tracking-wider mt-1 font-medium">
            Fihrist
          </span>
        </a>

        {/* Search */}
        <button
          type="button"
          onClick={handleSearch}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-[#5a6b58] hover:text-[#0c2b22] active:text-[#c9a35c]"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px] uppercase font-sans tracking-wider mt-1 font-medium">
            Search
          </span>
        </button>

        {/* The Author */}
        <a
          href="/#why"
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-[#5a6b58] hover:text-[#0c2b22] active:text-[#c9a35c]"
        >
          <UserCheck className="w-4 h-4" />
          <span className="text-[10px] uppercase font-sans tracking-wider mt-1 font-medium">
            Author
          </span>
        </a>

        {/* Cart Bag */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-expanded={isCartOpen}
          aria-label={`Open shopping bag drawer, ${totalCount} items`}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-[#5a6b58] hover:text-[#0c2b22] active:text-[#c9a35c] relative focus-visible:outline-2 focus-visible:outline-[#0c2b22]"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-0.5 bg-[#c9a35c] text-[#07201a] text-[9px] font-bold rounded-full grid place-items-center">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase font-sans tracking-wider mt-1 font-medium">
            Cart ({totalCount})
          </span>
        </button>
      </div>
    </nav>
  );
}
