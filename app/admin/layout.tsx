import AdminAccessGate from '@/components/admin/AdminAccessGate';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAccessGate>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-background overflow-hidden relative">
          <AppSidebar />
          <main className="flex-1 flex flex-col h-screen overflow-hidden">
            <header className="h-14 bg-card border-b border-border items-center px-8 shadow-sm shrink-0 hidden md:flex justify-between">
              <span className="text-sm text-muted-foreground font-medium">Admin Panel</span>
              <span className="text-xs text-muted-foreground">The Souled Store © 2025</span>
            </header>
            <header className="h-14 bg-card border-b border-border flex items-center px-6 shadow-sm shrink-0 md:hidden">
              <span className="font-serif text-lg font-medium text-foreground">ADMIN</span>
            </header>
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </AdminAccessGate>
  );
}
