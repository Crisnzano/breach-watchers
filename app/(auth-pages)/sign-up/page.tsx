import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen justify-center gap-2 p-4 bg-purple-200">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-purple-200 w-full">
      <form className="flex flex-col p-8 bg-purple-900 rounded-lg text-white w-full max-w-md">
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
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            className="text-white"
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
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
