import { useAuthStore } from "@/store/auth";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry(failureCount, error: any) {
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3; // Retry up to 3 times
      },
    },
  },
});

export const apiClient = async (url: string, options: RequestInit = {}) => {
  const { token } = useAuthStore.getState();
  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  if (response.status === 401 || response.status === 403) {
    // Token expired or invalid
    useAuthStore.getState().logout();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
