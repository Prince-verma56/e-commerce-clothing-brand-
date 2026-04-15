import * as React from "react"
import Link from "next/link"
import { TRENDING_TAGS } from "@/lib/constants/mockData"

export function TrendingTags() {
  return (
    <section className="max-w-[1400px] xl:mx-auto w-full mb-2">
      <h2 className="font-serif text-[18px] px-6 mb-3 text-foreground">Fan merch picks</h2>
      <div className="px-6 pb-5 flex gap-2 overflow-x-auto scrollbar-hide">
        {TRENDING_TAGS.map(tag => (
          <Link
            key={tag}
            href={`/category/fan-merch?tag=${encodeURIComponent(tag)}`}
            className="flex-shrink-0 px-3 py-1.5 bg-secondary border border-border rounded-full text-[11px] text-muted-foreground font-medium hover:border-foreground hover:text-foreground transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  )
}
