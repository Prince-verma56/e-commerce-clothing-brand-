"use client"

import * as React from "react"
import { useCartStore, type CartItem as CartItemType } from "@/store/cartStore"
import { formatPrice } from "@/lib/utils/formatPrice"
import { X, Minus, Plus } from "lucide-react"

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQty, removeItem } = useCartStore()

  return (
    <div className="flex gap-4 py-2">
      <div 
        className="w-[80px] h-[100px] rounded shrink-0 bg-secondary flex items-center justify-center"
        style={{ backgroundColor: item.product.bgColor }}
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.product.brand}</span>
            <button 
              onClick={() => removeItem(item.product.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h4 className="text-[12px] font-medium leading-snug mt-1 line-clamp-2 pr-4">{item.product.name}</h4>
          <span className="text-[11px] text-muted-foreground border border-border px-1.5 py-0.5 rounded mt-1.5 inline-block">
            Size: {item.size}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-border rounded-[2px] bg-background h-7">
            <button 
              className="px-2 h-full text-muted-foreground hover:text-foreground flex items-center"
              onClick={() => updateQty(item.product.id, Math.max(1, item.quantity - 1))}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[12px] font-medium w-6 text-center">{item.quantity}</span>
            <button 
              className="px-2 h-full text-muted-foreground hover:text-foreground flex items-center"
              onClick={() => updateQty(item.product.id, item.quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <span className="text-[13px] font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  )
}
