"use client"
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

interface CategorySectionProps {
  categories: Category[];
  title?: string;
  subtitle?: string;
}

export function CategorySection({
  categories,
  title = "Browse Categories",
  subtitle = "Explore our premium collections",
}: CategorySectionProps) {
  const activeCategories = categories?.filter((cat) => cat.isActive) || [];
  console.log(categories,"fdsfad")
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-900 dark:text-white">
              {title.split(" ")[0]}
            </span>
            <span className="bg-linear-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {" " + title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {activeCategories.map((category) => (
            <a
              key={category._id}
              href={`/category/${category.slug}`}
              className="group"
            >
              <Card className="h-full border-2 border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                  {/* Icon Container */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20 flex items-center justify-center transition-all duration-300">
                      {/* Icon with fallback */}
                      {category.icon ? (
                        <Image
                          src={category.icon}
                          alt={category.name}
                          width={30}
                          height={30}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              category.name
                            )}&background=8b5cf6&color=fff&bold=true&size=128`;
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                          {category.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Hover Effect Ring */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-300 dark:group-hover:border-purple-500 transition-all duration-500" />
                  </div>

                  {/* Category Name */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                      {category.name}
                    </h3>

                    {/* View Arrow (appears on hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {(!activeCategories || activeCategories.length === 0) && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-r from-purple-500/10 to-blue-500/10 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                <span className="text-2xl">📁</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No categories available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Categories will appear here once they are added
            </p>
          </div>
        )}

        {/* View All Button */}
        {activeCategories.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="/categories"
              className="inline-flex items-center px-6 py-3 rounded-full bg-linear-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 group"
            >
              View All Categories
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-purple-400/5 via-blue-400/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/5 via-blue-400/5 to-transparent rounded-full blur-3xl" />
      </div>
    </section>
  );
}
