"use client";

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const HERO_SLIDES = [
  {
    tag: "NEW COLLECTION 2025",
    title: "Style That Speaks For You",
    subtitle: "Embrace the new era of fashion with our latest drop.",
    bg: "bg-[#ede9e3]",
    cta: "Shop Collection →",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    tag: "SUMMER ESSENTIALS",
    title: "VERSATILE SHIRTS",
    subtitle: "Breathable fabrics for the perfect summer getaway.",
    bg: "bg-[#d0e8d4]",
    cta: "Explore Shirts →",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    tag: "STREETWEAR DROP",
    title: "Urban Comfort",
    subtitle: "Oversized fits designed for everyday movement.",
    bg: "bg-[#e8d0d0]",
    cta: "Shop Streetwear →",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop",
  }
]

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full ml-0">
          {HERO_SLIDES.map((slide, index) => (
            <CarouselItem key={index} className="relative h-[500px] pl-0">
              <div 
                className={`absolute inset-0 z-0 ${slide.bg}`}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black/30" />
              </div>
              
              <div className="relative z-10 h-full flex items-center pl-6 md:pl-16 w-full max-w-7xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-[80%] md:max-w-[50%]"
                >
                  <span className="text-[11px] mb-4 uppercase tracking-[0.2em] text-white/90 font-medium block">
                    {slide.tag}
                  </span>
                  
                  <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-white mb-6 uppercase">
                    {slide.title}
                  </h1>
                  
                  <p className="text-white/90 text-sm md:text-base mb-8 max-w-md">
                    {slide.subtitle}
                  </p>
                  
                  <Link 
                    href="/category/new-in"
                    className="inline-block bg-white text-black px-8 py-3.5 rounded-sm text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    {slide.cta}
                  </Link>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
