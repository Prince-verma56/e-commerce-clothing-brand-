"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, Heart, ShoppingBag, Menu, LayoutDashboard, User } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { NAV_LINKS } from "@/lib/constants/mockData"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { Input } from "@/components/ui/Input"
import MobileNav from "./MobileNav"
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { ModeToggle } from "@/components/ModeToggle"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const cartItems = useCartStore((state) => state.items)
  const wishlistItems = useWishlistStore((state) => state.items)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const wishlistCount = wishlistItems.length
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [cartOpen, setCartOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const { isSignedIn } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push(`/`)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border dark:border-white/10 flex items-center px-6 transition-all">
        {/* Mobile Menu Icon */}
        <div className="flex-1 md:hidden">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Left: Logo */}
        <div className="flex-1 md:flex-none flex items-center justify-center md:justify-start">
          <Link href="/" className="font-serif text-xl font-medium tracking-tight">
            THE SOULED STORE
          </Link>
        </div>

        {/* Center: Nav links (Desktop) */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-[13px] rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-foreground text-background font-medium shadow-sm" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground font-medium"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-5">
          <form onSubmit={handleSearch} className="hidden md:flex relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..." 
              className="pl-9 h-9 bg-secondary/80 border-transparent focus-visible:border-foreground/20 rounded-full text-xs"
            />
          </form>

          <ModeToggle />

          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="text-[13px] font-medium hidden md:block text-foreground hover:text-foreground/70 transition-colors">
                Sign In
              </button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Link 
                  label="Profile" 
                  href="/profile" 
                  labelIcon={<User className="w-4 h-4" />} 
                />
                <UserButton.Link 
                  label="Admin Dashboard" 
                  href="/admin" 
                  labelIcon={<LayoutDashboard className="w-4 h-4" />} 
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

          <Link href="/wishlist" className="relative transition-transform hover:scale-110">
            <Heart className="w-5 h-5 text-foreground" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--brand-red)] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button onClick={() => setCartOpen(true)} className="relative transition-transform hover:scale-110">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-foreground text-background text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </header>
      
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
