import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await login(email, password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useSignupMutation = () => {
  const { signup } = useAuthStore();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      await signup(email, password, username);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useGoogleLoginMutation = () => {
  const { loginWithGoogle } = useAuthStore();

  return useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useLogoutMutation = () => {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear all queries on logout
      queryClient.clear();
    },
  });
};

// Protected API queries
// export const useUserProfile = () => {
//   const { isAuthenticated } = useAuthStore();

//   return useQuery({
//     queryKey: ["user", "profile"],
//     queryFn: () => apiClient("/api/user/profile"),
//     enabled: isAuthenticated, // Only run if authenticated
//   });
// };

// export const useProtectedData = () => {
//   const { isAuthenticated } = useAuthStore();

//   return useQuery({
//     queryKey: ["protected-data"],
//     queryFn: () => apiClient("/api/protected-endpoint"),
//     enabled: isAuthenticated,
//   });
// };
