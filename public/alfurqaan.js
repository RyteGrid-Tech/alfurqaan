(function () {
  "use strict";

  var AUTHOR = "Dr. Abdur-Raheem Adebayo Shittu";
  var COVERS = (typeof window !== "undefined" && window.AF_COVERS) || {};
  var B = [
    { id: "a-modern-introduction-to-islam", title: "A Modern Introduction to Islam", author: AUTHOR, category: "Basics of Islam", desc: "A clear, comprehensive and authentic guide to Islam — the Articles of Faith, the Pillars, Shari'ah, Jihad and social justice, explained with the precision of a legal expert and the heart of a believer.", year: 2026, pricePrint: 2500, priceEbook: 2500, cover: COVERS["a-modern-introduction-to-islam"], color: "#1b4d3e" },
    { id: "muslim-prayers-everyday-success", title: "Muslim Prayers for Everyday Success", author: AUTHOR, category: "Du'a & Prayers", print: true, desc: "A spiritual toolkit of authentic supplications from the Prophet ﷺ — for protection from witchcraft and the evil eye, prosperity, righteous sleep, matrimonial harmony and guidance through Istikhaarah.", year: 2026, pricePrint: 11999, priceEbook: 6000, cover: COVERS["muslim-prayers-everyday-success"], color: "#2a1b3d" },
    { id: "islam-christianity-why-conflict", title: "Islam and Christianity: Why the Conflict?", author: AUTHOR, category: "Comparative Religion", desc: "A forensic investigation into the roots of the Muslim–Christian divide. Using the Bible itself, the author traces Christian doctrine from pure Monotheism to the Church Councils — and calls for a return to the worship of One God.", year: 2026, pricePrint: 2500, priceEbook: 2500, cover: COVERS["islam-christianity-why-conflict"], color: "#6b3a2a" },
    { id: "a-book-of-quranic-parables", title: "A Book of Qur'anic Parables", author: AUTHOR, category: "Qur'an Study", desc: "A guided tour through the parables of the Qur'an — the spider's fragile web, the garden struck by a whirlwind, the light within a niche — turning the abstract realities of faith into vivid, unforgettable lessons.", year: 2026, pricePrint: 3500, priceEbook: 3500, cover: COVERS["a-book-of-quranic-parables"], color: "#2d6a4f" },
    { id: "critique-tijaniyyah-handbook", title: "A Critique of Dr. Adekilekun Tijani's Hand-book on the Tijaniyyah", author: AUTHOR, category: "Aqidah", desc: "A fearless, evidence-based response to the Handbook on Tijaniyyah — dissecting its claims page by page before the supreme authority of the Qur'an and the authentic Sunnah, with the precision of a legal practitioner.", year: 2026, pricePrint: 3000, priceEbook: 3000, cover: COVERS["critique-tijaniyyah-handbook"], color: "#4a2c1a" },
    { id: "what-is-sunnah-what-is-bidah", title: "What is Sunnah? What is Bid'ah?", author: AUTHOR, category: "Sunnah & Bid'ah", desc: "The perfection of Islam needs no additions. Written by Barrister Abdur-Raheem Adebayo Shittu, this clarity-inducing guide separates the gold of the Prophetic Tradition from the dust of cultural innovation — a hard look at common innovations in funerals, weddings and daily worship, weighing the evidence for each practice with the author's legal background. Return to the simplicity, beauty and ease of the Sunnah.", year: 2026, pricePrint: 2500, priceEbook: 2500, cover: COVERS["what-is-sunnah-what-is-bidah"], color: "#3a2a50" },
    { id: "path-to-paradise", title: "Path to Paradise", author: AUTHOR, category: "Afterlife", desc: "A clear map for the only journey that is guaranteed. A vivid, spiritually grounded guide through the stages of the Afterlife — the life of Barzakh, the questioning in the grave, the Day of Reckoning, the crossing of the Sirat bridge, and the two destinations: the Bliss of Jannah and the reality of Jahannam — based entirely on the Qur'an and the authentic Sunnah. It distinguishes the Road to Paradise from the Road to Hell, urging every believer: don't meet your Creator unprepared.", year: 2026, pricePrint: 2500, priceEbook: 2500, cover: COVERS["path-to-paradise"], color: "#1a4a3d" },
    { id: "islamic-ideology-democratic-socialism", title: "Islamic Ideology: Path to Democratic Socialism in Nigeria", author: AUTHOR, category: "Islamic Thought", desc: "Capitalism has failed. Communism is dead. What is the path forward? A bold intellectual manifesto arguing that the blueprint for justice lies in the Qur'an and Sunnah: true Islam is by nature a form of democratic socialism — protecting the weak, redistributing wealth through Zakat, and holding leaders accountable to God. It dissects the failure of capitalism and the flaws of Marxism, and sets out a blueprint for a just, egalitarian Nigeria where leadership is a trust, not a means of enrichment.", year: 2026, pricePrint: 2500, priceEbook: 2500, cover: COVERS["islamic-ideology-democratic-socialism"], color: "#5a2a3a" }
  ];

  var cart = JSON.parse(localStorage.getItem("afCart") || "[]");
  var activeCategory = "All", searchQuery = "", showBothFormats = true;
  var qvBook = null, qvFormat = "print";
  var MODALS = ["quickModal", "checkoutModal", "successModal", "cartDrawer"];
  var lastFocus = null;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function shorten(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function price(b, fmt) { return fmt === "print" ? b.pricePrint : b.priceEbook; }
  function fmtPrice(n) { return "₦" + n.toLocaleString("en-NG"); }

  /* ---------- dialog helpers: focus, Escape, focus trap ---------- */
  function focusables(el) {
    return Array.prototype.filter.call(
      el.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'),
      function (x) { return !x.disabled && x.offsetParent !== null; }
    );
  }
  function openDialog(el, trigger) {
    lastFocus = trigger || document.activeElement;
    el.hidden = false;
    var f = focusables(el);
    if (f.length) f[0].focus();
  }
  function closeDialog(el) {
    el.hidden = true;
    if (lastFocus && typeof lastFocus.focus === "function") { lastFocus.focus(); }
    lastFocus = null;
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      for (var i = 0; i < MODALS.length; i++) {
        var m = $(MODALS[i]);
        if (m && !m.hidden) { closeDialog(m); return; }
      }
    }
    if (e.key === "Tab") {
      var open = MODALS.map($).filter(function (m) { return m && !m.hidden; });
      if (!open.length) return;
      var d = open[0], f = focusables(d);
      if (!f.length) { e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1], cur = document.activeElement;
      if (!d.contains(cur)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
    }
  });

  function coverSVG(b) {
    var c = b.color, id = b.id, t = esc(shorten(b.title, 26)), a = esc(b.author);
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 240" aria-hidden="true" focusable="false">' +
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
      '<text x="90" y="215" text-anchor="middle" font-family="serif" font-size="8" fill="#8fa893">DR. A. A. SHITTU</text>' +
      '<text x="90" y="227" text-anchor="middle" font-family="serif" font-size="6" fill="#6c7a66">ISLAMIC BOOKS &amp; EBOOKS</text>' +
      "</svg>";
  }

  function coverHTML(b, alt) {
    if (b.cover) return '<img src="' + b.cover + '" alt="' + (alt || "") + '" loading="lazy" />';
    return coverSVG(b);
  }

  function saveCart() { localStorage.setItem("afCart", JSON.stringify(cart)); updateCartUI(); }

  function updateCartUI() {
    var cnt = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var el = $("cartCount");
    if (cnt > 0) { el.hidden = false; el.textContent = cnt; } else { el.hidden = true; }
    var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    $("checkoutBtn").disabled = cnt === 0;
    $("checkoutBtn").textContent = cnt === 0 ? "Checkout Securely" : "Checkout Securely · " + fmtPrice(total);
    $("cartTotal").textContent = fmtPrice(total);
    $("coSum").textContent = fmtPrice(total);
    var toggle = $("cartToggle");
    toggle.setAttribute("aria-label", cnt === 0 ? "Open cart, empty" : "Open cart, " + cnt + " item" + (cnt > 1 ? "s" : ""));
  }

  function renderCart() {
    var body = $("cartBody");
    if (cart.length === 0) {
      body.innerHTML = '<p style="color:#4f6857;font-style:italic;text-align:center;padding:40px 0">Your cart is empty.</p>';
      updateCartUI(); return;
    }
    var h = "";
    cart.forEach(function (item, i) {
      var b = B.find(function (x) { return x.id === item.bookId; });
      if (!b) return;
      var lbl = item.format === "print" ? "Print edition" : "Ebook";
      h += '<div class="cart-item">' +
        '<div class="cart-item-cover" aria-hidden="true">' + coverHTML(b, "") + "</div>" +
        '<div class="cart-item-info">' +
        "<h4>" + esc(b.title) + "</h4>" +
        '<span class="fmt">' + lbl + "</span>" +
        '<div class="cart-item-qty">' +
        '<button onclick="window._afDec(' + i + ')" aria-label="Decrease quantity of ' + esc(b.title) + '">−</button>' +
        "<span aria-hidden=\"true\">" + item.qty + "</span>" +
        '<button onclick="window._afInc(' + i + ')" aria-label="Increase quantity of ' + esc(b.title) + '">+</button>' +
        "</div>" +
        '<button class="cart-item-remove" onclick="window._afRem(' + i + ')" aria-label="Remove ' + esc(b.title) + ' (' + lbl + ') from cart">Remove</button>' +
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
      h += '<article class="card" data-bookid="' + b.id + '" aria-label="' + esc(b.title) + ', ' + fmtPrice(b.pricePrint) + '">' +
        '<button type="button" class="card-cover" data-action="view" aria-label="View details of ' + esc(b.title) + '">' + coverHTML(b, "") + '<span class="card-badge">' + esc(b.category) + "</span></button>" +
        '<div class="card-format" role="group" aria-label="Choose format for ' + esc(b.title) + '">' +
        '<button type="button" data-action="add" data-fmt="print" class="active" aria-pressed="true" aria-label="Add ' + esc(b.title) + ' print edition to cart">Print</button>' +
        '<button type="button" data-action="add" data-fmt="ebook" aria-pressed="false" aria-label="Add ' + esc(b.title) + ' ebook to cart">Ebook</button>' +
        "</div>" +
        '<h3 class="card-title">' + esc(b.title) + "</h3>" +
        '<p class="card-author">' + esc(b.author) + "</p>" +
        '<div class="card-footer">' +
        '<span class="card-price">' + fmtPrice(b.pricePrint) + "</span>" +
        '<button type="button" data-action="add" data-fmt="print" class="card-add" aria-label="Add ' + esc(b.title) + ' print edition to cart">+</button>' +
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
      return '<button type="button" class="chip' + (c === activeCategory ? " active" : "") + '" data-cat="' + esc(c) + '"' + (c === activeCategory ? ' aria-pressed="true"' : ' aria-pressed="false"') + ">" + esc(c) + "</button>";
    }).join("");
    chips.querySelectorAll(".chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.dataset.cat;
        renderFilters(); renderGrid();
      });
    });
  }

  function openQuickView(id, trigger) {
    qvBook = B.find(function (b) { return b.id === id; });
    if (!qvBook) return;
    qvFormat = "print";
    $("qvTitle").textContent = qvBook.title;
    $("qvAuthor").textContent = qvBook.author;
    $("qvTag").textContent = qvBook.category;
    $("qvDesc").textContent = qvBook.desc;
    $("qvMeta").innerHTML = "<span>" + (qvBook.print ? "Print &amp; Ebook" : "Ebook &middot; instant download") + "</span><span>&copy; " + qvBook.year + "</span><span>Dr. A. A. Shittu</span>";
    $("qvCover").innerHTML = coverHTML(qvBook, qvBook.title + " \u2014 book cover");
    renderQVFormat();
    updateQVPrice();
    openDialog($("quickModal"), trigger);
  }

  function renderQVFormat() {
    var f = $("qvFormat");
    if (!f) return;
    f.innerHTML = '<button type="button" data-qvfmt="print" class="' + (qvFormat === "print" ? "active" : "") + '" aria-pressed="' + (qvFormat === "print") + '">Print ' + fmtPrice(qvBook.pricePrint) + "</button>" +
      '<button type="button" data-qvfmt="ebook" class="' + (qvFormat === "ebook" ? "active" : "") + '" aria-pressed="' + (qvFormat === "ebook") + '">Ebook ' + fmtPrice(qvBook.priceEbook) + "</button>";
  }
  $("qvFormat").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-qvfmt]");
    if (btn) { qvFormat = btn.dataset.qvfmt; renderQVFormat(); updateQVPrice(); }
  });
  function updateQVPrice() { $("qvPrice").textContent = fmtPrice(price(qvBook, qvFormat)); }
  $("qvAdd").addEventListener("click", function () { if (!qvBook) return; addToCart(qvBook.id, qvFormat); closeDialog($("quickModal")); });

  function toast(msg) {
    var t = $("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._tid);
    t._tid = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  $("cartToggle").addEventListener("click", function () {
    var d = $("cartDrawer");
    if (d.hidden) { openDialog(d, this); this.setAttribute("aria-expanded", "true"); }
    else { closeDialog(d); this.setAttribute("aria-expanded", "false"); }
  });
  $("cartClose").addEventListener("click", function () { closeDialog($("cartDrawer")); $("cartToggle").setAttribute("aria-expanded", "false"); });
  $("quickClose").addEventListener("click", function () { closeDialog($("quickModal")); });
  $("quickModal").addEventListener("click", function (e) { if (e.target === this) closeDialog(this); });
  $("searchToggle").addEventListener("click", function () {
    var bar = $("searchbar"); bar.hidden = !bar.hidden;
    this.setAttribute("aria-expanded", bar.hidden ? "false" : "true");
    if (!bar.hidden) $("searchInput").focus();
  });
  $("searchInput").addEventListener("input", function () { searchQuery = this.value; renderGrid(); });
  $("searchClear").addEventListener("click", function () { $("searchInput").value = ""; searchQuery = ""; renderGrid(); $("searchInput").focus(); });
  $("formatToggle").addEventListener("change", function () { showBothFormats = this.checked; renderGrid(); });
  $("checkoutBtn").addEventListener("click", function () {
    closeDialog($("cartDrawer"));
    $("cartToggle").setAttribute("aria-expanded", "false");
    openDialog($("checkoutModal"), this);
  });
  $("checkoutClose").addEventListener("click", function () { closeDialog($("checkoutModal")); });
  $("checkoutModal").addEventListener("click", function (e) { if (e.target === this) closeDialog(this); });
  $("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var total = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
    if (total === 0) return;
    var name = this.elements.name.value.trim(), email = this.elements.email.value.trim(), addr = this.elements.address.value.trim();
    if (!name || !email || !addr) {
      var err = $("coError");
      err.hidden = false; err.textContent = "Please fill in all delivery fields."; err.focus && err.setAttribute("tabindex", "-1"); $("coError").focus();
      return;
    }
    $("coError").hidden = true;
    $("checkoutModal").hidden = true;
    var items = cart.map(function (i) {
      var b = B.find(function (x) { return x.id === i.bookId; });
      return i.qty + " x " + (b ? esc(b.title) : "Book") + " (" + i.format + ")";
    }).join("<br>");
    $("successText").textContent = "Salam, " + name.split(" ")[0] + "! Your order has been received and a confirmation will reach " + email + " shortly.";
    $("successOrder").innerHTML = "<strong>Order summary:</strong><br>" + items + "<br><strong>Total: " + fmtPrice(total) + "</strong>";
    openDialog($("successModal"), null);
    cart = []; saveCart(); renderCart();
    this.reset();
  });
  $("successClose").addEventListener("click", function () { closeDialog($("successModal")); });
  $("successModal").addEventListener("click", function (e) { if (e.target === this) closeDialog(this); });
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
    var addBtn = e.target.closest('[data-action="add"]');
    var viewBtn = e.target.closest('[data-action="view"]');
    if (addBtn) {
      e.preventDefault(); e.stopPropagation();
      var card = addBtn.closest(".card");
      addToCart(card.dataset.bookid, addBtn.dataset.fmt);
      return;
    }
    if (viewBtn) {
      openQuickView(viewBtn.closest(".card").dataset.bookid, viewBtn);
    }
  });

  renderFilters();
  renderGrid();
  updateCartUI();
  renderCart();
})();
