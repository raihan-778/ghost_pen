"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, Shield } from "lucide-react";
// import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";

import AnimatedBackground from "@/components/AnimatedBackground";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
const [typedText, setTypedText] = useState("");
const [currentTextIndex, setCurrentTextIndex] = useState(0);

const footerRef = useRef<HTMLElement>(null);
const isInView = useInView(footerRef, { once: true, amount: 0.1 });
const controls = useAnimation();

const specialChar = "||";

// const parseStringMessages = (messageString: string): string[] => {
//   if(!messageString) return []
//   return messageString.split(specialChar).filter((msg) => msg.trim());
// };

// Helper function to parse messages

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const innitialMessages = parseStringMessages(initialMessageString);

//  Function For Typing Animation
const typingTexts = useMemo(
  () => [
    "End-to-end encryption",
    "Zero data retention",
    "Complete privacy",
    "Secure messaging",
  ],
  []
);

// Optimized typing animation with useCallback

// Function for typing Animation end

export default function SendMessage() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const params = useParams<{ username: string }>();
  const username = params.username;

  // const typeText = useCallback(() => {
  //   const currentText = typingTexts[currentTextIndex];

  //   if (typedText.length < currentText.length) {
  //     setTimeout(() => {
  //       setTypedText(currentText.slice(0, typedText.length + 1));
  //     }, 100);
  //   } else {
  //     setTimeout(() => {
  //       setTypedText("");
  //       setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
  //     }, 2000);
  //   }
  // }, [typedText, currentTextIndex, typingTexts]);

  // useEffect(() => {
  //   typeText();
  // }, [typeText]);

  const fetchSuggestedMessages = async () => {
    setIsSuggestionLoading(true);

    setError("");
    setSuggestions([]);

    try {
      const res = await fetch("/api/suggest-messages", {
        method: "POST",
        body: JSON.stringify({ prompt: "" }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value);
      }

      const newSuggestions = parseStringMessages(fullText);

      setSuggestions(newSuggestions);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch suggestions.");
    } finally {
      setIsSuggestionLoading(false);
    }
  };

  // const suggestedMessages = parseStringMessages(fullText);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
    setSelectedMessage(message);
    console.log("Selected message:", message);
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast(`Success:${response.data.success}`, {
        description: `${response.data.messages}`,
      });
      console.log("send message", response.data);
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Error", {
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedBackground>
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 w-full max-w-6xl  rounded-3xl shadow-2xl border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500">
        <h1 className="text-4xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold mb-6 text-center">
          Public Profile Link
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading || !messageContent}>
                  Send It
                </Button>
              )}
            </div>
          </form>
        </Form>

        <div className="space-y-4 my-8 ">
          <div className="space-y-2 ">
            <button
              onClick={fetchSuggestedMessages}
              disabled={isSuggestionLoading}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {isSuggestionLoading ? "Generating..." : "Suggested Messages"}
                <Shield className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
              The world&apos;s most secure messaging platform with{" "}
              <span className="text-purple-400 font-medium">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </span>
            </p>
            <p>Click on any message below to select it.</p>
          </div>
          <Card className="bg-slate-800 rounded-2xl p-6 mb-6 min-h-[400px]  overflow-hidden">
            <CardHeader>
              <h3 className="text-xl accent-gradient font-bold animate-shimmer ">
                Messages
              </h3>
            </CardHeader>
            {suggestions.length ? (
              <CardContent className="flex flex-col space-y-4">
                {error ? (
                  <p className="text-red-500">{error.toLowerCase()}</p>
                ) : (
                  suggestions.map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={` bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 mb-4 group-hover:bg-blue-500/20 transition-all duration-300 mr-8 cursor-pointer ${selectedMessage === message ? "bg-blue-50 border-blue-300" : "hover:bg-gradient-to-b from-black via-gray-900 to-black hover:text-blue-500 "}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      {message}
                    </Button>
                  ))
                )}
              </CardContent>
            ) : (
              <CardContent className="flex flex-col space-y-4">
                {error ? (
                  <p className="text-red-500">{error.toLowerCase()}</p>
                ) : (
                  innitialMessages.map((message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={` bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 mb-4 group-hover:bg-blue-500/20 transition-all duration-300 mr-8 cursor-pointer ${selectedMessage === message ? "bg-blue-50 border-blue-300" : "hover:bg-gradient-to-b from-black via-gray-900 to-black hover:text-blue-500 "}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <p className=" text-md">{message}</p>
                    </Button>
                  ))
                )}
              </CardContent>
            )}
          </Card>
        </div>
        <Separator className="my-6" />
        <div className="text-center">
          <div className="mb-4">Get Your Message Board</div>
          <Link href={"/sign-up"}>
            <Button>Create Your Account</Button>
          </Link>
        </div>

        {/* Debug info (remove in production) */}
        {/* <div className="text-sm text-gray-500">
        <pre className="mt-4 text-xs bg-gray-100 p-2 rounded">
          {JSON.stringify(completion, null, 2)}
        </pre>

        <div>Form value: {form.watch("content")}</div>
        <div>Completion: {completion}</div>
      </div> */}
      </div>
    </AnimatedBackground>
  );
}
{
  /* <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30 mr-8">
  <p className="text-white text-sm">Really? That&apos;s so sweet to hear!</p>
</div>; */
}
