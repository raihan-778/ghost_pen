"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";

function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  //Zod Implementation

  const form = useForm<z.infer<typeof signInSchema>>({
    // here z.infer<typeof signUpSchema> is used to infer the type of the schema.when we use zodResolver it will automatically infer the type of the to give the type seafty to get information form form.
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    //here we will use next auth insted of axios

    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    console.log("signIn result", result);

    if (result?.error === "CredentialsSignInError") {
      toast.error("Login Failed due to incorrect username or password");
    }
    if (result?.url) {
      router.replace(`/dashboard`);
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystry Message
          </h1>
          <p className="mb-4">Sign In to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Write Your Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is Input Form for Email/Username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is Input Form for password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>New User!!</p>
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
