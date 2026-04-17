import type { Product } from "@/types/product"

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "essential-heavyweight-tee-black",
    name: "Essential Heavyweight Tee — Black",
    brand: "Himanshi",
    price: 499,
    originalPrice: 699,
    discount: 30,
    colors: ["#1a1a1a", "#555555", "#888888"],
    bgColor: "#dde0e8",
    category: "t-shirts",
    isNew: false,
    inWishlist: false,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80"
    ]
  },
  {
    id: "2",
    slug: "premium-oversized-drop-shoulder",
    name: "Premium Oversized Drop Shoulder Tee",
    brand: "Himanshi",
    price: 799,
    originalPrice: 999,
    discount: 20,
    badge: "NEW",
    badgeVariant: "new",
    colors: ["#000000", "#f5f5f0"],
    bgColor: "#e8ddd0",
    category: "t-shirts",
    isNew: true,
    inWishlist: false,
    images: [
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
    ]
  },
  {
    id: "3",
    slug: "cloud-fleece-zip-hoodie",
    name: "Cloud Fleece Zip Hoodie",
    brand: "Himanshi",
    price: 1299,
    originalPrice: 1599,
    discount: 18,
    colors: ["#000000", "#555555", "#c8b8a2"],
    bgColor: "#d0e8d4",
    category: "hoodies",
    isNew: false,
    inWishlist: false,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      "https://images.unsplash.com/photo-1609873814058-a8928924184a?w=800&q=80"
    ]
  },
  {
    id: "4",
    slug: "everyday-comfort-joggers",
    name: "Everyday Comfort Joggers",
    brand: "Himanshi",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    colors: ["#111111", "#888888"],
    bgColor: "#e8e0d0",
    category: "joggers",
    isNew: false,
    inWishlist: false,
    images: [
      "https://images.unsplash.com/photo-1506629082847-11d3e392e467?w=800&q=80",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80"
    ]
  },
  {
    id: "5",
    slug: "summer-linen-relaxed-shirt",
    name: "Summer Linen Relaxed Shirt",
    brand: "Himanshi",
    price: 549,
    originalPrice: 849,
    discount: 35,
    colors: ["#e8c99a", "#a8c5b5"],
    bgColor: "#e8d0d0",
    category: "shirts",
    isNew: false,
    inWishlist: false,
    images: [
      "https://images.unsplash.com/photo-1596521799390-0d4fb1757912?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
    ]
  },
  {
    id: "6",
    slug: "heavyweight-zip-up-hoodie-slate",
    name: "Heavyweight Zip-Up Hoodie — Slate",
    brand: "Himanshi",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    badge: "NEW",
    badgeVariant: "new",
    colors: ["#5a6a7a", "#222222"],
    bgColor: "#d8d0e8",
    category: "hoodies",
    isNew: true,
    inWishlist: false,
    images: [
      "https://images.unsplash.com/photo-1609873814058-a8928924184a?w=800&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
    ]
  },
  {
    id: "7",
    slug: "slim-fit-polo-essential",
    name: "Slim Fit Polo — Essential White",
    brand: "Himanshi",
    price: 699,
    originalPrice: 899,
    discount: 22,
    colors: ["#f5f5f5", "#111111", "#c0392b"],
    bgColor: "#d0dce8",
    category: "t-shirts",
    isNew: false,
    inWishlist: false,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
      "https://images.unsplash.com/photo-1596521799390-0d4fb1757912?w=800&q=80"
    ]
  },
  {
    id: "8",
    slug: "acid-wash-oversized-graphic-tee",
    name: "Acid Wash Oversized Graphic Tee",
    brand: "Himanshi",
    price: 449,
    originalPrice: 749,
    discount: 40,
    colors: ["#4a3728", "#1a1a2e"],
    bgColor: "#e8e8d0",
    category: "t-shirts",
    isNew: false,
    inWishlist: false,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&q=80"
    ]
  }
];

export const NAV_LINKS = [
  { label: "Men", href: "/category/men" },
  { label: "Women", href: "/category/women" },
  { label: "Kids", href: "/category/kids" },
  { label: "New In", href: "/category/new-in" },
  { label: "Sale 🔥", href: "/category/sale" },
];

export const CATEGORIES = [
  { icon: "👕", label: "T-Shirts", slug: "t-shirts" },
  { icon: "🧥", label: "Hoodies", slug: "hoodies" },
  { icon: "👖", label: "Joggers", slug: "joggers" },
  { icon: "👗", label: "Shirts", slug: "shirts" },
  { icon: "🩳", label: "Shorts", slug: "shorts" },
  { icon: "🧢", label: "Caps & Accessories", slug: "caps-and-accessories" }
];

export const TRENDING_TAGS = [
  "Premium Basics",
  "Heavyweight",
  "Summer Collection",
  "Oversized",
  "Slim Fit",
  "240 GSM",
  "Streetwear",
  "Acid Wash",
  "Loungewear",
  "New Arrivals",
];

export const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Joggers", value: "joggers" },
  { label: "Shirts", value: "shirts" },
  { label: "Oversized", value: "oversized" },
  { label: "Under ₹599", value: "under-599" },
  { label: "New Arrivals", value: "new-arrivals" },
];

export const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest First", value: "newest" },
  { label: "Bestsellers", value: "bestsellers" }
];

export const SHOP_THE_LOOK = [
  { title: "Casual Street", subtitle: "Oversize Collection", items: 2, from: 1299, bg: "#dde0e8" },
  { title: "Winter Essentials", subtitle: "Heavyweight Range", items: 3, from: 2499, bg: "#e8ddd0" },
  { title: "Gym Ready", subtitle: "Active & Sport", items: 2, from: 1599, bg: "#d0e8d4" },
  { title: "Lounge Wear", subtitle: "Comfort Fits", items: 2, from: 1199, bg: "#e8e0d0" }
];
