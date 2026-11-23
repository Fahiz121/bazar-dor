"use client";

import { IProduct } from "@/types/type";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

const formatNumber = (n: number) =>
  new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 }).format(n);

const unitLabels: Record<string, string> = {
  kg: "কেজি",
  gram: "গ্রাম",
  liter: "লিটার",
  piece: "টি",
  dozen: "ডজন",
};

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const unit = unitLabels[product.unit] ?? product.unit;

  const chipStyle = isUp
    ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
    : isDown
      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
      : "bg-default-100 text-default-500 dark:bg-white/5";

  const arrow = isUp ? "▲" : isDown ? "▼" : "–";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-2xl border border-[#E0E9E1] bg-[#FAFCFA] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg dark:border-white/10 dark:bg-[#15171D]"
    >
      {/* Top: Icon + Name */}
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F1] text-3xl dark:bg-white/5">
          {product.image || product.categoryIcon || "📦"}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-default-900">
            {product.nameBn}
          </h3>
          <p className="mt-0.5 text-xs text-default-500">প্রতি {unit}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-default-500">আজকের দাম</p>

          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold tracking-tight text-default-900">
              {formatNumber(product.today)}
            </span>
            <span className="text-sm font-medium text-default-700">টাকা</span>
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${chipStyle}`}
        >
          <span className="text-[10px]">{arrow}</span>
          {formatNumber(product.change?.pct ?? 0)}%
        </span>
      </div>
    </Link>
  );
}