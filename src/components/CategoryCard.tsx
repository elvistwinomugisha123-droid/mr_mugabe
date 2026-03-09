"use client";

import Link from "next/link";
import { Signal, Wifi, Phone, PhoneCall, Router } from "lucide-react";
import type { Category } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  signal: <Signal className="w-8 h-8" />,
  wifi: <Wifi className="w-8 h-8" />,
  phone: <Phone className="w-8 h-8" />,
  "phone-call": <PhoneCall className="w-8 h-8" />,
  router: <Router className="w-8 h-8" />,
};

const colorMap: Record<string, string> = {
  red: "bg-red-50 border-red-200 text-red-700",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
  blue: "bg-blue-50 border-blue-200 text-blue-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
};

export default function CategoryCard({ category }: { category: Category }) {
  const totalBundles = category.subcategories.reduce(
    (sum, sub) => sum + sub.bundles.filter((b) => b.active).length,
    0
  );

  return (
    <Link href={`/services/${category.id}`}>
      <div
        className={`border-2 rounded-xl p-5 flex items-center gap-4 transition-all active:scale-[0.98] ${
          colorMap[category.color] || "bg-gray-50 border-gray-200 text-gray-700"
        }`}
      >
        <div className="shrink-0">
          {iconMap[category.icon] || <Signal className="w-8 h-8" />}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-base">{category.name}</h3>
          <p className="text-sm opacity-75">
            {totalBundles} bundle{totalBundles !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>
    </Link>
  );
}
