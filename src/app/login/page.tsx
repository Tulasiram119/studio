import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, { message: "Email or username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome back</h1>
        <div className="w-full max-w-md">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4 text-left">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email or username
              </label>
              <Input
                type="text"
                id="email"
                placeholder="Enter your email or username"
                {...form.register("emailOrUsername")}
              />
              {form.formState.errors.emailOrUsername && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.emailOrUsername.message}</p>
              )}
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full mb-4 bg-purple-600 text-white hover:bg-purple-700">Login</Button>
          </form>
          <Button variant="outline" className="w-full flex items-center justify-center">
            <img src="/google-icon.svg" alt="Google Icon" className="w-5 h-5 mr-2" />
            Login with Google
          </Button>
          <Link href="/signup" className="block mt-4 text-sm text-purple-600 hover:underline">Don't have an account? Sign up</Link>
        </div>
      </main>
    </div>
  );
}
