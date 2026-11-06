/* ============================================================
   UNDO — Ürün Kataloğu (mock veri, gerçek ürün fotoğrafları)
   Görseller: assets/products/<id>-<açı>.webp  (açı: on, arka, yan, detay1…)
   İsim, fiyat, puan ve açıklamalar temsilîdir.
   `views` alanı olmayan ürünler (ör. panelden eklenenler) SVG yer tutucu kullanır.
   ============================================================ */

/* ---- Admin override katmanı ----
   Yönetim panelinde (admin.html) yapılan değişiklikler localStorage'a
   yazılır. Aşağıdaki katman, kayıt varsa varsayılan katalog yerine onu
   kullanır. Kayıt yoksa site birebir eskisi gibi çalışır. ---- */
const CATALOG_KEY = "atelier35_catalog";
function loadCatalog() {
  try { return JSON.parse(localStorage.getItem(CATALOG_KEY)); } catch (e) { return null; }
}
const _CATALOG = loadCatalog();

/* ---- Leather-tone palettes for placeholder art ---- */
const DEFAULT_TONES = {
  siyah:    { name: "Siyah",       base: "#211d19", edge: "#3a332b", stitch: "#5a4f42", hex: "#1c1a17" },
  kahve:    { name: "Koyu Kahve",  base: "#4b3a2a", edge: "#6b4a2f", stitch: "#8a5a34", hex: "#3f2a1e" },
  taba:     { name: "Taba",        base: "#7a4e2a", edge: "#9a6636", stitch: "#c08a52", hex: "#9a6333" },
  konyak:   { name: "Konyak",      base: "#8a4f28", edge: "#a9713f", stitch: "#c98f5a", hex: "#c0702c" },
  bordo:    { name: "Bordo",       base: "#4a2320", edge: "#652f2a", stitch: "#8a4a40", hex: "#5e1f26" },
  vizon:    { name: "Vizon",       base: "#6f5843", edge: "#8a6f56", stitch: "#a88d72", hex: "#8a6d52" },
  haki:     { name: "Haki",        base: "#66604a", edge: "#7b7455", stitch: "#98906e", hex: "#7b7455" },
  zeytin:   { name: "Zeytin",      base: "#3f4230", edge: "#54583f", stitch: "#737757", hex: "#4a4d36" },
  antrasit: { name: "Antrasit",    base: "#4a4b48", edge: "#61625e", stitch: "#80817c", hex: "#5d5e5b" },
  lacivert: { name: "Lacivert",    base: "#1d2230", edge: "#2d3448", stitch: "#4a5370", hex: "#1f2533" },
  mavi:     { name: "Buz Mavisi",  base: "#8fb0d1", edge: "#a9c6e3", stitch: "#c7dcf0", hex: "#a9c6e3" },
  lila:     { name: "Lila",        base: "#a2a6c4", edge: "#b9bdd6", stitch: "#d3d6e6", hex: "#b9bdd6" },
  krem:     { name: "Krem",        base: "#c9bfa8", edge: "#d9cfb9", stitch: "#ebe3d0", hex: "#d9cfb9" },
};
/* Panelde düzenlenmiş tonlar varsa onları kullan */
const LEATHER_TONES = (_CATALOG && _CATALOG.tones && Object.keys(_CATALOG.tones).length) ? _CATALOG.tones : DEFAULT_TONES;

