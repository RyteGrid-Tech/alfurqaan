import {
  AUTHOR_NAME,
  BOOKS,
  PUBLISHER_LOCATION,
  PUBLISHER_NAME,
  SELAR_STORE_URL,
  WHATSAPP_PHONE,
  formatPrice,
  type Book,
} from "@/data/books";

export const DEFAULT_SITE_ORIGIN = "https://alfurqaan.lovable.app";

export const SITE_SEO = {
  siteName: "Al-Furqaan Publishers Ltd.",
  shortName: "Al-Furqaan",
  title:
    "Al-Furqaan Publishers Ltd. | Authentic Islamic Books by Barrister (Dr.) Abdur-Raheem Adebayo Shittu",
  description:
    "Authentic Islamic books & instant ebooks by Barrister (Dr.) Abdur-Raheem Adebayo Shittu — Tawheed, Prophetic Du'a, Shari'ah & Comparative Religion. Est. 1987.",
  ogTitle: "Al-Furqaan Publishers Ltd. — True Knowledge, Beautifully Bound",
  ogDescription:
    "Official library of Barrister (Dr.) Abdur-Raheem Adebayo Shittu. Browse all 8 scholarly titles in fine print, instant Selar digital ebooks, and Amazon editions since 1987.",
  imagePath: "/og-preview.jpg",
  imageAlt:
    "Al-Furqaan Publishers Ltd. — Official Bookstore & 8 Islamic Titles by Barrister (Dr.) Abdur-Raheem Adebayo Shittu",
  keywords: [
    "Al-Furqaan Publishers",
    "Al Furqaan Publishers Ltd",
    "Barrister Abdur-Raheem Adebayo Shittu",
    "Dr Adebayo Shittu books",
    "Authentic Islamic books Nigeria",
    "Muslim Prayers for Everyday Success",
    "A Modern Introduction to Islam",
    "Path to Paradise",
    "What is Sunnah What is Bid'ah",
    "Islam and Christianity Why the Conflict",
    "A Book of Qur'anic Parables",
    "Islamic Ideology Democratic Socialism",
    "Selar Islamic ebooks",
  ].join(", "),
  themeColor: "#0c2b22",
} as const;

export function normalizeOrigin(origin?: string | null): string {
  if (!origin) return DEFAULT_SITE_ORIGIN;
  const trimmed = origin.trim().replace(/\/+$/, "");
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return DEFAULT_SITE_ORIGIN;
  }
  return trimmed;
}

export function toAbsoluteUrl(origin: string | undefined | null, pathnameOrUrl: string): string {
  if (/^https?:\/\//i.test(pathnameOrUrl)) {
    return pathnameOrUrl;
  }
  const base = normalizeOrigin(origin);
  const cleanPath = pathnameOrUrl.startsWith("/") ? pathnameOrUrl : `/${pathnameOrUrl}`;
  return `${base}${cleanPath}`;
}

export function getBookOgImagePath(bookId: string): string {
  return `/og/books/${bookId}.jpg`;
}

export function serializeJsonLd(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

function buildOpenGraphImageTags(imageUrl: string, alt: string) {
  const tags: Array<{ property: string; content: string }> = [
    { property: "og:image", content: imageUrl },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: alt },
  ];
  if (imageUrl.startsWith("https://")) {
    tags.splice(1, 0, { property: "og:image:secure_url", content: imageUrl });
  }
  return tags;
}

export function buildRootIconLinks() {
  return [
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    { rel: "manifest", href: "/manifest.webmanifest" },
  ];
}

export function buildRootHead(origin?: string | null) {
  const imageUrl = toAbsoluteUrl(origin, SITE_SEO.imagePath);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_SEO.title },
      { name: "description", content: SITE_SEO.description },
      { name: "keywords", content: SITE_SEO.keywords },
      { name: "author", content: AUTHOR_NAME },
      { name: "publisher", content: SITE_SEO.siteName },
      { name: "application-name", content: SITE_SEO.siteName },
      { name: "theme-color", content: SITE_SEO.themeColor },
      { name: "msapplication-TileColor", content: SITE_SEO.themeColor },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: SITE_SEO.shortName },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: SITE_SEO.siteName },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: SITE_SEO.ogTitle },
      { property: "og:description", content: SITE_SEO.ogDescription },
      ...buildOpenGraphImageTags(imageUrl, SITE_SEO.imageAlt),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_SEO.ogTitle },
      { name: "twitter:description", content: SITE_SEO.ogDescription },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: SITE_SEO.imageAlt },
    ],
  };
}

