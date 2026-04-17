import { AppleHero } from "@/components/sections/AppleHero"
import { CategoryStrip } from "@/components/sections/CategoryStrip"
import { TrendingTags } from "@/components/sections/TrendingTags"
import { PromoBanner } from "@/components/sections/PromoBanner"
import { ShopTheLook } from "@/components/sections/ShopTheLook"
import { TrustStrip } from "@/components/sections/TrustStrip"
import { FilterBar } from "@/components/product/FilterBar"
import { ProductGrid } from "@/components/product/ProductGrid"
import { MOCK_PRODUCTS } from "@/lib/constants/mockData"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="pb-10">
      <AppleHero />
      <CategoryStrip />
      <TrendingTags />
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-muted-foreground text-sm">Loading products...</div>}>
        <ProductGrid fallbackProducts={MOCK_PRODUCTS} />
      </Suspense>
      <div className="flex justify-center mt-10 mb-6">
        <button className="border border-border px-7 py-2.5 rounded-full text-[13px] font-medium text-foreground hover:bg-secondary transition-colors">
          Load More
        </button>
      </div>
      <PromoBanner />
      <ShopTheLook />
      <TrustStrip />
    </div>
  )
}
