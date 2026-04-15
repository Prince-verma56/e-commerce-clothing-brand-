"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-2xl mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          Looks like you haven't added anything to your cart yet. Let's get you started!
        </p>
        <Link href="/">
          <Button variant="ink" className="px-8 font-medium">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-20 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl mb-8">Your Cart ({items.length} items)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="p-4 bg-background">
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="border border-border rounded-xl bg-secondary/50 overflow-hidden sticky top-24">
            <CartSummary />
            <div className="p-4 pt-0">
              <Link href="/checkout">
                <Button variant="ink" className="w-full font-medium h-12 text-[13px]">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
