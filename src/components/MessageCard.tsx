"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { Delete } from "lucide-react";
import { toast } from "sonner";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast.success("Message-delete-Conformation", {
      description: response.data.message,
    });
    onMessageDelete(message._id as string);
  };

  return (
    <Card className="hover:shadow-cyan-500/40">
      <CardHeader>
        <CardTitle>The Gallery of Unseen Words</CardTitle>
        <CardDescription>{message.createdAt.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-lg text-gray-100 italic">{message.content}</div>
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <CardAction>
              <button className="justify-between text-rose-400 text-sm cursor-pointer transition-all duration-200  ease-in-out inline-flex items-center gap-1 ">
                <span className="text-cyan-400"> Delete Message!</span>
                <Delete />
              </button>
            </CardAction>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default MessageCard;

{
  /* <Card className="hover:shadow-cyan-500/40">
  <CardHeader>
    <CardTitle>Executive Transformation</CardTitle>
    <CardDescription>
      "This platform enabled our leadership team to receive genuine insights."
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="text-lg text-gray-100 italic">
        "The anonymity feature completely transformed our company culture and
        decision-making process."
      </div>
      <div className="border-t border-purple-500/30 pt-4">
        <div className="text-purple-300 font-semibold">Fortune 500 CEO</div>
        <div className="text-gray-400 text-sm">Technology Sector</div>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <CardAction>Read Full Story →</CardAction>
  </CardFooter>
</Card>; */
}
