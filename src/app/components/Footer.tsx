import { Separator } from "@heroui/react";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="container mx-auto px-4">
        <Separator className="mb-6 bg-slate-200" />

        <div className="flex flex-col items-center justify-between gap-3 pb-6 text-center text-sm text-slate-500 md:flex-row md:text-left">
          {/* Brand Description */}
          <p className="font-medium text-slate-700">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Disclaimer */}
          <p className="text-xs sm:text-sm">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
