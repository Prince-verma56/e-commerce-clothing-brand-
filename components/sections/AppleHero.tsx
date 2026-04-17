"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const PRODUCT_VARIANTS = [
  {
    id: "midnight",
    name: "Midnight Black",
    color: "#1a1a1a",
    tagline: "The Perfect Heavyweight Tee",
    subtitle: "Crafted for those who wear confidence.",
    specs: ["240 GSM", "100% Organic Cotton", "Preshrunk Fabric"],
    accentBg: "from-zinc-900/40",
  },
  {
    id: "stone",
    name: "Stone White",
    color: "#e8e4dc",
    tagline: "Clean Lines, Premium Feel",
    subtitle: "Minimal by design. Made to last.",
    specs: ["240 GSM", "Enzyme Washed", "Relaxed Fit"],
    accentBg: "from-stone-200/40",
  },
  {
    id: "forest",
    name: "Forest Green",
    color: "#2d5a3d",
    tagline: "Grounded. Timeless. Yours.",
    subtitle: "Earth tones for every season.",
    specs: ["240 GSM", "GOTS Certified", "Drop Shoulder"],
    accentBg: "from-emerald-900/40",
  },
  {
    id: "rust",
    name: "Rust Orange",
    color: "#9b4a1c",
    tagline: "Bold Enough to Stand Out",
    subtitle: "Streetwear essentials, redefined.",
    specs: ["240 GSM", "Pigment Dyed", "Oversized Fit"],
    accentBg: "from-orange-900/40",
  },
];

export function AppleHero() {
  const [selectedId, setSelectedId] = React.useState("midnight");
  const variant = PRODUCT_VARIANTS.find((v) => v.id === selectedId)!;

  return (
    <section className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Ambient background gradient — shifts with variant */}
      <AnimatePresence mode="wait">
        <motion.div
          key={variant.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${variant.accentBg} to-transparent pointer-events-none`}
        />
      </AnimatePresence>

      {/* 3D Canvas Injection Point */}
      <div
        id="hero-3d-canvas"
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        {/* Placeholder visual — replace with <Canvas> from @react-three/fiber */}
        <motion.div
          key={variant.id + "-swatch"}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-72 h-72 md:w-96 md:h-96 rounded-3xl shadow-2xl"
          style={{ backgroundColor: variant.color }}
        >
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <span className="text-white text-[10px] uppercase tracking-[0.3em] font-medium">
              3D Model
            </span>
          </div>
        </motion.div>
      </div>

      {/* Left: Product Title & Tagline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={variant.id + "-left"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 z-10 max-w-[220px] md:max-w-[280px]"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 font-medium">
            New Drop
          </p>
          <h1 className="font-serif text-3xl md:text-4xl leading-tight text-foreground mb-3">
            {variant.tagline}
          </h1>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {variant.subtitle}
          </p>
          <Link
            href="/category/new-in"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-[13px] font-medium rounded-full hover:bg-foreground/85 transition-colors"
          >
            Shop Now →
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Right: Specs Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={variant.id + "-right"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-10 max-w-[180px] md:max-w-[220px]"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 font-medium">
            Fabric Specs
          </p>
          <ul className="space-y-3">
            {variant.specs.map((spec, i) => (
              <motion.li
                key={spec}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: variant.color }}
                />
                {spec}
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-[11px] text-muted-foreground">Starting at</p>
            <p className="text-2xl font-semibold text-foreground mt-0.5">₹499</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom: Variant Configurator Strip */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          Select Colour
        </p>
        <div className="flex items-center gap-3 bg-background/60 backdrop-blur-md border border-border/60 rounded-full px-5 py-3 shadow-lg">
          {PRODUCT_VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              title={v.name}
              className="relative w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none"
              style={{ backgroundColor: v.color }}
            >
              {selectedId === v.id && (
                <motion.span
                  layoutId="swatch-ring"
                  className="absolute -inset-1 rounded-full border-2 border-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <motion.p
          key={variant.name}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-muted-foreground"
        >
          {variant.name}
        </motion.p>
      </div>
    </section>
  );
}