/* ---- SVG placeholder generator: a garment silhouette in leather tones ---- */
function garmentSVG(type, toneKey, w = 800, h = 1000) {
  const t = LEATHER_TONES[toneKey] || LEATHER_TONES.kahve;
  const bg1 = "#f0ece3", bg2 = "#e4ddd0";
  const uid = type + toneKey + Math.round(Math.random()*1e6);

  // silhouette path chosen by garment type
  const shapes = {
    jacket: `
      <path d="M400 205 C360 205 330 216 300 236 L196 300 C176 312 168 336 176 358 L212 452 C218 470 236 480 254 476 L286 468 L286 792 C286 806 297 816 311 816 L489 816 C503 816 514 806 514 792 L514 468 L546 476 C564 480 582 470 588 452 L624 358 C632 336 624 312 604 300 L500 236 C470 216 440 205 400 205 Z"/>
      <path d="M400 205 L360 250 L400 470 L440 250 Z" opacity=".5"/>
      <path d="M400 205 L360 250 M400 205 L440 250" stroke-width="3" fill="none" stroke-dasharray="4 6"/>
      <line x1="400" y1="300" x2="400" y2="800" stroke-width="3" stroke-dasharray="5 7" opacity=".55"/>`,
    coat: `
      <path d="M400 195 C362 195 336 206 308 226 L214 288 C196 300 190 322 198 342 L228 420 C234 436 250 444 266 440 L292 432 L268 860 C267 876 279 888 295 888 L505 888 C521 888 533 876 532 860 L508 432 L534 440 C550 444 566 436 572 420 L602 342 C610 322 604 300 586 288 L492 226 C464 206 438 195 400 195 Z"/>
      <line x1="400" y1="280" x2="400" y2="872" stroke-width="3" stroke-dasharray="5 7" opacity=".55"/>
      <circle cx="400" cy="430" r="7"/><circle cx="400" cy="520" r="7"/><circle cx="400" cy="610" r="7"/>`,
    vest: `
      <path d="M400 220 C372 220 350 228 330 242 L286 274 L300 360 L326 352 L318 760 C317 774 328 784 342 784 L458 784 C472 784 483 774 482 760 L474 352 L500 360 L514 274 L470 242 C450 228 428 220 400 220 Z"/>
      <line x1="400" y1="300" x2="400" y2="770" stroke-width="3" stroke-dasharray="5 7" opacity=".55"/>`,
    bag: `
      <path d="M250 360 L550 360 C566 360 578 372 578 388 L600 720 C601 742 584 760 562 760 L238 760 C216 760 199 742 200 720 L222 388 C222 372 234 360 250 360 Z"/>
      <path d="M312 360 C312 300 340 270 400 270 C460 270 488 300 488 360" fill="none" stroke-width="16"/>
      <rect x="360" y="470" width="80" height="54" rx="8" opacity=".6"/>`,
  };
  const shape = shapes[type] || shapes.jacket;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bg${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/>
      </linearGradient>
      <linearGradient id="lea${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${t.edge}"/><stop offset="0.5" stop-color="${t.base}"/><stop offset="1" stop-color="${t.base}"/>
      </linearGradient>
      <radialGradient id="sheen${uid}" cx="0.35" cy="0.28" r="0.75">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      <filter id="grain${uid}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg${uid})"/>
    <g fill="url(#lea${uid})" stroke="${t.stitch}" stroke-linejoin="round" stroke-linecap="round">
      ${shape}
    </g>
    <g filter="url(#grain${uid})" fill="url(#lea${uid})" stroke="none">${shape}</g>
    <g fill="url(#sheen${uid})" stroke="none">${shape}</g>
    <text x="${w/2}" y="${h-46}" text-anchor="middle" font-family="Inter, sans-serif" font-size="21" letter-spacing="4" fill="#9a8f7d">UNDO · HAKİKİ DERİ</text>
  </svg>`;
}

function svgURI(svg) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* Build an image set (per color) for a product */
function imageSet(type, tones) {
  const set = {};
  tones.forEach(k => { set[k] = svgURI(garmentSVG(type, k)); });
  return set;
}

/* ---- Category / lifestyle placeholder (wider crop) ---- */
function scenePH(toneKey, label) {
  const t = LEATHER_TONES[toneKey] || LEATHER_TONES.kahve;
  const uid = "sc" + toneKey + Math.round(Math.random()*1e6);
  return svgURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.edge}"/><stop offset="0.55" stop-color="${t.base}"/><stop offset="1" stop-color="#1a1512"/>
    </linearGradient>
    <radialGradient id="v${uid}" cx="0.4" cy="0.32" r="0.9"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></radialGradient></defs>
    <rect width="600" height="800" fill="url(#${uid})"/>
    <rect width="600" height="800" fill="url(#v${uid})"/>
  </svg>`);
}

