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

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_RAWG_API_KEY= 'your-rawg-api-key'

---

## 🛠 Setup & Run

- git clone https://github.com/your-username/gamehub.git
- cd gamehub
- npm install
- npm run dev