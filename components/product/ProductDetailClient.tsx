"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice, getDiscountPercent } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import {
  Heart, Share2, ShieldCheck, RotateCcw, Truck, Check,
  Box, Image as ImageIcon, Ruler, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/lib/constants/mockData";
import { normalizeProduct } from "@/lib/utils/normalizeProduct";

/* ─── Size Guide data ──────────────────────────────────────────────────────── */
const SIZE_GUIDE = [
  { size: "XS", chest: "84–86", length: "67", shoulder: "38" },
  { size: "S",  chest: "88–90", length: "69", shoulder: "40" },
  { size: "M",  chest: "92–96", length: "71", shoulder: "42" },
  { size: "L",  chest: "100–104", length: "73", shoulder: "44" },
  { size: "XL", chest: "108–112", length: "75", shoulder: "46" },
  { size: "XXL",chest: "116–120", length: "77", shoulder: "48" },
];

/* ─── Size Guide Modal ─────────────────────────────────────────────────────── */
function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 bg-background border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                <h2 className="font-serif text-lg text-foreground">Size Guide</h2>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Table */}
            <div className="p-6">
              <p className="text-xs text-muted-foreground mb-4">All measurements are in centimetres (cm).</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Size", "Chest", "Length", "Shoulder"].map((h) => (
                        <th key={h} className="text-left pb-3 pr-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {SIZE_GUIDE.map((row) => (
                      <tr key={row.size} className="hover:bg-secondary/50 transition-colors">
                        <td className="py-3 pr-6 font-bold text-foreground">{row.size}</td>
                        <td className="py-3 pr-6 text-muted-foreground">{row.chest}</td>
                        <td className="py-3 pr-6 text-muted-foreground">{row.length}</td>
                        <td className="py-3 text-muted-foreground">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Measurements may vary by ±1 cm. When in doubt, size up.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── 3D Workspace Placeholder ──────────────────────────────────────────────── */
