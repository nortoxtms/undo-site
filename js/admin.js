/* ============================================================
   UNDO — Yönetim Paneli (demo)
   Katalog bu tarayıcının localStorage'ına yazılır (CATALOG_KEY).
   js/products.js kayıt varsa varsayılan katalog yerine onu kullanır.
   ============================================================ */

const CATEGORY_LABELS = { kadin: "Kadın", erkek: "Erkek" };
const MATERIALS = ["Dana Derisi", "Kuzu Derisi", "Koyun Derisi", "Süet Deri"];
const TYPES = { jacket: "Ceket", coat: "Palto / Uzun", vest: "Yelek / Üst", bag: "Çanta" };
const BADGES = ["Yeni", "Çok Satan", "Öne Çıkan", "İndirim"];
const SIZE_PRESETS = ["XS", "S", "M", "L", "XL", "2XL", "S/M", "L/XL"];
const VIEW_KEYS = ["on", "arka", "yan", "detay1", "detay2", "detay3"];
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const HEX_RE = /^#[0-9a-f]{6}$/i;

/* ---------- Durum ---------- */
const State = {
  products: PRODUCTS.map(cleanProduct),
  tones: LEATHER_TONES,      // aynı nesne: yer tutucu SVG'ler de güncel tonları görsün
  selected: null,            // ürün id'si | "__new" | null
  dirty: false,
  search: "",
  cat: "all",
};