/* ---- The catalogue ---- */
const SIZES_W = ["XS","S","M","L","XL"];
const SIZES_M = ["S","M","L","XL","2XL"];
const DEFAULT_PRODUCTS = [
  { id: "turuncu-suet-biker",       name: "Konyak Süet Biker Ceket",        cat: "kadin", type: "jacket", price: 13900, old: null,  colors: ["konyak"],   sizes: SIZES_W, rating: 4.9, reviews: 186, badge: "Çok Satan", material: "Süet Deri",   views: ["on","arka","yan"], desc: "Asimetrik fermuarı ve altın rengi metal detaylarıyla kısa kesim süet biker. Yüksek belli parçalarla dengeli bir siluet oluşturur." },
  { id: "bordo-kruvaze-blazer",     name: "Bordo Deri Kruvaze Blazer",      cat: "kadin", type: "jacket", price: 16750, old: null,  colors: ["bordo"],    sizes: SIZES_W, rating: 4.8, reviews: 94,  badge: "Öne Çıkan", material: "Kuzu Derisi", views: ["on","arka","yan"], desc: "Geniş yaka ve çift sıra düğmeli, rahat kalıp deri blazer. Ofisten akşam yemeğine aynı duruşu taşır." },
  { id: "siyah-puskullu-biker",     name: "Püsküllü Siyah Biker Ceket",     cat: "kadin", type: "jacket", price: 21400, old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 5.0, reviews: 38,  badge: "Yeni",      material: "Kuzu Derisi", views: ["on","arka","yan"], desc: "Krem biye detayları ve sırtından dökülen uzun püskülleriyle koleksiyonun en iddialı parçası." },
  { id: "yilan-desenli-ceket",      name: "Yılan Desenli Deri Ceket",       cat: "kadin", type: "jacket", price: 18900, old: null,  colors: ["kahve"],    sizes: SIZES_W, rating: 4.7, reviews: 52,  badge: "Yeni",      material: "Dana Derisi", views: ["on","arka","yan"], desc: "Yılan baskılı parlak deri, süet yaka ve manşetlerle buluşuyor. Kontrast dokularıyla öne çıkan bir ceket." },
  { id: "taba-suet-blazer",         name: "Taba Süet Blazer",               cat: "kadin", type: "jacket", price: 13400, old: null,  colors: ["taba"],     sizes: SIZES_W, rating: 4.7, reviews: 121, badge: null,        material: "Süet Deri",   views: ["on","arka"],       desc: "İki düğmeli, kapaklı cepli klasik süet blazer. Yumuşak dokusuyla günlük kombinlere sıcaklık katar." },
  { id: "zeytin-deri-parka",        name: "Zeytin Deri Parka",              cat: "kadin", type: "coat",   price: 17800, old: 19900, colors: ["zeytin"],   sizes: SIZES_W, rating: 4.8, reviews: 67,  badge: "İndirim",   material: "Kuzu Derisi", views: ["on","arka","yan"], desc: "Taba süet yaka ve manşetli, beli büzgülü deri parka. Geniş körüklü cepleriyle şehirde pratik." },
  { id: "siyah-orgu-bomber",        name: "Siyah Örgü Deri Bomber",         cat: "erkek", type: "jacket", price: 19500, old: null,  colors: ["siyah"],    sizes: SIZES_M, rating: 4.9, reviews: 73,  badge: "Öne Çıkan", material: "Dana Derisi", views: ["on","arka","yan"], desc: "El örgüsü görünümlü deri yüzeyi ve dik yakasıyla ayrışan bomber. Işıkla değişen zengin bir doku." },
  { id: "kahve-deri-pelerin",       name: "Kahve Deri Pelerin",             cat: "kadin", type: "coat", chart: "pelerin",   price: 15600, old: null,  colors: ["kahve"],    sizes: ["S/M","L/XL"], rating: 4.6, reviews: 41, badge: null,  material: "Kuzu Derisi", views: ["on","arka"],       desc: "Dik yakalı, gizli patlı ve dökümlü kesim deri pelerin. Katmanlı kombinlerin üzerine zahmetsizce oturur." },
  { id: "bordo-parlak-bomber",      name: "Bordo Parlak Deri Bomber",       cat: "kadin", type: "jacket", price: 14800, old: null,  colors: ["bordo"],    sizes: SIZES_W, rating: 4.8, reviews: 88,  badge: null,        material: "Dana Derisi", views: ["arka","detay1","detay2","detay3"], desc: "Çıtçıtlı dik yaka, lastikli bel ve doğal kırışık dokulu parlak deri. Kullandıkça karakter kazanır." },
  { id: "bordo-deri-parka",         name: "Bordo Deri Parka",               cat: "kadin", type: "coat",   price: 17200, old: null,  colors: ["bordo"],    sizes: SIZES_W, rating: 4.7, reviews: 59,  badge: null,        material: "Kuzu Derisi", views: ["on","arka","yan"], desc: "Lacivert süet yaka ve manşetlerle tamamlanan, büzgülü belli deri parka." },
  { id: "turuncu-suet-kargo",       name: "Konyak Süet Kargo Ceket",        cat: "kadin", type: "jacket", price: 14200, old: null,  colors: ["konyak"],   sizes: SIZES_W, rating: 4.6, reviews: 77,  badge: null,        material: "Süet Deri",   views: ["on","arka","yan"], desc: "Körüklü büyük cepleri ve rahat kalıbıyla iş gücü esintili süet ceket." },
  { id: "vizon-suet-blazer",        name: "Vizon Süet Blazer",              cat: "kadin", type: "jacket", price: 13900, old: null,  colors: ["vizon"],    sizes: SIZES_W, rating: 4.7, reviews: 64,  badge: null,        material: "Süet Deri",   views: ["on","arka","yan"], desc: "Sivri yaka ve belirgin omuz hattıyla yapılandırılmış süet blazer. Zarif, çok yönlü bir parça." },
  { id: "siyah-kemerli-crop",       name: "Siyah Kemerli Crop Ceket",       cat: "kadin", type: "jacket", price: 15400, old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 4.8, reviews: 101, badge: "Çok Satan", material: "Kuzu Derisi", views: ["on","arka","yan"], desc: "Apoletli omuz, geniş yaka ve bel kemeriyle trençkottan ilham alan kısa deri ceket." },
  { id: "siyah-deri-gomlek",        name: "Siyah Deri Gömlek Ceket",        cat: "kadin", type: "jacket", price: 12600, old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 4.6, reviews: 83,  badge: null,        material: "Kuzu Derisi", views: ["on","arka"],       desc: "Çift göğüs cepli, vücudu saran gömlek kesimi. Örgü kol paneli hareket özgürlüğü sağlar." },
  { id: "siyah-suet-crop",          name: "Siyah Süet Crop Ceket",          cat: "kadin", type: "jacket", price: 10900, old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 4.5, reviews: 112, badge: null,        material: "Süet Deri",   views: ["on","arka","yan"], desc: "Denim ceketin çizgilerini süetle yeniden yorumlayan kısa kesim bir tasarım." },
  { id: "siyah-buyuk-yaka",         name: "Büyük Yakalı Siyah Deri Ceket",  cat: "kadin", type: "jacket", price: 19900, old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 4.9, reviews: 29,  badge: "Yeni",      material: "Kuzu Derisi", views: ["on","arka"],       desc: "Sırta dökülen pelerin yakası ve bol kollarıyla heykelsi bir siluet." },
  { id: "siyah-kruvaze-palto",      name: "Siyah Kruvaze Deri Palto",       cat: "kadin", type: "coat",   price: 24500, old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 5.0, reviews: 22,  badge: "Öne Çıkan", material: "Dana Derisi", views: ["on"],              desc: "Beli oturan, boydan kruvaze deri palto. Ağırlığı ve dökümüyle gerçek bir yatırım parçası." },
  { id: "siyah-puskullu-uzun",      name: "Siyah Püsküllü Uzun Ceket",      cat: "kadin", type: "coat",   price: 22800, old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 4.8, reviews: 17,  badge: null,        material: "Kuzu Derisi", views: ["arka"],            desc: "Eteğinden dökülen uzun deri püsküllerle hareket eden, geniş omuzlu ceket." },
  { id: "krem-kroko-elbise",        name: "Krem Kroko Deri Elbise",         cat: "kadin", type: "coat", chart: "elbise",   price: 23400, old: null,  colors: ["krem"],     sizes: SIZES_W, rating: 4.9, reviews: 14,  badge: "Yeni",      material: "Dana Derisi", views: ["on"],              desc: "Kroko baskılı deriden, dik yakalı ve vücudu saran kalem elbise." },
  { id: "haki-suet-trenckot",       name: "Haki Süet Trençkot",             cat: "kadin", type: "coat",   price: 18600, old: null,  colors: ["haki"],     sizes: SIZES_W, rating: 4.8, reviews: 56,  badge: null,        material: "Süet Deri",   views: ["on","arka"],       desc: "Çift sıra düğmeli, kemerli klasik trençkot; süetin yumuşak dokusuyla." },
  { id: "haki-suet-pantolon",       name: "Haki Süet Pantolon",             cat: "kadin", type: "coat", chart: "pantolon",   price: 9800,  old: null,  colors: ["haki"],     sizes: SIZES_W, rating: 4.5, reviews: 68,  badge: null,        material: "Süet Deri",   views: ["on","arka"],       desc: "Yüksek belli, dar paça süet pantolon. Esnek yapısıyla gün boyu konfor sunar." },
  { id: "bordo-kemerli-ceket",      name: "Bordo Kemerli Deri Ceket",       cat: "kadin", type: "jacket", price: 13600, old: 15200, colors: ["bordo"],    sizes: SIZES_W, rating: 4.6, reviews: 47,  badge: "İndirim",   material: "Dana Derisi", views: ["arka"],            desc: "İnce bel kemeri ve kalıplı omuzlarıyla parlak deri ceket." },
  { id: "gri-eskitme-kemerli",      name: "Antrasit Eskitme Kemerli Ceket", cat: "kadin", type: "jacket", price: 16200, old: null,  colors: ["antrasit"], sizes: SIZES_W, rating: 4.7, reviews: 36,  badge: null,        material: "Kuzu Derisi", views: ["arka"],            desc: "Eskitme işlemli deri, geniş yaka ve apoletli omuzlar. Her parça kendine özgü bir patina taşır." },
  { id: "taba-suet-dik-yaka",       name: "Taba Süet Dik Yaka Ceket",       cat: "kadin", type: "jacket", price: 11800, old: null,  colors: ["taba"],     sizes: SIZES_W, rating: 4.6, reviews: 61,  badge: null,        material: "Süet Deri",   views: ["on"],              desc: "Önü açık, dik yakalı ve kapak detaylı kısa süet ceket." },
  { id: "zeytin-suet-dik-yaka",     name: "Zeytin Süet Dik Yaka Ceket",     cat: "kadin", type: "jacket", price: 11800, old: null,  colors: ["zeytin"],   sizes: SIZES_W, rating: 4.5, reviews: 33,  badge: null,        material: "Süet Deri",   views: ["arka"],            desc: "Bel hattı dikişli, dik yakalı kısa süet ceket." },
  { id: "yesil-suet-omuz",          name: "Yeşil Süet Omuz Detaylı Ceket",  cat: "kadin", type: "jacket", price: 12900, old: null,  colors: ["zeytin"],   sizes: SIZES_W, rating: 4.7, reviews: 42,  badge: null,        material: "Süet Deri",   views: ["arka","yan"],      desc: "Omuzlardan sırta inen V formlu katman detayıyla modern bir süet ceket." },
  { id: "kahve-suet-bel-ceket",     name: "Koyu Kahve Süet Bel Vurgulu Ceket", cat: "kadin", type: "jacket", price: 12400, old: null, colors: ["kahve"],  sizes: SIZES_W, rating: 4.6, reviews: 49,  badge: null,        material: "Süet Deri",   views: ["arka","yan"],      desc: "Vücudu saran dikişleri ve belirgin omuzlarıyla kadınsı bir süet ceket." },
  { id: "siyah-deri-vyaka",         name: "Siyah Deri V Yaka Üst",          cat: "kadin", type: "vest",   price: 7900,  old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 4.7, reviews: 71,  badge: null,        material: "Kuzu Derisi", views: ["on","arka","yan"], desc: "Sırtı fermuarlı, derin V yakalı kısa deri üst." },
  { id: "siyah-kapitone-halter",    name: "Siyah Kapitone Deri Halter",     cat: "kadin", type: "vest",   price: 8600,  old: null,  colors: ["siyah"],    sizes: SIZES_W, rating: 4.8, reviews: 26,  badge: "Yeni",      material: "Kuzu Derisi", views: ["on","arka","yan"], desc: "Boyun bağlamalı, göğsü kapitone işlemeli kısa deri üst." },
  { id: "lila-bustiyer",            name: "Lila Deri Büstiyer",             cat: "kadin", type: "vest",   price: 6900,  old: null,  colors: ["lila"],     sizes: SIZES_W, rating: 4.4, reviews: 31,  badge: null,        material: "Kuzu Derisi", views: ["arka"],            desc: "İnce askılı, düz kesim deri büstiyer. Blazer altında ya da tek başına." },
  { id: "kahve-eskitme-ceket",      name: "Kahve Eskitme Deri Ceket",       cat: "erkek", type: "jacket", price: 17400, old: null,  colors: ["kahve"],    sizes: SIZES_M, rating: 4.9, reviews: 134, badge: "Çok Satan", material: "Dana Derisi", views: ["on","arka","yan"], desc: "Kontrast dikişli, körüklü cepli eskitme deri ceket. Yıllar geçtikçe daha da güzelleşir." },
  { id: "siyah-kroko-bomber",       name: "Siyah Kroko Deri Bomber",        cat: "erkek", type: "jacket", price: 16900, old: null,  colors: ["siyah"],    sizes: SIZES_M, rating: 4.7, reviews: 58,  badge: null,        material: "Dana Derisi", views: ["arka","yan"],      desc: "İnce kroko baskılı deri, dik yaka ve lastikli bel." },
  { id: "bordo-yakali-bomber",      name: "Bordo Yakalı Siyah Bomber",      cat: "erkek", type: "jacket", price: 15800, old: null,  colors: ["siyah"],    sizes: SIZES_M, rating: 4.6, reviews: 37,  badge: null,        material: "Dana Derisi", views: ["on"],              desc: "Siyah deri gövdeyi bordo süet yaka ve manşetlerle buluşturan kontrast bomber." },
  { id: "lacivert-deri-bomber",     name: "Lacivert Deri Bomber",           cat: "erkek", type: "jacket", price: 14600, old: null,  colors: ["lacivert"], sizes: SIZES_M, rating: 4.7, reviews: 66,  badge: null,        material: "Kuzu Derisi", views: ["on","yan"],        desc: "Yakasız, çift sıra düğmeli ve apoletli yumuşak deri bomber." },
  { id: "siyah-deri-bomber",        name: "Siyah Düz Deri Bomber",          cat: "erkek", type: "jacket", price: 13200, old: null,  colors: ["siyah"],    sizes: SIZES_M, rating: 4.6, reviews: 147, badge: null,        material: "Kuzu Derisi", views: ["arka","yan"],      desc: "Dik yakalı, lastikli belli sade bomber. Şehir hayatının rahat ama sofistike seçeneği." },
  { id: "kahve-suet-bomber-fermuar",name: "Koyu Kahve Süet Fermuarlı Bomber", cat: "erkek", type: "jacket", price: 12800, old: null, colors: ["kahve"],  sizes: SIZES_M, rating: 4.7, reviews: 79,  badge: null,        material: "Süet Deri",   views: ["on","arka","yan"], desc: "Altın rengi fermuarları ve omuz detaylarıyla süet bomber." },
  { id: "kahve-suet-bomber-dik",    name: "Koyu Kahve Süet Dik Yaka Bomber", cat: "erkek", type: "jacket", price: 12300, old: null, colors: ["kahve"],   sizes: SIZES_M, rating: 4.6, reviews: 92,  badge: null,        material: "Süet Deri",   views: ["on","arka","yan"], desc: "Lacivert astarlı dik yaka ve lastikli bel. Her mevsimin süet bomberı." },
  { id: "kahve-suet-bomber-yatik",  name: "Koyu Kahve Süet Yatık Yaka Bomber", cat: "erkek", type: "jacket", price: 11900, old: 13400, colors: ["kahve"], sizes: SIZES_M, rating: 4.5, reviews: 45, badge: "İndirim", material: "Süet Deri",   views: ["on"],              desc: "Klasik yatık yaka, dikey fermuarlı cepler ve dokulu bel bandı." },
  { id: "haki-suet-bomber",         name: "Haki Süet Düğmeli Bomber",       cat: "erkek", type: "jacket", price: 11600, old: null,  colors: ["haki"],     sizes: SIZES_M, rating: 4.6, reviews: 54,  badge: null,        material: "Süet Deri",   views: ["on","arka","yan"], desc: "Çift göğüs cepli, metal düğmeli ve lastikli belli rahat süet ceket." },
  { id: "mavi-suet-gomlek",         name: "Buz Mavisi Süet Gömlek Ceket",   cat: "erkek", type: "jacket", price: 10800, old: null,  colors: ["mavi"],     sizes: SIZES_M, rating: 4.5, reviews: 28,  badge: "Yeni",      material: "Süet Deri",   views: ["on","arka"],       desc: "Açık tonuyla sıra dışı, çıtçıtlı süet gömlek ceket." },
  { id: "taba-suet-gomlek",         name: "Taba Süet Oversize Gömlek",      cat: "erkek", type: "jacket", price: 10400, old: null,  colors: ["taba"],     sizes: SIZES_M, rating: 4.6, reviews: 63,  badge: null,        material: "Süet Deri",   views: ["on","arka"],       desc: "Tek cepli, gizli düğmeli ve salaş kalıp süet gömlek." },
  { id: "taba-suet-dugmeli",        name: "Taba Süet Düğmeli Ceket",        cat: "erkek", type: "jacket", price: 12100, old: null,  colors: ["taba"],     sizes: SIZES_M, rating: 4.7, reviews: 87,  badge: null,        material: "Süet Deri",   views: ["on","arka"],       desc: "Dört düğmeli, büyük kare cepli rahat süet ceket." },
];
/* Panelde eklenmiş/düzenlenmiş ürünler varsa onları kullan */
const PRODUCTS = (_CATALOG && Array.isArray(_CATALOG.products) && _CATALOG.products.length) ? _CATALOG.products : DEFAULT_PRODUCTS;

