"use client";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login({ searchParams }: { searchParams: Message }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await signInAction(formData);

    if (response.status === "success") {
      // Set user ID to local storage on the client side
      if (response.userId) {
        localStorage.setItem("userId", response.userId);
      }
      // Redirect user
      router.push(response.redirectTo);
    } else {
      // Handle error
      console.error(response.message);
      setError(response.message); // Show error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-purple-200">
      <form className="flex flex-col p-8 bg-purple-900 rounded-lg text-white w-full max-w-md" onSubmit={handleSignIn}>
        <h1 className="text-3xl font-medium mb-4">Sign in</h1>
        <p className="text-sm mb-6">
          Don&apos;t have an account?{" "}
          <Link className="text-purple-200 font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            className="text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Capture email input
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-purple-200 underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            className="text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Capture password input
          />
          <SubmitButton pendingText="Signing In...">
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        </div>
      </form>
    </div>
  );
}
