"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { use } from "react";

const SIZES_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Price required"),
  originalPrice: z.coerce.number().min(0),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().min(0),
  material: z.string().optional(),
  careInstructions: z.string().optional(),
  isNew: z.boolean().default(false),
  featured: z.boolean().default(false),
  images: z.array(z.object({ url: z.string().url("Must be a valid URL") })).min(1, "Add at least 1 image"),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
});

type FormValues = z.infer<typeof schema>;

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const updateProduct = useMutation(api.products.update);
  const product = useQuery(api.products.getById, { id: id as Id<"products"> });
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isNew: false,
      featured: false,
      stock: 100,
      images: [{ url: "" }],
      sizes: ["S", "M", "L", "XL"],
    },
  });

  // Pre-fill form when product data loads
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        slug: product.slug,
        description: product.description ?? "",
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        stock: product.stock,
        material: product.material ?? "",
        careInstructions: product.careInstructions ?? "",
        isNew: product.isNew,
        featured: product.featured,
        images: product.images.length > 0
          ? product.images.map((url) => ({ url }))
          : [{ url: "" }],
        sizes: product.sizes,
      });
    }
  }, [product, reset]);

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images",
  });

  const selectedSizes = watch("sizes") ?? [];

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setValue("sizes", selectedSizes.filter((s) => s !== size));
    } else {
      setValue("sizes", [...selectedSizes, size]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await updateProduct({
        id: id as Id<"products">,
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        originalPrice: data.originalPrice || data.price,
        images: data.images.map((i) => i.url).filter(Boolean),
        category: data.category.toLowerCase().replace(/\s+/g, "-"),
        sizes: data.sizes,
        isNew: data.isNew,
        stock: data.stock,
        featured: data.featured,
        material: data.material,
        careInstructions: data.careInstructions,
      });
      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ic = "w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-muted-foreground";
  const lc = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";
  const ec = "text-red-500 text-xs mt-1";
  const sc = "bg-card border border-border rounded-xl p-6 space-y-4";
  const sh = "font-semibold text-foreground text-sm";

  if (product === undefined) {
    return (
      <div className="flex items-center justify-center h-64 gap-3 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading product...
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground font-medium">Product not found.</p>
        <Link href="/admin/products" className="text-indigo-500 text-sm mt-2 inline-block hover:underline">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/products" className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
          <p className="text-sm text-muted-foreground">Update the details for <strong className="text-foreground">{product.name}</strong></p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <section className={sc}>
          <h2 className={sh}>Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={lc}>Product Name *</label>
              <input {...register("name")} className={ic} />
              {errors.name && <p className={ec}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={lc}>Slug *</label>
              <input {...register("slug")} className={ic} />
            </div>
            <div>
              <label className={lc}>Category *</label>
              <input {...register("category")} className={ic} />
              {errors.category && <p className={ec}>{errors.category.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className={lc}>Description</label>
              <textarea {...register("description")} rows={3} className={`${ic} resize-none`} />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className={sc}>
          <h2 className={sh}>Pricing & Inventory</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={lc}>Selling Price (₹) *</label>
              <input {...register("price")} type="number" className={ic} />
              {errors.price && <p className={ec}>{errors.price.message}</p>}
            </div>
            <div>
              <label className={lc}>Original Price (₹)</label>
              <input {...register("originalPrice")} type="number" className={ic} />
            </div>
            <div>
              <label className={lc}>Stock *</label>
              <input {...register("stock")} type="number" className={ic} />
            </div>
          </div>
        </section>

        {/* Images */}
        <section className={sc}>
          <h2 className={sh}>Product Images</h2>
          <div className="space-y-3">
            {imageFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`images.${index}.url`)}
                  className={`${ic} flex-1`}
                  placeholder="https://images.unsplash.com/..."
                />
                {imageFields.length > 1 && (
                  <button type="button" onClick={() => removeImage(index)} className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.images && <p className={ec}>Add at least one valid image URL.</p>}
          </div>
          <button type="button" onClick={() => appendImage({ url: "" })} className="flex items-center gap-2 text-indigo-500 text-sm font-medium hover:text-indigo-400 transition-colors">
            <Plus className="w-4 h-4" /> Add another image
          </button>
        </section>

        {/* Sizes */}
        <section className={sc}>
          <h2 className={sh}>Available Sizes *</h2>
          <div className="flex flex-wrap gap-2">
            {SIZES_OPTIONS.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  selectedSizes.includes(size)
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-background border-border text-foreground hover:border-indigo-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.sizes && <p className={ec}>Select at least one size.</p>}
        </section>

        {/* Material  */}
        <section className={sc}>
          <h2 className={sh}>Material & Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={lc}>Material</label>
              <input {...register("material")} className={ic} placeholder="100% Organic Cotton" />
            </div>
            <div>
              <label className={lc}>Care Instructions</label>
              <input {...register("careInstructions")} className={ic} placeholder="Machine wash cold..." />
            </div>
          </div>
        </section>

        {/* Flags */}
        <section className={sc}>
          <h2 className={`${sh} mb-4`}>Publish Settings</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" {...register("isNew")} className="w-4 h-4 rounded accent-indigo-600" />
              <span className="text-sm font-medium text-foreground">Mark as New Arrival</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" {...register("featured")} className="w-4 h-4 rounded accent-indigo-600" />
              <span className="text-sm font-medium text-foreground">Feature on Homepage</span>
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3 pb-8">
          <Link href="/admin/products" className="px-5 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
