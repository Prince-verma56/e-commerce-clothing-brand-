"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CATEGORIES } from "@/lib/constants/mockData"

export function CategoryStrip() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="px-6 py-7 max-w-[1400px] xl:mx-auto w-full"
    >
      <h2 className="font-serif text-[18px] mb-4 text-foreground">Shop by category</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {CATEGORIES.map(category => (
          <Link 
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group block bg-secondary border border-border rounded-xl p-4 text-center cursor-pointer hover:border-foreground transition-colors"
          >
            <div className="mx-auto w-10 h-10 rounded-full bg-[#e5e1da] flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <p className="text-[11px] text-muted-foreground font-medium group-hover:text-foreground transition-colors">
              {category.label}
            </p>
          </Link>
        ))}
      </div>
    </motion.section>
  )
}
