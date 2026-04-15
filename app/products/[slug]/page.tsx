import { ProductDetailClient } from "@/components/product/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-background">
      <ProductDetailClient slug={slug} />
    </div>
  );
}
