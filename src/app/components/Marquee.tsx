
import { Chip } from "@heroui/react";
import Link from "next/link";
import MarqueeText from "react-marquee-text";

interface Category {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const unitBn: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

const bnNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) return [];

    const result = await response.json();

    return Array.isArray(result)
      ? result
      : result.data ?? [];
  } catch (error) {
    console.error("Category fetch error:", error);
    return [];
  }
}

const Marquee = async () => {
  const categories = await getCategories();

  if (!categories.length) return null;

  return (
    <div className="w-full overflow-hidden border-y border-default-200 bg-default-50 py-2">
      <MarqueeText pauseOnHover>
        <div className="flex w-max items-center gap-8 px-4">
          {categories.map((category) => {
            const isUp = category.change?.dir === "up";

            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="flex shrink-0 items-center gap-2 text-sm transition-opacity hover:opacity-70"
              >
                <span className="text-lg">
                  {category.categoryIcon}
                </span>

                <span className="font-semibold whitespace-nowrap">
                  {category.nameBn}
                </span>

                <span className="whitespace-nowrap text-default-600">
                  দাম
                </span>

                <span className="font-bold whitespace-nowrap">
                  ৳{bnNumber(category.today ?? 0)}/
                  {unitBn[category.unit] || category.unit}
                </span>

                <Chip
                  size="sm"
                  color={isUp ? "success" : "danger"}
                  className="font-semibold"
                >
                  {isUp ? "▲" : "▼"}{" "}
                  {bnNumber(category.change?.pct ?? 0)}%
                </Chip>
              </Link>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
