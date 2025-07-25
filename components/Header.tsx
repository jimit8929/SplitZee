"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useStoreUser } from "@/hooks/use-store-users";

import { BarLoader } from "react-spinners";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard, Sun, Moon } from "lucide-react";

const Header = () => {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 2. On mount, read saved theme or system
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (saved === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 3. Toggle handler
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <header
      className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60 dark:border-gray-800
    dark:bg-black/75 supports-[backdrop-filter]:dark:bg-black/50"
    >
      <nav className="container mx-auto px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={theme == "dark" ? "/logos/Dark_mode_img.png" : "/logos/Icon-Logo.png"}
            alt="SplitZee logo"
            height={44} // Use only height for consistent scaling
            width={44}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        {path === "/" && (
          <div className="hidden md:flex items-center gap-6 ml-28 mr-4">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              How It Works
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-10 h-10 p-0 transition-colors duration-300"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Authenticated>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>
            <UserButton />
          </Authenticated>
          <Unauthenticated>
            <SignInButton>
              <Button variant="ghost" className="cursor-pointer">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-green-600 hover:bg-green-700 border-none cursor-pointer text-white font-bold">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>
      {isLoading && <BarLoader width="100%" color="#36d7b7" />}
    </header>
  );
};

export default Header;
