# 🎮 GameHub - Premium Game Store

GameHub is a beautifully crafted, accessible, and high-performance video game store built with **Next.js 14 App Router**, **React 18**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Contentful**. It showcases modern frontend patterns, SSR/CSR strategies, advanced accessibility, and a responsive design inspired by platforms like RAWG.io.

🛠️ I built this entire app in just **4 days**, implementing complex features such as localization, authentication, analytics, and chart visualizations.

📚 For a full technical breakdown, [check the technical details →](./tech-details.md)

Deployed at 👉 [https://gamehub.marwan-mostafa.com](https://gamehub.marwan-mostafa.com)

---

## 🚀 Key Features

* 🔍 Browse and filter games using **RAWG.io API**
* 📦 Add to cart with global **Zustand** state
* 🧾 Checkout page with mock payment and accessibility support
* 🔐 Email-based Auth Flow with token verification and JWTs
* 🌐 Internationalized Content with **Contentful CMS** (EN + DE)
* 📊 Analytics via **Google Tag Manager** and **GA4**
* 🧠 Data caching and pagination using **React Query v5**
* 🧑‍🦽 Live regions + ARIA roles for screen reader support
* ⚙️ SEO-friendly with metadata and i18n routing
* 🧱 Modular folder structure using **Next.js layouts**
* 🪄 Animated feedback with **Sonner** toasts
* 📈 Fully customizable chart components (Bar, Pie)
* 🧪 Sentry + error boundaries + global error listeners

---

## 🧠 Tech Stack

| Tech           | Purpose                            |
| -------------- | ---------------------------------- |
| Next.js 14     | Fullstack React Framework          |
| React 18       | UI Library                         |
| TypeScript     | Type Safety                        |
| Tailwind CSS   | Utility-first Styling              |
| Zustand        | Lightweight Global State (Cart)    |
| Contentful CMS | Headless CMS (EN & DE support)     |
| React Query v5 | Data fetching, caching, pagination |
| RAWG API       | External Game Data                 |
| Sonner         | Toast Notifications                |

---

## 🌍 Internationalization with Contentful CMS

* Content for the homepage is fetched via Contentful's localized entries (`en` / `de`)
* Structured entries include: `heroTitle`, `heroSubtitle`, `ctaLabel`, `ogImage`, etc.
* Queried by locale and dynamically injected into the Next.js layout

```ts
const { items } = await contentfulClient.getEntries<HomepageSkeleton>({
  content_type: 'homepage',
  locale: 'en',
});
```

---

## 📦 Cart and Checkout Flow

* Managed via Zustand store
* Cart supports increment, decrement, and removal
* Checkout page includes a **mock payment form**
* Accessible with form validation and ARIA support

---

## 🔐 Auth Flow (No Supabase!)

* Sign up stores users in a database with `verified = false`
* Sends email verification link using **Resend**
* Verifies via token and updates user status
* JWT-based session stored in **HTTP-only cookies**

```ts
// signup handler logic
bcrypt(password)
store in DB
send email with token
```

---

## 📊 GTM + GA4 Analytics

Every major action tracked with **Google Tag Manager**:

| Event Name         | Trigger                       |
| ------------------ | ----------------------------- |
| `signup_attempt`   | When user submits signup form |
| `login_success`    | When login is successful      |
| `game_viewed`      | On viewing game detail        |
| `add_to_cart`      | On add to cart                |
| `checkout_attempt` | On submitting checkout form   |

Includes `timeOfDay` param (`morning` / `afternoon` / `night`) for extra insights.

Consent is respected and saved via `localStorage`. GTM script loads **only after user consents**.

---

## 📊 Reusable Charts

### ✅ BarChartComponent

* Strongly typed generic chart
* High contrast color fallback
* Auto multiline x-axis labels
* Props validated strictly

### ✅ PieChartComponent

* Strongly typed numeric key constraint
* Custom colors + automatic fallback
* Biggest/smallest slice coloring
* Customizable tooltips

---

## ⚡ Performance Enhancements

* Route transitions show loading toast if slow (via `AppLink`)
* Lazy loading of pages/components
* Uses Next.js 14 App Router for server components and streaming

---

## 🧱 Project Structure

```
app/
├── (auth)/              # Auth routes (login, signup, verify)
├── games/               # Game list and game detail
├── cart/                # Cart view
├── checkout/            # Checkout flow
├── components/          # Reusable UI elements
├── lib/                 # API clients, helpers
├── types/               # Global TS types
├── layout.tsx           # Root layout
├── page.tsx             # Homepage
```

---

## 🔒 Error Handling

* Uses `react-error-boundary` for UI error fallback
* Global `window.onerror` + `onunhandledrejection` listener
* All tracked via **Sentry** with sourcemaps and breadcrumb context

---

## 🧭 i18n Routing Strategy

* Root URL `/` redirects to `/en-US` via **Next Middleware**
* `[locale]` segment wraps all routes: `/en-US/games`, `/de/games`
* `AppLink` wrapper automatically prepends locale

---

## ✅ What’s Next

* Add end-to-end testing via **Playwright**
* Unit test coverage for store, helpers, and critical pages
* Automated accessibility testing (e.g. axe-core integration)

---

## 📎 Live Demo

👉 [https://gamehub.marwan-mostafa.com](https://gamehub.marwan-mostafa.com)
