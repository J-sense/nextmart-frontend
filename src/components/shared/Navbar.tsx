"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { useUser } from "../context/UserContext";
import { Button } from "@/components/ui/button";
import { Profile } from "./profile";
import { logOut } from "@/src/services/auth";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/src/constants";
import { ModeToggle } from "@/components/ui/core/imageUpload/modeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logOut();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  const categories = [
    { name: "Premium Products", icon: Sparkles },
    { name: "Digital Solutions", icon: Zap },
    { name: "Innovation", icon: TrendingUp },
    { name: "Enterprise", icon: "💼" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      } border-b border-gray-200/50 dark:border-gray-800/50`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 font-medium"
              >
                <span>Explore Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-3 z-50">
                  {categories.map((category, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 dark:hover:from-purple-900/20 hover:to-blue-50 dark:hover:to-blue-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                    >
                      {typeof category.icon === "string" ? (
                        <span className="mr-3 text-lg">{category.icon}</span>
                      ) : (
                        <category.icon className="w-4 h-4 mr-3" />
                      )}
                      <span className="font-medium">{category.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                Solutions
              </a>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
              >
                Pricing
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search premium products..."
                  className="w-full pl-5 pr-12 py-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ModeToggle />
            </div>

            {/* Action Buttons */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
              <Heart className="w-5 h-5" />
            </button>
            
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg">
                3
              </span>
            </button>

            {user ? (
              <>
                <Link href="/create-shop">
                  <Button className="hidden md:flex items-center space-x-2 rounded-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-xl hover:scale-105 transition-all duration-300 px-6 py-2.5 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    <span>Create Shop</span>
                  </Button>
                </Link>
                <div>
                  <Profile handleLogout={handleLogout} />
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="hidden md:block px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all border border-gray-200 dark:border-gray-700 rounded-full hover:border-purple-400 dark:hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 dark:hover:from-purple-900/20 hover:to-blue-50 dark:hover:to-blue-900/20">
                    Sign In
                  </button>
                </Link>
                <Link href="/register">
                  <Button className="hidden md:flex rounded-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-xl hover:scale-105 transition-all duration-300 px-6 py-2.5 shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 mt-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 px-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search premium products..."
                className="w-full pl-4 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <a
                href="#"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 dark:hover:from-purple-900/20 hover:to-blue-50 dark:hover:to-blue-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all"
              >
                Features
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 dark:hover:from-purple-900/20 hover:to-blue-50 dark:hover:to-blue-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all"
              >
                Solutions
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 dark:hover:from-purple-900/20 hover:to-blue-50 dark:hover:to-blue-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all"
              >
                Pricing
              </a>
            </div>

            {/* Mobile Category */}
            <div>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 dark:hover:from-purple-900/20 hover:to-blue-50 dark:hover:to-blue-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl transition-all font-medium"
              >
                <span>Explore Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isCategoryOpen && (
                <div className="mt-2 pl-4 space-y-2">
                  {categories.map((category, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      {typeof category.icon === "string" ? (
                        <span className="mr-3 text-lg">{category.icon}</span>
                      ) : (
                        <category.icon className="w-4 h-4 mr-3" />
                      )}
                      <span>{category.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Theme Toggle */}
            <div className="px-4 py-3">
              <ModeToggle />
            </div>

            {/* Mobile Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Heart className="w-5 h-5 mb-2" />
                <span className="text-xs font-medium">Wishlist</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative">
                <ShoppingCart className="w-5 h-5 mb-2" />
                <span className="text-xs font-medium">Cart</span>
                <span className="absolute top-2 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </button>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 pt-4">
              {!user ? (
                <>
                  <Link href="/login">
                    <button className="w-full px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all border border-gray-200 dark:border-gray-700 rounded-full hover:border-purple-400 dark:hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 dark:hover:from-purple-900/20 hover:to-blue-50 dark:hover:to-blue-900/20">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full rounded-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-xl transition-all duration-300 py-3">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/create-shop">
                  <Button className="w-full rounded-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-xl transition-all duration-300 py-3">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Shop
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}