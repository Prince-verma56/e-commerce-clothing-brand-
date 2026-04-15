import * as React from "react"
import Link from "next/link"
import { SHOP_THE_LOOK } from "@/lib/constants/mockData"
import { formatPrice } from "@/lib/utils/formatPrice"

export function ShopTheLook() {
  return (
    <section className="px-6 py-7 max-w-[1400px] xl:mx-auto w-full">
      <h2 className="font-serif text-[18px] mb-4 text-foreground">Shop the look</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {SHOP_THE_LOOK.map((look, i) => (
          <Link key={i} href="/looks" className="group block border border-border rounded-xl overflow-hidden cursor-pointer hover:border-foreground transition-colors bg-background">
            <div 
              className="h-[160px] flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundColor: look.bg }}
            >
              <div className="w-[50%] h-[80%] rounded shadow-sm bg-black/10 flex items-center justify-center">
                <span className="text-[11px] text-black/50 text-center uppercase tracking-wider font-semibold px-2">{look.subtitle}</span>
              </div>
            </div>
            <div className="p-3 bg-background relative z-10">
              <h4 className="text-[12px] font-medium text-foreground mb-0.5">{look.title}</h4>
              <p className="text-[11px] text-muted-foreground">
                {look.items} items · from <span className="font-semibold text-foreground">{formatPrice(look.from)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
