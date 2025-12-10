// app/loading.tsx  or components/Loading.tsx

import { ShoppingBag } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        {/* Animated Shopping Bag with Pulse */}
        <div className="relative mx-auto mb-8 w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
            <ShoppingBag className="h-12 w-12 text-primary animate-bounce " />
          </div>
        </div>

        {/* Smooth Text Animation */}
        <h2 className="mb-3 text-2xl font-bold text-gray-800">
          Loading your store
        </h2>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Finding the best deals for you...
        </p>
      </div>
    </div>
  );
}
