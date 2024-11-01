"use client"; // Mark this component as a Client Component

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup({ searchParams }: { searchParams: Message }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await signUpAction(formData);
    console.log('respppp', response);

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
      //setError(response.message); // Show error message to the user
    }
  };

  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen justify-center gap-2 p-4 bg-purple-200">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-purple-200 w-full">
      <form className="flex flex-col p-8 bg-purple-900 rounded-lg text-white w-full max-w-md" onSubmit={handleSignUp}>
        <h1 className="text-3xl font-medium mb-4">Sign up</h1>
        <p className="text-sm mb-6">
          Already have an account?{" "}
          <Link className="text-purple-200 font-medium underline" href="/sign-in">
            Sign in
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
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            className="text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Capture password input
          />
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <SubmitButton pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <div className="flex justify-center mt-10">
            <Link className="underline" href="/account">
              Register your Business
            </Link>
          </div>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
