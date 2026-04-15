"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { CartSummary } from "@/components/cart/CartSummary";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { total, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const amountToPay = total();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountToPay }),
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          clearCart();
          router.push("/orders");
        }, 2000);
      } else {
        alert("Payment failed! Please try again.");
      }
    } catch (err) {
      alert("Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 text-2xl">
          ✓
        </div>
        <h2 className="font-serif text-3xl mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground text-sm">Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-20 max-w-6xl mx-auto">
      <h1 className="font-serif text-3xl mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-medium mb-4">Delivery Address</h2>
          <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">Full Name</Label>
                <Input id="name" required placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                <Input id="phone" required placeholder="9876543210" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="line1" className="text-xs">Address Line 1</Label>
              <Input id="line1" required placeholder="Flat, House no., Building, Company" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-xs">City</Label>
                <Input id="city" required placeholder="Mumbai" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="state" className="text-xs">State</Label>
                <Input id="state" required placeholder="Maharashtra" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="pincode" className="text-xs">Pincode</Label>
              <Input id="pincode" required placeholder="400001" />
            </div>
          </form>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>
          <div className="border border-border rounded-xl bg-secondary/30 overflow-hidden sticky top-24">
            <CartSummary />
            <div className="p-4 pt-0">
              <Button 
                variant="ink" 
                className="w-full font-medium h-12 text-[13px]"
                type="submit"
                form="checkout-form"
                disabled={loading || amountToPay === 0}
              >
                {loading ? "Processing..." : `Pay ₹${amountToPay.toLocaleString('en-IN')}`}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-3">
                100% secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
