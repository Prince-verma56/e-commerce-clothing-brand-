"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export function PromoBanner() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mx-6 my-7 max-w-[1400px] xl:mx-auto"
    >
      <div className="bg-foreground rounded-xl p-6 md:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-serif text-[20px] text-background mb-1.5">
            Custom Clothing — Design Your Own
          </h3>
          <p className="text-[12px] text-[#999]">
            Choose fabric, color, print & size. Delivered in 7–10 working days.
          </p>
        </div>
        <Link 
          href="/custom"
          className="bg-background text-foreground px-5 py-2.5 rounded-[2px] text-[12px] font-medium flex-shrink-0 hover:bg-secondary transition-colors inline-block"
        >
          Start Designing →
        </Link>
      </div>
    </motion.section>
  )
}
