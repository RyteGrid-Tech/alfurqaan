import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BOOKS, formatPrice, type Book, WHATSAPP_PHONE } from "@/data/books";
import {
  SelarIcon,
  AmazonIcon,
  WhatsAppIcon,
  BismillahSeal,
} from "@/components/icons/PlatformIcons";
import {
  BookOpen,
  DollarSign,
  Truck,
  ExternalLink,
  Copy,
  Check,
  Download,
  Share2,
  ArrowLeft,
  Settings,
  Sparkles,
  BarChart3,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { getRequestOrigin } from "@/lib/seo";
import { buildAdminHead, getBookOgImagePath } from "@/lib/seo-meta";

export const Route = createFileRoute("/admin")({
  loader: () => ({ origin: getRequestOrigin() }),
  head: ({ loaderData }) => buildAdminHead(loaderData?.origin),
  component: AdminPage,
});

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "orders" | "marketing">("catalog");
  const [selectedBookForPromo, setSelectedBookForPromo] = useState<Book>(BOOKS[0] as Book);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Direct Orders Ledger (hydrated from localStorage or sample activity)
  const [orders, setOrders] = useState([
    {
      id: "AF-891024",
      customer: "Ustadh Luqman Adeleke",
      email: "adeleke.l@example.com",
      phone: "+234 802 345 6789",
      address: "Bodija Estate, Ibadan, Oyo State",
      items: "2 × Muslim Prayers for Everyday Success (Print)",
      amount: 23998,
      status: "Dispatched",
      date: "2026-11-04",
      method: "Direct Bank Transfer",
    },
    {
      id: "AF-890451",
      customer: "Hajiya Maryam Bello",
      email: "maryam.b@example.com",
      phone: "+234 803 987 6543",
      address: "Garki Area 2, Abuja, FCT",
      items: "1 × A Modern Introduction to Islam (Print), 1 × Path to Paradise (Ebook)",
      amount: 5000,
      status: "Fulfilled",
      date: "2026-11-03",
      method: "Pay on Delivery",
    },
    {
      id: "AF-889920",
      customer: "Dr. Tajudeen Shittu",
      email: "tajudeen@example.com",
      phone: "+234 818 111 2233",
      address: "Saki Town, Oyo State",
      items: "1 × Islamic Ideology: Path to Democratic Socialism in Nigeria (Print)",
      amount: 2500,
      status: "Fulfilled",
      date: "2026-11-01",
      method: "Direct Bank Transfer",
    },
  ]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const exportOrdersCsv = () => {
    const headers = "Order ID,Customer,Email,Phone,Address,Items,Amount (NGN),Status,Date,Method\n";
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.customer}","${o.email}","${o.phone}","${o.address}","${o.items}",${o.amount},"${o.status}","${o.date}","${o.method}"`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `alfurqaan-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    toast.success("Exported orders CSV!");
  };

  const promoCopyWhatsApp = `*NEW RELEASE / AVAILABLE NOW FROM AL FURQAAN PUBLISHERS LTD*\n\n📖 *${selectedBookForPromo.title}*\n✍️ Author: Barrister (Dr.) Abdur-Raheem Adebayo Shittu\n🏷 Category: ${selectedBookForPromo.category}\n\n"${selectedBookForPromo.desc}"\n\n💰 Price: Print ${formatPrice(selectedBookForPromo.pricePrint)} | Ebook ${formatPrice(selectedBookForPromo.priceEbook)}\n\n🚀 *Order Online Instantly:*\n👉 Buy Ebook on Selar: ${selectedBookForPromo.selarUrl}\n👉 International Amazon Store: ${selectedBookForPromo.amazonUrl}\n\n📞 Direct Delivery & Wholesale Inquiries in Nigeria: WhatsApp ${WHATSAPP_PHONE}`;

  const promoCopyTwitter = `True knowledge, beautifully bound. Explore "${selectedBookForPromo.title}" by Barrister (Dr.) Abdur-Raheem Adebayo Shittu.\n\nRead the classical legal & theological insights on ${selectedBookForPromo.category}.\n\nBuy instant ebook on @tryselar or order print editions:\n${selectedBookForPromo.selarUrl}\n\n#Islam #AlFurqaan #AdebayoShittu #Nigeria`;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#f4efe0] text-[#0c2b22] font-serif selection:bg-[#c9a35c] selection:text-[#07201a]">
      {/* Top Admin Header */}
      <header className="bg-[#07201a] text-[#ece5d2] border-b border-[#c9a35c]/20 py-3.5 px-3 sm:px-6 lg:px-8 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              to="/"
              className="text-[#8fa893] hover:text-[#ece5d2] transition-colors min-w-[40px] min-h-[40px] grid place-items-center shrink-0"
              title="Return to Bookstore"
              aria-label="Return to Bookstore"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-9 h-9 p-0.5 bg-[#0c2b22] text-[#e2c380] border border-[#c9a35c]/30 flex items-center justify-center overflow-hidden shrink-0">
              <BismillahSeal className="w-full h-full" />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-base sm:text-lg text-[#ece5d2] font-medium leading-tight truncate">
                Al-Furqaan Admin
              </h1>
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#c9a35c] block truncate">
                Publisher Management · Channels
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              className="min-h-[44px] px-3 py-1.5 border border-[#c9a35c]/30 text-[#ece5d2] hover:bg-[#c9a35c]/10 text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Live Storefront</span>
              <span className="sm:hidden">Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* KPI Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-white border border-[#0c2b22]/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-sans tracking-wider text-[#546553] font-semibold">
                Catalog Titles
              </span>
              <BookOpen className="w-4 h-4 text-[#c9a35c]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#0c2b22]">{BOOKS.length}</div>
            <span className="text-xs font-serif italic text-[#4f6857]">
              Authored by Dr. Adebayo Shittu
            </span>
          </div>

          <div className="p-5 bg-white border border-[#0c2b22]/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-sans tracking-wider text-[#546553] font-semibold">
                Active Channels
              </span>
              <Layers className="w-4 h-4 text-[#c9a35c]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#0c2b22]">4</div>
            <span className="text-xs font-serif italic text-[#4f6857]">
              Selar · Amazon · WhatsApp · Direct
            </span>
          </div>

          <div className="p-5 bg-white border border-[#0c2b22]/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-sans tracking-wider text-[#546553] font-semibold">
                Recent Orders
              </span>
              <Truck className="w-4 h-4 text-[#c9a35c]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#0c2b22]">{orders.length}</div>
            <span className="text-xs font-serif italic text-[#4f6857]">
              Ibadan, Lagos, Abuja, Saki
            </span>
          </div>

          <div className="p-5 bg-white border border-[#0c2b22]/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-sans tracking-wider text-[#546553] font-semibold">
                Pricing Currency
              </span>
              <DollarSign className="w-4 h-4 text-[#c9a35c]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#7d5e1a]">NGN (₦)</div>
            <span className="text-xs font-serif italic text-[#4f6857]">
              Multi-currency live on Selar
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 border-b border-[#0c2b22]/15 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("catalog")}
            className={`min-h-[44px] px-3 sm:px-5 text-xs font-sans uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "catalog"
                ? "border-[#0c2b22] text-[#0c2b22]"
                : "border-transparent text-[#5a6b58] hover:text-[#0c2b22]"
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" /> Book Channels &amp; Pricing ({BOOKS.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`min-h-[44px] px-3 sm:px-5 text-xs font-sans uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-[#0c2b22] text-[#0c2b22]"
                : "border-transparent text-[#5a6b58] hover:text-[#0c2b22]"
            }`}
          >
            <Truck className="w-4 h-4 shrink-0" /> Direct Orders Ledger ({orders.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("marketing")}
            className={`min-h-[44px] px-3 sm:px-5 text-xs font-sans uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "marketing"
                ? "border-[#0c2b22] text-[#0c2b22]"
                : "border-transparent text-[#5a6b58] hover:text-[#0c2b22]"
            }`}
          >
            <Share2 className="w-4 h-4 shrink-0" /> Promotional Broadcast Generator
          </button>
        </div>

        {/* Tab 1: Book Channels & Pricing Manager */}
        {activeTab === "catalog" && (
          <div className="space-y-4">
            <div className="bg-white border border-[#0c2b22]/10 overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#0c2b22]/5 border-b border-[#0c2b22]/10 text-xs font-sans uppercase tracking-wider text-[#546553]">
                    <th className="p-3.5">Book Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Print Price</th>
                    <th className="p-3.5">Ebook Price</th>
                    <th className="p-3.5">Selar Store Link</th>
                    <th className="p-3.5">Amazon Store Link</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0c2b22]/10 font-serif">
                  {BOOKS.map((b) => (
                    <tr key={b.id} className="hover:bg-[#0c2b22]/[0.02] transition-colors">
                      <td className="p-3.5 font-medium text-[#0c2b22] max-w-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.cover}
                            alt=""
                            className="w-9 h-12 object-cover border border-[#0c2b22]/10 shrink-0"
                          />
                          <div>
                            <span className="font-semibold block">{b.title}</span>
                            <span className="text-xs text-[#5a6b58] italic block">
                              {b.year} · {b.isbn}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="text-xs font-sans uppercase tracking-wider px-2 py-0.5 bg-[#e2c380]/40 text-[#07201a] font-medium">
                          {b.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-[#7d5e1a]">
                        {formatPrice(b.pricePrint)}
                      </td>
                      <td className="p-3.5 font-bold text-[#7d5e1a]">
                        {formatPrice(b.priceEbook)}
                      </td>
                      <td className="p-3.5">
                        <a
                          href={b.selarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-sans uppercase tracking-wider text-[#0c2b22] hover:text-[#c9a35c] font-semibold"
                        >
                          <SelarIcon className="w-3 h-3 text-[#c9a35c]" />
                          <span>Selar Page</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </td>
                      <td className="p-3.5">
                        <a
                          href={b.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-sans uppercase tracking-wider text-[#0c2b22] hover:text-[#c9a35c] font-semibold"
                        >
                          <AmazonIcon className="w-3 h-3 text-[#c9a35c]" />
                          <span>Amazon Listing</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          to="/books/$bookId"
                          params={{ bookId: b.slug }}
                          className="text-xs font-sans uppercase tracking-wider font-semibold text-[#7d5e1a] hover:underline"
                        >
                          Live Page →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Direct Orders Ledger */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-serif italic text-[#546553]">
                Customer inquiries and direct orders submitted through the storefront checkout form.
              </p>
              <button
                type="button"
                onClick={exportOrdersCsv}
                className="min-h-[40px] px-4 py-1.5 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export Orders to CSV
              </button>
            </div>

            <div className="bg-white border border-[#0c2b22]/10 overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#0c2b22]/5 border-b border-[#0c2b22]/10 text-xs font-sans uppercase tracking-wider text-[#546553]">
                    <th className="p-3.5">Order Ref</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Phone / Address</th>
                    <th className="p-3.5">Books Ordered</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0c2b22]/10 font-serif">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#0c2b22]/[0.02] transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#0c2b22] text-xs">{o.id}</td>
                      <td className="p-3.5">
                        <strong className="block text-[#0c2b22]">{o.customer}</strong>
                        <span className="text-xs text-[#5a6b58] block">{o.email}</span>
                      </td>
                      <td className="p-3.5 text-xs text-[#5a6b58]">
                        <span className="block font-medium text-[#0c2b22]">{o.phone}</span>
                        <span className="block max-w-xs">{o.address}</span>
                      </td>
                      <td className="p-3.5 text-xs text-[#0c2b22] max-w-xs">{o.items}</td>
                      <td className="p-3.5 font-bold text-[#7d5e1a]">{formatPrice(o.amount)}</td>
                      <td className="p-3.5 text-xs text-[#5a6b58]">{o.method}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-sans uppercase tracking-wider font-bold px-2.5 py-1 ${
                            o.status === "Fulfilled"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Marketing Broadcast Generator */}
        {activeTab === "marketing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Select Book */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs uppercase font-sans tracking-widest text-[#7d5e1a] font-semibold">
                Select Book to Promote
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {BOOKS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBookForPromo(b)}
                    className={`w-full p-3 text-left border transition-all flex items-center gap-3 ${
                      selectedBookForPromo.id === b.id
                        ? "bg-[#0c2b22] text-[#f4efe0] border-[#0c2b22] shadow-sm"
                        : "bg-white text-[#0c2b22] border-[#0c2b22]/15 hover:border-[#c9a35c]"
                    }`}
                  >
                    <img
                      src={b.cover}
                      alt=""
                      className="w-10 h-14 object-cover border border-[#0c2b22]/10 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-semibold line-clamp-1">{b.title}</h4>
                      <span className="text-[10px] font-sans uppercase tracking-wider opacity-80 block">
                        {b.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Marketing Copy */}
            <div className="lg:col-span-8 space-y-6">
              {/* Open Graph / Social Link Card Preview */}
              <div className="bg-white border border-[#0c2b22]/15 p-4 sm:p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#0c2b22]/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c9a35c]" />
                    <h4 className="font-serif text-base font-semibold text-[#0c2b22]">
                      Social Link &amp; Open Graph Card Preview (1200×630 PNG)
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={getBookOgImagePath(selectedBookForPromo.id)}
                      download={`${selectedBookForPromo.slug}-alfurqaan-card.png`}
                      className="min-h-[44px] px-3 py-1.5 bg-[#e2c380] text-[#07201a] hover:bg-[#c9a35c] text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Card PNG</span>
                    </a>
                    <a
                      href="/og-preview.png"
                      download="alfurqaan-storefront-og.png"
                      className="min-h-[44px] px-3 py-1.5 border border-[#0c2b22]/20 text-[#0c2b22] hover:bg-[#f4efe0] text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#7d5e1a]" />
                      <span>Storefront Banner</span>
                    </a>
                  </div>
                </div>
                <div className="border border-[#0c2b22]/15 overflow-hidden bg-[#faf7ed]">
                  <div className="aspect-[1200/630] bg-[#07201a] overflow-hidden">
                    <img
                      src={getBookOgImagePath(selectedBookForPromo.id)}
                      alt={`${selectedBookForPromo.title} social preview banner`}
                      width={1200}
                      height={630}
                      className="w-full h-full object-cover block"
                    />
                  </div>
                  <div className="p-3.5 border-t border-[#0c2b22]/10 space-y-1">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#546553] block">
                      /books/{selectedBookForPromo.slug}
                    </span>
                    <p className="font-serif text-base font-semibold text-[#0c2b22]">
                      {selectedBookForPromo.title} — Al-Furqaan Publishers
                    </p>
                    <p className="font-serif text-xs text-[#4f6857] line-clamp-2">
                      {selectedBookForPromo.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Broadcast Template */}
              <div className="bg-white border border-[#0c2b22]/15 p-4 sm:p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#0c2b22]/10">
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <h4 className="font-serif text-base font-semibold text-[#0c2b22]">
                      WhatsApp Status &amp; Broadcast Announcement
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(promoCopyWhatsApp, "wa")}
                    className="min-h-[44px] px-3 py-1 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === "wa" ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "wa" ? "Copied" : "Copy Template"}</span>
                  </button>
                </div>
                <pre className="font-sans text-xs bg-[#f4efe0]/60 p-4 border border-[#0c2b22]/10 whitespace-pre-wrap text-[#0c2b22] leading-relaxed">
                  {promoCopyWhatsApp}
                </pre>
              </div>

              {/* Twitter / Social Media Copy */}
              <div className="bg-white border border-[#0c2b22]/15 p-4 sm:p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#0c2b22]/10">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#c9a35c]" />
                    <h4 className="font-serif text-base font-semibold text-[#0c2b22]">
                      Twitter / X &amp; Social Media Post
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(promoCopyTwitter, "tw")}
                    className="min-h-[44px] px-3 py-1 bg-[#0c2b22] text-[#f4efe0] hover:bg-[#c9a35c] hover:text-[#07201a] text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === "tw" ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "tw" ? "Copied" : "Copy Post"}</span>
                  </button>
                </div>
                <pre className="font-sans text-xs bg-[#f4efe0]/60 p-4 border border-[#0c2b22]/10 whitespace-pre-wrap text-[#0c2b22] leading-relaxed">
                  {promoCopyTwitter}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
