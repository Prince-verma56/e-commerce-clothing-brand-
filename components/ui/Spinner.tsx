import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function Spinner({ className, size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent text-foreground",
        {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "md",
          "h-12 w-12": size === "lg",
        },
        className
      )}
    />
  )
}
