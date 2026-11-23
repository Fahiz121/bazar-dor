
"use client";

import { IProduct } from "@/types/type";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import {
  Search,
  SlidersHorizontal,
  PackageSearch,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Package,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

const AllProductsSection = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const response = await res.json();

        const productsData: IProduct[] = Array.isArray(response)
          ? response
          : response.data ?? [];

        setProducts(productsData);
      } catch (error) {
        console.error("Fetch Products Error:", error);
        setError("পণ্যের তথ্য লোড করা সম্ভব হয়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Dynamic Categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Map(
        products.map((product) => [
          product.category,
          product.categoryNameBn,
        ])
      )
    );

    return uniqueCategories;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.nameBn.toLowerCase().includes(searchValue) ||
          product.categoryNameBn.toLowerCase().includes(searchValue) ||
          product.slug.toLowerCase().includes(searchValue)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.today - b.today);
        break;

      case "price-high":
        result.sort((a, b) => b.today - a.today);
        break;

      case "increase":
        result.sort((a, b) => {
          const aChange = a.change.dir === "up" ? a.change.pct : -1;
          const bChange = b.change.dir === "up" ? b.change.pct : -1;
          return bChange - aChange;
        });
        break;

      case "decrease":
        result.sort((a, b) => {
          const aChange = a.change.dir === "down" ? a.change.pct : -1;
          const bChange = b.change.dir === "down" ? b.change.pct : -1;
          return bChange - aChange;
        });
        break;

      case "name":
        result.sort((a, b) =>
          a.nameBn.localeCompare(b.nameBn, "bn")
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
  }, [search, selectedCategory, sortBy]);

  const LoadingSkeleton = () => (
    <div className="animate-pulse rounded-2xl border border-default-200 p-5 dark:border-white/10">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-2xl bg-default-200 dark:bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 rounded bg-default-200 dark:bg-white/10" />
          <div className="h-5 w-32 rounded bg-default-200 dark:bg-white/10" />
        </div>
      </div>
      <div className="mt-6 h-28 rounded-xl bg-default-200 dark:bg-white/10" />
      <div className="mt-5 h-16 rounded-xl bg-default-200 dark:bg-white/10" />
      <div className="mt-5 h-24 rounded-xl bg-default-200 dark:bg-white/10" />
    </div>
  );

  return (
    <section
      id="all-products"
      className="bg-default-50 py-16 dark:bg-[#0F1117]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-9">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Package size={14} />
            সম্পূর্ণ বাজার তালিকা
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-default-900 sm:text-3xl lg:text-4xl">
            সকল পণ্যের বাজারদর
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-default-500 sm:text-base">
            বাংলাদেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যের
            সর্বশেষ দাম, মূল্য পরিবর্তন এবং বাজারভিত্তিক তথ্য দেখুন।
          </p>
        </div>

        <div className="mb-7 rounded-2xl border border-default-200 bg-white p-4 shadow-sm dark:bg-[#15171D] sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-default-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="পণ্যের নাম দিয়ে খুঁজুন..."
                className="h-12 w-full rounded-xl border border-default-200 bg-default-50 pl-11 pr-11 text-sm text-default-900 outline-none transition-all placeholder:text-default-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:bg-white/[0.03]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-default-400 hover:text-default-700"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="relative lg:w-64">
              <SlidersHorizontal
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-default-400"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-default-200 bg-default-50 pl-11 pr-4 text-sm text-default-700 outline-none transition-all focus:border-emerald-500 dark:bg-[#20242E]"
              >
                <option value="default">ডিফল্ট সাজানো</option>
                <option value="price-low">দাম: কম থেকে বেশি</option>
                <option value="price-high">দাম: বেশি থেকে কম</option>
                <option value="increase">দাম বৃদ্ধির হার</option>
                <option value="decrease">দাম হ্রাসের হার</option>
                <option value="name">নাম অনুযায়ী</option>
              </select>
            </div>

          </div>

          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold text-default-500">
              ক্যাটাগরি অনুযায়ী খুঁজুন
            </p>

            <div className="flex flex-wrap gap-2">

              <button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === "all"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "border border-default-200 bg-white text-default-600 hover:border-emerald-500 hover:text-emerald-600 dark:bg-white/[0.03]"
                }`}
              >
                সকল পণ্য
              </button>

              {categories.map(([category, name]) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "border border-default-200 bg-white text-default-600 hover:border-emerald-500 hover:text-emerald-600 dark:bg-white/[0.03]"
                  }`}
                >
                  {name}
                </button>
              ))}

            </div>
          </div>

        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PackageSearch size={19} className="text-emerald-600" />

            <h3 className="text-sm font-bold text-default-800">
              সকল পণ্য
            </h3>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10">
              {filteredProducts.length.toLocaleString("bn-BD")}
            </span>
          </div>

          {(search || selectedCategory !== "all" || sortBy !== "default") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setSortBy("default");
              }}
              className="text-xs font-semibold text-red-500 transition-colors hover:text-red-600"
            >
              ফিল্টার রিসেট করুন
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-5 py-12 text-center dark:border-red-500/20 dark:bg-red-500/5">
            <RefreshCw size={30} className="mb-4 text-red-500" />

            <h3 className="text-lg font-bold text-default-900">
              তথ্য লোড করা যায়নি
            </h3>

            <p className="mt-2 text-sm text-default-500">
              {error}
            </p>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-default-200 bg-white px-5 py-14 text-center dark:bg-[#15171D]">
            <PackageSearch
              size={40}
              className="mb-4 text-default-400"
            />

            <h3 className="text-lg font-bold text-default-900">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-default-500">
              অন্য কোনো নাম বা ক্যাটাগরি দিয়ে অনুসন্ধান করুন।
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              সকল পণ্য দেখুন
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-default-200 bg-white text-default-600 transition-colors hover:border-emerald-500 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#15171D]"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={19} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold transition-all ${
                        currentPage === page
                          ? "bg-emerald-600 text-white shadow-md"
                          : "border border-default-200 bg-white text-default-600 hover:border-emerald-500 hover:text-emerald-600 dark:bg-[#15171D]"
                      }`}
                    >
                      {page.toLocaleString("bn-BD")}
                    </button>
                  ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(totalPages, prev + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-default-200 bg-white text-default-600 transition-colors hover:border-emerald-500 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#15171D]"
                  aria-label="Next page"
                >
                  <ChevronRight size={19} />
                </button>

              </div>
            )}

            <p className="mt-4 text-center text-xs text-default-400">
              পৃষ্ঠা {currentPage.toLocaleString("bn-BD")} / {totalPages.toLocaleString("bn-BD")}
              {" · "}
              মোট {filteredProducts.length.toLocaleString("bn-BD")} টি পণ্য
            </p>
          </>
        )}

      </div>
    </section>
  );
};

export default AllProductsSection;
