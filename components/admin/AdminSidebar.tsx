"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CopyPlus, Package, LayoutDashboard, Settings, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Products", href: "/admin/products", icon: Package, exact: false },
  { label: "New Product", href: "/admin/products/new", icon: CopyPlus, exact: true },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart, exact: false },
  { label: "Settings", href: "/admin/settings", icon: Settings, exact: true },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        // The admin zone always stays dark regardless of theme — intentional design decision
        "bg-[#0f1117] text-slate-300 hidden md:flex flex-col shrink-0 transition-all duration-300 relative",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo / Brand */}
      <div className={cn("h-14 flex items-center border-b border-white/5 px-4", collapsed ? "justify-center" : "gap-3")}>
        {!collapsed && (
          <Link href="/" className="font-serif text-white text-sm tracking-tight hover:text-white/80 truncate leading-tight">
            SOULED STORE<br />
            <span className="text-[10px] text-slate-500 font-sans font-normal tracking-widest uppercase">Admin Panel</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="font-serif text-white text-base">S</Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-0.5">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3 px-2">Menu</p>
        )}
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && !(item.href === "/admin/products" && pathname === "/admin/products/new");
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center rounded-lg text-sm font-medium transition-all group",
                collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2.5",
                isActive
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
              )}
            >
              <item.icon className={cn("shrink-0 transition-colors", collapsed ? "w-4.5 h-4.5" : "w-4 h-4")} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-white/5">
          <p className="text-[10px] text-slate-600 text-center">Admin Control Mode</p>
        </div>
      )}

      {/* Collapse toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[54px] w-6 h-6 bg-[#0f1117] border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
