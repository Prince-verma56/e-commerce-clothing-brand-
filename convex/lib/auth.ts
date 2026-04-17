import type { MutationCtx, QueryCtx } from "../_generated/server";

type AuthCtx = QueryCtx | MutationCtx;

export async function getCurrentUserRecord(ctx: AuthCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return null;
  }

  const byTokenIdentifier = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();

  if (byTokenIdentifier) {
    return byTokenIdentifier;
  }

  return await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();
}

export async function requireAuthenticatedUser(ctx: AuthCtx) {
  const user = await getCurrentUserRecord(ctx);

  if (!user) {
    throw new Error("Not authenticated");
  }

  return user;
}

export async function requireAdmin(ctx: AuthCtx) {
  const user = await requireAuthenticatedUser(ctx);

  if (user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return user;
}
