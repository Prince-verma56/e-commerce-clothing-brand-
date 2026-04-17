import { v } from 'convex/values';
import { query, mutation } from './_generated/server';

export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category && args.category !== 'all') {
      return await ctx.db
        .query('products')
        .withIndex('by_category', (q) => q.eq('category', args.category!))
        .collect();
    }
    return await ctx.db.query('products').collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('products')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first();
  },
});

export const getById = query({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getFeatured = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('products')
      .withIndex('by_featured', (q) => q.eq('featured', true))
      .take(8);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    price: v.number(),
    originalPrice: v.number(),
    images: v.array(v.string()),
    category: v.string(),
    sizes: v.array(v.string()),
    colors: v.optional(v.array(v.string())),
    isNew: v.boolean(),
    stock: v.number(),
    featured: v.boolean(),
    material: v.optional(v.string()),
    careInstructions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('products', args);
  },
});

export const update = mutation({
  args: {
    id: v.id('products'),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    price: v.number(),
    originalPrice: v.number(),
    images: v.array(v.string()),
    category: v.string(),
    sizes: v.array(v.string()),
    colors: v.optional(v.array(v.string())),
    isNew: v.boolean(),
    stock: v.number(),
    featured: v.boolean(),
    material: v.optional(v.string()),
    careInstructions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id('products') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
