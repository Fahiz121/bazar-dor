import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import { Suspense } from "react";

export const instant = false;

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Bazar Dor By Fahiz",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Navbar />
        </Suspense>
        <Marquee />
        {children}
      </body>
    </html>
  );
}
