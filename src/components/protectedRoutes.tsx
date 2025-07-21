// components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, loading, initialized, initializeAuth } =
    useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const protectedPaths = ["/logHabit", "/addhabit"]; // Add more protected paths as needed

  useEffect(() => {
    let cleanupFn: (() => void) | null = null;

    const initAuth = async () => {
      const unsubscribe = await initializeAuth();
      cleanupFn = unsubscribe;
    };

    // Only initialize if not already initialized
    if (!initialized) {
      initAuth();
    }

    return () => {
      cleanupFn?.();
    };
  }, [initializeAuth, initialized]);

  useEffect(() => {
    // Only redirect after auth has been initialized and we're not loading
    if (
      initialized &&
      !loading &&
      !isAuthenticated &&
      protectedPaths.includes(pathname)
    ) {
      console.log("Redirecting to login...", {
        initialized,
        loading,
        isAuthenticated,
        pathname,
      });
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, initialized, router, redirectTo, pathname]);

  // Show loading spinner while authentication is being initialized or checked
  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Only check protection if we're on a protected path
  if (protectedPaths.includes(pathname)) {
    // If not authenticated and on a protected path, don't render children
    if (!isAuthenticated) {
      return null;
    }
  }

  return <>{children}</>;
};
