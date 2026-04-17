"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useMutation, useConvexAuth } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

export default function AuthSyncProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const syncCurrentUser = useMutation(api.users.syncCurrentUser);
  const lastSyncedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user?.id) {
      if (!isAuthenticated) {
        lastSyncedUserId.current = null;
      }
      return;
    }

    if (lastSyncedUserId.current === user.id) {
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress ?? undefined;

    void syncCurrentUser({ email })
      .then(() => {
        lastSyncedUserId.current = user.id;
      })
      .catch((error) => {
        console.error("Failed to sync authenticated user with Convex", error);
      });
  }, [isAuthenticated, isLoading, syncCurrentUser, user]);

  return <>{children}</>;
}
