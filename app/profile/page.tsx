import { UserProfile } from '@clerk/nextjs';
import { ShoppingBag } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ProfilePage() {
  return (
    <div className="max-w-[1400px] xl:mx-auto px-6 py-10 md:py-16">
      <h1 className="font-serif text-3xl mb-8">My Account</h1>
      
      <div className="flex flex-col lg:flex-row gap-10 items-start">
         {/* User Account Settings (Managed via Clerk UX) */}
         <div className="w-full lg:w-[60%] border border-border shadow-sm rounded-[1rem] overflow-hidden bg-background">
            <UserProfile 
               appearance={{
                  elements: { 
                     rootBox: "w-full",
                     cardBox: "w-full",
                     card: "w-full min-w-[100%] shadow-none border-none bg-background rounded-none",
                     navbar: "hidden md:flex", // Keep default behavior mostly native
                  } 
               }} 
               routing="hash"
            />
         </div>

         {/* Order History (Application Context) */}
         <div className="w-full lg:w-[40%]">
             <div className="bg-secondary p-6 rounded-xl border border-border sticky top-24">
                 <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                   <ShoppingBag className="w-5 h-5" /> Recent Orders
                 </h2>
                 {/* For phase 4: Provide an elegant empty state since Convex Orders logic is new */}
                 <EmptyState 
                    icon={ShoppingBag}
                    title="No Orders Yet"
                    description="When you place orders, they will appear here so you can easily track deliveries."
                    actionLabel="Shop New Arrivals"
                    actionUrl="/category/new-in"
                 />
             </div>
         </div>
      </div>
    </div>
  );
}
