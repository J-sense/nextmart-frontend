"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] rounded-xl flex items-center overflow-hidden bg-white">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 animate-pulse-slow opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(102,126,234,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(118,75,162,0.08),transparent_50%)]" />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-24 h-24 bg-purple-100/50 rounded-full animate-float-random" />
        <div className="absolute top-[60%] right-[10%] w-36 h-36 bg-indigo-100/50 rounded-full animate-float-random-delayed" />
        <div className="absolute bottom-[20%] left-[20%] w-20 h-20 bg-violet-100/50 rounded-full animate-float-random-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center z-10 py-20">
        {/* Left content */}
        <div className="animate-slide-in-left">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium mb-6 animate-fade-in shadow-lg">
            <Sparkles className="w-4 h-4 animate-sparkle" />
            Limited Time Offer
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-delayed">
            Discover Your
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Perfect Style
            </span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-10 animate-fade-in-more-delayed">
            Explore our curated collection of premium products designed to
            elevate your lifestyle. Quality meets affordability in every piece.
          </p>

          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-most-delayed">
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:-translate-y-1 transition-all duration-300 shadow-md">
              View Collections
            </button>
          </div>

          <div className="flex gap-8 animate-fade-in-final">
            <div>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-sm text-gray-500 mt-1">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-gray-500 mt-1">Products</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                4.9★
              </div>
              <div className="text-sm text-gray-500 mt-1">Rating</div>
            </div>
          </div>
        </div>

        {/* Right content - Product cards */}
        <div className="relative h-[600px] animate-slide-in-right hidden md:block">
          {/* Card 1 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 rotate-[-6deg] hover:rotate-0 hover:scale-105 transition-all duration-300 z-30 animate-float">
            <div className="w-full h-52 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl mb-4 flex items-center justify-center text-6xl shadow-lg">
              👕
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Premium Tee
            </h3>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              $29.99
            </p>
          </div>

          {/* Card 2 */}
          <div className="absolute top-[45%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 rotate-[8deg] hover:rotate-0 hover:scale-105 transition-all duration-300 z-20 animate-float-delayed">
            <div className="w-full h-52 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl mb-4 flex items-center justify-center text-6xl shadow-lg">
              👟
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Sport Sneakers
            </h3>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              $89.99
            </p>
          </div>

          {/* Card 3 */}
          <div className="absolute top-[55%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 animate-float-slow">
            <div className="w-full h-52 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl mb-4 flex items-center justify-center text-6xl shadow-lg">
              🎒
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Urban Backpack
            </h3>
            <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              $49.99
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0) rotate(-6deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px) rotate(-6deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0) rotate(8deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px) rotate(8deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0) rotate(-3deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px) rotate(-3deg);
          }
        }

        @keyframes float-random {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.2s both;
        }

        .animate-fade-in-delayed {
          animation: fade-in 1s ease-out 0.4s both;
        }

        .animate-fade-in-more-delayed {
          animation: fade-in 1s ease-out 0.6s both;
        }

        .animate-fade-in-most-delayed {
          animation: fade-in 1s ease-out 0.8s both;
        }

        .animate-fade-in-final {
          animation: fade-in 1s ease-out 1s both;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 1s;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite 2s;
        }

        .animate-float-random {
          animation: float-random 15s ease-in-out infinite;
        }

        .animate-float-random-delayed {
          animation: float-random 15s ease-in-out infinite 2s;
        }

        .animate-float-random-slow {
          animation: float-random 15s ease-in-out infinite 4s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .shadow-3xl {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}
