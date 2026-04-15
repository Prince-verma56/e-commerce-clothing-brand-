"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { Ghost, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

const SORT_OPTIONS = [
  { label: "Newest First", value: "new" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

interface CategoryProductsClientProps {
  categorySlug: string;
  categoryName: string;
}

export function CategoryProductsClient({ categorySlug, categoryName }: CategoryProductsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchQuery = searchParams.get("q")?.toLowerCase() ?? "";
  const sortParam = searchParams.get("sort") ?? "new";

  const [sortOpen, setSortOpen] = React.useState(false);

  const rawProducts = useQuery(api.products.list, {
    category: categorySlug === "all" ? undefined : categorySlug,
  });

  const filtered = React.useMemo(() => {
    let list = (rawProducts ?? []) as Product[];
    if (searchQuery) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          (p.description ?? "").toLowerCase().includes(searchQuery)
      );
    }
    if (sortParam === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortParam === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortParam === "new") list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return list;
  }, [rawProducts, searchQuery, sortParam]);

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
    setSortOpen(false);
  };

  const clearFilters = () => router.push(pathname);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortParam)?.label ?? "Sort";

  return (
    <div>
      {/* Controls bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-white/80 backdrop-blur-sm sticky top-16 z-30">
        <p className="text-sm text-muted-foreground">
          {rawProducts === undefined ? (
            "Loading..."
          ) : (
            <span>
              <strong className="text-foreground font-semibold">{filtered.length}</strong>{" "}
              product{filtered.length !== 1 ? "s" : ""}
              {searchQuery && <span> for "<em>{searchQuery}</em>"</span>}
            </span>
          )}
        </p>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 text-sm font-medium border border-border px-3 py-1.5 rounded-full hover:border-foreground transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {currentSortLabel}
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", sortOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-50 min-w-[170px]"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSort(opt.value)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors",
                        sortParam === opt.value && "font-semibold text-foreground"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Product grid or empty state */}
      <div className="px-6 py-8 max-w-[1400px] xl:mx-auto">
        {rawProducts === undefined ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-secondary rounded-lg mb-3" />
                <div className="h-3 bg-secondary rounded w-3/4 mb-2" />
                <div className="h-3 bg-secondary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
              <Ghost className="w-10 h-10 text-muted-foreground opacity-40" />
            </div>
            <h2 className="font-serif text-2xl text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}" in ${categoryName}.`
                : `No products are currently available in ${categoryName}.`}
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] border border-border rounded-lg overflow-hidden bg-border"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={(product as any)._id ?? product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
