"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

const SIZES_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Price required"),
  originalPrice: z.coerce.number().min(1, "Original price required"),
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

export default function NewProductPage() {
  const router = useRouter();
  const createProduct = useMutation(api.products.create);
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isNew: true,
      featured: false,
      stock: 100,
      originalPrice: 0,
      images: [{ url: "" }],
      sizes: ["S", "M", "L", "XL"],
    },
  });

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
      await createProduct({
        name: data.name,
        slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
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
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to create product. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all placeholder:text-muted-foreground";
  const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";
  const errorCls = "text-red-500 text-xs mt-1";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/products" className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Product</h1>
          <p className="text-sm text-muted-foreground">Fill in the details to create a new product listing.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-sm">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelCls}>Product Name *</label>
              <input {...register("name")} className={inputCls} placeholder="e.g. Premium Fleece Pullover Hoodie" />
              {errors.name && <p className={errorCls}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Slug (auto-generated if empty)</label>
              <input {...register("slug")} className={inputCls} placeholder="premium-fleece-hoodie" />
            </div>
            <div>
              <label className={labelCls}>Category *</label>
              <input {...register("category")} className={inputCls} placeholder="t-shirts, hoodies, pants..." />
              {errors.category && <p className={errorCls}>{errors.category.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea {...register("description")} rows={3} className={`${inputCls} resize-none`} placeholder="Describe the product, its feel, and style..." />
            </div>
          </div>
        </section>

        {/* Pricing & Stock */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-sm">Pricing & Inventory</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Selling Price (₹) *</label>
              <input {...register("price")} type="number" className={inputCls} placeholder="899" />
              {errors.price && <p className={errorCls}>{errors.price.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Original Price (₹)</label>
              <input {...register("originalPrice")} type="number" className={inputCls} placeholder="1299" />
            </div>
            <div>
              <label className={labelCls}>Stock Quantity *</label>
              <input {...register("stock")} type="number" className={inputCls} placeholder="100" />
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-sm">Product Images</h2>
          <div className="space-y-3">
            {imageFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`images.${index}.url`)}
                  className={`${inputCls} flex-1`}
                  placeholder={`https://images.unsplash.com/photo-xxx?w=800`}
                />
                {imageFields.length > 1 && (
                  <button type="button" onClick={() => removeImage(index)} className="p-2.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.images && <p className={errorCls}>{errors.images.message || errors.images[0]?.url?.message}</p>}
          </div>
          <button
            type="button"
            onClick={() => appendImage({ url: "" })}
            className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add another image
          </button>
        </section>

        {/* Sizes */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-sm">Available Sizes *</h2>
          <div className="flex flex-wrap gap-2">
            {SIZES_OPTIONS.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  selectedSizes.includes(size)
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                    : "bg-background border-border text-foreground hover:border-indigo-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.sizes && <p className={errorCls}>Please select at least one size.</p>}
        </section>

        {/* Material & Care */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground text-sm">Material & Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Material</label>
              <input {...register("material")} className={inputCls} placeholder="100% Organic Cotton" />
            </div>
            <div>
              <label className={labelCls}>Care Instructions</label>
              <input {...register("careInstructions")} className={inputCls} placeholder="Machine wash cold, tumble dry low" />
            </div>
          </div>
        </section>

        {/* Flags */}
        <section className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-800 text-sm mb-4">Publish Settings</h2>
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

        {/* Actions */}
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
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
