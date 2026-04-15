import * as React from "react"
import { Badge } from "@/components/ui/Badge"

export function PriceBadge({ variant, label }: { variant?: 'sale' | 'new', label: string }) {
  if (!variant || !label) return null;
  return (
    <div className="absolute top-2 left-2 z-10">
      <Badge variant={variant}>{label}</Badge>
    </div>
  )
}
