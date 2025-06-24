"use client";

import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, setValue, watch } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/accept-messages`);
      setValue("acceptMessages", response.data.isAcceptingMessage as boolean);
    } catch (error) {
      const axiorError = error as AxiosError<ApiResponse>;
      toast.error("error", {
        description:
          axiorError.response?.data.message ||
          "Failed to fatch  Message settings",
      });
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      const response = await axios.get<ApiResponse>(`/api/get-messages`);
      console.log(" Get Message API Response Data:", response.data.messages);

      setMessages(response.data.messages || []);

      try {
        if (refresh) {
          toast.success("Refreshed Messages", {
            description: "Showing Updated Messages",
          });
        }
      } catch (error) {
        const axiorError = error as AxiosError<ApiResponse>;
        toast("error", {
          description:
            axiorError.response?.data.message || "Failed to fatch Messages",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setIsSwitchLoading]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>(`/api/accept-messages`, {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);

      toast.success(response.data.message);
    } catch (error) {
      const axiorError = error as AxiosError<ApiResponse>;
      toast.error("error", {
        description:
          axiorError.response?.data.message || "Failed to fatch Messages",
      });
    }
  };

  // const { username } = session?.user as User;
  const username = session?.user?.username;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success(`Url Copied Successfuly`, {
      description: "Profile Url has been copied to clipboard successfully",
    });
  };

  if (!session || !session.user) {
    return <div>Please Login</div>;
  }
  return (
    <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8">
      {" "}
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 w-full max-w-6xl bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden  rounded-3xl shadow-2xl border border-gray-800/50 hover:shadow-purple-500/10 transition-all duration-500">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          User Dashboard
        </h1>

        <div className="mb-4">
          <h2 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Copy Your Unique Link
          </h2>{" "}
          <div className="flex text-xl text-gray-400 max-w-3xl items-center">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="input text-xs px-2 py-2 bg-gray-700/40 text-gray-300 rounded-md  input-bordered w-full p-2 mr-2"
            />
            <Button
              className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="ml-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Accept Messages:{" "}
            {acceptMessages ? (
              <span className="text-green-500 text-xl font-bold">On</span>
            ) : (
              <span className="text-red-500 text-xl font-bold">Off</span>
            )}
          </span>
        </div>
        <Separator />

        <Button
          className="mt-4"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id as string}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p>No messages to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
