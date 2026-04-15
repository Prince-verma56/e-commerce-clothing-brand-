"use client"

import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
       <div className="mb-8">
         <h1 className="text-2xl font-bold text-slate-900">Store Settings</h1>
         <p className="text-sm text-slate-500">Manage critical administrative application configurations</p>
       </div>

       <div className="grid gap-8">
         <div className="bg-white border text-sm rounded-xl overflow-hidden shadow-sm p-6">
           <h3 className="font-medium text-slate-800 text-lg mb-4 text-[16px]">Maintenance Mode</h3>
           <p className="text-slate-500 mb-6 max-w-lg">
             Prevent all non-admin users from browsing or purchasing while you update the platform.
           </p>
           <div className="flex items-center gap-3">
             <Button variant="outline-ink" disabled>Enable Maintenance</Button>
           </div>
         </div>

         <div className="bg-white border text-sm rounded-xl overflow-hidden shadow-sm p-6">
           <h3 className="font-medium text-slate-800 text-lg mb-4 text-[16px]">API Management</h3>
           <p className="text-slate-500 mb-6 max-w-lg">
             Regenerate database syncing tokens between your frontend and Convex instance.
           </p>
           <div className="flex items-center gap-3">
             <Button variant="ink" disabled>Regenerate Tokens</Button>
           </div>
         </div>
       </div>
    </div>
  )
}
