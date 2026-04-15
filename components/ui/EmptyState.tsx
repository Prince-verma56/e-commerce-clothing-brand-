import * as React from "react"
import Link from "next/link"
import { Button } from "./Button"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionUrl: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionUrl }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-border border-dashed rounded-xl bg-secondary/50 max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-border">
        <Icon className="w-8 h-8 text-muted-foreground opacity-60" />
      </div>
      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
        {description}
      </p>
      <Link href={actionUrl}>
        <Button variant="ink" className="px-8 h-12 rounded-[2px]">
          {actionLabel}
        </Button>
      </Link>
    </div>
  )
}
