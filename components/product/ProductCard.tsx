"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { formatPrice, getDiscountPercent } from "@/lib/utils/formatPrice"
import { useWishlistStore } from "@/store/wishlistStore"
import type { Product } from "@/types/product"
import { PriceBadge } from "./PriceBadge"
import { ColorSwatch } from "./ColorSwatch"
import { cn } from "@/lib/utils/cn"

export function ProductCard({ product }: { product: Product }) {
  const toggle = useWishlistStore(s => s.toggle)
  const isWishlisted = useWishlistStore(s => s.isWishlisted(product.id))

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product)
  }

  // Use DB images if available, fallback to mock data layout logic
  const primaryImage = product.images?.[0] || ""
  const secondaryImage = product.images?.[1] || primaryImage

  return (
    <Link href={`/products/${product.slug}`} className="group block bg-background">
      {/* Image Area */}
      <div 
        className={cn(
          "relative aspect-3/4 w-full overflow-hidden flex items-center justify-center transition-all duration-500 bg-secondary/30",
          !primaryImage && "p-4"
        )}
        style={{ backgroundColor: !primaryImage ? product.bgColor : undefined }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-0" />
        
        {primaryImage ? (
          <>
            <Image 
              src={primaryImage} 
              alt={product.name} 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover transition-opacity duration-500 z-0",
                secondaryImage && "group-hover:opacity-0"
              )} 
              priority={false}
            />
            {secondaryImage && (
              <Image 
                src={secondaryImage} 
                alt={`${product.name} alternate`} 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0 scale-105 group-hover:scale-100" 
              />
            )}
          </>
        ) : (
          <div className="w-3/5 h-72 rounded-md bg-black/10 z-0 shadow-sm transition-transform duration-700 group-hover:scale-105" />
        )}

        {(product.badge || product.badgeVariant || product.isNew) && (
          <div className="absolute top-2 left-2 z-10">
            <PriceBadge variant={product.badgeVariant || (product.isNew ? 'new' : undefined)} label={product.badge || (product.isNew ? 'NEW' : '')} />
          </div>
        )}
        
        <button 
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-muted-foreground hover:text-red-600 transition-all hover:scale-110 active:scale-95"
        >
          <Heart 
            className={cn("w-4 h-4 transition-colors", isWishlisted && "fill-red-600 text-red-600")} 
          />
        </button>
      </div>

      {/* Info Area */}
      <div className="p-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
          {product.brand || product.category}
        </h4>
        <h3 className="line-clamp-2 text-xs leading-snug font-medium text-foreground mb-2 group-hover:text-muted-foreground transition-colors h-9">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2 text-sm">
          <span className="font-bold">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-muted-foreground line-through text-xs">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-red-600 text-xs font-bold bg-red-50 px-1 py-0.5 rounded-sm">
                {getDiscountPercent(product.originalPrice, product.price)}% OFF
              </span>
            </>
          )}
        </div>
        
        {product.colors && product.colors.length > 0 && <ColorSwatch colors={product.colors} />}
      </div>
    </Link>
  )
}
