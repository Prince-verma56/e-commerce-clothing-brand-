import type { Product } from "@/types/product"

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "iron-man-arc-reactor-graphic-tee",
    name: "Iron Man Arc Reactor Graphic Tee",
    brand: "Marvel",
    price: 499,
    originalPrice: 699,
    discount: 30,
    colors: ["#1a1a2e", "#c0392b", "#888888"],
    bgColor: "#dde0e8",
    category: "t-shirts",
    isNew: false,
    inWishlist: false
  },
  {
    id: "2",
    slug: "batman-dark-knight-oversized",
    name: "Batman Dark Knight Oversized",
    brand: "DC Comics",
    price: 799,
    originalPrice: 999,
    discount: 20,
    badge: "NEW",
    badgeVariant: "new",
    colors: ["#000000"],
    bgColor: "#e8ddd0",
    category: "t-shirts",
    isNew: true,
    inWishlist: false
  },
  {
    id: "3",
    slug: "solid-comfort-fleece-hoodie",
    name: "Solid Comfort Fleece Hoodie",
    brand: "The Souled Store",
    price: 1299,
    originalPrice: 1599,
    discount: 18,
    colors: ["#000000", "#555555"],
    bgColor: "#d0e8d4",
    category: "hoodies",
    isNew: false,
    inWishlist: false
  },
  {
    id: "4",
    slug: "could-this-be-any-more-comfy-joggers",
    name: "Could This BE Any More Comfy Joggers",
    brand: "Friends",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    colors: ["#111111"],
    bgColor: "#e8e0d0",
    category: "joggers",
    isNew: false,
    inWishlist: false
  },
  {
    id: "5",
    slug: "hogwarts-crest-acid-wash-oversized-tee",
    name: "Hogwarts Crest Acid Wash Oversized Tee",
    brand: "Harry Potter",
    price: 549,
    originalPrice: 849,
    discount: 35,
    colors: ["#333333"],
    bgColor: "#e8d0d0",
    category: "t-shirts",
    isNew: false,
    inWishlist: false
  },
  {
    id: "6",
    slug: "wubba-lubba-graphic-crop-hoodie",
    name: "Wubba Lubba Graphic Crop Hoodie",
    brand: "Rick & Morty",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    badge: "NEW",
    badgeVariant: "new",
    colors: ["#444444"],
    bgColor: "#d8d0e8",
    category: "hoodies",
    isNew: true,
    inWishlist: false
  },
  {
    id: "7",
    slug: "essential-slim-fit-polo-t-shirt",
    name: "Essential Slim Fit Polo T-Shirt",
    brand: "The Souled Store",
    price: 699,
    originalPrice: 899,
    discount: 22,
    colors: ["#123123"],
    bgColor: "#d0dce8",
    category: "t-shirts",
    isNew: false,
    inWishlist: false
  },
  {
    id: "8",
    slug: "akatsuki-cloud-all-over-print-tee",
    name: "Akatsuki Cloud All-Over Print Tee",
    brand: "Naruto",
    price: 449,
    originalPrice: 749,
    discount: 40,
    colors: ["#990000", "#000000"],
    bgColor: "#e8e8d0",
    category: "t-shirts",
    isNew: false,
    inWishlist: false
  }
];

export const NAV_LINKS = [
  { label: "Men", href: "/category/men" },
  { label: "Women", href: "/category/women" },
  { label: "Kids", href: "/category/kids" },
  { label: "Fan Merch", href: "/category/fan-merch" },
  { label: "Sale 🔥", href: "/category/sale" },
  { label: "New In", href: "/category/new-in" }
];

export const CATEGORIES = [
  { icon: "👕", label: "T-Shirts", slug: "t-shirts" },
  { icon: "🧥", label: "Hoodies", slug: "hoodies" },
  { icon: "👖", label: "Joggers", slug: "joggers" },
  { icon: "🩳", label: "Shorts", slug: "shorts" },
  { icon: "🧢", label: "Caps & Accessories", slug: "caps-and-accessories" }
];

export const TRENDING_TAGS = [
  "Marvel", "DC Comics", "Harry Potter", "Disney", "Friends", "Rick & Morty", "Naruto", "One Piece", "The Office", "Game of Thrones"
];

export const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Joggers", value: "joggers" },
  { label: "Oversized", value: "oversized" },
  { label: "Under ₹599", value: "under-599" },
  { label: "New Arrivals", value: "new-arrivals" }
];

export const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest First", value: "newest" },
  { label: "Bestsellers", value: "bestsellers" }
];

export const SHOP_THE_LOOK = [
  { title: "Casual Street", subtitle: "Marvel Collection", items: 2, from: 1299, bg: "#dde0e8" },
  { title: "Winter Essentials", subtitle: "DC Comics", items: 3, from: 2499, bg: "#e8ddd0" },
  { title: "Gym Ready", subtitle: "The Souled Store", items: 2, from: 1599, bg: "#d0e8d4" },
  { title: "Lounge Wear", subtitle: "Friends Merch", items: 2, from: 1199, bg: "#e8e0d0" }
];
