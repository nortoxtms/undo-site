/* ============================================================
   35 — Application Logic
   Shared header/footer, cart, and page controllers.
   ============================================================ */

/* ---------- Icon library ---------- */
const IC = {
  search:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  user:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/></svg>',
  bag:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  heart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  menu:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  arrow:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  truck:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>',
  shield:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  scissors:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8 8l12 10M8 16L20 6"/></svg>',
  leather: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5h16v14H4z"/><path d="M4 5l16 14M20 5L4 19" opacity=".4"/></svg>',
  award:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="9" r="5"/><path d="M9 13l-2 8 5-3 5 3-2-8"/></svg>',
  star:    '<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.5 9.2l5.9-.9z"/></svg>',
  starE:   '<svg viewBox="0 0 24 24" class="empty" fill="none"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.5 9.2l5.9-.9z"/></svg>',
  trash:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>',
  check:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12l5 5 9-11"/></svg>',
  filter:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>',
  ig:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  fb:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8c0-.6.4-1 1-1z"/></svg>',
  pin:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2a9 9 0 0 0-3 17.5c-.2-1-.4-2.5 0-3.6l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8A9 9 0 0 0 12 2z"/></svg>',
};

/* ---------- Foto görseller (assets/) ---------- */
const ASSETS = {
  hero:   "assets/hero.webp",
  story:  "assets/story.webp",
  footer: "assets/footer.webp",
  cat: {
    kadin:      "assets/cat-kadin.webp",
    erkek:      "assets/cat-erkek.webp",
    aksesuar:   "assets/cat-aksesuar.webp",
    koleksiyon: "assets/cat-koleksiyon.webp",
  },
};

/* ---------- Cart store (persists across pages) ---------- */
const Cart = {
  KEY: "atelier35_cart",
  read() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch { return []; } },
  write(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); updateCartCount(); },
  add(item) {
    const items = this.read();
    const match = items.find(i => i.id === item.id && i.color === item.color && i.size === item.size);
    if (match) match.qty += item.qty; else items.push(item);
    this.write(items);
  },
  setQty(idx, qty) { const items = this.read(); if (items[idx]) { items[idx].qty = Math.max(1, qty); this.write(items); } },
  remove(idx) { const items = this.read(); items.splice(idx, 1); this.write(items); },
  count() { return this.read().reduce((s,i)=>s+i.qty, 0); },
  subtotal() { return this.read().reduce((s,i)=>s + i.price*i.qty, 0); },
  clear() { this.write([]); },
};

const FREE_SHIP_THRESHOLD = 7500;
const SHIP_COST = 0; // free shipping in this demo

function updateCartCount() {
  const c = Cart.count();
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = c;
    el.classList.toggle("show", c > 0);
  });
}
function updateWishCount() {
  const c = (typeof Wishlist !== "undefined") ? Wishlist.count() : 0;
  document.querySelectorAll(".wish-count").forEach(el => {
    el.textContent = c;
    el.classList.toggle("show", c > 0);
  });
}
function toggleWish(id, el) {
  const active = Wishlist.toggle(id);
  document.querySelectorAll(`.wish[data-id="${id}"]`).forEach(b => b.classList.toggle("active", active));
  updateWishCount();
  toast(active ? "Favorilere eklendi" : "Favorilerden çıkarıldı");
}

/* ---------- Toast ---------- */
function toast(msg) {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; wrap.setAttribute("role", "status"); wrap.setAttribute("aria-live", "polite"); document.body.appendChild(wrap); }
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `${IC.check}<span>${msg}</span>`;
  wrap.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => { t.classList.remove("show"); setTimeout(()=>t.remove(), 500); }, 2600);
}

/* ---------- Header & Footer (shared) ---------- */
const NAV = [
  { href: "shop.html", label: "Tüm Ürünler" },
  { href: "shop.html?cat=kadin", label: "Kadın" },
  { href: "shop.html?cat=erkek", label: "Erkek" },
  { href: "shop.html?cat=aksesuar", label: "Aksesuar" },
  { href: "shop.html", label: "Koleksiyonlar" },
  { href: "about.html", label: "Hakkımızda" },
];

function renderHeader(active) {
  if (document.body.dataset.page === "shop") {
    active = { kadin: "Kadın", erkek: "Erkek", aksesuar: "Aksesuar" }[qs("cat")] || "Tüm Ürünler";
  }
  const links = NAV.map(n => `<a href="${n.href}" class="${active===n.label?'active':''}">${n.label}</a>`).join("");
  const mlinks = NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("");
  const html = `
  <div class="topbar">Türkiye'nin dört bir yanına ücretsiz ve sigortalı kargo · 35 yıllık ustalık</div>
  <header class="site-header">
    <div class="wrap header-inner">
      <button class="menu-toggle" aria-label="Menü" onclick="toggleMenu(true)">${IC.menu}</button>
      <a href="index.html" class="brand" aria-label="UNDO ana sayfa">
        <span class="mark">UNDO</span>
      </a>
      <nav class="main-nav">${links}</nav>
      <div class="header-actions">
        <button class="icon-btn" type="button" aria-label="Ara" aria-expanded="false" id="search-toggle" onclick="toggleSearch()">${IC.search}</button>
        <a href="account.html?tab=favorites" class="icon-btn" aria-label="Favorilerim">${IC.heart}<span class="cart-count wish-count"></span></a>
        <a href="account.html" class="icon-btn" aria-label="${Auth.isLoggedIn()?'Hesabım':'Giriş Yap'}" title="${Auth.isLoggedIn()?('Merhaba, '+Auth.current().name):'Giriş Yap'}">${IC.user}${Auth.isLoggedIn()?'<span class="acct-dot"></span>':''}</a>
        <a href="cart.html" class="icon-btn" aria-label="Sepet">${IC.bag}<span class="cart-count"></span></a>
      </div>
    </div>
    <form class="search-bar" id="search-bar" action="shop.html" role="search">
      <div class="wrap search-bar-inner">
        ${IC.search}
        <input type="search" name="q" id="search-input" placeholder="Ürün, renk veya malzeme ara…" aria-label="Ürün ara" autocomplete="off" value="${escapeAttr(qs("q") || "")}">
        <button class="btn btn-ghost-dark btn-sm" type="submit">Ara</button>
      </div>
    </form>
  </header>
  <div class="scrim" onclick="closeOverlays()"></div>
  <nav class="mobile-nav">
    <button class="close" onclick="toggleMenu(false)" aria-label="Kapat">${IC.close}</button>
    ${mlinks}
  </nav>`;
  const mount = document.getElementById("site-header");
  if (mount) mount.innerHTML = html;
  updateCartCount();
  updateWishCount();
}

