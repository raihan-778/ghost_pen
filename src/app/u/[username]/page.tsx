"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
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
import { useCompletion } from "@ai-sdk/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar).filter((msg) => msg.trim());
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const [selectedMessage, setSelectedMessage] = useState("");
  const params = useParams<{ username: string }>();
  const username = params.username;
       const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);


  // const {
  //   complete,
  //   completion,
  //   isLoading: isSuggestLoading,
  //   error,
  // } = useCompletion({
  //   api: "/api/suggest-messages",
  //   initialCompletion: initialMessageString,
  //   onFinish: (finalComplition) => {
  //     console.log("Final completion:", finalComplition);
  //   },
  // });

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

  const [isLoading, setIsLoading] = useState(false);

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

  // const fetchSuggestedMessages = async () => {

  //   try {
  //     await complete("");
  //     console.log(complete);
  //     console.log("suggested messages Complition:", completion);

  //     // Using append() instead of complete()
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //     // Handle error appropriately (e.g., show toast notification)
  //     if (error instanceof Error) {
  //       toast.error(`Failed to get suggestions: ${error.message}`);
  //     }
  //   }
  // };

  
  // Optimized streaming fetch with useCallback
  const generateQuestions = useCallback(async (customPrompt?: string) => {
  

    setIsLoading(true);
    setQuestions([]);
    setError(null);

    try {
      const response = await fetch('/api/suggest-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: customPrompt }),
      });

      if (!response.ok) throw new Error('Failed to fetch questions');
      if (!response.body) throw new Error('No streamable response');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // Process chunks only when we have a complete question (ends with '||')
        const parts = buffer.split('||');
        
        // If we have at least one complete question (last part is incomplete)
        if (parts.length > 1) {
          // All except last are complete questions
          const completeQuestions = parts.slice(0, -1).map(q => q.trim()).filter(Boolean);
          if (completeQuestions.length) {
            setQuestions(prev => [...prev, ...completeQuestions]);
          }
          buffer = parts[parts.length - 1]; // Keep the incomplete part
        }
      }

      // Process any remaining text after streaming ends
      if (buffer.trim()) {
        setQuestions(prev => [...prev, buffer.trim()]);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }

  // const suggestedMessages = parseStringMessages(completion);
  console.log("Suggested Messages:", suggestedMessages);

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
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

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            onClick={fetchSuggestedMessages}
            className="my-4"
            disabled={isSuggestLoading}
          >
            {isSuggestLoading ? "Generating..." : "Suggested Messages"}
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          {suggestedMessages.length > 0 && (
            <CardContent className="flex flex-col space-y-4">
              {error ? (
                <p className="text-red-500">{error.message}</p>
              ) : (
                suggestedMessages.map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`p-3 border rounded cursor-pointer ${selectedMessage === message ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                    onClick={() => handleMessageClick(message)}
                  >
                    {message}
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
      <div className="text-sm text-gray-500">
        <pre className="mt-4 text-xs bg-gray-100 p-2 rounded">
          {JSON.stringify(completion, null, 2)}
        </pre>

        <div>Form value: {form.watch("content")}</div>
        <div>Completion: {completion}</div>
      </div>
    </div>
  );
}
