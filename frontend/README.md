# FurnHaus — Modern Furniture eCommerce

A full-featured React furniture eCommerce frontend, built with Vite, Tailwind CSS, React Router, and Context API.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:5173`

## 🏗 Tech Stack

- **React 18** + **Vite**
- **React Router DOM v6**
- **Tailwind CSS v3**
- **Context API** (Cart, Auth, Wishlist, Toast)
- **localStorage** for persistence

## 📄 Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, categories, featured, testimonials |
| `/shop` | Shop — all products, filter, search, sort |
| `/sofas` | Sofas collection |
| `/chairs` | Chairs collection |
| `/product/:id` | Product detail — gallery, specs, add to cart |
| `/cart` | Cart — quantity, totals, checkout |
| `/checkout` | Checkout — address, COD/Card/UPI payment |
| `/thank-you` | Order confirmation |
| `/about` | About Us |
| `/services` | Services |
| `/contact` | Contact (with validation) |
| `/login` | Login |
| `/signup` | Signup |
| `/dashboard` | User dashboard (protected) |

## ✨ Features

- Add to cart / update quantity / remove items
- Wishlist (saved to localStorage)
- User authentication (mock, localStorage)
- Protected dashboard route
- Form validation on login, signup, checkout, contact
- Toast notifications for all actions
- Loading skeleton animations
- Fully responsive (mobile-first)
- Search, filter by category, sort on Shop page
- Order history in dashboard

## 💳 Payment (Mock UI only)

- **COD** → instant confirmation
- **Card** → number/expiry/CVV form (no real charge)
- **UPI/GPay** → UPI ID form (mock)

## 📁 Folder Structure

```
src/
  components/    Navbar, Footer, ProductCard, Skeleton, ProtectedRoute
  context/       CartContext, AuthContext, WishlistContext, ToastContext
  data/          products.js (12 mock products)
  pages/         All 14 pages
  App.jsx        Router + layout
  main.jsx       Entry point
  index.css      Tailwind + custom styles
```

## 🎨 Design

- Font: Playfair Display (headings) + DM Sans (body) + DM Mono (labels)
- Palette: Cream/Beige base, Charcoal, Sage green, Terracotta accents
- Hover animations, smooth transitions, skeleton loaders
