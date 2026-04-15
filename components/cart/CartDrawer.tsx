"use client"

import * as React from "react"
import { useCartStore } from "@/store/cartStore"
import { CartItem } from "./CartItem"
import { CartSummary } from "./CartSummary"
import { ShoppingBag, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils/cn"

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items } = useCartStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={cn(
        "relative w-[85%] max-w-[400px] h-full bg-background shadow-xl flex flex-col transition-transform duration-300 translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-serif text-lg">Your Cart ({items.reduce((a, b) => a + b.quantity, 0)} items)</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 relative">
               {items.map(item => (
                 <CartItem key={`${item.product.id}-${item.size}`} item={item} />
               ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border bg-secondary/50">
            <CartSummary />
            <Link 
              href="/checkout" 
              onClick={onClose}
              className="mt-4 w-full block text-center bg-foreground text-background py-3 rounded-[2px] font-medium hover:bg-foreground/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
