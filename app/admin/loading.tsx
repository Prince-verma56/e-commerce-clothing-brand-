import { DashboardSkeleton } from "@/components/sidebar/dashboard-skeleton";

export default function AdminLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Getting your store data...</p>
      </div>
      <DashboardSkeleton />
    </div>
  );
}
