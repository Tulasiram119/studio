import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  initialized: boolean; // Add this to track if auth has been initialized

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<() => void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true, // Start with loading true
      token: null,
      isAuthenticated: false,
      initialized: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          loading: false,
        }),
      setLoading: (loading) => set({ loading }),
      setToken: (token) => set({ token }),

      login: async (email: string, password: string) => {
        try {
          set({ loading: true });
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const token = await getIdToken(userCredential.user);
          set({
            user: userCredential.user,
            token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      signup: async (email: string, password: string, username: string) => {
        try {
          set({ loading: true });
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName: username });
            const updatedToken = await getIdToken(userCredential.user, true);
            const updateUser = auth.currentUser;
            set({
              user: updateUser,
              token: updatedToken,
              isAuthenticated: true,
              loading: false,
            });
          } else {
            set({ loading: false });
            throw new Error("User not found after signup.");
          }
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        try {
          set({ loading: true });
          const provider = new GoogleAuthProvider();
          const userCredential = await signInWithPopup(auth, provider);
          const token = await getIdToken(userCredential.user);
          set({
            user: userCredential.user,
            token,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      initializeAuth: async () => {
        return new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
              try {
                const token = await getIdToken(user);
                set({
                  user,
                  token,
                  isAuthenticated: true,
                  loading: false,
                  initialized: true,
                });
              } catch (error) {
                console.error("Error getting token:", error);
                set({
                  user: null,
                  token: null,
                  isAuthenticated: false,
                  loading: false,
                  initialized: true,
                });
              }
            } else {
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                initialized: true,
              });
            }
          });
          resolve(unsubscribe);
        });
      },
    }),
    {
      name: "auth-storage",
      // Don't persist loading and initialized states
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user
          ? {
              uid: state.user.uid,
              email: state.user.email,
              displayName: state.user.displayName,
              photoURL: state.user.photoURL,
              emailVerified: state.user.emailVerified,
            }
          : null,
      }),
      // Override hydration to ensure proper loading state
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loading = true; // Always start with loading true after hydration
          state.initialized = false;
        }
      },
    }
  )
);
