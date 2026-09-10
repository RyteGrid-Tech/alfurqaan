(function () {
  "use strict";

  var B = [
    { id: "the-clear-criterion", title: "The Clear Criterion", author: "Dr. Zayd al-Madani", category: "Quran Study", desc: "A warm, verse-by-verse companion to the Noble Qur'an, written for new readers and lifelong students alike. Each surah is introduced with historical context and key themes.", year: 2014, pages: 352, pricePrint: 22500, priceEbook: 12000, color: "#1b4d3e" },
    { id: "gardens-of-the-righteous", title: "Gardens of the Righteous", author: "Imam al-Nawawi (ed. Dr. Hana Yusuf)", category: "Hadith", desc: "Forty carefully chosen hadith with extensive commentary on spiritual practice, character refinement and daily worship. The celebrated Riyad al-Salihin in a fresh English edition.", year: 2017, pages: 520, pricePrint: 28500, priceEbook: 15000, color: "#5c3a1e" },
    { id: "seerah-of-mercy", title: "Seerah of Mercy", author: "Shaykh Tariq ibn Fadl", category: "Seerah", desc: "The life of the Prophet Muhammad, peace be upon him, retold for the modern heart — intimate, meticulously sourced, and beautifully paced. Includes full-colour maps and family trees.", year: 2020, pages: 780, pricePrint: 35000, priceEbook: 18000, color: "#2a1b3d" },
    { id: "hilya-of-the-beloved", title: "Hilya of the Beloved", author: "Imam al-Tirmidhi (tr. Dr. Layla Noor)", category: "Shamail", desc: "The classic description of the Prophet's character, appearance and manner — presented in a deluxe bilingual edition with illuminated ornamentation.", year: 2019, pages: 240, pricePrint: 32000, priceEbook: 16000, color: "#8b4513" },
    { id: "fount-of-wisdom", title: "Fount of Wisdom", author: "Ibn Ata'illah al-Iskandari (tr. Prof. Omar Saeed)", category: "Tasawwuf", desc: "The Hikam — a treasury of spiritual aphorisms that have nourished hearts for centuries. New translation with a reader's guide to daily contemplation.", year: 2016, pages: 312, pricePrint: 25000, priceEbook: 13000, color: "#1a3a4a" },
    { id: "echoes-from-al-andalus", title: "Echoes from Al-Andalus", author: "Dr. Fatima al-Zahra Cordova", category: "History", desc: "A journey through eight centuries of Islamic civilisation in Spain — its libraries, scholars, poets and the legacy they left to Europe and the world.", year: 2022, pages: 480, pricePrint: 30000, priceEbook: 17000, color: "#6b3a2a" },
    { id: "the-illuminated-journey", title: "The Illuminated Journey", author: "Ustadha Maryam Khalil", category: "Children", desc: "A beautifully illustrated introduction to the five pillars for young readers (7-12). Each pillar unfolds as a story, with activities and a parent guide.", year: 2023, pages: 96, pricePrint: 20000, priceEbook: 10000, color: "#2d6a4f" },
    { id: "rhythm-of-the-year", title: "Rhythm of the Year", author: "Shaykh Hamza ibn Sulayman", category: "Fiqh", desc: "A practical guide to the Islamic calendar — Ramadan, the two Eids, Ashura and the sacred months — with rulings, sunnah practices and recipes from Muslim homes worldwide.", year: 2021, pages: 368, pricePrint: 28000, priceEbook: 15000, color: "#4a2c1a" },
    { id: "the-house-of-wisdom", title: "The House of Wisdom", author: "Prof. Idris al-Baghdadi", category: "Philosophy", desc: "How the Bayt al-Hikma in Baghdad preserved and advanced Greek, Persian and Indian knowledge — and why that story still shapes science today.", year: 2018, pages: 420, pricePrint: 29000, priceEbook: 15500, color: "#3a2a50" },
    { id: "threads-of-tawhid", title: "Threads of Tawhid", author: "Dr. Aisha bint Rashid", category: "Aqidah", desc: "A clear, accessible introduction to Islamic theology — God's oneness, names and attributes — woven with stories from the Quran and the salaf.", year: 2015, pages: 288, pricePrint: 24000, priceEbook: 12000, color: "#1a4a3d" },
    { id: "mirror-of-the-soul", title: "Mirror of the Soul", author: "Al-Ghazali (abridged by Dr. Nura Farid)", category: "Tazkiyah", desc: "Selections from the Ihya Ulum al-Din on purifying the heart, arranged as a forty-day programme of daily readings and reflection exercises.", year: 2024, pages: 376, pricePrint: 34000, priceEbook: 17500, color: "#5a2a3a" },
    { id: "recite-and-rise", title: "Recite and Rise", author: "Hafizah Amina bint Dawud", category: "Tajwid", desc: "A step-by-step guide to Qur'anic recitation — rules of tajwid, makharij, and the spiritual adab of approaching Allah's words. QR codes link to audio demonstrations.", year: 2020, pages: 200, pricePrint: 18000, priceEbook: 9500, color: "#2a5a4a" }
  ];

  var cart = JSON.parse(localStorage.getItem("afCart") || "[]");
  var activeCategory = "All", searchQuery = "", showBothFormats = true;
  var qvBook = null, qvFormat = "print";

  function $(id) { return document.getElementById(id); }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function shorten(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function price(b, fmt) { return fmt === "print" ? b.pricePrint : b.priceEbook; }
  function fmtPrice(n) { return "₦" + n.toLocaleString("en-NG"); }

  function coverSVG(b) {
    var c = b.color, id = b.id, t = esc(shorten(b.title, 26)), a = esc(b.author);
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 240">' +
      '<defs>' +
      '<linearGradient id="g_' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + c + '"/><stop offset="100%" stop-color="#000"/>' +
      "</linearGradient>" +
      '<pattern id="p_' + id + '" width="8" height="8" patternUnits="userSpaceOnUse">' +
      '<circle cx="4" cy="4" r="0.8" fill="rgba(201,163,92,0.25)"/>' +
      "</pattern>" +
      "</defs>" +
      '<rect width="180" height="240" fill="url(#g_' + id + ')" rx="2"/>' +
      '<rect width="180" height="240" fill="url(#p_' + id + ')" rx="2"/>' +
      '<line x1="16" y1="28" x2="164" y2="28" stroke="#c9a35c" stroke-width="0.5"/>' +
      '<line x1="16" y1="32" x2="164" y2="32" stroke="#c9a35c" stroke-width="0.3"/>' +
      '<text x="90" y="112" text-anchor="middle" font-family="serif" font-size="13" fill="#e2c380" font-style="italic">' + t + "</text>" +
      '<text x="90" y="140" text-anchor="middle" font-family="serif" font-size="14" font-weight="bold" fill="#f4efe0">' + t + "</text>" +
      '<text x="90" y="160" text-anchor="middle" font-family="serif" font-size="10" fill="#8fa893" font-style="italic">' + a + "</text>" +
      '<line x1="40" y1="195" x2="140" y2="195" stroke="#c9a35c" stroke-width="0.3"/>' +
      '<text x="90" y="215" text-anchor="middle" font-family="serif" font-size="8" fill="#8fa893">AL FURQAAN</text>' +
      '<text x="90" y="227" text-anchor="middle" font-family="serif" font-size="6" fill="#6c7a66">PUBLISHERS LTD</text>' +
      "</svg>";
  }

  function saveCart() { localStorage.setItem("afCart", JSON.stringify(cart)); updateCartUI(); }

  function updateCartUI() {
    var cnt = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var el = $("cartCount");
    if (cnt > 0) { el.hidden = false; el.textContent = cnt; } else { el.hidden = true; }
    var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    $("checkoutBtn").disabled = cnt === 0;
    $("cartTotal").textContent = fmtPrice(total);
    $("coSum").textContent = fmtPrice(total);
  }

  function renderCart() {
    var body = $("cartBody");
    if (cart.length === 0) {
      body.innerHTML = '<p style="color:#8fa893;font-style:italic;text-align:center;padding:40px 0">Your cart is empty.</p>';
      updateCartUI(); return;
    }
    var h = "";
    cart.forEach(function (item, i) {
      var b = B.find(function (x) { return x.id === item.bookId; });
      if (!b) return;
      var lbl = item.format === "print" ? "Print edition" : "Ebook";
      h += '<div class="cart-item">' +
        '<div class="cart-item-cover">' + coverSVG(b) + "</div>" +
        '<div class="cart-item-info">' +
        "<h4>" + esc(b.title) + "</h4>" +
        '<span class="fmt">' + lbl + "</span>" +
        '<div class="cart-item-qty">' +
        '<button onclick="window._afDec(' + i + ')">−</button>' +
        "<span>" + item.qty + "</span>" +
        '<button onclick="window._afInc(' + i + ')">+</button>' +
        "</div>" +
        '<button class="cart-item-remove" onclick="window._afRem(' + i + ')">Remove</button>' +
        "</div>" +
        '<div class="cart-item-price">' + fmtPrice(item.price * item.qty) + "</div>" +
        "</div>";
    });
    body.innerHTML = h;
    updateCartUI();
  }

  function addToCart(bookId, fmt, qty) {
    qty = qty || 1;
    var b = B.find(function (x) { return x.id === bookId; });
    if (!b) return;
    var p = price(b, fmt);
    var ex = cart.find(function (x) { return x.bookId === bookId && x.format === fmt; });
    if (ex) { ex.qty += qty; } else { cart.push({ bookId: bookId, format: fmt, price: p, qty: qty }); }
    toast("✔  " + esc(b.title) + " (" + (fmt === "print" ? "Print" : "Ebook") + ") added to cart");
    saveCart(); renderCart();
  }

  window._afInc = function (i) { cart[i].qty++; saveCart(); renderCart(); };
  window._afDec = function (i) { if (cart[i].qty > 1) { cart[i].qty--; saveCart(); renderCart(); } };
  window._afRem = function (i) { cart.splice(i, 1); saveCart(); renderCart(); };

  function filtered() {
    var b = B.slice();
    if (activeCategory !== "All") b = b.filter(function (x) { return x.category === activeCategory; });
    if (searchQuery) {
      var q = searchQuery.toLowerCase();
      b = b.filter(function (x) { return x.title.toLowerCase().indexOf(q) >= 0 || x.author.toLowerCase().indexOf(q) >= 0 || x.category.toLowerCase().indexOf(q) >= 0; });
    }
    return b;
  }

  function renderGrid() {
    var books = filtered();
    var grid = $("grid"), empty = $("empty");
    if (books.length === 0) { grid.innerHTML = ""; empty.hidden = false; return; }
    empty.hidden = true;
    var h = "";
    books.forEach(function (b) {
      h += '<article class="card" data-bookid="' + b.id + '">' +
        '<div class="card-cover">' + coverSVG(b) + '<span class="card-badge">' + b.category + "</span></div>" +
        '<div class="card-format">' +
        '<button data-action="add" data-fmt="print" class="active">Print</button>' +
        '<button data-action="add" data-fmt="ebook">Ebook</button>' +
        "</div>" +
        '<h3 class="card-title">' + esc(b.title) + "</h3>" +
        '<p class="card-author">' + esc(b.author) + "</p>" +
        '<div class="card-footer">' +
        '<span class="card-price">' + fmtPrice(b.pricePrint) + "</span>" +
        '<button data-action="add" data-fmt="print" class="card-add" title="Add to cart">+</button>' +
        "</div>" +
        "</article>";
    });
    grid.innerHTML = h;
  }

  function renderFilters() {
    var cats = ["All"];
    B.forEach(function (b) { if (cats.indexOf(b.category) < 0) cats.push(b.category); });
    var chips = $("filterChips");
    chips.innerHTML = cats.map(function (c) {
      return '<button class="chip' + (c === activeCategory ? " active" : "") + '" data-cat="' + c + '">' + c + "</button>";
    }).join("");
    chips.querySelectorAll(".chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.dataset.cat;
        renderFilters(); renderGrid();
      });
    });
  }

  function openQuickView(id) {
    qvBook = B.find(function (b) { return b.id === id; });
    if (!qvBook) return;
    qvFormat = "print";
    $("qvTitle").textContent = qvBook.title;
    $("qvAuthor").textContent = qvBook.author;
    $("qvTag").textContent = qvBook.category;
    $("qvDesc").textContent = qvBook.desc;
    $("qvMeta").innerHTML = "<span>" + qvBook.pages + " pages</span><span>First pub. " + qvBook.year + "</span><span>ISBN 978-0-00-000000-0</span>";
    $("qvCover").innerHTML = coverSVG(qvBook);
    renderQVFormat();
    updateQVPrice();
    $("quickModal").hidden = false;
  }

  function renderQVFormat() {
    var f = $("qvFormat");
    if (!f) return;
    f.innerHTML = '<button data-qvfmt="print" class="' + (qvFormat === "print" ? "active" : "") + '">Print ' + fmtPrice(qvBook.pricePrint) + "</button>" +
      '<button data-qvfmt="ebook" class="' + (qvFormat === "ebook" ? "active" : "") + '">Ebook ' + fmtPrice(qvBook.priceEbook) + "</button>";
  }
  $("qvFormat").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-qvfmt]");
    if (btn) { qvFormat = btn.dataset.qvfmt; renderQVFormat(); updateQVPrice(); }
  });
  function updateQVPrice() { $("qvPrice").textContent = fmtPrice(price(qvBook, qvFormat)); }
  $("qvAdd").addEventListener("click", function () { if (!qvBook) return; addToCart(qvBook.id, qvFormat); $("quickModal").hidden = true; });

  function toast(msg) {
    var t = $("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._tid);
    t._tid = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  $("cartToggle").addEventListener("click", function () { $("cartDrawer").hidden = !$("cartDrawer").hidden; });
  $("cartClose").addEventListener("click", function () { $("cartDrawer").hidden = true; });
  $("quickClose").addEventListener("click", function () { $("quickModal").hidden = true; });
  $("quickModal").addEventListener("click", function (e) { if (e.target === this) this.hidden = true; });
  $("searchToggle").addEventListener("click", function () {
    var bar = $("searchbar"); bar.hidden = !bar.hidden;
    if (!bar.hidden) $("searchInput").focus();
  });
  $("searchInput").addEventListener("input", function () { searchQuery = this.value; renderGrid(); });
  $("searchClear").addEventListener("click", function () { $("searchInput").value = ""; searchQuery = ""; renderGrid(); });
  $("formatToggle").addEventListener("change", function () { showBothFormats = this.checked; renderGrid(); });
  $("checkoutBtn").addEventListener("click", function () { $("cartDrawer").hidden = true; $("checkoutModal").hidden = false; });
  $("checkoutClose").addEventListener("click", function () { $("checkoutModal").hidden = true; });
  $("checkoutModal").addEventListener("click", function (e) { if (e.target === this) this.hidden = true; });
  $("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    if (total === 0) return;
    var name = this.elements.name.value.trim(), email = this.elements.email.value.trim(), addr = this.elements.address.value.trim();
    if (!name || !email || !addr) {
      $("coError").hidden = false; $("coError").textContent = "Please fill in all delivery fields."; return;
    }
    $("coError").hidden = true;
    $("checkoutModal").hidden = true;
    var items = cart.map(function (i) {
      var b = B.find(function (x) { return x.id === i.bookId; });
      return i.qty + " x " + (b ? b.title : "Book") + " (" + i.format + ")";
    }).join("<br>");
    $("successText").textContent = "Salam, " + name.split(" ")[0] + "! Your order has been received and a confirmation will reach " + email + " shortly.";
    $("successOrder").innerHTML = "<strong>Order summary:</strong><br>" + items + "<br><strong>Total: " + fmtPrice(total) + "</strong>";
    $("successModal").hidden = false;
    cart = []; saveCart(); renderCart();
    this.reset();
  });
  $("successClose").addEventListener("click", function () { $("successModal").hidden = true; });
  $("successModal").addEventListener("click", function (e) { if (e.target === this) this.hidden = true; });
  $("letterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    $("letterMsg").textContent = "✔ JazakAllah khayr! You are on the list.";
    this.reset();
    setTimeout(function () { $("letterMsg").textContent = ""; }, 4000);
  });

  var headScrolled = false;
  window.addEventListener("scroll", function () {
    var sc = window.scrollY > 20;
    if (sc !== headScrolled) { document.querySelector(".site-head").classList.toggle("scrolled", sc); headScrolled = sc; }
  });

  $("year").textContent = new Date().getFullYear();

  $("grid").addEventListener("click", function (e) {
    var btn = e.target.closest('[data-action="add"]');
    var cover = e.target.closest(".card-cover");
    if (btn) {
      e.preventDefault(); e.stopPropagation();
      var card = btn.closest(".card");
      var bookId = card.dataset.bookid;
      var fmt = btn.dataset.fmt;
      addToCart(bookId, fmt);
      return;
    }
    if (cover) {
      var card2 = cover.closest(".card");
      openQuickView(card2.dataset.bookid);
    }
  });

  renderFilters();
  renderGrid();
  updateCartUI();
  renderCart();
})();
