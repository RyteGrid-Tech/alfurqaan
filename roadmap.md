# Al Furqaan Publishers — Master Implementation Roadmap

## 🎯 Vision

Transform the Al Furqaan Publishers website into a remarkable, mobile-first, scholarly Islamic bookstore and publishing platform for Barrister (Dr.) Abdur-Raheem Adebayo Shittu. The platform seamlessly provides direct purchases, automated digital fulfillment via **Selar** (`selar.co`), and international print/Kindle editions via **Amazon Books**.

---

## 📌 Phase 1: Architectural Foundation & Type-Safe Core

- [x] Initial codebase audit, environment runtime configuration with Bun (v1.4.4), and clean build verification
- [x] Integrate and verify all 8 high-resolution local WebP book cover scans in `src/assets/*.webp`
- [x] Sync developer guardrails (`CLAUDE.md`, `GEMINI.md`, `AGENTS.md`)
- [x] Modernize `README.md` with full project specification
- [x] Define comprehensive type-safe book data model in `src/data/books.ts` (all 8 titles with real synopses, ISBNs, page counts, pricing, Selar URLs, Amazon URLs, and WhatsApp direct links)
- [x] Implement reactive, persistent shopping cart context (`src/lib/cart-context.tsx`) with localStorage sync
- [x] Add automated unit tests (`src/data/books.test.ts`, `src/lib/cart-store.test.ts`) executed via `bun test`

---

## 📌 Phase 2: Modular Componentization (React 19 & Tailwind v4)

- [x] Replace monolithic `alfurqaan-page.ts` / `alfurqaan.js` raw HTML string injection with pure React 19 components:
  - [x] `SiteHeader`: Responsive brand seal, navigation, search toggle, reactive cart count badge, mobile hamburger menu
  - [x] `HeroSection`: Classical Bismillah calligraphy, gold typography, hero CTA buttons, rotating marquee ticker
  - [x] `CatalogueSection`: Live title/author/category search, category filter chips with horizontal swipe, format toggle
  - [x] `BookCard`: Elevation hover, cover image, category badge, quick format switch (Print/Ebook), quick view trigger, add to cart
  - [x] `QuickViewModal`: Accessible dialog, full synopses, format selection, direct Selar/Amazon checkout buttons
  - [x] `CartDrawer`: Accessible slide-over drawer with item list, quantity controls, subtotal, and checkout trigger
  - [x] `CheckoutModal`: Multi-channel checkout (Selar instant delivery, Amazon books, direct Nigerian bank transfer/dispatch)
  - [x] `OrderSuccessModal`: Order confirmation with Islamic greeting, itemized breakdown, and delivery instructions
  - [x] `WhyAuthorSection`: Biographical tribute to Barrister (Dr.) Abdur-Raheem Adebayo Shittu, 4 core pillars, prophetic hadith
  - [x] `ReadingRoomSection`: Guided reader recommendations and 3D visual book stack
  - [x] `NewsletterSection`: "The Reader's Letter" monthly subscription with toast notifications
  - [x] `SiteFooter`: Full publisher identity, navigation links, copyright, and theological motto
  - [x] `MobileBottomNav`: Sticky mobile bottom action bar for instant navigation to Catalog, Search, and Cart

---

## 📌 Phase 3: Dedicated Book Detail Routes (`/books/$bookId`)

- [x] Create dynamic file-based route in `src/routes/books/$bookId.tsx`
- [x] Render full book pages with excerpt preview, chapter highlights, scholarly review quotes, and sticky buy bar
- [x] Configure dynamic meta tags, OpenGraph previews, and Twitter cards for social sharing on WhatsApp, Twitter, and LinkedIn

---

## 📌 Phase 4: Multi-Channel Sales Integration (Selar, Amazon & Direct)

- [x] Implement branded SVG logos for Selar (`selar.co`) and Amazon
- [x] Embed automated Selar direct checkout links with fallback parameters
- [x] Embed Amazon paperback and Kindle links
- [x] Configure one-click WhatsApp direct order button for physical print copies within Nigeria

---

## 📌 Phase 5: Mobile-First UX, Accessibility & Quality Assurance

