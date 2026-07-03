# BenzolPro

A high-converting, modern Dutch e-commerce webshop for **Benzol Lubricants** engine oils (0W20, 0W30, 5W30, 5W40, 10W40, 10W60, 15W40).

Futuristic, premium feel in a **black + gold** palette with subtle azure-blue accents, built to let even the laziest visitor order the right oil in seconds — and to serve garages with bulk pricing and quotes.

> **Note:** This is a functional demo/prototype. Payments are simulated (no real charge is made). License-plate data is fetched live from the official RDW Open Data API. Uploaded certificates and quote requests are demo-only (see notes below).

## ✨ Features

- **🚗 License-plate check (RDW):** Enter a Dutch number plate on a realistic license-plate input and instantly get the recommended Benzol oil for your car, via the official [RDW Open Data API](https://opendata.rdw.nl/) plus an explainable recommendation heuristic.
- **⭐ Bestseller spotlight:** The best-selling product sits front and center on the homepage, right beside the plate checker.
- **📦 Bundle deals:** Curated multi-product packs with always-free shipping, on the homepage and their own `/bundels` page. Every product also links to matching bundles.
- **🛢️ Bulk sizes for garages:** Every product is available in 1L, 5L, 20L, 60L and 208L (drum), with tiered per-litre discounts.
- **🔧 Customer / Garage mode:** A header toggle switches the whole shop between consumer and garage pricing (extra volume discounts).
- **📋 Garage quote page (`/offerte`):** A form for garages to request tailored bulk pricing.
- **📜 Certificates page (`/certificaten`):** Official ACEA/API/OEM certificates, plus a demo file-upload area.
- **💬 Chat widget:** A floating assistant that answers common questions (shipping, payment, garages, returns, …) client-side.
- **🌌 Parallax background:** A scroll-driven, gold/azure animated background on the homepage — supports an optional custom photo (see below).
- **⚡ Ultra-fast checkout:** Express Apple Pay / iDEAL buttons, quick-buy everywhere, minimal-field checkout.
- **🔎 Smart filtering:** Instant search plus one-tap filters on viscosity, oil type and sorting.
- **📱 Fully responsive**, Dutch-only copy (the underlying i18n system can be re-enabled later).
- **🛒 Persistent cart** with free-shipping progress and localStorage persistence.
- **🎨 Zero image assets by default:** Product visuals are generated SVG bottles; drop in real photos any time (see below).

## 🧱 Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for the design system
- A server-side API route (`/api/rdw`) that safely proxies the RDW Open Data API
- No heavy dependencies — chat, uploads and parallax are all plain React/CSS

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

## 🖼️ Eigen productfoto's toevoegen

Elk product in `lib/products.ts` heeft al een `images`-veld (een lijst) dat naar `/products/<slug>.jpg` wijst. Zet gewoon een foto met exact die bestandsnaam in `public/products/` — geen code aanpassen nodig:

```ts
images: ["/products/benzol-prime-5w30.jpg"],
```

Zonder een geldig bestand (of als het pad niet klopt) valt de site automatisch terug op de gegenereerde flesillustratie — er verschijnt nooit een kapot plaatje.

### 📸 Meerdere hoeken tonen (foto-galerij met pijlknoppen)

Voeg gewoon extra bestandsnamen toe aan dezelfde lijst:

```ts
images: [
  "/products/benzol-prime-5w30.jpg",
  "/products/benzol-prime-5w30-achterkant.jpg",
  "/products/benzol-prime-5w30-zijkant.jpg",
],
```

Zodra een product 2 of meer foto's heeft, toont de productpagina automatisch een galerij: grote, duidelijk zichtbare pijlknoppen (links/rechts) om te wisselen, een klikbare miniaturenstrip om direct een hoek te kiezen, en ondersteuning voor pijltjestoetsen en swipen op mobiel (`components/ProductGallery.tsx`). Bij 1 foto verschijnt gewoon die ene foto zonder pijlen.

Werkt het pad niet? De code accepteert zowel `images: ["..."]` (een lijst) als een los `image: "..."` veld — welke vorm je ook gebruikt, hij wordt herkend. Zie ook `public/products/LEES-MIJ.txt`.

### 📦 Foto's voor bundeldeals

Elke bundel in `lib/bundles.ts` heeft ook een `images`-veld, met dezelfde padconventie maar in de submap `public/products/bundles/`:

```ts
images: ["/products/bundles/verversbeurt-compleet.jpg"],
```

| Bundel | Bestandsnaam |
| --- | --- |
| Verversbeurt Compleet | `verversbeurt-compleet.jpg` |
| Winter Ready Pakket | `winter-ready.jpg` |
| Garage Bulk 3×5L | `garage-bulk-synth.jpg` |
| Performance Pakket | `performance-pack.jpg` |

Zonder eigen bundelfoto vallen de bundelfoto's automatisch terug op de foto's van de losse producten die erin zitten. Zie ook `public/products/bundles/LEES-MIJ.txt`.

### 🛍️ Bundeldeal direct op de productpagina bekijken

Op elke productpagina (bijv. Benzol Prime 5W30) staat, direct naast de inhoud-/hoeveelheidsknoppen, een opvallende blauwe **bundeldeal-knop** wanneer dat product in een bundel zit. Een klik erop navigeert nergens heen — de foto's, prijs, inhoud en "In winkelwagen"-knop op diezelfde pagina veranderen direct naar die van de bundel. Zit een product in meerdere bundels, dan verschijnen er meerdere keuzeknoppen. Nogmaals klikken (of "Terug naar los product") zet alles terug.

## 🌌 Achtergrondafbeelding toevoegen (parallax)

De homepage-achtergrond (`components/ParallaxBackground.tsx`) ondersteunt een eigen foto:

1. Zet een brede afbeelding (1920×1080px of groter) in `public/` met de naam `hero-bg.jpg`.
2. Klaar — de achtergrond gebruikt deze foto automatisch, met een donkere overlay en parallax-effect. Zonder dit bestand blijft de huidige goud/blauwe gloed-animatie zichtbaar.

Zie ook `public/LEES-MIJ.txt`.

## 🗂️ Project structure

```
app/
  layout.tsx                 # root layout, providers, header/footer/cart/chat
  page.tsx                   # homepage (hero+plate+bestseller → bundles → products → USPs → garages → FAQ)
  products/page.tsx          # shop with search & filters
  product/[slug]/page.tsx    # product detail (related products beside, not below)
  bundels/                   # standalone bundle deals page
  certificaten/              # official certs + demo upload
  offerte/                   # garage quote request form
  checkout/                  # checkout + order confirmation
  api/rdw/route.ts           # RDW proxy + oil recommendation
components/                  # UI (Header, PlateLookup, ProductCard, ChatWidget, …)
lib/
  products.ts                # sample Benzol catalog (bulk sizes, optional images)
  bundles.ts                 # bundle deal definitions
  rdw.ts                     # plate normalization + recommendation heuristic
  cart.tsx / audience.tsx    # cart + customer/garage pricing context
  format.ts                  # currency & tiered bulk pricing
  i18n/                      # dictionaries (nl is active; en/pl/ar/tr kept for future use)
public/
  products/                  # drop product photos here
  hero-bg.jpg                # optional homepage background photo (not included)
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

## ⚠️ Demo-only limitations

This is a front-end prototype with no backend/database, so a few features are intentionally simulated:

- **Certificates upload** (`/certificaten`): files are only held in browser memory for the session (via `URL.createObjectURL`) and are never sent anywhere. For real persistence, add a backend + storage (Supabase Storage, S3, …).
- **Quote requests** (`/offerte`) and **checkout**: submissions show a success state but nothing is actually sent or charged. Wire up a real backend/email service and payment provider (Mollie/Stripe) to go live.
- **Chat widget**: a small client-side keyword matcher, not a real AI/agent.

## 🔜 Production checklist (next steps)

- Wire real payments (Mollie for iDEAL / Apple Pay, or Stripe)
- Add a backend for quote requests, certificate uploads and order storage
- Connect a real product catalog / CMS and inventory
- Add accounts, order history and transactional emails

---

**Design & vibe:** futuristic, premium — black `#0a0a0b` + gold `#e7b53c`, with azure `#4da6ff` accents.
