import { Suspense } from "react";
import { CategoryProductsClient } from "@/components/product/CategoryProductsClient";

interface CategoryPageProps {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { name } = await params;
  const categoryName = name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-background">
      {/* Category hero */}
      <div className="px-6 py-10 md:py-14 border-b border-border bg-secondary/30">
        <div className="max-w-[1400px] xl:mx-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">{categoryName}</h1>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-8 h-8 border-4 border-secondary border-t-foreground rounded-full animate-spin" />
          </div>
        }
      >
        <CategoryProductsClient categorySlug={name} categoryName={categoryName} />
      </Suspense>
    </div>
  );
}
