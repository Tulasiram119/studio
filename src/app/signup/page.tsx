import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
    // Handle signup logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Create your account</h1>
        <div className="w-full max-w-md">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4 text-left">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Input type="email" id="email" placeholder="Email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="mb-4 text-left">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <Input type="text" id="username" placeholder="Username" {...form.register("username")} />
              {form.formState.errors.username && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.username.message}</p>
              )}
            </div>
            <div className="mb-4 text-left">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <Input type="password" id="password" placeholder="Password" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <Input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                {...form.register("confirmPassword")}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full mb-4 bg-purple-600 text-white hover:bg-purple-700">Sign Up</Button>
          </form>
          <Button variant="outline" className="w-full flex items-center justify-center">
            <img src="/search-icon.svg" alt="Search Icon" className="w-5 h-5 mr-2" />
            Sign Up with SearchEngineCo
          </Button>
          <Link href="/login" className="block mt-4 text-sm text-purple-600 hover:underline">Already have an account? Sign in</Link>
        </div>
      </main>
    </div>
  );
}
