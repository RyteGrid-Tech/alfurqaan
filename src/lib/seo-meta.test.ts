import { describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BOOKS } from "@/data/books";
import {
  DEFAULT_SITE_ORIGIN,
  SITE_SEO,
  buildAdminHead,
  buildBookHead,
  buildHomeHead,
  buildRootHead,
  buildRootIconLinks,
  getBookOgImagePath,
  normalizeOrigin,
  serializeJsonLd,
  toAbsoluteUrl,
} from "./seo-meta";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(TEST_DIR, "../../public");
const WHATSAPP_OG_MAX_BYTES = 300 * 1024;

function readPngDimensions(filePath: string): { width: number; height: number } {
  const buf = fs.readFileSync(filePath);
  const signature = buf.subarray(0, 8);
  const expectedSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  expect(signature.equals(expectedSignature)).toBe(true);
  expect(buf.subarray(12, 16).toString("ascii")).toBe("IHDR");
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
  };
}

function readJpegDimensions(filePath: string): { width: number; height: number; bytes: number } {
  const buf = fs.readFileSync(filePath);
  expect(buf[0]).toBe(0xff);
  expect(buf[1]).toBe(0xd8);

  let offset = 2;
  while (offset + 4 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buf[offset + 1] ?? 0;
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
        bytes: buf.length,
      };
    }
    if (
      marker === 0xd8 ||
      marker === 0xd9 ||
      marker === 0x01 ||
      (marker >= 0xd0 && marker <= 0xd7)
    ) {
      offset += 2;
      continue;
    }
    const segLen = buf.readUInt16BE(offset + 2);
    if (segLen < 2) break;
    offset += 2 + segLen;
  }

  throw new Error(`No SOF frame found in JPEG ${filePath}`);
}

