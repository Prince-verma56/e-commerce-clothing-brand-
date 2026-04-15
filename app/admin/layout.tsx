import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  // Strict RBAC via Clerk publicMetadata.role
  if (user?.publicMetadata?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top header bar (desktop) */}
        <header className="h-14 bg-card border-b border-border items-center px-8 shadow-sm shrink-0 hidden md:flex justify-between">
          <span className="text-sm text-muted-foreground font-medium">Admin Panel</span>
          <span className="text-xs text-muted-foreground">The Souled Store © 2025</span>
        </header>
        {/* Mobile header */}
        <header className="h-14 bg-card border-b border-border flex items-center px-6 shadow-sm shrink-0 md:hidden">
          <span className="font-serif text-lg font-medium text-foreground">ADMIN</span>
        </header>
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
