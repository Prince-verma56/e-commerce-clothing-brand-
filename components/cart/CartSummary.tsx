"use client"

import * as React from "react"
import { useCartStore } from "@/store/cartStore"
import { formatPrice } from "@/lib/utils/formatPrice"

export function CartSummary() {
  const total = useCartStore(s => s.total())
  const shipping = total > 599 || total === 0 ? 0 : 50

  return (
    <div className="space-y-2 text-[12px]">
      <div className="flex justify-between text-muted-foreground">
        <span>Subtotal</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="flex justify-between text-muted-foreground">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
      </div>
      <div className="flex justify-between border-t border-border pt-2 mt-2 font-medium text-[14px]">
        <span>Total</span>
        <span>{formatPrice(total + shipping)}</span>
      </div>
    </div>
  )
}
