import { describe, it, expect } from "bun:test";
import fs from "node:fs";
import path from "node:path";

describe("Mobile Viewport Overflow & Responsive Modal Guardrails", () => {
  it("enforces html and body overflow-x clip with progressive fallback and sticky scroll padding", () => {
    const cssPath = path.resolve(import.meta.dir, "../styles.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    expect(content).toContain("html {");
    expect(content).toContain("overflow-x: hidden;");
    expect(content).toContain("overflow-x: clip;");
    expect(content).toContain("scroll-padding-top:");
    expect(content).toContain("max-width: 100%;");
    expect(content).toContain("width: 100%;");
    expect(content).toContain("body {");
  });

  it("enforces overflow-x-clip on RootShell in __root.tsx so sticky header works", () => {
    const rootPath = path.resolve(import.meta.dir, "../routes/__root.tsx");
    const content = fs.readFileSync(rootPath, "utf-8");

    expect(content).toContain('className="overflow-x-clip max-w-full w-full"');
  });

  it("stacks Al-Furqaan and Publishers Ltd. visibly on all screen sizes and clips seal square", () => {
    const headerPath = path.resolve(import.meta.dir, "../components/layout/SiteHeader.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    expect(content).toContain("Al-Furqaan");
    expect(content).toContain("Publishers Ltd.");
    expect(content).not.toContain("hidden xs:inline");
    expect(content).toContain("hidden md:flex");
    expect(content).toContain("min-w-0");
    expect(content).toContain("overflow-hidden");
    expect(content).toContain("aria-expanded={isCartOpen}");
  });

  it("renders BismillahSeal as a bounded SVG so glyph metrics never overflow header box", () => {
    const iconsPath = path.resolve(import.meta.dir, "../components/icons/PlatformIcons.tsx");
    const content = fs.readFileSync(iconsPath, "utf-8");

    expect(content).toContain('viewBox="0 0 40 40"');
  });

  it("keeps mobile hero opening vertical spacing compact without min-h-[85vh] squeeze", () => {
    const heroPath = path.resolve(import.meta.dir, "../components/home/HeroSection.tsx");
    const content = fs.readFileSync(heroPath, "utf-8");

    expect(content).toContain("pt-6 sm:pt-10 lg:pt-12");
    expect(content).toContain("lg:min-h-[76dvh]");
    expect(content).not.toContain("min-h-[85vh]");
    expect(content).toContain("overflow-x-clip");
    expect(content).toContain("overflow-hidden max-w-full");
    expect(content).toContain("max-w-full max-h-full");
  });

  it("contains 3D card transforms in ReadingRoomSection.tsx", () => {
    const rrPath = path.resolve(import.meta.dir, "../components/home/ReadingRoomSection.tsx");
    const content = fs.readFileSync(rrPath, "utf-8");

    expect(content).toContain('id="reading"');
    expect(content).toContain("overflow-hidden");
  });

  it("enforces mobile-responsive modals, overscroll-contain, dvh bounds, and 44px CartDrawer steppers", () => {
    const modalFiles = [
      "../components/cart/CartDrawer.tsx",
      "../components/cart/CheckoutModal.tsx",
      "../components/cart/OrderSuccessModal.tsx",
      "../components/book/QuickViewModal.tsx",
      "../components/book/ExcerptReaderModal.tsx",
      "../components/search/SearchCommandModal.tsx",
    ];

    for (const rel of modalFiles) {
      const content = fs.readFileSync(path.resolve(import.meta.dir, rel), "utf-8");
      expect(content).toContain("overscroll-contain");
      expect(content).not.toContain("document.body.style.overflow");
    }

    const cartContent = fs.readFileSync(
      path.resolve(import.meta.dir, "../components/cart/CartDrawer.tsx"),
      "utf-8",
    );
    expect(cartContent).toContain("h-[100dvh]");
    expect(cartContent).toContain("w-11 h-11");
    expect(cartContent).toContain("min-h-0");
    expect(cartContent).toContain("env(safe-area-inset-bottom)");

    const checkoutContent = fs.readFileSync(
      path.resolve(import.meta.dir, "../components/cart/CheckoutModal.tsx"),
      "utf-8",
    );
    expect(checkoutContent).toContain("max-h-[92dvh]");
    expect(checkoutContent).toContain("flex-col sm:flex-row");
  });

  it("includes live status region in CatalogueSection and high-contrast focus ring in BookCard", () => {
    const catContent = fs.readFileSync(
      path.resolve(import.meta.dir, "../components/home/CatalogueSection.tsx"),
      "utf-8",
    );
    expect(catContent).toContain('aria-live="polite"');

    const cardContent = fs.readFileSync(
      path.resolve(import.meta.dir, "../components/book/BookCard.tsx"),
      "utf-8",
    );
    expect(cardContent).toContain("focus-visible:outline-[#0c2b22]");
    expect(cardContent).toContain("min-h-[44px]");
  });

  it("verifies Cloudflare build scripts in package.json", () => {
    const pkgPath = path.resolve(import.meta.dir, "../../package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    expect(pkg.scripts["build:workers"]).toBeDefined();
    expect(pkg.scripts["build:pages"]).toBeDefined();
    expect(pkg.scripts["deploy:workers"]).toBeDefined();
    expect(pkg.scripts["deploy:pages"]).toBeDefined();
  });

  it("enforces 44px touch targets and toast suppression across reader, search, cart, and checkout overlays", () => {
    const readerContent = fs.readFileSync(
      path.resolve(import.meta.dir, "../components/book/ExcerptReaderModal.tsx"),
      "utf-8",
    );
    expect(readerContent).toContain("min-w-[44px] min-h-[44px]");

    const searchContent = fs.readFileSync(
      path.resolve(import.meta.dir, "../components/search/SearchCommandModal.tsx"),
      "utf-8",
    );
    expect(searchContent).toContain("flex-wrap");
    expect(searchContent).toContain("min-h-[44px]");

    const cartContent = fs.readFileSync(
      path.resolve(import.meta.dir, "../components/cart/CartDrawer.tsx"),
      "utf-8",
    );
    const checkoutContent = fs.readFileSync(
      path.resolve(import.meta.dir, "../components/cart/CheckoutModal.tsx"),
      "utf-8",
    );
    const cssContent = fs.readFileSync(path.resolve(import.meta.dir, "../styles.css"), "utf-8");
    expect(cartContent).toContain('data-suppress-toast="true"');
    expect(checkoutContent).toContain('data-suppress-toast="true"');
    expect(cssContent).toContain('body:has([data-suppress-toast="true"])');
  });
});
