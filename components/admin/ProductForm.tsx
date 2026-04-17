"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/* ─── Zod Schema ─────────────────────────────────────────────────────────── */
export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  price: z.coerce.number().min(1, "Price must be > 0"),
  originalPrice: z.coerce.number().min(1, "Original price must be > 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  material: z.string().optional(),
  careInstructions: z.string().optional(),
  isNew: z.boolean().default(false),
  featured: z.boolean().default(false),
  sizes: z
    .array(z.object({ value: z.string().min(1, "Size cannot be empty") }))
    .min(1, "Add at least one size"),
  images: z
    .array(z.object({ url: z.string().url("Must be a valid URL") }))
    .min(1, "Add at least one image URL"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

/* ─── Flat form values → Convex-ready shape ──────────────────────────────── */
export function toConvexPayload(values: ProductFormValues) {
  return {
    name: values.name,
    slug: values.slug,
    price: values.price,
    originalPrice: values.originalPrice,
    stock: values.stock,
    category: values.category,
    description: values.description,
    material: values.material,
    careInstructions: values.careInstructions,
    isNew: values.isNew,
    featured: values.featured,
    sizes: values.sizes.map((s) => s.value),
    images: values.images.map((i) => i.url),
    colors: [],
  };
}

/* ─── Field helpers ──────────────────────────────────────────────────────── */
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

/* ─── CATEGORIES ─────────────────────────────────────────────────────────── */
const CATEGORIES = [
  "t-shirts",
  "hoodies",
  "joggers",
  "shirts",
  "shorts",
  "caps-and-accessories",
];

/* ─── Main Form ──────────────────────────────────────────────────────────── */
interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save Product",
  isLoading = false,
}: ProductFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      isNew: false,
      featured: false,
      sizes: [{ value: "" }],
      images: [{ url: "" }],
    },
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setValue("slug", slug, { shouldValidate: false });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* ─── Core Info ─── */}
      <section className="space-y-5 rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Core Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Product Name" required error={errors.name?.message}>
            <Input
              {...register("name", { onChange: handleNameChange })}
              placeholder="Essential Heavyweight Tee"
              className="bg-background"
            />
          </FormField>

          <FormField label="Slug (URL)" required error={errors.slug?.message}>
            <Input
              {...register("slug")}
              placeholder="essential-heavyweight-tee"
              className="bg-background font-mono text-sm"
            />
          </FormField>

          <FormField label="Category" required error={errors.category?.message}>
            <select
              {...register("category")}
              className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Description" error={errors.description?.message}>
          <Textarea
            {...register("description")}
            placeholder="Describe the product..."
            rows={3}
            className="bg-background resize-none"
          />
        </FormField>
      </section>

      {/* ─── Pricing & Stock ─── */}
      <section className="space-y-5 rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Pricing & Inventory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField label="Sale Price (₹)" required error={errors.price?.message}>
            <Input
              type="number"
              {...register("price")}
              placeholder="499"
              className="bg-background"
            />
          </FormField>
          <FormField label="Original Price (₹)" required error={errors.originalPrice?.message}>
            <Input
              type="number"
              {...register("originalPrice")}
              placeholder="699"
              className="bg-background"
            />
          </FormField>
          <FormField label="Stock Quantity" required error={errors.stock?.message}>
            <Input
              type="number"
              {...register("stock")}
              placeholder="100"
              className="bg-background"
            />
          </FormField>
        </div>

        <div className="flex items-center gap-8 pt-1">
          <Controller
            control={control}
            name="isNew"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Switch
                  id="isNew"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="isNew" className="text-sm cursor-pointer">
                  Mark as New Arrival
                </Label>
              </div>
            )}
          />
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="featured" className="text-sm cursor-pointer">
                  Featured Product
                </Label>
              </div>
            )}
          />
        </div>
      </section>

      {/* ─── Sizes (Dynamic) ─── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Sizes
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => appendSize({ value: "" })}
            className="gap-1.5 text-xs"
          >
            <PlusCircle className="size-3.5" /> Add Size
          </Button>
        </div>
        {errors.sizes?.root && (
          <FieldError msg={errors.sizes.root.message} />
        )}
        <div className="flex flex-wrap gap-3">
          {sizeFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-1.5">
              <Input
                {...register(`sizes.${index}.value`)}
                placeholder="e.g. S, M, XL"
                className={cn(
                  "w-24 h-9 text-center font-medium bg-background",
                  errors.sizes?.[index]?.value && "border-destructive"
                )}
              />
              {sizeFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Images (Dynamic) ─── */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Image URLs
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => appendImage({ url: "" })}
            className="gap-1.5 text-xs"
          >
            <PlusCircle className="size-3.5" /> Add Image
          </Button>
        </div>
        {errors.images?.root && (
          <FieldError msg={errors.images.root.message} />
        )}
        <div className="space-y-3">
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                {...register(`images.${index}.url`)}
                placeholder="https://images.unsplash.com/..."
                className={cn(
                  "flex-1 bg-background text-sm font-mono",
                  errors.images?.[index]?.url && "border-destructive"
                )}
              />
              {imageFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
              <FieldError msg={errors.images?.[index]?.url?.message} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Material & Care ─── */}
      <section className="space-y-5 rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Material & Care
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Material" error={errors.material?.message}>
            <Input
              {...register("material")}
              placeholder="100% Organic Cotton, 240 GSM"
              className="bg-background"
            />
          </FormField>
          <FormField label="Care Instructions" error={errors.careInstructions?.message}>
            <Input
              {...register("careInstructions")}
              placeholder="Machine wash cold, tumble dry low"
              className="bg-background"
            />
          </FormField>
        </div>
      </section>

      {/* ─── Submit ─── */}
      <div className="flex justify-end gap-3 pb-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="min-w-[140px] bg-foreground text-background hover:bg-foreground/85"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
