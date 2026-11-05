# Al Furqaan Publishers

> **True knowledge, beautifully bound.**  
> Authentic Islamic literature, comparative jurisprudence, and contemporary scholarship by **Barrister (Dr.) Abdur-Raheem Adebayo Shittu**.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](<>)
[![Framework](https://img.shields.io/badge/framework-TanStack_Start-blue)](<>)
[![React](https://img.shields.io/badge/React-19-61dafb)](<>)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38b2ac)](<>)
[![Platform](https://img.shields.io/badge/Lovable-Connected-purple)](https://alfurqaan.lovable.app)

---

## 📖 About Al Furqaan Publishers

Founded in 1987 in Saki / Ibadan, Oyo State, Nigeria, **Al Furqaan Publishers Ltd** is dedicated to publishing authentic Islamic literature grounded in the Qur'an, authenticated Prophetic traditions (Sunnah), and rigorous intellectual enquiry.

The publishing house serves as the official home for the literary and scholarly works of **Barrister (Dr.) Abdur-Raheem Adebayo Shittu** — distinguished Nigerian lawyer, legal scholar, legislator in the Oyo State House of Assembly (Second Republic), and former Federal Minister of Communications of Nigeria (2015–2019).

### Editorial Philosophy

- **Precision of Law, Heart of Faith**: Combining the forensic discipline of legal training with uncompromising devotion to pure Monotheism (_Tawheed_ / _Muwahhid_).
- **Logic, Not Hearsay**: Addressing fundamental questions — Shari'ah, Jihad, comparative theological doctrines, and cultural practices — with primary scriptural evidence and sound reason.
- **For the Modern Believer**: Deconstructing complex classical Arabic scholarship into clear, compelling, and actionable guidance for contemporary readers.
- **Purity of Sunnah**: Drawing an unyielding distinction between pristine Prophetic teachings and later cultural innovations (_Bid'ah_).

---

## 📚 Book Catalog (The Fihrist)

The bookstore features 8 foundational titles across diverse genres:

| #   | Title                                                                | Category                   | Formats                     | Current Price (NGN)            |
| --- | -------------------------------------------------------------------- | -------------------------- | --------------------------- | ------------------------------ |
| 1   | **A Modern Introduction to Islam**                                   | Basics of Islam            | Ebook & Print               | ₦2,500                         |
| 2   | **Muslim Prayers for Everyday Success**                              | Du'a & Prayers             | Ebook & Hand-finished Print | Ebook: ₦6,000 / Print: ₦11,999 |
| 3   | **Islam and Christianity: Why the Conflict?**                        | Comparative Religion       | Ebook & Print               | ₦2,500                         |
| 4   | **A Book of Qur'anic Parables**                                      | Qur'an Study               | Ebook & Print               | ₦3,500                         |
| 5   | **A Critique of Dr. Adekilekun Tijani's Handbook on the Tijaniyyah** | Aqidah                     | Ebook & Print               | ₦3,000                         |
| 6   | **What is Sunnah? What is Bid'ah?**                                  | Sunnah & Bid'ah            | Ebook & Print               | ₦2,500                         |
| 7   | **Path to Paradise**                                                 | Afterlife / Eschatology    | Ebook & Print               | ₦2,500                         |
| 8   | **Islamic Ideology: Path to Democratic Socialism in Nigeria**        | Islamic Thought & Politics | Ebook & Print               | ₦2,500                         |

### Multi-Channel Distribution Architecture

- **Direct Website Store**: Direct ordering with interactive cart, quick-view preview modals, and order simulation.
- **Selar Storefront ([selar.co](https://selar.co))**: Dedicated checkout links for automated digital delivery (PDF / ePub) across Nigerian Naira (NGN), Ghanaian Cedi (GHS), Kenyan Shilling (KES), US Dollar (USD), British Pound (GBP), etc.
- **Amazon Books / Kindle Direct Publishing (KDP)**: Global distribution channels for international print-on-demand paperbacks and Kindle editions.

---

## 🛠️ Architecture & Tech Stack

This project is built on modern, full-stack React and SSR infrastructure:

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack SSR powered by [Nitro](https://nitro.build))
- **Routing**: [TanStack Router](https://tanstack.com/router) with strict type-safe file-based routes (`src/routes/`)
- **UI Library**: React 19, [Tailwind CSS v4](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com), [Shadcn UI](https://ui.shadcn.com)
- **State & Data**: [TanStack Query v5](https://tanstack.com/query)
- **Icons & Visuals**: [Lucide React](https://lucide.dev), classical Islamic geometric SVG motifs, high-resolution WebP book cover scans
- **Client Bundling & Tooling**: [Vite 8](https://vitejs.dev), [Bun](https://bun.sh), TypeScript 5.8, ESLint 9, Prettier
- **Editor Sync**: Connected to [Lovable.dev](https://lovable.dev) (Live app: [alfurqaan.lovable.app](https://alfurqaan.lovable.app))

---

## 📱 Mobile-First Design & Accessibility Standards

- **Mobile Viewport Guarantee**: Responsive layout tuned for modern mobile devices (390px iPhone standard to large desktop viewports).
- **Touch Targets**: Minimum 44px tap targets for buttons, chips, quantity steppers, and interactive controls.
- **A11y Standards**: Focus traps on modals, `aria-expanded` and `aria-controls` bindings on drawers/menus, `Escape` key listeners, and high-contrast color pairings (`#0c2b22` Deep Emerald, `#c9a35c` Artisan Gold, `#f4efe0` Warm Parchment).
- **Reduced Motion Support**: Automatic fallback for users with `prefers-reduced-motion` enabled.
- **Local Asset Resiliency**: All 8 book cover assets are bundled locally in `src/assets/*.webp` to ensure reliability across self-hosted and cloud deployments.

---

## 📂 Project Structure

```
alfurqaan/
├── public/
│   ├── alfurqaan.js       # Core catalog data and client-side store logic
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/            # Bundled WebP book cover scans (all 8 titles)
│   ├── components/ui/     # Complete suite of Shadcn / Radix primitives
│   ├── lib/
│   │   ├── alfurqaan-page.ts        # Classical layout markup & styles
│   │   ├── error-capture.ts         # Nitro/h3 SSR error logging pipeline
│   │   ├── error-page.ts            # Fallback error template
│   │   ├── lovable-error-reporting.ts # Telemetry integration
│   │   └── utils.ts                 # Classname merge helpers (clsx, twMerge)
│   ├── routes/
│   │   ├── __root.tsx     # App shell, fonts, global head metadata
│   │   └── index.tsx      # Landing page & bookstore route
│   ├── router.tsx         # TanStack router factory
│   ├── server.ts          # Nitro SSR server entry
│   ├── start.ts           # Start configuration & middleware
│   └── styles.css         # Tailwind v4 theme & base layer
├── bun.lock
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.2+) or Node.js (v22+) with npm / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/RyteGrid-Tech/alfurqaan.git
cd alfurqaan

# Install dependencies using Bun
bun install
```

### Development

```bash
# Start local development server
bun run dev
```

The application will be accessible at `http://localhost:3000`.

### Production Build & Cloudflare Deployment

The application is powered by TanStack Start with Nitro and supports deployment to **Cloudflare Workers** (Workers with Assets) and **Cloudflare Pages** (Pages Advanced Mode Functions):

#### Option 1: Cloudflare Workers (Default & Recommended)

Nitro automatically targets `cloudflare-module` and generates `.output/server/wrangler.json` with static asset binding.

```bash
# 1. Build for Cloudflare Workers
bun run build:workers

# 2. Deploy to Cloudflare Workers via Wrangler
bun run deploy:workers
```

#### Option 2: Cloudflare Pages

If deploying to Cloudflare Pages (e.g. from the Cloudflare Pages Dashboard or GitHub CI):

- **Build command**: `bun run build:pages` (or `NITRO_PRESET=cloudflare-pages vite build`)
- **Build output directory**: `dist`

Or deploy directly via CLI:

```bash
# 1. Build for Cloudflare Pages
bun run build:pages

# 2. Deploy to Cloudflare Pages via Wrangler
bun run deploy:pages
```

### Code Quality & Formatting

```bash
# Run automated tests
bun test

# Run ESLint checks
bun run lint

# Format codebase with Prettier
bun run format
```

---

## 🗺️ Roadmap & Current Status

- [x] Integrate scanned covers for all 8 catalog titles into local `src/assets/*.webp`
- [x] Configure mobile navigation drawer, bottom thumb-nav bar, and strict zero-overflow viewport testing (360px–390px mobile guarantee)
- [x] Implement accessible focus management, Escape key dismissals, and ARIA attributes
- [x] Migrate to modular, idiomatic React 19 / TanStack Start component architecture
- [x] Implement verified multi-channel purchase action buttons:
  - Official Selar storefront (`https://selar.com/m/Barr-Adebayo-Shittu`) & verified individual product URLs
  - Amazon Books international links
  - Direct Al Furqaan WhatsApp publishing line (`07062716154`) concierge
- [x] Build dedicated individual book preview routes (`/books/$bookId`) with Look Inside sample chapter reader
- [x] Multi-currency conversion switcher (NGN, USD, GBP, EUR, GHS)
- [x] Admin / catalog management interface (`/admin`) for order management, CSV export, and channel auditing
- [x] Dual Cloudflare Workers & Cloudflare Pages SSR compatibility
- [ ] Direct Paystack / Flutterwave gateway integration for automated in-app checkout settlement

---

## 📜 License & Copyright

All literary content, titles, and book excerpts © **Barrister (Dr.) Abdur-Raheem Adebayo Shittu** & **Al Furqaan Publishers Ltd**. All rights reserved.
Software codebase developed by **RyteGrid Tech**.
