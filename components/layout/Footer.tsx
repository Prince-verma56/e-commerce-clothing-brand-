import * as React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background pt-16 mt-12 border-t border-border">
      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
        
        {/* Brand Col: 2fr */}
        <div className="md:col-span-1 lg:col-span-2">
          <h2 className="font-serif text-xl font-medium mb-4">THE SOULED STORE</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Homegrown Indian brand crafting pop-culture fashion for the fans, by the fans. Officially licensed merchandise.
          </p>
          <div className="flex gap-3">
            {['In', 'Ig', 'Yt'].map(s => (
              <div key={s} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-foreground hover:text-background transition">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Link Cols */}
        <div>
          <h3 className="font-medium mb-4 text-sm uppercase tracking-wide">Shop</h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li><Link href="/category/men" className="hover:text-foreground">Men</Link></li>
            <li><Link href="/category/women" className="hover:text-foreground">Women</Link></li>
            <li><Link href="/category/kids" className="hover:text-foreground">Kids</Link></li>
            <li><Link href="/category/fan-merch" className="hover:text-foreground">Fan Merch</Link></li>
            <li><Link href="/category/sale" className="text-[var(--brand-red)] hover:opacity-80">Sale</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4 text-sm uppercase tracking-wide">Help</h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li><Link href="/track-order" className="hover:text-foreground">Track Order</Link></li>
            <li><Link href="/returns" className="hover:text-foreground">Returns</Link></li>
            <li><Link href="/size-guide" className="hover:text-foreground">Size Guide</Link></li>
            <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-4 text-sm uppercase tracking-wide">Company</h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link href="/sustainability" className="hover:text-foreground">Sustainability</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-border px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} The Souled Store. All rights reserved.
        </p>
        <div className="flex gap-2 text-[10px]">
          {['Visa', 'MC', 'UPI', 'EMI'].map(m => (
            <div key={m} className="px-2 py-1 bg-secondary rounded text-muted-foreground border border-border uppercase font-bold">
              {m}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
