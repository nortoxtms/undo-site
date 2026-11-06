/* ============================================================
   UNDO — Dil desteği
   Kaynak dil Türkçe: veriler (ürün, sepet, sipariş) hep Türkçe saklanır,
   çeviri yalnızca ekrana yazılırken yapılır. Sözlükte olmayan metin Türkçe kalır.
   Sayfaya eklenen metinler MutationObserver ile kendiliğinden çevrilir; değişken
   içeren cümleler kodda txf() ile yazılır.

   Yeni dil eklemek: LANGS'e satır, DICT'e aynı anahtarlarla bir sözlük ekleyin.
   Bu dosya <head> içinde yüklenir ki sayfa Türkçe görünüp sonradan değişmesin.
   admin.html `data-i18n="off"` ile hep Türkçe kalır.
   ============================================================ */
const LANGS = {
  tr: { label: "TR", locale: "tr-TR" },
  en: { label: "EN", locale: "en-GB" },
};
const LANG_KEY = "undo_lang";
const LANG = (() => {
  if (document.documentElement.dataset.i18n === "off") return "tr";
  try { const s = localStorage.getItem(LANG_KEY); return LANGS[s] ? s : "tr"; } catch (e) { return "tr"; }
})();

const plural = (n, one, many) => (+n === 1 ? one : many);