function ThreeDWorkspace({ productName }: { productName: string }) {
  return (
    <div
      id="3d-workspace"
      className="w-full aspect-3/4 bg-secondary rounded-xl relative flex flex-col items-center justify-center border border-border overflow-hidden"
    >
      {/* Animated grid backdrop */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow orb */}
      <div className="absolute w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <Box className="w-7 h-7 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">3D Model Canvas</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
            3D view for <em>{productName}</em> will render here via @react-three/fiber
          </p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
export function ProductDetailClient({ slug }: { slug: string }) {
  const product = useQuery(api.products.getBySlug, { slug });
  const fallbackProduct = useMemo(
    () => MOCK_PRODUCTS.find((item) => item.slug === slug) ?? null,
    [slug]
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  const resolvedProduct = product ? normalizeProduct(product) : fallbackProduct;
  const material = product?.material;
  const careInstructions = product?.careInstructions;

  if (product === undefined && !resolvedProduct) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-secondary border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!resolvedProduct) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-4xl mb-3">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">This item doesn't exist or has been removed.</p>
        <Link href="/" className="px-6 py-3 bg-foreground text-background text-sm font-medium rounded-[2px] hover:opacity-90 transition-opacity">
          Back to Store
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(resolvedProduct.id);
  const images = resolvedProduct.images && resolvedProduct.images.length > 0
    ? resolvedProduct.images
    : ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"];
  const discount = resolvedProduct.originalPrice > resolvedProduct.price
    ? getDiscountPercent(resolvedProduct.originalPrice, resolvedProduct.price) : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first.", { duration: 3000 });
      return;
    }
    const cartProduct = {
      ...resolvedProduct,
      brand: resolvedProduct.brand || resolvedProduct.category,
      inWishlist: wishlisted,
    };
    setAdding(true);
    addItem(cartProduct, selectedSize);
    setTimeout(() => {
      setAdding(false);
      setJustAdded(true);
      toast.success(`Added to cart!`);
      setTimeout(() => setJustAdded(false), 2500);
    }, 400);
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: resolvedProduct.name, url: window.location.href });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Link copied to clipboard");
    }
  };

  return (
    <>
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${resolvedProduct.category}`} className="hover:text-foreground transition-colors capitalize">
            {resolvedProduct.category.replace(/-/g, " ")}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-sm">{resolvedProduct.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">

          {/* ─── LEFT: Image Gallery ─── */}
          <div>
            {/* 2D/3D View Toggle */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-muted-foreground font-medium">View:</span>
              <div className="flex border border-border rounded-lg overflow-hidden text-xs font-semibold">
                <button
                  onClick={() => setViewMode("2d")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 transition-colors",
                    viewMode === "2d" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <ImageIcon className="w-3 h-3" /> 2D
                </button>
                <button
                  onClick={() => setViewMode("3d")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 transition-colors border-l border-border",
                    viewMode === "3d" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Box className="w-3 h-3" /> 3D
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === "2d" ? (
                <motion.div
                  key="2d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3 md:gap-4"
                >
                  {/* Thumbnails */}
                  <div className="hidden sm:flex flex-col gap-2 w-20 shrink-0">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={cn(
                          "aspect-3/4 w-full rounded-md overflow-hidden border-2 transition-all",
                          selectedImage === idx ? "border-foreground shadow-sm" : "border-transparent opacity-50 hover:opacity-100"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Main image */}
                  <div className="flex-1 relative">
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      {resolvedProduct.isNew && <span className="bg-foreground text-background text-[10px] font-bold tracking-widest px-2 py-1 rounded-sm">NEW</span>}
                      {discount > 0 && <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">{discount}% OFF</span>}
                    </div>
                    <motion.div
                      key={selectedImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="aspect-3/4 w-full rounded-xl overflow-hidden bg-secondary"
                    >
                      <img src={images[selectedImage]} alt={resolvedProduct.name} className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Mobile dots */}
                    <div className="sm:hidden flex justify-center gap-1.5 mt-3">
                      {images.map((_, idx) => (
                        <button key={idx} onClick={() => setSelectedImage(idx)}
                          className={cn("w-1.5 h-1.5 rounded-full transition-all", selectedImage === idx ? "bg-foreground w-4" : "bg-foreground/30")}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ThreeDWorkspace productName={resolvedProduct.name} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── RIGHT: Sticky Product Info ─── */}
          <div className="lg:sticky lg:top-24 flex flex-col">
            {/* Title + actions */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">
                  {resolvedProduct.category.replace(/-/g, " ")}
                </p>
                <h1 className="font-serif text-2xl md:text-3xl leading-[1.15] text-foreground">{resolvedProduct.name}</h1>
              </div>
              <div className="flex gap-2 shrink-0 mt-1">
                <button
                  onClick={() => toggle(resolvedProduct)}
                  className={cn(
                    "w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95",
                    wishlisted ? "border-red-300 bg-red-50 text-red-500" : "border-border text-muted-foreground hover:border-foreground"
                  )}
                >
                  <Heart className={cn("w-4 h-4", wishlisted && "fill-red-500")} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-foreground transition-all hover:scale-110 active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold tracking-tight">{formatPrice(resolvedProduct.price)}</span>
              {discount > 0 && (
                <>
                  <span className="text-base text-muted-foreground line-through mb-0.5">{formatPrice(resolvedProduct.originalPrice)}</span>
                  <span className="text-sm font-bold text-red-600 mb-0.5">{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold">Select Size</span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline decoration-dotted underline-offset-2 transition-colors"
                >
                  <Ruler className="w-3 h-3" /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(resolvedProduct.sizes ?? []).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-14 h-12 px-3 flex items-center justify-center border rounded-md text-sm font-medium transition-all",
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background shadow-sm"
                        : "border-border text-foreground hover:border-foreground/50"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-xs text-muted-foreground mt-2">— Please select a size to continue</p>}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={cn(
                "w-full h-14 rounded-[2px] font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.99]",
                justAdded ? "bg-emerald-600 text-white"
                  : adding ? "bg-foreground/70 text-background"
                  : "bg-foreground text-background hover:opacity-90"
              )}
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span key="added" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <Check className="w-4 h-4" /> Added to Cart!
                  </motion.span>
                ) : adding ? (
                  <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-6 py-5 border-y border-border">
              {[
                { icon: Truck, label: "Free Shipping", sub: "orders above ₹599" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                { icon: ShieldCheck, label: "Secure Payment", sub: "encrypted checkout" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <p className="text-[11px] font-semibold text-foreground leading-tight">{label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{sub}</p>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <Accordion type="multiple" className="mt-4">
              {resolvedProduct.description && (
                <AccordionItem value="description">
                  <AccordionTrigger className="text-sm font-semibold">Description</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{resolvedProduct.description}</p>
                  </AccordionContent>
                </AccordionItem>
              )}
              {(material || careInstructions) && (
                <AccordionItem value="details">
                  <AccordionTrigger className="text-sm font-semibold">Product Details</AccordionTrigger>
                  <AccordionContent>
                    <dl className="text-sm space-y-2">
                      {material && (
                        <div className="flex gap-2">
                          <dt className="w-28 text-muted-foreground font-medium shrink-0">Material</dt>
                          <dd className="text-foreground">{material}</dd>
                        </div>
                      )}
                      {careInstructions && (
                        <div className="flex gap-2">
                          <dt className="w-28 text-muted-foreground font-medium shrink-0">Care</dt>
                          <dd className="text-foreground">{careInstructions}</dd>
                        </div>
                      )}
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              )}
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm font-semibold">Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Free delivery on orders above ₹599. Standard shipping 4–7 business days.
                    Returns accepted within 30 days of delivery in original condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
