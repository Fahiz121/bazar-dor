"use client";
import { ICategory } from "@/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  ProgressCircle,
  Separator,
} from "@heroui/react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3.5">
          <div className="flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <span
                className="text-2xl sm:text-3xl leading-none"
                role="img"
                aria-label="bus"
              >
                <Image
                  className="bg-green-700 rounded size-7"
                  src="/logo-icon.png"
                  height={20}
                  width={20}
                  alt={""}
                ></Image>
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#1D271F] tracking-tight">
                বাজার দর
              </span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span role="img" aria-label="calendar">
                🗓️
              </span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <ProgressCircle aria-label="Loading" value={60}>
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
            ) : session?.user ? (
              <Dropdown>
                <Button isIconOnly aria-label="User Menu" variant="secondary">
                  <Avatar>
                    <Avatar.Image
                      alt={session.user.name ?? "User Profile"}
                      src={session.user.image ?? "/images/default-avatar.png"}
                    />
                    <Avatar.Fallback>
                      {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </Button>

                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item id="profile">
                      <Link href="/profile">প্রোফাইল</Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="update-profile">
                      <Link href="/profile/update-profile">আপডেট প্রোফাইল</Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="sign-out">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full text-left"
                      >
                        সাইন আউট
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost">
                  <Link href="/sign-in">সাইন ইন</Link>
                </Button>

                <Button className={"bg-[#05893F] rounded-xl"}>
                  <Link href="/sign-up">সাইন আপ</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <Separator className="w-full bg-slate-100" />

        <nav
          aria-label="Category Navigation"
          className="flex items-center gap-5 sm:gap-8 py-2.5 overflow-x-auto no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive =
              pathname === `/${cat.slug}` ||
              pathname === `/category/${cat.slug}`;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                title={cat.nameBn}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap py-1 transition-colors ${
                  isActive
                    ? "text-[#0d6efd] font-semibold"
                    : "text-slate-700 hover:text-[#0d6efd]"
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
