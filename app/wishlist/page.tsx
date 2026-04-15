"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { items, toggle } = useWishlistStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="border-b border-border bg-secondary/30 px-6 py-10 md:py-14">
        <div className="max-w-[1400px] xl:mx-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Your Collection</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground flex items-center gap-3">
              Wishlist
              {items.length > 0 && (
                <span className="text-lg font-sans font-normal text-muted-foreground">
                  ({items.length} item{items.length !== 1 ? "s" : ""})
                </span>
              )}
            </h1>
          </div>
          {items.length > 0 && (
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-[1400px] xl:mx-auto px-6 py-10">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-8 border border-border">
              <Heart className="w-10 h-10 text-muted-foreground opacity-40" />
            </div>
            <h2 className="font-serif text-3xl text-foreground mb-3">Your wishlist is empty</h2>
            <p className="text-muted-foreground max-w-sm mb-10 text-sm leading-relaxed">
              You haven't saved any items yet. Browse our collection and tap the heart icon to start building your wishlist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-semibold rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] border border-border rounded-lg overflow-hidden bg-border"
          >
            <AnimatePresence>
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