const DICT = { en: {
  /* ---- Sayfa başlıkları ve açıklamaları ---- */
  "UNDO — Hakiki Deri Ceket & Palto": "UNDO — Genuine Leather Jackets & Coats",
  "35 yıllık ustalık. Zamansız stil. Hakiki deriden el yapımı ceket, palto ve deri giyim koleksiyonu.": "35 years of craftsmanship. Timeless style. A handmade collection of genuine leather jackets, coats and clothing.",
  "Hakkımızda · UNDO": "About Us · UNDO",
  "1989'dan bu yana hakiki deriyi zamansız tasarımla buluşturan UNDO'nun hikayesi.": "The story of UNDO, pairing genuine leather with timeless design since 1989.",
  "Sepetim · UNDO": "My Cart · UNDO",
  "Hesabım · UNDO": "My Account · UNDO",
  "Ödeme · UNDO": "Checkout · UNDO",
  "Ürün · UNDO": "Product · UNDO",
  "Tüm Ürünler · UNDO": "All Products · UNDO",
  "Hakiki deri ceket — el işçiliği ile üretilmiştir.": "Genuine leather jacket, made by hand.",
  "Hakiki deri ceket ve palto koleksiyonu. Kadın ve erkek için el yapımı deri giyim.": "A collection of genuine leather jackets and coats. Handmade leather clothing for women and men.",

  /* ---- Üst bölüm ve menü ---- */
  "Türkiye'nin dört bir yanına ücretsiz ve sigortalı kargo · 35 yıllık ustalık": "Free insured shipping across Türkiye · 35 years of craftsmanship",
  "Tüm Ürünler": "All Products",
  "Kadın": "Women",
  "Erkek": "Men",
  "Hakkımızda": "About Us",
  "Menü": "Menu",
  "Kapat": "Close",
  "Ara": "Search",
  "Favorilerim": "My Favourites",
  "Hesabım": "My Account",
  "Giriş Yap": "Sign In",
  "Sepet": "Cart",
  "UNDO ana sayfa": "UNDO home page",
  "Ürün ara": "Search products",
  "Ürün, renk veya malzeme ara…": "Search by product, colour or material…",
  "Dil seçimi": "Language",

  /* ---- Alt bölüm ---- */
  "Ücretsiz Kargo": "Free Shipping",
  "Tüm siparişlerde geçerli": "On all orders",
  "14 Gün İçinde İade": "14-Day Returns",
  "Kolay iade ve değişim": "Easy returns and exchanges",
  "Güvenli Ödeme": "Secure Payment",
  "Tüm kartlara 3D Secure": "3D Secure on all cards",
  "1989'dan bu yana hakiki deriyi zamansız tasarımla buluşturuyoruz. Her dikişte ustalık, her üründe tutku.": "Pairing genuine leather with timeless design since 1989. Craftsmanship in every stitch, passion in every piece.",
  "Alışveriş": "Shop",
  "Kurumsal": "Company",
  "Ustalığımız": "Our Craft",
  "Mağazalar": "Stores",
  "İletişim": "Contact",
  "Yardım": "Help",
  "Kargo & Teslimat": "Shipping & Delivery",
  "İade & Değişim": "Returns & Exchanges",
  "Beden Rehberi": "Size Guide",
  "Deri Bakımı": "Leather Care",
  "© 2026 UNDO. Tüm hakları saklıdır.": "© 2026 UNDO. All rights reserved.",

  /* ---- Ana sayfa ---- */
  "1989'dan bu yana": "Since 1989",
  "35 Yıllık Ustalık.": "35 Years of Craftsmanship.",
  "Zamansız Stil.": "Timeless Style.",
  "Gerçek deri, modern tasarım. Sizinle buluşuyor.": "Real leather, modern design. Made to meet you.",
  "Alışverişe Başla": "Start Shopping",
  "Hikayemiz": "Our Story",
  "Kategoriler": "Categories",
  "Ne Ararsanız Bulun": "Find What You're Looking For",
  "Kadın ve erkek için hakiki deriden özenle seçilmiş koleksiyonlar.": "Carefully chosen genuine leather collections for women and men.",
  "Keşfet": "Explore",
  "Öne Çıkanlar": "Highlights",
  "Sezonun Favorileri": "Favourites of the Season",
  "En çok tercih edilen, zamansız parçalar.": "Our most loved, timeless pieces.",
  "Tüm Ürünleri Gör": "View All Products",
  "Ustalığın Hikayesi": "The Story of Our Craft",
  "Her dikişte bir hikaye,": "A story in every stitch,",
  "her üründe bir iz.": "a mark on every piece.",
  "1989'dan bu yana en kaliteli derileri ustalıkla şekillendiriyor, zamana meydan okuyan ürünler tasarlıyoruz. Çünkü bizim için deri sadece bir malzeme değil, bir mirastır.": "Since 1989 we have been shaping the finest leathers by hand and designing pieces that defy time. To us, leather is not just a material; it is a legacy.",
  "Kullandıkça yumuşayan, size özel bir patina kazanan parçalar üretiyoruz — bir sezonluk değil, bir ömürlük.": "We make pieces that soften with wear and develop a patina of their own: not for a season, but for a lifetime.",
  "Bültenimize Katılın": "Join Our Newsletter",
  "Yeni Sezondan İlk Siz Haberdar Olun": "Be the First to Hear About the New Season",
  "Yeni koleksiyonlar, özel indirimler ve deri bakım ipuçları için abone olun. İlk siparişinizde %10 indirim.": "Subscribe for new collections, special offers and leather care tips. Get 10% off your first order.",
  "E-posta adresiniz": "Your email address",
  "Abone Ol": "Subscribe",
  "Teşekkürler! Aboneliğiniz alındı.": "Thank you! You are now subscribed.",
  "35 Yıllık Deneyim": "35 Years of Experience",
  "Kaliteden ödün vermeyen usta işçilik.": "Master craftsmanship with no compromise on quality.",
  "%100 Gerçek Deri": "100% Real Leather",
  "En kaliteli, doğal ve dayanıklı malzeme.": "The finest natural, durable material.",
  "Tüm siparişlerde ücretsiz ve sigortalı.": "Free and insured on all orders.",
  "Güvenli Alışveriş": "Secure Shopping",
  "256-bit SSL ile tam koruma.": "Fully protected with 256-bit SSL.",
  "Usta elleri arasında işlenmiş deri": "Leather worked in a craftsman's hands",

  /* ---- Hakkımızda ---- */
  "Bizim Hikayemiz": "Our Story",
  "35 Yıllık Ustalık": "35 Years of Craftsmanship",
  "1989'dan bu yana, hakiki deriyi sabır, ustalık ve tutkuyla zamansız parçalara dönüştürüyoruz.": "Since 1989 we have been turning genuine leather into timeless pieces with patience, skill and passion.",
  "Yıllık Deneyim": "Years of Experience",
  "%100": "100%",
  "Hakiki Deri": "Genuine Leather",
  "Mutlu Müşteri": "Happy Customers",
  "Kuşak Ustalık": "Generations of Craft",
  "Atölye": "Workshop",
  "Nasıl Başladık": "How We Began",
  "Bir Atölye, Bir Tutku": "One Workshop, One Passion",
  "1989 yılında küçük bir atölyede, tek bir dikiş makinesi ve büyük bir hayalle yola çıktık. Amacımız basitti: kullanıldıkça güzelleşen, nesilden nesle aktarılabilecek deri parçalar üretmek.": "We set out in 1989 in a small workshop, with one sewing machine and a big dream. Our aim was simple: to make leather pieces that grow more beautiful with use and can be passed down through generations.",
  "Bugün üç kuşaktır aynı özenle çalışıyoruz. Makineler değişti, ustalarımız çoğaldı; ama her ürüne dokunan el emeği ve kaliteden ödün vermeme ilkemiz hiç değişmedi.": "Three generations on, we work with the same care. The machines have changed and our team of craftspeople has grown, but the handwork in every piece and our refusal to compromise on quality have not.",
  "Deri seçimi": "Choosing the leather",
  "Malzememiz": "Our Material",
  "Yalnızca En İyisi": "Only the Best",
  "Her ceket, özenle seçilmiş %100 hakiki dana, kuzu ve koyun derisinden üretilir. Deriyi doğrudan güvenilir tabakhanelerden temin eder, her partiyi tek tek elden geçiririz.": "Every jacket is made from carefully selected 100% genuine calfskin, lambskin and sheepskin. We buy directly from trusted tanneries and inspect every batch by hand.",
  "Kimyasal işlemlerden mümkün olduğunca kaçınır, doğal tabaklama yöntemlerini tercih ederiz. Böylece deriniz zamanla kurumaz; aksine yumuşar ve size özel bir patina kazanır.": "We avoid chemical treatments wherever possible and prefer natural tanning methods. So your leather does not dry out over time; instead it softens and develops a patina of its own.",
  "Değerlerimiz": "Our Values",
  "Neden UNDO?": "Why UNDO?",
  "Bizi biz yapan üç temel ilke.": "Three principles that make us who we are.",
  "El İşçiliği": "Handcrafted",
  "Her parça, usta ellerde tek tek üretilir. Seri üretim yok, özen var.": "Every piece is made one at a time by skilled hands. No mass production, only care.",
  "Sadece en kaliteli, doğal deriyi kullanırız. Taviz vermeyiz.": "We use only the finest natural leather. We make no compromises.",
  "Kalıcı Kalite": "Lasting Quality",
  "2 yıl garanti, bir ömür dayanıklılık. Yatırım yaptığınız bir parça.": "A 2-year warranty and a lifetime of durability. A piece worth investing in.",
  "Koleksiyonu Keşfedin": "Discover the Collection",
  "Bir Ömürlük": "Pieces for",
  "Parçalar.": "a Lifetime.",
  "Ustalığımızın izini taşıyan ceket ve paltoları keşfedin. Bir sezon değil, bir ömür için.": "Discover jackets and coats that carry the mark of our craft. Not for a season, but for a lifetime.",

  /* ---- Mağaza ---- */
  "Ana Sayfa": "Home",
  "Hakiki deriden, ustalıkla üretilmiş zamansız parçalar.": "Timeless pieces, expertly made from genuine leather.",
  "Kadın Koleksiyonu": "Women's Collection",
  "Erkek Koleksiyonu": "Men's Collection",
  "Koleksiyon": "Collection",
  "Kategori": "Category",
  "Tümü": "All",
  "Ürün Türü": "Product Type",
  "Beden": "Size",
  "Renk": "Colour",
  "Malzeme": "Material",
  "Fiyat": "Price",
  "₺6.000": "₺6,000",
  "₺25.000": "₺25,000",
  "Filtrele": "Filter",
  "Sırala": "Sort by",
  "Popüler": "Popular",
  "Yeni": "New",
  "Fiyat: Artan": "Price: Low to High",
  "Fiyat: Azalan": "Price: High to Low",
  "Puan": "Rating",
  "Ürün bulunamadı": "No products found",
  "Aramanızla eşleşen ürün yok. Farklı bir kelime deneyin.": "No products match your search. Try a different word.",
  "Bu seçimde ürün yok. Filtreleri değiştirmeyi deneyin.": "No products match this selection. Try changing the filters.",
  "Beden Seç": "Select Size",
  "Favorilere ekle": "Add to favourites",
  "“{q}” için sonuçlar": "Results for “{q}”",
  "{n} ürün bulundu": v => `${v.n} ${plural(v.n, "product", "products")} found`,

  /* ---- Ürün sayfası ---- */
  "Ürün": "Product",
  "Ölçü Tablosu": "Size Chart",
  "Sepete Ekle": "Add to Cart",
  "Sepete Ekle · {size}": "Add to Cart · {size}",
  "Favorilere Ekle": "Add to Favourites",
  "Favorilerde": "In Favourites",
  "1–3 günde kargoda": "Ships in 1–3 days",
  "Ücretsiz ve sigortalı": "Free and insured",
  "14 gün içinde iade": "14-day returns",
  "Kolay değişim": "Easy exchanges",
  "2 Yıl Garanti": "2-Year Warranty",
  "Ustalık güvencesi": "Craftsmanship guarantee",
  "Malzeme ve yapım": "Material and construction",
  "Kalıp ve ölçüler": "Fit and measurements",
  "Bakım": "Care",
  "Kargo ve iade": "Shipping and returns",
  "Değerlendirmeler": "Reviews",
  "Tüm siparişler 1-3 iş günü içinde kargoya verilir ve Türkiye'nin her yerine ücretsiz, sigortalı olarak gönderilir.": "All orders are dispatched within 1–3 business days and shipped free and insured anywhere in Türkiye.",
  "Ürünü teslim aldıktan sonra 14 gün içinde, kullanılmamış ve etiketleri üzerinde olması koşuluyla ücretsiz iade veya değişim yapabilirsiniz.": "You can return or exchange an item free of charge within 14 days of delivery, provided it is unworn and its tags are still attached.",
  "Bunları da beğenebilirsiniz": "You may also like",
  "Görseli büyüt": "Enlarge image",
  "Ürün görseli": "Product image",
  "Yakınlaştır": "Zoom in",
  "Uzaklaştır": "Zoom out",
  "Önceki görsel": "Previous image",
  "Sonraki görsel": "Next image",
  "{label} görünümü": "{label} view",
  "{rating} · {n} değerlendirme": v => `${v.rating} · ${v.n} ${plural(v.n, "review", "reviews")}`,
  "%100 Hakiki {material}": "100% Genuine {material}",
  "Renk: {color}": "Colour: {color}",
  "Her parça, alanında 35 yıllık deneyime sahip ustalarımız tarafından tek tek elden geçirilir. Kullandıkça yumuşayan ve size özel bir patina kazanan hakiki deri, yıllar boyu yanınızda kalır.": "Every piece is checked by hand by our craftspeople, who bring 35 years of experience. Genuine leather softens with wear, develops a patina of its own and stays with you for years.",
  "El işçiliği ile üretim": "Made by hand",
  "Astarlı iç yüzey": "Lined interior",
  "Dayanıklı metal aksesuarlar": "Durable metal hardware",
  "Ölçüler santimetredir, ürün düz zeminde serilerek alınır.": "Measurements are in centimetres, taken with the garment laid flat.",
  "Merhaba, {name} hakkında bilgi almak istiyorum.": "Hello, I would like some information about {name}.",
  "Bedeninizden emin değil misiniz?": "Not sure about your size?",
  "Bize yazın": "Message us",
  "Lütfen bir beden seçin": "Please select a size",
  "{name} sepete eklendi": "{name} added to cart",
  "Favorilere eklendi": "Added to favourites",
  "Favorilerden çıkarıldı": "Removed from favourites",

  /* Değerlendirmeler */
  "{n} yıldız": v => `${v.n} ${plural(v.n, "star", "stars")}`,
  "{n} kullanıcı değerlendirmesi": v => `${v.n} customer ${plural(v.n, "review", "reviews")}`,
  "Değerlendirmeni güncelle": "Update your review",
  "Bu ürünü değerlendir": "Review this product",
  "Yorumun (isteğe bağlı)…": "Your comment (optional)…",
  "Güncelle": "Update",
  "Gönder": "Submit",
  "Puan ve yorum bırakmak için": "To leave a rating and comment, please",
  "giriş yapın": "sign in",
  "Henüz kullanıcı yorumu yok. İlk değerlendiren siz olun.": "No customer reviews yet. Be the first to write one.",
  "Puan vermek için giriş yapın": "Sign in to leave a rating",
  "Puan vermek için giriş yapın.": "Sign in to leave a rating.",
  "Lütfen yıldız seçin": "Please choose a star rating",
  "Değerlendirmeniz kaydedildi": "Your review has been saved",

  /* Görsel açıları */
  "Ön": "Front",
  "Arka": "Back",
  "Yan": "Side",
  "Detay": "Detail",

  /* Ölçü tablosu ve kalıp */
  "Göğüs": "Chest",
  "Omuz": "Shoulder",
  "Kol": "Sleeve",
  "Boy": "Length",
  "Bel": "Waist",
  "Kalça": "Hip",
  "İç boy": "Inseam",
  "Kalıbına uygun kesim. İki beden arasındaysanız büyük olanı seçin.": "True to size. If you are between sizes, choose the larger one.",
  "Rahat kesim. Altına kalın giyecekseniz bir beden büyük düşünebilirsiniz.": "Relaxed fit. If you plan to layer underneath, consider one size up.",
  "Vücudu saran kesim. Deri zamanla hafifçe esner.": "Body-hugging fit. The leather stretches slightly over time.",
  "Dar kesim, yüksek bel. Süet giydikçe vücuda oturur.": "Slim fit, high waist. The suede moulds to your body with wear.",
  "Vücudu saran kalem kesim. İki beden arasındaysanız büyük olanı seçin.": "Body-hugging pencil cut. If you are between sizes, choose the larger one.",
  "Dökümlü kesim. Beden aralığı geniştir.": "Draped cut with a generous size range.",

  /* Bakım */
  "Suyla silmeyin; tozu yumuşak süet fırçasıyla alın.": "Do not wipe with water; remove dust with a soft suede brush.",
  "Leke için bir deri uzmanına başvurun.": "For stains, consult a leather specialist.",
  "Geniş askıda, plastik torba dışında saklayın.": "Store on a wide hanger, out of plastic bags.",
  "Nemli olmayan yumuşak bezle silin.": "Wipe with a soft, dry cloth.",
  "Yılda bir iki kez deri kremiyle besleyin.": "Nourish with leather cream once or twice a year.",

  /* Malzeme, ton, etiket, tür */
  "Süet Deri": "Suede Leather",
  "Kuzu Derisi": "Lambskin",
  "Dana Derisi": "Calfskin",
  "Koyun Derisi": "Sheepskin",
  "Siyah": "Black",
  "Koyu Kahve": "Dark Brown",
  "Taba": "Tan",
  "Konyak": "Cognac",
  "Bordo": "Burgundy",
  "Vizon": "Mink",
  "Haki": "Khaki",
  "Zeytin": "Olive",
  "Antrasit": "Anthracite",
  "Lacivert": "Navy",
  "Buz Mavisi": "Ice Blue",
  "Lila": "Lilac",
  "Krem": "Cream",
  "Çok Satan": "Best Seller",
  "Öne Çıkan": "Featured",
  "İndirim": "Sale",
  "Ceket": "Jackets",
  "Palto & Parka": "Coats & Parkas",
  "Üst & Yelek": "Tops & Vests",
  "Pantolon": "Trousers",
  "Elbise": "Dresses",
  "Pelerin": "Capes",
  "Çanta": "Bags",
  "HAKİKİ DERİ": "GENUINE LEATHER",

  /* ---- Ürün adları ---- */
  "Konyak Süet Biker Ceket": "Cognac Suede Biker Jacket",
  "Bordo Deri Kruvaze Blazer": "Burgundy Leather Double-Breasted Blazer",
  "Püsküllü Siyah Biker Ceket": "Black Fringed Biker Jacket",
  "Yılan Desenli Deri Ceket": "Snake-Print Leather Jacket",
  "Taba Süet Blazer": "Tan Suede Blazer",
  "Zeytin Deri Parka": "Olive Leather Parka",
  "Siyah Örgü Deri Bomber": "Black Woven Leather Bomber",
  "Kahve Deri Pelerin": "Brown Leather Cape",
  "Bordo Parlak Deri Bomber": "Burgundy Glossy Leather Bomber",
  "Bordo Deri Parka": "Burgundy Leather Parka",
  "Konyak Süet Kargo Ceket": "Cognac Suede Cargo Jacket",
  "Vizon Süet Blazer": "Mink Suede Blazer",
  "Siyah Kemerli Crop Ceket": "Black Belted Cropped Jacket",
  "Siyah Deri Gömlek Ceket": "Black Leather Shirt Jacket",
  "Siyah Süet Crop Ceket": "Black Suede Cropped Jacket",
  "Büyük Yakalı Siyah Deri Ceket": "Black Leather Jacket with Oversized Collar",
  "Siyah Kruvaze Deri Palto": "Black Double-Breasted Leather Coat",
  "Siyah Püsküllü Uzun Ceket": "Black Fringed Long Jacket",
  "Krem Kroko Deri Elbise": "Cream Croc-Embossed Leather Dress",
  "Haki Süet Trençkot": "Khaki Suede Trench Coat",
  "Haki Süet Pantolon": "Khaki Suede Trousers",
  "Bordo Kemerli Deri Ceket": "Burgundy Belted Leather Jacket",
  "Antrasit Eskitme Kemerli Ceket": "Anthracite Distressed Belted Jacket",
  "Taba Süet Dik Yaka Ceket": "Tan Suede Stand-Collar Jacket",
  "Zeytin Süet Dik Yaka Ceket": "Olive Suede Stand-Collar Jacket",
  "Yeşil Süet Omuz Detaylı Ceket": "Green Suede Shoulder-Detail Jacket",
  "Koyu Kahve Süet Bel Vurgulu Ceket": "Dark Brown Suede Waist-Defining Jacket",
  "Siyah Deri V Yaka Üst": "Black Leather V-Neck Top",
  "Siyah Kapitone Deri Halter": "Black Quilted Leather Halter Top",
  "Lila Deri Büstiyer": "Lilac Leather Bustier",
  "Kahve Eskitme Deri Ceket": "Brown Distressed Leather Jacket",
  "Siyah Kroko Deri Bomber": "Black Croc-Embossed Leather Bomber",
  "Bordo Yakalı Siyah Bomber": "Black Bomber with Burgundy Collar",
  "Lacivert Deri Bomber": "Navy Leather Bomber",
  "Siyah Düz Deri Bomber": "Black Plain Leather Bomber",
  "Koyu Kahve Süet Fermuarlı Bomber": "Dark Brown Suede Zip Bomber",
  "Koyu Kahve Süet Dik Yaka Bomber": "Dark Brown Suede Stand-Collar Bomber",
  "Koyu Kahve Süet Yatık Yaka Bomber": "Dark Brown Suede Turn-Down Collar Bomber",
  "Haki Süet Düğmeli Bomber": "Khaki Suede Button-Up Bomber",
  "Buz Mavisi Süet Gömlek Ceket": "Ice Blue Suede Shirt Jacket",
  "Taba Süet Oversize Gömlek": "Tan Suede Oversized Shirt",
  "Taba Süet Düğmeli Ceket": "Tan Suede Button-Up Jacket",

  /* ---- Ürün açıklamaları ---- */
  "Asimetrik fermuarı ve altın rengi metal detaylarıyla kısa kesim süet biker. Yüksek belli parçalarla dengeli bir siluet oluşturur.": "A cropped suede biker with an asymmetric zip and gold-tone metal details. It creates a balanced silhouette with high-waisted pieces.",
  "Geniş yaka ve çift sıra düğmeli, rahat kalıp deri blazer. Ofisten akşam yemeğine aynı duruşu taşır.": "A relaxed leather blazer with wide lapels and a double row of buttons. It carries the same poise from the office to dinner.",
  "Krem biye detayları ve sırtından dökülen uzun püskülleriyle koleksiyonun en iddialı parçası.": "With cream piping and long fringe falling from the back, this is the boldest piece in the collection.",
  "Yılan baskılı parlak deri, süet yaka ve manşetlerle buluşuyor. Kontrast dokularıyla öne çıkan bir ceket.": "Glossy snake-print leather meets a suede collar and cuffs. A jacket that stands out through contrasting textures.",
  "İki düğmeli, kapaklı cepli klasik süet blazer. Yumuşak dokusuyla günlük kombinlere sıcaklık katar.": "A classic two-button suede blazer with flap pockets. Its soft texture brings warmth to everyday outfits.",
  "Taba süet yaka ve manşetli, beli büzgülü deri parka. Geniş körüklü cepleriyle şehirde pratik.": "A leather parka with a tan suede collar and cuffs and a drawstring waist. Its large bellows pockets make it practical in the city.",
  "El örgüsü görünümlü deri yüzeyi ve dik yakasıyla ayrışan bomber. Işıkla değişen zengin bir doku.": "A bomber set apart by its hand-woven-look leather surface and stand collar. A rich texture that shifts with the light.",
  "Dik yakalı, gizli patlı ve dökümlü kesim deri pelerin. Katmanlı kombinlerin üzerine zahmetsizce oturur.": "A draped leather cape with a stand collar and concealed placket. It sits effortlessly over layered outfits.",
  "Çıtçıtlı dik yaka, lastikli bel ve doğal kırışık dokulu parlak deri. Kullandıkça karakter kazanır.": "A snap-fastened stand collar, elasticated waist and glossy leather with a natural crinkle. It gains character with wear.",
  "Lacivert süet yaka ve manşetlerle tamamlanan, büzgülü belli deri parka.": "A leather parka with a drawstring waist, finished with a navy suede collar and cuffs.",
  "Körüklü büyük cepleri ve rahat kalıbıyla iş gücü esintili süet ceket.": "A workwear-inspired suede jacket with large bellows pockets and a relaxed fit.",
  "Sivri yaka ve belirgin omuz hattıyla yapılandırılmış süet blazer. Zarif, çok yönlü bir parça.": "A structured suede blazer with peak lapels and a defined shoulder line. An elegant, versatile piece.",
  "Apoletli omuz, geniş yaka ve bel kemeriyle trençkottan ilham alan kısa deri ceket.": "A short leather jacket inspired by the trench coat, with epaulettes, a wide collar and a waist belt.",
  "Çift göğüs cepli, vücudu saran gömlek kesimi. Örgü kol paneli hareket özgürlüğü sağlar.": "A body-hugging shirt cut with two chest pockets. The knit sleeve panel allows freedom of movement.",
  "Denim ceketin çizgilerini süetle yeniden yorumlayan kısa kesim bir tasarım.": "A cropped design that reinterprets the lines of a denim jacket in suede.",
  "Sırta dökülen pelerin yakası ve bol kollarıyla heykelsi bir siluet.": "A sculptural silhouette with a cape collar falling over the back and full sleeves.",
  "Beli oturan, boydan kruvaze deri palto. Ağırlığı ve dökümüyle gerçek bir yatırım parçası.": "A full-length, double-breasted leather coat fitted at the waist. Its weight and drape make it a true investment piece.",
  "Eteğinden dökülen uzun deri püsküllerle hareket eden, geniş omuzlu ceket.": "A broad-shouldered jacket that moves with the long leather fringe falling from its hem.",
  "Kroko baskılı deriden, dik yakalı ve vücudu saran kalem elbise.": "A body-hugging pencil dress with a stand collar, in croc-embossed leather.",
  "Çift sıra düğmeli, kemerli klasik trençkot; süetin yumuşak dokusuyla.": "A classic belted, double-breasted trench coat in soft-textured suede.",
  "Yüksek belli, dar paça süet pantolon. Esnek yapısıyla gün boyu konfor sunar.": "High-waisted, slim-leg suede trousers. Their flexible construction offers all-day comfort.",
  "İnce bel kemeri ve kalıplı omuzlarıyla parlak deri ceket.": "A glossy leather jacket with a slim waist belt and structured shoulders.",
  "Eskitme işlemli deri, geniş yaka ve apoletli omuzlar. Her parça kendine özgü bir patina taşır.": "Distressed leather, a wide collar and epaulettes. Every piece carries a patina of its own.",
  "Önü açık, dik yakalı ve kapak detaylı kısa süet ceket.": "A short, open-front suede jacket with a stand collar and flap details.",
  "Bel hattı dikişli, dik yakalı kısa süet ceket.": "A short suede jacket with a stand collar and a stitched waistline.",
  "Omuzlardan sırta inen V formlu katman detayıyla modern bir süet ceket.": "A modern suede jacket with a V-shaped layered detail running from the shoulders down the back.",
  "Vücudu saran dikişleri ve belirgin omuzlarıyla kadınsı bir süet ceket.": "A feminine suede jacket with body-shaping seams and defined shoulders.",
  "Sırtı fermuarlı, derin V yakalı kısa deri üst.": "A short leather top with a deep V-neck and a zip back.",
  "Boyun bağlamalı, göğsü kapitone işlemeli kısa deri üst.": "A short leather top with a neck tie and a quilted bust.",
  "İnce askılı, düz kesim deri büstiyer. Blazer altında ya da tek başına.": "A straight-cut leather bustier with thin straps. Wear it under a blazer or on its own.",
  "Kontrast dikişli, körüklü cepli eskitme deri ceket. Yıllar geçtikçe daha da güzelleşir.": "A distressed leather jacket with contrast stitching and bellows pockets. It only grows more beautiful with the years.",
  "İnce kroko baskılı deri, dik yaka ve lastikli bel.": "Fine croc-embossed leather, a stand collar and an elasticated waist.",
  "Siyah deri gövdeyi bordo süet yaka ve manşetlerle buluşturan kontrast bomber.": "A contrast bomber pairing a black leather body with a burgundy suede collar and cuffs.",
  "Yakasız, çift sıra düğmeli ve apoletli yumuşak deri bomber.": "A soft, collarless leather bomber with a double row of buttons and epaulettes.",
  "Dik yakalı, lastikli belli sade bomber. Şehir hayatının rahat ama sofistike seçeneği.": "A simple bomber with a stand collar and elasticated waist. A relaxed yet sophisticated choice for city life.",
  "Altın rengi fermuarları ve omuz detaylarıyla süet bomber.": "A suede bomber with gold-tone zips and shoulder details.",
  "Lacivert astarlı dik yaka ve lastikli bel. Her mevsimin süet bomberı.": "A navy-lined stand collar and an elasticated waist. The suede bomber for every season.",
  "Klasik yatık yaka, dikey fermuarlı cepler ve dokulu bel bandı.": "A classic turn-down collar, vertical zip pockets and a textured waistband.",
  "Çift göğüs cepli, metal düğmeli ve lastikli belli rahat süet ceket.": "A relaxed suede jacket with two chest pockets, metal buttons and an elasticated waist.",
  "Açık tonuyla sıra dışı, çıtçıtlı süet gömlek ceket.": "A snap-fastened suede shirt jacket, unusual in its pale shade.",
  "Tek cepli, gizli düğmeli ve salaş kalıp süet gömlek.": "A loose-fit suede shirt with a single pocket and concealed buttons.",
  "Dört düğmeli, büyük kare cepli rahat süet ceket.": "A relaxed four-button suede jacket with large square pockets.",

  /* ---- Sepet ---- */
  "Sepetim": "My Cart",
  "Seçtiğiniz parçalar bir tık uzağınızda.": "The pieces you chose are just a click away.",
  "Sepetiniz boş": "Your cart is empty",
  "Henüz bir ürün eklemediniz. Koleksiyonu keşfedin.": "You have not added anything yet. Discover the collection.",
  "Sipariş Özeti": "Order Summary",
  "İndirim kodu": "Discount code",
  "Uygula": "Apply",
  "Kod uygulandı (demo)": "Code applied (demo)",
  "Ödemeye Geç": "Proceed to Checkout",
  "Alışverişe Devam Et": "Continue Shopping",
  "Renk: {color} · Beden: {size}": "Colour: {color} · Size: {size}",
  "Azalt": "Decrease",
  "Adet": "Quantity",
  "Arttır": "Increase",
  "Kaldır": "Remove",
  "Ara Toplam": "Subtotal",
  "Kargo": "Shipping",
  "Ücretsiz": "Free",
  "Toplam": "Total",
  "Ücretsiz ve sigortalı kargo": "Free and insured shipping",

  /* ---- Ödeme ---- */
  "Ödeme": "Checkout",
  "Güvenli ödeme — 256-bit SSL ile korunmaktadır.": "Secure payment, protected with 256-bit SSL.",
  "İletişim Bilgileri": "Contact Details",
  "E-posta": "Email",
  "ornek@eposta.com": "name@example.com",
  "Ad": "First Name",
  "Adınız": "First name",
  "Soyad": "Last Name",
  "Soyadınız": "Last name",
  "Telefon": "Phone",
  "(yalnızca kargo bilgilendirmesi için)": "(for delivery updates only)",
  "Teslimat Adresi": "Delivery Address",
  "Adres": "Address",
  "Mahalle, cadde, sokak, no": "Street, number, neighbourhood",
  "Şehir": "City",
  "İstanbul": "Istanbul",
  "İlçe": "District",
  "Posta Kodu": "Postal Code",
  "(isteğe bağlı)": "(optional)",
  "Ülke": "Country",
  "Kıbrıs": "Cyprus",
  "Ödeme Yöntemi": "Payment Method",
  "Kredi / Banka Kartı": "Credit / Debit Card",
  "Kart Numarası": "Card Number",
  "Son Kullanma": "Expiry Date",
  "AA/YY": "MM/YY",
  "Havale / EFT": "Bank Transfer",
  "Kapıda Ödeme": "Cash on Delivery",
  "Bu bir demo mağazasıdır. Gerçek bir ödeme alınmaz; kart bilgileriniz hiçbir yere gönderilmez.": "This is a demo store. No real payment is taken and your card details are not sent anywhere.",
  "Siparişiniz": "Your Order",
  "Siparişi Tamamla": "Place Order",
  "Sepete Dön": "Back to Cart",
  "Siparişi tamamlayarak": "By placing your order you accept the",
  "satış sözleşmesini": "sales agreement",
  "kabul etmiş olursunuz.": "in full.",
  "{color} · {size} · {n} adet": "{color} · {size} · Qty {n}",
  "Siparişiniz Alındı": "Your Order Has Been Received",
  "Sipariş numaranız:": "Your order number:",
  "Teşekkürler! Sipariş onayınız e-posta adresinize gönderildi.": "Thank you! Your order confirmation has been sent to your email address.",
  "Bu bir demo mağazasıdır — gerçek bir ödeme alınmamıştır.": "This is a demo store; no real payment has been taken.",
  "Siparişlerim": "My Orders",
  "Siparişi Takip Et": "Track Order",

  /* ---- Hesap ---- */
  "Tekrar Hoş Geldiniz": "Welcome Back",
  "Hesap Oluştur": "Create Account",
  "Hesabınıza giriş yapın": "Sign in to your account",
  "Birkaç saniyede üye olun": "Sign up in seconds",
  "Kayıt Ol": "Sign Up",
  "Google ile devam et": "Continue with Google",
  "Apple ile devam et": "Continue with Apple",
  "veya e-posta ile": "or with email",
  "Ad Soyad": "Full Name",
  "Adınız Soyadınız": "Your full name",
  "Şifre": "Password",
  "Demo mağaza — Google/Apple girişi simülasyondur ve tüm veriler yalnızca bu tarayıcıda saklanır.": "Demo store: Google/Apple sign-in is simulated and all data is stored only in this browser.",
  "Giriş başarısız": "Sign-in failed",
  "{provider} ile giriş yapıldı (demo)": "Signed in with {provider} (demo)",
  "Geçerli bir e-posta girin.": "Enter a valid email address.",
  "Şifre en az 4 karakter olmalı.": "Password must be at least 4 characters.",
  "Bu e-posta zaten kayıtlı. Giriş yapın.": "This email is already registered. Please sign in.",
  "Bu e-posta ile kayıt bulunamadı.": "No account found with this email.",
  "Şifre hatalı.": "Incorrect password.",
  "Profilim": "My Profile",
  "Sipariş Takibi": "Order Tracking",
  "Merhaba, {name}": "Hello, {name}",
  "Çıkış Yap": "Sign Out",
  "Çıkış yapıldı": "Signed out",
  "Profil Bilgileri": "Profile Details",
  "Teslimat adresiniz": "Your delivery address",
  "Kaydet": "Save",
  "Üyelik türü: {type} · Katılım: {date}": "Account type: {type} · Joined: {date}",
  "Profil güncellendi": "Profile updated",
  "Favorilerim ({n})": "My Favourites ({n})",
  "Favori listeniz boş": "Your favourites list is empty",
  "Beğendiğiniz ürünlerdeki kalbe dokunun, burada toplansın.": "Tap the heart on the products you like to collect them here.",
  "Ürünleri Keşfet": "Explore Products",
  "Siparişlerim ({n})": "My Orders ({n})",
  "Henüz siparişiniz yok": "You have no orders yet",
  "İlk siparişinizi vermek için koleksiyonu keşfedin.": "Discover the collection to place your first order.",
  "+{n} ürün": "+{n} more",
  "Takip Et": "Track",
  "Sipariş numaranızı girerek kargonuzun durumunu görüntüleyin.": "Enter your order number to see the status of your delivery.",
  "Örn: 35-A1B2C3": "E.g. 35-A1B2C3",
  "Sorgula": "Look Up",
  "«{no}» numaralı sipariş bulunamadı.": "Order «{no}» could not be found.",
  "Sipariş Alındı": "Order Received",
  "Hazırlanıyor": "Being Prepared",
  "Kargoya Verildi": "Shipped",
  "Dağıtımda": "Out for Delivery",
  "Teslim Edildi": "Delivered",
} };

