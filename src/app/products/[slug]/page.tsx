import { IProduct } from "@/types/type";
import {
  Home,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Store,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { slug } = await params;
  console.log(">>> PRODUCT DETAILS PAGE, slug:", slug);

  let product: IProduct | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();

      const allProducts: IProduct[] = Array.isArray(response)
        ? response
        : (response.data ?? []);

      product = allProducts.find((p) => p.slug === slug) ?? null;
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F0F5F1] px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] px-5 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F5F1]">
            <Store size={28} className="text-[#879188]" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#26352B]">
            পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm text-[#879188]">
            দুঃখিত, এই পণ্যের কোনো তথ্য পাওয়া যায়নি।
          </p>

          <Link
            href="/#all-products"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            <ArrowLeft size={16} />
            সকল পণ্যে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F5F1] px-3 py-5 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-3">
        <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#78847B]">
          <Link
            href={`/categories/${product.category}`}
            className="flex items-center gap-1 transition hover:text-emerald-700"
          >
            <Home size={12} />
            হোম
          </Link>

          <ChevronRight size={12} />

          <Link href="/category" className="transition hover:text-emerald-700">
            {product.categoryNameBn}
          </Link>

          <ChevronRight size={12} />

          <span className="font-medium text-[#344239]">{product.nameBn}</span>
        </nav>

        <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F1] text-3xl">
              {product.categoryIcon || "📦"}
            </div>

            <div>
              <h1 className="text-lg font-bold text-[#26352B] sm:text-xl">
                {product.nameBn}
              </h1>

              <p className="mt-0.5 text-xs text-[#78847B]">
                {product.categoryNameBn} - {product.unit}
              </p>

              <p className="mt-1 text-[11px] text-[#65736A]">
                বাংলাদেশের বিভিন্ন বাজারের সর্বশেষ দাম ও পরিবর্তন
              </p>
            </div>
          </div>

          <div className="flex min-w-28 items-center justify-between gap-4 rounded-xl bg-[#F0F5F1] px-4 py-3 sm:block sm:text-center">
            <div>
              <p className="text-[10px] text-[#78847B]">সর্বশেষ দাম</p>

              <p className="mt-1 text-xl font-bold text-[#26352B]">
                {product.today.toLocaleString("bn-BD")}
              </p>

              <p className="text-[10px] text-[#78847B]">
                টাকা / {product.unit}
              </p>
            </div>

            <div
              className={`mt-1 flex items-center justify-end gap-1 text-[10px] font-semibold sm:justify-center ${
                product.change?.dir === "up"
                  ? "text-red-600"
                  : product.change?.dir === "down"
                    ? "text-emerald-600"
                    : "text-gray-500"
              }`}
            >
              {product.change?.dir === "up" ? (
                <TrendingUp size={12} />
              ) : product.change?.dir === "down" ? (
                <TrendingDown size={12} />
              ) : null}
              {product.change?.pct?.toLocaleString("bn-BD") ?? 0}%
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] p-3 sm:p-4">
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays size={15} className="text-emerald-700" />

            <h2 className="text-sm font-bold text-[#26352B]">
              দামের সারসংক্ষেপ
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {/* Yesterday */}
            <div className="rounded-xl border border-[#E3EBE4] p-3">
              <p className="text-[11px] font-medium text-[#78847B]">
                গতকাল দাম
              </p>

              <p className="mt-1 text-base font-bold text-emerald-700">
                {product.yesterday.toLocaleString("bn-BD")} টাকা
              </p>

              <p className="mt-0.5 text-[10px] text-[#879188]">
                গতকালের বাজার দর
              </p>
            </div>

            <div className="rounded-xl border border-[#E3EBE4] p-3">
              <p className="text-[11px] font-medium text-[#78847B]">
                গত সপ্তাহ দাম
              </p>

              <p className="mt-1 text-base font-bold text-red-600">
                {product.lastWeek.toLocaleString("bn-BD")} টাকা
              </p>

              <p className="mt-0.5 text-[10px] text-[#879188]">
                গত সপ্তাহের বাজার দর
              </p>
            </div>

            <div className="rounded-xl border border-[#E3EBE4] p-3">
              <p className="text-[11px] font-medium text-[#78847B]">গত মাস</p>

              <p className="mt-1 text-base font-bold text-emerald-700">
                {product.lastMonth.toLocaleString("bn-BD")} টাকা
              </p>

              <p className="mt-0.5 text-[10px] text-[#879188]">
                গত মাসের বাজার দর
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#E0E9E1] bg-[#FAFCFA] p-3 sm:p-4">
          <div className="mb-3 flex items-center gap-2">
            <Store size={15} className="text-emerald-700" />

            <h2 className="text-sm font-bold text-[#26352B]">
              বাজারভিত্তিক সর্বশেষ দাম
            </h2>
          </div>

          {product.markets?.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-[#E3EBE4]">
              <table className="w-full min-w-[600px] border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F5F8F5] text-[#78847B]">
                    <th className="px-3 py-3 text-left font-semibold">বাজার</th>

                    <th className="px-3 py-3 text-left font-semibold">বিভাগ</th>

                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বোচ্চ
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={index}
                      className="border-t border-[#E5EBE5] transition hover:bg-[#F2F7F2]"
                    >
                      <td className="px-3 py-3 text-left font-medium text-[#344239]">
                        {market.market}
                      </td>

                      <td className="px-3 py-3 text-left text-[#78847B]">
                        {market.division}
                      </td>

                      <td className="px-3 py-3 text-right text-[#344239]">
                        {market.min.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-3 py-3 text-right text-[#344239]">
                        {market.max.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-3 py-3 text-right font-semibold text-[#344239]">
                        {(
                          (Number(market.min) + Number(market.max)) /
                          2
                        ).toLocaleString("bn-BD", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#DCE5DD] py-10 text-center">
              <Store size={25} className="mx-auto mb-2 text-[#A0AAA2]" />

              <p className="text-xs text-[#78847B]">
                এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </p>
            </div>
          )}
        </section>

        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DD] bg-[#FAFCFA] px-4 py-2 text-xs font-medium text-[#526157] transition hover:border-emerald-300 hover:text-emerald-700"
          >
            <ArrowLeft size={14} />
            সকল পণ্যে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
