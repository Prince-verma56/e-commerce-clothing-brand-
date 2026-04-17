"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { ShieldAlert } from "lucide-react";
import { api } from "@/convex/_generated/api";

export default function AdminAccessGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const syncCurrentUser = useMutation(api.users.syncCurrentUser);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasAttemptedSync, setHasAttemptedSync] = useState(false);
  const currentUser = useQuery(
    api.users.getCurrent,
    isAuthenticated ? {} : "skip",
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (
      isLoading ||
      !isAuthenticated ||
      currentUser !== null ||
      hasAttemptedSync ||
      !user?.id
    ) {
      return;
    }

    setIsSyncing(true);
    setHasAttemptedSync(true);

    void syncCurrentUser({
      email: user.primaryEmailAddress?.emailAddress ?? undefined,
    }).finally(() => {
      setIsSyncing(false);
    });
  }, [
    currentUser,
    hasAttemptedSync,
    isAuthenticated,
    isLoading,
    syncCurrentUser,
    user,
  ]);

  if (isLoading || isSyncing || (isAuthenticated && currentUser === undefined)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-secondary border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="size-5" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account does not have permission to open the dashboard yet.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
