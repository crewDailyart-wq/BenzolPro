# BenzolPro

A high-converting, modern Dutch e-commerce webshop for **Benzol Lubricants** engine oils (0W20, 0W30, 5W30, 5W40, 10W40, 10W60, 15W40).

Futuristic, premium feel in a strict **black + neon-yellow** palette, built to let even the laziest visitor order the right oil in seconds.

> **Note:** This is a functional demo/prototype. Payments are simulated (no real charge is made). License-plate data is fetched live from the official RDW Open Data API.

## ✨ Features

- **🚗 License-plate check (RDW):** Enter a Dutch number plate on the homepage and instantly get the recommended Benzol oil for your car. Powered live by the official [RDW Open Data API](https://opendata.rdw.nl/) (vehicle + fuel datasets) combined with an explainable recommendation heuristic based on fuel type and age.
- **⚡ Ultra-fast checkout:** Express Apple Pay / iDEAL buttons, quick-buy on every product card, and a minimal-field checkout so an order takes seconds.
- **🔎 Smart filtering:** Instant search plus one-tap filters on viscosity (5W30, 5W40, …), oil type and sorting — no page reloads.
- **🌍 5 languages:** Dutch (default), English, Polish, Arabic and Turkish, switchable anywhere. Full **RTL** support for Arabic. Preference is remembered.
- **📱 Fully responsive:** Designed mobile-first, from small phone screens up to large desktops.
- **🛒 Persistent cart:** Slide-out cart with free-shipping progress, quantities and localStorage persistence.
- **🎨 Zero image assets:** Product visuals are rendered as crisp SVG oil bottles, so the shop stays fast and fully self-contained.

## 🧱 Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for the design system
- A server-side API route (`/api/rdw`) that safely proxies the RDW Open Data API
- Lightweight custom i18n (React context + dictionaries), no heavy dependencies

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # run the production build
npm run lint     # lint
```

## 🗂️ Project structure

```
app/
  layout.tsx              # root layout, providers, header/footer/cart
  page.tsx                # homepage (hero + plate check + featured + USPs)
  products/page.tsx       # shop with search & filters
  product/[slug]/page.tsx # product detail
  checkout/               # checkout + order confirmation
  api/rdw/route.ts        # RDW proxy + oil recommendation
components/               # UI (Header, PlateLookup, ProductCard, Checkout, …)
lib/
  products.ts             # sample Benzol catalog
  rdw.ts                  # plate normalization + recommendation heuristic
  cart.tsx                # cart context (persisted)
  format.ts               # currency & pricing helpers
  i18n/                   # config, dictionaries (nl/en/pl/ar/tr), provider
```

## 🔧 How the oil recommendation works

The RDW API returns vehicle details (make, model, year, fuel) but **not** a recommended oil. `lib/rdw.ts` maps those facts to a sensible viscosity, e.g.:

| Vehicle | Recommendation |
| --- | --- |
| Modern diesel (≥ 2011, DPF) | 5W30 low-SAPS |
| Older diesel | 5W40 |
| Very modern petrol (≥ 2018) | 0W30 |
| Modern petrol (≥ 2010) | 5W30 |
| Petrol 2000–2009 | 5W40 |
| Older petrol (< 2000) | 10W40 |
| Fully electric | No engine oil needed |

The chosen viscosity is then matched to the best product in the catalog. Recommendations are advisory — always cross-check the owner's manual.

## 🔜 Production checklist (next steps)

- Wire real payments (Mollie for iDEAL / Apple Pay, or Stripe)
- Connect a real product catalog / CMS and inventory
- Add accounts, order history and transactional emails
- Persist orders in a database

---

**Design & vibe:** futuristic, premium, minimalistic — black `#0a0a0b` + neon yellow `#d7ff00`.
