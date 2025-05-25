import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();
  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  try {
    const updatedResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );
    if (updatedResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "No message found or message already deleted!",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("An Unexpected Error Occured during delete message", error);

    return Response.json(
      {
        success: false,
        message: " Error in deleteing message",
      },
      { status: 500 }
    );
  }
}
