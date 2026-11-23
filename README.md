<div align="center">

# 🛒 বাজার দর | BazarDor

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর, এক নজরে।**

*Track the latest prices of everyday essentials across the markets of Bangladesh.*

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## 📖 About

**BazarDor (বাজার দর)** is a fully Bangla web application that helps people keep an eye on the daily prices of essential goods such as rice, oil, vegetables, fish and more. Prices are shown per unit, compared with yesterday, last week and last month, and broken down market by market, so shoppers can quickly see what is getting cheaper, what is getting costlier, and where.

---

## 🧰 Technologies Used

| Category        | Technology                                            |
| --------------- | ----------------------------------------------------- |
| Framework       | [Next.js](https://nextjs.org/) (App Router)           |
| Library         | [React](https://react.dev/)                           |
| Language        | [TypeScript](https://www.typescriptlang.org/)         |
| Styling         | [Tailwind CSS](https://tailwindcss.com/)              |
| UI Components   | [HeroUI](https://www.heroui.com/)                     |
| Icons           | [Lucide React](https://lucide.dev/)                   |
| Data Source     | Programming Hero BazarDor Open API (REST)             |
| Localization    | `Intl` / `toLocaleString("bn-BD")` for Bangla numerals |

---

## ✨ Key Features

1. **📊 Live Market Prices**
   See today's price for each product along with yesterday's, last week's and last month's price, plus the percentage change.

2. **🔥 Top Price Rise & Fall Highlights**
   Dedicated sections rank the products whose prices increased or decreased the most, so big market movements are easy to spot.

3. **🔎 Search, Filter, Sort & Pagination**
   Find any product by name, filter by category, sort by price, rate of increase/decrease or name, and browse the full list page by page.

4. **🏪 Market-wise Price Breakdown**
   Each product page shows the minimum, maximum and average price in different markets and divisions.

5. **🇧🇩 Bangla-first, Responsive & Dark Mode Ready**
   The entire interface is in Bangla with Bangla numerals, and it adapts smoothly to mobile, tablet and desktop screens in both light and dark themes.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── components/          # ProductCard, PriceIncreaseSection, PriceDecreaseSection, AllProductsSection, ...
│   ├── products/
│   │   ├── page.tsx         # All products list
│   │   └── [slug]/page.tsx  # Product details
│   └── categories/
│       └── [slug]/page.tsx  # Category details
└── types/
    └── type.ts              # IProduct, ICategory
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/bazardor.git
cd bazardor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://openapi.programming-hero.com/api/bazardor
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🔗 Main Routes

| Route                  | Description                         |
| ---------------------- | ----------------------------------- |
| `/`                    | Home with top price rise/fall lists |
| `/products`            | All products with search & filters  |
| `/products/[slug]`     | Product price details               |
| `/categories/[slug]`   | Products in a category              |

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to open an issue or submit a pull request.

---

<div align="center">

Made with ❤️ for the people of Bangladesh

</div>