- [x] Verify 390px iPhone standard and small viewport responsiveness
- [x] Ensure all interactive buttons, steppers, and chips maintain 44px+ tap targets
- [x] Validate keyboard navigation (`Tab`, `Escape`), focus traps on modals/drawers, and ARIA labels
- [x] Run full automated test suite: `bun test` (21 pass, 0 fail across 4 test suites in 57ms)
- [x] Run lint and formatting: `bun run lint`, `bun run format` (0 errors)
- [x] Run full production client, SSR, and Nitro worker build: `bun run build` (Clean SSR & Cloudflare Nitro output)

---

## 📌 Phase 6: Executive Publishing Administration (`/admin`)

- [x] Build type-safe executive dashboard route (`src/routes/admin.tsx`) for Barrister Adebayo Shittu and Al Furqaan staff
- [x] Catalog overview tracking all 8 publications with real-time pricing and format availability
- [x] Direct order ledger with simulated Nigerian customer records and CSV export capability
- [x] One-click promotional broadcast copy generator for WhatsApp broadcasts, Twitter/X announcements, and email newsletters
- [x] Outbound multi-channel link auditor (Selar `selar.co` & Amazon Books URLs)

---

## 📌 Phase 7: Scholarly "Look Inside" Reader, Command Palette & Multi-Currency Engine

- [x] Implement scholarly "Look Inside" sample chapter excerpts in `src/data/excerpts.ts` for all 8 books with authentic Arabic calligraphy, transliterations, and scholarly takeaways
- [x] Build accessible, distraction-free reading modal (`src/components/book/ExcerptReaderModal.tsx`) with font resizing (A-/A/A+) and 3 reading themes (Warm Parchment, Clean White, Night Emerald)
- [x] Build keyboard-accessible global Command Palette (`src/components/search/SearchCommandModal.tsx`) with `Cmd+K` / `Ctrl+K` shortcut, real-time fuzzy search, and instant actions
- [x] Implement multi-currency engine (`src/lib/currency.ts`) supporting Nigerian Naira (₦), US Dollar ($), British Pound (£), Euro (€), and Ghanaian Cedi (GH₵) with instant conversion across all book cards and modals
- [x] Deploy floating authentic Islamic WhatsApp Concierge (`src/components/layout/WhatsAppConcierge.tsx`) for personalized book inquiries, bank transfer confirmations, and wholesale orders
- [x] Add automated test suite for excerpts and look inside logic (`src/data/excerpts.test.ts`)

---

## 📌 Phase 8: Mobile Viewport Zero-Overflow Hardening & Cloudflare Dual Deployment

- [x] Eliminate mobile horizontal overflow (page sliding left/right on mobile screens):
  - [x] Restrict `html` and `body` with `overflow-x: hidden; max-width: 100%; width: 100%; position: relative;`
  - [x] Add `overflow-x-hidden max-w-full w-full` to root shells and routes (`__root.tsx`, `index.tsx`, `books/$bookId.tsx`, `admin.tsx`)
  - [x] Eliminate mobile header action congestion in `SiteHeader.tsx` (compact currency dropdown, hide redundant search icon on mobile `< md`, use `w-9 h-9 sm:w-11 sm:h-11` buttons)
  - [x] Strictly contain hero watermark rotating star SVG (`w-[min(65vw,450px)]` with `overflow-hidden` wrapper and `overflow-x-clip` section)
  - [x] Contain 3D visual book stack in `ReadingRoomSection.tsx` (`overflow-hidden` container and section)
  - [x] Constrain mobile popovers in `WhatsAppConcierge.tsx` (`w-[calc(100vw-2rem)] max-w-xs`) and `CartDrawer.tsx` (`w-full max-w-md`)
  - [x] Add `touch-pan-x` to horizontal category filter chips in `CatalogueSection.tsx`
- [x] Verify Cloudflare Workers & Cloudflare Pages dual hosting compatibility:
  - [x] Cloudflare Workers: Nitro default preset `cloudflare-module` generates `.output/server/wrangler.json` with static asset bindings
  - [x] Cloudflare Pages: `NITRO_PRESET=cloudflare-pages` generates `dist/` with `_worker.js`, `_routes.json`, and static assets
  - [x] Added dedicated npm scripts in `package.json` (`build:workers`, `build:pages`, `deploy:workers`, `deploy:pages`)
  - [x] Documented detailed deployment instructions in `README.md`
