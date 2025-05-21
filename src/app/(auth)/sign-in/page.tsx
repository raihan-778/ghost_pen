"use client";

import { Form } from "@/components/ui/form";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useDebounceValue } from "usehooks-ts";
import * as z from "zod";

function Page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceValue(username, 500);

  const router = useRouter();

  //Zod Implementation

  const form = useForm<z.infer<typeof signUpSchema>>({
    // here z.infer<typeof signUpSchema> is used to infer the type of the schema.when we use zodResolver it will automatically infer the type of the to give the type seafty to get information form form.
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const respones = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          console.log("axios Api get Response", respones);
          setUsernameMessage(respones.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error Checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUserNameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    //here we will get data from react hook form submit handler.

    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast.success("Sign Up Form Submitted Successfully");
      console.log("axios Api post Response", data);
      console.log("axios Api post Response", response);

      router.replace(`/api/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      const errorMessage = axiosError.response?.data.message;

      toast.error(`Sign Up Failed :${errorMessage}`);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystry Message
          </h1>
          <p className="mb-4">Sign Up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
