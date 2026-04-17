"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable, type TableConfig } from "@/components/sidebar/data-table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Edit, Trash, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel";

type ProductRow = {
  _id: string;
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  isNew: boolean;
};

export default function AdminProductsPage() {
  const router = useRouter();
  const products = useQuery(api.products.list, {});
  const deleteProduct = useMutation(api.products.remove);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct({ id: id as Id<"products"> });
      toast.success(`"${name}" deleted.`);
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  if (products === undefined) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse p-6">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-[400px] w-full bg-muted rounded-xl" />
      </div>
    );
  }

  const data: ProductRow[] = products.map((p) => ({
    _id: p._id,
    id: p._id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    stock: p.stock,
    image: p.images[0] || "",
    isNew: p.isNew,
  }));

  const config: TableConfig<ProductRow> = {
    title: "Products Inventory",
    description: "Manage your store's product catalog and stock levels.",
    searchKey: "name",
    searchPlaceholder: "Search products by name...",
    columns: [
      {
        key: "image",
        header: "Image",
        sortable: false,
        cell: (row) => (
          <div className="relative size-10 rounded overflow-hidden border border-border bg-muted">
            {row.image ? (
              <Image src={row.image} alt={row.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                No img
              </div>
            )}
          </div>
        ),
      },
      {
        key: "name",
        header: "Product Name",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{row.name}</span>
            {row.isNew && (
              <span className="text-[10px] text-emerald-500 font-bold uppercase">New Arrival</span>
            )}
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        cell: (row) => (
          <Badge variant="secondary" className="capitalize">
            {row.category.replace(/-/g, " ")}
          </Badge>
        ),
      },
      {
        key: "price",
        header: "Price",
        cell: (row) => (
          <span className="font-semibold text-foreground">₹{row.price.toLocaleString("en-IN")}</span>
        ),
      },
      {
        key: "stock",
        header: "Stock",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <div
              className={`size-2 rounded-full ${
                row.stock > 10
                  ? "bg-emerald-500"
                  : row.stock > 0
                  ? "bg-amber-500"
                  : "bg-destructive"
              }`}
            />
            <span
              className={
                row.stock === 0 ? "text-destructive font-medium" : "text-muted-foreground"
              }
            >
              {row.stock > 0 ? `${row.stock} in stock` : "Out of stock"}
            </span>
          </div>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        sortable: false,
        cell: (row) => (
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-foreground hover:bg-secondary"
              title="Edit"
              onClick={() => router.push(`/admin/products/${row.slug}/edit`)}
            >
              <Edit className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Delete"
              onClick={() => handleDelete(row._id, row.name)}
            >
              <Trash className="size-3.5" />
            </Button>
          </div>
        ),
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 pb-10">
      <div className="flex items-center justify-between pt-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {products.length} product{products.length !== 1 ? "s" : ""} in catalog
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2 bg-foreground text-background hover:bg-foreground/85">
            <PlusCircle className="size-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <DataTable config={config} data={data} />
    </div>
  );
}
