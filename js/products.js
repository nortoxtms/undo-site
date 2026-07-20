/* ============================================================
   35 — Product Catalogue
   Swap `image` fields with real photo paths (e.g. "assets/products/jacket-1.jpg")
   whenever you have photography. The SVG placeholders below keep the
   site looking finished until then.
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
  siyah:   { name: "Siyah",       base: "#211d19", edge: "#3a332b", stitch: "#5a4f42", hex: "#1c1a17" },
  kahve:   { name: "Koyu Kahve",  base: "#4b3a2a", edge: "#6b4a2f", stitch: "#8a5a34", hex: "#5a3a20" },
  taba:    { name: "Taba",        base: "#7a4e2a", edge: "#9a6636", stitch: "#c08a52", hex: "#8a5a34" },
  konyak:  { name: "Konyak",      base: "#8a4f28", edge: "#a9713f", stitch: "#c98f5a", hex: "#a9713f" },
  bordo:   { name: "Bordo",       base: "#4a2320", edge: "#652f2a", stitch: "#8a4a40", hex: "#5a2b26" },
  bej:     { name: "Bej Süet",    base: "#8f7a5f", edge: "#a8907d", stitch: "#c9b48f", hex: "#a8907d" },
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
const DEFAULT_PRODUCTS = [
  { id: "biker-noir",   name: "Noir Biker Ceket",       cat: "erkek",    type: "jacket", price: 12450, old: null,  colors: ["siyah","kahve"],           sizes: ["S","M","L","XL","2XL"], rating: 4.8, reviews: 142, badge: "Çok Satan", material: "Dana Derisi",  desc: "%100 hakiki dana derisinden, el işçiliğiyle üretilmiş zamansız biker ceket. Asimetrik fermuar, modern kalıp ve dayanıklı metal aksesuarlar." },
  { id: "aviator-shear",name: "Aviator Kürklü Ceket",   cat: "erkek",    type: "jacket", price: 18900, old: 21500, colors: ["kahve","taba"],            sizes: ["M","L","XL","2XL"],     rating: 4.9, reviews: 98,  badge: "Yeni", material: "Koyun Derisi", desc: "İçi shearling kürk astarlı, kış için tasarlanmış klasik aviator ceket. Sıcak, hafif ve son derece şık." },
  { id: "moto-tan",     name: "Konyak Moto Ceket",      cat: "kadin",    type: "jacket", price: 11250, old: null,  colors: ["konyak","taba","siyah"],   sizes: ["XS","S","M","L","XL"],  rating: 4.7, reviews: 210, badge: null, material: "Kuzu Derisi",  desc: "Yumuşak kuzu derisinden, vücudu saran modern moto kalıp. Günlük ve gece kombinlerine kolayca uyum sağlar." },
  { id: "trench-espr",  name: "Espresso Deri Trençkot", cat: "kadin",    type: "coat",   price: 16800, old: null,  colors: ["kahve","siyah"],           sizes: ["XS","S","M","L"],       rating: 4.9, reviews: 76,  badge: "Öne Çıkan", material: "Dana Derisi", desc: "Diz altı boyda, çift sıra düğmeli deri trençkot. Zarif duruşu ve dökümlü kalıbıyla bir yatırım parçası." },
  { id: "cafe-racer",   name: "Café Racer Ceket",       cat: "erkek",    type: "jacket", price: 10950, old: null,  colors: ["siyah","bordo","kahve"],   sizes: ["S","M","L","XL","2XL"], rating: 4.6, reviews: 188, badge: null, material: "Dana Derisi",  desc: "Minimal dik yaka ve temiz hatlarıyla café racer klasiği. Sadeliği seven modern erkek için." },
  { id: "suede-blazer", name: "Süet Blazer Ceket",      cat: "erkek",    type: "jacket", price: 13400, old: null,  colors: ["bej","taba"],              sizes: ["M","L","XL"],           rating: 4.7, reviews: 54,  badge: "Yeni", material: "Süet Deri",  desc: "Yapılandırılmış omuz ve yumuşak süet dokusuyla ceket-blazer arası çok yönlü bir parça." },
  { id: "shacket-tan",  name: "Taba Deri Gömlek Ceket", cat: "kadin",    type: "vest",   price: 8900,  old: 10500, colors: ["taba","kahve","bej"],      sizes: ["XS","S","M","L","XL"],  rating: 4.5, reviews: 132, badge: "İndirim", material: "Kuzu Derisi", desc: "Gömlek rahatlığında, ceket şıklığında hibrit bir tasarım. Katmanlı kombinlerin vazgeçilmezi." },
  { id: "long-coat",    name: "Uzun Deri Palto",        cat: "kadin",    type: "coat",   price: 19500, old: null,  colors: ["siyah","bordo"],           sizes: ["XS","S","M","L"],       rating: 5.0, reviews: 41,  badge: "Öne Çıkan", material: "Dana Derisi", desc: "Ayak bileğine kadar uzanan dramatik siluet. Ağırlığı ve dökümüyle gerçek bir statü parçası." },
  { id: "bomber-black", name: "Deri Bomber Ceket",      cat: "erkek",    type: "jacket", price: 9750,  old: null,  colors: ["siyah","kahve"],           sizes: ["S","M","L","XL","2XL"], rating: 4.6, reviews: 167, badge: null, material: "Kuzu Derisi",  desc: "Ribana yaka ve manşetli spor kesim bomber. Şehir hayatının rahat ama sofistike seçeneği." },
  { id: "quilted-moto", name: "Kapitone Moto Ceket",    cat: "kadin",    type: "jacket", price: 12900, old: null,  colors: ["siyah","konyak"],          sizes: ["XS","S","M","L","XL"],  rating: 4.8, reviews: 89,  badge: "Yeni", material: "Kuzu Derisi", desc: "Omuz ve kollarda kapitone detaylı, dokusuyla fark yaratan moto ceket." },
  { id: "vest-rugged",  name: "Deri Yelek",             cat: "erkek",    type: "vest",   price: 6500,  old: null,  colors: ["kahve","siyah","taba"],    sizes: ["S","M","L","XL","2XL"], rating: 4.4, reviews: 73,  badge: null, material: "Dana Derisi",  desc: "Katmanlamayı seven için dayanıklı ve karakterli bir deri yelek." },
  { id: "cropped-tan",  name: "Crop Deri Ceket",        cat: "kadin",    type: "jacket", price: 8400,  old: null,  colors: ["taba","siyah","bej"],      sizes: ["XS","S","M","L"],       rating: 4.7, reviews: 156, badge: "Çok Satan", material: "Kuzu Derisi", desc: "Kısa boy modern kalıp; yüksek belli parçalarla mükemmel uyum." },
];
/* Panelde eklenmiş/düzenlenmiş ürünler varsa onları kullan */
const PRODUCTS = (_CATALOG && Array.isArray(_CATALOG.products) && _CATALOG.products.length) ? _CATALOG.products : DEFAULT_PRODUCTS;

/* attach generated imagery to each product */
PRODUCTS.forEach(p => {
  p.images = imageSet(p.type, p.colors);
  p.gallery = p.colors.map(c => p.images[c]);
});

const CATEGORIES = [
  { key: "kadin",  label: "Kadın",       count: PRODUCTS.filter(p=>p.cat==="kadin").length, tone: "bordo" },
  { key: "erkek",  label: "Erkek",       count: PRODUCTS.filter(p=>p.cat==="erkek").length, tone: "kahve" },
  { key: "aksesuar", label: "Aksesuar",  count: 12, tone: "konyak" },
  { key: "koleksiyon", label: "Koleksiyonlar", count: 6, tone: "siyah" },
];

const TL = n => "₺" + n.toLocaleString("tr-TR");
