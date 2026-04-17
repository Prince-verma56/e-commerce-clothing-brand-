import type { Product } from "@/types/product";
import type { Doc } from "@/convex/_generated/dataModel";

export function normalizeProduct(product: Doc<"products">): Product {
  return {
    id: product._id,
    slug: product.slug,
    name: product.name,
    brand: "Himanshi",
    price: product.price,
    originalPrice: product.originalPrice,
    discount:
      product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0,
    badge: product.isNew ? "NEW" : undefined,
    badgeVariant: product.isNew ? "new" : undefined,
    colors: product.colors ?? [],
    bgColor: "#f3f4f6",
    category: product.category,
    isNew: product.isNew,
    inWishlist: false,
    images: product.images,
    description: product.description,
    sizes: product.sizes,
  };
}
