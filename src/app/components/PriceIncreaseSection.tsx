
"use client";

import { IProduct } from "@/types/type";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  ArrowDown,
  ArrowRight,
  Flame,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const PriceIncreaseSection = () => {
  const [topIncreasedProducts, setTopIncreasedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        const products: IProduct[] = Array.isArray(response)
          ? response
          : response.data ?? [];

        const filteredData = products
          .filter(
            (item) =>
              item.change?.dir === "up" &&
              typeof item.change.pct === "number"
          )
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);

        setTopIncreasedProducts(filteredData);
      } catch (error) {
        console.error("Fetch Increased Products Error:", error);
        setError("পণ্যের তথ্য লোড করা সম্ভব হয়নি।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-14 rounded-xl bg-default-200 dark:bg-white/10"
          />
        ))}
      </div>

      <div className="mt-5 h-24 rounded-xl bg-default-200 dark:bg-white/10" />
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-default-50 py-16 dark:bg-[#0F1117]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              <Flame size={14} />
              বাজারের মূল্য আপডেট
            </div>

            <h2 className="flex flex-wrap items-center gap-2 text-2xl font-extrabold tracking-tight text-default-900 sm:text-3xl lg:text-4xl">
              দাম বৃদ্ধির শীর্ষ পণ্য

              <TrendingUp
                size={28}
                className="text-red-500"
              />
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-default-500 sm:text-base">
              যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে, সেগুলোর
              সর্বশেষ বাজারদর ও মূল্য পরিবর্তন এক নজরে দেখুন।
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-default-200 bg-white px-5 py-3 text-sm font-semibold text-default-700 transition-all hover:border-red-500 hover:text-red-600 dark:bg-[#15171D]"
          >
            সকল পণ্য দেখুন

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-5 py-12 text-center dark:border-red-500/20 dark:bg-red-500/5">
            <div className="mb-4 rounded-full bg-red-100 p-4 dark:bg-red-500/10">
              <RefreshCw size={28} className="text-red-500" />
            </div>

            <h3 className="text-lg font-bold text-default-900">
              তথ্য লোড করা যায়নি
            </h3>

            <p className="mt-2 text-sm text-default-500">
              {error}
            </p>
          </div>
        ) : topIncreasedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-default-200 bg-white px-5 py-12 text-center dark:bg-[#15171D]">
            <div className="mb-4 rounded-full bg-default-100 p-4 dark:bg-white/5">
              <ArrowDown size={28} className="text-default-400" />
            </div>

            <h3 className="text-lg font-bold text-default-900">
              কোনো মূল্য বৃদ্ধি পাওয়া পণ্য নেই
            </h3>

            <p className="mt-2 text-sm text-default-500">
              বর্তমানে কোনো পণ্যের দাম বৃদ্ধি পায়নি।
            </p>
          </div>
        ) : (

          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {topIncreasedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="relative"
                >

                  <div className="absolute -left-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-default-50 bg-red-600 text-sm font-extrabold text-white shadow-md dark:border-[#0F1117]">
                    {index + 1}
                  </div>

                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-default-400">
              <TrendingUp size={15} className="text-red-500" />

              <span>
                সর্বোচ্চ মূল্য বৃদ্ধির হার অনুযায়ী শীর্ষ ৬টি পণ্য দেখানো হচ্ছে।
              </span>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default PriceIncreaseSection;
