"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-white via-green-50 to-emerald-100 p-6 sm:p-10 shadow-sm">
        {/* Background Decoration */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />

        <div className="relative z-10 flex flex-col-reverse items-center justify-between gap-8 lg:flex-row">
          {/* Left Content */}
          <div className="w-full flex-1">
            <Button className="mb-5 rounded-full border border-green-200 bg-green-100 px-4 text-sm font-medium text-[#05893F] shadow-none">
              <span>{formattedDate}</span>
            </Button>

            <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              আজকের বাজারের দাম
              <span className="block text-[#05893F]">এক নজরে</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div  className="mt-7 flex flex-wrap items-center gap-4">
             <Link href={"/#all-products"}>
              <Button className="rounded-xl bg-[#05893F] px-6 py-3 font-semibold text-white shadow-lg shadow-green-900/15 transition-all hover:-translate-y-1 hover:bg-green-700">
                সব পণ্য দেখুন
              </Button>
              </Link>

            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex w-full flex-1 justify-center lg:justify-end">
            <div className="absolute inset-5 rounded-full bg-green-300/30 blur-3xl" />

            <Image
              src="/bazar-hero.png"
              height={400}
              width={400}
              alt="আজকের বাজারের পণ্য"
              priority
              className="relative z-10 h-auto w-full max-w-[320px] object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105 sm:max-w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
