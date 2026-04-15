"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Search } from "lucide-react"
import { NAV_LINKS } from "@/lib/constants/mockData"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils/cn"

export default function MobileNav({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 md:hidden flex">
      <div className="w-[80%] max-w-sm bg-background h-full p-6 flex flex-col shadow-xl">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <Link href="/" className="font-serif text-lg font-medium tracking-tight" onClick={onClose}>
            THE SOULED STORE
          </Link>
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search products, brands..." 
            className="pl-9 bg-secondary border-transparent"
          />
        </div>

        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={onClose}
                className={cn(
                  "py-3 text-lg font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  )
}
