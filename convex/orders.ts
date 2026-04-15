import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("orders").collect();
  },
});

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    userId: v.string(),
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
    return await ctx.db.insert("orders", {
      ...args,
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
    await ctx.db.patch(args.id, { status: args.status });
  },
});
