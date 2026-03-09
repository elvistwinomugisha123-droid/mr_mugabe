"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Bundle } from "@/lib/types";

export default function BundleCard({
  bundle,
  categoryId,
}: {
  bundle: Bundle;
  categoryId: string;
}) {
  return (
    <Link href={`/order/${bundle.id}?cat=${categoryId}`}>
      <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-3 transition-all active:scale-[0.98] hover:border-accent hover:shadow-sm">
        <div className="min-w-0">
          <h4 className="font-bold text-foreground">{bundle.name}</h4>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {bundle.validity}
            </span>
            {bundle.notes && (
              <span className="text-xs bg-accent/20 text-foreground px-2 py-0.5 rounded-full">
                {bundle.notes}
              </span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-accent text-lg">
            {formatPrice(bundle.price_ugx)}
          </p>
        </div>
      </div>
    </Link>
  );
}
