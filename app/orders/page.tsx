import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PackageOpen } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-20 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl mb-8">Your Orders</h1>
      
      <div className="flex flex-col items-center justify-center py-20 text-center border border-border rounded-xl bg-secondary">
        <div className="w-16 h-16 bg-background rounded-full flex flex-col items-center justify-center mb-4 border border-border">
          <PackageOpen className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="font-medium text-lg mb-2">No orders found</h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
          You haven't placed any orders yet. Start shopping to see your orders here.
        </p>
        <Link href="/">
          <Button variant="ink" className="px-6 font-medium text-[13px]">Start Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