/* ---------- Yardımcılar ---------- */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
/* Mağaza bu metinleri HTML içine yazıyor; işaretleme karakterleri kataloğa girmesin */
function plainText(s) { return String(s ?? "").replace(/[<>"`]/g, "").trim(); }

function cleanProduct(p) {
  const c = {
    id: p.id, name: p.name, cat: p.cat, type: p.type, price: p.price, old: p.old ?? null,
    colors: [...(p.colors || [])], sizes: [...(p.sizes || [])],
    rating: p.rating, reviews: p.reviews, badge: p.badge ?? null, material: p.material, desc: p.desc,
  };
  if (p.views && p.views.length) c.views = [...p.views];
  if (p.chart && SIZE_CHARTS[p.chart]) c.chart = p.chart;
  return c;
}

function slugify(s) {
  const map = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u" };
  return String(s).toLocaleLowerCase("tr").replace(/[çğıİöşü]/g, m => map[m])
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function uniqueKey(base, taken) {
  let key = base || "yeni", i = 2;
  while (taken.has(key)) key = `${base || "yeni"}-${i++}`;
  return key;
}
function imagePath(id, view) { return `assets/products/${id}-${view}.webp`; }
function thumbOf(p) {
  return (p.views && p.views.length) ? imagePath(p.id, p.views[0]) : svgURI(garmentSVG(p.type, p.colors[0]));
}
function imageExists(src) {
  return new Promise(res => { const i = new Image(); i.onload = () => res(true); i.onerror = () => res(false); i.src = src; });
}
function downloadFile(name, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function catalogData() { return { products: State.products.map(cleanProduct), tones: State.tones }; }

/* ---------- Kayıt ---------- */
function persist() {
  try {
    localStorage.setItem(CATALOG_KEY, JSON.stringify(catalogData()));
    return true;
  } catch (e) {
    toast("Kaydedilemedi: tarayıcı depolama alanı dolu olabilir");
    return false;
  }
}
function setDirty(dirty) {
  State.dirty = dirty;
  const el = document.getElementById("save-status");
  el.textContent = dirty ? "Kaydedilmemiş değişiklikler var" : "Tüm değişiklikler kaydedildi";
  el.className = "save-status " + (dirty ? "is-dirty" : "is-saved");
}
window.addEventListener("beforeunload", e => { if (State.dirty) { e.preventDefault(); e.returnValue = ""; } });

/* ---------- Onay penceresi ---------- */
function confirmDialog({ title, body, confirmLabel = "Onayla", danger = false }) {
  return new Promise(resolve => {
    const host = document.getElementById("modal-host");
    const previous = document.activeElement;
    host.innerHTML = `
      <div class="adm-modal-scrim" data-cancel>
        <div class="adm-modal" role="dialog" aria-modal="true" aria-labelledby="adm-modal-title">
          <h3 id="adm-modal-title">${esc(title)}</h3>
          <p>${esc(body)}</p>
          <div class="adm-modal-actions">
            <button type="button" class="btn btn-outline btn-sm" data-cancel>Vazgeç</button>
            <button type="button" class="btn btn-solid btn-sm ${danger ? "danger-solid" : ""}" data-ok>${esc(confirmLabel)}</button>
          </div>
        </div>
      </div>`;
    const close = ok => {
      document.removeEventListener("keydown", onKey);
      host.innerHTML = "";
      previous?.focus?.();
      resolve(ok);
    };
    const onKey = e => {
      if (e.key === "Escape") close(false);
      if (e.key === "Tab") {  // odak pencerenin içinde kalsın
        const btns = [...host.querySelectorAll("button")];
        const i = btns.indexOf(document.activeElement);
        e.preventDefault();
        btns[(i + (e.shiftKey ? -1 : 1) + btns.length) % btns.length].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    host.querySelector("[data-ok]").addEventListener("click", () => close(true));
    host.querySelectorAll("button[data-cancel]").forEach(b => b.addEventListener("click", () => close(false)));
    host.querySelector(".adm-modal-scrim").addEventListener("click", e => { if (e.target === e.currentTarget) close(false); });
    host.querySelector("[data-ok]").focus();
  });
}
async function leaveFormOk() {
  if (!State.dirty) return true;
  const ok = await confirmDialog({
    title: "Kaydedilmemiş değişiklikler",
    body: "Formdaki değişiklikler kaydedilmedi. Çıkarsanız kaybolacak.",
    confirmLabel: "Değişiklikleri at", danger: true,
  });
  if (ok) setDirty(false);
  return ok;
}

/* ---------- İstatistikler ---------- */
function renderStats() {
  const ps = State.products;
  const avg = ps.length ? Math.round(ps.reduce((s, p) => s + p.price, 0) / ps.length) : 0;
  const cards = [
    ["Toplam Ürün", ps.length],
    ["Kadın / Erkek", `${ps.filter(p => p.cat === "kadin").length} / ${ps.filter(p => p.cat === "erkek").length}`],
    ["İndirimli", ps.filter(p => p.old).length],
    ["Fotoğrafsız", ps.filter(p => !p.views).length],
    ["Ortalama Fiyat", TL(avg)],
    ["Deri Tonu", Object.keys(State.tones).length],
  ];
  document.getElementById("adm-stats").innerHTML = cards.map(([label, value]) =>
    `<div class="adm-stat"><div class="adm-stat-num">${esc(value)}</div><div class="adm-stat-label">${esc(label)}</div></div>`).join("");
}

/* ---------- Ürün listesi ---------- */
function renderList() {
  const q = foldText(State.search);
  const list = State.products.filter(p =>
    (State.cat === "all" || p.cat === State.cat) && (!q || foldText(p.name).includes(q)));
  document.getElementById("list-count").textContent = `${list.length} / ${State.products.length} ürün`;
  document.getElementById("product-list").innerHTML = list.length ? list.map(p => `
    <button type="button" class="adm-item ${p.id === State.selected ? "active" : ""}" data-id="${esc(p.id)}" ${p.id === State.selected ? 'aria-current="true"' : ""}>
      <span class="adm-item-thumb"><img src="${esc(thumbOf(p))}" alt="" loading="lazy" decoding="async"></span>
      <span class="adm-item-info">
        <strong>${esc(p.name)}</strong>
        <small>${esc(CATEGORY_LABELS[p.cat] || p.cat)} · ${TL(p.price)}${p.badge ? ` · ${esc(p.badge)}` : ""}</small>
      </span>
    </button>`).join("") : `<p class="adm-empty">Eşleşen ürün yok.</p>`;
}

/* ---------- Ürün formu ---------- */
function blankProduct() {
  return {
    id: "", name: "", cat: "kadin", type: "jacket", price: 10000, old: null,
    colors: [Object.keys(State.tones)[0]], sizes: ["S", "M", "L"],
    rating: 4.5, reviews: 0, badge: null, material: MATERIALS[0], desc: "",
  };
}
function selectOptions(pairs, current) {
  return pairs.map(([v, l]) => `<option value="${esc(v)}" ${v === current ? "selected" : ""}>${esc(l)}</option>`).join("");
}
function chip(group, value, label, checked, extra = "") {
  return `<label class="adm-chip"><input type="checkbox" name="${group}" value="${esc(value)}" ${checked ? "checked" : ""}>${extra}<span>${esc(label)}</span></label>`;
}
function renderForm() {
  const wrap = document.getElementById("form-wrap");
  const isNew = State.selected === "__new";
  const p = isNew ? blankProduct() : State.products.find(x => x.id === State.selected);
  if (!p) {
    wrap.innerHTML = `<div class="adm-placeholder"><h3>Bir ürün seçin</h3><p class="muted">Düzenlemek için soldan bir ürün seçin ya da yeni ürün ekleyin.</p></div>`;
    return;
  }
  const sizes = [...new Set([...SIZE_PRESETS, ...p.sizes])];
  const views = [...new Set([...VIEW_KEYS, ...(p.views || [])])];
  wrap.innerHTML = `
    <form id="product-form" class="adm-form" novalidate>
      <div class="adm-form-head">
        <h2>${isNew ? "Yeni Ürün" : esc(p.name)}</h2>
        ${isNew ? "" : `<a class="adm-link" href="product.html?id=${esc(p.id)}" target="_blank" rel="noopener">Mağazada gör ↗</a>`}
      </div>
      <div class="adm-error" id="form-error" role="alert" hidden></div>

      <div class="form-grid">
        <div class="field full"><label for="f-name">Ürün adı</label><input id="f-name" name="name" value="${esc(p.name)}" required maxlength="80"></div>
        <div class="field full"><label for="f-id">Ürün kodu ${isNew ? "" : "<small>(değişmez: görseller, sepet ve favoriler buna bağlı)</small>"}</label>
          <input id="f-id" name="id" value="${esc(p.id)}" ${isNew ? "" : "readonly"} spellcheck="false" placeholder="urun-adindan-otomatik"></div>
        <div class="field"><label for="f-cat">Kategori</label><select id="f-cat" name="cat">${selectOptions(Object.entries(CATEGORY_LABELS), p.cat)}</select></div>
        <div class="field"><label for="f-material">Malzeme</label><select id="f-material" name="material">${selectOptions([...new Set([...MATERIALS, p.material])].map(m => [m, m]), p.material)}</select></div>
        <div class="field"><label for="f-price">Fiyat (₺)</label><input id="f-price" name="price" type="number" min="1" step="50" value="${esc(p.price)}" required></div>
        <div class="field"><label for="f-old">Eski fiyat (₺) <small>(indirim varsa)</small></label><input id="f-old" name="old" type="number" min="1" step="50" value="${esc(p.old ?? "")}"></div>
        <div class="field"><label for="f-rating">Puan (0–5)</label><input id="f-rating" name="rating" type="number" min="0" max="5" step="0.1" value="${esc(p.rating)}"></div>
        <div class="field"><label for="f-reviews">Değerlendirme sayısı</label><input id="f-reviews" name="reviews" type="number" min="0" step="1" value="${esc(p.reviews)}"></div>
        <div class="field"><label for="f-badge">Etiket</label><select id="f-badge" name="badge"><option value="">Etiket yok</option>${selectOptions([...new Set([...BADGES, ...(p.badge ? [p.badge] : [])])].map(b => [b, b]), p.badge)}</select></div>
        <div class="field"><label for="f-type">Yer tutucu kalıbı <small>(fotoğraf yoksa)</small></label><select id="f-type" name="type">${selectOptions(Object.entries(TYPES), p.type)}</select></div>
        <div class="field full"><label for="f-desc">Açıklama</label><textarea id="f-desc" name="desc" rows="3" maxlength="400">${esc(p.desc)}</textarea></div>
      </div>

      <fieldset class="adm-group"><legend>Renkler</legend>
        <div class="adm-chips">${Object.entries(State.tones).map(([k, t]) =>
          chip("colors", k, t.name, p.colors.includes(k), `<i class="adm-dot" style="background:${esc(t.hex)}"></i>`)).join("")}</div>
      </fieldset>
      <fieldset class="adm-group"><legend>Bedenler</legend>
        <div class="adm-chips">${sizes.map(s => chip("sizes", s, s, p.sizes.includes(s))).join("")}</div>
      </fieldset>
      <fieldset class="adm-group"><legend>Fotoğraflar</legend>
        <p class="adm-hint">Dosyayı <code id="view-path">${esc(imagePath(p.id || "urun-kodu", "on"))}</code> biçiminde <code>assets/products/</code> klasörüne koyun, sonra açıyı işaretleyin. İlk açı kartta ana görsel olur. Hiçbiri seçili değilse yer tutucu kullanılır.</p>
        <div class="adm-chips">${views.map(v => chip("views", v, VIEW_LABELS[v] ? `${VIEW_LABELS[v]} (${v})` : v, (p.views || []).includes(v))).join("")}</div>
        <div class="adm-previews" id="view-previews"></div>
      </fieldset>

      <div class="adm-form-actions">
        <button class="btn btn-solid btn-sm" type="submit">${isNew ? "Ürünü Ekle" : "Değişiklikleri Kaydet"}</button>
        <button class="btn btn-outline btn-sm" type="button" id="form-cancel">Vazgeç</button>
        ${isNew ? "" : `<button class="btn btn-outline btn-sm danger-btn" type="button" id="form-delete">Ürünü Sil</button>`}
      </div>
    </form>`;

  const form = document.getElementById("product-form");
  form.addEventListener("input", e => {
    setDirty(true);
    if (isNew && e.target.name === "name" && !form.dataset.idTouched) {
      form.elements.id.value = slugify(e.target.value);
    }
    if (isNew && e.target.name === "id") form.dataset.idTouched = "1";
    if (e.target.name === "id" || e.target.name === "name") {
      document.getElementById("view-path").textContent = imagePath(form.elements.id.value || "urun-kodu", "on");
    }
    if (e.target.name === "views" || e.target.name === "id" || e.target.name === "name") renderPreviews(form);
  });
  form.addEventListener("submit", e => { e.preventDefault(); saveProduct(form, isNew, p); });
  document.getElementById("form-cancel").addEventListener("click", async () => {
    if (!(await leaveFormOk())) return;
    if (isNew) State.selected = null;
    renderForm(); renderList();
  });
  document.getElementById("form-delete")?.addEventListener("click", () => deleteProduct(p.id));
  renderPreviews(form);
}
function checkedValues(form, name) { return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value); }
function renderPreviews(form) {
  const id = form.elements.id.value;
  const mount = document.getElementById("view-previews");
  mount.innerHTML = checkedValues(form, "views").map(v => `
    <figure><img src="${esc(imagePath(id, v))}" alt="${esc(v)}"><figcaption>${esc(VIEW_LABELS[v] || v)}</figcaption></figure>`).join("");
  mount.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => img.closest("figure").classList.add("missing"));
  });
}

/* ---------- Kaydet / sil ---------- */
function formError(msg) {
  const el = document.getElementById("form-error");
  el.textContent = msg; el.hidden = !msg;
  if (msg) el.scrollIntoView({ behavior: "smooth", block: "center" });
}
async function saveProduct(form, isNew, original) {
  const f = form.elements;
  const name = plainText(f.name.value);
  const id = isNew ? (f.id.value.trim() || slugify(name)) : original.id;
  const price = Math.round(+f.price.value);
  const old = f.old.value === "" ? null : Math.round(+f.old.value);
  const rating = +f.rating.value;
  const reviews = Math.round(+f.reviews.value);
  const colors = checkedValues(form, "colors");
  const sizes = checkedValues(form, "sizes");
  const views = checkedValues(form, "views");

  const problem =
    !name ? "Ürün adı gerekli." :
    !SLUG_RE.test(id) ? "Ürün kodu yalnızca küçük harf, rakam ve tire içerebilir." :
    (isNew && State.products.some(p => p.id === id)) ? `“${id}” kodu başka bir üründe kullanılıyor.` :
    !(price > 0) ? "Geçerli bir fiyat girin." :
    (old !== null && !(old > price)) ? "Eski fiyat, güncel fiyattan yüksek olmalı." :
    !(rating >= 0 && rating <= 5) ? "Puan 0 ile 5 arasında olmalı." :
    !(reviews >= 0) ? "Değerlendirme sayısı negatif olamaz." :
    !colors.length ? "En az bir renk seçin." :
    !sizes.length ? "En az bir beden seçin." : "";
  if (problem) { formError(problem); return; }

  // seçili her açının dosyası gerçekten var mı: mağazada kırık görsel olmasın
  const missing = [];
  for (const v of views) if (!(await imageExists(imagePath(id, v)))) missing.push(imagePath(id, v));
  if (missing.length) { formError(`Dosya bulunamadı: ${missing.join(", ")}`); return; }
  formError("");

  const product = cleanProduct({
    id, name, price, old, rating, reviews, colors, sizes, views, chart: isNew ? undefined : original.chart,
    cat: f.cat.value, type: f.type.value, material: f.material.value,
    badge: f.badge.value || null, desc: plainText(f.desc.value),
  });
  const before = State.products.slice();
  if (isNew) State.products.unshift(product);
  else State.products[State.products.findIndex(p => p.id === id)] = product;
  if (!persist()) { State.products = before; return; }

  State.selected = id;
  setDirty(false);
  renderStats(); renderList(); renderForm(); renderTones();
  toast(isNew ? "Ürün eklendi" : "Değişiklikler kaydedildi");
}
async function deleteProduct(id) {
  const p = State.products.find(x => x.id === id);
  if (State.products.length === 1) { toast("Son ürün silinemez: katalog boş kalırsa varsayılan ürünler geri gelir"); return; }
  const ok = await confirmDialog({
    title: "Ürünü sil",
    body: `“${p.name}” katalogdan kaldırılacak. Fotoğraf dosyaları silinmez.`,
    confirmLabel: "Sil", danger: true,
  });
  if (!ok) return;
  const before = State.products.slice();
  State.products = State.products.filter(x => x.id !== id);
  if (!persist()) { State.products = before; return; }
  State.selected = null;
  setDirty(false);
  renderStats(); renderList(); renderForm(); renderTones();
  toast("Ürün silindi");
}

/* ---------- Deri tonları ---------- */
function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const part = s => Math.max(0, Math.min(255, ((n >> s) & 255) + amount)).toString(16).padStart(2, "0");
  return `#${part(16)}${part(8)}${part(0)}`;
}
function usageOf(key) { return State.products.filter(p => p.colors.includes(key)).length; }
function renderTones() {
  document.getElementById("tone-list").innerHTML = Object.entries(State.tones).map(([key, t]) => `
    <div class="adm-tone" data-key="${esc(key)}">
      <input type="color" value="${esc(t.hex)}" aria-label="${esc(t.name)} rengi" data-field="hex">
      <div class="adm-tone-info">
        <input type="text" value="${esc(t.name)}" aria-label="Ton adı" data-field="name" maxlength="30">
        <small>${usageOf(key)} üründe kullanılıyor</small>
      </div>
      <button type="button" class="adm-icon-btn" data-delete aria-label="${esc(t.name)} tonunu sil" ${usageOf(key) ? 'disabled title="Kullanımda olan ton silinemez"' : ""}>${IC.trash}</button>
    </div>`).join("");
}
function initTones() {
  const list = document.getElementById("tone-list");
  list.addEventListener("change", e => {
    const row = e.target.closest(".adm-tone");
    if (!row || !e.target.dataset.field) return;
    const t = State.tones[row.dataset.key];
    if (e.target.dataset.field === "name") {
      const name = plainText(e.target.value);
      if (!name) { e.target.value = t.name; toast("Ton adı boş olamaz"); return; }
      t.name = name; e.target.value = name;
    } else {
      t.hex = e.target.value;
      t.base = shade(t.hex, -24); t.edge = t.hex; t.stitch = shade(t.hex, 32);
    }
    if (persist()) { renderList(); renderStats(); if (!State.dirty) renderForm(); toast("Ton güncellendi"); }
  });
  list.addEventListener("click", async e => {
    const btn = e.target.closest("[data-delete]");
    if (!btn || btn.disabled) return;
    const key = btn.closest(".adm-tone").dataset.key;
    const ok = await confirmDialog({ title: "Tonu sil", body: `“${State.tones[key].name}” tonu silinecek.`, confirmLabel: "Sil", danger: true });
    if (!ok) return;
    delete State.tones[key];
    if (persist()) { renderTones(); renderStats(); if (!State.dirty) renderForm(); toast("Ton silindi"); }
  });
  document.getElementById("new-tone").addEventListener("click", () => {
    const key = uniqueKey("yeni-ton", new Set(Object.keys(State.tones)));
    const hex = "#8a6d52";
    State.tones[key] = { name: "Yeni Ton", hex, base: shade(hex, -24), edge: hex, stitch: shade(hex, 32) };
    if (!persist()) { delete State.tones[key]; return; }
    renderTones(); renderStats();
    if (!State.dirty) renderForm();
    const row = document.querySelector(`.adm-tone[data-key="${key}"] input[type=text]`);
    row.focus(); row.select();
  });
}

/* ---------- Yedekle & aktar ---------- */
function validateCatalog(data) {
  if (!data || typeof data !== "object") return "Dosya bir katalog içermiyor.";
  if (!Array.isArray(data.products) || !data.products.length) return "Dosyada ürün listesi yok.";
  if (!data.tones || typeof data.tones !== "object" || !Object.keys(data.tones).length) return "Dosyada ton listesi yok.";
  for (const [k, t] of Object.entries(data.tones)) {
    if (!SLUG_RE.test(k) || !t || !plainText(t.name) || !HEX_RE.test(t.hex)) return `Geçersiz ton: ${k}`;
  }
  const ids = new Set();
  for (const p of data.products) {
    const label = p && (p.id || p.name) || "adsız ürün";
    if (!p || !SLUG_RE.test(p.id || "")) return `Geçersiz ürün kodu: ${label}`;
    if (ids.has(p.id)) return `Tekrarlanan ürün kodu: ${p.id}`;
    ids.add(p.id);
    if (!plainText(p.name)) return `Ürün adı eksik: ${label}`;
    if (!CATEGORY_LABELS[p.cat]) return `Geçersiz kategori: ${label}`;
    if (!(p.price > 0)) return `Geçersiz fiyat: ${label}`;
    if (!Array.isArray(p.colors) || !p.colors.length || p.colors.some(c => !data.tones[c])) return `Tanımsız renk: ${label}`;
    if (!Array.isArray(p.sizes) || !p.sizes.length) return `Beden eksik: ${label}`;
    if (p.views && (!Array.isArray(p.views) || p.views.some(v => !SLUG_RE.test(v)))) return `Geçersiz görsel açısı: ${label}`;
  }
  return "";
}
function normalizeImported(data) {
  const products = data.products.map(p => cleanProduct({
    ...p, name: plainText(p.name), desc: plainText(p.desc), material: plainText(p.material) || MATERIALS[0],
    badge: p.badge ? plainText(p.badge) : null, type: TYPES[p.type] ? p.type : "jacket",
    old: p.old > 0 ? p.old : null, rating: p.rating >= 0 && p.rating <= 5 ? p.rating : 0, reviews: p.reviews >= 0 ? p.reviews : 0,
    sizes: p.sizes.map(plainText).filter(Boolean),
  }));
  const tones = {};
  Object.entries(data.tones).forEach(([k, t]) => {
    tones[k] = { name: plainText(t.name), hex: t.hex, base: HEX_RE.test(t.base) ? t.base : shade(t.hex, -24), edge: HEX_RE.test(t.edge) ? t.edge : t.hex, stitch: HEX_RE.test(t.stitch) ? t.stitch : shade(t.hex, 32) };
  });
  return { products, tones };
}
/* products.js'in varsayılan katalog bölümlerini güncel veriyle değiştirir */
function buildProductsJs(source) {
  const swap = (text, start, end, body) => {
    const a = text.indexOf(start);
    const b = a < 0 ? -1 : text.indexOf(end, a);
    if (b < 0) throw new Error("products.js beklenen biçimde değil");
    return text.slice(0, a) + start + "\n" + body + text.slice(b);
  };
  const tones = Object.entries(State.tones).map(([k, t]) => `  ${JSON.stringify(k)}: ${JSON.stringify(t)},`).join("\n");
  const products = State.products.map(p => `  ${JSON.stringify(cleanProduct(p))},`).join("\n");
  let out = source.replace(/\r\n/g, "\n");
  out = swap(out, "const DEFAULT_TONES = {", "\n};", tones);
  out = swap(out, "const DEFAULT_PRODUCTS = [", "\n];", products);
  return out;
}
function initBackup() {
  const stamp = () => new Date().toISOString().slice(0, 10);
  document.getElementById("export-json").addEventListener("click", () => {
    downloadFile(`undo-katalog-${stamp()}.json`, JSON.stringify(catalogData(), null, 2), "application/json");
    toast("Yedek indirildi");
  });
  const fileInput = document.getElementById("import-json-file");
  document.getElementById("import-json").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    fileInput.value = "";
    if (!file) return;
    let data;
    try { data = JSON.parse(await file.text()); }
    catch { toast("Dosya okunamadı: geçerli bir JSON değil"); return; }
    await importCatalog(data);
  });
  document.getElementById("export-js").addEventListener("click", async () => {
    try {
      const res = await fetch("js/products.js", { cache: "no-store" });
      if (!res.ok) throw new Error();
      downloadFile("products.js", buildProductsJs(await res.text()), "text/javascript");
      toast("products.js indirildi");
    } catch {
      toast("products.js okunamadı: paneli bir sunucu üzerinden açın");
    }
  });
  document.getElementById("reset-all").addEventListener("click", async () => {
    const ok = await confirmDialog({
      title: "Varsayılana sıfırla",
      body: "Panelde yapılan tüm değişiklikler silinecek ve js/products.js kataloğuna dönülecek. Bu işlem geri alınamaz.",
      confirmLabel: "Her Şeyi Sıfırla", danger: true,
    });
    if (!ok) return;
    localStorage.removeItem(CATALOG_KEY);
    setDirty(false);
    location.reload();
  });
}
async function importCatalog(data) {
  const problem = validateCatalog(data);
  if (problem) { toast(`Yüklenemedi. ${problem}`); return false; }
  const ok = await confirmDialog({
    title: "Yedeği yükle",
    body: `${data.products.length} ürün ve ${Object.keys(data.tones).length} ton mevcut kataloğun yerine geçecek.`,
    confirmLabel: "Yükle", danger: true,
  });
  if (!ok) return false;
  const next = normalizeImported(data);
  try { localStorage.setItem(CATALOG_KEY, JSON.stringify(next)); }
  catch { toast("Kaydedilemedi: tarayıcı depolama alanı dolu olabilir"); return false; }
  setDirty(false);
  location.reload();
  return true;
}

