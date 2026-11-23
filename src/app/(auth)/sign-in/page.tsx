"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("Form Data:", data);
    const { data: resData, error } = await signIn.email({
      email: data.email as string, 
      password: data.password as string, 
      callbackURL: "/", 
    });
    if (error) {
      toast.error(error.message as string);
    }
  };
  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  const handleGithubSignIn = async () => {
    const data = await signIn.social({
      provider: "github",
    });
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] p-4">
      <Card className="w-full max-w-[420px] p-5 sm:p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 bg-white">
        {/* Header Section */}
        <Card.Header className="flex flex-col items-center text-center gap-1.5 pb-2">
          <Card.Title className="text-2xl sm:text-3xl font-bold text-slate-900">
            সাইন ইন
          </Card.Title>
          <Card.Description className="text-xs sm:text-sm text-slate-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </Card.Description>
        </Card.Header>

        <Card.Content className="flex flex-col gap-5 pt-2">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                ইমেইল অ্যাড্রেস
              </Label>
              <div className="relative flex items-center">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3.5 text-slate-400"
                />
                <Input
                  placeholder="example@mail.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0d6efd] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <TextField
              name="password"
              type={isVisible ? "text" : "password"}
              isRequired
              className="flex flex-col gap-1.5 w-full"
            >
              <Label className="text-xs sm:text-sm font-medium text-slate-700">
                পাসওয়ার্ড
              </Label>
              <div className="relative flex items-center">
                <Lock
                  size={18}
                  className="pointer-events-none absolute left-3.5 text-slate-400"
                />
                <Input
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0d6efd] focus:bg-white focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-11 mt-1 rounded-xl bg-[#05893F] hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors"
            >
              সাইন ইন
            </Button>
          </Form>

          <div className="w-full flex items-center gap-3">
            <Separator className="flex-1 bg-slate-100" />
            <span className="text-xs text-slate-400 font-medium">অথবা</span>
          </div>

          <div className="flex items center justify-center gap-2">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-none transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google দিয়ে লগইন করুন</span>
            </Button>
            <Button
              type="button"
              onClick={handleGithubSignIn}
              variant="outline"
              className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-none transition-colors"
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.622-5.48 5.922.43.372.823 1.102.823 2.222v3.293c0 .322.216.694.825.576C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12Z"
                />
              </svg>
              <span>GitHub দিয়ে লগইন করুন</span>
            </Button>
          </div>
        </Card.Content>

        <Separator className="w-full bg-slate-100 my-4" />

        <Card.Footer className="flex flex-col items-center gap-2.5 pt-0 text-xs sm:text-sm">
          <p className="text-slate-500">
            নতুন ব্যবহারকারী?{" "}
            <Link
              href="/signup"
              className="text-[#05893F] font-semibold hover:underline"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors text-xs"
          >
            <ArrowLeft size={14} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}
