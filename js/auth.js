/* ============================================================
   35 — Auth & Kullanıcı Sistemi  (DEMO — localStorage tabanlı)
   Gerçek backend/OAuth YOK. Tüm veri tarayıcıda saklanır.
   Sepet sistemiyle aynı mantık (js/app.js → Cart).
   ============================================================ */

/* ---------- Kullanıcı & Oturum ---------- */
const Auth = {
  USERS_KEY:   "atelier35_users",
  SESSION_KEY: "atelier35_session",

  /* demo amaçlı basit karıştırma — gerçek güvenlik değildir */
  _hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
    return "h" + (h >>> 0).toString(36);
  },

  users()      { try { return JSON.parse(localStorage.getItem(this.USERS_KEY)) || []; } catch { return []; } },
  saveUsers(u) { localStorage.setItem(this.USERS_KEY, JSON.stringify(u)); },

  current() {
    try {
      const email = localStorage.getItem(this.SESSION_KEY);
      if (!email) return null;
      return this.users().find(u => u.email === email) || null;
    } catch { return null; }
  },
  isLoggedIn() { return !!this.current(); },

  register({ name, email, password, provider }) {
    email = (email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) return { ok: false, error: "Geçerli bir e-posta girin." };
    if (!provider && (!password || password.length < 4)) return { ok: false, error: "Şifre en az 4 karakter olmalı." };
    const users = this.users();
    if (users.some(u => u.email === email)) return { ok: false, error: "Bu e-posta zaten kayıtlı. Giriş yapın." };
    const user = {
      name: (name || "").trim() || email.split("@")[0],
      email,
      pass: password ? this._hash(password) : null,
      provider: provider || "email",
      phone: "", address: "",
      createdAt: Date.now(),
    };
    users.push(user);
    this.saveUsers(users);
    localStorage.setItem(this.SESSION_KEY, email);
    return { ok: true, user };
  },

  login({ email, password }) {
    email = (email || "").trim().toLowerCase();
    const user = this.users().find(u => u.email === email);
    if (!user) return { ok: false, error: "Bu e-posta ile kayıt bulunamadı." };
    if (user.pass && user.pass !== this._hash(password || "")) return { ok: false, error: "Şifre hatalı." };
    localStorage.setItem(this.SESSION_KEY, email);
    return { ok: true, user };
  },

  /* DEMO: gerçek Google/Apple doğrulaması yok — sağlayıcı kullanıcısı simüle edilir */
  loginProvider(provider) {
    const email = provider.toLowerCase() + "-demo@atelier35.com";
    const users = this.users();
    let user = users.find(u => u.email === email);
    if (!user) return this.register({ name: provider + " Kullanıcısı", email, provider });
    localStorage.setItem(this.SESSION_KEY, email);
    return { ok: true, user };
  },

  logout() { localStorage.removeItem(this.SESSION_KEY); },

  updateProfile(patch) {
    const users = this.users();
    const cur = this.current();
    if (!cur) return { ok: false };
    const i = users.findIndex(u => u.email === cur.email);
    if (i < 0) return { ok: false };
    users[i] = { ...users[i], ...patch };
    this.saveUsers(users);
    return { ok: true, user: users[i] };
  },
};

/* ---------- Favoriler (kullanıcıya / misafire bağlı) ---------- */
const Wishlist = {
  KEY: "atelier35_wishlist",
  _all()   { try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch { return {}; } },
  _owner() { const u = Auth.current(); return u ? u.email : "_guest"; },
  _save(a) { localStorage.setItem(this.KEY, JSON.stringify(a)); },
  list()   { return this._all()[this._owner()] || []; },
  has(id)  { return this.list().includes(id); },
  toggle(id) {
    const all = this._all(), o = this._owner(), arr = all[o] || [];
    const i = arr.indexOf(id);
    if (i >= 0) arr.splice(i, 1); else arr.push(id);
    all[o] = arr; this._save(all);
    return this.has(id);
  },
  count() { return this.list().length; },
};

/* ---------- Değerlendirmeler / Yıldız ---------- */
const Reviews = {
  KEY: "atelier35_reviews",
  _all()  { try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch { return {}; } },
  _save(a){ localStorage.setItem(this.KEY, JSON.stringify(a)); },
  forProduct(id) { return this._all()[id] || []; },
  mine(id) { const u = Auth.current(); if (!u) return null; return this.forProduct(id).find(r => r.email === u.email) || null; },
  add(id, rating, comment) {
    const u = Auth.current();
    if (!u) return { ok: false, error: "Puan vermek için giriş yapın." };
    const all = this._all(), arr = all[id] || [];
    const rev = { email: u.email, name: u.name, rating: +rating, comment: (comment || "").trim(), at: Date.now() };
    const i = arr.findIndex(r => r.email === u.email);
    if (i >= 0) arr[i] = rev; else arr.push(rev);
    all[id] = arr; this._save(all);
    return { ok: true };
  },
  avg(id)   { const a = this.forProduct(id); return a.length ? a.reduce((s, r) => s + r.rating, 0) / a.length : null; },
  count(id) { return this.forProduct(id).length; },
};

/* ---------- Siparişler & Takip (demo durum) ---------- */
const Orders = {
  KEY: "atelier35_orders",
  STEPS: ["Sipariş Alındı", "Hazırlanıyor", "Kargoya Verildi", "Dağıtımda", "Teslim Edildi"],
  _all()  { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch { return []; } },
  _save(a){ localStorage.setItem(this.KEY, JSON.stringify(a)); },
  add(order) { const all = this._all(); all.unshift(order); this._save(all); },
  mine()  { const u = Auth.current(); const all = this._all(); return u ? all.filter(o => o.email === u.email) : []; },
  find(no){ return this._all().find(o => (o.no || "").toUpperCase() === (no || "").trim().toUpperCase()) || null; },
  genNo() { return "35-" + Math.random().toString(36).slice(2, 8).toUpperCase(); },

  /* Sipariş yaşına göre otomatik ilerleyen demo durumu */
  status(o) {
    const hours = (Date.now() - o.at) / 3600000;
    let step;
    if      (hours < 2)  step = 0;
    else if (hours < 24) step = 1;
    else if (hours < 72) step = 2;
    else if (hours < 120) step = 3;
    else                  step = 4;
    return { step, label: this.STEPS[step], delivered: step === 4 };
  },
};
