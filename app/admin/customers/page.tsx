"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { User, Shield, UserCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

type ConvexUser = {
  _id: string;
  _creationTime: number;
  clerkId: string;
  email: string;
  role: "user" | "admin";
};

function RoleBadge({ role }: { role: "user" | "admin" }) {
  if (role === "admin") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
        <Shield className="w-3 h-3" />
        Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
      <UserCheck className="w-3 h-3" />
      Customer
    </span>
  );
}

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CustomerRow({ user, index }: { user: ConvexUser; index: number }) {
  const initials = user.email.slice(0, 2).toUpperCase();

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="border-b border-border hover:bg-muted/30 transition-colors"
    >
      <td className="px-4 py-3 w-12">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary">
          {initials}
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-foreground">{user.email.split("@")[0]}</p>
        <p className="text-[11px] text-muted-foreground">{user.email}</p>
      </td>
      <td className="px-4 py-3">
        <RoleBadge role={user.role} />
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {formatDate(user._creationTime)}
      </td>
    </motion.tr>
  );
}

export default function AdminCustomersPage() {
  const users = useQuery(api.users.list);

  const adminCount = users?.filter((u) => u.role === "admin").length ?? 0;
  const customerCount = users?.filter((u) => u.role === "user").length ?? 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            All registered users in your store
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              {users?.length ?? "—"} total
            </span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: users?.length ?? 0, icon: Users, color: "text-blue-500" },
          { label: "Customers", value: customerCount, icon: UserCheck, color: "text-green-500" },
          { label: "Admins", value: adminCount, icon: Shield, color: "text-amber-500" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-xl font-bold text-foreground">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-medium text-foreground">User Directory</h2>
        </div>

        {users === undefined ? (
          <div className="py-16 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-border border-t-foreground rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground text-sm">
            No users found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-2 text-left w-12"></th>
                  <th className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    User
                  </th>
                  <th className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <CustomerRow key={user._id} user={user as ConvexUser} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