/* Düz metin: sözlükte yoksa olduğu gibi döner */
function tx(s) {
  const d = DICT[LANG];
  if (!d) return s;
  const v = d[s];
  return typeof v === "string" ? v : s;
}
/* Değişkenli metin: txf("{n} ürün bulundu", { n: 3 }) */
function txf(s, vars) {
  const d = DICT[LANG];
  const v = d ? d[s] : undefined;
  if (typeof v === "function") return v(vars);
  return (typeof v === "string" ? v : s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}
function currentLocale() { return LANGS[LANG].locale; }
function setLang(code) {
  if (!LANGS[code] || code === LANG) return;
  try { localStorage.setItem(LANG_KEY, code); } catch (e) { return; }
  location.reload();
}

/* Sayfadaki metni ve erişilebilirlik özniteliklerini sözlükten çevirir */
if (DICT[LANG]) {
  document.documentElement.lang = LANG;
  const ATTRS = ["placeholder", "aria-label", "title", "alt"];
  const lookup = s => {
    const v = DICT[LANG][s.trim().replace(/\s+/g, " ")];
    return typeof v === "string" ? v : null;
  };
  const translateText = node => {
    const parent = node.parentNode;
    if (!parent || /^(SCRIPT|STYLE|TEXTAREA)$/.test(parent.nodeName)) return;
    const raw = node.nodeValue;
    if (!raw.trim()) return;
    const v = lookup(raw);
    if (v !== null) node.nodeValue = raw.replace(raw.trim(), () => v);
  };
  const translateAttr = (el, name) => {
    const cur = el.getAttribute(name);
    if (!cur) return;
    const v = lookup(cur);
    if (v !== null) el.setAttribute(name, v);
  };
  const translateEl = el => {
    ATTRS.forEach(a => translateAttr(el, a));
    if (el.nodeName === "META" && el.getAttribute("name") === "description") translateAttr(el, "content");
  };
  const translateTree = root => {
    if (root.nodeType === 3) { translateText(root); return; }
    if (root.nodeType !== 1) return;
    translateEl(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) { if (n.nodeType === 3) translateText(n); else translateEl(n); }
  };
  new MutationObserver(records => {
    records.forEach(r => {
      if (r.type === "attributes") translateAttr(r.target, r.attributeName);
      else r.addedNodes.forEach(translateTree);
    });
  }).observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ATTRS });
}
