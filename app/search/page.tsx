import { Suspense } from "react";
import { CategoryProductsClient } from "@/components/product/CategoryProductsClient";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-6 py-10 md:py-12 border-b border-border bg-secondary/30">
        <div className="max-w-[1400px] xl:mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">Search Results</h1>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-8 h-8 border-4 border-secondary border-t-foreground rounded-full animate-spin" />
          </div>
        }
      >
        {/* Reuses CategoryProductsClient without a category filter so it searches everything */}
        <CategoryProductsClient categorySlug="all" categoryName="all products" />
      </Suspense>
    </div>
  );
}