export function buildHomeHead(origin?: string | null) {
  const canonicalUrl = toAbsoluteUrl(origin, "/");
  const imageUrl = toAbsoluteUrl(origin, SITE_SEO.imagePath);
  const logoUrl = toAbsoluteUrl(origin, "/icon-512.png");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["BookStore", "Organization"],
        "@id": `${canonicalUrl}#publisher`,
        name: PUBLISHER_NAME,
        alternateName: "Al-Furqaan Publishers Ltd.",
        url: canonicalUrl,
        logo: logoUrl,
        image: imageUrl,
        foundingDate: "1987",
        telephone: WHATSAPP_PHONE,
        description: SITE_SEO.ogDescription,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Saki & Ibadan",
          addressRegion: "Oyo State",
          addressCountry: "NG",
          streetAddress: PUBLISHER_LOCATION,
        },
        sameAs: [SELAR_STORE_URL],
      },
      {
        "@type": "Person",
        "@id": `${canonicalUrl}#author`,
        name: AUTHOR_NAME,
        jobTitle: "Islamic Scholar, Legal Practitioner & Author",
        worksFor: { "@id": `${canonicalUrl}#publisher` },
        sameAs: [SELAR_STORE_URL],
      },
      {
        "@type": "ItemList",
        name: "Published Catalogue — Al-Furqaan Publishers Ltd.",
        numberOfItems: BOOKS.length,
        itemListElement: BOOKS.map((book, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: toAbsoluteUrl(origin, `/books/${book.slug}`),
          name: book.title,
        })),
      },
    ],
  };

  return {
    meta: [
      { title: SITE_SEO.title },
      { name: "description", content: SITE_SEO.description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:title", content: SITE_SEO.ogTitle },
      { property: "og:description", content: SITE_SEO.ogDescription },
      { property: "og:type", content: "website" },
      ...buildOpenGraphImageTags(imageUrl, SITE_SEO.imageAlt),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_SEO.ogTitle },
      { name: "twitter:description", content: SITE_SEO.ogDescription },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: SITE_SEO.imageAlt },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: serializeJsonLd(structuredData),
      },
    ],
  };
}

export function buildBookHead(book: Book | undefined, origin?: string | null) {
  if (!book) {
    return {
      meta: [
        { title: "Book Not Found — Al-Furqaan Publishers Ltd." },
        { name: "robots", content: "noindex, nofollow" },
      ],
    };
  }

  const canonicalUrl = toAbsoluteUrl(origin, `/books/${book.slug}`);
  const imageUrl = toAbsoluteUrl(origin, getBookOgImagePath(book.id));
  const title = `${book.title} — ${book.author} | Al-Furqaan Publishers`;
  const priceLine = `Fine Print ${formatPrice(book.pricePrint)} · Instant Ebook ${formatPrice(book.priceEbook)} via Selar & Amazon.`;
  const metaDescription = `${book.tagline} ${priceLine}`;
  const ogDescription = `${book.desc} Available in ${priceLine}`;
  const imageAlt = `${book.title} (${book.category}) by ${book.author} — Al-Furqaan Publishers Ltd.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    ...(book.arabicTitle ? { alternateName: book.arabicTitle } : {}),
    description: book.longDesc || book.desc,
    url: canonicalUrl,
    image: imageUrl,
    inLanguage: "en",
    datePublished: String(book.year),
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.pages ? { numberOfPages: book.pages } : {}),
    genre: book.category,
    keywords: book.keyThemes.join(", "),
    author: {
      "@type": "Person",
      name: book.author,
    },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Fine Print Paperback Edition",
        price: String(book.pricePrint),
        priceCurrency: "NGN",
        availability: book.printAvailable
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: canonicalUrl,
      },
      {
        "@type": "Offer",
        name: "Instant Digital Ebook (Selar)",
        price: String(book.priceEbook),
        priceCurrency: "NGN",
        availability: "https://schema.org/InStock",
        url: book.selarUrl,
      },
    ],
  };

  return {
    meta: [
      { title },
      { name: "description", content: metaDescription },
      {
        name: "keywords",
        content: [book.title, book.category, ...book.keyThemes, book.author].join(", "),
      },
      { property: "og:site_name", content: SITE_SEO.siteName },
      { property: "og:url", content: canonicalUrl },
      { property: "og:title", content: `${book.title} — Al-Furqaan Publishers` },
      { property: "og:description", content: ogDescription },
      { property: "og:type", content: "book" },
      ...(book.isbn ? [{ property: "book:isbn", content: book.isbn }] : []),
      { property: "book:release_date", content: `${book.year}-01-01` },
      ...buildOpenGraphImageTags(imageUrl, imageAlt),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${book.title} — ${book.category}` },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: serializeJsonLd(structuredData),
      },
    ],
  };
}

export function buildAdminHead(origin?: string | null) {
  const imageUrl = toAbsoluteUrl(origin, SITE_SEO.imagePath);
  const canonicalUrl = toAbsoluteUrl(origin, "/admin");

  return {
    meta: [
      { title: "Publishing Desk & Social Previews — Al-Furqaan Publishers Ltd." },
      {
        name: "description",
        content:
          "Internal catalogue management, order desk, WhatsApp broadcast studio, and social preview generator for Al-Furqaan Publishers Ltd.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:title", content: "Al-Furqaan Publishers — Publishing Desk" },
      { property: "og:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}
