import { internalMutation } from './_generated/server';

const SEED_PRODUCTS = [
  {
    name: 'Urban Monochrome Oversized Tee',
    slug: 'urban-monochrome-oversized-tee',
    description:
      'A relaxed, dropped-shoulder silhouette crafted from 100% organic cotton. Minimal branding, maximum comfort. Perfect for everyday streetwear styling.',
    price: 599,
    originalPrice: 999,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ],
    category: 't-shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#111111', '#f5f5f5'],
    isNew: true,
    stock: 142,
    featured: true,
    material: '100% Organic Cotton',
    careInstructions: 'Machine wash cold. Tumble dry low. Do not bleach.',
  },
  {
    name: 'Premium Fleece Pullover Hoodie',
    slug: 'premium-fleece-pullover-hoodie',
    description:
      'Mid-weight fleece hoodie with a kangaroo pocket and ribbed cuffs. Built for the cold season without sacrificing style.',
    price: 1299,
    originalPrice: 1899,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=800&q=80',
    ],
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#4a4a6a', '#8b4513'],
    isNew: false,
    stock: 89,
    featured: true,
    material: '80% Cotton, 20% Polyester Fleece',
    careInstructions: 'Machine wash warm. Do not iron print. Tumble dry medium.',
  },
  {
    name: 'Classic Slim Fit Chino Pants',
    slug: 'classic-slim-fit-chino-pants',
    description:
      'Versatile slim-fit chinos with a stretch fabric blend for all-day comfort. Pairs effortlessly with both sneakers and dress shoes.',
    price: 1099,
    originalPrice: 1599,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    ],
    category: 'pants',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['#c8b89a', '#2f4f4f'],
    isNew: false,
    stock: 67,
    featured: false,
    material: '97% Cotton, 3% Elastane',
    careInstructions: 'Machine wash cold. Iron on low heat.',
  },
  {
    name: 'Graphic Pop Culture Round Neck Tee',
    slug: 'graphic-pop-culture-tee',
    description:
      'Exclusive limited-edition graphic print tee. Inspired by Indian pop culture. Soft-hand print on heavy-weight cotton.',
    price: 699,
    originalPrice: 699,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&q=80',
    ],
    category: 't-shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#ffffff', '#000000', '#ff5733'],
    isNew: true,
    stock: 230,
    featured: true,
    material: '100% Combed Cotton',
    careInstructions: 'Turn inside out and wash cold. Do not tumble dry.',
  },
  {
    name: 'Relaxed Fit Cargo Jogger',
    slug: 'relaxed-fit-cargo-jogger',
    description:
      'Utility-inspired jogger pants with multiple cargo pockets. Elastic waistband and tapered hem for a modern athletic look.',
    price: 1499,
    originalPrice: 2199,
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
    ],
    category: 'pants',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#3d3d3d', '#556b2f'],
    isNew: true,
    stock: 44,
    featured: false,
    material: '100% Cotton Twill',
    careInstructions: 'Machine wash cold. Iron on medium heat.',
  },
  {
    name: 'Corduroy Button-Down Overshirt',
    slug: 'corduroy-button-down-overshirt',
    description:
      'A statement overshirt in fine-wale corduroy. Wear open over a tee or buttoned up solo for a clean layered look.',
    price: 1799,
    originalPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
      'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=800&q=80',
    ],
    category: 'shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#8b4513', '#2f4f4f'],
    isNew: false,
    stock: 31,
    featured: true,
    material: '100% Cotton Corduroy',
    careInstructions: 'Dry clean recommended. If machine washing, cold and gentle cycle.',
  },
];

export const seedProducts = internalMutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query('products').first();
    if (existing) {
      return { seeded: false, message: 'Products already exist, skipping seed.' };
    }
    for (const product of SEED_PRODUCTS) {
      await ctx.db.insert('products', product);
    }
    return { seeded: true, message: `Seeded ${SEED_PRODUCTS.length} products.` };
  },
});
