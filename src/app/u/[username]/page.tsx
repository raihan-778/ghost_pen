"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, Shield } from "lucide-react";
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
import GradientButton from "@/components/ui/gradientButton";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

const specialChar = "||";

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const innitialMessages = parseStringMessages(initialMessageString);

export default function SendMessage() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const params = useParams<{ username: string }>();
  const username = params.username;

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
      {/* Main Container - Responsive padding and sizing */}
      <div className="my-4 sm:my-6 md:my-8 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-auto p-3 sm:p-4 md:p-5 lg:p-6 w-full max-w-[calc(100vw-2rem)] sm:max-w-4xl xl:max-w-6xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500">
        {/* Main Title - Responsive typography */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold mb-4 sm:mb-5 md:mb-6 text-center leading-tight">
          Public Profile Link
        </h1>

        {/* Form Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5 md:space-y-6"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base sm:text-lg md:text-xl text-blue-500 block">
                    Send Anonymous Message to{" "}
                    <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text break-all">
                      @{username}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here"
                      className="resize-none text-cyan-400 text-sm sm:text-base md:text-lg lg:text-xl min-h-[80px] sm:min-h-[100px] md:min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button - Responsive sizing */}
            <div className="flex justify-center">
              {isLoading ? (
                <GradientButton
                  disabled
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </GradientButton>
              ) : (
                <GradientButton
                  type="submit"
                  variant="secondary"
                  disabled={isLoading || !messageContent}
                  className="w-full text-center justify-center sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                >
                  Send It
                </GradientButton>
              )}
            </div>
          </form>
        </Form>

        {/* Suggestions Section */}
        <div className="space-y-3  sm:space-y-4 my-6 sm:my-7 md:my-8">
          <div className="space-y-2 sm:space-y-3">
            {/* Suggest Messages Button - Responsive */}
            <button
              onClick={fetchSuggestedMessages}
              disabled={isSuggestionLoading}
              className="group w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base md:text-lg hover:shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSuggestionLoading ? "Generating..." : "Suggested Messages"}
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            <p className="text-xs sm:text-sm md:text-base font-medium text-blue-500 text-center sm:text-left">
              Click on any message below to select it.
            </p>
          </div>

          {/* Messages Card - Responsive */}
          <Card className="bg-slate-800 mx-auto rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-5 md:mb-6 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] overflow-hidden">
            <CardHeader className="p-2 sm:p-4 md:p-6">
              <h3 className="text-lg sm:text-xl md:text-2xl accent-gradient font-bold animate-shimmer text-center sm:text-left">
                Messages
              </h3>
            </CardHeader>

            {/* Dynamic Messages */}
            {suggestions.length ? (
              <CardContent className=" flex flex-col space-y-3 sm:space-y-4 md:space-y-6 p-2 sm:p-3 md:p-4    ">
                {error ? (
                  <p className="text-red-500 text-xs sm:text-sm md:text-base break-words text-center">
                    {error.toLowerCase()}
                  </p>
                ) : (
                  suggestions.map((message, index) => (
                    <Button
                      key={index}
                      variant="default"
                      className={`
                        w-full
                        bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                        rounded-lg sm:rounded-xl md:rounded-2xl 
                        border border-blue-500/20 
                        group-hover:bg-blue-500/20 
                        transition-all duration-300 
                        cursor-pointer
                        p-2 sm:p-3 md:p-4 lg:p-5
                        min-h-[auto] sm:min-h-[3.5rem] md:min-h-[4rem]
                        h-auto
                        whitespace-normal
                        text-left
                        $${
                          selectedMessage === message
                            ? "bg-blue-600 border-blue-300"
                            : "hover:bg-gradient-to-b from-black via-gray-900 to-black hover:text-blue-500"
                        }
                      `}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3 w-full">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full flex-shrink-0 mt-1 sm:mt-1.5"></div>
                        <span className="text-xs sm:text-sm md:text-base text-gray-200 text-left leading-normal sm:leading-relaxed break-words flex-1 min-w-0">
                          {message}
                        </span>
                      </div>
                    </Button>
                  ))
                )}
              </CardContent>
            ) : (
              /* Initial Messages */
              <CardContent className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6 p-2 sm:p-3 md:p-4">
                {error ? (
                  <p className="text-red-500 text-xs sm:text-sm md:text-base text-center">
                    {error.toLowerCase()}
                  </p>
                ) : (
                  innitialMessages.map((message, index) => (
                    <Button
                      key={index}
                      variant="default"
                      className={`
                        w-full
                        bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                        rounded-lg sm:rounded-xl md:rounded-2xl 
                        border border-blue-500/20 
                        group-hover:bg-blue-500/20 
                        transition-all duration-300 
                        cursor-pointer
                        p-3 sm:p-4 md:p-5
                        min-h-[3rem] sm:min-h-[1.5rem] md:min-h-[2rem]
                        ${
                          selectedMessage === message
                            ? "bg-blue-500 border-blue-300"
                            : "hover:bg-gradient-to-b from-black via-gray-900 to-black hover:text-blue-500"
                        }
                      `}
                      onClick={() => handleMessageClick(message)}
                    >
                      <p className="text-xs sm:text-sm md:text-base text-gray-200 break-words leading-relaxed">
                        {message}
                      </p>
                    </Button>
                  ))
                )}
              </CardContent>
            )}
          </Card>
        </div>

        {/* Separator - Responsive spacing */}
        <Separator className="my-4 sm:my-5 md:my-6" />

        {/* Footer Section - Responsive */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="text-sm sm:text-base md:text-lg text-gray-300">
            Get Your Message Board
          </div>
          <Link href={"/sign-up"}>
            <Button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedBackground>
  );
}
{
  /* <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30 mr-8">
  <p className="text-white text-sm">Really? That&apos;s so sweet to hear!</p>
</div>; */
}
