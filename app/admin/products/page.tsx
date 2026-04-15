"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/utils/formatPrice";
import Link from "next/link";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const products = useQuery(api.products.list, {});
  const removeProduct = useMutation(api.products.remove);

  const handleDelete = async (id: any, name: string) => {
    if (confirm(`Delete "${name}" permanently?`)) {
      await removeProduct({ id });
      toast.success(`"${name}" deleted.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {products ? `${products.length} product${products.length !== 1 ? "s" : ""} total` : "Loading..."}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {products === undefined ? (
          <div className="py-20 flex items-center justify-center gap-3 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-border border-t-indigo-500 rounded-full animate-spin" />
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <Package className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-foreground font-medium">No products yet</p>
            <p className="text-muted-foreground text-sm mt-1 mb-6">Add your first product to start selling.</p>
            <Link href="/admin/products/new" className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  {["Product", "Category", "Price", "Stock", "Tags", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-secondary overflow-hidden shrink-0 border border-border">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground line-clamp-1 max-w-[180px]">{product.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-[180px]">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 capitalize text-foreground">{product.category.replace(/-/g, " ")}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">{formatPrice(product.price)}</p>
                      {product.originalPrice > product.price && (
                        <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 20 ? "bg-emerald-500/10 text-emerald-500" :
                        product.stock > 0 ? "bg-amber-500/10 text-amber-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        {product.isNew && <span className="px-2 py-0.5 bg-foreground text-background text-[10px] font-bold rounded">NEW</span>}
                        {product.featured && <span className="px-2 py-0.5 bg-violet-500/10 text-violet-400 text-[10px] font-bold rounded">FEAT</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="p-1.5 text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/10 rounded-md transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
