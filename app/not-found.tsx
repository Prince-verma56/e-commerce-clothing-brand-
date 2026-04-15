import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-6 relative overflow-hidden bg-background">
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-background to-secondary/50 -z-10 animate-pulse" />
      
      <div className="text-center max-w-md mx-auto relative z-10">
        <h1 className="font-serif text-[120px] md:text-[160px] leading-none text-foreground mb-2 drop-shadow-sm">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-serif text-foreground mb-4">
          Looks like this page got snapped away.
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved to another universe.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="ink" className="w-full sm:w-auto h-11 px-8 rounded-[2px]">
              Back to Home
            </Button>
          </Link>
          <Link href="/category/new-in">
            <Button variant="outline-ink" className="w-full sm:w-auto h-11 px-8 rounded-[2px]">
              Browse New Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
