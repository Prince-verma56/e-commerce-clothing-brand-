"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm, toConvexPayload, type ProductFormValues } from "@/components/admin/ProductForm";
import type { Id } from "@/convex/_generated/dataModel";

export default function AdminEditProductPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const product = useQuery(api.products.getBySlug, { slug: params.slug });
  const updateProduct = useMutation(api.products.update);
  const [isLoading, setIsLoading] = useState(false);

  if (product === undefined) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-secondary border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
        <p className="text-foreground font-semibold">Product not found.</p>
        <Link href="/admin/products" className="text-sm text-muted-foreground hover:text-foreground underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  // Map Convex product → ProductFormValues
  const defaultValues: ProductFormValues = {
    name: product.name,
    slug: product.slug,
    price: product.price,
    originalPrice: product.originalPrice,
    stock: product.stock,
    category: product.category,
    description: product.description ?? "",
    material: product.material ?? "",
    careInstructions: product.careInstructions ?? "",
    isNew: product.isNew,
    featured: product.featured,
    sizes: product.sizes.map((s) => ({ value: s })),
    images: product.images.map((u) => ({ url: u })),
  };

  const handleSubmit = async (values: ProductFormValues) => {
    setIsLoading(true);
    try {
      const payload = toConvexPayload(values);
      await updateProduct({ id: product._id as Id<"products">, ...payload });
      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <div className="flex items-center gap-3 py-6">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Edit Product</h1>
          <p className="text-xs text-muted-foreground truncate max-w-[400px]">{product.name}</p>
        </div>
      </div>

      <ProductForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        isLoading={isLoading}
      />
    </div>
  );
}
