"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable, type TableConfig } from "@/components/sidebar/data-table";
import { Button } from "@/components/ui/Button";
import { Eye } from "lucide-react";

type OrderRow = {
  id: string;
  orderId: string;
  customerName: string;
  totalAmount: number;
  date: number;
  status: string;
};

export default function AdminOrdersPage() {
  const orders = useQuery(api.orders.list, {});

  if (orders === undefined) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded"></div>
        <div className="h-[400px] w-full bg-muted rounded-xl"></div>
      </div>
    );
  }

  const data: OrderRow[] = orders.map((o) => ({
    id: o._id,
    orderId: `#ORD-${o._id.slice(-6).toUpperCase()}`,
    customerName: o.shippingAddress?.fullName || "Guest",
    totalAmount: o.totalAmount,
    date: o._creationTime,
    status: o.status,
  }));

  // Ensure data is sorted by date descending (newest first)
  data.sort((a, b) => b.date - a.date);

  const config: TableConfig<OrderRow> = {
    title: "Orders Management",
    description: "View and process customer orders.",
    searchKey: "orderId",
    searchPlaceholder: "Search by Order ID...",
    statusKey: "status",
    columns: [
      {
        key: "orderId",
        header: "Order ID",
        cell: (row) => <span className="font-mono text-xs font-semibold uppercase text-muted-foreground">{row.orderId}</span>,
      },
      {
        key: "customerName",
        header: "Customer Name",
        cell: (row) => <span className="font-medium text-foreground">{row.customerName}</span>,
      },
      {
        key: "date",
        header: "Date",
        cell: (row) => {
          return (
            <span className="text-muted-foreground text-sm">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(row.date)}
            </span>
          );
        },
      },
      {
        key: "totalAmount",
        header: "Total Amount",
        cell: (row) => <span className="font-bold text-foreground">₹{row.totalAmount.toLocaleString("en-IN")}</span>,
      },
      {
        key: "status",
        header: "Status",
        type: "status",
      },
      {
        key: "actions",
        header: "Actions",
        sortable: false,
        cell: (row) => (
          <Button variant="ghost" size="sm" className="h-8 shadow-none" title="View Details">
            <Eye className="size-4 mr-2" />
            View
          </Button>
        ),
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Process and track customer shipments.</p>
        </div>
      </div>

      <DataTable config={config} data={data} />
    </div>
  );
}
