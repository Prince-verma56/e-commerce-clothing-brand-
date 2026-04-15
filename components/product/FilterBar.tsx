"use client"

import * as React from "react"
import { FILTER_OPTIONS } from "@/lib/constants/mockData"
import { SortDropdown } from "./SortDropdown"
import { cn } from "@/lib/utils/cn"

export function FilterBar({ 
  activeFilter = "all", 
  onFilterChange,
  activeSort = "relevance",
  onSortChange
}: { 
  activeFilter?: string
  onFilterChange?: (val: string) => void
  activeSort?: string
  onSortChange?: (val: string) => void
}) {
  return (
    <div className="flex items-center gap-3 px-6 pb-4 overflow-x-auto scrollbar-hide max-w-[1400px] xl:mx-auto">
      <span className="text-[11px] text-muted-foreground font-medium shrink-0 pt-0.5 uppercase tracking-wide">Filter:</span>
      
      <div className="flex items-center gap-2 flex-nowrap shrink-0">
        {FILTER_OPTIONS.map(opt => {
          const isActive = activeFilter === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onFilterChange?.(opt.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors whitespace-nowrap",
                isActive 
                  ? "bg-foreground text-background border-foreground" 
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      <div className="ml-auto flex items-center shrink-0 pl-3 border-l border-border/50">
         <SortDropdown value={activeSort} onChange={onSortChange} />
      </div>
    </div>
  )
}
