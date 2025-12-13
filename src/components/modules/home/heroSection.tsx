"use client";

import {
  ArrowRight,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Lock,
  Cpu,
  Sparkles,
  Users,
  Rocket,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Hero() {
  const features = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Available in 150+ countries with local support",
      color: "from-blue-500 to-cyan-500",
      metric: "150+",
    },
    {
      icon: Lock,
      title: "Military-Grade Security",
      description: "AES-256 encryption & GDPR compliant",
      color: "from-emerald-500 to-green-500",
      metric: "100% Safe",
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Smart algorithms for personalized experience",
      color: "from-violet-500 to-purple-500",
      metric: "24/7 AI",
    },
    {
      icon: Sparkles,
      title: "Premium Support",
      description: "24/7 dedicated customer success team",
      color: "from-amber-500 to-orange-500",
      metric: "5-min Response",
    },
  ];

  const stats = [
    {
      value: "50K+",
      label: "Active Users",
      icon: Users,
      color: "from-blue-600 to-purple-600",
    },
    {
      value: "4.9/5",
      label: "User Rating",
      icon: Star,
      color: "from-amber-600 to-orange-600",
    },
    {
      value: "99.9%",
      label: "Uptime",
      icon: Shield,
      color: "from-emerald-600 to-green-600",
    },
    {
      value: "2.5M+",
      label: "Projects",
      icon: Rocket,
      color: "from-violet-600 to-pink-600",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-green-400/20 via-green-400/20 to-transparent dark:from-purple-600/10 dark:via-blue-600/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-green-400/20 via-green-400/20 to-transparent dark:from-indigo-600/10 dark:via-cyan-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-violet-400/10 via-fuchsia-400/10 to-transparent dark:from-violet-600/5 dark:via-fuchsia-600/5 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Grid dots pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#8882_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-4 py-2 text-sm font-medium hover:shadow-lg transition-shadow">
                <Zap className="w-3 h-3 mr-2 inline" />
                Featured Launch 2024
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm border-2 border-purple-200 dark:border-purple-800"
              >
                <Award className="w-3 h-3 mr-2 inline text-amber-500" />
                Award Winning
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-slate-900 dark:text-white">Next-Gen</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Digital Platform
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Experience the future with our intelligent platform combining
                cutting-edge technology with unparalleled user experience. Built
                for scale, designed for you.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Watch Demo
              </Button>
            </div>

            {/* Enhanced Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="relative p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:-translate-y-1">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-3`}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                    <div className="mt-2 text-sm font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      {feature.metric}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Enhanced Feature Grid */}
          <div className="relative h-[600px] hidden lg:block animate-fade-in-up animation-delay-200">
            {/* Main Card */}
            <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md transform hover:scale-[1.02] transition-all duration-500 shadow-2xl border-0 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-xl mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Enterprise-Ready Platform
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Scalable solutions trusted by Fortune 500 companies. Get
                  started with our comprehensive suite of tools.
                </p>

                {/* Progress bars */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 dark:text-slate-300">
                        Performance
                      </span>
                      <span className="font-semibold text-blue-600">98%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: "98%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 dark:text-slate-300">
                        User Satisfaction
                      </span>
                      <span className="font-semibold text-purple-600">96%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: "96%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon
                          className={`w-4 h-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                        />
                        <div className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Explore Enterprise Features
                </Button>
              </CardContent>
            </Card>

            {/* Floating cards around main card */}
            {[
              {
                title: "API Integration",
                description: "REST & GraphQL APIs",
                icon: Cpu,
                color: "from-cyan-500 to-blue-500",
                position: "top-8 left-8",
              },
              {
                title: "Real-Time Analytics",
                description: "Live dashboard",
                icon: TrendingUp,
                color: "from-emerald-500 to-green-500",
                position: "top-8 right-8",
              },
              {
                title: "Multi-Cloud",
                description: "AWS, GCP, Azure",
                icon: Globe,
                color: "from-amber-500 to-orange-500",
                position: "bottom-8 left-8",
              },
              {
                title: "Compliance",
                description: "SOC2, ISO 27001",
                icon: Shield,
                color: "from-violet-500 to-purple-500",
                position: "bottom-8 right-8",
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`absolute ${
                  card.position
                } animate-float animation-delay-${index * 1000}`}
              >
                <Card className="w-56 transform hover:scale-105 transition-all duration-300 shadow-xl border-0 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
                  <CardContent className="p-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg mb-3`}
                    >
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">
            Trusted by innovative teams worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center opacity-60">
            {[
              "TechCorp",
              "Innovate Inc",
              "Digital Solutions",
              "CloudNine",
              "Future Labs",
              "Nexus AI",
            ].map((company, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
