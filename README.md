# 🎮 GameHub - Premium Game Store

GameHub is a beautifully crafted, accessible, and high-performance video game store built with **Next.js 14 App Router**, **React 18**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Supabase**. It showcases modern frontend patterns, SSR/CSR strategies, advanced accessibility, and a responsive design inspired by platforms like RAWG.io.

## 🚀 Features

- 🔍 Browse and filter games by platform (RAWG API)
- 📦 Add to cart with global Zustand store
- 🧾 Checkout with mock payment form and accessibility support
- 🔒 Auth with Supabase (Sign up, Login, Logout)
- 🧠 React Query v5 for data caching and pagination
- 🧑‍🦽 ARIA attributes and live regions for screen reader support
- 🌙 Dark theme with polished UI using Tailwind CSS
- 🧰 SEO-ready with dynamic metadata
- 🧱 Modular folder structure using Next.js layouts

---

## 🧠 Tech Stack

| Tech                  | Purpose                                 |
|-----------------------|-----------------------------------------|
| Next.js 14            | Fullstack React Framework               |
| React 18              | UI Library                              |
| TypeScript            | Type Safety                             |
| Tailwind CSS          | Utility-first Styling                   |
| Zustand               | Lightweight Global State (Cart)         |
| Supabase              | Auth + Future DB integrations           |
| React Query v5        | Data fetching, caching, pagination      |
| RAWG Video Games API  | External Game Data                      |
| Sonner                | Toast Notifications                     |

---

## 🧩 Contentful Headless CMS Integration (EN + DE)

