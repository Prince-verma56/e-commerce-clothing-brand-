import { query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

export const getAdminStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const orders = await ctx.db.query("orders").collect();
    const products = await ctx.db.query("products").collect();
    const users = await ctx.db.query("users").collect();

    // Calculate revenue (all non-pending/cancelled or whatever, let's just sum all orders for now or just delivered/shipped)
    const revenueOrders = orders.filter(o => o.status !== "pending");
    const totalRevenue = revenueOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    return {
      totalRevenue,
      totalOrders: orders.length,
      liveProducts: products.length,
      totalCustomers: users.length > 0 ? users.length : new Set(orders.map(o => o.userId)).size,
    };
  },
});
