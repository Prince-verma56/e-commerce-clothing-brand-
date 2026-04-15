"use client"

import * as React from "react"
import { SORT_OPTIONS } from "@/lib/constants/mockData"

export function SortDropdown({ value, onChange }: { value?: string, onChange?: (val: string) => void }) {
  return (
    <select 
      value={value} 
      onChange={(e) => onChange?.(e.target.value)}
      className="h-8 rounded-md border border-input bg-background px-2 py-1 text-[12px] shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
    >
      {SORT_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}
