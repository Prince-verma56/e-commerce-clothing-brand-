import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  products: defineTable({
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
  })
    .index('by_slug', ['slug'])
    .index('by_category', ['category'])
    .index('by_featured', ['featured']),

  orders: defineTable({
    userId: v.string(),
    items: v.array(
      v.object({
        productId: v.id('products'),
        quantity: v.number(),
        size: v.string(),
        price: v.number(),
      })
    ),
    totalAmount: v.number(),
    status: v.union(
      v.literal('pending'),
      v.literal('processing'),
      v.literal('shipped'),
      v.literal('delivered')
    ),
    shippingAddress: v.object({
      fullName: v.string(),
      address: v.string(),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
    }),
  }).index('by_user', ['userId']),

  users: defineTable({
    clerkId: v.string(),
    tokenIdentifier: v.optional(v.string()),
    email: v.string(),
    role: v.union(v.literal('user'), v.literal('admin')),
  })
    .index('by_clerkId', ['clerkId'])
    .index('by_tokenIdentifier', ['tokenIdentifier'])
    .index('by_role', ['role']),

  addresses: defineTable({
    userId: v.string(),
    fullName: v.string(),
    street: v.string(),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    phone: v.string(),
  }).index('by_user', ['userId']),
});
