
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center space-x-3 relative">
      {/* Animated gradient background glow */}
      <div className="absolute -inset-1 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

      {/* Logo Icon */}
      <div className="relative w-10 h-10 bg-linear-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent rounded-xl"></div>
        <span className="relative text-white font-black text-xl tracking-tight">
          S
        </span>

        {/* Sparkle effect */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </div>

      {/* Brand Name */}
      <div className="relative hidden sm:block">
        <span className="text-2xl font-black bg-linear-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
          ShopHub
        </span>

        {/* Underline animation */}
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
      </div>

      {/* Optional: Beta badge */}
      <span className="hidden lg:block absolute -top-2 -right-8 text-[10px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
        PRO
      </span>
    </Link>
  );
}
