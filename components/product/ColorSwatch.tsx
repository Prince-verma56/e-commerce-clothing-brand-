import * as React from "react"

export function ColorSwatch({ colors, max = 4 }: { colors: string[], max?: number }) {
  if (!colors || colors.length === 0) return null;

  const displayColors = colors.slice(0, max);
  const excess = colors.length - max;

  return (
    <div className="flex items-center gap-1 mt-1.5">
      {displayColors.map((color, i) => (
        <div 
          key={i} 
          className="w-2.5 h-2.5 rounded-full border border-border cursor-pointer shadow-sm"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
      {excess > 0 && <span className="text-[9px] text-muted-foreground ml-0.5 font-medium">+{excess}</span>}
    </div>
  )
}
