import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin, requireAuthenticatedUser } from "./lib/auth";

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("orders").collect();
  },
});

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireAuthenticatedUser(ctx);

    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", user.clerkId))
      .collect();
  },
});

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await requireAuthenticatedUser(ctx);

    if (user.role !== "admin" && user.clerkId !== args.userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
        size: v.string(),
        price: v.number(),
      })
    ),
    totalAmount: v.number(),
    shippingAddress: v.object({
      fullName: v.string(),
      address: v.string(),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthenticatedUser(ctx);

    return await ctx.db.insert("orders", {
      ...args,
      userId: user.clerkId,
      status: "pending",
    });
  },
});

export const updateStatus = mutation({
  args: { 
    id: v.id("orders"), 
    status: v.union(v.literal("pending"), v.literal("processing"), v.literal("shipped"), v.literal("delivered")) 
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status });
  },
});