This project uses [Contentful](https://www.contentful.com/) as a headless CMS to manage homepage content in multiple languages — specifically English (`en`) and German (`de`).

### ✅ Structure

- Each homepage entry in Contentful has fields like:
  - `heroTitle`, `heroSubtitle`, `ctaLabel`, `ctaLink`, `ogImage`, etc.
- Content is localized via Contentful’s built-in localization system.
- Each locale (`en`, `de`) has its own translated entry in Contentful.
- Content is queried using locale-aware API requests:
- you can checkout the home page at app\[locale]\page.tsx
  
```ts
const { items } = await contentfulClient.getEntries<HomepageSkeleton>({
  content_type: 'homepage',
  locale: 'en', // or 'de'
});

---
## 🧪 Project Structure

app/
├── (auth)/ # Auth routes (login/signup)
├── games/ # Game list and detail pages
├── cart/ # Cart page (client)
├── checkout/ # Checkout page (client)
├── components/ # Shared UI components
├── lib/ # Supabase, RAWG, utils
├── stores/ # Zustand global store
├── types/ # App-wide TypeScript types
├── layout.tsx # Root layout w/ navbar + footer
├── page.tsx # Homepage
public/
styles/


## 🛠 Setup & Run

- git clone https://github.com/your-username/gamehub.git
- cd gamehub
- npm install
- npm run dev

## ⚙️ Environment Variable Setup

Ensure the following `.env` values are configured correctly for both local and production environments:

```env
# App base URLs
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# RAWG.io Game API Key
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Database
DATABASE_URL=your_neon_db_connection_url

# JWT Secret for signing login tokens
JWT_SECRET=your_super_secret_key

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_verified_email@example.com

## 📊 Google Tag Manager (GTM) Events

This project integrates **Google Tag Manager** and **GA4** to track key user interactions for analytics and optimization.

### ✅ GTM Events Tracked

| Event Name            | Category      | When It Fires                                    | Some Parameters                                    |
|-----------------------|---------------|--------------------------------------------------|----------------------------------------------------|
| `signup_attempt`      | `auth`             | When a user attempts to sign up             | `timeOfDay`, `reason?`                             |
| `signup_success`      | `auth`             | When signup is successful                   | `timeOfDay`, `userId?`                             |
| `signup_failed`       | `auth`             | When signup fails                           | `timeOfDay`, `reason`                              |
| `login_attempt`       | `auth`             | When a user attempts to log in              | `timeOfDay`, `reason?`                             |
| `login_success`       | `auth`             | When login is successful                    | `timeOfDay`, `userId?`                             |
| `login_failed`        | `auth`             | When login fails                            | `timeOfDay`, `reason`                              |
| `game_viewed`         | `engagement`       | When a game detail page is viewed           | `productName`, `value`, `timeOfDay`                |
| `add_to_cart`         | `ecommerce`        | When a game is added to the cart            | `productName`, `value`, `timeOfDay`                |
| `remove_from_cart`    | `ecommerce`        | When a game is removed from the cart        | `productName`, `value`, `timeOfDay`                |
| `cart_increment`      | `ecommerce`        | When an item quantity is increased          | `productName`, `cartCount`, `timeOfDay`            |
| `cart_decrement`      | `ecommerce`        | When an item quantity is decreased          | `productName`, `cartCount`, `timeOfDay`            |
| `checkout_attempt`    | `ecommerce`        | When a user submits the payment form        | `cartValue`, `productNames`, `timeOfDay`           |
| `checkout_success`    | `ecommerce`        | When a mock payment succeeds                | `cartValue`, `productNames`, `timeOfDay`           |
| `checkout_failed`     | `ecommerce`        | When a mock payment fails                   | `cartValue`, `productNames`, `timeOfDay`, `reason` |

---

### 🕒 `timeOfDay` Utility

Each event includes a `timeOfDay` parameter automatically (`morning`, `afternoon`, or `night`) based on the user’s local time, using the `getTimeOfDay()` utility.

---

### 📦 `trackEvent` Utility

Events are pushed using a global utility:

```ts
export const trackEvent = (params: TrackEventParams) => {
  if (!window?.dataLayer) return;

  const baseData = {
    event: params.event,
    event_category: params.category,
    timeOfDay: getTimeOfDay(),
    event_label: params.label,
    value: params.value,
    product_name: params.productName,
    reason: params.reason,
    ...params, // Add additional dynamic fields
  };

  const cleanedData = Object.fromEntries(
    Object.entries(baseData).filter(([_, value]) => value !== undefined)
  );

  window.dataLayer.push(cleanedData);
};


## 🛡️ Google Tag Manager (GTM) Consent Handling

This project includes a privacy-conscious implementation of Google Tag Manager (GTM) with user consent support.

### ✅ Behavior

- GTM is **not loaded by default**.
- It loads **only after the user consents**, which is stored in `localStorage` using the key: `gtm_consent = "granted"`.
- Once granted, the GTM script is injected dynamically on the client side.

### 🧠 Technical Overview

- Consent is checked via `localStorage.getItem('gtm_consent')`.
- If granted and GTM is not already loaded, the script is injected dynamically using `innerHTML` (not `src`) to ensure inline execution.
- `window.gtmScriptLoaded` flag prevents multiple injections.


## 🛠️ CI/CD with GitHub Actions

This project uses **GitHub Actions** to run automated linting and build checks on every push and pull request.

### ✅ What It Checks

- **Linting** using ESLint (including accessibility rules)
- **Build Validation** using `next build`
- ✅ Runs on:
  - Every push to `master`
  - Every pull request to any branch

---
### ✅ Signup Flow

1. User fills the **signup form** with email and password.
2. Server processes the request:
   - Hashes the password with `bcrypt`
   - Stores the user in the database with `verified = false`
   - Creates a unique email verification token (stored in a separate table)
   - Sends a verification email with the token using **Resend**
3. User is redirected to a `Please verify your email` page.

---

### 📩 Email Verification

- The verification email contains a link to: https://yourdomain.com/verify-email?token=UNIQUE_TOKEN

- When visited:
- The frontend makes a `POST` request to `/api/auth/verify-email`
- Server checks:
  - If the token exists
  - If it has expired
- If valid:
  - Marks the user as verified
  - Deletes the token
  - Redirects to a `verified-success` or `login` page

---

### 🔓 Login Flow

1. User submits the **login form**.
2. Server:
 - Validates credentials (using `bcrypt.compare`)
 - Optionally ensures user is verified
 - Signs a JWT with [`jose`](https://github.com/panva/jose)
 - Sends it via an **HTTP-only cookie**

---

### 🔐 Access Control

- Protected routes use:
- Middleware or layout-based verification
- JWT cookie parsing
- `verified` flag checking
- Unverified or unauthenticated users are redirected to `/login`.

---



## 🔐 Email Verification Flow

This app enforces email verification for protected pages. Here’s how it works:

- After signing up, users receive a verification email with a token link.
- Until verified, their `user.verified` flag in the database remains `false`.
- When attempting to access a protected route:
  - If no token is found → redirected to `/login`
  - If token is valid but user is not verified → redirected to `/email-not-verified`
- The `/email-not-verified` page displays a friendly message prompting the user to check their inbox.

### 📄 Route: `/email-not-verified`

A fallback page rendered for users who are authenticated but not yet email-verified.

- Path: `app/email-not-verified/page.tsx`
- Shown automatically via logic in `ProtectedLayout`
- Message: "Your email is not verified yet..."

---

## ⚡ Page Loading Feedback

To improve perceived performance and UX during page transitions:

- The app uses a custom `AppLink` component that wraps `<Link />` from Next.js.
- When clicked:
  - If navigation takes more than 100ms, a toast loading message appears using [`sonner`](https://sonner.emilkowal.dev/).
  - When the route changes, the toast is dismissed immediately.

### Example:

```tsx
<AppLink href="/dashboard">Go to Dashboard</AppLink>



## 🧠 Error Monitoring with Sentry

This project integrates [Sentry](https://sentry.io/) for robust error tracking, even though we're hosted on [Vercel](https://vercel.com/). Here's why:

###  Why Sentry When We Already Use Vercel?

While Vercel provides basic runtime and build logs, it doesn't offer full error observability or tracing across the frontend and backend. Sentry fills that gap with:

- **Full stack traces** with source maps — helping pinpoint the exact file and line number where errors occur
- **Error grouping and deduplication** — Sentry intelligently groups similar errors together
- **Frontend error monitoring** — catches errors from the browser (e.g. network issues, component crashes)
- **Performance monitoring** — tracks slow pages, API latency, and rendering bottlenecks
- **Contextual info** — includes request data, user session breadcrumbs, and console logs
- **Deployment awareness** — integrates with Vercel to correlate errors with git commits and deployments
- **Alerting** — notify your team via Slack, email, or other channels when a critical error happens

###  What’s Tracked with Sentry

- All unhandled exceptions in API routes and server-side code
- Client-side errors in React components

## 🛠 Global Error Listener

This project includes a `GlobalErrorListener` component that listens for global browser errors such as:

- `window.onerror`
- `window.onunhandledrejection`

Its primary purpose is to catch unexpected client-side runtime errors and surface them to the user through a toast notification using the `sonner` library. This improves UX by giving users immediate feedback that something went wrong — even if the UI doesn't visibly break.


## 🔧 Error Boundary Wrapper

To gracefully handle unexpected errors in parts of your UI, this project uses a custom `ErrorBoundaryWrapper` component powered by [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary).

### ✨ Customizable Reset Button

The `ErrorBoundaryWrapper` allows consumers to fully override the **reset button** in the fallback UI. This is useful when:

- You want to render a **different element** (e.g., a `Link`, icon button, etc.)
- You need to pass additional **props** (e.g., `aria-*`, `data-*`, or analytics attributes)
- You want to apply **custom styles**, transitions, or behaviors
- You need to trigger **navigation** or a parent action before resetting the error state
- You can find an exmaple at app/(auth)/verify-email/layout.tsx

### 🧱 Default Button Styling

To help with styling consistency, the component exports a constant for default button styles:

```ts
export const ERROR_BOUNDARY_FALLBACK_BUTTON_DEFAULT_CLASSES =
  "mt-2 px-4 py-2 rounded bg-blue-500 text-white"

usage example:

```ts
<ErrorBoundaryWrapper
  resetButton={(reset) => (
    <Link
      onClick={() => reset()}
      href="/"
      className={twMerge(
        ERROR_BOUNDARY_FALLBACK_BUTTON_DEFAULT_CLASSES,
        "bg-black text-white"
      )}
    >
      Go to Home Page
    </Link>
  )}
>
  {children}
</ErrorBoundaryWrapper>
```ts

## 🌍 Internationalization (i18n) Strategy

This application uses the **Next.js App Router** with full support for internationalization (i18n). Two locales are currently supported:

- `en-US` (English – default)
- `de` (German)

### 🗂️ Folder Structure

The app routes are structured under a dynamic `[locale]` segment:

app/
[locale]/
page.tsx
layout.tsx



This structure enables clean, locale-prefixed URLs like:

- `/en-US`
- `/de`
- `/en-US/games`
- `/de/games`

---

### 🔁 Base URL Redirection

To ensure a consistent user experience and improve SEO, the root URL `/` is automatically redirected to the default locale `/en-US`.

This is achieved via **Next.js Middleware** at the edge:

```ts
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en-US', req.url));
  }

  return NextResponse.next();
}
```ts


## 🔗 Centralized Locale-Aware Link Handling with AppLink

To ensure consistent and reliable navigation across different languages, this project uses a centralized component called `AppLink` for all internal routing.

Instead of using the default `<Link>` component from Next.js directly throughout the app, `AppLink` acts as a wrapper that intelligently manages locale-aware URLs.

### What It Does

- **Automatically prefixes URLs with the active locale**  
  For example, navigating to `/games` while the selected language is German (`de`) will route the user to `/de/games`.

- **Prevents incorrect or double-prefixed URLs**  
  It guards against mistakes like `/de/de/games` by checking and cleaning the URL before rendering the link.

- **Keeps the user in their current language**  
  Whether they’re browsing in English or German, clicking a link through `AppLink` ensures they stay within that locale context.

- **Improves user experience with feedback**  
  When navigating to a new page, `AppLink` optionally shows a loading indicator if the transition takes more than a short moment, giving the user real-time feedback.

- **Centralizes navigation logic**  
  By funneling all internal navigation through `AppLink`, the app has a single source of truth for handling routing behavior. This makes the logic easier to maintain and consistent across the codebase.

### Why This Matters

Handling language-specific routing manually across many files can lead to inconsistencies, bugs, and confusing navigation behavior — especially when scaling up to more languages. By consolidating this into one component (`AppLink`), we:

- Simplify the development experience
- Make all links future-proof for additional locales
- Ensure users never leave their selected language unintentionally
- Reduce duplication and error-prone logic

### Current Status

At present, the `AppLink` component plays a core role in the multilingual architecture of the app. It is used across the navigation bar, page links, and all user-facing internal navigation.

As more languages are added or routing rules evolve, updates only need to happen in `AppLink`, making internationalization more scalable and robust.

