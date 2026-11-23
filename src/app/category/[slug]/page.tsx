
import { ICategory, IProduct } from "@/types/type";
import {
  Home,
  ChevronRight,
  Package,
  Store,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import CategoryProducts from "@/app/components/CategoryProducts";

interface CategoryDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryDetailsPage = async ({
  params,
}: CategoryDetailsPageProps) => {
  const { slug } = await params;

  let products: IProduct[] = [];
  let category: ICategory | null = null;
  let error = "";

  try {
    const [productsRes, categoryRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?category=${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      ),
    ]);

    if (!productsRes.ok || !categoryRes.ok) {
      throw new Error("Failed to fetch category data");
    }

    const productsResponse = await productsRes.json();
    const categoryResponse = await categoryRes.json();

    products = Array.isArray(productsResponse)
      ? productsResponse
      : productsResponse.data ?? [];

    category = categoryResponse.data ?? categoryResponse;

    if (!category?.slug) {
      throw new Error("Category not found");
    }
  } catch (err) {
    console.error("Category Details Error:", err);
    error = "ক্যাটাগরির তথ্য লোড করা সম্ভব হয়নি।";
  }

  if (error || !category) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-default-50 px-4 dark:bg-[#0F1117]">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
            <Package size={30} />
          </div>

          <h1 className="text-xl font-bold text-default-900">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-default-500">
            {error || "ক্যাটাগরিটি পাওয়া যায়নি।"}
          </p>

          <Link
            href="/categories"
            className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            সকল ক্যাটাগরি দেখুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-default-50 py-10 dark:bg-[#0F1117]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-default-400">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-emerald-600"
          >
            <Home size={15} />
            হোম
          </Link>

          <ChevronRight size={15} />

          <Link
            href="/categories"
            className="transition-colors hover:text-emerald-600"
          >
            ক্যাটাগরি
          </Link>

          <ChevronRight size={15} />

          <span className="font-semibold text-emerald-600">
            {category.nameBn}
          </span>
        </nav>

        <section className="relative mb-10 overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 dark:border-emerald-500/10 dark:from-emerald-950/30 dark:via-[#15171D] dark:to-teal-950/20 sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />

          <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-emerald-100 bg-white text-5xl shadow-sm dark:border-emerald-500/20 dark:bg-white/5 sm:h-28 sm:w-28 sm:text-6xl">
                {category.icon}
              </div>

              <div>
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Package size={13} />
                  পণ্য ক্যাটাগরি
                </span>

                <h1 className="text-2xl font-extrabold tracking-tight text-default-900 sm:text-4xl">
                  {category.nameBn}
                </h1>

                <p className="mt-2 text-sm text-default-500 sm:text-base">
                  {category.nameBn} ক্যাটাগরির সকল পণ্যের সর্বশেষ বাজারদর দেখুন।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/80 p-4 dark:border-emerald-500/20 dark:bg-white/[0.04]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Store size={23} />
              </div>

              <div>
                <p className="text-2xl font-extrabold text-default-900">
                  {products.length.toLocaleString("bn-BD")}
                </p>

                <p className="text-xs text-default-500">
                  মোট পণ্য
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-extrabold text-default-900 sm:text-2xl">
                {category.nameBn} এর সকল পণ্য
              </h2>

              <p className="mt-1 text-sm text-default-500">
                এই ক্যাটাগরির বাজারদর ও মূল্য পরিবর্তন।
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-default-500">
              <TrendingUp size={16} className="text-emerald-600" />
              সর্বশেষ বাজার তথ্য
            </div>
          </div>

          <CategoryProducts products={products} />
        </section>

      </div>
    </main>
  );
};

export default CategoryDetailsPage;
