"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useState } from "react";
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import { useModeStore } from "@/store/mode";
import { useGoogleLoginMutation, useSignupMutation } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(30, { message: "Username must be less than 30 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password must be less than 100 characters" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const signupMutation = useSignupMutation();
  const googleLoginMutation = useGoogleLoginMutation();
  const isDarkMode = useModeStore((state) => state.isDarkMode);
  const router = useRouter();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signupMutation.mutateAsync({
        email: data.email,
        password: data.password,
        username: data.username,
      });
      router.push("/logHabit");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLoginMutation.mutateAsync();
      router.push("/logHabit");
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen py-8 px-4 font-inter transition-all duration-300 $`}
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <Card
        className={`w-full max-w-md shadow-xl rounded-xl transition-all duration-300 border-0 `}
        style={{
          boxShadow: isDarkMode
            ? "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
            : "0 20px 25px -5px rgba(75, 0, 130, 0.1), 0 10px 10px -5px rgba(75, 0, 130, 0.05)",
        }}
      >
        <CardHeader className="pb-6">
          <CardTitle
            className={`text-3xl font-bold text-center font-inter tracking-tight transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            style={{ color: isDarkMode ? "#FFFFFF" : "#4B0082" }}
          >
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <div className="space-y-5">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium font-inter transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                          style={{ color: "#BF00FF" }}
                        />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className={`pl-10 rounded-lg border-2 transition-all duration-300 font-inter ${
                            isDarkMode
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-purple-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                          } focus:ring-2 focus:ring-purple-300`}
                          style={{
                            borderColor: isDarkMode ? "#6B7280" : "#D1D5DB",
                            backgroundColor: isDarkMode ? "#4B5563" : "#FFFFFF",
                          }}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription
                      className={`text-xs font-inter transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      We'll use this to send you updates about your habits
                    </FormDescription>
                    <FormMessage className="text-red-500 font-inter" />
                  </FormItem>
                )}
              />

              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium font-inter transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Username
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User
                          className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                          style={{ color: "#BF00FF" }}
                        />
                        <Input
                          type="text"
                          placeholder="Choose a username"
                          className={`pl-10 rounded-lg border-2 transition-all duration-300 font-inter ${
                            isDarkMode
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-purple-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                          } focus:ring-2 focus:ring-purple-300`}
                          style={{
                            borderColor: isDarkMode ? "#6B7280" : "#D1D5DB",
                            backgroundColor: isDarkMode ? "#4B5563" : "#FFFFFF",
                          }}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription
                      className={`text-xs font-inter transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      This will be your display name
                    </FormDescription>
                    <FormMessage className="text-red-500 font-inter" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium font-inter transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                          style={{ color: "#BF00FF" }}
                        />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className={`pl-10 pr-10 rounded-lg border-2 transition-all duration-300 font-inter ${
                            isDarkMode
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-purple-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                          } focus:ring-2 focus:ring-purple-300`}
                          style={{
                            borderColor: isDarkMode ? "#6B7280" : "#D1D5DB",
                            backgroundColor: isDarkMode ? "#4B5563" : "#FFFFFF",
                          }}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent rounded-r-lg"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff
                              className={`h-4 w-4 transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                              style={{ color: "#BF00FF" }}
                            />
                          ) : (
                            <Eye
                              className={`h-4 w-4 transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                              style={{ color: "#BF00FF" }}
                            />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription
                      className={`text-xs font-inter transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Must be at least 6 characters long
                    </FormDescription>
                    <FormMessage className="text-red-500 font-inter" />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`text-sm font-medium font-inter transition-colors duration-300 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                          style={{ color: "#BF00FF" }}
                        />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className={`pl-10 pr-10 rounded-lg border-2 transition-all duration-300 font-inter ${
                            isDarkMode
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-purple-400"
                              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                          } focus:ring-2 focus:ring-purple-300`}
                          style={{
                            borderColor: isDarkMode ? "#6B7280" : "#D1D5DB",
                            backgroundColor: isDarkMode ? "#4B5563" : "#FFFFFF",
                          }}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent rounded-r-lg"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff
                              className={`h-4 w-4 transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                              style={{ color: "#BF00FF" }}
                            />
                          ) : (
                            <Eye
                              className={`h-4 w-4 transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                              style={{ color: "#BF00FF" }}
                            />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription
                      className={`text-xs font-inter transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Re-enter your password to confirm
                    </FormDescription>
                    <FormMessage className="text-red-500 font-inter" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={!form.formState.isValid || signupMutation.isPending}
                className="w-full rounded-lg font-semibold font-inter text-white transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #4B0082 0%, #BF00FF 100%)",
                  boxShadow: "0 4px 15px 0 rgba(191, 0, 255, 0.3)",
                }}
              >
                {signupMutation.isPending
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              {/* Separator */}
              <div className="relative my-6">
                <Separator
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-600" : "bg-gray-300"
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`px-3 text-xs font-inter transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-white text-gray-500"
                    }`}
                    style={{
                      backgroundColor: isDarkMode ? "#404040" : "#FFFFFF",
                    }}
                  >
                    OR
                  </span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={googleLoginMutation.isPending}
                className={`w-full rounded-lg font-inter border-2 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 ${
                  isDarkMode
                    ? "border-gray-500 bg-gray-600 text-white hover:bg-gray-500"
                    : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                }`}
                style={{
                  borderColor: isDarkMode ? "#6B7280" : "#D1D5DB",
                  backgroundColor: isDarkMode ? "#4B5563" : "#FFFFFF",
                }}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {googleLoginMutation.isPending
                  ? "Signing in..."
                  : "Sign up with Google"}
              </Button>
            </div>
          </Form>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p
              className={`text-sm font-inter transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium hover:underline transition-colors duration-300"
                style={{ color: "#BF00FF" }}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
