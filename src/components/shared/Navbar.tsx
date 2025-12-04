"use client";
import React, { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import { useUser } from "../context/UserContext";
import { Button } from "@/components/ui/button";
import { Profile } from "./profile";
import { logOut } from "@/src/services/auth";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { user, setIsLoading } = useUser();

  const handleLogout = () => {
    logOut();
    setIsLoading(true);
  };

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span>Category</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Electronics
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Fashion
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Home & Garden
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sports
                  </a>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search here anything"
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-1.5 rounded-full hover:bg-gray-800 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block border rounded-full p-3 text-gray-700 hover:text-gray-900 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="hidden md:block border rounded-full p-3 text-gray-700 hover:text-gray-900 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            {user ? (
              <>
                <Link href="/create-shop">
                  <Button className=" rounded-full cursor-pointer bg-white text-black border hover:bg-slate-100">
                    create shop
                  </Button>
                </Link>
                <div>
                  <Profile handleLogout={handleLogout} />
                </div>
              </>
            ) : (
              <Link href={"/login"}>
                <button className="hidden md:block px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors border rounded-full">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900"
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
          <div className="md:hidden py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search here anything"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-1.5 rounded-full">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Category */}
            <div>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <span>Category</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isCategoryOpen && (
                <div className="mt-2 pl-4 space-y-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Electronics
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Fashion
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Home & Garden
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Sports
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Links */}
            <div className="flex items-center justify-around pt-4 border-t border-gray-200">
              <button className="flex flex-col items-center text-gray-700">
                <Heart className="w-5 h-5 mb-1" />
                <span className="text-xs">Wishlist</span>
              </button>
              <button className="flex flex-col items-center text-gray-700">
                <ShoppingCart className="w-5 h-5 mb-1" />
                <span className="text-xs">Cart</span>
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
