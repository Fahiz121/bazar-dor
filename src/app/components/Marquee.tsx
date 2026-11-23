"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { IProduct } from "@/types/type";
import { Separator } from "@heroui/react";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  piece: "টি",
  dozen: "ডজন",
};

const PriceMarquee = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await res.json();

        // API response যদি সরাসরি array হয়
        const data = Array.isArray(result) ? result : result.data;

        setProducts(data ?? []);
      } catch (error) {
        console.error("Product fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const interval = setInterval(fetchProducts, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return null;
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className="bg-white text-black py-3">
      <Marquee speed={45} pauseOnHover gradient={false}>
        {products.map((product) => {
          const isUp = product.change.dir === "up";

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex items-center gap-2 px-6 whitespace-nowrap"
            >
              <span>{product.image}</span>

              <span>{product.nameBn}</span>

              <span className="font-semibold">
                ৳{product.today.toLocaleString("en-IN")}
              </span>

              <span>/ {unitBn[product.unit] ?? product.unit}</span>

              <span className={isUp ? "text-green-400" : "text-red-400"}>
                {isUp ? "▲" : "▼"}
                {product.change.pct}%
              </span>
            </Link>
          );
        })}
      </Marquee>
      <Separator className="w-full bg-slate-200" />
    </div>
  );
};

export default PriceMarquee;
