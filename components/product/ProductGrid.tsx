"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "./ProductCard"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Product } from "@/types/product"
import { Spinner } from "@/components/ui/Spinner"

interface ProductGridProps {
  categorySlug?: string;
  fallbackProducts?: Product[];
}

export function ProductGrid({ categorySlug, fallbackProducts }: ProductGridProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams?.get("q")?.toLowerCase() || ""
  const categoryFilter = searchParams?.get("category") || categorySlug

  // Pass undefined for "all" so Convex returns everything
  const convexCategory = (!categoryFilter || categoryFilter === "all") ? undefined : categoryFilter

  const dbProducts = useQuery(api.products.list, { 
    category: convexCategory
  });

  const finalProducts = (dbProducts || fallbackProducts || []) as Product[];

  const filteredProducts = React.useMemo(() => {
    let products = finalProducts

    // Client-side filter for special values not in Convex index
    if (categoryFilter === "under-599") {
      products = products.filter(p => p.price < 599)
    } else if (categoryFilter === "new-arrivals") {
      products = products.filter(p => p.isNew)
    } else if (categoryFilter === "oversized") {
      products = products.filter(p => 
        p.name.toLowerCase().includes("oversized") || 
        p.name.toLowerCase().includes("drop shoulder")
      )
    }

    // Text search filter
    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery) ||
        (p.description && p.description.toLowerCase().includes(searchQuery))
      )
    }

    return products
  }, [finalProducts, categoryFilter, searchQuery])

  if (dbProducts === undefined && !fallbackProducts) {
    return (
      <div className="py-20 flex justify-center text-muted-foreground">
        <Spinner />
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="py-20 text-center text-muted-foreground"
      >
        No products found{searchQuery && ` matching "${searchQuery}"`}.
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mx-6 border border-border rounded-lg overflow-hidden bg-border max-w-[1400px] xl:mx-auto"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px]">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.div>
  )
}
