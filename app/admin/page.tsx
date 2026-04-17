"use client";

import { TrendingUp, ShoppingBag, Package, Users } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SectionCards, type StatCard } from "@/components/sidebar/section-cards";
import { ChartAreaInteractive, type RevenueChartPoint } from "@/components/sidebar/chart-area-interactive";
import { DashboardSkeleton } from "@/components/sidebar/dashboard-skeleton";

const RECENT_ORDERS = [
  { id: "#ORD-1042", customer: "Priya Sharma", product: "Urban Monochrome Tee", status: "delivered", amount: "₹599" },
  { id: "#ORD-1041", customer: "Rohan Mehta", product: "Premium Fleece Hoodie", status: "shipped", amount: "₹1,299" },
  { id: "#ORD-1040", customer: "Anika Patel", product: "Classic Chino Pants", status: "processing", amount: "₹1,099" },
  { id: "#ORD-1039", customer: "Dev Kapoor", product: "Graphic Pop Culture Tee", status: "pending", amount: "₹699" },
];

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-emerald-500/10 text-emerald-500",
  shipped: "bg-blue-500/10 text-blue-500",
  processing: "bg-amber-500/10 text-amber-500",
  pending: "bg-muted text-muted-foreground",
};

// Generate Mock Data for the last 30 days
const mockChartData: RevenueChartPoint[] = Array.from({ length: 30 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    date: d.toISOString().split("T")[0],
    revenue: Math.floor(Math.random() * 5000) + 1000,
  };
});

export default function AdminDashboard() {
  const stats = useQuery(api.stats.getAdminStats);

  if (stats === undefined) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's what's happening in your store.</p>
        </div>
        <DashboardSkeleton />
      </div>
    );
  }

  const statCards: StatCard[] = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      delta: "+12.5%",
      subtitle: " vs last month",
      trend: "up",
      icon: TrendingUp,
      livePulse: true,
    },
    {
      id: "orders",
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      delta: "+4",
      subtitle: " today",
      trend: "up",
      icon: ShoppingBag,
    },
    {
      id: "products",
      title: "Live Products",
      value: stats.liveProducts.toString(),
      delta: "In stock",
      subtitle: "",
      trend: "neutral",
      icon: Package,
    },
    {
      id: "customers",
      title: "Total Customers",
      value: stats.totalCustomers.toString(),
      delta: "+5%",
      subtitle: " this week",
      trend: "up",
      icon: Users,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's what's happening in your store.</p>
      </div>

      {/* Metric Cards */}
      <SectionCards stats={statCards} />

      {/* Chart */}
      <ChartAreaInteractive data={mockChartData} />

      {/* Recent Orders Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs text-indigo-500 hover:underline font-medium">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm shrink-0">
            <thead className="bg-muted/50">
              <tr>
                {["Order ID", "Customer", "Product", "Status", "Amount"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RECENT_ORDERS.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{o.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{o.customer}</td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{o.product}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/products/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl flex items-center gap-3 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold">Add New Product</p>
            <p className="text-xs text-indigo-200">Expand your catalog instantly</p>
          </div>
        </Link>
        <Link href="/admin/products" className="bg-card border border-border hover:border-foreground/30 text-foreground px-6 py-4 rounded-xl flex items-center gap-3 transition-all hover:shadow-sm">
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">Manage Products</p>
            <p className="text-xs text-muted-foreground">Edit, delete, or update stock</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