/* Her ürüne görsellerini bağla: gerçek fotoğraf varsa onlar, yoksa SVG yer tutucu */
const VIEW_LABELS = { on: "Ön", arka: "Arka", yan: "Yan", detay1: "Detay", detay2: "Detay", detay3: "Detay" };
PRODUCTS.forEach(p => {
  if (p.views && p.views.length) {
    p.gallery = p.views.map(v => ({ label: VIEW_LABELS[v] || v, src: `assets/products/${p.id}-${v}.webp` }));
    p.images = {};
    p.colors.forEach(c => { p.images[c] = p.gallery[0].src; });
  } else {
    p.images = imageSet(p.type, p.colors);
    p.gallery = p.colors.map(c => ({ label: (LEATHER_TONES[c] || {}).name || c, src: p.images[c] }));
  }
});

const CATEGORIES = [
  { key: "kadin",  label: "Kadın",       count: PRODUCTS.filter(p=>p.cat==="kadin").length, tone: "bordo" },
  { key: "erkek",  label: "Erkek",       count: PRODUCTS.filter(p=>p.cat==="erkek").length, tone: "kahve" },
];

/* ---- Ölçü tabloları (MOCK: gerçek ölçüler gelince güncellenecek) ---- */
const SIZE_CHARTS = {
  jacket:   { cols: ["Göğüs", "Omuz", "Kol", "Boy"], rows: { XS: [88, 38, 60, 52], S: [92, 40, 61, 54], M: [96, 42, 62, 56], L: [102, 44, 63, 58], XL: [108, 46, 64, 60], "2XL": [114, 48, 65, 62] }, fit: "Kalıbına uygun kesim. İki beden arasındaysanız büyük olanı seçin." },
  coat:     { cols: ["Göğüs", "Omuz", "Kol", "Boy"], rows: { XS: [90, 38, 60, 104], S: [94, 40, 61, 106], M: [98, 42, 62, 108], L: [104, 44, 63, 110], XL: [110, 46, 64, 112], "2XL": [116, 48, 65, 114] }, fit: "Rahat kesim. Altına kalın giyecekseniz bir beden büyük düşünebilirsiniz." },
  vest:     { cols: ["Göğüs", "Bel", "Boy"], rows: { XS: [80, 64, 38], S: [84, 68, 40], M: [88, 72, 42], L: [94, 78, 44], XL: [100, 84, 46] }, fit: "Vücudu saran kesim. Deri zamanla hafifçe esner." },
  pantolon: { cols: ["Bel", "Kalça", "İç boy"], rows: { XS: [64, 88, 78], S: [68, 92, 78], M: [72, 96, 79], L: [78, 102, 79], XL: [84, 108, 80] }, fit: "Dar kesim, yüksek bel. Süet giydikçe vücuda oturur." },
  elbise:   { cols: ["Göğüs", "Bel", "Kalça", "Boy"], rows: { XS: [80, 62, 88, 112], S: [84, 66, 92, 113], M: [88, 70, 96, 114], L: [94, 76, 102, 115], XL: [100, 82, 108, 116] }, fit: "Vücudu saran kalem kesim. İki beden arasındaysanız büyük olanı seçin." },
  pelerin:  { cols: ["Omuz", "Boy"], rows: { "S/M": [44, 72], "L/XL": [48, 75] }, fit: "Dökümlü kesim. Beden aralığı geniştir." },
};
function chartOf(p) { return SIZE_CHARTS[p.chart] || SIZE_CHARTS[p.type] || SIZE_CHARTS.jacket; }

/* Ürün türü: `chart` varsa o belirler, yoksa `type` (yer tutucu kalıbı) */
const PRODUCT_KINDS = { jacket: "Ceket", coat: "Palto & Parka", vest: "Üst & Yelek", pantolon: "Pantolon", elbise: "Elbise", pelerin: "Pelerin", bag: "Çanta" };
function kindOf(p) { return PRODUCT_KINDS[p.chart] ? p.chart : (PRODUCT_KINDS[p.type] ? p.type : "jacket"); }

const CARE = {
  suet: ["Suyla silmeyin; tozu yumuşak süet fırçasıyla alın.", "Leke için bir deri uzmanına başvurun.", "Geniş askıda, plastik torba dışında saklayın."],
  deri: ["Nemli olmayan yumuşak bezle silin.", "Yılda bir iki kez deri kremiyle besleyin.", "Geniş askıda, plastik torba dışında saklayın."],
};
function careOf(p) { return /süet/i.test(p.material) ? CARE.suet : CARE.deri; }
function hasFrontPhoto(p) { return !p.views || p.views.includes("on"); }

const TL = n => "₺" + n.toLocaleString("tr-TR");
