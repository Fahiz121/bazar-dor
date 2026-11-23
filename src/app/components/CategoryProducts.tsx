
"use client";

import { IProduct } from "@/types/type";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ChevronDown, TrendingDown, TrendingUp } from "lucide-react";

interface CategoryProductsProps {
  products: IProduct[];
}

// বাংলা ও ইংরেজি সংখ্যাকে Number-এ convert করবে
const toNumericValue = (value: string | number): number => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  const normalized = String(value)
    .replace(/[০-৯]/g, (digit) =>
      String(banglaDigits.indexOf(digit))
    )
    .replace(/[^\d.-]/g, "");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : 0;
};

// বাংলা সংখ্যায় দাম দেখাবে
const formatPrice = (price: string | number) => {
  return toNumericValue(price).toLocaleString("bn-BD");
};

// Unit label
const getUnitLabel = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  return units[unit?.toLowerCase()] || unit;
};

const CategoryProducts = ({
  products,
}: CategoryProductsProps) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "price-asc") {
      result.sort(
        (a, b) =>
          toNumericValue(a.today) - toNumericValue(b.today)
      );
    } else if (sortBy === "price-desc") {
      result.sort(
        (a, b) =>
          toNumericValue(b.today) - toNumericValue(a.today)
      );
    }

    return result;
  }, [products, sortBy]);

  return (
    <section className="w-full space-y-3">

      {/* Category Header */}
      {products.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-[#E4EBE5] bg-[#FAFCFA] px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F4F0] text-2xl">
            {products[0].categoryIcon || "📦"}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#26352B]">
              {products[0].categoryNameBn}
            </h2>

            <p className="text-[11px] text-[#879188]">
              এই ক্যাটাগরির পণ্যের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      )}

      {/* Sort Bar */}
      <div className="flex items-center justify-end rounded-xl border border-[#E4EBE5] bg-[#FAFCFA] px-3 py-2">
        <label
          htmlFor="product-sort"
          className="mr-2 text-xs text-[#78847B]"
        >
          সাজান
        </label>

        <div className="relative">
          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cursor-pointer appearance-none rounded-md border border-[#DCE5DD] bg-white py-1 pl-3 pr-8 text-xs text-[#344239] outline-none transition focus:border-emerald-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">
              দাম: কম থেকে বেশি
            </option>
            <option value="price-desc">
              দাম: বেশি থেকে কম
            </option>
          </select>

          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#78847B]"
          />
        </div>
      </div>

      {/* Product Count */}
      <p className="text-[11px] text-[#879188]">
        মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্যের দাম
      </p>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">

          {sortedProducts.map((product) => {
            const direction = product.change?.dir;
            const percentage = product.change?.pct ?? 0;

            const isUp = direction === "up";
            const isDown = direction === "down";

            return (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="group rounded-xl border border-[#E3EAE4] bg-[#FAFCFA] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-sm"
              >
                {/* Product Info */}
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F4F0] text-xl">
                    {product.categoryIcon || "📦"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-xs font-bold text-[#26352B] transition-colors group-hover:text-emerald-700">
                      {product.nameBn}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-[#879188]">
                      {product.categoryNameBn}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-[#879188]">
                      সর্বশেষ দাম
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-[#26352B]">
                      {formatPrice(product.today)} টাকা
                      <span className="ml-1 text-[10px] font-normal text-[#879188]">
                        / {getUnitLabel(product.unit)}
                      </span>
                    </p>
                  </div>

                  {/* Price Change */}
                  <div
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp size={11} />
                    ) : isDown ? (
                      <TrendingDown size={11} />
                    ) : null}

                    {formatPrice(percentage)}%
                  </div>
                </div>
              </Link>
            );
          })}

        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#DCE5DD] bg-[#FAFCFA] py-12 text-center">
          <p className="text-sm font-medium text-[#65736A]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
};

export default CategoryProducts;
