"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, Package, ShoppingBag, Users, Settings, Store } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavMain, type NavItemConfig } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { RoleSwitchOverlay } from "@/components/sidebar/role-switch-overlay";
import { useMemo, useState } from "react";

export function AppSidebar() {
  const { user, isSignedIn } = useUser();
  const [switchingRole, setSwitchingRole] = useState(false);

  const clerkRole = user?.publicMetadata?.role as string | undefined;
  const isAdmin = clerkRole === "admin";

  // Data fetching for live badge counts
  const allProducts = useQuery(api.products.list, isAdmin ? {} : "skip");
  const allOrders = useQuery(api.orders.list, isAdmin ? undefined : "skip");

  const mainItems: NavItemConfig[] = useMemo(() => {
    return [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Products",
        href: "/admin/products",
        icon: Package,
        badge: allProducts ? allProducts.length.toString() : undefined,
      },
      {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
        badge: allOrders ? allOrders.filter(o => o.status === "pending").length.toString() : undefined,
      },
      {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
      },
    ];
  }, [allProducts, allOrders]);

  const secondaryItems: NavItemConfig[] = useMemo(() => [
    {
      title: "Store Settings",
      href: "/admin/settings",
      icon: Settings,
    },
    {
      title: "Back to Store",
      href: "/",
      icon: Store,
    }
  ], []);

  const switchRole = async (target: "customer") => {
    if (!user?.id || switchingRole) return;
    setSwitchingRole(true);
    try {
      toast.success(`Switched to Customer view`);
      await new Promise((resolve) => setTimeout(resolve, 600));
      window.location.assign("/");
    } catch (error) {
      console.error("Role switch error:", error);
      setSwitchingRole(false);
      toast.error("Failed to switch role.");
    }
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="gap-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="data-active:bg-transparent">
              <Link href="/admin">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  A
                </span>
                <span className="truncate font-semibold text-lg">Admin Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between" disabled={!isSignedIn || switchingRole}>
              <span>{switchingRole ? "Switching..." : "Admin Workspace"}</span>
              <ChevronDown className="size-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuLabel>Switch Workspace Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => switchRole("customer")}>Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavSecondary items={secondaryItems} />
      </SidebarFooter>

      <RoleSwitchOverlay isSwitching={switchingRole} targetRole="customer" />
    </Sidebar>
  );
}
