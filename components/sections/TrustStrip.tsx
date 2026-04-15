import * as React from "react"

const TRUST_ITEMS = [
  { icon: "🚚", label: "Free Shipping", sub: "On orders above ₹599" },
  { icon: "↩️", label: "Easy Returns", sub: "30-day hassle-free" },
  { icon: "🔒", label: "Secure Payments", sub: "100% safe checkout" },
  { icon: "⭐", label: "4.5★ Rated", sub: "500K+ happy customers" },
]

export function TrustStrip() {
  return (
    <section className="mx-6 mb-7 max-w-[1400px] xl:mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 border border-border rounded-xl overflow-hidden bg-background">
        {TRUST_ITEMS.map((item, i) => (
          <div 
            key={i} 
            className="py-4 px-3 text-center border-b lg:border-b-0 lg:border-r border-border last:border-0 odd:border-r"
          >
            <div className="text-xl mb-1.5">{item.icon}</div>
            <h4 className="text-[12px] font-medium text-foreground">{item.label}</h4>
            <p className="text-[10px] text-muted-foreground">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