function toggleMenu(open) {
  document.querySelector(".mobile-nav")?.classList.toggle("open", open);
  document.querySelector(".scrim")?.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}

function toggleSearch(open) {
  const bar = document.getElementById("search-bar");
  if (!bar) return;
  const next = (open === undefined) ? !bar.classList.contains("open") : open;
  bar.classList.toggle("open", next);
  document.getElementById("search-toggle")?.setAttribute("aria-expanded", next);
  if (next) document.getElementById("search-input")?.focus();
}
function closeOverlays() {
  toggleMenu(false);
  toggleFilters(false);
  toggleSearch(false);
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeOverlays(); });

function renderFooter() {
  const html = `
  <div class="trust-bar">
    <div class="wrap trust-grid">
      <div class="trust">${IC.truck}<div><h4>Ücretsiz Kargo</h4><p>Tüm siparişlerde geçerli</p></div></div>
      <div class="trust">${IC.refresh}<div><h4>14 Gün İçinde İade</h4><p>Kolay iade ve değişim</p></div></div>
      <div class="trust">${IC.shield}<div><h4>Güvenli Ödeme</h4><p>Tüm kartlara 3D Secure</p></div></div>
    </div>
  </div>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="mark">UNDO</div>
          <p>1989'dan bu yana hakiki deriyi zamansız tasarımla buluşturuyoruz. Her dikişte ustalık, her üründe tutku.</p>
          <div class="socials">
            <a href="#" aria-label="Instagram">${IC.ig}</a>
            <a href="#" aria-label="Facebook">${IC.fb}</a>
            <a href="#" aria-label="Pinterest">${IC.pin}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Alışveriş</h4>
          <a href="shop.html?cat=kadin">Kadın</a>
          <a href="shop.html?cat=erkek">Erkek</a>
          <a href="shop.html">Yeni Sezon</a>
          <a href="shop.html">Koleksiyonlar</a>
        </div>
        <div class="footer-col">
          <h4>Kurumsal</h4>
          <a href="about.html">Hakkımızda</a>
          <a href="about.html">Ustalığımız</a>
          <a href="#">Mağazalar</a>
          <a href="#">İletişim</a>
        </div>
        <div class="footer-col">
          <h4>Yardım</h4>
          <a href="#">Kargo & Teslimat</a>
          <a href="#">İade & Değişim</a>
          <a href="#">Beden Rehberi</a>
          <a href="#">Deri Bakımı</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 UNDO. Tüm hakları saklıdır.</p>
        <div class="pay-icons"><span>Visa</span><span>Mastercard</span><span>Troy</span><span>3D Secure</span></div>
      </div>
    </div>
  </footer>`;
  const mount = document.getElementById("site-footer");
  if (mount) mount.innerHTML = html;
}

