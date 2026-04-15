export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer slow ring */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-foreground/10 border-t-foreground/40 animate-spin" style={{ animationDuration: "1.2s" }} />
        {/* Inner fast ring */}
        <div className="absolute w-10 h-10 rounded-full border-2 border-transparent border-t-foreground animate-spin" style={{ animationDuration: "0.6s" }} />
        {/* Center pulse dot */}
        <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
      </div>
    </div>
  );
}
