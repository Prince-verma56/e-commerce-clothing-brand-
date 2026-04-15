import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "sale" | "new"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[2px] border px-1.5 py-0.5 text-[9px] font-medium tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground": variant === "default",
          "border-transparent bg-[var(--brand-red)] text-white": variant === "sale",
          "border-transparent bg-foreground text-background": variant === "new",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