describe("SEO & Brand Metadata Builders", () => {
  it("normalizes origins and resolves absolute URLs safely", () => {
    expect(normalizeOrigin(undefined)).toBe(DEFAULT_SITE_ORIGIN);
    expect(normalizeOrigin("")).toBe(DEFAULT_SITE_ORIGIN);
    expect(normalizeOrigin("ftp://invalid.example")).toBe(DEFAULT_SITE_ORIGIN);
    expect(normalizeOrigin("https://alfurqaan.pages.dev///")).toBe("https://alfurqaan.pages.dev");
    expect(normalizeOrigin("http://localhost:4176/")).toBe("http://localhost:4176");

    expect(toAbsoluteUrl("https://alfurqaan.ng/", "/og-preview.jpg")).toBe(
      "https://alfurqaan.ng/og-preview.jpg",
    );
    expect(toAbsoluteUrl("https://alfurqaan.ng", "favicon.svg")).toBe(
      "https://alfurqaan.ng/favicon.svg",
    );
    expect(toAbsoluteUrl("https://alfurqaan.ng", "https://selar.com/m/Barr-Adebayo-Shittu")).toBe(
      "https://selar.com/m/Barr-Adebayo-Shittu",
    );
    expect(getBookOgImagePath("path-to-paradise")).toBe("/og/books/path-to-paradise.jpg");
  });

  it("escapes < characters in JSON-LD so closing script tags cannot break HTML", () => {
    const serialized = serializeJsonLd({ title: "Al-Furqaan </script><script>alert(1)" });
    expect(serialized).not.toContain("<");
    expect(serialized).toContain("\\u003c/script>");
    expect(JSON.parse(serialized)).toEqual({ title: "Al-Furqaan </script><script>alert(1)" });
  });

  it("emits complete root icon links and brand head meta tags", () => {
    const links = buildRootIconLinks();
    expect(links.some((l) => l.rel === "icon" && l.href === "/favicon.svg")).toBe(true);
    expect(links.some((l) => l.rel === "icon" && l.href === "/favicon.ico")).toBe(true);
    expect(
      links.some((l) => l.rel === "apple-touch-icon" && l.href === "/apple-touch-icon.png"),
    ).toBe(true);
    expect(links.some((l) => l.rel === "manifest" && l.href === "/manifest.webmanifest")).toBe(
      true,
    );

    const rootHead = buildRootHead();
    const ogImage = rootHead.meta.find((m) => "property" in m && m.property === "og:image");
    const ogType = rootHead.meta.find((m) => "property" in m && m.property === "og:image:type");
    const theme = rootHead.meta.find((m) => "name" in m && m.name === "theme-color");
    expect(ogImage?.content).toBe(`${DEFAULT_SITE_ORIGIN}/og-preview.jpg`);
    expect(ogType?.content).toBe("image/jpeg");
    expect(theme?.content).toBe(SITE_SEO.themeColor);
  });

  it("builds homepage head with storefront OG banner and BookStore/Person/ItemList JSON-LD", () => {
    const head = buildHomeHead("https://store.alfurqaan.com/");
    const ogImage = head.meta.find((m) => "property" in m && m.property === "og:image");
    const ogSecure = head.meta.find((m) => "property" in m && m.property === "og:image:secure_url");
    const ogType = head.meta.find((m) => "property" in m && m.property === "og:image:type");
    expect(ogImage?.content).toBe("https://store.alfurqaan.com/og-preview.jpg");
    expect(ogSecure?.content).toBe("https://store.alfurqaan.com/og-preview.jpg");
    expect(ogType?.content).toBe("image/jpeg");
    expect(head.links).toEqual([{ rel: "canonical", href: "https://store.alfurqaan.com/" }]);

    expect(head.scripts).toHaveLength(1);
    const ld = JSON.parse(head.scripts[0]?.children ?? "{}");
    expect(ld["@graph"]).toHaveLength(3);
    expect(ld["@graph"][0]["@type"]).toEqual(["BookStore", "Organization"]);
    expect(ld["@graph"][1]["@type"]).toBe("Person");
    expect(ld["@graph"][2]["@type"]).toBe("ItemList");
    expect(ld["@graph"][2].numberOfItems).toBe(BOOKS.length);
    expect(ld["@graph"][2].itemListElement).toHaveLength(BOOKS.length);
  });

  it("builds book head with unique 1200x630 OG card and Book+Offer JSON-LD for every catalogue book", () => {
    for (const book of BOOKS) {
      const head = buildBookHead(book, DEFAULT_SITE_ORIGIN);
      const ogImage = head.meta.find((m) => "property" in m && m.property === "og:image");
      expect(ogImage?.content).toBe(`${DEFAULT_SITE_ORIGIN}/og/books/${book.id}.jpg`);
      expect(head.links).toEqual([
        { rel: "canonical", href: `${DEFAULT_SITE_ORIGIN}/books/${book.slug}` },
      ]);
      expect(head.scripts).toHaveLength(1);

      const ld = JSON.parse(head.scripts?.[0]?.children ?? "{}");
      expect(ld["@type"]).toBe("Book");
      expect(ld.name).toBe(book.title);
      expect(ld.offers).toHaveLength(2);
      expect(ld.offers[0].price).toBe(String(book.pricePrint));
      expect(ld.offers[1].price).toBe(String(book.priceEbook));
      expect(ld.offers[1].url).toBe(book.selarUrl);
    }
  });

  it("builds noindex fallback for missing books and internal admin routes", () => {
    const missing = buildBookHead(undefined);
    expect(missing.meta.find((m) => "name" in m && m.name === "robots")?.content).toBe(
      "noindex, nofollow",
    );

    const admin = buildAdminHead("https://alfurqaan.lovable.app");
    expect(admin.meta.find((m) => "name" in m && m.name === "robots")?.content).toBe(
      "noindex, nofollow",
    );
    expect(admin.meta.find((m) => "property" in m && m.property === "og:image")?.content).toBe(
      "https://alfurqaan.lovable.app/og-preview.jpg",
    );
  });
});