/* ---------- Product card ---------- */
function starHTML(rating) {
  let s = "";
  for (let i=1;i<=5;i++) s += (i<=Math.round(rating)) ? IC.star : IC.starE;
  return `<span class="stars">${s}</span>`;
}
function swatchDots(colors) {
  return colors.map(c => `<span class="swatch" style="background:${LEATHER_TONES[c].hex}" title="${LEATHER_TONES[c].name}"></span>`).join("");
}
function productCard(p) {
  const img = p.images[p.colors[0]];
  const alt = p.gallery[1];
  return `
  <article class="product-card">
    <div class="thumb">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <button class="wish ${(typeof Wishlist!=="undefined"&&Wishlist.has(p.id))?'active':''}" data-id="${p.id}" aria-label="Favorilere ekle" onclick="event.preventDefault();toggleWish('${p.id}')">${IC.heart}</button>
      <a href="product.html?id=${p.id}" aria-label="${p.name}"><img src="${img}" alt="${p.name}" loading="lazy" decoding="async">${alt ? `<img class="thumb-alt" src="${alt.src}" alt="" loading="lazy" decoding="async">` : ""}</a>
      <div class="quick-add"><button class="btn btn-solid btn-sm btn-block" onclick="quickAdd('${p.id}')">Sepete Ekle</button></div>
    </div>
    <div class="product-info">
      <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-meta">
        <span class="price">${p.old?`<span class="old">${TL(p.old)}</span>`:""}${TL(p.price)}</span>
        <span class="swatch-row">${swatchDots(p.colors)}</span>
      </div>
    </div>
  </article>`;
}
function quickAdd(id) {
  const p = PRODUCTS.find(x=>x.id===id);
  Cart.add({ id: p.id, name: p.name, price: p.price, color: p.colors[0], colorName: LEATHER_TONES[p.colors[0]].name, size: p.sizes[Math.floor(p.sizes.length/2)], qty: 1, img: p.images[p.colors[0]] });
  toast(`${p.name} sepete eklendi`);
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) { els.forEach(e=>e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  els.forEach(e=>io.observe(e));
}

/* ---------- Query helper ---------- */
function qs(name) { return new URLSearchParams(location.search).get(name); }
function escapeAttr(s) { return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

/* ============================================================
   PAGE CONTROLLERS
   ============================================================ */

/* ---- HOME ---- */
function initHome() {
  // category cards
  const catMount = document.getElementById("home-cats");
  if (catMount) {
    const cats = [
      { key:"kadin", label:"Kadın", tone:"bordo" },
      { key:"erkek", label:"Erkek", tone:"kahve" },
      { key:"aksesuar", label:"Aksesuar", tone:"konyak" },
      { key:"koleksiyon", label:"Koleksiyonlar", tone:"siyah" },
    ];
    catMount.innerHTML = cats.map(c=>`
      <a class="cat-card" href="shop.html${c.key==='kadin'||c.key==='erkek'?'?cat='+c.key:''}">
        <img class="ph" src="${ASSETS.cat[c.key] || scenePH(c.tone)}" alt="${c.label}">
        <div class="cat-label"><h3>${c.label}</h3><span>Keşfet ${IC.arrow}</span></div>
      </a>`).join("");
  }
  // featured products
  const prodMount = document.getElementById("home-products");
  if (prodMount) {
    const featured = PRODUCTS.filter(p=>["turuncu-suet-biker","bordo-kruvaze-blazer","siyah-puskullu-biker","yilan-desenli-ceket","taba-suet-blazer","zeytin-deri-parka","siyah-orgu-bomber","kahve-eskitme-ceket"].includes(p.id));
    const fill = PRODUCTS.filter(p=>!featured.includes(p)).slice(0, Math.max(0, 8 - featured.length));
    prodMount.innerHTML = [...featured, ...fill].slice(0,8).map(productCard).join("");
  }
}

/* ---- SHOP LISTING ---- */
const ShopState = { cat:"all", colors:new Set(), materials:new Set(), maxPrice: 25000, sort:"pop", q:"" };
/* Türkçe karakter ve büyük/küçük harf farkını yok sayarak arama */
function foldText(s) { return (s || "").toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function matchesSearch(p, q) {
  const hay = foldText([p.name, p.material, ...p.colors.map(c => LEATHER_TONES[c].name)].join(" "));
  return foldText(q).split(/\s+/).filter(Boolean).every(w => hay.includes(w));
}
function initShop() {
  const grid = document.getElementById("shop-grid");
  if (!grid) return;
  const urlCat = qs("cat");
  if (urlCat) ShopState.cat = urlCat;
  ShopState.q = (qs("q") || "").trim();
  // fiyat filtresi katalogdaki en yüksek fiyatı kapsasın (panelden yüksek fiyat girilebilir)
  const topPrice = Math.max(ShopState.maxPrice, ...PRODUCTS.map(p => p.price));
  ShopState.maxPrice = topPrice;
  const priceInput = document.querySelector('.filter-block input[type="range"]');
  if (priceInput) { priceInput.max = Math.ceil(topPrice / 500) * 500; priceInput.value = priceInput.max; }
  const priceVal = document.getElementById("price-val");
  if (priceVal) priceVal.textContent = TL(+(priceInput ? priceInput.max : topPrice));

  // title
  const titles = { all:"Tüm Koleksiyon", kadin:"Kadın Koleksiyonu", erkek:"Erkek Koleksiyonu", aksesuar:"Aksesuar" };
  const titleEl = document.getElementById("shop-title");
  const crumbEl = document.getElementById("shop-crumb");
  const heading = ShopState.q ? `“${ShopState.q}” için sonuçlar` : (titles[ShopState.cat] || "Koleksiyon");
  if (titleEl) titleEl.textContent = heading;
  if (crumbEl) crumbEl.textContent = heading;

  // build color filter dynamically
  const allColors = [...new Set(PRODUCTS.flatMap(p=>p.colors))];
  const colorMount = document.getElementById("filter-colors");
  if (colorMount) colorMount.innerHTML = allColors.map(c=>`<button type="button" class="color-dot" style="background:${LEATHER_TONES[c].hex}" title="${LEATHER_TONES[c].name}" aria-label="${LEATHER_TONES[c].name}" data-color="${c}" onclick="toggleColor('${c}',this)"></button>`).join("");

  // category filter list
  const catMount = document.getElementById("filter-cats");
  if (catMount) {
    const cats = [["all","Tümü"],["kadin","Kadın"],["erkek","Erkek"]];
    catMount.innerHTML = cats.map(([k,l])=>`<div class="filter-opt ${ShopState.cat===k?'active':''}" data-cat="${k}" onclick="setCat('${k}',this)"><input type="radio" name="cat" ${ShopState.cat===k?'checked':''}> ${l}</div>`).join("");
  }
  const sortSel = document.getElementById("sort-select");
  if (sortSel) sortSel.addEventListener("change", e=>{ ShopState.sort=e.target.value; renderShop(); });
  renderShop();
}
function setCat(k, el) { ShopState.cat=k; document.querySelectorAll("[data-cat]").forEach(x=>{x.classList.remove("active"); x.querySelector("input").checked=false;}); el.classList.add("active"); el.querySelector("input").checked=true; renderShop(); }
function toggleColor(c, el) { if (ShopState.colors.has(c)) ShopState.colors.delete(c); else ShopState.colors.add(c); el.classList.toggle("active"); renderShop(); }
function toggleMaterial(m, el) { if (ShopState.materials.has(m)) ShopState.materials.delete(m); else ShopState.materials.add(m); el.classList.toggle("active"); renderShop(); }
function setMaxPrice(v) { ShopState.maxPrice=+v; document.getElementById("price-val").textContent=TL(+v); renderShop(); }
function renderShop() {
  let list = PRODUCTS.slice();
  if (ShopState.cat!=="all" && ["kadin","erkek"].includes(ShopState.cat)) list = list.filter(p=>p.cat===ShopState.cat);
  else if (ShopState.cat==="aksesuar") list = [];
  if (ShopState.q) list = list.filter(p=>matchesSearch(p, ShopState.q));
  if (ShopState.colors.size) list = list.filter(p=>p.colors.some(c=>ShopState.colors.has(c)));
  if (ShopState.materials.size) list = list.filter(p=>ShopState.materials.has(p.material));
  list = list.filter(p=>p.price<=ShopState.maxPrice);
  const sorters = { pop:(a,b)=>b.reviews-a.reviews, "price-asc":(a,b)=>a.price-b.price, "price-desc":(a,b)=>b.price-a.price, rating:(a,b)=>b.rating-a.rating, new:(a,b)=>(b.badge==="Yeni")-(a.badge==="Yeni") };
  list.sort(sorters[ShopState.sort]||sorters.pop);
  const grid = document.getElementById("shop-grid");
  const count = document.getElementById("result-count");
  if (count) count.textContent = `${list.length} ürün bulundu`;
  grid.innerHTML = list.length ? list.map(productCard).join("") : `<div class="empty-state" style="grid-column:1/-1">${IC.bag}<h3>Ürün bulunamadı</h3><p>${ShopState.q ? "Aramanızla eşleşen ürün yok. Farklı bir kelime deneyin." : "Bu seçimde ürün yok. Filtreleri değiştirmeyi deneyin."}</p><a href="shop.html" class="btn btn-outline btn-sm">Tüm Ürünler</a></div>`;
}
function toggleFilters(open){ document.querySelector(".filters")?.classList.toggle("open", open); document.querySelector(".scrim")?.classList.toggle("open", open); }

/* ---- PRODUCT DETAIL ---- */
let PDP = { product:null, color:null, size:null, qty:1, view:0 };
function initProduct() {
  const mount = document.getElementById("pdp-root");
  if (!mount) return;
  const id = qs("id") || PRODUCTS[0].id;
  const p = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];
  PDP.product = p; PDP.color = p.colors[0]; PDP.size = null; PDP.qty = 1; PDP.view = 0;
  document.title = `${p.name} · UNDO`;

  document.getElementById("pdp-crumb").textContent = p.name;
  document.getElementById("pdp-crumb-cat").textContent = p.cat==="kadin"?"Kadın":p.cat==="erkek"?"Erkek":"Koleksiyon";
  document.getElementById("pdp-crumb-cat").href = "shop.html?cat="+p.cat;

  renderPDP();
  renderRelated(p);
  initTabs();
}
function renderPDP() {
  const p = PDP.product;
  const shot = p.gallery[PDP.view] || p.gallery[0];
  document.getElementById("pdp-main").innerHTML = `<img src="${shot.src}" alt="${p.name} — ${shot.label}">`;
  document.getElementById("pdp-thumbs").innerHTML = p.gallery.map((g,i)=>`<button type="button" class="${i===PDP.view?'active':''}" aria-label="${g.label} görünümü" ${i===PDP.view?'aria-current="true"':''} onclick="setView(${i})"><img src="${g.src}" alt=""></button>`).join("");
  document.getElementById("pdp-thumbs").hidden = p.gallery.length < 2;

  document.getElementById("pdp-name").textContent = p.name;
  const _r = pdpRating(p);
  document.getElementById("pdp-rating").innerHTML = `${starHTML(_r.rating)} <span>${_r.rating.toFixed(1)} · ${_r.count} değerlendirme</span>`;
  document.getElementById("pdp-price").innerHTML = `${p.old?`<span class="old">${TL(p.old)}</span>`:""}${TL(p.price)}`;
  document.getElementById("pdp-desc").textContent = p.desc;
  document.getElementById("pdp-colorname").textContent = LEATHER_TONES[PDP.color].name;
  document.getElementById("pdp-colors").innerHTML = p.colors.map(c=>`<button type="button" class="color-dot ${c===PDP.color?'active':''}" style="background:${LEATHER_TONES[c].hex}" title="${LEATHER_TONES[c].name}" aria-label="${LEATHER_TONES[c].name}" onclick="setColor('${c}')"></button>`).join("");
  document.getElementById("pdp-sizes").innerHTML = p.sizes.map(s=>`<button class="size-btn ${s===PDP.size?'active':''}" onclick="setSize('${s}')">${s}</button>`).join("");
  document.getElementById("pdp-qty").value = PDP.qty;

  // tab content
  document.getElementById("tab-desc").innerHTML = `<p>${p.desc}</p><p>Her parça, alanında 35 yıllık deneyime sahip ustalarımız tarafından tek tek elden geçirilir. Kullandıkça yumuşayan ve size özel bir patina kazanan hakiki deri, yıllar boyu yanınızda kalacak bir yatırımdır.</p>`;
  document.getElementById("tab-specs").innerHTML = `<ul>
    <li>%100 Hakiki ${p.material}</li>
    <li>El işçiliği ile üretim</li>
    <li>Astarlı iç yüzey</li>
    <li>Dayanıklı metal aksesuarlar</li>
    <li>Renk: ${LEATHER_TONES[PDP.color].name}</li>
    <li>Bakım: Nemli bezle silin, deri kremi ile besleyin</li>
  </ul>`;

  // favori butonu
  const wishBtn = document.getElementById("pdp-wish");
  if (wishBtn) {
    const fav = Wishlist.has(p.id);
    wishBtn.className = "pdp-wish-btn" + (fav ? " active" : "");
    wishBtn.innerHTML = `${IC.heart} ${fav ? "Favorilerde" : "Favorilere Ekle"}`;
  }
  renderReviews(p);
}

/* ---- PDP: puan & değerlendirme ---- */
function pdpRating(p) {
  const uAvg = Reviews.avg(p.id), uCount = Reviews.count(p.id);
  if (!uCount) return { rating: p.rating, count: p.reviews };
  const rating = (p.rating * p.reviews + uAvg * uCount) / (p.reviews + uCount);
  return { rating, count: p.reviews + uCount };
}
function pdpToggleWish() { toggleWish(PDP.product.id); renderPDP(); }

let REVIEW_DRAFT = 0;
function starPicker(current) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += `<button type="button" class="star-pick ${i<=current?'on':''}" onclick="setReviewStar(${i})" aria-label="${i} yıldız">${i<=current?IC.star:IC.starE}</button>`;
  return s;
}
function setReviewStar(v) { REVIEW_DRAFT = v; const el = document.getElementById("review-stars"); if (el) el.innerHTML = starPicker(v); }
function submitReview() {
  const p = PDP.product;
  if (!Auth.isLoggedIn()) { toast("Puan vermek için giriş yapın"); location.href = "account.html?next=product&id=" + p.id; return; }
  if (!REVIEW_DRAFT) { toast("Lütfen yıldız seçin"); return; }
  const comment = (document.getElementById("review-comment") || {}).value || "";
  Reviews.add(p.id, REVIEW_DRAFT, comment);
  toast("Değerlendirmeniz kaydedildi");
  renderPDP();
}
function renderReviews(p) {
  const mount = document.getElementById("tab-reviews");
  if (!mount) return;
  const list = Reviews.forProduct(p.id);
  const mine = Reviews.mine(p.id);
  const avg = Reviews.avg(p.id) || p.rating;
  const loggedIn = Auth.isLoggedIn();
  REVIEW_DRAFT = mine ? mine.rating : 0;

  const summary = `
    <div class="rev-summary">
      <div class="rev-big">${avg.toFixed(1)}</div>
      <div>${starHTML(avg)}<div class="muted" style="font-size:13px;margin-top:4px">${list.length} kullanıcı değerlendirmesi</div></div>
    </div>`;

  const form = `
    <div class="rev-form">
      <h4>${mine ? "Değerlendirmeni güncelle" : "Bu ürünü değerlendir"}</h4>
      ${loggedIn ? `
        <div class="star-picker" id="review-stars">${starPicker(REVIEW_DRAFT)}</div>
        <textarea id="review-comment" placeholder="Yorumun (isteğe bağlı)…" rows="3">${mine ? (mine.comment || "") : ""}</textarea>
        <button class="btn btn-solid btn-sm" onclick="submitReview()">${mine ? "Güncelle" : "Gönder"}</button>
      ` : `<p class="muted">Puan ve yorum bırakmak için <a href="account.html?next=product&id=${p.id}" style="color:var(--tan)">giriş yapın</a>.</p>`}
    </div>`;

  const reviews = list.length ? list.map(r => `
    <div class="rev-item">
      <div class="rev-head"><strong>${r.name}</strong> ${starHTML(r.rating)}</div>
      ${r.comment ? `<p>${r.comment}</p>` : ""}
    </div>`).join("") : `<p class="muted" style="margin-top:18px">Henüz kullanıcı yorumu yok. İlk değerlendiren siz olun.</p>`;

  mount.innerHTML = summary + form + `<div class="rev-list">${reviews}</div>`;
}
function setColor(c){ PDP.color=c; if (!PDP.product.views) PDP.view=PDP.product.colors.indexOf(c); renderPDP(); }
function setView(i){ PDP.view=i; renderPDP(); }
function setSize(s){ PDP.size=s; renderPDP(); }
function pdpQty(delta){ PDP.qty=Math.max(1,PDP.qty+delta); document.getElementById("pdp-qty").value=PDP.qty; }
function pdpAddToCart(buyNow){
  const p = PDP.product;
  if (!PDP.size) { toast("Lütfen bir beden seçin"); document.getElementById("pdp-sizes").scrollIntoView({behavior:"smooth",block:"center"}); return; }
  Cart.add({ id:p.id, name:p.name, price:p.price, color:PDP.color, colorName:LEATHER_TONES[PDP.color].name, size:PDP.size, qty:PDP.qty, img:p.images[PDP.color] });
  if (buyNow) { location.href="cart.html"; return; }
  toast(`${p.name} sepete eklendi`);
}
function renderRelated(p) {
  const mount = document.getElementById("pdp-related");
  if (!mount) return;
  const rel = PRODUCTS.filter(x=>x.id!==p.id && x.cat===p.cat).slice(0,4);
  const fill = PRODUCTS.filter(x=>x.id!==p.id && !rel.includes(x)).slice(0,4-rel.length);
  mount.innerHTML = [...rel, ...fill].slice(0,4).map(productCard).join("");
}
function initTabs() {
  document.querySelectorAll(".tab-nav button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".tab-nav button").forEach(b=>b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

/* ---- CART ---- */
function initCart() {
  const mount = document.getElementById("cart-root");
  if (!mount) return;
  renderCart();
}
function renderCart() {
  const items = Cart.read();
  const itemsMount = document.getElementById("cart-items");
  const layout = document.getElementById("cart-layout");
  const empty = document.getElementById("cart-empty");
  if (!items.length) {
    if (layout) layout.style.display="none";
    if (empty) empty.style.display="block";
    return;
  }
  if (layout) layout.style.display="grid";
  if (empty) empty.style.display="none";
  itemsMount.innerHTML = items.map((i,idx)=>`
    <div class="cart-row">
      <div class="cart-thumb"><img src="${i.img}" alt="${i.name}"></div>
      <div class="cart-detail">
        <h3>${i.name}</h3>
        <div class="variant">Renk: ${i.colorName} · Beden: ${i.size}</div>
        <div class="row-controls">
          <div class="qty-stepper">
            <button onclick="cartQty(${idx},-1)" aria-label="Azalt">−</button>
            <input value="${i.qty}" readonly aria-label="Adet">
            <button onclick="cartQty(${idx},1)" aria-label="Arttır">+</button>
          </div>
          <button class="remove-btn" onclick="cartRemove(${idx})">${IC.trash} Kaldır</button>
        </div>
      </div>
      <div class="line-price">${TL(i.price*i.qty)}</div>
    </div>`).join("");
  renderSummary("cart");
}
function cartQty(idx,d){ const items=Cart.read(); Cart.setQty(idx,(items[idx].qty||1)+d); renderCart(); }
function cartRemove(idx){ Cart.remove(idx); renderCart(); }
function renderSummary(context) {
  const sub = Cart.subtotal();
  const el = document.getElementById(context+"-summary");
  if (!el) return;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - sub);
  el.innerHTML = `
    <div class="summary-row"><span>Ara Toplam</span><span>${TL(sub)}</span></div>
    <div class="summary-row"><span>Kargo</span><span>${SHIP_COST===0?"Ücretsiz":TL(SHIP_COST)}</span></div>
    <div class="summary-row total"><span>Toplam</span><span>${TL(sub+SHIP_COST)}</span></div>
    ${remaining>0?`<div class="free-ship-note">${IC.truck} Ücretsiz kargoya ${TL(remaining)} kaldı</div>`:`<div class="free-ship-note">${IC.check} Ücretsiz kargo kazandınız</div>`}`;
}

/* ---- CHECKOUT ---- */
function initCheckout() {
  const mount = document.getElementById("checkout-root");
  if (!mount) return;
  const items = Cart.read();
  if (!items.length) { location.href="cart.html"; return; }
  // giriş yapmışsa iletişim bilgilerini önceden doldur
  const cu = Auth.current();
  if (cu) {
    const f = document.getElementById("checkout-form");
    if (f.email && !f.email.value) f.email.value = cu.email;
    if (cu.name && f.firstname && !f.firstname.value) { const parts = cu.name.split(" "); f.firstname.value = parts[0]; if (f.lastname) f.lastname.value = parts.slice(1).join(" "); }
    if (cu.phone && f.phone && !f.phone.value) f.phone.value = cu.phone;
    if (cu.address && f.address && !f.address.value) f.address.value = cu.address;
  }
  const linesMount = document.getElementById("order-lines");
  linesMount.innerHTML = items.map(i=>`
    <div class="order-line">
      <div class="cart-thumb"><img src="${i.img}" alt="${i.name}"></div>
      <div class="ol-info"><h4>${i.name}</h4><span>${i.colorName} · ${i.size} · ${i.qty} adet</span></div>
      <div class="ol-price">${TL(i.price*i.qty)}</div>
    </div>`).join("");
  renderSummary("checkout");
  // payment method toggle
  document.querySelectorAll(".pay-method").forEach(pm=>{
    pm.addEventListener("click", ()=>{ document.querySelectorAll(".pay-method").forEach(x=>x.classList.remove("active")); pm.classList.add("active"); pm.querySelector("input").checked=true; });
  });
  document.getElementById("place-order").addEventListener("click", (e)=>{
    e.preventDefault();
    const form = document.getElementById("checkout-form");
    if (!form.checkValidity()) { form.reportValidity(); return; }
    // siparişi oluştur ve kaydet
    const order = {
      no: Orders.genNo(),
      at: Date.now(),
      email: (form.email?.value || Auth.current()?.email || "").trim().toLowerCase(),
      name: [form.firstname?.value, form.lastname?.value].filter(Boolean).join(" ").trim() || (Auth.current()?.name || "Misafir"),
      phone: form.phone?.value || "",
      address: [form.address?.value, form.city?.value].filter(Boolean).join(", "),
      items: Cart.read(),
      total: Cart.subtotal(),
    };
    Orders.add(order);
    Cart.clear();
    document.getElementById("checkout-root").innerHTML = `
      <div class="empty-state" style="padding:90px 20px">
        <div style="width:70px;height:70px;border-radius:999px;background:var(--tan-deep);display:flex;align-items:center;justify-content:center;margin:0 auto 24px">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:34px;height:34px"><path d="M5 12l5 5 9-11"/></svg>
        </div>
        <h3>Siparişiniz Alındı</h3>
        <p>Sipariş numaranız: <strong>${order.no}</strong><br>Teşekkürler! Sipariş onayınız e-posta adresinize gönderildi.<br>Bu bir demo mağazasıdır — gerçek bir ödeme alınmamıştır.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:6px">
          <a href="account.html?tab=orders" class="btn btn-solid">Siparişlerim</a>
          <a href="account.html?tab=track&no=${order.no}" class="btn btn-outline">Siparişi Takip Et</a>
        </div>
      </div>`;
    updateCartCount();
    window.scrollTo({top:0,behavior:"smooth"});
  });
}

/* ============================================================
   HESAP SAYFASI  (account.html)
   ============================================================ */
const ICG = {
  google: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.2 0 10 0 12s.5 3.8 1.4 5.4l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"/></svg>',
  apple:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c-.02-2.02 1.65-2.99 1.73-3.04-.94-1.38-2.41-1.57-2.93-1.59-1.25-.13-2.44.73-3.07.73-.63 0-1.61-.71-2.65-.69-1.36.02-2.62.79-3.32 2.01-1.42 2.46-.36 6.1 1.01 8.1.67.98 1.47 2.08 2.51 2.04 1.01-.04 1.39-.65 2.61-.65s1.56.65 2.62.63c1.08-.02 1.77-1 2.43-1.98.77-1.13 1.09-2.22 1.11-2.28-.02-.01-2.13-.82-2.15-3.25zM15.03 6.6c.56-.68.94-1.62.83-2.56-.81.03-1.79.54-2.37 1.22-.52.6-.97 1.56-.85 2.48.9.07 1.83-.46 2.39-1.14z"/></svg>',
};

function initAccount() {
  const root = document.getElementById("account-root");
  if (!root) return;
  if (!Auth.isLoggedIn()) renderAuthScreen(root);
  else renderAccountShell(root);
}

/* ---- Giriş / Kayıt ekranı ---- */
function renderAuthScreen(root, mode) {
  mode = mode || "login";
  root.innerHTML = `
    <div class="auth-card">
      <div class="auth-head">
        <div class="mark">UNDO</div>
        <h1>${mode==="login" ? "Tekrar Hoş Geldiniz" : "Hesap Oluştur"}</h1>
        <p class="muted">${mode==="login" ? "Hesabınıza giriş yapın" : "Birkaç saniyede üye olun"}</p>
      </div>
      <div class="auth-tabs">
        <button class="${mode==="login"?"active":""}" onclick="renderAuthScreen(document.getElementById('account-root'),'login')">Giriş Yap</button>
        <button class="${mode==="register"?"active":""}" onclick="renderAuthScreen(document.getElementById('account-root'),'register')">Kayıt Ol</button>
      </div>
      <div class="auth-social">
        <button class="btn btn-outline btn-block" type="button" onclick="authProvider('Google')">${ICG.google} Google ile devam et</button>
        <button class="btn btn-outline btn-block" type="button" onclick="authProvider('Apple')">${ICG.apple} Apple ile devam et</button>
      </div>
      <div class="auth-divider"><span>veya e-posta ile</span></div>
      <form class="auth-form" onsubmit="return authSubmit(event,'${mode}')">
        ${mode==="register" ? `<div class="field"><label>Ad Soyad</label><input type="text" name="name" placeholder="Adınız Soyadınız"></div>` : ""}
        <div class="field"><label>E-posta</label><input type="email" name="email" required placeholder="ornek@eposta.com"></div>
        <div class="field"><label>Şifre</label><input type="password" name="password" required placeholder="••••••••" minlength="4"></div>
        <button class="btn btn-solid btn-block" type="submit">${mode==="login" ? "Giriş Yap" : "Kayıt Ol"}</button>
      </form>
      <p class="auth-note">Demo mağaza — Google/Apple girişi simülasyondur ve tüm veriler yalnızca bu tarayıcıda saklanır.</p>
    </div>`;
}
function authSubmit(e, mode) {
  e.preventDefault();
  const f = e.target;
  const data = { name: f.name?.value, email: f.email.value, password: f.password.value };
  const res = mode==="login" ? Auth.login(data) : Auth.register(data);
  if (!res.ok) { toast(res.error); return false; }
  afterLogin(); return false;
}
function authProvider(provider) {
  const res = Auth.loginProvider(provider);
  if (!res.ok) { toast(res.error || "Giriş başarısız"); return; }
  toast(provider + " ile giriş yapıldı (demo)");
  afterLogin();
}
function afterLogin() {
  const next = qs("next"), id = qs("id");
  if (next === "product" && id) { location.href = "product.html?id=" + id; return; }
  location.href = "account.html";
}

/* ---- Hesap paneli ---- */
const ACCT_TABS = [
  { key:"profile",   label:"Profilim" },
  { key:"favorites", label:"Favorilerim" },
  { key:"orders",    label:"Siparişlerim" },
  { key:"track",     label:"Sipariş Takibi" },
];
function renderAccountShell(root, tab) {
  const u = Auth.current();
  tab = tab || qs("tab") || "profile";
  if (!ACCT_TABS.some(t=>t.key===tab)) tab = "profile";
  root.innerHTML = `
    <div class="account-head">
      <div><span class="eyebrow">Hesabım</span><h1>Merhaba, ${u.name}</h1></div>
      <button class="btn btn-outline btn-sm" onclick="accountLogout()">Çıkış Yap</button>
    </div>
    <div class="account-layout">
      <aside class="account-nav">
        ${ACCT_TABS.map(t=>`<button class="${t.key===tab?'active':''}" data-tab="${t.key}" onclick="accountTab('${t.key}')">${t.label}</button>`).join("")}
      </aside>
      <div class="account-body" id="account-body"></div>
    </div>`;
  accountRenderTab(tab);
}
function accountTab(tab) {
  history.replaceState(null, "", "account.html?tab=" + tab);
  document.querySelectorAll(".account-nav button").forEach(b=>b.classList.toggle("active", b.dataset.tab===tab));
  accountRenderTab(tab);
}
function accountRenderTab(tab) {
  const body = document.getElementById("account-body");
  if (!body) return;
  ({ profile:renderProfileTab, favorites:renderFavoritesTab, orders:renderOrdersTab, track:renderTrackTab }[tab] || renderProfileTab)(body);
}
function renderProfileTab(body) {
  const u = Auth.current();
  body.innerHTML = `
    <h2>Profil Bilgileri</h2>
    <form class="account-form" onsubmit="return saveProfile(event)">
      <div class="field"><label>Ad Soyad</label><input type="text" name="name" value="${u.name||""}"></div>
      <div class="field"><label>E-posta</label><input type="email" value="${u.email}" disabled></div>
      <div class="field"><label>Telefon</label><input type="tel" name="phone" value="${u.phone||""}" placeholder="+90 5xx xxx xx xx"></div>
      <div class="field"><label>Adres</label><input type="text" name="address" value="${u.address||""}" placeholder="Teslimat adresiniz"></div>
      <button class="btn btn-solid" type="submit">Kaydet</button>
    </form>
    <div class="account-meta">Üyelik türü: ${u.provider==="email"?"E-posta":u.provider} · Katılım: ${new Date(u.createdAt).toLocaleDateString("tr-TR")}</div>`;
}
function saveProfile(e) {
  e.preventDefault();
  const f = e.target;
  Auth.updateProfile({ name:f.name.value.trim(), phone:f.phone.value.trim(), address:f.address.value.trim() });
  toast("Profil güncellendi");
  renderAccountShell(document.getElementById("account-root"), "profile");
  return false;
}
function renderFavoritesTab(body) {
  const prods = Wishlist.list().map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  body.innerHTML = `<h2>Favorilerim (${prods.length})</h2>` + (prods.length
    ? `<div class="product-grid cols-3">${prods.map(productCard).join("")}</div>`
    : `<div class="empty-state" style="padding:50px 20px">${IC.heart}<h3>Favori listeniz boş</h3><p>Beğendiğiniz ürünlerdeki kalbe dokunun, burada toplansın.</p><a href="shop.html" class="btn btn-solid">Ürünleri Keşfet</a></div>`);
}
function renderOrdersTab(body) {
  const orders = Orders.mine();
  body.innerHTML = `<h2>Siparişlerim (${orders.length})</h2>` + (orders.length
    ? `<div class="order-list">${orders.map(orderCard).join("")}</div>`
    : `<div class="empty-state" style="padding:50px 20px">${IC.bag}<h3>Henüz siparişiniz yok</h3><p>İlk siparişinizi vermek için koleksiyonu keşfedin.</p><a href="shop.html" class="btn btn-solid">Alışverişe Başla</a></div>`);
}
function orderCard(o) {
  const st = Orders.status(o);
  const first = o.items[0] || {name:"—", img:""};
  const more = o.items.length>1 ? ` +${o.items.length-1} ürün` : "";
  return `
    <div class="order-card">
      <div class="order-card-top">
        <div><strong>${o.no}</strong><span class="muted"> · ${new Date(o.at).toLocaleDateString("tr-TR")}</span></div>
        <span class="order-status s${st.step}">${st.label}</span>
      </div>
      <div class="order-card-body">
        <div class="order-thumbs">${o.items.slice(0,3).map(i=>`<img src="${i.img}" alt="">`).join("")}</div>
        <div class="order-info"><p>${first.name}${more}</p><strong>${TL(o.total)}</strong></div>
        <button class="btn btn-outline btn-sm" onclick="accountTrack('${o.no}')">Takip Et</button>
      </div>
    </div>`;
}
function accountTrack(no) {
  renderAccountShell(document.getElementById("account-root"), "track");
  const inp = document.getElementById("track-input");
  if (inp) { inp.value = no; trackOrder(); }
}
function renderTrackTab(body) {
  const preNo = qs("no") || "";
  body.innerHTML = `
    <h2>Sipariş Takibi</h2>
    <p class="muted">Sipariş numaranızı girerek kargonuzun durumunu görüntüleyin.</p>
    <div class="track-search">
      <input type="text" id="track-input" placeholder="Örn: 35-A1B2C3" value="${preNo}">
      <button class="btn btn-solid" onclick="trackOrder()">Sorgula</button>
    </div>
    <div id="track-result"></div>`;
  if (preNo) trackOrder();
}
function trackOrder() {
  const no = (document.getElementById("track-input").value || "").trim();
  const result = document.getElementById("track-result");
  if (!no) { result.innerHTML = ""; return; }
  const o = Orders.find(no);
  if (!o) { result.innerHTML = `<div class="track-empty">${IC.search}<p>«${no}» numaralı sipariş bulunamadı.</p></div>`; return; }
  const st = Orders.status(o);
  result.innerHTML = `
    <div class="track-card">
      <div class="track-card-head">
        <div><strong>${o.no}</strong><div class="muted">${new Date(o.at).toLocaleDateString("tr-TR")} · ${TL(o.total)}</div></div>
        <span class="order-status s${st.step}">${st.label}</span>
      </div>
      <div class="timeline">
        ${Orders.STEPS.map((s,i)=>`
          <div class="tl-step ${i<=st.step?'done':''} ${i===st.step?'current':''}">
            <div class="tl-dot">${i<st.step?IC.check:(i+1)}</div>
            <div class="tl-label">${s}</div>
          </div>`).join("")}
      </div>
      <div class="track-items">${o.items.map(i=>`<div class="track-item"><img src="${i.img}" alt=""><span>${i.name} · ${i.colorName} · ${i.size} · ${i.qty} adet</span></div>`).join("")}</div>
    </div>`;
}
function accountLogout() {
  Auth.logout();
  toast("Çıkış yapıldı");
  location.href = "index.html";
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader(document.body.dataset.nav || "");
  renderFooter();
  initReveal();
  const page = document.body.dataset.page;
  ({ home:initHome, shop:initShop, product:initProduct, cart:initCart, checkout:initCheckout, account:initAccount }[page] || (()=>{}))();
});
