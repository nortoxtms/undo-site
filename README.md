# UNDO — Leather Atelier — Storefront

A modern, luxury-minimal e-commerce storefront for a leather **jackets & apparel** brand
(warm cream, near-black slim header, high-contrast serif headlines, Turkish copy).
Fully static and self-contained — **no build step, no backend, no dependencies**.
All state (cart, account, favorites, reviews, orders) is stored in the browser via
`localStorage`. Just open `index.html`, or serve the folder.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, feature strip, brand story (video slot), categories, featured products, newsletter |
| `shop.html` | Product listing with category / colour / material / price filters + sorting |
| `product.html` | Product detail — gallery, colour & size selectors, add-to-cart / buy-now, **wishlist**, **reviews**, tabs, related |
| `cart.html` | Shopping cart with live quantity + totals |
| `checkout.html` | Checkout form, order summary, saves the order to the account |
| `account.html` | **Login / register** (e-mail + demo Google/Apple), profile, favorites, order history, order tracking |
| `about.html` | Brand story / Hakkımızda |
| `admin.html` | Product-management dashboard (demo) |

Cart, favorites and orders persist across pages (saved in the browser).

## How to run
Double-click `index.html`, **or** for the cleanest experience serve the folder:
```bash
cd leather-shop
python -m http.server 8000   # then open http://localhost:8000
```

## Deploy (no domain needed)
Static site — works as-is on any static host, each giving a free subdomain:
- **Netlify Drop** — drag the folder onto <https://app.netlify.com/drop>
- **Vercel** — `npx vercel`
- **Cloudflare Pages** / **GitHub Pages**

## Making it yours
- **Brand name** — "UNDO" lives in `js/app.js` (`renderHeader` / `renderFooter`) and page `<title>`s.
- **Products** — all in `js/products.js` (`PRODUCTS`), or manage visually via `admin.html`.
- **Photos** — brand imagery lives in `assets/` (`hero.webp`, `story.webp`, `cat-*.webp`, `footer.webp`).
  Product photos are transparent cut-outs in `assets/products/<id>-<on|arka|yan|detay1>.webp`, listed per product in `js/products.js` (`views`). Names, prices and ratings are mock data.
- **Story video** — the homepage story section has a left-side video slot; drop a `<video>` in
  the marked spot in `index.html`.
- **Colours & fonts** — CSS variables at the top of `css/style.css` (`:root`).

## Notes
- Demo project: Google/Apple sign-in and payments are **simulated** — no accounts are verified
  and no real transactions occur.
- Copy is in Turkish; prices in Turkish Lira (₺). Only Google Fonts is loaded remotely.