describe("Generated Favicon, PWA Manifest & 1200x630 Open Graph Assets", () => {
  it("contains bespoke Al-Furqaan favicon.svg and multi-resolution favicon.ico (16/32/48)", () => {
    const svgPath = path.join(PUBLIC_DIR, "favicon.svg");
    const svg = fs.readFileSync(svgPath, "utf-8");
    expect(svg).toContain("<svg");
    expect(svg).toContain("#c9a35c");

    const icoBuf = fs.readFileSync(path.join(PUBLIC_DIR, "favicon.ico"));
    expect(icoBuf.readUInt16LE(0)).toBe(0);
    expect(icoBuf.readUInt16LE(2)).toBe(1);
    const count = icoBuf.readUInt16LE(4);
    expect(count).toBe(3);

    const widths: number[] = [];
    for (let i = 0; i < count; i++) {
      const offset = 6 + i * 16;
      const w = icoBuf.readUInt8(offset) || 256;
      const h = icoBuf.readUInt8(offset + 1) || 256;
      expect(w).toBe(h);
      widths.push(w);
    }
    expect(widths).toEqual([16, 32, 48]);
  });

  it("provides exact PNG dimensions for icons and WhatsApp-compliant (<300KB) 1200x630 JPEG storefront OG banner", () => {
    expect(readPngDimensions(path.join(PUBLIC_DIR, "favicon-16x16.png"))).toEqual({
      width: 16,
      height: 16,
    });
    expect(readPngDimensions(path.join(PUBLIC_DIR, "favicon-32x32.png"))).toEqual({
      width: 32,
      height: 32,
    });
    expect(readPngDimensions(path.join(PUBLIC_DIR, "apple-touch-icon.png"))).toEqual({
      width: 180,
      height: 180,
    });
    expect(readPngDimensions(path.join(PUBLIC_DIR, "icon-192.png"))).toEqual({
      width: 192,
      height: 192,
    });
    expect(readPngDimensions(path.join(PUBLIC_DIR, "icon-512.png"))).toEqual({
      width: 512,
      height: 512,
    });
    const storefrontOg = readJpegDimensions(path.join(PUBLIC_DIR, "og-preview.jpg"));
    expect({ width: storefrontOg.width, height: storefrontOg.height }).toEqual({
      width: 1200,
      height: 630,
    });
    expect(storefrontOg.bytes).toBeLessThan(WHATSAPP_OG_MAX_BYTES);
  });

  it("provides dedicated WhatsApp-compliant (<300KB) 1200x630 Open Graph JPEG cards for all 8 books", () => {
    for (const book of BOOKS) {
      const ogFile = path.join(PUBLIC_DIR, "og/books", `${book.id}.jpg`);
      expect(fs.existsSync(ogFile)).toBe(true);
      const dims = readJpegDimensions(ogFile);
      expect({ width: dims.width, height: dims.height }).toEqual({ width: 1200, height: 630 });
      expect(dims.bytes).toBeLessThan(WHATSAPP_OG_MAX_BYTES);
    }
  });

  it("defines a standards-compliant manifest.webmanifest with explicit id and verified icon files", () => {
    const raw = fs.readFileSync(path.join(PUBLIC_DIR, "manifest.webmanifest"), "utf-8");
    const manifest = JSON.parse(raw) as {
      id: string;
      start_url: string;
      display: string;
      theme_color: string;
      background_color: string;
      icons: Array<{ src: string; sizes: string; type: string }>;
    };

    expect(manifest.id).toBe("/");
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#0c2b22");
    expect(manifest.background_color).toBe("#f4efe0");
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);

    for (const icon of manifest.icons) {
      const target = path.join(PUBLIC_DIR, icon.src.replace(/^\//, ""));
      expect(fs.existsSync(target)).toBe(true);
    }
  });

  it("keeps SharePreviewModal mobile-responsive with safe-area padding and >=44px targets", () => {
    const content = fs.readFileSync(
      path.resolve(TEST_DIR, "../components/book/SharePreviewModal.tsx"),
      "utf-8",
    );
    expect(content).toContain('role="dialog"');
    expect(content).toContain("max-h-[92dvh]");
    expect(content).toContain("overscroll-contain");
    expect(content).toContain("w-11 h-11");
    expect(content).toContain("min-h-[44px]");
    expect(content).toContain("env(safe-area-inset-bottom)");
  });
});
