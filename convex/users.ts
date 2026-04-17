import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { getCurrentUserRecord, requireAdmin } from './lib/auth';

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query('users').collect();
  },
});

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUserRecord(ctx);
  },
});

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .first();
  },
});

export const upsert = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    role: v.optional(v.union(v.literal('user'), v.literal('admin'))),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { email: args.email });
      return existing._id;
    }

    return await ctx.db.insert('users', {
      clerkId: args.clerkId,
      tokenIdentifier: undefined,
      email: args.email,
      role: args.role ?? 'user',
    });
  },
});

export const syncCurrentUser = mutation({
  args: {
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const existingByToken = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier),
      )
      .unique();

    const existingByClerkId = existingByToken
      ? null
      : await ctx.db
          .query('users')
          .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
          .unique();

    const existing = existingByToken ?? existingByClerkId;
    const email = identity.email ?? args.email;

    if (!email) {
      throw new Error('Authenticated user is missing an email address');
    }

    if (existing) {
      await ctx.db.patch(existing._id, {
        clerkId: identity.subject,
        tokenIdentifier: identity.tokenIdentifier,
        email,
      });
      return existing._id;
    }

    const existingAdmin = await ctx.db
      .query('users')
      .withIndex('by_role', (q) => q.eq('role', 'admin'))
      .take(1);

    return await ctx.db.insert('users', {
      clerkId: identity.subject,
      tokenIdentifier: identity.tokenIdentifier,
      email,
      role: existingAdmin.length === 0 ? 'admin' : 'user',
    });
  },
});

export const setRole = mutation({
  args: {
    id: v.id('users'),
    role: v.union(v.literal('user'), v.literal('admin')),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { role: args.role });
  },
});