/* ---------- Sekmeler ---------- */
function initTabs_admin() {
  document.querySelectorAll(".adm-tab").forEach(tab => {
    tab.setAttribute("aria-selected", tab.classList.contains("active"));
    tab.addEventListener("click", () => {
      document.querySelectorAll(".adm-tab").forEach(t => { t.classList.toggle("active", t === tab); t.setAttribute("aria-selected", t === tab); });
      document.querySelectorAll(".adm-panel").forEach(p => p.classList.toggle("active", p.id === tab.dataset.tab));
    });
  });
}

/* ---------- Başlat ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filter-cat").insertAdjacentHTML("beforeend",
    Object.entries(CATEGORY_LABELS).map(([k, l]) => `<option value="${k}">${l}</option>`).join(""));
  document.getElementById("search").addEventListener("input", e => { State.search = e.target.value; renderList(); });
  document.getElementById("filter-cat").addEventListener("change", e => { State.cat = e.target.value; renderList(); });
  document.getElementById("product-list").addEventListener("click", async e => {
    const item = e.target.closest(".adm-item");
    if (!item || item.dataset.id === State.selected) return;
    if (!(await leaveFormOk())) return;
    State.selected = item.dataset.id;
    renderList(); renderForm();
    if (window.innerWidth <= 900) document.getElementById("form-wrap").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.getElementById("new-product").addEventListener("click", async () => {
    if (!(await leaveFormOk())) return;
    State.selected = "__new";
    renderList(); renderForm();
    document.getElementById("f-name").focus();
  });
  initTabs_admin();
  initTones();
  initBackup();
  renderStats(); renderList(); renderForm(); renderTones();
});
