"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm, toConvexPayload, type ProductFormValues } from "@/components/admin/ProductForm";

export default function AdminNewProductPage() {
  const router = useRouter();
  const createProduct = useMutation(api.products.create);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: ProductFormValues) => {
    setIsLoading(true);
    try {
      const payload = toConvexPayload(values);
      await createProduct(payload);
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create product. Please try again.");
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
          <h1 className="text-xl font-bold text-foreground">Add New Product</h1>
          <p className="text-xs text-muted-foreground">Fill in the details below to list a new product.</p>
        </div>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        submitLabel="Create Product"
        isLoading={isLoading}
      />
    </div>
  );
}
